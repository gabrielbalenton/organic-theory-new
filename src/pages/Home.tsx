import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Plus, Minus } from 'lucide-react';
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

// ── Simple RAF-based counter ──────────────────────────────────
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const duration = 1800;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <div ref={ref} className="tabular-nums">
      {display.toLocaleString()}{suffix}
    </div>
  );
}

// ── Accordion layer card ───────────────────────────────────────
function LayerCard({ layer, index, isOpen, onToggle }: {
  layer: typeof homeData.layers.items[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
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
            <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-2">{layer.label}</p>
            <p className="text-sm leading-relaxed opacity-50">{layer.description}</p>
          </div>
          <div className={`shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'text-[#FAFAFA]' : 'text-[#FAFAFA]/30'}`}>
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
                <p className="text-sm leading-relaxed opacity-70">{layer.detail}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 mt-4 text-[10px] tracking-[0.2em] uppercase font-bold opacity-40 hover:opacity-100 transition-opacity duration-200"
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

// ── Hero right panel — animated system diagram ─────────────────
function HeroDiagram() {
  return (
    <div className="hidden lg:block relative w-full h-[480px]">
      {/* Subtle grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FAFAFA" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated bars — abstract analytics */}
      <svg viewBox="0 0 400 380" className="absolute inset-0 w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Chart baseline */}
        <line x1="60" y1="300" x2="380" y2="300" stroke="#FAFAFA" strokeOpacity="0.1" strokeWidth="1"/>
        <line x1="60" y1="240" x2="380" y2="240" stroke="#FAFAFA" strokeOpacity="0.05" strokeWidth="1"/>
        <line x1="60" y1="180" x2="380" y2="180" stroke="#FAFAFA" strokeOpacity="0.05" strokeWidth="1"/>
        <line x1="60" y1="120" x2="380" y2="120" stroke="#FAFAFA" strokeOpacity="0.05" strokeWidth="1"/>
        <line x1="60" y1="60" x2="380" y2="60" stroke="#FAFAFA" strokeOpacity="0.05" strokeWidth="1"/>

        {/* Y axis */}
        <line x1="60" y1="40" x2="60" y2="300" stroke="#FAFAFA" strokeOpacity="0.1" strokeWidth="1"/>

        {/* Bars with staggered animations */}
        {[
          { x: 90,  height: 80,  delay: 0 },
          { x: 130, height: 130, delay: 0.1 },
          { x: 170, height: 100, delay: 0.2 },
          { x: 210, height: 180, delay: 0.3 },
          { x: 250, height: 150, delay: 0.4 },
          { x: 290, height: 220, delay: 0.5 },
          { x: 330, height: 200, delay: 0.6 },
          { x: 370, height: 250, delay: 0.7 },
        ].map((bar, i) => (
          <motion.rect
            key={i}
            x={bar.x - 14}
            y={300 - bar.height}
            width={28}
            height={bar.height}
            fill="#FAFAFA"
            fillOpacity={0}
            initial={{ scaleY: 0, fillOpacity: 0 }}
            animate={{ scaleY: 1, fillOpacity: i === 7 ? 0.15 : 0.06 }}
            transition={{ duration: 1, delay: 1.2 + bar.delay, ease: EASE }}
            style={{ transformOrigin: `${bar.x}px 300px` }}
          />
        ))}

        {/* Trend line */}
        <motion.polyline
          points="90,220 130,170 170,200 210,120 250,150 290,80 330,100 370,50"
          stroke="#FAFAFA"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="400"
          initial={{ strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2, delay: 1.8, ease: EASE }}
        />

        {/* End dot */}
        <motion.circle
          cx="370" cy="50" r="4"
          fill="#FAFAFA"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 0.4, delay: 3.8 }}
        />

        {/* Labels */}
        <motion.text x="376" y="48" fill="#FAFAFA" fillOpacity="0.4" fontSize="8" fontFamily="monospace" letterSpacing="1"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4, duration: 0.5 }}>
          +154%
        </motion.text>

        {/* Axis labels */}
        {['W1','W2','W3','W4','W5','W6','W7','W8'].map((w, i) => (
          <text key={w} x={90 + i * 40} y="316" fill="#FAFAFA" fillOpacity="0.2" fontSize="7" fontFamily="monospace" textAnchor="middle">{w}</text>
        ))}
        <text x="20" y="304" fill="#FAFAFA" fillOpacity="0.2" fontSize="7" fontFamily="monospace">0</text>
        <text x="14" y="244" fill="#FAFAFA" fillOpacity="0.2" fontSize="7" fontFamily="monospace">25%</text>
        <text x="14" y="184" fill="#FAFAFA" fillOpacity="0.2" fontSize="7" fontFamily="monospace">50%</text>
        <text x="14" y="124" fill="#FAFAFA" fillOpacity="0.2" fontSize="7" fontFamily="monospace">75%</text>

        {/* Label */}
        <text x="60" y="345" fill="#FAFAFA" fillOpacity="0.15" fontSize="8" fontFamily="monospace" letterSpacing="3">SEARCH VISIBILITY — 8 WEEK RAMP</text>
      </svg>
    </div>
  );
}

export default function Home() {
  const [openLayer, setOpenLayer] = useState<string | null>(null);

  const toggleLayer = (id: string) => setOpenLayer(prev => prev === id ? null : id);

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
        <section className="min-h-[92vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto py-20 relative">
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

            <HeroDiagram />
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
        <RevealSection className="py-20 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-[#FAFAFA]/10">
            {homeData.metrics.map((m) => (
              <div key={m.label} className="flex flex-col items-start md:items-center text-center px-0 md:px-8">
                <div className="text-4xl md:text-5xl font-display font-bold mb-2">
                  <AnimatedCounter value={m.value} suffix={m.suffix} />
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
                Let&rsquo;s build the system.
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
