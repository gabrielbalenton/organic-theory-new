import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { RevealSection } from '../components/RevealSection';
import { ChevronDown } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Tool helpers ───────────────────────────────────────────────

function scoreTitle(title: string) {
  const len = title.length;
  if (len === 0) return { score: 0, note: 'Enter a title.' };
  if (len < 30) return { score: 40, note: 'Too short. Aim for 50–60 characters.' };
  if (len <= 60) return { score: 100, note: 'Perfect length.' };
  if (len <= 70) return { score: 70, note: 'Slightly long — may get truncated.' };
  return { score: 30, note: 'Too long. Google will truncate this.' };
}

function scoreDesc(desc: string) {
  const len = desc.length;
  if (len === 0) return { score: 0, note: 'Enter a description.' };
  if (len < 70) return { score: 40, note: 'Too short. Aim for 120–160 characters.' };
  if (len <= 160) return { score: 100, note: 'Perfect length.' };
  if (len <= 180) return { score: 70, note: 'Slightly long — may be truncated.' };
  return { score: 30, note: 'Too long. Keep under 160 characters.' };
}

function keywordDensity(text: string) {
  if (!text.trim()) return [];
  const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
  const stop = new Set(['the','and','for','are','but','not','you','all','can','her','was','one','our','out','day','get','has','him','his','how','its','let','may','now','put','say','she','too','use','way','who','did','she','they','that','this','with','from','have','been','will','were','what','when','which','your','also','about','their','there','these','those','would','could','should','after','into','more','some','than','then','them','over','each','both','back','said','just','make','like','time','very','even','most','much','such','only','come','here','well','many','also','same','come','here','take','than','does','made','used','help','line','give','good','long','high','work','last','next','real','most','part','need','open','must']);
  const freq: Record<string, number> = {};
  words.forEach(w => { if (!stop.has(w)) freq[w] = (freq[w] || 0) + 1; });
  const total = words.length || 1;
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word, count]) => ({ word, count, pct: ((count / total) * 100).toFixed(1) }));
}

function parseHeadings(html: string) {
  const tags: { level: number; text: string }[] = [];
  const regex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    tags.push({ level: parseInt(m[1]), text: m[2].replace(/<[^>]+>/g, '') });
  }
  return tags;
}

function scoreSubject(subject: string) {
  const len = subject.length;
  const hasEmoji = /\p{Emoji}/u.test(subject);
  const hasNumber = /\d/.test(subject);
  const hasQuestion = subject.includes('?');
  const hasPower = /\b(free|secret|instant|proven|limited|exclusive|save|new|now|discover)\b/i.test(subject);
  let score = 50;
  if (len >= 30 && len <= 50) score += 20;
  else if (len < 20 || len > 70) score -= 20;
  if (hasNumber) score += 10;
  if (hasQuestion) score += 10;
  if (hasPower) score += 10;
  if (hasEmoji) score += 5;
  return Math.min(100, Math.max(0, score));
}

function aeoScore(text: string) {
  if (!text.trim()) return { score: 0, tips: [] };
  const tips: string[] = [];
  let score = 50;
  const hasQuestion = /\?/.test(text);
  const hasBullets = /\n[-•*]|\n\d+\./.test(text);
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const avgLen = sentences.reduce((a, s) => a + s.trim().split(' ').length, 0) / (sentences.length || 1);
  const hasDefinition = /\bis\b|\bare\b|\bmeans\b|\brefers to\b/i.test(text);
  if (hasQuestion) { score += 15; } else tips.push('Include a direct question to match how AI queries are phrased.');
  if (hasBullets) { score += 15; } else tips.push('Use bullet points or numbered lists — AI models extract structured data easily.');
  if (avgLen <= 20) { score += 10; } else tips.push('Shorten sentences to under 20 words for better AI parsing.');
  if (hasDefinition) { score += 10; } else tips.push('Add a clear definition sentence (e.g., "X is…") for featured snippet eligibility.');
  if (text.length >= 300) { score += 10; } else tips.push('Aim for at least 300 characters for substantive coverage.');
  return { score: Math.min(100, score), tips };
}

// ─── Sub-tool UIs ──────────────────────────────────────────────

function MetaLens() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const tScore = scoreTitle(title);
  const dScore = scoreDesc(desc);

  return (
    <div className="space-y-8">
      <div>
        <label className="text-[10px] tracking-[0.25em] uppercase text-[#A1A1AA] font-bold block mb-2">Meta Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Your page title…"
          maxLength={100}
          className="w-full bg-transparent border-b border-[#FAFAFA]/15 py-3 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#FAFAFA]/60 transition-colors placeholder:text-[#FAFAFA]/30"
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs opacity-40">{title.length} chars — {tScore.note}</span>
          <ScorePill score={tScore.score} />
        </div>
      </div>
      <div>
        <label className="text-[10px] tracking-[0.25em] uppercase text-[#A1A1AA] font-bold block mb-2">Meta Description</label>
        <textarea
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Your meta description…"
          rows={3}
          maxLength={250}
          className="w-full bg-transparent border-b border-[#FAFAFA]/15 py-3 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#FAFAFA]/60 transition-colors placeholder:text-[#FAFAFA]/30 resize-none"
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs opacity-40">{desc.length} chars — {dScore.note}</span>
          <ScorePill score={dScore.score} />
        </div>
      </div>

      {/* SERP Preview */}
      {(title || desc) && (
        <div className="border border-[#FAFAFA]/10 p-6 bg-[#FAFAFA]/[0.02]">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-4">SERP Preview</p>
          <div className="text-sm">
            <div className="text-[#4d90fe] text-base truncate">{title || 'Your Page Title'}</div>
            <div className="text-green-600 text-xs mt-0.5">https://yoursite.com/page</div>
            <div className="text-[#FAFAFA]/50 text-sm mt-1 leading-relaxed line-clamp-2">{desc || 'Your meta description will appear here…'}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function KeywordDensity() {
  const [text, setText] = useState('');
  const results = keywordDensity(text);

  return (
    <div className="space-y-6">
      <div>
        <label className="text-[10px] tracking-[0.25em] uppercase text-[#A1A1AA] font-bold block mb-2">Paste your content</label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste your page content here…"
          rows={7}
          className="w-full bg-transparent border border-[#FAFAFA]/10 p-4 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#FAFAFA]/30 transition-colors placeholder:text-[#FAFAFA]/30 resize-none"
        />
      </div>
      {results.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-4">Top keywords</p>
          {results.map(r => (
            <div key={r.word} className="flex items-center gap-4">
              <span className="text-sm w-32 opacity-80">{r.word}</span>
              <div className="flex-1 h-px bg-[#FAFAFA]/10 relative">
                <div
                  className="absolute left-0 top-0 h-full bg-[#FAFAFA]/40 transition-all duration-500"
                  style={{ width: `${Math.min(100, parseFloat(r.pct) * 10)}%` }}
                />
              </div>
              <span className="text-xs opacity-40 w-16 text-right">{r.count}x ({r.pct}%)</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function HeadingAudit() {
  const [html, setHtml] = useState('');
  const headings = parseHeadings(html);
  const h1Count = headings.filter(h => h.level === 1).length;

  return (
    <div className="space-y-6">
      <div>
        <label className="text-[10px] tracking-[0.25em] uppercase text-[#A1A1AA] font-bold block mb-2">Paste HTML or raw content</label>
        <textarea
          value={html}
          onChange={e => setHtml(e.target.value)}
          placeholder="<h1>Main Title</h1><h2>Section</h2>…"
          rows={7}
          className="w-full bg-transparent border border-[#FAFAFA]/10 p-4 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#FAFAFA]/30 transition-colors placeholder:text-[#FAFAFA]/30 resize-none font-mono"
        />
      </div>
      {headings.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">Heading tree</p>
            {h1Count !== 1 && <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">⚠ {h1Count === 0 ? 'No H1 found' : `${h1Count} H1s — should be 1`}</span>}
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
  const [copied, setCopied] = useState(false);

  const SCHEMAS: Record<string, string[]> = {
    Article: ['headline', 'description', 'author', 'datePublished', 'url'],
    LocalBusiness: ['name', 'description', 'url', 'telephone', 'address'],
    FAQPage: ['question1', 'answer1', 'question2', 'answer2'],
    Product: ['name', 'description', 'brand', 'price', 'currency'],
    Person: ['name', 'jobTitle', 'url', 'sameAs'],
  };

  const currentFields = SCHEMAS[type] || [];

  const buildSchema = () => {
    if (type === 'FAQPage') {
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          fields.question1 && { '@type': 'Question', name: fields.question1, acceptedAnswer: { '@type': 'Answer', text: fields.answer1 || '' } },
          fields.question2 && { '@type': 'Question', name: fields.question2, acceptedAnswer: { '@type': 'Answer', text: fields.answer2 || '' } },
        ].filter(Boolean),
      };
    }
    const obj: Record<string, string> = { '@context': 'https://schema.org', '@type': type };
    currentFields.forEach(f => { if (fields[f]) obj[f] = fields[f]; });
    return obj;
  };

  const json = JSON.stringify(buildSchema(), null, 2);

  const copy = () => {
    navigator.clipboard.writeText(`<script type="application/ld+json">\n${json}\n</script>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-[10px] tracking-[0.25em] uppercase text-[#A1A1AA] font-bold block mb-2">Schema type</label>
        <select
          value={type}
          onChange={e => { setType(e.target.value); setFields({}); }}
          className="w-full bg-transparent border-b border-[#FAFAFA]/15 py-3 text-sm text-[#FAFAFA] focus:outline-none appearance-none"
          style={{ background: 'transparent' }}
        >
          {Object.keys(SCHEMAS).map(t => (
            <option key={t} value={t} className="bg-[#09090B]">{t}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentFields.map(f => (
          <div key={f}>
            <label className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold block mb-1">{f}</label>
            <input
              value={fields[f] || ''}
              onChange={e => setFields(prev => ({ ...prev, [f]: e.target.value }))}
              placeholder={f}
              className="w-full bg-transparent border-b border-[#FAFAFA]/10 py-2 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#FAFAFA]/40 transition-colors placeholder:text-[#FAFAFA]/20"
            />
          </div>
        ))}
      </div>
      <div className="border border-[#FAFAFA]/10 bg-[#FAFAFA]/[0.02] p-4 relative">
        <pre className="text-xs text-[#FAFAFA]/60 overflow-auto max-h-48 font-mono">{`<script type="application/ld+json">\n${json}\n</script>`}</pre>
        <button
          onClick={copy}
          className="absolute top-3 right-3 text-[10px] tracking-[0.2em] uppercase font-bold text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}

function OGPreview() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'title', label: 'OG Title', val: title, set: setTitle, placeholder: 'Page title for social sharing' },
          { key: 'url', label: 'URL', val: url, set: setUrl, placeholder: 'https://yoursite.com/page' },
          { key: 'desc', label: 'OG Description', val: desc, set: setDesc, placeholder: '1–2 sentence summary' },
          { key: 'image', label: 'OG Image URL', val: image, set: setImage, placeholder: 'https://yoursite.com/og.jpg (1200×630)' },
        ].map(f => (
          <div key={f.key}>
            <label className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold block mb-1">{f.label}</label>
            <input
              value={f.val}
              onChange={e => f.set(e.target.value)}
              placeholder={f.placeholder}
              className="w-full bg-transparent border-b border-[#FAFAFA]/15 py-2 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#FAFAFA]/40 transition-colors placeholder:text-[#FAFAFA]/20"
            />
          </div>
        ))}
      </div>

      {(title || desc) && (
        <div className="space-y-4">
          {/* Facebook / LinkedIn card */}
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">Facebook / LinkedIn</p>
          <div className="border border-[#FAFAFA]/10 overflow-hidden max-w-md">
            {image && <img src={image} alt="og preview" className="w-full h-48 object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
            {!image && <div className="w-full h-40 bg-[#FAFAFA]/5 flex items-center justify-center text-xs opacity-20">1200×630 recommended</div>}
            <div className="p-4 bg-[#111]">
              <div className="text-[10px] uppercase tracking-wider opacity-30 mb-1">{url ? new URL(url.startsWith('http') ? url : 'https://' + url).hostname : 'yoursite.com'}</div>
              <div className="text-sm font-bold text-[#FAFAFA] mb-1 line-clamp-1">{title || 'Page Title'}</div>
              <div className="text-xs opacity-50 line-clamp-2">{desc || 'Description'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SubjectScorer() {
  const [subject, setSubject] = useState('');
  const score = subject ? scoreSubject(subject) : null;

  const grade = score === null ? '' : score >= 80 ? 'Strong' : score >= 60 ? 'Good' : score >= 40 ? 'Weak' : 'Poor';
  const color = score === null ? '' : score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="space-y-6">
      <div>
        <label className="text-[10px] tracking-[0.25em] uppercase text-[#A1A1AA] font-bold block mb-2">Email subject line</label>
        <input
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="Your subject line here…"
          className="w-full bg-transparent border-b border-[#FAFAFA]/15 py-3 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#FAFAFA]/60 transition-colors placeholder:text-[#FAFAFA]/30"
        />
        <span className="text-xs opacity-40 mt-1 block">{subject.length} characters</span>
      </div>
      {score !== null && (
        <div className="border border-[#FAFAFA]/10 p-6 bg-[#FAFAFA]/[0.02] space-y-4">
          <div className="flex items-center justify-between">
            <span className={`text-2xl font-display font-bold ${color}`}>{score}/100</span>
            <span className={`text-sm font-bold ${color}`}>{grade}</span>
          </div>
          <div className="w-full h-1 bg-[#FAFAFA]/10">
            <div className={`h-full transition-all duration-700 ${score >= 80 ? 'bg-green-400' : score >= 60 ? 'bg-yellow-400' : 'bg-red-400'}`} style={{ width: `${score}%` }} />
          </div>
          <ul className="space-y-1 text-xs opacity-50">
            <li>{subject.length >= 30 && subject.length <= 50 ? '✓' : '—'} Ideal length (30–50 chars)</li>
            <li>{/\d/.test(subject) ? '✓' : '—'} Contains a number</li>
            <li>{subject.includes('?') ? '✓' : '—'} Contains a question</li>
            <li>{/\p{Emoji}/u.test(subject) ? '✓' : '—'} Contains an emoji</li>
          </ul>
        </div>
      )}
    </div>
  );
}

function AEOChecker() {
  const [text, setText] = useState('');
  const result = text.trim() ? aeoScore(text) : null;

  return (
    <div className="space-y-6">
      <div>
        <label className="text-[10px] tracking-[0.25em] uppercase text-[#A1A1AA] font-bold block mb-2">Paste content to check AI readability</label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste a paragraph or article section…"
          rows={7}
          className="w-full bg-transparent border border-[#FAFAFA]/10 p-4 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#FAFAFA]/30 transition-colors placeholder:text-[#FAFAFA]/30 resize-none"
        />
      </div>
      {result && (
        <div className="border border-[#FAFAFA]/10 p-6 bg-[#FAFAFA]/[0.02] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold block mb-1">AEO Score</span>
              <span className="text-3xl font-display font-bold">{result.score}/100</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] tracking-widest uppercase opacity-40">AI Readability</span>
            </div>
          </div>
          <div className="w-full h-1 bg-[#FAFAFA]/10">
            <div className="h-full bg-[#FAFAFA]/60 transition-all duration-700" style={{ width: `${result.score}%` }} />
          </div>
          {result.tips.length > 0 && (
            <div className="space-y-2 pt-2">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">Improvement tips</p>
              {result.tips.map((tip, i) => (
                <div key={i} className="flex gap-3 text-sm opacity-60">
                  <span className="text-[#A1A1AA] shrink-0">—</span>
                  {tip}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Score pill ────────────────────────────────────────────────

function ScorePill({ score }: { score: number }) {
  const color = score >= 80 ? 'text-green-400 border-green-400/30' : score >= 50 ? 'text-yellow-400 border-yellow-400/30' : score > 0 ? 'text-red-400 border-red-400/30' : 'text-[#A1A1AA] border-[#FAFAFA]/10';
  return (
    <span className={`text-[10px] font-bold border px-2 py-0.5 ${color}`}>{score > 0 ? `${score}/100` : '—'}</span>
  );
}

// ─── Tools list ────────────────────────────────────────────────

const TOOLS = [
  { id: 'meta', label: 'Meta Lens', tag: 'SEO', desc: 'Check title & description length, score them, and preview your SERP result.', component: MetaLens },
  { id: 'keyword', label: 'Keyword Density', tag: 'SEO', desc: 'Paste content and instantly see your top keywords by frequency.', component: KeywordDensity },
  { id: 'heading', label: 'Heading Auditor', tag: 'SEO', desc: 'Paste HTML and visualize your H1–H6 structure for SEO compliance.', component: HeadingAudit },
  { id: 'schema', label: 'Schema Builder', tag: 'AEO', desc: 'Generate JSON-LD structured data markup for your page type.', component: SchemaBuilder },
  { id: 'og', label: 'OG Preview', tag: 'Social', desc: 'Preview how your page looks when shared on Facebook and LinkedIn.', component: OGPreview },
  { id: 'subject', label: 'Subject Scorer', tag: 'Email', desc: 'Score your email subject line for open-rate potential.', component: SubjectScorer },
  { id: 'aeo', label: 'AEO Checker', tag: 'AEO', desc: 'Score your content for AI readability and answer-engine optimization.', component: AEOChecker },
];

// ─── Page ─────────────────────────────────────────────────────

export default function Tools() {
  const [active, setActive] = useState(TOOLS[0].id);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeTool = TOOLS.find(t => t.id === active)!;
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
        <title>Free SEO & AEO Tools | Organic Theory</title>
        <meta name="description" content="Free tools for checking meta tags, keyword density, heading structure, schema markup, OG previews, email subjects, and AI readability — all client-side." />
        <meta property="og:title" content="Free SEO & AEO Tools | Organic Theory" />
        <meta property="og:url" content="https://organictheory.vercel.app/tools" />
        <link rel="canonical" href="https://organictheory.vercel.app/tools" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#09090B] text-[#FAFAFA]">

        {/* Header */}
        <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
            <p className="text-[10px] text-[#A1A1AA] mb-6 font-bold tracking-[0.3em] uppercase">[ FREE TOOLS ]</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.0] mb-8 font-display uppercase tracking-tight">
              Tools.<br />
              <span className="text-[#A1A1AA]">Use them.</span>
            </h1>
            <p className="text-sm md:text-base opacity-50 max-w-md leading-relaxed">
              Client-side utilities for SEO, AEO, and content — no login, no tracking.
            </p>
          </motion.div>
        </section>

        <RevealSection className="pb-28 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto pt-12">

            {/* Mobile tool selector */}
            <div className="md:hidden mb-8">
              <button
                onClick={() => setMobileOpen(o => !o)}
                className="w-full flex items-center justify-between border border-[#FAFAFA]/15 px-5 py-4 text-sm"
              >
                <span className="font-bold">{activeTool.label}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border border-t-0 border-[#FAFAFA]/15 overflow-hidden"
                  >
                    {TOOLS.filter(t => t.id !== active).map(t => (
                      <button
                        key={t.id}
                        onClick={() => selectTool(t.id)}
                        className="w-full text-left px-5 py-3 text-sm opacity-50 hover:opacity-100 transition-opacity border-b border-[#FAFAFA]/5 last:border-0"
                      >
                        {t.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop layout */}
            <div className="hidden md:grid grid-cols-12 gap-8">

              {/* Sidebar */}
              <aside className="col-span-3 flex flex-col gap-1">
                {TOOLS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    className={`text-left px-5 py-4 border-l-2 transition-all duration-200 ${
                      active === t.id
                        ? 'border-[#FAFAFA] opacity-100 bg-[#FAFAFA]/[0.04]'
                        : 'border-transparent opacity-40 hover:opacity-70 hover:border-[#FAFAFA]/30'
                    }`}
                  >
                    <div className="text-[10px] tracking-[0.15em] uppercase font-bold text-[#A1A1AA] mb-1">{t.tag}</div>
                    <div className="text-sm font-bold">{t.label}</div>
                  </button>
                ))}
              </aside>

              {/* Panel */}
              <div className="col-span-9" ref={panelRef}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="border border-[#FAFAFA]/10 p-8 bg-[#FAFAFA]/[0.02]"
                  >
                    <div className="mb-8">
                      <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#A1A1AA]">{activeTool.tag}</span>
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
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border border-[#FAFAFA]/10 p-6 bg-[#FAFAFA]/[0.02]"
                >
                  <div className="mb-6">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#A1A1AA]">{activeTool.tag}</span>
                    <h2 className="text-lg font-display uppercase tracking-widest mt-2 mb-2">{activeTool.label}</h2>
                    <p className="text-sm opacity-40">{activeTool.desc}</p>
                  </div>
                  <ActiveComp />
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </RevealSection>
      </div>
    </>
  );
}
