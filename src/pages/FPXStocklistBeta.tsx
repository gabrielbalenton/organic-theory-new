import { useMemo, useState } from 'react';
import { renderFpxTemplate, type SlotFields } from '../data/fpxStocklistTemplate';

const STORAGE_KEY = 'fpx-stocklist-history';
const CTA_URL = 'https://app.fpx.nz/shop#available-stock';

type SlotKey = 'green' | 'blue' | 'orange';
type HistoryEntry = {
  weekLabel: string;
  green?: { name?: string };
  blue?: { name?: string };
  orange?: { name?: string };
};
type Candidate = {
  slot: SlotKey;
  name: string;
  discountPct: number;
  moq: number;
  available: number;
  categories: string[];
  url: string;
  imageUrl: string;
  price: string;
  source: string;
};

// Safety fallback only. This is NEVER written into localStorage.
// Existing browser history always wins when present.
const BASELINE_HISTORY: HistoryEntry[] = [
  { weekLabel: 'Week 9', green: { name: '300x50 (290x45) SG8 H1.2 Kiln Dried Machine Gauged (5.400m)' }, blue: { name: '150x50 (140x45) SG10 H3.2 Kiln Dried Machine Gauged (5.400m)' }, orange: { name: '50x25 Merch H3.2 Treated Wet Dressed 4 Sides (3.600m)' } },
  { weekLabel: 'Week 8', green: { name: '100x50 (90x45) SG10 H3.2 Kiln Dried Machine Gauged (4.200m)' }, blue: { name: '100x50 2Frame H4 Treated Wet Rough Sawn (4.800m)' }, orange: { name: '150x50 (140x45) SG8 H1.2 Kiln Dried Machine Gauged (3.600m)' } },
  { weekLabel: 'Week 7', green: { name: '100x50 (90x45) SG12 H3.2 Kiln Dried Machine Gauged (6.000m)' }, blue: { name: '150x50 (140x45) SG8 H3.2 Treated Wet Machine Gauged (5.400m)' }, orange: { name: '100x40 Merch H3.2 Treated Wet GripTread (3.600m)' } },
  { weekLabel: 'Week 6', green: { name: '50x25 Merch H3.2 Treated Wet Dressed 4 Sides (3.600m)' }, blue: { name: '200x50 (190x45) SG8 H1.2 Kiln Dried Machine Gauged (5.400m)' }, orange: { name: '100x25 Merch H3.2 Treated Wet Dressed 4 Sides (3.600m)' } },
  { weekLabel: 'Week 5', green: { name: '300x50 (290x45) SG8 H1.2 Kiln Dried Machine Gauged (4.200m)' }, blue: { name: '200x50 2Frame H4 Treated Wet Tongue & Groove (5.400m)' }, orange: { name: '100x50 (90x45) SG10 H3.2 Kiln Dried Machine Gauged (3.600m)' } },
  { weekLabel: 'Week 4', green: { name: '100x25 Merch H3.2 Treated Wet Dressed 4 Sides (4.200m)' }, blue: { name: '200x50 (190x45) SG8 H1.2 Kiln Dried Machine Gauged (6.000m)' }, orange: { name: '150x50 2Frame H4 Treated Wet TGV (5.400m)' } },
  { weekLabel: 'Week 3', green: { name: '100x50 (90x45) SG12 H3.2 Kiln Dried Machine Gauged (6.000m)' }, blue: { name: '150x50 (140x45) SG8 H1.2 Kiln Dried Machine Gauged (4.200m)' }, orange: { name: '100x25 Merch H3.2 Treated Wet Dressed 4 Sides (3.600m)' } },
  { weekLabel: 'Week 2', green: { name: '50x25 Merch H3.2 Treated Wet Dressed 4 Sides (4.200m)' }, blue: { name: '150x50 (140x45) SG10 H3.2 Kiln Dried Machine Gauged (5.400m)' }, orange: { name: '75x50 (70x45) SG8 H3.2 Kiln Dried Machine Gauged' } },
  { weekLabel: 'Week 1', green: { name: '300x50 (290x45) SG8 H1.2 Kiln Dried Machine Gauged (4.800m)' }, blue: { name: '200x50 (190x45) SG8 H1.2 Kiln Dried Machine Gauged (5.400m)' }, orange: { name: '150x50 (140x45) SG12 H3.2 Kiln Dried Machine Gauged (5.400m)' } },
];

const CURRENT_RECOMMENDATIONS: Candidate[] = [
  {
    slot: 'green',
    name: '300x50 (290x45) SG8 H1.2 Kiln Dried Machine Gauged (4.200m)',
    discountPct: 36.507936507936506,
    moq: 1,
    available: 5,
    categories: ['Stress Graded Timber', 'Internal Framing', 'Treated Timber'],
    url: 'https://app.fpx.nz/products-details?recordId=reck5Iu0QOHNujERO',
    imageUrl: 'https://v5.airtableusercontent.com/v3/u/57/57/1788753600000/_FbuTwtljpYbVHk4057L6w/33XEsdUoNTd-kgPloZTyfvr7bd-Pg_jx_7VaBPM8N9fJC8G2jzP7Cot5w5d9ThdDanDyBOl3ksd9NBMrHwS62xxBheP_9OusRIMk397tW4vcRLAlbM7Axg5hb7RqPgvd1PtYgd5UjHalmis4O_Igtw/BaMbb1HUOc_AuYZTUhYdoLRPSLv1IU5oDdVEW3AM8sg',
    price: '$660/M3 ($9.90/LM)',
    source: 'Packet Deals',
  },
  {
    slot: 'blue',
    name: '200x50 (190x45) SG8 H1.2 Kiln Dried Machine Gauged (6.000m)',
    discountPct: 26.94610778443114,
    moq: 4,
    available: 17,
    categories: ['Stress Graded Timber', 'Internal Framing', 'Treated Timber'],
    url: 'https://app.fpx.nz/products-details?recordId=rechqRdpgamG6uPWp',
    imageUrl: 'https://v5.airtableusercontent.com/v3/u/57/57/1788753600000/b3eRNxeRYnwVpC1V5He_uw/FMQP5gIdQwmflHyDC1ZfevlMXIdUawGLRayuwH39hFsl7j4DU9EBAeptUl-8LoytEc_tPQkImSIhCVYfOG2_26EZY66WN1hVTjk19sxremf0yDfzw3XehnMME1s7N9dCojUyCzkzeCnduoxkRefxYw/Q7XJqvH6d7QzqVmNomyKS0CMdLCMhRxG1YRUZOpaGQo',
    price: '$671/M3 ($6.71/LM)',
    source: 'Bulk Deals',
  },
  {
    slot: 'orange',
    name: '100x25 Merch H3.2 Treated Wet Dressed 4 Sides (3.600m)',
    discountPct: 23.076923076923077,
    moq: 1,
    available: 4,
    categories: ['Outdoor', 'Treated Timber'],
    url: 'https://app.fpx.nz/products-details?recordId=recZT1wJlKohtcVdV',
    imageUrl: 'https://v5.airtableusercontent.com/v3/u/57/57/1788753600000/NMkrJii-yZ4KN8ntML9xCg/5WcpLT_sC0P0pLgN2L4H-IQwAfI_CJG4U-8J6dC3GsZMIbgU5-clFaMNLwH6GfdSPliFTPD-7T4Oi8cnEHPygaOpQvqdri9GmTd0mGZvXrQ3-idOiaWVUB57qehXQvoj_VDP5-ah27-3pqfxNGuD_Q/rzmhjNNvJsNTtH3dwXk2wY3gnrWvjd7bySOib71gQd0',
    price: '$605/M3 ($1.51/LM)',
    source: 'Selling Fast',
  },
];

function parseWeekNumber(label: string): number | null {
  const match = label.match(/(\d+)/);
  return match ? Number.parseInt(match[1], 10) : null;
}

function readHistory(): { entries: HistoryEntry[]; source: 'browser' | 'fallback' } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed) && parsed.length) return { entries: parsed, source: 'browser' };
  } catch {
    // Fall through to the read-only baseline.
  }
  return { entries: BASELINE_HISTORY, source: 'fallback' };
}

function normaliseProduct(name: string) {
  return name.trim().replace(/\s+/g, ' ').toLowerCase();
}

function parseProductName(name: string) {
  const lengthMatch = name.match(/\((\d+(?:\.\d+)?)m\)\s*$/i);
  const length = lengthMatch ? `${lengthMatch[1]}m` : '';
  const withoutLength = lengthMatch ? name.slice(0, lengthMatch.index).trim() : name;
  const sizeMatch = withoutLength.match(/^(\d+x\d+(?:\s*\(\d+x\d+\))?)/i);
  const size = sizeMatch?.[1] ?? '';
  const remainder = size ? withoutLength.slice(size.length).trim() : withoutLength;
  const treatmentMatch = remainder.match(/\b(H\d(?:\.\d)?|Untreated|UT|Primed)\b/i);
  const treatment = treatmentMatch?.[1] ?? '';
  const grade = treatmentMatch ? remainder.slice(0, treatmentMatch.index).trim() : remainder.split(' ')[0] ?? '';
  const afterTreatment = treatmentMatch ? remainder.slice((treatmentMatch.index ?? 0) + treatmentMatch[0].length).trim() : '';
  let condition = '';
  let profile = '';
  for (const option of ['Kiln Dried', 'Treated Wet', 'Green Sawn', 'Green']) {
    if (afterTreatment.toLowerCase().startsWith(option.toLowerCase())) {
      condition = option;
      profile = afterTreatment.slice(option.length).trim();
      break;
    }
  }
  if (!condition) profile = afterTreatment;
  return { size, grade, treatment, condition, profile, length };
}

function emptySlot(): SlotFields {
  return {
    name: '', url: '', imageUrl: '', size: '', grade: '', treatment: '', condition: '', profile: '', pcs: '',
    minOrder: '', availability: '', dispatch: 'Dispatches in 1-3 days', category: '', savingsPct: '', price: '',
    length: '', qtyAvailable: '', minOrderQty: '',
  };
}

function candidateToSlot(candidate: Candidate): SlotFields {
  const parsed = parseProductName(candidate.name);
  return {
    name: candidate.name,
    url: candidate.url,
    imageUrl: candidate.imageUrl,
    size: parsed.size,
    grade: parsed.grade,
    treatment: parsed.treatment,
    condition: parsed.condition,
    profile: parsed.profile,
    pcs: '',
    minOrder: `${candidate.moq}x Packet${candidate.moq === 1 ? '' : 's'}`,
    availability: `${candidate.available}x Packet${candidate.available === 1 ? '' : 's'}`,
    dispatch: 'Dispatches in 1-3 days',
    category: candidate.categories.join(', '),
    savingsPct: candidate.discountPct.toFixed(1),
    price: candidate.price,
    length: parsed.length,
    qtyAvailable: String(candidate.available),
    minOrderQty: String(candidate.moq),
  };
}

function addEmailPreferencesLink(html: string): string {
  const marker = '<!-- FPX EMAIL PREFERENCES LINK -->';
  if (html.includes(marker)) return html;
  const footerTextIndex = html.toLowerCase().lastIndexOf('forest products exchange, new zealand');
  if (footerTextIndex === -1) return html;
  const paragraphEndIndex = html.indexOf('</p>', footerTextIndex);
  if (paragraphEndIndex === -1) return html;
  const link = `<br>\n                ${marker}\n                <a href="{{ update_profile }}" style="display:inline-block;margin-top:12px;color:#777777;font-family:'Open Sans',Arial,sans-serif;font-size:11px;font-weight:600;line-height:1.5;text-decoration:underline;">\n                  Manage email preferences or unsubscribe\n                </a>`;
  return `${html.slice(0, paragraphEndIndex)}${link}${html.slice(paragraphEndIndex)}`;
}

function patchCampaignCtas(html: string) {
  return html
    .replace(/href="https:\/\/app\.fpx\.nz\/"([^>]*>View All Listings)/, `href="${CTA_URL}"$1`)
    .replace(/href="https:\/\/app\.fpx\.nz\/"([^>]*>Browse All)/, `href="${CTA_URL}"$1`);
}

const slotStyle: Record<SlotKey, React.CSSProperties> = {
  green: { borderLeft: '6px solid #1a8638' },
  blue: { borderLeft: '6px solid #2563a8' },
  orange: { borderLeft: '6px solid #d97706' },
};
const slotLabel: Record<SlotKey, string> = {
  green: 'Green — Best Single Packet', blue: 'Blue — Best Bulk Deal', orange: 'Orange — Selling Fast',
};

export default function FPXStocklistBeta() {
  const historyState = useMemo(() => readHistory(), []);
  const history = historyState.entries;
  const defaultWeek = useMemo(() => {
    const weeks = history.map((entry) => parseWeekNumber(entry.weekLabel)).filter((n): n is number => n !== null);
    return `Week ${weeks.length ? Math.max(...weeks) + 1 : 10}`;
  }, [history]);

  const [weekLabel, setWeekLabel] = useState(defaultWeek);
  const [slotDrafts, setSlotDrafts] = useState<Record<SlotKey, SlotFields>>({ green: emptySlot(), blue: emptySlot(), orange: emptySlot() });
  const [loaded, setLoaded] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [outputMode, setOutputMode] = useState<'code' | 'preview'>('code');
  const [copyLabel, setCopyLabel] = useState('Copy HTML');

  const blockedNames = useMemo(() => {
    const currentWeek = parseWeekNumber(weekLabel);
    const blocked = new Set<string>();
    history.forEach((entry) => {
      const entryWeek = parseWeekNumber(entry.weekLabel);
      if (currentWeek === null || entryWeek === null) return;
      const distance = currentWeek - entryWeek;
      if (distance !== 1 && distance !== 2) return;
      [entry.green?.name, entry.blue?.name, entry.orange?.name].forEach((name) => name && blocked.add(normaliseProduct(name)));
    });
    return blocked;
  }, [history, weekLabel]);

  const conflicts = CURRENT_RECOMMENDATIONS.filter((item) => blockedNames.has(normaliseProduct(item.name)));

  function loadRecommendations() {
    setSlotDrafts({
      green: candidateToSlot(CURRENT_RECOMMENDATIONS[0]),
      blue: candidateToSlot(CURRENT_RECOMMENDATIONS[1]),
      orange: candidateToSlot(CURRENT_RECOMMENDATIONS[2]),
    });
    setLoaded(true);
    setGeneratedHtml('');
  }

  function updateSlot(slot: SlotKey, field: keyof SlotFields, value: string) {
    setSlotDrafts((prev) => ({ ...prev, [slot]: { ...prev[slot], [field]: value } }));
  }

  function generateHtml() {
    const missingPcs = (['green', 'blue', 'orange'] as SlotKey[]).filter((slot) => !slotDrafts[slot].pcs.trim());
    if (missingPcs.length) {
      window.alert(`Enter pcs per pack for: ${missingPcs.join(', ')}. This is the only Week 10 field that must be checked manually.`);
      return;
    }
    const raw = renderFpxTemplate(weekLabel, slotDrafts.green, slotDrafts.blue, slotDrafts.orange);
    const html = addEmailPreferencesLink(patchCampaignCtas(raw));
    setGeneratedHtml(html);
    setOutputMode('code');
    setCopyLabel('Copy HTML');
  }

  function copyHtml() {
    if (!generatedHtml) return;
    navigator.clipboard.writeText(generatedHtml).then(() => {
      setCopyLabel('Copied!');
      setTimeout(() => setCopyLabel('Copy HTML'), 1500);
    });
  }

  return (
    <div className="use-native-cursor" style={{ minHeight: '100vh', background: '#f5f5f3', color: '#111', fontFamily: "'Helvetica Neue', Arial, sans-serif", padding: 32 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', color: '#666' }}>FPX Weekly Stocklist</div>
            <h1 style={{ margin: '6px 0 8px', fontSize: 30 }}>Week 10 Recommendation Test</h1>
            <p style={{ margin: 0, maxWidth: 780, lineHeight: 1.6, color: '#555' }}>
              Uses the same approved email template as Week 9. This page reads your history but does not overwrite it.
            </p>
          </div>
          <a href="/fpx/stocklist" style={{ background: '#111', color: '#fff', padding: '10px 16px', textDecoration: 'none', fontWeight: 700, whiteSpace: 'nowrap' }}>Current Generator</a>
        </div>

        <div style={{ background: '#fff', border: '1px solid #ddd', padding: 18, marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', marginBottom: 6 }}>Week</label>
          <input value={weekLabel} onChange={(e) => setWeekLabel(e.target.value)} style={{ width: 180, padding: '9px 10px', border: '1px solid #999', fontSize: 14 }} />
          <div style={{ marginTop: 10, fontSize: 12, color: '#666' }}>
            History source: <strong>{historyState.source === 'browser' ? 'your existing browser history' : 'read-only Week 1–9 safety fallback'}</strong> · {history.length} entries found.
          </div>
          <div style={{ marginTop: 5, fontSize: 12, color: '#666' }}>
            Strict cooldown: Week N blocks the exact length-specific product in Weeks N+1 and N+2; it is eligible again in Week N+3.
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #111', padding: 18, marginBottom: 20 }}>
          <button onClick={loadRecommendations} disabled={conflicts.length > 0} style={{ background: conflicts.length ? '#aaa' : '#111', color: '#fff', border: '1px solid #111', padding: '12px 20px', fontWeight: 800 }}>
            Load This Week's Recommendations
          </button>
          <span style={{ marginLeft: 12, fontSize: 12, color: '#555' }}>This button does not save or alter history.</span>
          {conflicts.length > 0 && (
            <div style={{ marginTop: 12, padding: 10, background: '#fff4e5', border: '1px solid #d97706', fontSize: 12 }}>
              <strong>Cooldown conflict:</strong> {conflicts.map((c) => c.name).join(' | ')}. Loading is disabled until the snapshot is corrected.
            </div>
          )}
        </div>

        {loaded && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
              {CURRENT_RECOMMENDATIONS.map((item) => {
                const draft = slotDrafts[item.slot];
                return (
                  <div key={item.slot} style={{ ...slotStyle[item.slot], background: '#fff', borderTop: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: 18 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase' }}>{slotLabel[item.slot]}</div>
                    <h2 style={{ fontSize: 17, lineHeight: 1.35, margin: '14px 0 10px' }}>{item.name}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12, marginBottom: 14 }}>
                      <div><strong>Discount</strong><br />{item.discountPct.toFixed(1)}%</div>
                      <div><strong>MOQ</strong><br />{item.moq}</div>
                      <div><strong>Available</strong><br />{item.available}x Packets</div>
                      <div><strong>Source</strong><br />{item.source}</div>
                    </div>
                    {([
                      ['size', 'Size'], ['grade', 'Grade'], ['treatment', 'Treatment'], ['condition', 'Condition'],
                      ['profile', 'Profile'], ['length', 'Length'], ['category', 'Category'], ['price', 'Price'],
                      ['pcs', 'Pcs per pack — CHECK THIS'], ['dispatch', 'Dispatch'], ['imageUrl', 'Image URL'],
                    ] as Array<[keyof SlotFields, string]>).map(([field, label]) => (
                      <label key={field} style={{ display: 'block', marginTop: 8, fontSize: 11, fontWeight: 700, color: field === 'pcs' ? '#b45309' : '#555' }}>
                        {label}
                        <input value={draft[field]} onChange={(e) => updateSlot(item.slot, field, e.target.value)} style={{ display: 'block', width: '100%', boxSizing: 'border-box', marginTop: 3, padding: '7px 8px', border: field === 'pcs' ? '2px solid #d97706' : '1px solid #bbb', fontSize: 12 }} />
                      </label>
                    ))}
                    <a href={item.url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 14, color: '#111', fontWeight: 800, fontSize: 12 }}>Open FPX Product ↗</a>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={generateHtml} style={{ background: '#111', color: '#fff', border: '1px solid #111', padding: '11px 18px', fontWeight: 800 }}>Generate Approved Brevo HTML</button>
              {generatedHtml && (
                <>
                  <button onClick={copyHtml} style={{ background: '#fff', color: '#111', border: '1px solid #111', padding: '11px 18px', fontWeight: 800 }}>{copyLabel}</button>
                  <button onClick={() => setOutputMode('code')} style={{ background: outputMode === 'code' ? '#111' : '#fff', color: outputMode === 'code' ? '#fff' : '#111', border: '1px solid #111', padding: '11px 18px', fontWeight: 800 }}>Code</button>
                  <button onClick={() => setOutputMode('preview')} style={{ background: outputMode === 'preview' ? '#111' : '#fff', color: outputMode === 'preview' ? '#fff' : '#111', border: '1px solid #111', padding: '11px 18px', fontWeight: 800 }}>Preview</button>
                </>
              )}
            </div>

            {generatedHtml && outputMode === 'code' && <textarea readOnly value={generatedHtml} style={{ width: '100%', boxSizing: 'border-box', height: 520, marginTop: 12, padding: 12, border: '1px solid #111', fontFamily: 'monospace', fontSize: 11 }} />}
            {generatedHtml && outputMode === 'preview' && <iframe title="FPX email preview" srcDoc={generatedHtml} style={{ width: '100%', height: 650, border: '1px solid #111', marginTop: 12, background: '#fff' }} />}
          </>
        )}

        <div style={{ background: '#fff8dc', border: '1px solid #d6b85a', padding: 16, marginTop: 20, fontSize: 13, lineHeight: 1.55 }}>
          <strong>Send safeguard:</strong> the Week 9 approved HTML layout is retained. Week 10 product links, Pieces Photo images, price, MOQ, availability, discount, categories and specifications are prefilled. Only pcs per pack must be checked manually. The top “View All Listings” and bottom “Browse All” CTAs use {CTA_URL}.
        </div>
      </div>
    </div>
  );
}