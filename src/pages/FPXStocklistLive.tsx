import { useMemo, useState } from 'react';
import { renderFpxTemplate, type SlotFields } from '../data/fpxStocklistTemplate';
import {
  categoriesOverlap,
  exactCooldownKeys,
  hasSentWeek,
  isOnExactCooldown,
  parseWeek,
  selectWeeklyRecommendations,
  type Candidate,
  type HistoryEntry,
  type SlotKey,
} from '../data/fpxRecommendationEngine';
import { BASELINE_HISTORY, CURRENT_OFFERS, WEEK_10_CANDIDATES } from '../data/fpxWeek10Data';

const STORAGE_KEY = 'fpx-stocklist-history';
const CTA_URL = 'https://app.fpx.nz/shop#available-stock';

const FINAL_WEEK_10: HistoryEntry = {
  id: 'week-10-final-2026-09-07',
  weekLabel: 'Week 10',
  dateSubmitted: '2026-09-07T13:44:37+08:00',
  green: {
    name: '300x50 (290x45) SG8 H1.2 Kiln Dried Machine Gauged (4.200m)',
    stockLineId: 'recdrMHARaWqP1UrG',
    productId: 'reck5Iu0QOHNujERO',
    categories: ['Structural (Stress Graded)', 'Internal Framing'],
    url: 'https://app.fpx.nz/products-details?recordId=reck5Iu0QOHNujERO',
  },
  blue: {
    name: '200x50 2Frame H4 Treated Wet Tongue & Groove (4.800m)',
    stockLineId: 'rec429fznsKgup8Ob',
    productId: 'recGgdFiUK04RUf2c',
    categories: ['Retaining'],
    url: 'https://app.fpx.nz/products-details?recordId=recGgdFiUK04RUf2c',
  },
  orange: {
    name: '50x50 (45x45) 2Frame H3.2 Treated Wet Machine Gauged (4.200m)',
    stockLineId: 'recf6HJNc8PFv7ETZ',
    productId: 'reczhxQn7K6RXRvHX',
    categories: ['Pegs', 'Outdoor', 'Balustrades'],
    url: 'https://app.fpx.nz/products-details?recordId=reczhxQn7K6RXRvHX',
  },
};

type Tab = 'compose' | 'history';
function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    const source: HistoryEntry[] = Array.isArray(parsed) && parsed.length ? parsed : BASELINE_HISTORY;
    const withoutWeek10 = source.filter(item => item.weekLabel?.trim().toLowerCase() !== 'week 10');
    const migrated = [FINAL_WEEK_10, ...withoutWeek10];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
  }
  catch {
    return [FINAL_WEEK_10, ...BASELINE_HISTORY.filter(item => item.weekLabel?.trim().toLowerCase() !== 'week 10')];
  }
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
function emptySlot(): SlotFields { return { name:'',url:'',imageUrl:'',size:'',grade:'',treatment:'',condition:'',profile:'',pcs:'',minOrder:'',availability:'',dispatch:'',category:'',savingsPct:'',price:'',length:'',qtyAvailable:'',minOrderQty:'' }; }
function candidateToSlot(c: Candidate): SlotFields {
  const p = parseName(c.name); return { name:c.name,url:c.productUrl,imageUrl:c.imageUrl,size:p.size,grade:p.grade,treatment:p.treatment,condition:p.condition,profile:p.profile,pcs:String(c.pcsPerPack),minOrder:`${c.moq}x Packet${c.moq===1?'':'s'}`,availability:`${c.available}x Packet${c.available===1?'':'s'}`,dispatch:c.dispatch||'',category:c.categories.join(', '),savingsPct:c.discountPct.toFixed(1),price:c.price,length:p.length,qtyAvailable:String(c.available),minOrderQty:String(c.moq) };
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
function currentWeekViolations(candidates: Candidate[]) {
  const violations: string[] = [];
  for(let i=0;i<candidates.length;i+=1) for(let j=i+1;j<candidates.length;j+=1) {
    if(categoriesOverlap(candidates[i],candidates[j])) violations.push(`${candidates[i].slot} and ${candidates[j].slot} share a category.`);
  }
  return violations;
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
  const [selected,setSelected]=useState<Partial<Record<SlotKey,Candidate>>>({});
  const [sentMessage,setSentMessage]=useState('');

  const recommendations=useMemo(()=>selectWeeklyRecommendations(WEEK_10_CANDIDATES,CURRENT_OFFERS,history,weekLabel),[history,weekLabel]);
  const recommendationList=(['green','blue','orange'] as SlotKey[]).map(key=>recommendations[key]).filter((c):c is Candidate=>Boolean(c));
  const cooldown=useMemo(()=>exactCooldownKeys(history,weekLabel),[history,weekLabel]);
  const conflicts=WEEK_10_CANDIDATES.filter(candidate=>isOnExactCooldown(candidate,cooldown));
  const ruleConflicts=currentWeekViolations(recommendationList);
  const loadingBlocked=recommendationList.length!==3||ruleConflicts.length>0;
  const alreadySent=hasSentWeek(history,weekLabel);

  function loadRecommendations(){
    if(loadingBlocked||!recommendations.green||!recommendations.blue||!recommendations.orange)return;
    setSelected(recommendations);
    setSlots({green:candidateToSlot(recommendations.green),blue:candidateToSlot(recommendations.blue),orange:candidateToSlot(recommendations.orange)});
    setLoaded(true); setHtml(''); setSentMessage('');
  }
  function update(slot:SlotKey,field:keyof SlotFields,value:string){ setSlots(p=>({...p,[slot]:{...p[slot],[field]:value}})); }
  function generate(){
    const missing=(['green','blue','orange'] as SlotKey[]).filter(k=>!slots[k].pcs.trim());
    if(missing.length){ alert(`Enter pcs per pack for ${missing.join(', ')} before generating. Check the live FPX listing first.`); return; }
    const generated=addPreferences(patchCtas(renderFpxTemplate(weekLabel,slots.green,slots.blue,slots.orange)));
    setHtml(generated); setView('preview'); setSentMessage('');
  }
  function markWeekSent(){
    if(!html){ alert('Generate the final HTML before marking the week as sent.'); return; }
    if(!selected.green||!selected.blue||!selected.orange){ alert('Load recommendations before marking the week as sent.'); return; }
    const replacing=hasSentWeek(history,weekLabel);
    if(replacing&&!window.confirm(`${weekLabel} already has a history entry. Replace it with the final version you actually sent?`)) return;
    const historySlot=(key:SlotKey)=>({name:slots[key].name,stockLineId:selected[key]!.stockLineId,productId:selected[key]!.productId,categories:selected[key]!.categories,url:selected[key]!.productUrl});
    const entry:HistoryEntry={id:String(Date.now()),weekLabel,dateSubmitted:new Date().toISOString(),green:historySlot('green'),blue:historySlot('blue'),orange:historySlot('orange'),html};
    const withoutWeek=history.filter(item=>item.weekLabel.trim().toLowerCase()!==weekLabel.trim().toLowerCase());
    const next=[entry,...withoutWeek]; setHistory(next); saveHistory(next); setSentMessage(replacing?`${weekLabel} history updated to the final version actually sent.`:`${weekLabel} marked as sent. Cooldown history committed.`);
  }
  function copyHtml(){ navigator.clipboard.writeText(html).then(()=>{setCopy('Copied!');setTimeout(()=>setCopy('Copy HTML'),1200);}); }

  return <div className="use-native-cursor" style={{minHeight:'100vh',background:'#fff',color:'#111',fontFamily:"'Helvetica Neue',Arial,sans-serif"}}>
    <header style={{padding:'20px 28px',borderBottom:'1px solid #111',display:'flex',justifyContent:'space-between',alignItems:'center'}}><strong>FPX Weekly Stocklist Manager</strong><span style={{fontSize:12,color:'#666'}}>Production · George rules active</span></header>
    <nav style={{display:'flex',borderBottom:'1px solid #111'}}>{(['compose','history'] as Tab[]).map(t=><button key={t} onClick={()=>setTab(t)} style={{padding:'12px 22px',border:0,borderRight:'1px solid #111',background:tab===t?'#111':'#fff',color:tab===t?'#fff':'#111',fontWeight:700,cursor:'pointer',textTransform:'uppercase'}}>{t}</button>)}</nav>
    {tab==='compose' ? <main style={{padding:28,maxWidth:1300,margin:'0 auto'}}>
      <section style={{border:'1px solid #111',padding:16,marginBottom:18}}>
        <label style={{display:'block',fontSize:11,fontWeight:800,textTransform:'uppercase',marginBottom:5}}>Week</label>
        <input value={weekLabel} onChange={e=>setWeekLabel(e.target.value)} style={{padding:'8px 10px',border:'1px solid #999',fontSize:14,width:150}} />
        <button onClick={loadRecommendations} disabled={loadingBlocked} style={{marginLeft:12,padding:'10px 16px',background:loadingBlocked?'#aaa':'#111',color:'#fff',border:'1px solid #111',fontWeight:800,cursor:'pointer'}}>Load This Week's Recommendations</button>
        <span style={{marginLeft:10,fontSize:12,color:'#666'}}>Exact stock-line cooldown · all-category separation · Offers priority for Selling Fast.</span>
        {conflicts.length>0&&<div style={{marginTop:12,padding:10,border:'1px solid #d97706',background:'#fff7e6',fontSize:12}}><b>Excluded by exact 2-week cooldown:</b> {conflicts.map(c=>c.name).join(' | ')}</div>}
        {ruleConflicts.length>0&&<div style={{marginTop:12,padding:10,border:'1px solid #b91c1c',background:'#fee2e2',fontSize:12}}><b>Current-week rule conflict:</b> {ruleConflicts.join(' ')}</div>}
      </section>
      {loaded&&<>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:16}}>{recommendationList.map(c=>{const d=slots[c.slot];return <section key={c.slot} style={{border:'1px solid #ddd',borderLeft:`6px solid ${border[c.slot]}`,padding:16}}>
          <div style={{fontSize:11,fontWeight:800,textTransform:'uppercase'}}>{slotNames[c.slot]}</div><h2 style={{fontSize:16,lineHeight:1.35}}>{c.name}</h2>
          <div style={{fontSize:12,lineHeight:1.6,marginBottom:12}}><b>{c.discountPct.toFixed(1)}% off</b> · MOQ {c.moq} · {c.available}x Packets available · {c.source}<br/><b>All categories:</b> {c.categories.join(', ')}<br/><b>Stock-line ID:</b> {c.stockLineId}</div>
          {([['size','Size'],['grade','Grade'],['treatment','Treatment'],['condition','Condition'],['profile','Profile'],['length','Length'],['category','All categories'],['price','Price'],['pcs','Authoritative pcs per pack'],['dispatch','Dispatch (blank when no Leadtime)'],['imageUrl','Pieces Photo URL from linked FPX Product'],['url','Clean FPX Product URL used in email']] as Array<[keyof SlotFields,string]>).map(([f,l])=><label key={f} style={{display:'block',fontSize:11,fontWeight:700,color:'#555',marginTop:7}}>{l}<input value={d[f]} onChange={e=>update(c.slot,f,e.target.value)} style={{display:'block',boxSizing:'border-box',width:'100%',padding:'7px 8px',marginTop:3,border:'1px solid #bbb'}} /></label>)}
          <a href={c.listingUrl} target="_blank" rel="noreferrer" style={{display:'inline-block',marginTop:12,fontSize:12,fontWeight:800,color:'#111'}}>Open exact FPX stock line ↗</a>
        </section>})}</div>
        <div style={{display:'flex',gap:8,marginTop:18,flexWrap:'wrap'}}><button onClick={generate} style={{padding:'11px 18px',background:'#111',color:'#fff',border:'1px solid #111',fontWeight:800,cursor:'pointer'}}>Generate / Preview HTML</button>{html&&<><button onClick={copyHtml} style={{padding:'11px 18px',background:'#fff',border:'1px solid #111',fontWeight:800,cursor:'pointer'}}>{copy}</button><button onClick={()=>setView('preview')} style={{padding:'11px 18px',background:view==='preview'?'#111':'#fff',color:view==='preview'?'#fff':'#111',border:'1px solid #111',fontWeight:800}}>Preview</button><button onClick={()=>setView('code')} style={{padding:'11px 18px',background:view==='code'?'#111':'#fff',color:view==='code'?'#fff':'#111',border:'1px solid #111',fontWeight:800}}>Code</button><button onClick={markWeekSent} disabled={Boolean(sentMessage)} style={{padding:'11px 18px',background:sentMessage?'#aaa':'#1a8638',color:'#fff',border:'1px solid #111',fontWeight:800,cursor:sentMessage?'default':'pointer'}}>{alreadySent?'Update Sent Week':'Mark Week as Sent'}</button></>}</div>
        {sentMessage&&<div style={{marginTop:10,padding:10,border:'1px solid #1a8638',background:'#eef6ef',fontSize:12,fontWeight:700}}>{sentMessage}</div>}
        {html&&(view==='preview'?<iframe title="FPX email preview" srcDoc={html} style={{width:'100%',height:750,border:'1px solid #111',marginTop:12,background:'#fff'}}/>:<textarea readOnly value={html} style={{width:'100%',height:600,boxSizing:'border-box',marginTop:12,padding:12,fontFamily:'monospace',fontSize:11}}/>)}
      </>}
    </main> : <main style={{padding:28,maxWidth:1500,margin:'0 auto'}}><h2 style={{fontSize:18}}>Stocklist History</h2><p style={{fontSize:12,color:'#666'}}>Weeks 1–10 are preserved. New cooldown history is added only by <b>Mark Week as Sent</b>. If a future week is marked prematurely, <b>Update Sent Week</b> can replace that one entry with the final version actually sent.</p><div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}><thead><tr>{['Week','Date Sent','Green Product','Blue Product','Orange Product','HTML'].map(h=><th key={h} style={{textAlign:'left',padding:8,borderBottom:'2px solid #111'}}>{h}</th>)}</tr></thead><tbody>{history.map((h,i)=><tr key={h.id||`${h.weekLabel}-${i}`}><td style={{padding:8,borderBottom:'1px solid #ddd',whiteSpace:'nowrap'}}>{h.weekLabel}</td><td style={{padding:8,borderBottom:'1px solid #ddd',whiteSpace:'nowrap'}}>{h.dateSubmitted?new Date(h.dateSubmitted).toLocaleString():''}</td><td style={{padding:8,borderBottom:'1px solid #ddd'}}>{h.green?.name}</td><td style={{padding:8,borderBottom:'1px solid #ddd'}}>{h.blue?.name}</td><td style={{padding:8,borderBottom:'1px solid #ddd'}}>{h.orange?.name}</td><td style={{padding:8,borderBottom:'1px solid #ddd'}}>{h.html?'Saved':'No HTML'}</td></tr>)}</tbody></table></div></main>}
  </div>;
}
