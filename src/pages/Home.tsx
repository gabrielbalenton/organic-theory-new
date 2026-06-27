import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Plus, Minus, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { RevealSection } from '../components/RevealSection';
import Marquee from '../components/Marquee';
import { homeData } from '../data/homeData';
import { TextReveal, TextRevealLines } from '../components/TextReveal';
import { ScrambleText } from '../components/ScrambleText';
import { MagneticButton } from '../components/MagneticButton';
import { ParallaxImage } from '../components/ParallaxImage';
import { testimonials } from '../data/testimonialsData';

const EASE = [0.22, 1, 0.36, 1] as const;

const TOOLS = [
  {
    name: 'Ahrefs', cat: 'SEO',
    logo: <span className="text-[11px] font-black tracking-tight">Ahrefs</span>,
  },
  {
    name: 'Screaming Frog', cat: 'Technical',
    logo: (
      <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
        <circle cx="14" cy="16" r="5"/><circle cx="26" cy="16" r="5"/>
        <ellipse cx="20" cy="26" rx="12" ry="8"/>
        <circle cx="12" cy="13" r="2" fill="#F5F0EB"/><circle cx="28" cy="13" r="2" fill="#F5F0EB"/>
        <path d="M8 30 Q6 38 4 36" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M32 30 Q34 38 36 36" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    ),
  },
  {
    name: 'Google Search Console', cat: 'SEO',
    logo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
    ),
  },
  {
    name: 'Make', cat: 'Automation',
    logo: (
      <svg viewBox="0 0 70 30" className="w-8 h-5 fill-current">
        <circle cx="8" cy="15" r="7"/><line x1="15" y1="15" x2="27" y2="15" stroke="currentColor" strokeWidth="2.5"/><circle cx="35" cy="15" r="7"/><line x1="42" y1="15" x2="54" y2="15" stroke="currentColor" strokeWidth="2.5"/><circle cx="62" cy="15" r="7"/>
      </svg>
    ),
  },
  {
    name: 'n8n', cat: 'Automation',
    logo: <span className="text-[13px] font-black tracking-tighter">n8n</span>,
  },
  {
    name: 'Zapier', cat: 'Automation',
    logo: <span className="text-[11px] font-black tracking-tight">Zapier</span>,
  },
  {
    name: 'Claude', cat: 'AI',
    logo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none" strokeWidth="1.8" strokeLinecap="round">
        <line x1="12" y1="2" x2="12" y2="6"/>
        <line x1="12" y1="18" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="6" y2="12"/>
        <line x1="18" y1="12" x2="22" y2="12"/>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
        <line x1="19.07" y1="4.93" x2="16.24" y2="7.76"/>
        <line x1="7.76" y1="16.24" x2="4.93" y2="19.07"/>
      </svg>
    ),
  },
  {
    name: 'ChatGPT', cat: 'AI',
    logo: (
      <svg viewBox="0 0 41 41" className="w-6 h-6 fill-current">
        <path d="M37.5 16.6a10 10 0 0 0-.9-8.2 10.4 10.4 0 0 0-11.1-5 10 10 0 0 0-7.5-3.4A10.4 10.4 0 0 0 8.1 6.4a10 10 0 0 0-6.7 4.9 10.4 10.4 0 0 0 1.3 12.2 10 10 0 0 0 .9 8.2 10.4 10.4 0 0 0 11.1 5 10 10 0 0 0 7.5 3.3 10.4 10.4 0 0 0 9.9-7.2 10 10 0 0 0 6.7-4.8 10.4 10.4 0 0 0-1.3-11.4zM22 37.3a7.7 7.7 0 0 1-4.9-1.8l.2-.1 8.2-4.7a1.4 1.4 0 0 0 .7-1.2V18.3l3.4 2a.1.1 0 0 1 .1.1v9.5A7.7 7.7 0 0 1 22 37.3zM6 31.2a7.7 7.7 0 0 1-.9-5.2l.2.1 8.2 4.7a1.4 1.4 0 0 0 1.4 0l10-5.8v3.9a.1.1 0 0 1 0 .1l-8.3 4.8A7.7 7.7 0 0 1 6 31.2zm-2-17.9a7.7 7.7 0 0 1 4-3.4V20a1.4 1.4 0 0 0 .7 1.2l10 5.8-3.5 2a.1.1 0 0 1-.1 0L6.8 24A7.7 7.7 0 0 1 4 13.3zM32.4 22l-10-5.8 3.5-2a.1.1 0 0 1 .1 0l8.3 4.8a7.7 7.7 0 0 1-1.2 13.9V23a1.4 1.4 0 0 0-.7-1.1zm3.4-5.2-.2-.1-8.2-4.7a1.4 1.4 0 0 0-1.4 0l-10 5.8v-3.9a.1.1 0 0 1 0-.1l8.3-4.8a7.7 7.7 0 0 1 11.5 8zm-21.8 7.2-3.5-2a.1.1 0 0 1-.1-.1v-9.5a7.7 7.7 0 0 1 12.6-5.9l-.2.1-8.2 4.7a1.4 1.4 0 0 0-.7 1.2zm1.9-4 4.5-2.6 4.5 2.6v5.1l-4.5 2.6-4.5-2.6z"/>
      </svg>
    ),
  },
  {
    name: 'Perplexity', cat: 'AEO',
    logo: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    name: 'HubSpot', cat: 'CRM',
    logo: (
      <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
        <circle cx="28" cy="11" r="5.5"/><circle cx="28" cy="11" r="2.5" fill="#F5F0EB"/>
        <path d="M22 11 H9 Q5 11 5 15 V28 Q5 32 9 32 H21 Q25 32 25 28 V19"/>
      </svg>
    ),
  },
  {
    name: 'Vercel', cat: 'Build',
    logo: (
      <svg viewBox="0 0 116 100" className="w-6 h-5 fill-current">
        <path d="M57.5 0L115 100H0L57.5 0z"/>
      </svg>
    ),
  },
  {
    name: 'Figma', cat: 'Design',
    logo: (
      <svg viewBox="0 0 38 57" className="w-4 h-6 fill-current">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z"/>
        <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z"/>
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
      </svg>
    ),
  },
  {
    name: 'React', cat: 'Build',
    logo: (
      <svg viewBox="0 0 100 100" className="w-6 h-6 fill-none stroke-current" strokeWidth="4">
        <circle cx="50" cy="50" r="7" fill="currentColor" stroke="none"/>
        <ellipse cx="50" cy="50" rx="46" ry="17"/>
        <ellipse cx="50" cy="50" rx="46" ry="17" transform="rotate(60 50 50)"/>
        <ellipse cx="50" cy="50" rx="46" ry="17" transform="rotate(120 50 50)"/>
      </svg>
    ),
  },
  {
    name: 'GA4', cat: 'Analytics',
    logo: <span className="text-[11px] font-black tracking-tight">GA4</span>,
  },
  {
    name: 'Gemini', cat: 'AI',
    logo: (
      <svg viewBox="0 0 28 28" className="w-6 h-6 fill-current">
        <path d="M14 0c0 7.73-6.27 14-14 14 7.73 0 14 6.27 14 14 0-7.73 6.27-14 14-14-7.73 0-14-6.27-14-14z"/>
      </svg>
    ),
  },
];

// ── Client logos ──────────────────────────────────────────────
const CLIENT_LOGOS = [
  {
    wordmark: 'Timberline Co.',
    mark: <svg viewBox="0 0 18 22" className="w-4 h-5 fill-current shrink-0"><polygon points="9,1 17,14 1,14"/><rect x="7" y="14" width="4" height="6"/></svg>,
  },
  {
    wordmark: 'Propvault Digital',
    mark: <svg viewBox="0 0 18 18" className="w-4 h-4 fill-none stroke-current shrink-0" strokeWidth="1.8"><path d="M2,9 L9,2 L16,9 V16 H11 V12 H7 V16 H2 Z"/></svg>,
  },
  {
    wordmark: 'Meridian Digital',
    mark: <svg viewBox="0 0 18 12" className="w-5 h-3 fill-current shrink-0"><rect x="0" y="5" width="6" height="2"/><polygon points="9,0 12,6 9,12 6,6"/><rect x="12" y="5" width="6" height="2"/></svg>,
  },
  {
    wordmark: 'Hazel & Rye',
    mark: <svg viewBox="0 0 18 12" className="w-5 h-3 fill-none stroke-current shrink-0" strokeWidth="1.6"><circle cx="5" cy="6" r="4"/><circle cx="13" cy="6" r="4"/></svg>,
  },
  {
    wordmark: 'GroundUp Finance',
    mark: <svg viewBox="0 0 16 16" className="w-4 h-4 fill-none stroke-current shrink-0" strokeWidth="2" strokeLinecap="round"><path d="M2,14 L2,8 L6,8 L6,4 L10,4 L10,0 L14,0"/></svg>,
  },
  {
    wordmark: 'Buildwise',
    mark: <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current shrink-0"><rect x="0" y="0" width="6" height="6"/><rect x="10" y="0" width="6" height="6"/><rect x="5" y="10" width="6" height="6"/></svg>,
  },
  {
    wordmark: 'Kintsugi Health',
    mark: <svg viewBox="0 0 18 12" className="w-5 h-3 fill-none stroke-current shrink-0" strokeWidth="1.8" strokeLinecap="round"><path d="M0,6 L5,6 L7,2 L9,10 L11,6 L18,6"/></svg>,
  },
  {
    wordmark: 'Stackwork',
    mark: <svg viewBox="0 0 16 14" className="w-4 h-3.5 fill-current shrink-0"><rect x="0" y="0" width="16" height="3"/><rect x="2" y="5.5" width="12" height="3"/><rect x="4" y="11" width="8" height="3"/></svg>,
  },
  {
    wordmark: 'The Fold Agency',
    mark: <svg viewBox="0 0 16 16" className="w-4 h-4 fill-none stroke-current shrink-0" strokeWidth="1.6"><path d="M0,0 H10 L16,6 V16 H0 Z"/><path d="M10,0 L10,6 L16,6"/></svg>,
  },
  {
    wordmark: 'Northgate Sports Club',
    mark: <svg viewBox="0 0 16 18" className="w-4 h-4.5 fill-none stroke-current shrink-0" strokeWidth="1.6"><path d="M8,1 L14,4 V10 Q14,16 8,17 Q2,16 2,10 V4 Z"/></svg>,
  },
];

// ── Animated counter ──────────────────────────────────────────
function AnimatedCounter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1800;
    const raf = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * to));
      if (t < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref}>{value}{suffix}</span>;
}

// ── Layer accordion card ──────────────────────────────────────
function LayerCard({ layer, index, isOpen, onToggle }: {
  layer: typeof homeData.layers.items[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  key?: React.Key;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
    >
      <button
        onClick={onToggle}
        className={`w-full text-left border p-6 md:p-8 transition-all duration-400 group ${
          isOpen
            ? 'border-[#FAFAFA]/30 bg-[#FAFAFA]/[0.05]'
            : 'border-[#FAFAFA]/10 bg-[#FAFAFA]/[0.02] hover:border-[#FAFAFA]/25 hover:bg-[#FAFAFA]/[0.04]'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <span className="text-3xl font-display text-[#A1A1AA] block mb-6">{layer.id}</span>
            <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-2 text-[#FAFAFA]">{layer.label}</p>
            <p className="text-sm leading-relaxed opacity-50 text-[#FAFAFA]">{layer.description}</p>
          </div>
          <div className={`shrink-0 mt-1 transition-all duration-300 ${isOpen ? 'text-[#FAFAFA]' : 'text-[#FAFAFA]/30'}`}>
            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-[#FAFAFA]/10">
                <p className="text-sm leading-relaxed opacity-70 text-[#FAFAFA]">{layer.detail}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 mt-4 text-[10px] tracking-[0.2em] uppercase font-bold opacity-40 hover:opacity-100 transition-opacity duration-200 text-[#FAFAFA]"
                  onClick={e => e.stopPropagation()}
                >
                  See services <ArrowRight size={11} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

// ── Horizontal scroll ticker for stats ───────────────────────
function StatTicker() {
  const stats = [
    { value: 154, suffix: '%', label: 'Search Impressions' },
    { value: 63, suffix: '%', label: 'Search Visibility' },
    { value: 100, suffix: '', label: 'Lighthouse SEO Score' },
    { value: 1281, suffix: '', label: 'Pages Deployed' },
    { value: 96, suffix: '', label: 'Performance Score' },
    { value: 8, suffix: ' wks', label: 'From Zero to Rank' },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#FAFAFA]/10 border border-[#FAFAFA]/10">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 + i * 0.07, duration: 0.6 }}
          className="bg-[#09090B] px-6 py-8 md:px-8 md:py-10"
        >
          <div className="text-3xl md:text-4xl font-display text-[#FAFAFA] mb-1">
            {inView ? <AnimatedCounter to={s.value} suffix={s.suffix} /> : `0${s.suffix}`}
          </div>
          <div className="text-[9px] tracking-[0.25em] uppercase text-[#A1A1AA] opacity-60">{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Home() {
  const [openLayer, setOpenLayer] = useState<string | null>(null);
  const toggleLayer = (id: string) => setOpenLayer(prev => prev === id ? null : id);

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroTextY = useTransform(heroScroll, [0, 1], ['0%', '15%']);
  const heroImgY = useTransform(heroScroll, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const schemaWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Organic Theory',
    url: 'https://organictheory.vercel.app',
    description: 'Digital consultancy specializing in search architecture, AI automation, and workflow engineering.',
    author: { '@type': 'Person', name: 'Gabriel Balenton', url: 'https://organictheory.vercel.app', sameAs: ['https://www.linkedin.com/in/gabrielbalenton/'] },
  };
  const schemaProfessional = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Organic Theory',
    url: 'https://organictheory.vercel.app',
    description: 'Strategic digital consultancy building search systems, AI automation, and workflow infrastructure for global brands.',
    founder: { '@type': 'Person', name: 'Gabriel Balenton' },
    areaServed: 'Worldwide',
    serviceType: ['SEO', 'AI Automation', 'Workflow Engineering', 'Web Development', 'Content Strategy'],
    sameAs: ['https://www.linkedin.com/in/gabrielbalenton/'],
  };

  return (
    <>
      <Helmet>
        <title>Organic Theory | Strategic Search Architecture & Systems</title>
        <meta name="description" content="Organic Theory builds search systems, AI automation, and workflow infrastructure that allow global brands to scale without friction. Founded by Gabriel Balenton." />
        <meta property="og:site_name" content="Organic Theory" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://organictheory.vercel.app" />
        <meta property="og:title" content="Organic Theory | Strategic Search Architecture & Systems" />
        <meta property="og:description" content="Search architecture, AI automation, and workflow engineering for global brands. Founded by Gabriel Balenton." />
        <meta property="og:image" content="https://organictheory.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Organic Theory — Strategic Logic. Measurable Growth." />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Organic Theory | Strategic Search Architecture & Systems" />
        <meta name="twitter:description" content="Search architecture, AI automation, and workflow engineering for global brands." />
        <meta name="twitter:image" content="https://organictheory.vercel.app/og-image.png" />
        <meta name="twitter:image:alt" content="Organic Theory — Strategic Logic. Measurable Growth." />
        <link rel="canonical" href="https://organictheory.vercel.app" />
        <script type="application/ld+json">{JSON.stringify(schemaWebsite)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaProfessional)}</script>
      </Helmet>

      <div className="w-full overflow-x-hidden bg-[#09090B] text-[#FAFAFA]">

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden">

          {/* Full-bleed hero image with parallax */}
          <motion.div
            style={{ y: heroImgY }}
            className="absolute inset-0 w-full h-[115%] -top-[5%]"
          >
            <img
              src="/images/home-hero.png"
              alt="Gabriel Balenton - Organic Theory"
              className="w-full h-full object-cover object-center"
            />
            {/* Dark overlay: heavy at top (nav) and bottom (text), lighter in middle */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/70 via-[#09090B]/30 to-[#09090B]/85" />
          </motion.div>

          {/* Hero text */}
          <motion.div
            style={{ y: heroTextY, opacity: heroOpacity }}
            className="relative z-10 flex flex-col justify-end flex-1 px-6 md:px-12 max-w-7xl mx-auto w-full pb-24 pt-40"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[10px] text-[#FAFAFA]/50 mb-8 font-bold tracking-[0.4em] uppercase"
            >
              <ScrambleText text={homeData.hero.badge} delay={0.5} />
            </motion.p>

            <TextRevealLines
              lines={[homeData.hero.titlePrimary, homeData.hero.titleAccent]}
              className="text-5xl md:text-7xl lg:text-[7rem] leading-[1.0] font-display uppercase tracking-tight"
              staggerDelay={0.12}
              baseDelay={0.1}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
              className="max-w-lg text-sm md:text-base leading-relaxed text-[#FAFAFA]/60 mt-8 mb-12"
            >
              {homeData.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-4 group border border-[#FAFAFA]/30 bg-[#FAFAFA]/10 backdrop-blur-sm px-8 py-4 hover:bg-[#FAFAFA] transition-all duration-300 ease-out"
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold group-hover:text-[#09090B] transition-colors duration-300">Start a conversation</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 group-hover:text-[#09090B] transition-all duration-300" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  to="/vault"
                  className="inline-flex items-center gap-4 group px-8 py-4 hover:opacity-60 transition-opacity duration-300"
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold opacity-50 group-hover:opacity-100 transition-opacity">See the work</span>
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="absolute bottom-10 right-6 md:right-12 z-10 flex flex-col items-center gap-3"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-10 bg-[#FAFAFA]/40"
            />
            <span className="text-[9px] tracking-[0.4em] uppercase [writing-mode:vertical-lr]">Scroll</span>
          </motion.div>
        </section>

        {/* ── MARQUEE ── */}
        <Marquee />

        {/* ── CLIENT LOGO STRIP ── */}
        <section className="py-10 px-6 md:px-12 border-t border-[#FAFAFA]/8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#A1A1AA]/25 mb-8 text-center">Trusted by</p>
            <div className="relative overflow-hidden">
              <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="flex gap-12 w-max items-center"
              >
                {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((c, i) => (
                  <div key={i} className="flex items-center gap-2.5 opacity-25 hover:opacity-60 transition-opacity duration-300 shrink-0">
                    <div className="text-[#FAFAFA]">{c.mark}</div>
                    <span className="text-[11px] font-black tracking-[0.1em] uppercase text-[#FAFAFA] whitespace-nowrap">{c.wordmark}</span>
                  </div>
                ))}
              </motion.div>
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#09090B] to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#09090B] to-transparent pointer-events-none" />
            </div>
          </div>
        </section>

        {/* ── STATS GRID ── */}
        <RevealSection className="py-20 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
              <p className="text-[10px] text-[#A1A1AA] font-bold tracking-[0.3em] uppercase">
                <ScrambleText text="[ RESULTS ]" />
              </p>
              <p className="text-sm opacity-30 max-w-xs text-right">Numbers from real builds. No projections.</p>
            </div>
            <StatTicker />
          </div>
        </RevealSection>

        {/* ── TOOLS STRIP (LIGHT) ── */}
        <section className="bg-[#F5F0EB] text-[#09090B] py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#09090B]/40 mb-3">
                  <ScrambleText text="[ THE STACK ]" />
                </p>
                <TextReveal>
                  <h2 className="text-2xl md:text-3xl font-display uppercase tracking-widest text-[#09090B]">Tools I deploy.</h2>
                </TextReveal>
              </div>
              <p className="text-sm opacity-50 max-w-xs leading-relaxed">Every engagement runs on this stack - SEO, automation, build, and reporting.</p>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {TOOLS.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: i * 0.03, ease: EASE }}
                  whileHover={{ y: -2 }}
                  className="flex flex-col items-center gap-2.5 border border-[#09090B]/8 bg-[#09090B]/[0.03] px-3 py-4 cursor-default transition-all duration-300 hover:bg-[#09090B]/[0.07] hover:border-[#09090B]/20 group"
                >
                  <div className="text-[#09090B]/60 group-hover:text-[#09090B]/90 transition-colors duration-300 h-7 flex items-center justify-center">
                    {tool.logo}
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-[#09090B]/70 leading-tight">{tool.name}</p>
                    <p className="text-[9px] tracking-[0.15em] uppercase text-[#09090B]/30 mt-0.5">{tool.cat}</p>
                  </div>
                </motion.div>
              ))}
              {/* +100 more tile */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: TOOLS.length * 0.03, ease: EASE }}
                className="flex flex-col items-center justify-center border border-dashed border-[#09090B]/15 px-3 py-4 col-span-1"
              >
                <p className="text-xl font-display text-[#09090B]/40">+100</p>
                <p className="text-[9px] tracking-[0.15em] uppercase text-[#09090B]/25 mt-1 text-center">more tools</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SERVICE LAYERS (DARK) ── */}
        <RevealSection className="py-20 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14">
              <p className="text-[10px] text-[#A1A1AA] mb-4 font-bold tracking-[0.3em] uppercase">
                <ScrambleText text="[ SERVICE ARCHITECTURE ]" />
              </p>
              <TextReveal>
                <h2 className="text-2xl md:text-3xl mb-4 font-display uppercase tracking-widest">{homeData.layers.title}</h2>
              </TextReveal>
              <p className="text-sm md:text-base leading-relaxed opacity-50 max-w-xl">{homeData.layers.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {homeData.layers.items.map((layer, i) => (
                <LayerCard
                  key={layer.id}
                  layer={layer}
                  index={i}
                  isOpen={openLayer === layer.id}
                  onToggle={() => toggleLayer(layer.id)}
                />
              ))}
            </div>
          </div>
        </RevealSection>

        {/* ── METHODOLOGY - with photo (DARK) ── */}
        <RevealSection className="border-t border-[#FAFAFA]/10 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* Photo left */}
            <div className="relative h-[50vh] lg:h-auto min-h-[400px] overflow-hidden">
              <ParallaxImage
                src="/images/home-methodology.png"
                alt="O+X Methodology"
                className="absolute inset-0 w-full h-full"
                strength={12}
              />
              <div className="absolute inset-0 bg-[#09090B]/40" />
              {/* Floating label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
                className="absolute bottom-8 left-8"
              >
                <div className="text-4xl font-display tracking-[0.4em] text-[#FAFAFA] mb-1">O+X</div>
                <div className="text-[9px] tracking-[0.4em] uppercase text-[#FAFAFA]/40">Organic Theory</div>
              </motion.div>
            </div>

            {/* Text right */}
            <div className="py-16 px-6 md:px-12 lg:py-20 flex flex-col justify-center">
              <p className="text-[10px] text-[#A1A1AA] mb-6 font-bold tracking-[0.3em] uppercase">
                <ScrambleText text="[ METHODOLOGY ]" />
              </p>
              <TextReveal>
                <h2 className="text-2xl md:text-4xl mb-6 font-display uppercase tracking-tight leading-tight">{homeData.methodology.title}</h2>
              </TextReveal>
              <p className="text-sm leading-relaxed opacity-40 mb-10 max-w-sm">{homeData.methodology.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {homeData.methodology.pillars.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                    className="border border-[#FAFAFA]/10 p-6 flex flex-col gap-5 bg-[#FAFAFA]/[0.02] hover:border-[#FAFAFA]/25 hover:bg-[#FAFAFA]/[0.04] transition-all duration-500 group"
                  >
                    <div className="flex items-start justify-between">
                      <span className={`text-5xl font-display leading-none ${p.accent ? 'text-[#A1A1AA]' : 'text-[#FAFAFA]'}`}>{p.id}</span>
                      <span className="text-[9px] tracking-[0.2em] uppercase opacity-30 text-right leading-tight mt-1">{p.label}</span>
                    </div>
                    <p className="text-xs opacity-50 leading-relaxed">{p.summary}</p>
                    <div className="border-t border-[#FAFAFA]/8 pt-4 space-y-2">
                      {p.points.map((pt, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <span className="text-[#FAFAFA]/20 text-[10px] mt-0.5 shrink-0">-</span>
                          <span className="text-[10px] opacity-40 leading-snug">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* ── TESTIMONIALS (DARK) ── */}
        <RevealSection className="py-20 px-6 md:px-12 border-t border-[#FAFAFA]/10 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-14">
              <div>
                <p className="text-[10px] text-[#A1A1AA] mb-4 font-bold tracking-[0.3em] uppercase">
                  <ScrambleText text="[ CLIENT RESULTS ]" />
                </p>
                <TextReveal>
                  <h2 className="text-2xl md:text-3xl font-display uppercase tracking-widest">What clients say.</h2>
                </TextReveal>
              </div>
              <p className="text-sm opacity-30 max-w-xs text-right md:text-right">{testimonials.length} testimonials across all services</p>
            </div>

            {/* Featured testimonials - first 3 large */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {testimonials.slice(0, 3).map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                  className="border border-[#FAFAFA]/10 bg-[#FAFAFA]/[0.02] p-8 flex flex-col justify-between hover:border-[#FAFAFA]/20 hover:bg-[#FAFAFA]/[0.04] transition-all duration-500"
                >
                  <div>
                    <Quote size={20} className="text-[#A1A1AA]/30 mb-5" />
                    <p className="text-sm leading-[1.8] opacity-70 mb-6">"{t.quote}"</p>
                  </div>
                  <div className="border-t border-[#FAFAFA]/10 pt-4">
                    <p className="text-xs font-bold tracking-[0.1em]">{t.name}</p>
                    <p className="text-[10px] opacity-40 tracking-[0.1em] mt-0.5">{t.role}, {t.company}</p>
                    <span className="text-[9px] tracking-[0.2em] uppercase border border-[#FAFAFA]/10 px-2 py-0.5 text-[#A1A1AA] inline-block mt-2">{t.service}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scrolling ticker row - remaining testimonials */}
            <div className="relative overflow-hidden">
              <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="flex gap-4 w-max"
              >
                {[...testimonials.slice(3), ...testimonials.slice(3)].map((t, i) => (
                  <div key={i} className="w-72 shrink-0 border border-[#FAFAFA]/8 bg-[#FAFAFA]/[0.01] p-5">
                    <p className="text-xs leading-[1.7] opacity-50 mb-4 line-clamp-4">"{t.quote}"</p>
                    <p className="text-[10px] font-bold tracking-[0.1em] opacity-70">{t.name}</p>
                    <p className="text-[9px] opacity-30 tracking-[0.1em]">{t.company} · {t.service}</p>
                  </div>
                ))}
              </motion.div>
              {/* Fade edges */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#09090B] to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#09090B] to-transparent pointer-events-none" />
            </div>
          </div>
        </RevealSection>

        {/* ── FAQ (LIGHT) ── */}
        {(() => {
          const FAQS = [
            {
              q: 'How much does it cost to work with you?',
              a: 'Everything starts with the $400 site audit. One hour, full diagnostic, 30-day action plan. From there, project engagements are scoped individually based on what the work actually requires - no padded retainers, no arbitrary packages. Most clients spend between $1,500 and $8,000 on their first full engagement.',
            },
            {
              q: 'Can you guarantee results?',
              a: "No, and I won't pretend to. Anyone who guarantees specific rankings or traffic numbers is either lying or has no idea what they're doing. What I can guarantee is a structured, data-backed approach - and I can show you the exact results from previous clients who started where you are.",
            },
            {
              q: 'How long until I see results?',
              a: 'Automation wins are immediate - the system starts working the day it goes live. SEO is slower by nature: most clients see measurable movement in 8-16 weeks depending on domain authority and how many issues need fixing. The Search Architecture audit sets a clear timeline before any work starts.',
            },
            {
              q: "I've been burned by an SEO agency before. How is this different?",
              a: "Most agencies sell ongoing retainers because retainers benefit them, not you. I work project-by-project unless you choose ongoing support. Every engagement starts with a diagnostic - no work begins until we both agree on what's broken and what success looks like. And you own everything we build together.",
            },
            {
              q: 'What exactly is a Search Architecture Audit?',
              a: "It's a full diagnostic of your site's technical structure, crawlability, keyword architecture, and competitive position. You get a prioritized list of issues with clear fix instructions - whether you handle them yourself, brief your developer, or bring me in to fix them. Price: $400 flat. Time: one 60-minute session plus a written report.",
            },
            {
              q: "What's the difference between SEO and AEO?",
              a: "SEO optimizes for Google's blue-link results. AEO (Answer Engine Optimization) optimizes for AI-generated answers - the kind you see in ChatGPT, Perplexity, and Google's AI Overviews. The structural requirements overlap but are not the same. Brands that get AEO right now will own their categories in three years.",
            },
            {
              q: 'Do you build websites?',
              a: "Yes, under Interface Design and Development. I build performance-first sites in React and modern frameworks - designed to convert, not just impress. These are typically paired with a Search Architecture engagement so the site is built to rank from day one.",
            },
            {
              q: 'Can you help with just one thing, or do I need a full package?',
              a: "You can start with just the audit, just an automation build, or just a content strategy. There's no minimum commitment. Most clients start with one project and expand from there once they see how the system works.",
            },
            {
              q: 'What automation tools do you work with?',
              a: "Primarily Make (Integromat) and n8n for workflow automation, HubSpot and ActiveCampaign for CRM, and custom AI integrations built on Google Gemini and Claude. The tool choice depends on what you already have and what your stack needs to do - I won't force a migration if your existing tools can be connected.",
            },
            {
              q: 'What industries do you work with?',
              a: "E-commerce, SaaS, professional services, legal, health and wellness, real estate, and creative agencies. The frameworks transfer across industries because the underlying problems - poor site structure, manual workflows, content that doesn't convert - are the same everywhere.",
            },
            {
              q: 'Do you work with overseas clients?',
              a: 'Yes. All work is delivered remotely. The audit session is via video call, and all deliverables are written documents and implemented systems - timezone is a scheduling matter, not a limitation.',
            },
            {
              q: 'Do you offer ongoing support after a project ends?',
              a: "Some clients move to a quarterly check-in model after their initial engagement - usually 3-4 hours a month to monitor performance, adjust strategy, and catch new issues before they compound. This is optional and only makes sense if there's active work to do. I don't sell retainers for the sake of retainers.",
            },
          ];
          const [open, setOpen] = React.useState<number | null>(null);
          return (
            <section className="bg-[#F5F0EB] text-[#09090B] py-24 px-6 md:px-12">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-14">
                  <div className="lg:col-span-5">
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#09090B]/40 mb-6">
                      <ScrambleText text="[ FAQ ]" />
                    </p>
                    <TextReveal>
                      <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight leading-tight text-[#09090B]">
                        Every question<br />worth asking.
                      </h2>
                    </TextReveal>
                  </div>
                  <div className="lg:col-span-7 lg:pt-16">
                    <p className="text-sm opacity-50 leading-relaxed max-w-md">
                      If something isn't covered here, bring it to the first conversation. The audit session is designed to answer the questions that are specific to your situation.
                    </p>
                  </div>
                </div>
                <div className="divide-y divide-[#09090B]/10">
                  {FAQS.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
                    >
                      <button
                        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                        onClick={() => setOpen(open === i ? null : i)}
                      >
                        <span className="text-sm font-bold tracking-[0.03em] group-hover:opacity-70 transition-opacity duration-200">{item.q}</span>
                        <span className="shrink-0 mt-0.5 opacity-40 group-hover:opacity-70 transition-opacity duration-200">
                          {open === i ? <Minus size={14} /> : <Plus size={14} />}
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {open === i && (
                          <motion.div
                            key="answer"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm leading-relaxed opacity-55 pb-6 max-w-2xl">{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          );
        })()}

        {/* ── BOTTOM CTA (LIGHT) ── */}
        <section className="bg-[#F5F0EB] text-[#09090B] py-28 px-6 md:px-12 overflow-hidden relative">
          {/* Large background text */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          >
            <span className="text-[20vw] font-display uppercase tracking-[0.1em] text-[#09090B]/[0.04] whitespace-nowrap">O+X</span>
          </div>

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 relative z-10">
            <div>
              <p className="text-[10px] text-[#09090B]/40 mb-4 font-bold tracking-[0.3em] uppercase">
                <ScrambleText text="[ READY TO BUILD ]" />
              </p>
              <TextReveal>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight leading-tight max-w-lg text-[#09090B]">
                  Let&rsquo;s build<br />the system.
                </h2>
              </TextReveal>
            </div>
            <MagneticButton strength={0.5}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-4 group border border-[#09090B]/20 px-10 py-5 hover:bg-[#09090B] hover:text-[#FAFAFA] transition-all duration-300 ease-out shrink-0 text-[#09090B]"
              >
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold group-hover:text-[#FAFAFA] transition-colors duration-300">Start a conversation</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </MagneticButton>
          </div>
        </section>

      </div>
    </>
  );
}
