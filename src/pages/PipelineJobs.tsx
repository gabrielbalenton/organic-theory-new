import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { ScrambleText } from '../components/ScrambleText';

const ACCESS_KEY = 'ot-pipeline-2025';
const EASE = [0.22, 1, 0.36, 1] as const;

interface JobLead {
  business_name: string;
  job_title: string;
  job_url: string;
  keyword: string;
  matched_services: string[];
  pitch_url: string;
  has_direct_contact: boolean;
  email_subject: string;
  email_body: string;
}

function LeadCard({ lead, index }: { lead: JobLead; index: number }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
      className="border border-[#FAFAFA]/10 overflow-hidden"
    >
      {/* Header row */}
      <div
        className="flex items-center gap-6 px-6 py-5 cursor-pointer hover:bg-[#FAFAFA]/[0.02] transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-3xl font-display text-[#FAFAFA]/10 shrink-0">0{index + 1}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#FAFAFA] truncate">{lead.business_name}</p>
          <a
            href={lead.job_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="text-[10px] tracking-[0.15em] text-[#A1A1AA]/50 hover:text-[#A1A1AA] transition-colors flex items-center gap-1 w-fit truncate"
          >
            {lead.job_title} <ExternalLink size={9} className="shrink-0" />
          </a>
        </div>
        <span className={`text-[10px] tracking-[0.2em] uppercase border px-2.5 py-1 shrink-0 hidden sm:block ${
          lead.has_direct_contact ? 'border-[#FAFAFA]/20 text-[#FAFAFA]' : 'border-[#FAFAFA]/10 text-[#A1A1AA]/40'
        }`}>
          {lead.has_direct_contact ? 'Contact found' : 'Send via OLJ'}
        </span>
        <a
          href={lead.pitch_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="text-[10px] tracking-[0.2em] uppercase border border-[#FAFAFA]/20 px-3 py-1.5 text-[#FAFAFA] hover:bg-[#FAFAFA]/10 transition-colors shrink-0 hidden sm:flex items-center gap-1.5"
        >
          Pitch Page <ExternalLink size={9} />
        </a>
        {open ? <ChevronUp size={14} className="opacity-40 shrink-0" /> : <ChevronDown size={14} className="opacity-40 shrink-0" />}
      </div>

      {/* Expanded */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-8 pt-2 border-t border-[#FAFAFA]/8 grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Job details + contact */}
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#A1A1AA] font-bold mb-2">Matched Services</p>
                  <div className="flex flex-wrap gap-1.5">
                    {lead.matched_services.map(s => (
                      <span key={s} className="text-[10px] tracking-[0.1em] uppercase border border-[#FAFAFA]/15 px-2 py-1 text-[#A1A1AA]">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#A1A1AA] font-bold mb-2">Contact</p>
                  {lead.has_direct_contact ? (
                    <p className="text-sm text-[#FAFAFA]/70 leading-relaxed">A direct contact email was found for this business - check data/outreach.json locally.</p>
                  ) : (
                    <p className="text-sm text-[#FAFAFA]/40 leading-relaxed">No public email found. Send this directly from OnlineJobs.ph as a reply to their post.</p>
                  )}
                </div>
                <a
                  href={lead.pitch_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase border border-[#FAFAFA]/20 px-4 py-2.5 text-[#FAFAFA] hover:bg-[#FAFAFA]/5 transition-colors"
                >
                  View Pitch Page <ExternalLink size={11} />
                </a>
              </div>

              {/* Email */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#A1A1AA] font-bold">Outreach Message</p>
                  <button
                    onClick={() => copy(`Subject: ${lead.email_subject}\n\n${lead.email_body}`, 'email')}
                    className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
                  >
                    {copied === 'email' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <div className="bg-[#FAFAFA]/[0.03] border border-[#FAFAFA]/8 p-4 space-y-3">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#A1A1AA]/50">
                    Subject: <span className="text-[#FAFAFA]/70 normal-case tracking-normal">{lead.email_subject}</span>
                  </p>
                  <p className="text-xs text-[#FAFAFA]/60 leading-relaxed whitespace-pre-wrap">{lead.email_body}</p>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PipelineJobs() {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem('pipeline_access') === 'true');
  const [key, setKey] = useState('');
  const [keyError, setKeyError] = useState(false);
  const [leads, setLeads] = useState<JobLead[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim().toLowerCase() === ACCESS_KEY) {
      localStorage.setItem('pipeline_access', 'true');
      setUnlocked(true);
    } else {
      setKeyError(true);
    }
  };

  useEffect(() => {
    if (!unlocked) return;
    setLoading(true);
    fetch('/pipeline-jobs.json')
      .then(r => r.json())
      .then(data => {
        setLeads(data.leads ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [unlocked]);

  const sendableCount = leads.filter(l => l.contact_email).length;

  if (!unlocked) {
    return (
      <>
        <Helmet><title>Job Pipeline | Organic Theory</title><meta name="robots" content="noindex" /></Helmet>
        <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm border border-[#FAFAFA]/10 p-10"
          >
            <div className="w-10 h-10 border border-[#FAFAFA]/15 flex items-center justify-center mb-8">
              <Lock size={16} className="text-[#A1A1AA]/50" />
            </div>
            <h1 className="text-xl font-display uppercase tracking-tight text-[#FAFAFA] mb-2">Job Pipeline</h1>
            <p className="text-sm text-[#A1A1AA]/50 mb-8">Private. Enter access key to continue.</p>
            <form onSubmit={handleUnlock} className="space-y-3">
              <input
                type="password"
                placeholder="Access key"
                value={key}
                onChange={e => { setKey(e.target.value); setKeyError(false); }}
                className={`w-full bg-transparent border px-4 py-3 text-sm text-[#FAFAFA] placeholder:text-[#FAFAFA]/20 focus:outline-none transition-colors ${keyError ? 'border-red-400/50' : 'border-[#FAFAFA]/15 focus:border-[#FAFAFA]/40'}`}
              />
              {keyError && <p className="text-xs text-red-400">Incorrect key.</p>}
              <button type="submit" className="w-full bg-[#FAFAFA] text-[#09090B] py-3 text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-[#A1A1AA] transition-colors">
                Unlock
              </button>
            </form>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet><title>Job Pipeline | Organic Theory</title><meta name="robots" content="noindex" /></Helmet>
      <div className="w-full min-h-screen bg-[#09090B] text-[#FAFAFA]">

        {/* Header */}
        <section className="pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#A1A1AA] mb-4">
            <ScrambleText text="[ JOB PIPELINE ]" delay={0.2} />
          </p>
          <h1 className="text-4xl md:text-5xl font-editorial uppercase tracking-tight mb-3">
            OnlineJobs.ph Outreach
          </h1>
          <p className="text-sm text-[#A1A1AA]/50">Leads sourced from public OnlineJobs.ph listings. Send from your OLJ account.</p>
        </section>

        <div className="px-6 md:px-12 max-w-7xl mx-auto pb-28">

          {/* Stats */}
          {leads.length > 0 && (
            <div className="flex gap-8 mb-10 pb-10 border-b border-[#FAFAFA]/10">
              <div>
                <p className="text-3xl font-display text-[#FAFAFA]">{leads.length}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA]/40 mt-0.5">Leads</p>
              </div>
              <div>
                <p className="text-3xl font-display text-[#FAFAFA]">{leads.length}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA]/40 mt-0.5">Pitch pages ready</p>
              </div>
              <div>
                <p className="text-3xl font-display text-[#FAFAFA]">{sendableCount}</p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA]/40 mt-0.5">Direct email found</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-3 py-12 text-[#A1A1AA]/40">
              <div className="w-1 h-1 rounded-full bg-current animate-pulse" />
              <p className="text-sm">Loading leads...</p>
            </div>
          )}

          {!loading && leads.length === 0 && (
            <div className="border border-[#FAFAFA]/10 px-8 py-16 text-center">
              <p className="text-sm text-[#A1A1AA]/40">No leads yet.</p>
            </div>
          )}

          {leads.length > 0 && (
            <div className="space-y-3">
              {leads.map((lead, i) => (
                <LeadCard key={lead.pitch_url} lead={lead} index={i} />
              ))}
            </div>
          )}

          {/* Actions reminder */}
          {leads.length > 0 && (
            <div className="mt-12 border border-[#FAFAFA]/8 px-6 py-6">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#A1A1AA] font-bold mb-3">Next steps for each lead</p>
              <ol className="space-y-2">
                {['Open the job post on OnlineJobs.ph and reply as a message', 'Copy the subject + body from this card', 'Paste in the pitch page link (already included in the body)', 'Send — the pitch page is live and tracks nothing but is ready to view'].map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#A1A1AA]/50">
                    <span className="text-[#FAFAFA]/20 shrink-0">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
