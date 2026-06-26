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
  { name: 'Ahrefs', cat: 'SEO' },
  { name: 'Semrush', cat: 'SEO' },
  { name: 'Google Search Console', cat: 'SEO' },
  { name: 'GA4', cat: 'Analytics' },
  { name: 'Screaming Frog', cat: 'Technical' },
  { name: 'Looker Studio', cat: 'Reporting' },
  { name: 'Google Tag Manager', cat: 'Tracking' },
  { name: 'Zapier', cat: 'Automation' },
  { name: 'Make', cat: 'Automation' },
  { name: 'n8n', cat: 'Automation' },
  { name: 'HubSpot', cat: 'CRM' },
  { name: 'ActiveCampaign', cat: 'Email' },
  { name: 'Klaviyo', cat: 'Email' },
  { name: 'Mailchimp', cat: 'Email' },
  { name: 'Webflow', cat: 'Build' },
  { name: 'Notion', cat: 'Ops' },
  { name: 'Framer', cat: 'Build' },
  { name: 'OpenAI API', cat: 'AI' },
  { name: 'Perplexity', cat: 'AEO' },
  { name: 'Surfer SEO', cat: 'Content' },
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
        <meta property="og:title" content="Organic Theory | Strategic Search Architecture & Systems" />
        <meta property="og:description" content="Search architecture, AI automation, and workflow engineering for global brands." />
        <meta property="og:url" content="https://organictheory.vercel.app" />
        <meta property="og:type" content="website" />
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
              alt="Gabriel Balenton — Organic Theory"
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
              <p className="text-sm opacity-50 max-w-xs leading-relaxed">Every engagement runs on this stack — SEO, automation, build, and reporting.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {TOOLS.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.35, delay: i * 0.025, ease: EASE }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 border border-[#09090B]/10 bg-[#09090B]/[0.03] px-4 py-2 cursor-default transition-colors duration-300 hover:bg-[#09090B]/[0.08] hover:border-[#09090B]/25"
                >
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#09090B]/30">{tool.cat}</span>
                  <span className="w-px h-3 bg-[#09090B]/15" />
                  <span className="text-sm font-medium text-[#09090B]">{tool.name}</span>
                </motion.div>
              ))}
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

        {/* ── METHODOLOGY — with photo (DARK) ── */}
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
                <h2 className="text-2xl md:text-3xl mb-8 font-display uppercase tracking-widest">{homeData.methodology.title}</h2>
              </TextReveal>
              <p className="text-sm md:text-base leading-relaxed opacity-50 mb-10">{homeData.methodology.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {homeData.methodology.pillars.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                    className="border border-[#FAFAFA]/10 p-6 flex flex-col justify-between aspect-square bg-[#FAFAFA]/[0.02] hover:border-[#FAFAFA]/30 hover:bg-[#FAFAFA]/[0.04] transition-all duration-500 group"
                  >
                    <span className={`text-4xl font-display group-hover:scale-110 transition-transform duration-300 ${p.accent ? 'text-[#A1A1AA]' : 'text-[#FAFAFA]'}`}>{p.id}</span>
                    <span className="text-[10px] tracking-[0.2em] uppercase opacity-40">{p.label}</span>
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

            {/* Featured testimonials — first 3 large */}
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

            {/* Scrolling ticker row — remaining testimonials */}
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
