import { useMemo, useState } from 'react';
import { renderFpxTemplate, type SlotFields } from '../data/fpxStocklistTemplate';

const STORAGE_KEY = 'fpx-stocklist-history';

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
  source: string;
};

const CURRENT_RECOMMENDATIONS: Candidate[] = [
  {
    slot: 'green',
    name: '300x50 (290x45) SG8 H1.2 Kiln Dried Machine Gauged (4.200m)',
    discountPct: 36.507936507936506,
    moq: 1,
    available: 5,
    categories: ['Structural (Stress Graded)', 'Internal Framing'],
    url: 'https://app.fpx.nz/listing-details?recordId=recdrMHARaWqP1UrG',
    source: 'Packet Deals',
  },
  {
    slot: 'blue',
    name: '200x50 (190x45) SG8 H1.2 Kiln Dried Machine Gauged (6.000m)',
    discountPct: 26.94610778443114,
    moq: 4,
    available: 17,
    categories: ['Structural (Stress Graded)', 'Internal Framing'],
    url: 'https://app.fpx.nz/listing-details?recordId=recB7zY5Y3eURxjPy',
    source: 'Bulk Deals',
  },
  {
    slot: 'orange',
    name: '50x25 Merch H3.2 Treated Wet Dressed 4 Sides (3.600m)',
    discountPct: 31.70731707317073,
    moq: 1,
    available: 4,
    categories: ['Outdoor'],
    url: 'https://app.fpx.nz/listing-details?recordId=recom2uKj34OS70ga',
    source: 'Selling Fast',
  },
];

function parseWeekNumber(label: string): number | null {
  const match = label.match(/(\d+)/);
  return match ? Number.parseInt(match[1], 10) : null;
}

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
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
  const conditionOptions = ['Kiln Dried', 'Treated Wet', 'Green Sawn', 'Green'];
  for (const option of conditionOptions) {
    if (afterTreatment.toLowerCase().startsWith(option.toLowerCase())) {
      condition = option;
      profile = afterTreatment.slice(option.length).trim();
      break;
    }
  }
  if (!condition) profile = afterTreatment;

  return { size, grade, treatment, condition, profile, length };
}

function candidateToSlot(candidate: Candidate): SlotFields {
  const parsed = parseProductName(candidate.name);
  return {
    name: candidate.name,
    url: candidate.url,
    imageUrl: '',
    size: parsed.size,
    grade: parsed.grade,
    treatment: parsed.treatment,
    condition: parsed.condition,
    profile: parsed.profile,
    pcs: '',
    minOrder: `${candidate.moq}x Packet${candidate.moq === 1 ? '' : 's'}`,
    availability: `${candidate.available} Packet${candidate.available === 1 ? '' : 's'}`,
    dispatch: 'Dispatches in 1-3 days',
    category: candidate.categories.join(', '),
    savingsPct: candidate.discountPct.toFixed(2),
    price: '',
    length: parsed.length,
    qtyAvailable: String(candidate.available),
    minOrderQty: String(candidate.moq),
  };
}

const slotStyle: Record<SlotKey, React.CSSProperties> = {
  green: { borderLeft: '6px solid #1a8638' },
  blue: { borderLeft: '6px solid #2563a8' },
  orange: { borderLeft: '6px solid #d97706' },
};

const slotLabel: Record<SlotKey, string> = {
  green: 'Green — Best Single Packet',
  blue: 'Blue — Best Bulk Deal',
  orange: 'Orange — Selling Fast',
};

export default function FPXStocklistBeta() {
  const history = useMemo(() => loadHistory(), []);
  const defaultWeek = useMemo(() => {
    const weekNumbers = history
      .map((entry) => parseWeekNumber(entry.weekLabel))
      .filter((value): value is number => value !== null);
    return `Week ${weekNumbers.length ? Math.max(...weekNumbers) + 1 : 3}`;
  }, [history]);

  const [weekLabel, setWeekLabel] = useState(defaultWeek);
  const [slotDrafts, setSlotDrafts] = useState<Record<SlotKey, SlotFields>>(() => ({
    green: candidateToSlot(CURRENT_RECOMMENDATIONS[0]),
    blue: candidateToSlot(CURRENT_RECOMMENDATIONS[1]),
    orange: candidateToSlot(CURRENT_RECOMMENDATIONS[2]),
  }));
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
      [entry.green?.name, entry.blue?.name, entry.orange?.name].forEach((name) => {
        if (name) blocked.add(normaliseProduct(name));
      });
    });
    return blocked;
  }, [history, weekLabel]);

  function updateSlot(slot: SlotKey, field: keyof SlotFields, value: string) {
    setSlotDrafts((prev) => ({
      ...prev,
      [slot]: { ...prev[slot], [field]: value },
    }));
  }

  function generateHtml() {
    const html = renderFpxTemplate(weekLabel, slotDrafts.green, slotDrafts.blue, slotDrafts.orange);
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
            <h1 style={{ margin: '6px 0 8px', fontSize: 30 }}>Airtable Recommendation + HTML Beta</h1>
            <p style={{ margin: 0, maxWidth: 760, lineHeight: 1.6, color: '#555' }}>
              Recommended Green / Blue / Orange products are preloaded below. Review or edit any field, then generate the same Brevo-ready HTML template used by the current stocklist tool.
            </p>
          </div>
          <a href="/fpx/stocklist" style={{ background: '#111', color: '#fff', padding: '10px 16px', textDecoration: 'none', fontWeight: 700, whiteSpace: 'nowrap' }}>
            Current Generator
          </a>
        </div>

        <div style={{ background: '#fff', border: '1px solid #ddd', padding: 18, marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', marginBottom: 6 }}>Week to evaluate</label>
          <input value={weekLabel} onChange={(event) => setWeekLabel(event.target.value)} style={{ width: 180, padding: '9px 10px', border: '1px solid #999', fontSize: 14 }} />
          <div style={{ marginTop: 12, fontSize: 12, color: '#666' }}>
            Featured in Week N → blocked in Weeks N+1 and N+2 → eligible again in Week N+3. Full product name including length is the identity.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          {CURRENT_RECOMMENDATIONS.map((item) => {
            const isBlocked = blockedNames.has(normaliseProduct(item.name));
            const draft = slotDrafts[item.slot];
            return (
              <div key={item.slot} style={{ ...slotStyle[item.slot], background: '#fff', borderTop: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase' }}>{slotLabel[item.slot]}</div>
                  <div style={{ fontSize: 11, fontWeight: 800, padding: '3px 7px', border: `1px solid ${isBlocked ? '#b91c1c' : '#15803d'}`, color: isBlocked ? '#b91c1c' : '#15803d' }}>
                    {isBlocked ? 'BLOCKED' : 'ELIGIBLE'}
                  </div>
                </div>

                <h2 style={{ fontSize: 17, lineHeight: 1.35, margin: '14px 0 10px' }}>{item.name}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12, marginBottom: 14 }}>
                  <div><strong>Discount</strong><br />{item.discountPct.toFixed(2)}%</div>
                  <div><strong>MOQ</strong><br />{item.moq}</div>
                  <div><strong>Available</strong><br />{item.available}</div>
                  <div><strong>Source</strong><br />{item.source}</div>
                </div>

                {([
                  ['size', 'Size'],
                  ['grade', 'Grade'],
                  ['treatment', 'Treatment'],
                  ['condition', 'Condition'],
                  ['profile', 'Profile'],
                  ['length', 'Length'],
                  ['category', 'Category'],
                  ['pcs', 'Pcs per pack'],
                  ['dispatch', 'Dispatch'],
                  ['imageUrl', 'Image URL'],
                ] as Array<[keyof SlotFields, string]>).map(([field, label]) => (
                  <label key={field} style={{ display: 'block', marginTop: 8, fontSize: 11, fontWeight: 700, color: '#555' }}>
                    {label}
                    <input
                      value={draft[field]}
                      onChange={(event) => updateSlot(item.slot, field, event.target.value)}
                      style={{ display: 'block', width: '100%', boxSizing: 'border-box', marginTop: 3, padding: '7px 8px', border: '1px solid #bbb', fontSize: 12 }}
                    />
                  </label>
                ))}

                <a href={item.url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 14, color: '#111', fontWeight: 800, fontSize: 12 }}>
                  Open FPX Listing ↗
                </a>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={generateHtml} style={{ background: '#111', color: '#fff', border: '1px solid #111', padding: '11px 18px', fontWeight: 800 }}>
            Generate Brevo HTML
          </button>
          {generatedHtml && (
            <>
              <button onClick={copyHtml} style={{ background: '#fff', color: '#111', border: '1px solid #111', padding: '11px 18px', fontWeight: 800 }}>{copyLabel}</button>
              <button onClick={() => setOutputMode('code')} style={{ background: outputMode === 'code' ? '#111' : '#fff', color: outputMode === 'code' ? '#fff' : '#111', border: '1px solid #111', padding: '11px 18px', fontWeight: 800 }}>Code</button>
              <button onClick={() => setOutputMode('preview')} style={{ background: outputMode === 'preview' ? '#111' : '#fff', color: outputMode === 'preview' ? '#fff' : '#111', border: '1px solid #111', padding: '11px 18px', fontWeight: 800 }}>Preview</button>
            </>
          )}
        </div>

        {generatedHtml && outputMode === 'code' && (
          <textarea readOnly value={generatedHtml} style={{ width: '100%', boxSizing: 'border-box', height: 520, marginTop: 12, padding: 12, border: '1px solid #111', fontFamily: 'monospace', fontSize: 11 }} />
        )}
        {generatedHtml && outputMode === 'preview' && (
          <iframe title="FPX email preview" srcDoc={generatedHtml} style={{ width: '100%', height: 650, border: '1px solid #111', marginTop: 12, background: '#fff' }} />
        )}

        <div style={{ background: '#fff8dc', border: '1px solid #d6b85a', padding: 16, marginTop: 20, fontSize: 13, lineHeight: 1.55 }}>
          <strong>Beta source note:</strong> recommendation selection is still using the Airtable snapshot pulled for this test. The editable fields are intentional so you can cross-check missing packet/photo details before generating HTML. Live Airtable runtime loading comes after this verification step.
        </div>
      </div>
    </div>
  );
}
