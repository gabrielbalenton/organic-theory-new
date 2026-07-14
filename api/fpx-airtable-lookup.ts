// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Req = any; type Res = any;

// Looks up a single FPX listing record by recordId and maps it to the
// Compose form's slot fields. Requires AIRTABLE_API_KEY, AIRTABLE_BASE_ID,
// AIRTABLE_TABLE_NAME env vars (see fpx-airtable-status.ts) — field names
// below match the mapping spec; adjust here if the base's actual column
// names differ once this is wired up against the real FPX base.
interface AirtableAttachment {
  url: string;
}

interface AirtableFields {
  'Nominal Size'?: string;
  'Grade'?: string;
  'Treatment'?: string;
  'Condition'?: string;
  'Profile'?: string;
  'Image'?: AirtableAttachment[];
  'Listing URL'?: string;
  'Product Name'?: string;
  'Pcs per pack'?: string | number;
  'Availability'?: string | number;
  'Minimum Order Quantity'?: string | number;
  '% Discount'?: string | number;
}

interface AirtableRecord {
  id: string;
  fields: AirtableFields;
}

function firstNonEmpty(...values: Array<string | number | undefined>): string {
  for (const v of values) {
    if (v !== undefined && v !== null && String(v).trim() !== '') return String(v);
  }
  return '';
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME;

  if (!apiKey || !baseId || !tableName) {
    res.status(503).json({ error: 'Airtable not configured' });
    return;
  }

  const recordId = (req.body?.recordId ?? '').trim();
  if (!recordId || !/^rec[A-Za-z0-9]+$/.test(recordId)) {
    res.status(400).json({ error: 'Invalid or missing recordId' });
    return;
  }

  try {
    const url = `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableName)}/${encodeURIComponent(recordId)}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!response.ok) {
      const text = await response.text();
      res.status(response.status).json({ error: `Airtable error: ${text}` });
      return;
    }

    const record = (await response.json()) as AirtableRecord;
    const f = record.fields ?? {};

    res.status(200).json({
      recordId: record.id,
      name: firstNonEmpty(f['Product Name'], [f['Nominal Size'], f['Grade']].filter(Boolean).join(' ')),
      size: firstNonEmpty(f['Nominal Size']),
      grade: firstNonEmpty(f['Grade']),
      treatment: firstNonEmpty(f['Treatment']),
      condition: firstNonEmpty(f['Condition']),
      profile: firstNonEmpty(f['Profile']),
      imageUrl: f['Image']?.[0]?.url ?? '',
      productUrl: firstNonEmpty(f['Listing URL']),
      pcs: firstNonEmpty(f['Pcs per pack']),
      availability: firstNonEmpty(f['Availability']),
      minOrder: firstNonEmpty(f['Minimum Order Quantity']),
      discountPct: firstNonEmpty(f['% Discount']),
    });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Airtable lookup failed' });
  }
}
