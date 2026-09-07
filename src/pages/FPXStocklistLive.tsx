import { useMemo, useState } from 'react';
import { renderFpxTemplate, type SlotFields } from '../data/fpxStocklistTemplate';

const STORAGE_KEY = 'fpx-stocklist-history';
const CTA_URL = 'https://app.fpx.nz/shop#available-stock';

type SlotKey = 'green' | 'blue' | 'orange';
type Tab = 'compose' | 'history';
type HistoryEntry = {
  id?: string;
  weekLabel: string;
  dateSubmitted?: string;
  green?: { name?: string; url?: string };
  blue?: { name?: string; url?: string };
  orange?: { name?: string; url?: string };
  html?: string;
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

const BASELINE_HISTORY: HistoryEntry[] = [
  { weekLabel: 'Week 9', dateSubmitted: '2026-08-31T08:27:01', green: { name: '300x50 (290x45) SG8 H1.2 Kiln Dried Machine Gauged (5.400m)' }, blue: { name: '150x50 (140x45) SG10 H3.2 Kiln Dried Machine Gauged (5.400m)' }, orange: { name: '50x25 Merch H3.2 Treated Wet Dressed 4 Sides (3.600m)' } },
  { weekLabel: 'Week 8', dateSubmitted: '2026-08-24T07:11:05', green: { name: '100x50 (90x45) SG10 H3.2 Kiln Dried Machine Gauged (4.200m)' }, blue: { name: '100x50 2Frame H4 Treated Wet Rough Sawn (4.800m)' }, orange: { name: '150x50 (140x45) SG8 H1.2 Kiln Dried Machine Gauged (3.600m)' } },
  { weekLabel: 'Week 7', dateSubmitted: '2026-08-17T08:17:49', green: { name: '100x50 (90x45) SG12 H3.2 Kiln Dried Machine Gauged (6.000m)' }, blue: { name: '150x50 (140x45) SG8 H3.2 Treated Wet Machine Gauged (5.400m)' }, orange: { name: '100x40 Merch H3.2 Treated Wet GripTread (3.600m)' } },
  { weekLabel: 'Week 6', dateSubmitted: '2026-08-10T08:01:12', green: { name: '50x25 Merch H3.2 Treated Wet Dressed 4 Sides (3.600m)' }, blue: { name: '200x50 (190x45) SG8 H1.2 Kiln Dried Machine Gauged (5.400m)' }, orange: { name: '100x25 Merch H3.2 Treated Wet Dressed 4 Sides (3.600m)' } },
  { weekLabel: 'Week 5', dateSubmitted: '2026-08-03T07:29:28', green: { name: '300x50 (290x45) SG8 H1.2 Kiln Dried Machine Gauged (4.200m)' }, blue: { name: '200x50 2Frame H4 Treated Wet Tongue & Groove (5.400m)' }, orange: { name: '100x50 (90x45) SG10 H3.2 Kiln Dried Machine Gauged (3.600m)' } },
  { weekLabel: 'Week 4', dateSubmitted: '2026-07-28T07:27:11', green: { name: '100x25 Merch H3.2 Treated Wet Dressed 4 Sides (4.200m)' }, blue: { name: '200x50 (190x45) SG8 H1.2 Kiln Dried Machine Gauged (6.000m)' }, orange: { name: '150x50 2Frame H4 Treated Wet TGV (5.400m)' } },
  { weekLabel: 'Week 3', dateSubmitted: '2026-07-20T10:15:44', green: { name: '100x50 (90x45) SG12 H3.2 Kiln Dried Machine Gauged (6.000m)' }, blue: { name: '150x50 (140x45) SG8 H1.2 Kiln Dried Machine Gauged (4.200m)' }, orange: { name: '100x25 Merch H3.2 Treated Wet Dressed 4 Sides (3.600m)' } },
  { weekLabel: 'Week 2', dateSubmitted: '2026-07-14T15:41:53', green: { name: '50x25 Merch H3.2 Treated Wet Dressed 4 Sides (4.200m)' }, blue: { name: '150x50 (140x45) SG10 H3.2 Kiln Dried Machine Gauged (5.400m)' }, orange: { name: '75x50 (70x45) SG8 H3.2 Kiln Dried Machine Gauged' } },
  { weekLabel: 'Week 1', dateSubmitted: '2026-07-14T15:41:53', green: { name: '300x50 (290x45) SG8 H1.2 Kiln Dried Machine Gauged (4.800m)' }, blue: { name: '200x50 (190x45) SG8 H1.2 Kiln Dried Machine Gauged (5.400m)' }, orange: { name: '150x50 (140x45) SG12 H3.2 Kiln Dried Machine Gauged (5.400m)' } },
];

const RECOMMENDATIONS: Candidate[] = [
  {
    slot: 'green', name: '300x50 (290x45) SG8 H1.2 Kiln Dried Machine Gauged (4.200m)', discountPct: 36.507936507936506,
    moq: 1, available: 5, categories: ['Stress Graded Timber', 'Internal Framing', 'Treated Timber'],
    url: 'https://app.fpx.nz/products-details?recordId=reck5Iu0QOHNujERO',
    imageUrl: 'https://v5.airtableusercontent.com/v3/u/57/57/1788753600000/_FbuTwtljpYbVHk4057L6w/33XEsdUoNTd-kgPloZTyfvr7bd-Pg_jx_7VaBPM8N9fJC8G2jzP7Cot5w5d9ThdDanDyBOl3ksd9NBMrHwS62xxBheP_9OusRIMk397tW4vcRLAlbM7Axg5hb7RqPgvd1PtYgd5UjHalmis4O_Igtw/BaMbb1HUOc_AuYZTUhYdoLRPSLv1IU5oDdVEW3AM8sg',
    price: '$660/M3 ($9.90/LM)', source: 'Packet Deals',
  },
  {
    slot: 'blue', name: '200x50 (190x45) SG8 H1.2 Kiln Dried Machine Gauged (6.000m)', discountPct: 26.94610778443114,
    moq: 4, available: 17, categories: ['Stress Graded Timber', 'Internal Framing', 'Treated Timber'],
    url: 'https://app.fpx.nz/products-details?recordId=rechqRdpgamG6uPWp',
    imageUrl: 'https://v5.airtableusercontent.com/v3/u/57/57/1788753600000/b3eRNxeRYnwVpC1V5He_uw/FMQP5gIdQwmflHyDC1ZfevlMXIdUawGLRayuwH39hFsl7j4DU9EBAeptUl-8LoytEc_tPQkImSIhCVYfOG2_26EZY66WN1hVTjk19sxremf0yDfzw3XehnMME1s7N9dCojUyCzkzeCnduoxkRefxYw/Q7XJqvH6d7QzqVmNomyKS0CMdLCMhRxG1YRUZOpaGQo',
    price: '$671/M3 ($6.71/LM)', source: 'Bulk Deals',
  },
  {
    slot: 'orange', name: '100x25 Merch H3.2 Treated Wet Dressed 4 Sides (3.600m)', discountPct: 23.076923076923077,
    moq: 1, available: 4, categories: ['Outdoor', 'Treated Timber'],
    url: 'https://app.fpx.nz/products-details?recordId=recZT1wJlKohtcVdV',
    imageUrl: 'https://v5.airtableusercontent.com/v3/u/57/57/1788753600000/NMkrJii-yZ4KN8ntML9xCg/5WcpLT_sC0P0pLgN2L4H-IQwAfI_CJG4U-8J6dC3GsZMIbgU5-clFaMNLwH6GfdSPliFTPD-7T4Oi8cnEHPygaOpQvqdri9GmTd0mGZvXrQ3-idOiaWVUB57qehXQvoj_VDP5-ah27-3pqfxNGuD_Q/rzmhjNNvJsNTtH3dwXk2wY3gnrWvjd7bySOib71gQd0',
    price: '$605/M3 ($1.51/LM)', source: 'Selling Fast',
  },
];

function parseWeek(label: string) { const m = label.match(/(\d+)/); return m ? Number(m[1]) : null; }
function norm(s: string) { return s.trim().replace(/\s+/g, ' ').toLowerCase(); }
function loadHistory(): HistoryEntry[] {
  try { const raw = localStorage.getItem(STORAGE_KEY); const parsed = raw ? JSON.parse(raw) : []; return Array.isArray(parsed) && parsed.length ? parsed : BASELINE_HISTORY; }
  catch { return BASELINE_HISTORY; }
}
function saveHistory(entries: HistoryEntry[]) { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); }
function parseName(name: string) {
  const lm = name.match(/\((\d+(?:\.\d+)?)m\)\s*$/i); const length = lm ? `${lm[1]}m` : '';
  const base = lm ? name.slice(0, lm.index).trim() : name;
  const sm = base.match(/^(\d+x\d+(?:\s*\(\d+x\d+\))?)/i); const size = sm?.[1] || '';
  const rest = size ? base.slice(size.length).trim() : base;
  const tm = rest.match(/\b(H\d(?:\.\d)?|Untreated|UT|Primed)\b/i); const treatment = tm?.[1] || '';
  const grade = tm ? rest.slice(0, tm.index).trim() : rest.split(' ')[0] || '';
  const after = tm ? rest.slice((tm.index || 0) + tm[0].length).trim() : '';
  let condition = ''; let profile = after;
  for (const c of ['Kiln Dried', 'Treated Wet', 'Green Sawn', 'Green']) if (after.toLowerCase().startsWith(c.toLowerCase())) { condition = c; profile = after.slice(c.length).trim(); break; }
  return { size, grade, treatment, condition, profile, length };
}
function emptySlot(): SlotFields { return { name:'',url:'',imageUrl:'',size:'',grade:'',treatment:'',condition:'',profile:'',pcs:'',minOrder:'',availability:'',dispatch:'Dispatches in 1-3 days',category:'',savingsPct:'',price:'',length:'',qtyAvailable:'',minOrderQty:'' }; }
function candidateToSlot(c: Candidate): SlotFields {
  const p = parseName(c.name); return { name:c.name,url:c.url,imageUrl:c.imageUrl,size:p.size,grade:p.grade,treatment:p.treatment,condition:p.condition,profile:p.profile,pcs:'',minOrder:`${c.moq}x Packet${c.moq===1?'':'s'}`,availability:`${c.available}x Packet${c.available===1?'':'s'}`,dispatch:'Dispatches in 1-3 days',category:c.categories.join(', '),savingsPct:c.discountPct.toFixed(1),price:c.price,length:p.length,qtyAvailable:String(c.available),minOrderQty:String(c.moq) };
}
function addPreferences(html: string) {
  if (html.includes('<!-- FPX EMAIL PREFERENCES LINK -->')) return html;
  const i = html.toLowerCase().lastIndexOf('forest products exchange, new zealand'); if (i < 0) return html;
  const e = html.indexOf('</p>', i); if (e < 0) return html;
  const link = `<br><!-- FPX EMAIL PREFERENCES LINK --><a href="{{ update_profile }}" style="display:inline-block;margin-top:12px;color:#777777;font-family:'Open Sans',Arial,sans-serif;font-size:11px;font-weight:600;line-height:1.5;text-decoration:underline;">Manage email preferences or unsubscribe</a>`;
  return html.slice(0,e)+link+html.slice(e);
}
function patchCtas(html: string) {
  return html
    .replace(/href="https:\/\/app\.fpx\.nz\/"([^>]*>View All Listings)/, `href="${CTA_URL}"$1`)
    .replace(/href="https:\/\/app\.fpx\.nz\/"([^>]*>Browse All)/, `href="${CTA_URL}"$1`);
}

const slotNames: Record<SlotKey,string> = { green:'Green — Best Single-Packet Deal', blue:'Blue — Best Bulk Deal', orange:'Orange — Selling Fast' };
const border: Record<SlotKey,string> = { green:'#1a8638', blue:'#286db4', orange:'#e27600' };

export default function FPXStocklistLive() {
  const [tab,setTab]=useState<Tab>('compose');
  const [history,setHistory]=useState<HistoryEntry[]>(()=>loadHistory());
  const maxWeek = useMemo(()=>Math.max(0,...history.map(h=>parseWeek(h.weekLabel)||0)),[history]);
  const [weekLabel,setWeekLabel]=useState(`Week ${Math.max(10,maxWeek+1)}`);
  const [slots,setSlots]=useState<Record<SlotKey,SlotFields>>({green:emptySlot(),blue:emptySlot(),orange:emptySlot()});
  const [loaded,setLoaded]=useState(false);
  const [html,setHtml]=useState('');
  const [view,setView]=useState<'code'|'preview'>('preview');
  const [copy,setCopy]=useState('Copy HTML');

  const blocked = useMemo(()=>{
    const out=new Set<string>(); const w=parseWeek(weekLabel);
    history.forEach(h=>{ const hw=parseWeek(h.weekLabel); if(w===null||hw===null||![1,2].includes(w-hw)) return; [h.green?.name,h.blue?.name,h.orange?.name].forEach(n=>n&&out.add(norm(n))); });
    return out;
  },[history,weekLabel]);
  const conflicts=RECOMMENDATIONS.filter(r=>blocked.has(norm(r.name)));

  function loadRecommendations(){ setSlots({green:candidateToSlot(RECOMMENDATIONS[0]),blue:candidateToSlot(RECOMMENDATIONS[1]),orange:candidateToSlot(RECOMMENDATIONS[2])}); setLoaded(true); setHtml(''); }
  function update(slot:SlotKey,field:keyof SlotFields,value:string){ setSlots(p=>({...p,[slot]:{...p[slot],[field]:value}})); }
  function generate(){
    const missing=(['green','blue','orange'] as SlotKey[]).filter(k=>!slots[k].pcs.trim());
    if(missing.length){ alert(`Enter pcs per pack for ${missing.join(', ')} before generating.`); return; }
    if(history.some(h=>h.weekLabel.trim().toLowerCase()===weekLabel.trim().toLowerCase())){ if(!confirm(`${weekLabel} already exists in history. Generate without adding a duplicate history entry?`)){return;} const generated=addPreferences(patchCtas(renderFpxTemplate(weekLabel,slots.green,slots.blue,slots.orange))); setHtml(generated); setView('preview'); return; }
    const generated=addPreferences(patchCtas(renderFpxTemplate(weekLabel,slots.green,slots.blue,slots.orange)));
    const entry:HistoryEntry={id:String(Date.now()),weekLabel,dateSubmitted:new Date().toISOString(),green:{name:slots.green.name,url:slots.green.url},blue:{name:slots.blue.name,url:slots.blue.url},orange:{name:slots.orange.name,url:slots.orange.url},html:generated};
    const next=[entry,...history]; setHistory(next); saveHistory(next); setHtml(generated); setView('preview');
  }
  function copyHtml(){ navigator.clipboard.writeText(html).then(()=>{setCopy('Copied!');setTimeout(()=>setCopy('Copy HTML'),1200);}); }

  return <div className="use-native-cursor" style={{minHeight:'100vh',background:'#fff',color:'#111',fontFamily:"'Helvetica Neue',Arial,sans-serif"}}>
    <header style={{padding:'20px 28px',borderBottom:'1px solid #111',display:'flex',justifyContent:'space-between',alignItems:'center'}}><strong>FPX Weekly Stocklist Manager</strong><span style={{fontSize:12,color:'#666'}}>Production</span></header>
    <nav style={{display:'flex',borderBottom:'1px solid #111'}}>{(['compose','history'] as Tab[]).map(t=><button key={t} onClick={()=>setTab(t)} style={{padding:'12px 22px',border:0,borderRight:'1px solid #111',background:tab===t?'#111':'#fff',color:tab===t?'#fff':'#111',fontWeight:700,cursor:'pointer',textTransform:'uppercase'}}>{t}</button>)}</nav>
    {tab==='compose' ? <main style={{padding:28,maxWidth:1300,margin:'0 auto'}}>
      <section style={{border:'1px solid #111',padding:16,marginBottom:18}}>
        <label style={{display:'block',fontSize:11,fontWeight:800,textTransform:'uppercase',marginBottom:5}}>Week</label>
        <input value={weekLabel} onChange={e=>setWeekLabel(e.target.value)} style={{padding:'8px 10px',border:'1px solid #999',fontSize:14,width:150}} />
        <button onClick={loadRecommendations} disabled={conflicts.length>0} style={{marginLeft:12,padding:'10px 16px',background:conflicts.length?'#aaa':'#111',color:'#fff',border:'1px solid #111',fontWeight:800,cursor:'pointer'}}>Load This Week's Recommendations</button>
        <span style={{marginLeft:10,fontSize:12,color:'#666'}}>Uses your existing history; does not overwrite it.</span>
        {conflicts.length>0&&<div style={{marginTop:12,padding:10,border:'1px solid #d97706',background:'#fff7e6',fontSize:12}}><b>Cooldown conflict:</b> {conflicts.map(c=>c.name).join(' | ')}</div>}
      </section>
      {loaded&&<>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:16}}>{RECOMMENDATIONS.map(c=>{const d=slots[c.slot];return <section key={c.slot} style={{border:'1px solid #ddd',borderLeft:`6px solid ${border[c.slot]}`,padding:16}}>
          <div style={{fontSize:11,fontWeight:800,textTransform:'uppercase'}}>{slotNames[c.slot]}</div><h2 style={{fontSize:16,lineHeight:1.35}}>{c.name}</h2>
          <div style={{fontSize:12,lineHeight:1.6,marginBottom:12}}><b>{c.discountPct.toFixed(1)}% off</b> · MOQ {c.moq} · {c.available}x Packets available · {c.source}</div>
          {([['size','Size'],['grade','Grade'],['treatment','Treatment'],['condition','Condition'],['profile','Profile'],['length','Length'],['category','Category'],['price','Price'],['pcs','Pcs per pack — REQUIRED'],['dispatch','Dispatch'],['imageUrl','Pieces Photo URL'],['url','FPX Product URL']] as Array<[keyof SlotFields,string]>).map(([f,l])=><label key={f} style={{display:'block',fontSize:11,fontWeight:700,color:f==='pcs'?'#b45309':'#555',marginTop:7}}>{l}<input value={d[f]} onChange={e=>update(c.slot,f,e.target.value)} style={{display:'block',boxSizing:'border-box',width:'100%',padding:'7px 8px',marginTop:3,border:f==='pcs'?'2px solid #d97706':'1px solid #bbb'}} /></label>)}
        </section>})}</div>
        <div style={{display:'flex',gap:8,marginTop:18}}><button onClick={generate} style={{padding:'11px 18px',background:'#111',color:'#fff',border:'1px solid #111',fontWeight:800,cursor:'pointer'}}>Generate & Save Week</button>{html&&<><button onClick={copyHtml} style={{padding:'11px 18px',background:'#fff',border:'1px solid #111',fontWeight:800,cursor:'pointer'}}>{copy}</button><button onClick={()=>setView('preview')} style={{padding:'11px 18px',background:view==='preview'?'#111':'#fff',color:view==='preview'?'#fff':'#111',border:'1px solid #111',fontWeight:800}}>Preview</button><button onClick={()=>setView('code')} style={{padding:'11px 18px',background:view==='code'?'#111':'#fff',color:view==='code'?'#fff':'#111',border:'1px solid #111',fontWeight:800}}>Code</button></>}</div>
        {html&&(view==='preview'?<iframe title="FPX email preview" srcDoc={html} style={{width:'100%',height:750,border:'1px solid #111',marginTop:12,background:'#fff'}}/>:<textarea readOnly value={html} style={{width:'100%',height:600,boxSizing:'border-box',marginTop:12,padding:12,fontFamily:'monospace',fontSize:11}}/>)}
      </>}
    </main> : <main style={{padding:28,maxWidth:1500,margin:'0 auto'}}><h2 style={{fontSize:18}}>Stocklist History</h2><p style={{fontSize:12,color:'#666'}}>Same <code>{STORAGE_KEY}</code> data used by the previous manager. Existing entries are not replaced.</p><div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}><thead><tr>{['Week','Date Submitted','Green Product','Blue Product','Orange Product','HTML'].map(h=><th key={h} style={{textAlign:'left',padding:8,borderBottom:'2px solid #111'}}>{h}</th>)}</tr></thead><tbody>{history.map((h,i)=><tr key={h.id||`${h.weekLabel}-${i}`}><td style={{padding:8,borderBottom:'1px solid #ddd',whiteSpace:'nowrap'}}>{h.weekLabel}</td><td style={{padding:8,borderBottom:'1px solid #ddd',whiteSpace:'nowrap'}}>{h.dateSubmitted?new Date(h.dateSubmitted).toLocaleString():''}</td><td style={{padding:8,borderBottom:'1px solid #ddd'}}>{h.green?.name}</td><td style={{padding:8,borderBottom:'1px solid #ddd'}}>{h.blue?.name}</td><td style={{padding:8,borderBottom:'1px solid #ddd'}}>{h.orange?.name}</td><td style={{padding:8,borderBottom:'1px solid #ddd'}}>{h.html?'Saved':'No HTML'}</td></tr>)}</tbody></table></div></main>}
  </div>;
}
