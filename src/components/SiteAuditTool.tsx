import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const EASE = [0.22, 1, 0.36, 1] as const;

interface AuditResult {
  domain: string;
  seoScore: number;
  perfScore: number;
  pageTitle: string;
  crawlable: boolean;
  hasMetaDesc: boolean;
  previewIssues: { title: string; desc: string }[];
  totalIssues: number;
}

function ScoreRing({ score, label }: { score: number; label: string }) {
  const color = score >= 80 ? '#4ade80' : score >= 50 ? '#facc15' : '#f87171';
  const radius = 28;
  const circ = 2 * Math.PI * radius;
  const dash = (score / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r={radius} fill="none" stroke="rgba(250,250,250,0.06)" strokeWidth="5" />
          <circle cx="36" cy="36" r={radius} fill="none" stroke={color} strokeWidth="5"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1s ease' }} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-[#FAFAFA]">{score}</span>
      </div>
      <span className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">{label}</span>
    </div>
  );
}

function StatusRow({ label, ok, value }: { label: string; ok: boolean; value?: string }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-[#FAFAFA]/6 last:border-0">
      {ok
        ? <CheckCircle size={13} className="text-green-400 shrink-0" />
        : <XCircle size={13} className="text-red-400 shrink-0" />}
      <span className="text-[11px] text-[#A1A1AA] flex-1">{label}</span>
      {value && <span className="text-[11px] text-[#FAFAFA]/50 truncate max-w-[140px]">{value}</span>}
    </div>
  );
}

export default function SiteAuditTool() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState('');
  const resultsRef = useRef<HTMLDivElement>(null);

  const runAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    let target = url.trim();
    if (!target) return;
    if (!target.startsWith('http')) target = 'https://' + target;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(target)}&strategy=mobile&category=seo&category=performance`;
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const lhr = data.lighthouseResult;
      const audits = lhr.audits;

      const seoScore = Math.round((lhr.categories?.seo?.score ?? 0) * 100);
      const perfScore = Math.round((lhr.categories?.performance?.score ?? 0) * 100);
      const pageTitle = audits['document-title']?.displayValue ?? new URL(target).hostname;
      const crawlable = (audits['is-crawlable']?.score ?? 0) === 1;
      const hasMetaDesc = (audits['meta-description']?.score ?? 0) === 1;

      const failing: { title: string; desc: string }[] = Object.values(audits as Record<string, any>)
        .filter((a) => a.score !== null && a.score !== undefined && a.score < 1 && a.title)
        .map((a) => ({
          title: a.title,
          desc: a.description?.replace(/\[.*?\]\(.*?\)/g, '').trim() ?? '',
        }));

      setResult({
        domain: new URL(target).hostname,
        seoScore,
        perfScore,
        pageTitle,
        crawlable,
        hasMetaDesc,
        previewIssues: failing.slice(0, 2),
        totalIssues: failing.length,
      });

      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch {
      setError("Could not reach that URL. Make sure it's publicly accessible and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t border-[#FAFAFA]/10 py-20 px-6 md:px-12 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-10">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#A1A1AA] mb-4">
          [ FREE AUDIT TOOL ]
        </p>
        <h2 className="text-3xl md:text-4xl font-editorial uppercase tracking-tight mb-3">
          Mini Site Audit
        </h2>
        <p className="text-sm text-[#A1A1AA] max-w-lg leading-relaxed">
          Instant snapshot of your site's SEO and performance health. Drop your URL below.
        </p>
      </div>

      {/* Input */}
      <form onSubmit={runAudit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mb-10">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="yourdomain.com"
          className="flex-1 bg-transparent border border-[#FAFAFA]/15 px-5 py-4 text-sm text-[#FAFAFA] placeholder:text-[#FAFAFA]/25 focus:outline-none focus:border-[#FAFAFA]/50 transition-colors"
          disabled={loading}
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="flex items-center justify-center gap-3 bg-[#FAFAFA] text-[#09090B] px-8 py-4 text-[10px] tracking-[0.25em] uppercase font-bold hover:bg-[#A1A1AA] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          {loading
            ? <><Loader2 size={14} className="animate-spin" />Auditing</>
            : <><span>Run Audit</span><ArrowRight size={14} /></>}
        </button>
      </form>

      {error && (
        <p className="text-sm text-red-400 mb-8 border border-red-400/20 px-5 py-3 max-w-2xl">{error}</p>
      )}

      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-2xl mb-8">
            <div className="h-px bg-[#FAFAFA]/10 w-full overflow-hidden">
              <motion.div
                className="h-full bg-[#FAFAFA]/60"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA]/50 mt-3">
              Analysing {url} via PageSpeed Insights...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-3xl"
          >
            {/* Domain */}
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#FAFAFA]/10">
              <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
              <span className="text-sm font-bold text-[#FAFAFA]">{result.domain}</span>
            </div>

            {/* Scores + quick checks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 pb-10 border-b border-[#FAFAFA]/10">
              <div className="flex gap-10 items-start">
                <ScoreRing score={result.seoScore} label="SEO" />
                <ScoreRing score={result.perfScore} label="Performance" />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-3">Quick checks</p>
                <StatusRow label="Crawlable by search engines" ok={result.crawlable} />
                <StatusRow label="Meta description present" ok={result.hasMetaDesc} />
                <StatusRow
                  label="Page title"
                  ok={!!result.pageTitle}
                  value={result.pageTitle.length > 30 ? result.pageTitle.slice(0, 30) + '…' : result.pageTitle}
                />
              </div>
            </div>

            {/* 2 preview issues */}
            {result.previewIssues.length > 0 && (
              <div className="mb-8">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#A1A1AA] font-bold mb-4">
                  Issues found — 2 of {result.totalIssues}
                </p>
                <div className="space-y-3">
                  {result.previewIssues.map((issue, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 border border-[#FAFAFA]/8 px-5 py-4"
                    >
                      <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-[#FAFAFA] mb-1">{issue.title}</p>
                        <p className="text-xs text-[#A1A1AA]/60 leading-relaxed line-clamp-2">{issue.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* See more CTA */}
            <div className="border border-[#FAFAFA]/10 px-8 py-8">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#A1A1AA] font-bold mb-2">
                {result.totalIssues - 2 > 0 ? `+ ${result.totalIssues - 2} more issues` : 'Want the full picture?'}
              </p>
              <h3 className="text-xl font-editorial uppercase tracking-tight text-[#FAFAFA] mb-2">
                See the full breakdown
              </h3>
              <p className="text-sm text-[#A1A1AA]/60 mb-6 max-w-md leading-relaxed">
                Core Web Vitals, meta analysis, all {result.totalIssues} issues with fix instructions, and a 30-day action plan — either via a done-for-you audit or the self-study course.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 bg-[#FAFAFA] text-[#09090B] px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-[#A1A1AA] transition-colors"
                >
                  Book the $400 Audit <ArrowRight size={12} />
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-3 border border-[#FAFAFA]/20 text-[#FAFAFA] px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-[#FAFAFA]/5 transition-colors"
                >
                  Technical SEO Course <ArrowRight size={12} />
                </Link>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
