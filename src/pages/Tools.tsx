import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, Copy, Check, Upload } from 'lucide-react';
import { ScrambleText } from '../components/ScrambleText';
import { TextReveal } from '../components/TextReveal';

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Shared helpers ────────────────────────────────────────────

function ScorePill({ score }: { score: number }) {
  const color = score >= 80 ? 'text-green-400 border-green-400/30' : score >= 50 ? 'text-yellow-400 border-yellow-400/30' : score > 0 ? 'text-red-400 border-red-400/30' : 'text-[#A1A1AA] border-[#FAFAFA]/10';
  return <span className={`text-[10px] font-bold border px-2 py-0.5 ${color}`}>{score > 0 ? `${score}/100` : '-'}</span>;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <button onClick={copy} className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-bold text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors">
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

const inputCls = 'w-full bg-transparent border-b border-[#FAFAFA]/15 py-3 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#FAFAFA]/60 transition-colors placeholder:text-[#FAFAFA]/30';
const labelCls = 'text-[10px] tracking-[0.25em] uppercase text-[#A1A1AA] block mb-2 font-bold';
const textareaCls = 'w-full bg-transparent border border-[#FAFAFA]/10 p-4 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#FAFAFA]/30 transition-colors placeholder:text-[#FAFAFA]/30 resize-none';

// ─── SEO TOOLS ────────────────────────────────────────────────

function scoreTitle(t: string) {
  const l = t.length;
  if (!l) return { score: 0, note: 'Enter a title.' };
  if (l < 30) return { score: 40, note: 'Too short. Aim for 50–60 characters.' };
  if (l <= 60) return { score: 100, note: 'Perfect length.' };
  if (l <= 70) return { score: 70, note: 'Slightly long - may get truncated.' };
  return { score: 30, note: 'Too long. Google will truncate this.' };
}
function scoreDesc(d: string) {
  const l = d.length;
  if (!l) return { score: 0, note: 'Enter a description.' };
  if (l < 70) return { score: 40, note: 'Too short. Aim for 120–160 characters.' };
  if (l <= 160) return { score: 100, note: 'Perfect length.' };
  if (l <= 180) return { score: 70, note: 'Slightly long - may be truncated.' };
  return { score: 30, note: 'Too long. Keep under 160 characters.' };
}

function MetaLens() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const tS = scoreTitle(title), dS = scoreDesc(desc);
  return (
    <div className="space-y-8">
      <div>
        <label className={labelCls}>Meta Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Your page title…" maxLength={100} className={inputCls} />
        <div className="flex justify-between mt-1"><span className="text-xs opacity-40">{title.length} chars - {tS.note}</span><ScorePill score={tS.score} /></div>
      </div>
      <div>
        <label className={labelCls}>Meta Description</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Your meta description…" rows={3} maxLength={250} className={`${textareaCls} border-b border-[#FAFAFA]/15 border-0 border-b p-0`} />
        <div className="flex justify-between mt-1"><span className="text-xs opacity-40">{desc.length} chars - {dS.note}</span><ScorePill score={dS.score} /></div>
      </div>
      {(title || desc) && (
        <div className="border border-[#FAFAFA]/10 p-6 bg-[#FAFAFA]/[0.02]">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-4">SERP Preview</p>
          <div className="text-[#4d90fe] text-base truncate">{title || 'Your Page Title'}</div>
          <div className="text-green-600 text-xs mt-0.5">https://yoursite.com/page</div>
          <div className="text-[#FAFAFA]/50 text-sm mt-1 leading-relaxed line-clamp-2">{desc || 'Your meta description will appear here…'}</div>
        </div>
      )}
    </div>
  );
}

function KeywordDensity() {
  const [text, setText] = useState('');
  const stop = new Set(['the','and','for','are','but','not','you','all','can','was','one','our','out','get','has','its','let','may','now','put','say','she','too','use','way','who','did','they','that','this','with','from','have','been','will','were','what','when','which','your','also','about','their','there','these','those','would','could','should','after','into','more','some','than','then','them','over','each','both','back','said','just','make','like','time','very','even','most','much','such','only','come','here','well','many','same','take','does','made','used','help','line','give','good','long','high','work','last','next','real','part','need','open','must']);
  const results = text.trim() ? (() => {
    const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const freq: Record<string, number> = {};
    words.forEach(w => { if (!stop.has(w)) freq[w] = (freq[w] || 0) + 1; });
    const total = words.length || 1;
    return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([word, count]) => ({ word, count, pct: ((count / total) * 100).toFixed(1) }));
  })() : [];
  return (
    <div className="space-y-6">
      <div><label className={labelCls}>Paste your content</label><textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your page content here…" rows={7} className={textareaCls} /></div>
      {results.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-4">Top keywords</p>
          {results.map(r => (
            <div key={r.word} className="flex items-center gap-4">
              <span className="text-sm w-32 opacity-80">{r.word}</span>
              <div className="flex-1 h-px bg-[#FAFAFA]/10 relative"><div className="absolute left-0 top-0 h-full bg-[#FAFAFA]/40 transition-all duration-500" style={{ width: `${Math.min(100, parseFloat(r.pct) * 10)}%` }} /></div>
              <span className="text-xs opacity-40 w-20 text-right">{r.count}x ({r.pct}%)</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function HeadingAudit() {
  const [html, setHtml] = useState('');
  const headings = (() => {
    const tags: { level: number; text: string }[] = [];
    const re = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi;
    let m;
    while ((m = re.exec(html)) !== null) tags.push({ level: parseInt(m[1]), text: m[2].replace(/<[^>]+>/g, '') });
    return tags;
  })();
  const h1Count = headings.filter(h => h.level === 1).length;
  return (
    <div className="space-y-6">
      <div><label className={labelCls}>Paste HTML or raw content</label><textarea value={html} onChange={e => setHtml(e.target.value)} placeholder="<h1>Main Title</h1><h2>Section</h2>…" rows={7} className={`${textareaCls} font-mono`} /></div>
      {headings.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">Heading tree</p>
            {h1Count !== 1 && <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">⚠ {h1Count === 0 ? 'No H1 found' : `${h1Count} H1s - should be 1`}</span>}
          </div>
          {headings.map((h, i) => (
            <div key={i} className="flex items-baseline gap-3" style={{ paddingLeft: `${(h.level - 1) * 16}px` }}>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold shrink-0 w-6">H{h.level}</span>
              <span className="text-sm opacity-70">{h.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SchemaBuilder() {
  const [type, setType] = useState('Article');
  const [fields, setFields] = useState<Record<string, string>>({});
  const SCHEMAS: Record<string, string[]> = {
    Article: ['headline', 'description', 'author', 'datePublished', 'url'],
    LocalBusiness: ['name', 'description', 'url', 'telephone', 'address'],
    FAQPage: ['question1', 'answer1', 'question2', 'answer2'],
    Product: ['name', 'description', 'brand', 'price', 'currency'],
    Person: ['name', 'jobTitle', 'url', 'sameAs'],
  };
  const buildSchema = () => {
    if (type === 'FAQPage') return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [fields.question1 && { '@type': 'Question', name: fields.question1, acceptedAnswer: { '@type': 'Answer', text: fields.answer1 || '' } }, fields.question2 && { '@type': 'Question', name: fields.question2, acceptedAnswer: { '@type': 'Answer', text: fields.answer2 || '' } }].filter(Boolean) };
    const obj: Record<string, string> = { '@context': 'https://schema.org', '@type': type };
    (SCHEMAS[type] || []).forEach(f => { if (fields[f]) obj[f] = fields[f]; });
    return obj;
  };
  const json = JSON.stringify(buildSchema(), null, 2);
  const output = `<script type="application/ld+json">\n${json}\n</script>`;
  return (
    <div className="space-y-6">
      <div><label className={labelCls}>Schema type</label><select value={type} onChange={e => { setType(e.target.value); setFields({}); }} className={`${inputCls} appearance-none`} style={{ background: 'transparent' }}>{Object.keys(SCHEMAS).map(t => <option key={t} value={t} className="bg-[#09090B]">{t}</option>)}</select></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{(SCHEMAS[type] || []).map(f => (<div key={f}><label className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold block mb-1">{f}</label><input value={fields[f] || ''} onChange={e => setFields(p => ({ ...p, [f]: e.target.value }))} placeholder={f} className="w-full bg-transparent border-b border-[#FAFAFA]/10 py-2 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#FAFAFA]/40 transition-colors placeholder:text-[#FAFAFA]/20" /></div>))}</div>
      <div className="border border-[#FAFAFA]/10 bg-[#FAFAFA]/[0.02] p-4 relative">
        <pre className="text-xs text-[#FAFAFA]/60 overflow-auto max-h-48 font-mono">{output}</pre>
        <div className="absolute top-3 right-3"><CopyButton text={output} /></div>
      </div>
    </div>
  );
}

function OGPreview() {
  const [url, setUrl] = useState(''); const [title, setTitle] = useState(''); const [desc, setDesc] = useState(''); const [image, setImage] = useState('');
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[{ k: 'title', l: 'OG Title', v: title, s: setTitle, p: 'Page title for social sharing' }, { k: 'url', l: 'URL', v: url, s: setUrl, p: 'https://yoursite.com/page' }, { k: 'desc', l: 'OG Description', v: desc, s: setDesc, p: '1–2 sentence summary' }, { k: 'image', l: 'OG Image URL', v: image, s: setImage, p: 'https://yoursite.com/og.jpg (1200×630)' }].map(f => (
          <div key={f.k}><label className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold block mb-1">{f.l}</label><input value={f.v} onChange={e => f.s(e.target.value)} placeholder={f.p} className="w-full bg-transparent border-b border-[#FAFAFA]/15 py-2 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#FAFAFA]/40 transition-colors placeholder:text-[#FAFAFA]/20" /></div>
        ))}
      </div>
      {(title || desc) && (
        <div className="border border-[#FAFAFA]/10 overflow-hidden max-w-md">
          {image ? <img src={image} alt="og" className="w-full h-48 object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} /> : <div className="w-full h-40 bg-[#FAFAFA]/5 flex items-center justify-center text-xs opacity-20">1200×630 recommended</div>}
          <div className="p-4 bg-[#111]">
            <div className="text-[10px] uppercase tracking-wider opacity-30 mb-1">{url ? (() => { try { return new URL(url.startsWith('http') ? url : 'https://' + url).hostname; } catch { return 'yoursite.com'; } })() : 'yoursite.com'}</div>
            <div className="text-sm font-bold text-[#FAFAFA] mb-1 line-clamp-1">{title || 'Page Title'}</div>
            <div className="text-xs opacity-50 line-clamp-2">{desc || 'Description'}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function AEOChecker() {
  const [text, setText] = useState('');
  const result = text.trim() ? (() => {
    const tips: string[] = []; let score = 50;
    const hasQ = /\?/.test(text), hasBullets = /\n[-•*]|\n\d+\./.test(text), sentences = text.split(/[.!?]+/).filter(Boolean), avgLen = sentences.reduce((a, s) => a + s.trim().split(' ').length, 0) / (sentences.length || 1), hasDef = /\bis\b|\bare\b|\bmeans\b|\brefers to\b/i.test(text);
    if (hasQ) score += 15; else tips.push('Include a direct question to match how AI queries are phrased.');
    if (hasBullets) score += 15; else tips.push('Use bullet points or numbered lists - AI models extract structured data easily.');
    if (avgLen <= 20) score += 10; else tips.push('Shorten sentences to under 20 words for better AI parsing.');
    if (hasDef) score += 10; else tips.push('Add a clear definition sentence (e.g., "X is…") for featured snippet eligibility.');
    if (text.length >= 300) score += 10; else tips.push('Aim for at least 300 characters for substantive coverage.');
    return { score: Math.min(100, score), tips };
  })() : null;
  return (
    <div className="space-y-6">
      <div><label className={labelCls}>Paste content to check AI readability</label><textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste a paragraph or article section…" rows={7} className={textareaCls} /></div>
      {result && (
        <div className="border border-[#FAFAFA]/10 p-6 bg-[#FAFAFA]/[0.02] space-y-4">
          <div className="flex items-center justify-between"><div><span className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold block mb-1">AEO Score</span><span className="text-3xl font-display font-bold">{result.score}/100</span></div></div>
          <div className="w-full h-1 bg-[#FAFAFA]/10"><div className="h-full bg-[#FAFAFA]/60 transition-all duration-700" style={{ width: `${result.score}%` }} /></div>
          {result.tips.length > 0 && <div className="space-y-2 pt-2"><p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">Tips</p>{result.tips.map((t, i) => <div key={i} className="flex gap-3 text-sm opacity-60"><span className="text-[#A1A1AA] shrink-0">-</span>{t}</div>)}</div>}
        </div>
      )}
    </div>
  );
}

// ─── WRITING TOOLS ────────────────────────────────────────────

function WordCounter() {
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;
  const readTime = Math.max(1, Math.ceil(words / 200));
  const stats = [
    { label: 'Words', value: words },
    { label: 'Characters', value: chars },
    { label: 'Chars (no spaces)', value: charsNoSpace },
    { label: 'Sentences', value: sentences },
    { label: 'Paragraphs', value: paragraphs },
    { label: 'Read time', value: `~${readTime} min` },
  ];
  return (
    <div className="space-y-6">
      <div><label className={labelCls}>Paste or type content</label><textarea value={text} onChange={e => setText(e.target.value)} placeholder="Start typing or paste your content…" rows={8} className={textareaCls} /></div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#FAFAFA]/10">
        {stats.map(s => (
          <div key={s.label} className="bg-[#09090B] px-5 py-4">
            <div className="text-xl md:text-2xl font-display text-[#FAFAFA]">{s.value}</div>
            <div className="text-[9px] tracking-[0.25em] uppercase text-[#A1A1AA] opacity-60 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GrammarChecker() {
  const [text, setText] = useState('');
  const issues = text.trim() ? (() => {
    const found: { type: string; message: string; example?: string }[] = [];
    const passiveRe = /\b(was|were|is|are|been|be|being)\s+\w+ed\b/gi;
    const passiveMatches = text.match(passiveRe);
    if (passiveMatches && passiveMatches.length > 1) found.push({ type: 'Passive Voice', message: `${passiveMatches.length} passive constructions found. Active voice is more direct.`, example: passiveMatches[0] });
    const weakAdverbs = ['very', 'really', 'quite', 'rather', 'somewhat', 'fairly', 'extremely', 'incredibly'];
    const usedAdverbs = weakAdverbs.filter(a => new RegExp(`\\b${a}\\b`, 'i').test(text));
    if (usedAdverbs.length) found.push({ type: 'Weak Adverbs', message: `Found: "${usedAdverbs.join('", "')}". These dilute impact - try stronger words or cut them.` });
    const filler = ['in order to', 'due to the fact that', 'at this point in time', 'it is important to note', 'as a matter of fact', 'needless to say'];
    const usedFiller = filler.filter(f => text.toLowerCase().includes(f));
    if (usedFiller.length) found.push({ type: 'Filler Phrases', message: `Found: "${usedFiller.join('", "')}". These add length without meaning - cut or replace.` });
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const longSentences = sentences.filter(s => s.trim().split(/\s+/).length > 30);
    if (longSentences.length) found.push({ type: 'Long Sentences', message: `${longSentences.length} sentence(s) exceed 30 words. Break them up for clarity.` });
    const doubleSpace = /  +/.test(text);
    if (doubleSpace) found.push({ type: 'Double Spaces', message: 'Multiple consecutive spaces detected. Use single spaces between words.' });
    const aiCliches = ['delve into', 'it\'s important to', 'in conclusion', 'leverage', 'synergy', 'utilize', 'paradigm shift', 'game-changer', 'cutting-edge', 'best practices'];
    const usedCliches = aiCliches.filter(c => text.toLowerCase().includes(c));
    if (usedCliches.length) found.push({ type: 'Overused / AI Phrases', message: `Found: "${usedCliches.join('", "')}". These read as generic - swap for specific language.` });
    return found;
  })() : [];

  return (
    <div className="space-y-6">
      <div><label className={labelCls}>Paste content to analyze</label><textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your text here…" rows={8} className={textareaCls} /></div>
      {text.trim() && (
        issues.length === 0
          ? <div className="border border-green-400/20 p-6 text-green-400 text-sm">No issues found. Clean writing.</div>
          : <div className="space-y-3">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">{issues.length} issue{issues.length > 1 ? 's' : ''} found</p>
            {issues.map((iss, i) => (
              <div key={i} className="border border-[#FAFAFA]/10 p-4 bg-[#FAFAFA]/[0.02]">
                <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-amber-400 mb-1">{iss.type}</p>
                <p className="text-sm opacity-60 leading-relaxed">{iss.message}</p>
                {iss.example && <p className="text-xs font-mono opacity-30 mt-1">e.g. "{iss.example}"</p>}
              </div>
            ))}
          </div>
      )}
    </div>
  );
}

function AIHumanizer() {
  const [text, setText] = useState('');
  const replacements: [RegExp, string][] = [
    [/\bdelve into\b/gi, 'explore'], [/\bleverage\b/gi, 'use'], [/\butilize\b/gi, 'use'],
    [/\bin order to\b/gi, 'to'], [/\bsynergy\b/gi, 'collaboration'], [/\bparadigm shift\b/gi, 'major change'],
    [/\boptimize\b/gi, 'improve'], [/\bpivot\b/gi, 'change direction'], [/\bscalable\b/gi, 'scalable'],
    [/\bit is important to note that\b/gi, 'notably,'], [/\bit's worth noting that\b/gi, ''],
    [/\bin conclusion\b/gi, 'to sum up'], [/\bfurthermore\b/gi, 'also'], [/\bmoreover\b/gi, 'also'],
    [/\bsubsequently\b/gi, 'then'], [/\bnevertheless\b/gi, 'still'], [/\bnotwithstanding\b/gi, 'despite this'],
    [/\bthus\b/gi, 'so'], [/\bhence\b/gi, 'so'], [/\bfacilitate\b/gi, 'help'],
    [/\bimplement\b/gi, 'put in place'], [/\bincorporate\b/gi, 'include'],
    [/\bcommence\b/gi, 'start'], [/\bterminate\b/gi, 'end'], [/\bpurchase\b/gi, 'buy'],
    [/\bassist\b/gi, 'help'], [/\bprovide\b/gi, 'give'], [/\bobtain\b/gi, 'get'],
    [/\bI hope this (email|message) finds you well\.?\s*/gi, ''],
    [/\bAs an AI language model,?\s*/gi, ''],
    [/\bCertainly!?\s*/gi, ''], [/\bAbsolutely!?\s*/gi, ''],
  ];
  const humanized = text ? replacements.reduce((t, [re, rep]) => t.replace(re, rep), text).replace(/\s{2,}/g, ' ').trim() : '';
  const changeCount = text ? replacements.filter(([re]) => re.test(text)).length : 0;

  return (
    <div className="space-y-6">
      <div><label className={labelCls}>Paste AI-generated or stiff text</label><textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste text to humanize…" rows={7} className={textareaCls} /></div>
      {humanized && humanized !== text && (
        <div className="border border-[#FAFAFA]/10 bg-[#FAFAFA]/[0.02] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">{changeCount} substitution{changeCount !== 1 ? 's' : ''} made</p>
            <CopyButton text={humanized} />
          </div>
          <p className="text-sm leading-relaxed text-[#FAFAFA]/80 whitespace-pre-wrap">{humanized}</p>
        </div>
      )}
      {humanized && humanized === text && text.trim() && (
        <div className="border border-green-400/20 p-4 text-green-400 text-sm">Already reads naturally - no substitutions needed.</div>
      )}
      <p className="text-[10px] opacity-30 leading-relaxed">Rule-based substitutions. Review output - context changes meaning.</p>
    </div>
  );
}

function ReadingLevel() {
  const [text, setText] = useState('');
  const result = text.trim() ? (() => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length || 1;
    const wordList = text.trim().split(/\s+/).filter(Boolean);
    const words = wordList.length || 1;
    const syllables = wordList.reduce((acc, word) => {
      const w = word.toLowerCase().replace(/[^a-z]/g, '');
      const count = w.replace(/[^aeiouy]/g, '').length || 1;
      return acc + count;
    }, 0);
    const fk = Math.max(0, Math.min(100, 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)));
    let grade = '', desc = '';
    if (fk >= 90) { grade = '5th grade'; desc = 'Very Easy - ideal for general audiences.'; }
    else if (fk >= 80) { grade = '6th grade'; desc = 'Easy - conversational, most adults comfortable.'; }
    else if (fk >= 70) { grade = '7th grade'; desc = 'Fairly Easy - good for general web copy.'; }
    else if (fk >= 60) { grade = '8–9th grade'; desc = 'Standard - mainstream media level.'; }
    else if (fk >= 50) { grade = '10–12th grade'; desc = 'Fairly Difficult - academic / professional.'; }
    else if (fk >= 30) { grade = 'College'; desc = 'Difficult - consider simplifying for wider reach.'; }
    else { grade = 'Graduate'; desc = 'Very Difficult - highly technical or dense.'; }
    return { fk: Math.round(fk), grade, desc, words, sentences, avgWords: (words / sentences).toFixed(1) };
  })() : null;
  return (
    <div className="space-y-6">
      <div><label className={labelCls}>Paste content</label><textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste text to measure reading level…" rows={7} className={textareaCls} /></div>
      {result && (
        <div className="border border-[#FAFAFA]/10 p-6 bg-[#FAFAFA]/[0.02] space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div><span className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold block mb-1">Flesch Reading Score</span><span className="text-4xl font-display">{result.fk}</span></div>
            <div className="text-right"><span className="text-sm font-bold text-[#FAFAFA]/80">{result.grade}</span><p className="text-xs opacity-50 mt-1 max-w-[200px]">{result.desc}</p></div>
          </div>
          <div className="w-full h-1.5 bg-[#FAFAFA]/10 rounded-full"><div className="h-full bg-[#FAFAFA]/60 rounded-full transition-all duration-700" style={{ width: `${result.fk}%` }} /></div>
          <div className="grid grid-cols-3 gap-4 pt-2">
            {[{ l: 'Words', v: result.words }, { l: 'Sentences', v: result.sentences }, { l: 'Avg words/sentence', v: result.avgWords }].map(s => <div key={s.l}><div className="text-lg font-display">{s.v}</div><div className="text-[9px] tracking-[0.2em] uppercase opacity-40">{s.l}</div></div>)}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DEV / BUILD TOOLS ────────────────────────────────────────

function UTMBuilder() {
  const [base, setBase] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const url = (() => {
    if (!base) return '';
    try {
      const u = new URL(base.startsWith('http') ? base : 'https://' + base);
      if (source) u.searchParams.set('utm_source', source);
      if (medium) u.searchParams.set('utm_medium', medium);
      if (campaign) u.searchParams.set('utm_campaign', campaign);
      if (term) u.searchParams.set('utm_term', term);
      if (content) u.searchParams.set('utm_content', content);
      return u.toString();
    } catch { return ''; }
  })();
  const fields = [
    { label: 'Website URL *', v: base, s: setBase, p: 'https://yoursite.com/page' },
    { label: 'Campaign Source *', v: source, s: setSource, p: 'google, newsletter, linkedin' },
    { label: 'Campaign Medium *', v: medium, s: setMedium, p: 'cpc, email, social' },
    { label: 'Campaign Name *', v: campaign, s: setCampaign, p: 'summer_sale, launch_2025' },
    { label: 'Campaign Term', v: term, s: setTerm, p: 'seo+tools (optional)' },
    { label: 'Campaign Content', v: content, s: setContent, p: 'cta_button (optional)' },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map(f => <div key={f.label}><label className={labelCls}>{f.label}</label><input value={f.v} onChange={e => f.s(e.target.value)} placeholder={f.p} className={inputCls} /></div>)}
      </div>
      {url && (
        <div className="border border-[#FAFAFA]/10 bg-[#FAFAFA]/[0.02] p-5">
          <div className="flex items-center justify-between mb-3"><p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">Generated URL</p><CopyButton text={url} /></div>
          <p className="text-xs font-mono text-[#FAFAFA]/60 break-all">{url}</p>
        </div>
      )}
    </div>
  );
}

function SlugGenerator() {
  const [text, setText] = useState('');
  const slug = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '');
  return (
    <div className="space-y-6">
      <div><label className={labelCls}>Page title or phrase</label><input value={text} onChange={e => setText(e.target.value)} placeholder="My Amazing Blog Post Title" className={inputCls} /></div>
      {slug && (
        <div className="border border-[#FAFAFA]/10 bg-[#FAFAFA]/[0.02] p-5">
          <div className="flex items-center justify-between mb-2"><p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">URL Slug</p><CopyButton text={slug} /></div>
          <p className="text-lg font-mono text-[#FAFAFA]/80">{slug}</p>
        </div>
      )}
    </div>
  );
}

function JSONFormatter() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'pretty' | 'minify'>('pretty');
  const output = (() => {
    if (!input.trim()) return '';
    try {
      const parsed = JSON.parse(input);
      setError('');
      return mode === 'pretty' ? JSON.stringify(parsed, null, 2) : JSON.stringify(parsed);
    } catch (e) {
      setError((e as Error).message);
      return '';
    }
  })();
  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        {(['pretty', 'minify'] as const).map(m => <button key={m} onClick={() => setMode(m)} className={`text-[10px] tracking-[0.2em] uppercase font-bold border px-4 py-1.5 transition-all duration-200 ${mode === m ? 'border-[#FAFAFA]/40 text-[#FAFAFA]' : 'border-[#FAFAFA]/10 text-[#A1A1AA] hover:border-[#FAFAFA]/25'}`}>{m}</button>)}
      </div>
      <div><label className={labelCls}>Paste JSON</label><textarea value={input} onChange={e => setInput(e.target.value)} placeholder={'{\n  "key": "value"\n}'} rows={7} className={`${textareaCls} font-mono`} /></div>
      {error && <p className="text-xs text-red-400 font-mono">{error}</p>}
      {output && (
        <div className="border border-[#FAFAFA]/10 bg-[#FAFAFA]/[0.02] p-4 relative">
          <div className="absolute top-3 right-3"><CopyButton text={output} /></div>
          <pre className="text-xs font-mono text-[#FAFAFA]/60 overflow-auto max-h-64">{output}</pre>
        </div>
      )}
    </div>
  );
}

function SubjectScorer() {
  const [subject, setSubject] = useState('');
  const score = subject ? (() => {
    let s = 50;
    const l = subject.length;
    if (l >= 30 && l <= 50) s += 20; else if (l < 20 || l > 70) s -= 20;
    if (/\d/.test(subject)) s += 10;
    if (subject.includes('?')) s += 10;
    if (/\b(free|secret|instant|proven|limited|exclusive|save|new|now|discover)\b/i.test(subject)) s += 10;
    if (/\p{Emoji}/u.test(subject)) s += 5;
    return Math.min(100, Math.max(0, s));
  })() : null;
  const grade = score === null ? '' : score >= 80 ? 'Strong' : score >= 60 ? 'Good' : score >= 40 ? 'Weak' : 'Poor';
  const color = score === null ? '' : score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400';
  return (
    <div className="space-y-6">
      <div><label className={labelCls}>Email subject line</label><input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Your subject line here…" className={inputCls} /><span className="text-xs opacity-40 mt-1 block">{subject.length} characters</span></div>
      {score !== null && (
        <div className="border border-[#FAFAFA]/10 p-6 bg-[#FAFAFA]/[0.02] space-y-4">
          <div className="flex items-center justify-between"><span className={`text-2xl font-display font-bold ${color}`}>{score}/100</span><span className={`text-sm font-bold ${color}`}>{grade}</span></div>
          <div className="w-full h-1 bg-[#FAFAFA]/10"><div className={`h-full transition-all duration-700 ${score >= 80 ? 'bg-green-400' : score >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`} style={{ width: `${score}%` }} /></div>
          <ul className="space-y-1 text-xs opacity-50">
            <li>{subject.length >= 30 && subject.length <= 50 ? '✓' : '-'} Ideal length (30–50 chars)</li>
            <li>{/\d/.test(subject) ? '✓' : '-'} Contains a number</li>
            <li>{subject.includes('?') ? '✓' : '-'} Contains a question</li>
            <li>{/\p{Emoji}/u.test(subject) ? '✓' : '-'} Contains an emoji</li>
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── IMAGE TOOLS ──────────────────────────────────────────────

function ImageCompressor() {
  const [original, setOriginal] = useState<{ src: string; size: number; name: string } | null>(null);
  const [compressed, setCompressed] = useState<{ src: string; size: number } | null>(null);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState<'image/jpeg' | 'image/webp' | 'image/png'>('image/jpeg');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const src = e.target?.result as string;
      setOriginal({ src, size: file.size, name: file.name });
      setCompressed(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const compress = useCallback(() => {
    if (!original) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      if (format === 'image/png') ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL(format, format === 'image/png' ? undefined : quality / 100);
      const byteStr = atob(dataUrl.split(',')[1]);
      setCompressed({ src: dataUrl, size: byteStr.length });
    };
    img.src = original.src;
  }, [original, quality, format]);

  const download = () => {
    if (!compressed || !original) return;
    const a = document.createElement('a');
    const ext = format.split('/')[1];
    a.href = compressed.src;
    a.download = original.name.replace(/\.[^.]+$/, '') + '-compressed.' + ext;
    a.click();
  };

  const pct = original && compressed ? Math.round((1 - compressed.size / original.size) * 100) : null;
  const fmt = (b: number) => b > 1024 * 1024 ? (b / 1024 / 1024).toFixed(2) + ' MB' : (b / 1024).toFixed(1) + ' KB';

  return (
    <div className="space-y-6">
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
      {!original ? (
        <button onClick={() => inputRef.current?.click()} className="w-full border border-dashed border-[#FAFAFA]/20 py-16 flex flex-col items-center gap-3 hover:border-[#FAFAFA]/40 transition-colors duration-300 group">
          <Upload size={24} className="opacity-30 group-hover:opacity-60 transition-opacity" />
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold opacity-40 group-hover:opacity-60">Click to upload image</span>
          <span className="text-xs opacity-20">PNG, JPG, WebP - any size</span>
        </button>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold truncate max-w-xs">{original.name}</p>
              <p className="text-xs opacity-40 mt-0.5">Original: {fmt(original.size)}</p>
            </div>
            <button onClick={() => { setOriginal(null); setCompressed(null); }} className="text-[10px] tracking-[0.2em] uppercase opacity-40 hover:opacity-100 transition-opacity">Change</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Format</label>
              <select value={format} onChange={e => setFormat(e.target.value as typeof format)} className={`${inputCls} appearance-none`} style={{ background: 'transparent' }}>
                <option value="image/jpeg" className="bg-[#09090B]">JPEG</option>
                <option value="image/webp" className="bg-[#09090B]">WebP</option>
                <option value="image/png" className="bg-[#09090B]">PNG (lossless)</option>
              </select>
            </div>
            {format !== 'image/png' && (
              <div>
                <label className={labelCls}>Quality - {quality}%</label>
                <input type="range" min={10} max={100} value={quality} onChange={e => setQuality(Number(e.target.value))} className="w-full accent-[#FAFAFA] mt-3" />
              </div>
            )}
          </div>
          <button onClick={compress} className="w-full flex items-center justify-center gap-3 bg-[#FAFAFA] text-[#09090B] py-3 hover:bg-[#A1A1AA] transition-colors duration-300">
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold">Compress Image</span>
          </button>
          {compressed && (
            <div className="border border-[#FAFAFA]/10 bg-[#FAFAFA]/[0.02] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">Result</p>
                  <p className="text-lg font-display">{fmt(compressed.size)} <span className={`text-sm ${pct && pct > 0 ? 'text-green-400' : 'text-red-400'}`}>{pct && pct > 0 ? `−${pct}%` : `+${Math.abs(pct || 0)}%`}</span></p>
                </div>
                <button onClick={download} className="text-[10px] tracking-[0.2em] uppercase font-bold border border-[#FAFAFA]/20 px-4 py-2 hover:bg-[#FAFAFA] hover:text-[#09090B] transition-all duration-200">Download</button>
              </div>
              <img src={compressed.src} alt="preview" className="w-full max-h-48 object-contain border border-[#FAFAFA]/5" />
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Stack showcase ───────────────────────────────────────────

function LogoVercel() {
  return <svg viewBox="0 0 116 100" className="w-7 h-7 fill-current"><path d="M57.5 0L115 100H0L57.5 0z"/></svg>;
}
function LogoReact() {
  return <svg viewBox="0 0 100 100" className="w-7 h-7 fill-none stroke-current" strokeWidth="4"><circle cx="50" cy="50" r="7" fill="currentColor" stroke="none"/><ellipse cx="50" cy="50" rx="46" ry="17"/><ellipse cx="50" cy="50" rx="46" ry="17" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="46" ry="17" transform="rotate(120 50 50)"/></svg>;
}
function LogoMake() {
  return <svg viewBox="0 0 80 40" className="w-9 h-5 fill-current"><circle cx="10" cy="20" r="9"/><line x1="19" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="3"/><circle cx="40" cy="20" r="9"/><line x1="49" y1="20" x2="60" y2="20" stroke="currentColor" strokeWidth="3"/><circle cx="70" cy="20" r="9"/></svg>;
}
function LogoN8N() {
  return <span className="text-[15px] font-black tracking-tighter leading-none">n8n</span>;
}
function LogoClaude() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-current fill-none" strokeWidth="1.8" strokeLinecap="round">
      <line x1="12" y1="2" x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="6" y2="12"/>
      <line x1="18" y1="12" x2="22" y2="12"/>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
      <line x1="19.07" y1="4.93" x2="16.24" y2="7.76"/>
      <line x1="7.76" y1="16.24" x2="4.93" y2="19.07"/>
    </svg>
  );
}
function LogoChatGPT() {
  return (
    <svg viewBox="0 0 41 41" className="w-7 h-7 fill-current">
      <path d="M37.5 16.6a10 10 0 0 0-.9-8.2 10.4 10.4 0 0 0-11.1-5 10 10 0 0 0-7.5-3.4A10.4 10.4 0 0 0 8.1 6.4a10 10 0 0 0-6.7 4.9 10.4 10.4 0 0 0 1.3 12.2 10 10 0 0 0 .9 8.2 10.4 10.4 0 0 0 11.1 5 10 10 0 0 0 7.5 3.3 10.4 10.4 0 0 0 9.9-7.2 10 10 0 0 0 6.7-4.8 10.4 10.4 0 0 0-1.3-11.4zM22 37.3a7.7 7.7 0 0 1-4.9-1.8l.2-.1 8.2-4.7a1.4 1.4 0 0 0 .7-1.2V18.3l3.4 2a.1.1 0 0 1 .1.1v9.5A7.7 7.7 0 0 1 22 37.3zM6 31.2a7.7 7.7 0 0 1-.9-5.2l.2.1 8.2 4.7a1.4 1.4 0 0 0 1.4 0l10-5.8v3.9a.1.1 0 0 1 0 .1l-8.3 4.8A7.7 7.7 0 0 1 6 31.2zm-2-17.9a7.7 7.7 0 0 1 4-3.4V20a1.4 1.4 0 0 0 .7 1.2l10 5.8-3.5 2a.1.1 0 0 1-.1 0L6.8 24A7.7 7.7 0 0 1 4 13.3zM32.4 22l-10-5.8 3.5-2a.1.1 0 0 1 .1 0l8.3 4.8a7.7 7.7 0 0 1-1.2 13.9V23a1.4 1.4 0 0 0-.7-1.1zm3.4-5.2-.2-.1-8.2-4.7a1.4 1.4 0 0 0-1.4 0l-10 5.8v-3.9a.1.1 0 0 1 0-.1l8.3-4.8a7.7 7.7 0 0 1 11.5 8zm-21.8 7.2-3.5-2a.1.1 0 0 1-.1-.1v-9.5a7.7 7.7 0 0 1 12.6-5.9l-.2.1-8.2 4.7a1.4 1.4 0 0 0-.7 1.2zm1.9-4 4.5-2.6 4.5 2.6v5.1l-4.5 2.6-4.5-2.6z"/>
    </svg>
  );
}
function LogoPerplexity() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  );
}
function LogoGemini() {
  return (
    <svg viewBox="0 0 28 28" className="w-7 h-7 fill-current">
      <path d="M14 28A14 14 0 0 0 14 0a14 14 0 0 0 0 28z" opacity=".15"/>
      <path d="M14 0c0 7.73-6.27 14-14 14 7.73 0 14 6.27 14 14 0-7.73 6.27-14 14-14-7.73 0-14-6.27-14-14z"/>
    </svg>
  );
}
function LogoAhrefs() {
  return <span className="text-[13px] font-black tracking-tight leading-none">Ahrefs</span>;
}
function LogoSemrush() {
  return <span className="text-[13px] font-black tracking-tight leading-none">SEMrush</span>;
}
function LogoGSC() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
      <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
  );
}
function LogoScreamingFrog() {
  return (
    <svg viewBox="0 0 40 40" className="w-7 h-7 fill-current">
      <circle cx="14" cy="16" r="5"/><circle cx="26" cy="16" r="5"/>
      <ellipse cx="20" cy="26" rx="12" ry="8"/>
      <circle cx="12" cy="13" r="2" fill="#09090B"/><circle cx="28" cy="13" r="2" fill="#09090B"/>
      <path d="M8 30 Q6 38 4 36" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M32 30 Q34 38 36 36" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  );
}
function LogoZapier() {
  return <span className="text-[13px] font-black tracking-tight leading-none">Zapier</span>;
}
function LogoHubSpot() {
  return (
    <svg viewBox="0 0 40 40" className="w-7 h-7 fill-current">
      <circle cx="28" cy="12" r="6"/><circle cx="28" cy="12" r="3" fill="#09090B"/>
      <path d="M22 12 H8 Q4 12 4 16 V28 Q4 32 8 32 H20 Q24 32 24 28 V20"/>
    </svg>
  );
}
function LogoActiveCampaign() {
  return <span className="text-[11px] font-black tracking-tight leading-none">Active<br/>Campaign</span>;
}
function LogoTailwind() {
  return (
    <svg viewBox="0 0 54 33" className="w-9 h-5 fill-current">
      <path fillRule="evenodd" clipRule="evenodd" d="M27 0C19.8 0 15.3 3.6 13.5 10.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 12.672 33.808 16 40.5 16c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C36.756 3.328 33.692 0 27 0zM13.5 16C6.3 16 1.8 19.6 0 26.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 28.672 20.308 32 27 32c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.256 12.328 20.192 9 13.5 9z"/>
    </svg>
  );
}
function LogoFigma() {
  return (
    <svg viewBox="0 0 38 57" className="w-5 h-7 fill-current">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z"/>
      <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z"/>
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
    </svg>
  );
}
function LogoVite() {
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7 fill-current">
      <path d="M29.9 6.5L16.8 30a.8.8 0 0 1-1.4 0L2.1 6.5a.8.8 0 0 1 .8-1.2l13.1 2.4 13.1-2.4a.8.8 0 0 1 .8 1.2z"/>
    </svg>
  );
}
function LogoSlack() {
  return (
    <svg viewBox="0 0 40 40" className="w-7 h-7 fill-current">
      <rect x="6" y="6" width="10" height="10" rx="3"/>
      <rect x="24" y="6" width="10" height="10" rx="3"/>
      <rect x="6" y="24" width="10" height="10" rx="3"/>
      <rect x="24" y="24" width="10" height="10" rx="3"/>
    </svg>
  );
}

const STACK_CATEGORIES = [
  {
    label: 'SEO & Search',
    color: 'border-blue-400/20 text-blue-400',
    tools: [
      { name: 'Google Search Console', desc: 'Index & performance monitoring', logo: <LogoGSC /> },
      { name: 'Screaming Frog', desc: 'Site crawler & technical audits', logo: <LogoScreamingFrog /> },
      { name: 'Ahrefs', desc: 'Backlink & keyword intelligence', logo: <LogoAhrefs /> },
      { name: 'SEMrush', desc: 'Competitive research', logo: <LogoSemrush /> },
      { name: 'PageSpeed Insights', desc: 'Core Web Vitals analysis', logo: <LogoGSC /> },
    ],
  },
  {
    label: 'Automation',
    color: 'border-amber-400/20 text-amber-400',
    tools: [
      { name: 'Make', desc: 'Visual workflow automation', logo: <LogoMake /> },
      { name: 'n8n', desc: 'Self-hosted automation builder', logo: <LogoN8N /> },
      { name: 'Zapier', desc: 'App-to-app integrations', logo: <LogoZapier /> },
      { name: 'HubSpot', desc: 'CRM & pipeline automation', logo: <LogoHubSpot /> },
      { name: 'Slack', desc: 'Notification & alert routing', logo: <LogoSlack /> },
    ],
  },
  {
    label: 'AI & AEO',
    color: 'border-purple-400/20 text-purple-400',
    tools: [
      { name: 'Claude', desc: 'AI agents, content & strategy', logo: <LogoClaude /> },
      { name: 'ChatGPT', desc: 'Content generation & research', logo: <LogoChatGPT /> },
      { name: 'Gemini', desc: 'Google AI & AEO testing', logo: <LogoGemini /> },
      { name: 'Perplexity', desc: 'AI citation & answer tracking', logo: <LogoPerplexity /> },
    ],
  },
  {
    label: 'Build & Design',
    color: 'border-green-400/20 text-green-400',
    tools: [
      { name: 'Vercel', desc: 'Deployment & edge hosting', logo: <LogoVercel /> },
      { name: 'React', desc: 'UI component framework', logo: <LogoReact /> },
      { name: 'Tailwind', desc: 'Utility-first CSS', logo: <LogoTailwind /> },
      { name: 'Figma', desc: 'Design & prototyping', logo: <LogoFigma /> },
      { name: 'Vite', desc: 'Lightning-fast build tool', logo: <LogoVite /> },
    ],
  },
];

// ─── Tool registry ─────────────────────────────────────────────

const CATEGORIES = [
  {
    label: 'SEO',
    tools: [
      { id: 'meta', label: 'Meta Lens', desc: 'Check title & description length, score them, and preview your SERP result.', component: MetaLens },
      { id: 'keyword', label: 'Keyword Density', desc: 'Paste content and instantly see your top keywords by frequency.', component: KeywordDensity },
      { id: 'heading', label: 'Heading Auditor', desc: 'Paste HTML and visualize your H1–H6 structure for SEO compliance.', component: HeadingAudit },
      { id: 'schema', label: 'Schema Builder', desc: 'Generate JSON-LD structured data markup for your page type.', component: SchemaBuilder },
      { id: 'og', label: 'OG Preview', desc: 'Preview how your page looks when shared on Facebook and LinkedIn.', component: OGPreview },
      { id: 'aeo', label: 'AEO Checker', desc: 'Score your content for AI readability and answer-engine optimization.', component: AEOChecker },
    ],
  },
  {
    label: 'Writing',
    tools: [
      { id: 'wordcount', label: 'Word Counter', desc: 'Instant word, character, sentence, paragraph count and estimated read time.', component: WordCounter },
      { id: 'grammar', label: 'Grammar Checker', desc: 'Flag passive voice, filler phrases, AI clichés, and weak adverbs.', component: GrammarChecker },
      { id: 'humanizer', label: 'AI Humanizer', desc: 'Replace stiff, AI-sounding language with cleaner, more natural alternatives.', component: AIHumanizer },
      { id: 'reading', label: 'Reading Level', desc: 'Flesch-Kincaid score - see what education level your content targets.', component: ReadingLevel },
    ],
  },
  {
    label: 'Email',
    tools: [
      { id: 'subject', label: 'Subject Scorer', desc: 'Score your email subject line for open-rate potential.', component: SubjectScorer },
    ],
  },
  {
    label: 'Build',
    tools: [
      { id: 'utm', label: 'UTM Builder', desc: 'Build clean UTM tracking URLs for any campaign in seconds.', component: UTMBuilder },
      { id: 'slug', label: 'Slug Generator', desc: 'Convert any title or phrase into a clean, SEO-ready URL slug.', component: SlugGenerator },
      { id: 'json', label: 'JSON Formatter', desc: 'Pretty-print or minify any JSON payload - with error detection.', component: JSONFormatter },
    ],
  },
  {
    label: 'Image',
    tools: [
      { id: 'imgcomp', label: 'Image Compressor', desc: 'Compress and convert images to JPEG, WebP, or PNG - fully in browser, nothing uploaded.', component: ImageCompressor },
    ],
  },
];

const ALL_TOOLS = CATEGORIES.flatMap(c => c.tools.map(t => ({ ...t, cat: c.label })));

// ─── Page ──────────────────────────────────────────────────────

export default function Tools() {
  const [active, setActive] = useState(ALL_TOOLS[0].id);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeTool = ALL_TOOLS.find(t => t.id === active)!;
  const ActiveComp = activeTool.component;
  const panelRef = useRef<HTMLDivElement>(null);

  const selectTool = (id: string) => {
    setActive(id);
    setMobileOpen(false);
    setTimeout(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  return (
    <>
      <Helmet>
        <title>Free SEO, Writing & Build Tools | Organic Theory</title>
        <meta name="description" content="15 free client-side tools: meta checker, keyword density, grammar checker, AI humanizer, image compressor, UTM builder, JSON formatter, and more. No login." />
        <meta property="og:site_name" content="Organic Theory" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://organictheory.vercel.app/tools" />
        <meta property="og:title" content="Free SEO & Marketing Tools | Organic Theory" />
        <meta property="og:description" content="15 free browser-based tools: meta checker, keyword density, AI humanizer, image compressor, UTM builder, JSON formatter, and more. No login required." />
        <meta property="og:image" content="https://organictheory.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Organic Theory — Free SEO and marketing tools. No login." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free SEO & Marketing Tools | Organic Theory" />
        <meta name="twitter:description" content="15 free browser-based tools for SEO, content, and marketing. No login required." />
        <meta name="twitter:image" content="https://organictheory.vercel.app/og-image.png" />
        <link rel="canonical" href="https://organictheory.vercel.app/tools" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#09090B] text-[#FAFAFA]">

        <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-[10px] text-[#A1A1AA] mb-6 font-bold tracking-[0.3em] uppercase">
            <ScrambleText text="[ THE VAULT ]" delay={0.3} />
          </motion.p>
          <TextReveal>
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.0] mb-6 font-display uppercase tracking-tight">
              Stack.<br /><span className="text-[#A1A1AA]">Tools. Vault.</span>
            </h1>
          </TextReveal>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-sm md:text-base max-w-md leading-relaxed">
            Every tool we deploy across client engagements - plus {ALL_TOOLS.length} free utilities you can use right now.
          </motion.p>
        </section>

        {/* ── STACK SHOWCASE ── */}
        <section className="pb-24 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto pt-16">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#A1A1AA]/40 mb-3">
                  <ScrambleText text="[ TOOLS WE DEPLOY ]" />
                </p>
                <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight">The stack behind every engagement.</h2>
              </div>
              <div className="text-right shrink-0 ml-8">
                <p className="text-3xl md:text-4xl font-display text-[#FAFAFA]">100+</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA]/40 mt-1">tools in active use</p>
              </div>
            </div>

            <div className="space-y-12">
              {STACK_CATEGORIES.map((cat, ci) => (
                <div key={cat.label}>
                  <div className="flex items-center gap-4 mb-5">
                    <span className={`text-[9px] font-bold tracking-[0.25em] uppercase border px-2.5 py-1 ${cat.color}`}>{cat.label}</span>
                    <div className="flex-1 h-px bg-[#FAFAFA]/8" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {cat.tools.map((tool, ti) => (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: ci * 0.05 + ti * 0.04, ease: EASE }}
                        className="border border-[#FAFAFA]/8 bg-[#FAFAFA]/[0.02] p-4 flex flex-col gap-3 hover:border-[#FAFAFA]/20 hover:bg-[#FAFAFA]/[0.04] transition-all duration-300 group"
                      >
                        <div className="text-[#FAFAFA]/60 group-hover:text-[#FAFAFA]/90 transition-colors duration-300 h-8 flex items-center">
                          {tool.logo}
                        </div>
                        <div>
                          <p className="text-xs font-bold tracking-[0.05em] text-[#FAFAFA]/80">{tool.name}</p>
                          <p className="text-[10px] text-[#A1A1AA]/40 mt-0.5 leading-snug">{tool.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 border border-[#FAFAFA]/8 px-6 py-4 flex items-center justify-between">
              <p className="text-xs opacity-40">Plus Apollo.io, ActiveCampaign, EmailJS, Lemon Squeezy, Google Analytics, Hotjar, Cloudflare, and 90+ more.</p>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A1A1AA]/40 shrink-0 ml-6">+100 tools</span>
            </div>
          </div>
        </section>

        {/* ── FREE UTILITY TOOLS ── */}
        <div className="pb-28 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto pt-12">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#A1A1AA]/40 mb-8">[ FREE UTILITIES - NO LOGIN ]</p>

            {/* Mobile selector */}
            <div className="md:hidden mb-8">
              <button onClick={() => setMobileOpen(o => !o)} className="w-full flex items-center justify-between border border-[#FAFAFA]/15 px-5 py-4 text-sm">
                <div><span className="text-[10px] text-[#A1A1AA] font-bold tracking-[0.15em] uppercase block">{activeTool.cat}</span><span className="font-bold">{activeTool.label}</span></div>
                <ChevronDown size={16} className={`transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileOpen && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="border border-t-0 border-[#FAFAFA]/15 overflow-hidden">
                    {CATEGORIES.map(cat => (
                      <div key={cat.label}>
                        <div className="px-5 py-2 text-[9px] tracking-[0.3em] uppercase text-[#A1A1AA]/50 font-bold bg-[#FAFAFA]/[0.02] border-b border-[#FAFAFA]/5">{cat.label}</div>
                        {cat.tools.filter(t => t.id !== active).map(t => (
                          <button key={t.id} onClick={() => selectTool(t.id)} className="w-full text-left px-5 py-3 text-sm opacity-50 hover:opacity-100 transition-opacity border-b border-[#FAFAFA]/5 last:border-0">{t.label}</button>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop layout */}
            <div className="hidden md:grid grid-cols-12 gap-8">
              <aside className="col-span-3 flex flex-col gap-5">
                {CATEGORIES.map(cat => (
                  <div key={cat.label}>
                    <p className="text-[9px] tracking-[0.35em] uppercase text-[#A1A1AA]/40 font-bold mb-2 px-5">{cat.label}</p>
                    <div className="flex flex-col gap-0.5">
                      {cat.tools.map(t => (
                        <button key={t.id} onClick={() => setActive(t.id)} className={`text-left px-5 py-3 border-l-2 transition-all duration-200 ${active === t.id ? 'border-[#FAFAFA] opacity-100 bg-[#FAFAFA]/[0.04]' : 'border-transparent opacity-40 hover:opacity-70 hover:border-[#FAFAFA]/30'}`}>
                          <div className="text-sm font-bold">{t.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </aside>

              <div className="col-span-9" ref={panelRef}>
                <AnimatePresence mode="wait">
                  <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: EASE }} className="border border-[#FAFAFA]/10 p-8 bg-[#FAFAFA]/[0.02]">
                    <div className="mb-8">
                      <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#A1A1AA]">{activeTool.cat}</span>
                      <h2 className="text-xl font-display uppercase tracking-widest mt-2 mb-2">{activeTool.label}</h2>
                      <p className="text-sm opacity-40">{activeTool.desc}</p>
                    </div>
                    <ActiveComp />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile panel */}
            <div className="md:hidden" ref={panelRef}>
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="border border-[#FAFAFA]/10 p-6 bg-[#FAFAFA]/[0.02]">
                  <div className="mb-6"><span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#A1A1AA]">{activeTool.cat}</span><h2 className="text-lg font-display uppercase tracking-widest mt-2 mb-2">{activeTool.label}</h2><p className="text-sm opacity-40">{activeTool.desc}</p></div>
                  <ActiveComp />
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
