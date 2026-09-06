import { useEffect, useMemo, useState } from 'react';
import FPXStocklist from './FPXStocklist';

type SlotKey = 'green' | 'blue' | 'orange';

type HistoryEntry = {
  weekLabel?: string;
  green?: { name?: string };
  blue?: { name?: string };
  orange?: { name?: string };
};

type Recommendation = {
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

type RecommendationResponse = {
  currentWeekLabel: string;
  sellingFastThresholdNeedsVerification?: boolean;
  recommendations: Record<SlotKey, Recommendation | null>;
  error?: string;
  needsAirtableCredential?: boolean;
};

const STORAGE_KEY = 'fpx-stocklist-history';

const META: Record<SlotKey, { label: string; rule: string }> = {
  green: {
    label: 'Green — Best Single-Packet Deal',
    rule: 'MOQ = 1 · Available Qty ≥ 2 · Highest Discount %',
  },
  blue: {
    label: 'Blue — Best Bulk Deal',
    rule: 'MOQ > 1 · Available Qty ≥ 2 · Highest Discount %',
  },
  orange: {
    label: 'Orange — Selling Fast',
    rule: 'Selling Fast · MOQ = 1 · Available Qty ≥ 2 · Highest Discount %',
  },
};

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function nextWeekLabel(history: HistoryEntry[]): string {
  const weeks = history
    .map((entry) => Number(String(entry.weekLabel ?? '').match(/(\d+)/)?.[1] ?? 0))
    .filter((n) => Number.isFinite(n) && n > 0);
  const maxWeek = weeks.length ? Math.max(...weeks) : history.length;
  return `Week ${maxWeek + 1}`;
}

function formatPct(value: number): string {
  if (!Number.isFinite(value)) return '—';
  return `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;
}

export default function FPXStocklistWorkspace() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentWeekLabel, setCurrentWeekLabel] = useState('Week 1');
  const [data, setData] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copyLabel, setCopyLabel] = useState<Record<SlotKey, string>>({ green: 'Copy Record ID', blue: 'Copy Record ID', orange: 'Copy Record ID' });

  useEffect(() => {
    const loaded = loadHistory();
    setHistory(loaded);
    setCurrentWeekLabel(nextWeekLabel(loaded));
  }, []);

  const historyCount = useMemo(() => history.length, [history]);

  async function loadRecommendations() {
    const latestHistory = loadHistory();
    setHistory(latestHistory);
    setLoading(true);
    setError('');
    setData(null);
    try {
      const response = await fetch('/api/fpx-stocklist-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: latestHistory, currentWeekLabel }),
      });
      const body = await response.json();
      if (!response.ok) {
        setError(body?.error ?? 'Could not load Airtable recommendations.');
        setData(body);
        return;
      }
      setData(body);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load Airtable recommendations.');
    } finally {
      setLoading(false);
    }
  }

  async function copyRecordId(key: SlotKey, recordId: string) {
    await navigator.clipboard.writeText(recordId);
    setCopyLabel((prev) => ({ ...prev, [key]: 'Copied!' }));
    setTimeout(() => setCopyLabel((prev) => ({ ...prev, [key]: 'Copy Record ID' })), 1200);
  }

  return (
    <>
      <section style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", padding: '24px 32px 0', background: '#fff', color: '#000' }}>
        <div style={{ border: '1px solid #000', padding: 18, maxWidth: 1180, margin: '0 auto 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.5px' }}>Airtable Recommendations</div>
              <div style={{ fontSize: 12, color: '#555', marginTop: 5 }}>
                Reads current stock, respects the two-week cooldown using the full product name including length, and never uses the same exact product in two colours.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'end', flexWrap: 'wrap' }}>
              <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>
                Week
                <input
                  value={currentWeekLabel}
                  onChange={(e) => setCurrentWeekLabel(e.target.value)}
                  style={{ display: 'block', marginTop: 4, padding: '8px 10px', border: '1px solid #999', minWidth: 110 }}
                />
              </label>
              <button
                onClick={loadRecommendations}
                disabled={loading}
                style={{ padding: '10px 16px', background: '#000', color: '#fff', border: '1px solid #000', fontWeight: 700, cursor: loading ? 'wait' : 'pointer' }}
              >
                {loading ? 'Loading…' : 'Load Current Stock Picks'}
              </button>
            </div>
          </div>

          <div style={{ marginTop: 10, fontSize: 11, color: '#666' }}>
            Local history entries detected: {historyCount}. A product used in Week 1 is blocked in Weeks 2 and 3, then becomes eligible again in Week 4.
          </div>

          {error && (
            <div style={{ marginTop: 14, padding: '10px 12px', border: '1px solid #9f1d1d', background: '#fff1f1', fontSize: 12 }}>
              <strong>Airtable recommendations are not active yet.</strong> {error}
              {data?.needsAirtableCredential && (
                <div style={{ marginTop: 5 }}>The ChatGPT Airtable connection does not automatically become a Vercel server credential. The site needs a read-only Airtable token in Vercel before this button can fetch live records.</div>
              )}
            </div>
          )}

          {data?.recommendations && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, marginTop: 16 }}>
              {(['green', 'blue', 'orange'] as SlotKey[]).map((key) => {
                const rec = data.recommendations[key];
                return (
                  <div key={key} style={{ border: '1px solid #aaa', padding: 14, background: '#fafafa' }}>
                    <div style={{ fontSize: 12, fontWeight: 800 }}>{META[key].label}</div>
                    <div style={{ fontSize: 10, color: '#666', marginTop: 3 }}>{META[key].rule}</div>
                    {rec ? (
                      <>
                        <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.35, marginTop: 12 }}>{rec.name}</div>
                        <div style={{ fontSize: 12, lineHeight: 1.7, marginTop: 8 }}>
                          <strong>Discount:</strong> {formatPct(rec.discountPct)}<br />
                          <strong>MOQ:</strong> {rec.minUnits}<br />
                          <strong>Available:</strong> {rec.availableUnits}<br />
                          <strong>Category:</strong> {rec.categories?.length ? rec.categories.join(', ') : '—'}
                        </div>
                        <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                          <button
                            onClick={() => copyRecordId(key, rec.recordId)}
                            style={{ padding: '7px 10px', border: '1px solid #000', background: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                          >
                            {copyLabel[key]}
                          </button>
                          {rec.url && <a href={rec.url} target="_blank" rel="noreferrer" style={{ padding: '7px 10px', border: '1px solid #000', color: '#000', fontSize: 11, fontWeight: 700, textDecoration: 'none' }}>Open Listing</a>}
                        </div>
                      </>
                    ) : (
                      <div style={{ marginTop: 12, fontSize: 12, color: '#777' }}>No eligible product found.</div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {data?.sellingFastThresholdNeedsVerification && (
            <div style={{ marginTop: 12, padding: '8px 10px', border: '1px solid #b8860b', background: '#fff8dc', fontSize: 11 }}>
              Selling Fast verification note: the current Airtable Selling Fast page only exposed records with Available Qty 1–4, so this test build uses ≤4 as the page threshold before applying your Orange rule. Please cross-check this once before we make it permanent.
            </div>
          )}

          <div style={{ marginTop: 12, fontSize: 11, color: '#555' }}>
            For this test version, recommendations sit above the existing generator. Your current manual workflow remains untouched. Once the Airtable credential is live and you confirm the picks/categories are correct, the next pass can auto-fill the three slots instead of requiring you to copy the record IDs.
          </div>
        </div>
      </section>
      <FPXStocklist />
    </>
  );
}
