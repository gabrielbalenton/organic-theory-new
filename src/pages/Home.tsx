import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { RevealSection } from '../components/RevealSection';
import Marquee from '../components/Marquee';
import { homeData } from '../data/homeData';

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {inView ? (
          <CountUp target={value} />
        ) : '0'}
      </motion.span>
      {suffix}
    </motion.span>
  );
}

function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ '--n': 0 } as never}
    >
      <motion.span
        animate={inView ? { opacity: 1 } : {}}
        style={{ display: 'inline-block' }}
      >
        <AnimatedNumber target={target} />
      </motion.span>
    </motion.span>
  );
}

function AnimatedNumber({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
    >
      <motion.span
        initial={0}
        animate={inView ? target : 0}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {(v: number) => Math.round(v).toLocaleString()}
      </motion.span>
    </motion.span>
  );
}

export default function Home() {
  const schemaWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Organic Theory',
    url: 'https://organictheory.vercel.app',
    description: 'Digital consultancy specializing in search architecture, AI automation, and workflow engineering.',
    author: {
      '@type': 'Person',
      name: 'Gabriel Balenton',
      url: 'https://organictheory.vercel.app',
      sameAs: ['https://www.linkedin.com/in/gabrielbalenton/'],
    },
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Organic Theory | Strategic Search Architecture & Systems" />
        <meta name="twitter:description" content="Search architecture, AI automation, and workflow engineering." />
        <link rel="canonical" href="https://organictheory.vercel.app" />
        <script type="application/ld+json">{JSON.stringify(schemaWebsite)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaProfessional)}</script>
      </Helmet>

      <div className="w-full overflow-x-hidden bg-[#09090B] text-[#FAFAFA]">

        {/* ── Hero ── */}
        <section className="min-h-[92vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto py-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.p variants={fadeUp} className="text-[10px] text-[#A1A1AA] mb-8 font-bold tracking-[0.35em] uppercase">
                {homeData.hero.badge}
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-7xl lg:text-8xl leading-[1.0] mb-8 font-display uppercase tracking-tight"
              >
                {homeData.hero.titlePrimary}
                <br />
                <span className="text-[#A1A1AA]">{homeData.hero.titleAccent}</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="max-w-lg text-sm md:text-base leading-relaxed opacity-50 mb-12">
                {homeData.hero.description}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-4 group border border-[#FAFAFA]/20 px-8 py-4 hover:bg-[#FAFAFA] transition-all duration-300 ease-out"
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold group-hover:text-[#09090B] transition-colors duration-300">
                    Start a conversation
                  </span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 group-hover:text-[#09090B] transition-all duration-300" />
                </Link>
                <Link
                  to="/vault"
                  className="inline-flex items-center gap-4 group px-8 py-4 hover:opacity-60 transition-opacity duration-300"
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold opacity-40 group-hover:opacity-100 transition-opacity">
                    See the work
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* Decorative mark */}
            <div className="hidden lg:flex justify-center items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                className="w-72 h-72 opacity-[0.06]"
              >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="42" stroke="#FAFAFA" strokeWidth="0.8" />
                  <circle cx="50" cy="50" r="28" stroke="#FAFAFA" strokeWidth="0.5" />
                  <path d="M20 20L80 80M80 20L20 80" stroke="#FAFAFA" strokeWidth="0.8" />
                  <circle cx="50" cy="50" r="4" fill="#FAFAFA" />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-6 md:left-12 flex items-center gap-3"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-8 bg-[#FAFAFA]/40"
            />
            <span className="text-[9px] tracking-[0.4em] uppercase">Scroll</span>
          </motion.div>
        </section>

        {/* ── Marquee ── */}
        <Marquee />

        {/* ── Metrics ── */}
        <RevealSection className="py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-[#FAFAFA]/10">
            {homeData.metrics.map((m) => (
              <div key={m.label} className="flex flex-col items-start md:items-center text-center px-0 md:px-8">
                <div className="text-4xl md:text-5xl font-display font-bold mb-2 tabular-nums">
                  <Counter value={m.value} suffix={m.suffix} />
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase opacity-40">{m.label}</p>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* ── The System ── */}
        <RevealSection className="py-20 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14">
              <p className="text-[10px] text-[#A1A1AA] mb-4 font-bold tracking-[0.3em] uppercase">[ SERVICE ARCHITECTURE ]</p>
              <h2 className="text-2xl md:text-3xl mb-4 font-display uppercase tracking-widest">{homeData.layers.title}</h2>
              <p className="text-sm md:text-base leading-relaxed opacity-50 max-w-xl">{homeData.layers.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {homeData.layers.items.map((layer, i) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  className="border border-[#FAFAFA]/10 p-6 md:p-8 flex flex-col justify-between bg-[#FAFAFA]/[0.02] hover:border-[#FAFAFA]/30 hover:bg-[#FAFAFA]/[0.04] transition-all duration-500 group"
                >
                  <span className="text-3xl font-display text-[#A1A1AA] mb-8">{layer.id}</span>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-2">{layer.label}</p>
                    <p className="text-sm leading-relaxed opacity-50">{layer.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* ── O+X Methodology ── */}
        <RevealSection className="py-20 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl mb-8 font-display uppercase tracking-widest">{homeData.methodology.title}</h2>
              <p className="text-sm md:text-base leading-relaxed opacity-50">{homeData.methodology.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {homeData.methodology.pillars.map((p) => (
                <div
                  key={p.id}
                  className="border border-[#FAFAFA]/10 p-6 md:p-8 flex flex-col justify-between aspect-square bg-[#FAFAFA]/[0.02] hover:border-[#FAFAFA]/30 transition-colors duration-500"
                >
                  <span className={`text-4xl font-display ${p.accent ? 'text-[#A1A1AA]' : 'text-[#FAFAFA]'}`}>{p.id}</span>
                  <span className="text-[10px] tracking-[0.2em] uppercase opacity-40">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* ── Bottom CTA ── */}
        <RevealSection className="py-28 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div>
              <p className="text-[10px] text-[#A1A1AA] mb-4 font-bold tracking-[0.3em] uppercase">[ READY TO BUILD ]</p>
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight leading-tight max-w-lg">
                Let's build the system.
              </h2>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-4 group border border-[#FAFAFA]/20 px-10 py-5 hover:bg-[#FAFAFA] transition-all duration-300 ease-out shrink-0"
            >
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold group-hover:text-[#09090B] transition-colors duration-300">
                Start a conversation
              </span>
              <ArrowRight size={14} className="group-hover:translate-x-1 group-hover:text-[#09090B] transition-all duration-300" />
            </Link>
          </div>
        </RevealSection>

      </div>
    </>
  );
}
