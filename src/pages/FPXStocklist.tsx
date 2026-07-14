import { useEffect, useMemo, useState } from 'react';
import { renderFpxTemplate, type SlotFields } from '../data/fpxStocklistTemplate';

const STORAGE_KEY = 'fpx-stocklist-history';

type SlotKey = 'green' | 'blue' | 'orange';

interface SlotForm extends SlotFields {
  recordId: string;
  discountPct: string;
  fetching: boolean;
  fetchError: string;
}

interface HistoryEntry {
  id: string;
  weekLabel: string;
  dateSubmitted: string;
  green: { name: string; url: string };
  blue: { name: string; url: string };
  orange: { name: string; url: string };
  html: string;
}

const SLOT_META: Record<SlotKey, { title: string; badge: string }> = {
  green: { title: 'Slot 1 — Best Single-Packet Deal', badge: 'Green Badge' },
  blue: { title: 'Slot 2 — Best Bulk Deal', badge: 'Blue Badge' },
  orange: { title: 'Slot 3 — Selling Fast', badge: 'Orange Badge' },
};

const SLOT_ORDER: SlotKey[] = ['green', 'blue', 'orange'];

function emptySlot(): SlotForm {
  return {
    name: '',
    url: '',
    imageUrl: '',
    size: '',
    grade: '',
    treatment: '',
    condition: '',
    profile: '',
    pcs: '',
    minOrder: '',
    availability: '',
    dispatch: 'Dispatches in 1-3 days',
    recordId: '',
    discountPct: '',
    fetching: false,
    fetchError: '',
  };
}

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory(entries: HistoryEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

// ── styles (black / white / grey only, no framework) ──
const s = {
  page: { minHeight: '100vh', background: '#ffffff', color: '#000000', fontFamily: "'Helvetica Neue', Arial, sans-serif" } as const,
  header: { borderBottom: '1px solid #000', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } as const,
  title: { margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: '-0.2px' } as const,
  tabs: { display: 'flex', gap: 0, borderBottom: '1px solid #000' } as const,
  tabBtn: (active: boolean) => ({
    padding: '12px 24px',
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '0.3px',
    textTransform: 'uppercase' as const,
    background: active ? '#000' : '#fff',
    color: active ? '#fff' : '#000',
    border: 'none',
    borderRight: '1px solid #000',
    cursor: 'pointer',
  }),
  body: { display: 'flex', gap: 32, padding: 32, alignItems: 'flex-start' } as const,
  col: { flex: 1, minWidth: 0 } as const,
  slotBox: { border: '1px solid #000', padding: 16, marginBottom: 20 } as const,
  slotTitle: { margin: '0 0 12px', fontSize: 13, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.4px' } as const,
  field: { marginBottom: 10 } as const,
  label: { display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.3px', color: '#444', marginBottom: 4 } as const,
  input: { width: '100%', boxSizing: 'border-box' as const, padding: '8px 10px', fontSize: 13, border: '1px solid #999', background: '#fff', color: '#000', fontFamily: 'inherit' },
  btn: { padding: '10px 20px', fontSize: 13, fontWeight: 700, background: '#000', color: '#fff', border: '1px solid #000', cursor: 'pointer', letterSpacing: '0.3px' } as const,
  btnOutline: { padding: '8px 16px', fontSize: 12, fontWeight: 700, background: '#fff', color: '#000', border: '1px solid #000', cursor: 'pointer', letterSpacing: '0.3px' } as const,
  warning: { border: '1px solid #000', background: '#fff8dc', padding: '8px 12px', fontSize: 12, marginBottom: 10, fontWeight: 600 } as const,
  toggle: { display: 'flex', gap: 8, marginBottom: 20 } as const,
  textarea: { width: '100%', height: 560, boxSizing: 'border-box' as const, fontFamily: "'SF Mono', Menlo, Consolas, monospace", fontSize: 11, padding: 12, border: '1px solid #000', resize: 'vertical' as const },
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: 13 },
  th: { textAlign: 'left' as const, borderBottom: '2px solid #000', padding: '8px 10px', fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.3px' },
  td: { borderBottom: '1px solid #ddd', padding: '10px 10px' },
  modalOverlay: { position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 },
  modal: { background: '#fff', border: '1px solid #000', width: '90%', maxWidth: 760, maxHeight: '85vh', display: 'flex', flexDirection: 'column' as const, padding: 20 },
  badge: { display: 'inline-block', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' as const, background: '#fff8dc', border: '1px solid #b8860b', color: '#8a6d00', padding: '2px 8px', marginLeft: 8 },
};

export default function FPXStocklist() {
  const [activeTab, setActiveTab] = useState<'compose' | 'history'>('compose');
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadHistory());
  const [weekLabel, setWeekLabel] = useState('');
  const [weekLabelTouched, setWeekLabelTouched] = useState(false);
  const [mode, setMode] = useState<'manual' | 'airtable'>('manual');
  const [airtableAvailable, setAirtableAvailable] = useState(false);
  const [slots, setSlots] = useState<Record<SlotKey, SlotForm>>({
    green: emptySlot(),
    blue: emptySlot(),
    orange: emptySlot(),
  });
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [copyLabel, setCopyLabel] = useState('Copy to Clipboard');
  const [viewingEntry, setViewingEntry] = useState<HistoryEntry | null>(null);
  const [modalCopyLabel, setModalCopyLabel] = useState('Copy to Clipboard');

  useEffect(() => {
    if (!weekLabelTouched) setWeekLabel(`Week ${history.length + 1}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.length]);

  useEffect(() => {
    fetch('/api/fpx-airtable-status')
      .then((r) => (r.ok ? r.json() : { available: false }))
      .then((data) => setAirtableAvailable(Boolean(data?.available)))
      .catch(() => setAirtableAvailable(false));
  }, []);

  const recentlyFeaturedUrls = useMemo(() => {
    const urls = new Set<string>();
    history.slice(0, 2).forEach((entry) => {
      [entry.green.url, entry.blue.url, entry.orange.url].forEach((u) => {
        if (u) urls.add(u);
      });
    });
    return urls;
  }, [history]);

  function updateSlot(key: SlotKey, patch: Partial<SlotForm>) {
    setSlots((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  }

  async function fetchFromAirtable(key: SlotKey) {
    const recordId = slots[key].recordId.trim();
    if (!recordId) return;
    updateSlot(key, { fetching: true, fetchError: '' });
    try {
      const res = await fetch('/api/fpx-airtable-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recordId }),
      });
      const data = await res.json();
      if (!res.ok) {
        updateSlot(key, { fetching: false, fetchError: data?.error ?? 'Lookup failed' });
        return;
      }
      updateSlot(key, {
        fetching: false,
        fetchError: '',
        name: data.name ?? '',
        size: data.size ?? '',
        grade: data.grade ?? '',
        treatment: data.treatment ?? '',
        condition: data.condition ?? '',
        profile: data.profile ?? '',
        imageUrl: data.imageUrl ?? '',
        url: data.productUrl ?? '',
        pcs: data.pcs ?? '',
        availability: data.availability ?? '',
        minOrder: data.minOrder ?? '',
        discountPct: data.discountPct ?? '',
      });
    } catch (err) {
      updateSlot(key, { fetching: false, fetchError: err instanceof Error ? err.message : 'Lookup failed' });
    }
  }

  function handleGenerate() {
    const html = renderFpxTemplate(weekLabel, slots.green, slots.blue, slots.orange);
    setGeneratedHtml(html);
    setCopyLabel('Copy to Clipboard');

    const entry: HistoryEntry = {
      id: `${Date.now()}`,
      weekLabel,
      dateSubmitted: new Date().toISOString(),
      green: { name: slots.green.name, url: slots.green.url },
      blue: { name: slots.blue.name, url: slots.blue.url },
      orange: { name: slots.orange.name, url: slots.orange.url },
      html,
    };
    const next = [entry, ...history];
    setHistory(next);
    saveHistory(next);
    setWeekLabelTouched(false);
  }

  function copyGenerated() {
    navigator.clipboard.writeText(generatedHtml).then(() => {
      setCopyLabel('Copied!');
      setTimeout(() => setCopyLabel('Copy to Clipboard'), 1500);
    });
  }

  function copyModal() {
    if (!viewingEntry) return;
    navigator.clipboard.writeText(viewingEntry.html).then(() => {
      setModalCopyLabel('Copied!');
      setTimeout(() => setModalCopyLabel('Copy to Clipboard'), 1500);
    });
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <h1 style={s.title}>FPX Weekly Stocklist Manager</h1>
        <span style={{ fontSize: 12, color: '#666' }}>Internal tool — organic-theory.vercel.app/fpx/stocklist</span>
      </div>

      <div style={s.tabs}>
        <button style={s.tabBtn(activeTab === 'compose')} onClick={() => setActiveTab('compose')}>Compose</button>
        <button style={s.tabBtn(activeTab === 'history')} onClick={() => setActiveTab('history')}>History</button>
      </div>

      {activeTab === 'compose' && (
        <div style={s.body}>
          <div style={s.col}>
            <div style={s.field}>
              <label style={s.label}>Week Label</label>
              <input
                style={s.input}
                value={weekLabel}
                onChange={(e) => {
                  setWeekLabel(e.target.value);
                  setWeekLabelTouched(true);
                }}
                placeholder="Week 3"
              />
            </div>

            {airtableAvailable && (
              <div style={s.toggle}>
                <button
                  style={mode === 'manual' ? s.btn : s.btnOutline}
                  onClick={() => setMode('manual')}
                >
                  Manual Entry
                </button>
                <button
                  style={mode === 'airtable' ? s.btn : s.btnOutline}
                  onClick={() => setMode('airtable')}
                >
                  Airtable Lookup
                </button>
              </div>
            )}

            {mode === 'airtable' && airtableAvailable && (
              <div style={{ ...s.slotBox, background: '#fafafa' }}>
                <p style={s.slotTitle}>Slot Selection Rules — FPX Weekly Stocklist</p>
                <p style={{ fontSize: 12, lineHeight: 1.6, margin: '0 0 8px' }}>
                  <strong>Slot 1 — Best Single-Packet Deal (Green):</strong> highest % Discount where Min. Order = 1
                  packet. Pick the top line not featured in the last 2 weeks.
                </p>
                <p style={{ fontSize: 12, lineHeight: 1.6, margin: '0 0 8px' }}>
                  <strong>Slot 2 — Best Bulk Deal (Blue):</strong> highest % Discount where Min. Order &gt; 1 packet.
                  Must be a different SKU from Slot 1.
                </p>
                <p style={{ fontSize: 12, lineHeight: 1.6, margin: '0 0 8px' }}>
                  <strong>Slot 3 — Selling Fast (Orange):</strong> lowest available packet count combined with
                  highest % Discount. Different SKU from Slots 1 and 2. Always write urgency copy for availability.
                </p>
                <p style={{ fontSize: 12, lineHeight: 1.6, margin: 0, color: '#444' }}>
                  Rotation: don't repeat a product two weeks running unless something meaningful changed (price
                  drop, restock, very low packets left). % saving is already calculated in Airtable — use it
                  directly. If unsure, pick the highest discount not featured recently. Never include prices in the
                  email.
                </p>
              </div>
            )}

            {SLOT_ORDER.map((key) => {
              const slot = slots[key];
              const meta = SLOT_META[key];
              const isRecentlyFeatured = Boolean(slot.url) && recentlyFeaturedUrls.has(slot.url);
              return (
                <div key={key} style={s.slotBox}>
                  <p style={s.slotTitle}>
                    {meta.title} <span style={{ color: '#888', fontWeight: 400 }}>({meta.badge})</span>
                    {isRecentlyFeatured && <span style={s.badge}>Featured recently</span>}
                  </p>

                  {isRecentlyFeatured && (
                    <div style={s.warning}>
                      ⚠ This product URL was featured in the last 2 weeks. Only reuse it if something meaningful
                      changed (price drop, restock, very low packets left).
                    </div>
                  )}

                  {mode === 'airtable' && airtableAvailable && (
                    <div style={{ ...s.field, display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                      <div style={{ flex: 1 }}>
                        <label style={s.label}>Airtable Record ID</label>
                        <input
                          style={s.input}
                          value={slot.recordId}
                          onChange={(e) => updateSlot(key, { recordId: e.target.value })}
                          placeholder="recXXXXXXXXXXXXXX"
                        />
                      </div>
                      <button
                        style={s.btnOutline}
                        onClick={() => fetchFromAirtable(key)}
                        disabled={slot.fetching || !slot.recordId.trim()}
                      >
                        {slot.fetching ? 'Fetching…' : 'Fetch from Airtable'}
                      </button>
                    </div>
                  )}
                  {mode === 'airtable' && slot.fetchError && (
                    <div style={{ ...s.warning, background: '#fdecec' }}>{slot.fetchError}</div>
                  )}
                  {mode === 'airtable' && slot.discountPct && (
                    <p style={{ fontSize: 11, color: '#666', margin: '0 0 10px' }}>% Discount: {slot.discountPct}</p>
                  )}

                  <div style={s.field}>
                    <label style={s.label}>Product Name</label>
                    <input style={s.input} value={slot.name} onChange={(e) => updateSlot(key, { name: e.target.value })} />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Product URL</label>
                    <input style={s.input} value={slot.url} onChange={(e) => updateSlot(key, { url: e.target.value })} />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Image URL</label>
                    <input style={s.input} value={slot.imageUrl} onChange={(e) => updateSlot(key, { imageUrl: e.target.value })} />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Size</label>
                    <input style={s.input} value={slot.size} onChange={(e) => updateSlot(key, { size: e.target.value })} placeholder="300x50 (290x45)" />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Grade</label>
                    <input style={s.input} value={slot.grade} onChange={(e) => updateSlot(key, { grade: e.target.value })} placeholder="SG8" />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Treatment</label>
                    <input style={s.input} value={slot.treatment} onChange={(e) => updateSlot(key, { treatment: e.target.value })} placeholder="H3.2" />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Condition</label>
                    <input style={s.input} value={slot.condition} onChange={(e) => updateSlot(key, { condition: e.target.value })} placeholder="Kiln Dried" />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Profile</label>
                    <input style={s.input} value={slot.profile} onChange={(e) => updateSlot(key, { profile: e.target.value })} placeholder="Machine Gauged" />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Pcs per pack</label>
                    <input style={s.input} value={slot.pcs} onChange={(e) => updateSlot(key, { pcs: e.target.value })} />
                  </div>
                  {key !== 'green' && (
                    <div style={s.field}>
                      <label style={s.label}>Min. order</label>
                      <input style={s.input} value={slot.minOrder} onChange={(e) => updateSlot(key, { minOrder: e.target.value })} />
                    </div>
                  )}
                  <div style={s.field}>
                    <label style={s.label}>
                      Availability {key === 'orange' && <span style={{ color: '#888', fontWeight: 400 }}>(urgency copy, e.g. "Only 4 packets remaining")</span>}
                    </label>
                    <input style={s.input} value={slot.availability} onChange={(e) => updateSlot(key, { availability: e.target.value })} />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Dispatch</label>
                    <input style={s.input} value={slot.dispatch} onChange={(e) => updateSlot(key, { dispatch: e.target.value })} />
                  </div>
                </div>
              );
            })}

            <button style={s.btn} onClick={handleGenerate}>Generate HTML</button>
          </div>

          <div style={s.col}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={s.label}>Generated HTML</label>
              {generatedHtml && (
                <button style={s.btnOutline} onClick={copyGenerated}>{copyLabel}</button>
              )}
            </div>
            <textarea style={s.textarea} readOnly value={generatedHtml} placeholder="Generated HTML will appear here after clicking Generate HTML." />
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div style={{ padding: 32 }}>
          {history.length === 0 ? (
            <p style={{ fontSize: 13, color: '#666' }}>No submissions yet.</p>
          ) : (
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Week</th>
                  <th style={s.th}>Date Submitted</th>
                  <th style={s.th}>Green Product</th>
                  <th style={s.th}>Blue Product</th>
                  <th style={s.th}>Orange Product</th>
                  <th style={s.th}></th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry) => (
                  <tr key={entry.id}>
                    <td style={s.td}>{entry.weekLabel}</td>
                    <td style={s.td}>{new Date(entry.dateSubmitted).toLocaleString()}</td>
                    <td style={s.td}>{entry.green.name || '—'}</td>
                    <td style={s.td}>{entry.blue.name || '—'}</td>
                    <td style={s.td}>{entry.orange.name || '—'}</td>
                    <td style={s.td}>
                      <button style={s.btnOutline} onClick={() => { setViewingEntry(entry); setModalCopyLabel('Copy to Clipboard'); }}>
                        View HTML
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {viewingEntry && (
        <div style={s.modalOverlay} onClick={() => setViewingEntry(null)}>
          <div style={s.modal} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{viewingEntry.weekLabel} — HTML</h2>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={s.btnOutline} onClick={copyModal}>{modalCopyLabel}</button>
                <button style={s.btnOutline} onClick={() => setViewingEntry(null)}>Close</button>
              </div>
            </div>
            <textarea style={{ ...s.textarea, height: 480 }} readOnly value={viewingEntry.html} />
          </div>
        </div>
      )}
    </div>
  );
}
