export type SlotKey = 'green' | 'blue' | 'orange';

export type ProductCharacteristics = {
  nominalSizes: string[];
  gaugedSize?: string;
  grade?: string;
  treatment?: string;
  condition?: string;
  profile?: string;
};

export type Candidate = {
  slot: SlotKey;
  name: string;
  stockLineId: string;
  productId: string;
  discountPct: number;
  moq: number;
  available: number;
  categories: string[];
  productUrl: string;
  listingUrl: string;
  imageUrl: string;
  price: string;
  pcsPerPack: number;
  dispatch?: string;
  source: 'Packet Deals' | 'Bulk Deals' | 'Selling Fast';
  characteristics: ProductCharacteristics;
};

export type HistorySlot = {
  name?: string;
  stockLineId?: string;
  productId?: string;
  categories?: string[];
  url?: string;
};

export type HistoryEntry = {
  id?: string;
  weekLabel: string;
  dateSubmitted?: string;
  green?: HistorySlot;
  blue?: HistorySlot;
  orange?: HistorySlot;
  html?: string;
};

export type Offer = {
  id: string;
  title: string;
  productIds?: string[];
  characteristics: ProductCharacteristics;
};

const aliases: Record<string, string> = {
  tw: 'treated wet',
  kd: 'kiln dried',
  d4s: 'dressed 4 sides',
  mg: 'machine gauged',
  rs: 'rough sawn',
  tgv: 'tongue groove',
  'tongue & groove': 'tongue groove',
};

export function normalizeText(value = '') {
  const compact = value.toLowerCase().replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();
  return aliases[compact] ?? compact.replace(/\band\b/g, '&').replace(/[^a-z0-9.]+/g, ' ').trim();
}

export function normalizeListingName(value = '') {
  return normalizeText(value.replace(/(\d+(?:\.\d+)?)\s*m\b/gi, '$1m'));
}

export function parseWeek(label: string) {
  const match = label.match(/(\d+)/);
  return match ? Number(match[1]) : null;
}

export function hasSentWeek(history: HistoryEntry[], weekLabel: string) {
  const normalizedWeek = normalizeText(weekLabel);
  return history.some(entry => normalizeText(entry.weekLabel) === normalizedWeek);
}

export function exactCooldownKeys(history: HistoryEntry[], weekLabel: string) {
  const ids = new Set<string>();
  const names = new Set<string>();
  const targetWeek = parseWeek(weekLabel);

  for (const entry of history) {
    const historicalWeek = parseWeek(entry.weekLabel);
    if (targetWeek === null || historicalWeek === null || ![1, 2].includes(targetWeek - historicalWeek)) continue;
    for (const slot of [entry.green, entry.blue, entry.orange]) {
      if (!slot) continue;
      if (slot.stockLineId) ids.add(slot.stockLineId);
      else if (slot.name) names.add(normalizeListingName(slot.name));
    }
  }
  return { ids, names };
}

export function isOnExactCooldown(candidate: Candidate, keys: ReturnType<typeof exactCooldownKeys>) {
  return keys.ids.has(candidate.stockLineId) || keys.names.has(normalizeListingName(candidate.name));
}

export function categoriesOverlap(a: Candidate, b: Candidate) {
  const categories = new Set(a.categories.map(normalizeText));
  return b.categories.some(category => categories.has(normalizeText(category)));
}

function normalizedSizes(characteristics: ProductCharacteristics) {
  return characteristics.nominalSizes.map(size => normalizeText(size).replace(/\s/g, ''));
}

export function offerMatchesCandidate(offer: Offer, candidate: Candidate) {
  if (offer.productIds?.includes(candidate.productId)) return true;

  const offerSizes = new Set(normalizedSizes(offer.characteristics));
  if (!normalizedSizes(candidate.characteristics).some(size => offerSizes.has(size))) return false;

  const attributes: Array<keyof ProductCharacteristics> = ['gaugedSize', 'grade', 'treatment', 'condition', 'profile'];
  let compared = 0;
  for (const attribute of attributes) {
    const offerValue = offer.characteristics[attribute];
    const candidateValue = candidate.characteristics[attribute];
    if (!offerValue || !candidateValue) continue;
    compared += 1;
    if (normalizeText(String(offerValue)) !== normalizeText(String(candidateValue))) return false;
  }
  return compared >= 3;
}

function isOrderable(candidate: Candidate) {
  return candidate.available >= candidate.moq;
}

export function selectWeeklyRecommendations(
  candidates: Candidate[],
  offers: Offer[],
  history: HistoryEntry[],
  weekLabel: string,
) {
  const cooldown = exactCooldownKeys(history, weekLabel);
  const sortDiscount = (a: Candidate, b: Candidate) => b.discountPct - a.discountPct;
  const packet = candidates.filter(c => c.slot === 'green' && isOrderable(c) && !isOnExactCooldown(c, cooldown)).sort(sortDiscount);
  const green = packet[0];

  const bulk = candidates
    .filter(c => c.slot === 'blue' && isOrderable(c) && !isOnExactCooldown(c, cooldown))
    .sort(sortDiscount);
  const blue = bulk.find(c => !green || !categoriesOverlap(green, c));

  const sellingFast = candidates
    .filter(c => c.slot === 'orange')
    .filter(c => c.available >= 2 && isOrderable(c))
    .filter(c => !isOnExactCooldown(c, cooldown))
    .sort((a, b) => b.discountPct - a.discountPct || a.available - b.available);
  const orange = sellingFast.find(c =>
    (!green || !categoriesOverlap(green, c)) &&
    (!blue || !categoriesOverlap(blue, c)) &&
    !offers.some(offer => offerMatchesCandidate(offer, c)),
  );

  return { green, blue, orange };
}
