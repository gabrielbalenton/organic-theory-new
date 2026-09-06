// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Req = any; type Res = any;

type HistoryItem = {
  weekLabel?: string;
  green?: { name?: string };
  blue?: { name?: string };
  orange?: { name?: string };
};

type AirtableRecord = {
  id: string;
  fields: Record<string, any>;
};

type Candidate = {
  recordId: string;
  name: string;
  discountPct: number;
  minUnits: number;
  availableUnits: number;
  url: string;
  size: string;
  grade: string;
  treatment: string;
  condition: string;
  profile: string;
  length: string;
  imageUrl: string;
  categories: string[];
};

const DEFAULT_BASE_ID = 'app5jIfgoCFGgXZHO';
const DEFAULT_STOCK_TABLE = 'Marketplace Stock Line Items';
const PRODUCT_TABLE = 'FPX Products';
const CATEGORY_TABLE = 'Categories';
const SELLING_FAST_MAX_AVAILABLE = 4;

const STOCK_FIELDS = [
  'Stock Offer Name',
  'Min Units',
  'Max Units',
  '% Discount [standard price vs special price]',
  'URL (marketplace item)',
  'Status',
  'Expiry Date',
  'FPX Products',
  'Nominal Width (mm) (manual)',
  'Nominal Thickness (mm) (manual)',
  'Net Width (mm) (manual)',
  'Net Thickness (mm) (manual)',
  'Grade (manual)',
  'Treatment (manual)',
  'Condition (manual)',
  'Profile (manual)',
  'Length',
  'Pieces Photo',
  'Lengthless Product Photos',
];

function parseWeekNumber(label?: string): number | null {
  const match = String(label ?? '').match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

function normalizeName(name?: string): string {
  return String(name ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function numeric(value: any): number {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const parsed = Number.parseFloat(String(value ?? '').replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function discountPercent(value: any): number {
  const n = numeric(value);
  return n > 0 && n <= 1 ? n * 100 : n;
}

function firstString(value: any): string {
  if (Array.isArray(value)) {
    const first = value[0];
    if (typeof first === 'string') return first;
    if (first && typeof first === 'object') return String(first.url ?? first.name ?? '');
  }
  return typeof value === 'string' ? value : '';
}

function linkedIds(value: any): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => typeof item === 'string' ? item : item?.id)
    .filter((id): id is string => typeof id === 'string' && id.startsWith('rec'));
}

function isActiveRecord(fields: Record<string, any>): boolean {
  const status = String(fields['Status'] ?? '').toLowerCase();
  if (/closed|expired|inactive|sold|cancel/.test(status)) return false;
  const expiry = fields['Expiry Date'];
  if (expiry) {
    const expiryDate = new Date(expiry);
    if (!Number.isNaN(expiryDate.getTime())) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      expiryDate.setHours(23, 59, 59, 999);
      if (expiryDate < today) return false;
    }
  }
  return true;
}

function blockedNames(history: HistoryItem[], currentWeekLabel: string): Set<string> {
  const blocked = new Set<string>();
  const currentWeek = parseWeekNumber(currentWeekLabel);
  history.forEach((entry, index) => {
    const entryWeek = parseWeekNumber(entry.weekLabel);
    const withinCooldown = currentWeek !== null && entryWeek !== null
      ? currentWeek - entryWeek === 1 || currentWeek - entryWeek === 2
      : index < 2;
    if (!withinCooldown) return;
    [entry.green?.name, entry.blue?.name, entry.orange?.name].forEach((name) => {
      const normalized = normalizeName(name);
      if (normalized) blocked.add(normalized);
    });
  });
  return blocked;
}

async function airtableFetch(path: string, token: string, query = ''): Promise<any> {
  const response = await fetch(`https://api.airtable.com/v0/${path}${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Airtable ${response.status}: ${body}`);
  }
  return response.json();
}

async function listStock(baseId: string, tableName: string, token: string): Promise<AirtableRecord[]> {
  const records: AirtableRecord[] = [];
  let offset = '';
  do {
    const params = new URLSearchParams();
    params.set('pageSize', '100');
    STOCK_FIELDS.forEach((field) => params.append('fields[]', field));
    if (offset) params.set('offset', offset);
    const data = await airtableFetch(
      `${encodeURIComponent(baseId)}/${encodeURIComponent(tableName)}`,
      token,
      `?${params.toString()}`,
    );
    records.push(...(data.records ?? []));
    offset = data.offset ?? '';
  } while (offset);
  return records;
}

async function getCategoriesForCandidate(candidate: Candidate, raw: AirtableRecord, baseId: string, token: string): Promise<string[]> {
  try {
    const productIds = linkedIds(raw.fields['FPX Products']);
    const categoryIds = new Set<string>();
    for (const productId of productIds.slice(0, 3)) {
      const product = await airtableFetch(
        `${encodeURIComponent(baseId)}/${encodeURIComponent(PRODUCT_TABLE)}/${encodeURIComponent(productId)}`,
        token,
      );
      linkedIds(product.fields?.['Categories']).forEach((id) => categoryIds.add(id));
    }
    const names: string[] = [];
    for (const categoryId of [...categoryIds].slice(0, 8)) {
      const category = await airtableFetch(
        `${encodeURIComponent(baseId)}/${encodeURIComponent(CATEGORY_TABLE)}/${encodeURIComponent(categoryId)}`,
        token,
      );
      const name = String(category.fields?.['Product Category'] ?? '').trim();
      if (name) names.push(name);
    }
    return names;
  } catch {
    return candidate.categories;
  }
}

function mapCandidate(record: AirtableRecord): Candidate {
  const f = record.fields ?? {};
  const nominalWidth = numeric(f['Nominal Width (mm) (manual)']);
  const nominalThickness = numeric(f['Nominal Thickness (mm) (manual)']);
  const netWidth = numeric(f['Net Width (mm) (manual)']);
  const netThickness = numeric(f['Net Thickness (mm) (manual)']);
  const nominal = nominalWidth && nominalThickness ? `${nominalWidth}x${nominalThickness}` : '';
  const net = netWidth && netThickness ? `${netWidth}x${netThickness}` : '';
  return {
    recordId: record.id,
    name: String(f['Stock Offer Name'] ?? '').trim(),
    discountPct: discountPercent(f['% Discount [standard price vs special price]']),
    minUnits: numeric(f['Min Units']),
    availableUnits: numeric(f['Max Units']),
    url: String(f['URL (marketplace item)'] ?? '').trim(),
    size: nominal && net ? `${nominal} (${net})` : nominal || net,
    grade: String(f['Grade (manual)'] ?? '').trim(),
    treatment: String(f['Treatment (manual)'] ?? '').trim(),
    condition: String(f['Condition (manual)'] ?? '').trim(),
    profile: String(f['Profile (manual)'] ?? '').trim(),
    length: String(f['Length'] ?? '').trim(),
    imageUrl: firstString(f['Pieces Photo']) || firstString(f['Lengthless Product Photos']),
    categories: [],
  };
}

function pickBest(records: AirtableRecord[], predicate: (candidate: Candidate) => boolean, blocked: Set<string>, alreadyPicked: Set<string>) {
  return records
    .map((raw) => ({ raw, candidate: mapCandidate(raw) }))
    .filter(({ raw, candidate }) => isActiveRecord(raw.fields) && candidate.name && predicate(candidate))
    .filter(({ candidate }) => !blocked.has(normalizeName(candidate.name)))
    .filter(({ candidate }) => !alreadyPicked.has(normalizeName(candidate.name)))
    .sort((a, b) => b.candidate.discountPct - a.candidate.discountPct || a.candidate.availableUnits - b.candidate.availableUnits)[0] ?? null;
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const token = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID || DEFAULT_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || DEFAULT_STOCK_TABLE;
  if (!token) {
    res.status(503).json({
      error: 'Airtable read credential is not configured in Vercel.',
      needsAirtableCredential: true,
    });
    return;
  }

  const history: HistoryItem[] = Array.isArray(req.body?.history) ? req.body.history : [];
  const currentWeekLabel = String(req.body?.currentWeekLabel ?? '').trim() || 'Week 1';
  const blocked = blockedNames(history, currentWeekLabel);
  const pickedNames = new Set<string>();

  try {
    const records = await listStock(baseId, tableName, token);

    const greenPick = pickBest(
      records,
      (c) => c.minUnits === 1 && c.availableUnits >= 2 && c.discountPct > 0,
      blocked,
      pickedNames,
    );
    if (greenPick) pickedNames.add(normalizeName(greenPick.candidate.name));

    const bluePick = pickBest(
      records,
      (c) => c.minUnits > 1 && c.availableUnits >= 2 && c.discountPct > 0,
      blocked,
      pickedNames,
    );
    if (bluePick) pickedNames.add(normalizeName(bluePick.candidate.name));

    // Current Airtable Selling Fast interface records observed on 7 Sep 2026
    // all have available quantity <= 4. We reproduce that apparent interface
    // filter, then apply Gabriel's explicit rule: MOQ 1, available >= 2,
    // highest discount, and no product already used by Green/Blue.
    const orangePick = pickBest(
      records,
      (c) => c.minUnits === 1 && c.availableUnits >= 2 && c.availableUnits <= SELLING_FAST_MAX_AVAILABLE && c.discountPct > 0,
      blocked,
      pickedNames,
    );

    const picks = [greenPick, bluePick, orangePick];
    for (const pick of picks) {
      if (!pick) continue;
      pick.candidate.categories = await getCategoriesForCandidate(pick.candidate, pick.raw, baseId, token);
    }

    res.status(200).json({
      currentWeekLabel,
      blockedNames: [...blocked],
      rules: {
        green: 'MOQ = 1, Available Qty >= 2, highest Discount %',
        blue: 'MOQ > 1, Available Qty >= 2, highest Discount %',
        orange: `Selling Fast candidate: MOQ = 1, Available Qty 2-${SELLING_FAST_MAX_AVAILABLE}, highest Discount %`,
        cooldown: 'Exact full product name including length is blocked for the next 2 weeks across all colours.',
      },
      sellingFastThresholdNeedsVerification: true,
      recommendations: {
        green: greenPick?.candidate ?? null,
        blue: bluePick?.candidate ?? null,
        orange: orangePick?.candidate ?? null,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Recommendation lookup failed' });
  }
}
