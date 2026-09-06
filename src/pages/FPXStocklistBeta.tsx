import { useMemo, useState } from 'react';

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
  // Full length-specific product name is the identity. We only normalise
  // casing/whitespace; the trailing length remains part of the key.
  return name.trim().replace(/\s+/g, ' ').toLowerCase();
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

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f3', color: '#111', fontFamily: "'Helvetica Neue', Arial, sans-serif", padding: 32 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', color: '#666' }}>FPX Weekly Stocklist</div>
            <h1 style={{ margin: '6px 0 8px', fontSize: 30 }}>Airtable Recommendation Beta</h1>
            <p style={{ margin: 0, maxWidth: 720, lineHeight: 1.6, color: '#555' }}>
              Review-only beta. It uses the same browser history as the current generator, treats the full product name including length as the product identity, and blocks anything featured in either of the previous two weeks.
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
            Cooldown rule: featured in Week N → blocked in Weeks N+1 and N+2 → eligible again in Week N+3.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 16 }}>
          {CURRENT_RECOMMENDATIONS.map((item) => {
            const isBlocked = blockedNames.has(normaliseProduct(item.name));
            return (
              <div key={item.slot} style={{ ...slotStyle[item.slot], background: '#fff', borderTop: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase' }}>{slotLabel[item.slot]}</div>
                  <div style={{ fontSize: 11, fontWeight: 800, padding: '3px 7px', border: `1px solid ${isBlocked ? '#b91c1c' : '#15803d'}`, color: isBlocked ? '#b91c1c' : '#15803d' }}>
                    {isBlocked ? 'BLOCKED' : 'ELIGIBLE'}
                  </div>
                </div>

                <h2 style={{ fontSize: 18, lineHeight: 1.35, margin: '14px 0 12px' }}>{item.name}</h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13 }}>
                  <div><strong>Discount</strong><br />{item.discountPct.toFixed(2)}%</div>
                  <div><strong>MOQ units</strong><br />{item.moq}</div>
                  <div><strong>Available qty</strong><br />{item.available}</div>
                  <div><strong>Airtable source</strong><br />{item.source}</div>
                </div>

                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', color: '#666', marginBottom: 5 }}>Categories from linked FPX Product</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {item.categories.map((category) => (
                      <span key={category} style={{ border: '1px solid #bbb', padding: '4px 7px', fontSize: 11 }}>{category}</span>
                    ))}
                  </div>
                </div>

                <a href={item.url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: 16, color: '#111', fontWeight: 800, fontSize: 13 }}>
                  Open FPX Listing ↗
                </a>
              </div>
            );
          })}
        </div>

        <div style={{ background: '#fff8dc', border: '1px solid #d6b85a', padding: 16, marginTop: 20, fontSize: 13, lineHeight: 1.55 }}>
          <strong>Beta source note:</strong> these recommendations are a current Airtable snapshot for cross-checking. The live Vercel app does not yet have Airtable runtime credentials, so this page intentionally does not pretend it is live-syncing. Once the selections/categories are confirmed, the same logic can be connected to live Airtable data.
        </div>

        <div style={{ background: '#fff', border: '1px solid #ddd', padding: 16, marginTop: 16, fontSize: 13, lineHeight: 1.6 }}>
          <strong>Permanent generated-email CTA target:</strong> https://app.fpx.nz/shop#available-stock
        </div>
      </div>
    </div>
  );
}
