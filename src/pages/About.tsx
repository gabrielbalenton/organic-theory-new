import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TextReveal } from '../components/TextReveal';
import { ScrambleText } from '../components/ScrambleText';
import { MagneticButton } from '../components/MagneticButton';

const EASE = [0.22, 1, 0.36, 1] as const;

const JOURNEY = [
  {
    year: '2011',
    role: 'Graduate',
    detail: 'Finished a degree in Entrepreneurship. Entered the workforce with no clear lane yet.',
  },
  {
    year: '2012–18',
    role: 'Customer Service → Sales → Medical Encoding',
    detail: 'Cycled through jobs that had nothing to do with each other. Learned how to talk to people, how to close, how to process data under pressure.',
  },
  {
    year: '2019–22',
    role: 'Culinary School',
    detail: 'Finally chased the real passion. Kitchen life is brutal when you\'re raising three kids - the hours, the heat, the margin for error. Loved it anyway.',
  },
  {
    year: '2023',
    role: 'Introduced to Digital Marketing',
    detail: 'My wife - who had been in this industry long before I knew what a keyword was - showed me what she did. I didn\'t expect to care. I ended up caring a lot.',
  },
  {
    year: '2023–24',
    role: 'Agency Training + Self-Study',
    detail: 'Trained with small agencies and large ones. Self-studied obsessively - not just tactics but frameworks, data, and the edge cases most practitioners skip.',
  },
  {
    year: '2024',
    role: 'Founded Organic Theory',
    detail: 'After everything - the cross-industry experience, agency training, late-night self-study - one thing kept proving true: nothing beats a solid foundation.',
  },
];

const STATS = [
  { value: '40+', label: 'Site audits completed' },
  { value: '1,281', label: 'Programmatic pages deployed' },
  { value: '63%', label: 'Peak search visibility gain' },
  { value: '8 wks', label: 'Fastest result turnaround' },
  { value: '3', label: 'Kids (still cooking on weekends)' },
  { value: '2023', label: 'Year everything clicked' },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Gabriel Balenton | Organic Theory</title>
        <meta name="description" content="Gabriel Balenton is the founder of Organic Theory - a digital consultant who came up through customer service, sales, medical encoding, and culinary school before discovering a love for search architecture and automation." />
        <meta property="og:site_name" content="Organic Theory" />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://organic-theory.vercel.app/about" />
        <meta property="og:title" content="About Gabriel Balenton | Organic Theory" />
        <meta property="og:description" content="The theory didn't start in marketing. Gabriel Balenton is the founder of Organic Theory - the non-linear path that built a systems-first approach to digital growth." />
        <meta property="og:image" content="https://organic-theory.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Gabriel Balenton - Founder of Organic Theory" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Gabriel Balenton | Organic Theory" />
        <meta name="twitter:description" content="The theory didn't start in marketing. The non-linear path that built a systems-first approach to digital growth." />
        <meta name="twitter:image" content="https://organic-theory.vercel.app/og-image.png" />
        <link rel="canonical" href="https://organic-theory.vercel.app/about" />
      </Helmet>

      <div className="w-full bg-[#09090B] text-[#FAFAFA]">

        {/* ── HERO ── */}
        <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] text-[#A1A1AA] mb-8 font-bold tracking-[0.3em] uppercase"
          >
            <ScrambleText text="[ THE FOUNDER ]" delay={0.3} />
          </motion.p>
          <TextReveal>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-editorial uppercase tracking-tight leading-[0.95] mb-10 max-w-4xl">
              The theory didn't start in marketing.
            </h1>
          </TextReveal>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg max-w-xl leading-relaxed"
          >
            I spent years doing things that had nothing to do with websites or rankings. That turned out to be exactly the right preparation.
          </motion.p>
        </section>

        {/* ── JOURNEY TIMELINE ── */}
        <section className="py-20 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#A1A1AA]/40 mb-14">
              <ScrambleText text="[ THE LONG WAY ROUND ]" />
            </p>
            <div className="space-y-0">
              {JOURNEY.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                  className="grid grid-cols-12 gap-4 md:gap-8 py-8 border-b border-[#FAFAFA]/8 group"
                >
                  <div className="col-span-3 md:col-span-2">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#A1A1AA]/40 uppercase">{item.year}</span>
                  </div>
                  <div className="col-span-9 md:col-span-4">
                    <p className="text-sm font-bold text-[#FAFAFA]/80 group-hover:text-[#FAFAFA] transition-colors duration-300 uppercase tracking-[0.05em]">{item.role}</p>
                  </div>
                  <div className="col-span-12 md:col-span-6 md:pl-4">
                    <p className="text-sm text-[#A1A1AA]/50 leading-relaxed">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PIVOT SECTION ── */}
        <section className="py-24 px-6 md:px-12 bg-[#F5F0EB] text-[#09090B]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#09090B]/40 mb-6">
                <ScrambleText text="[ WHAT CLICKED ]" />
              </p>
              <TextReveal>
                <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight leading-tight mb-8 text-[#09090B]">
                  I've always been a numbers person who takes things apart.
                </h2>
              </TextReveal>
              <p className="text-sm leading-relaxed text-[#09090B]/60 max-w-md">
                Digital marketing turned out to be the perfect place for both of those instincts. The data side - reading signals, mapping structure, measuring what actually moves - felt familiar in a way I didn't expect.
              </p>
            </div>
            <div className="space-y-4">
              {[
                'Trained with small agencies. Trained with large ones.',
                'Self-studied the frameworks and edge cases most practitioners skip because they\'re not interesting enough.',
                'Fell in love with the whole process - not just the tactics but how the systems connect.',
                'Built a point of view: nothing beats a solid foundation.',
              ].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                  className="flex gap-4 items-start border-l-2 border-[#09090B]/15 pl-5 py-1"
                >
                  <p className="text-sm text-[#09090B]/65 leading-relaxed">{line}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-20 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#A1A1AA]/40 mb-12">
              <ScrambleText text="[ BY THE NUMBERS ]" />
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#FAFAFA]/8">
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  className="bg-[#09090B] px-8 py-10"
                >
                  <div className="text-4xl md:text-5xl font-display text-[#FAFAFA] mb-2">{s.value}</div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA]/40">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY ORGANIC THEORY ── */}
        <section className="py-24 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#A1A1AA]/40 mb-6">
                <ScrambleText text="[ WHY ORGANIC THEORY ]" />
              </p>
              <TextReveal>
                <h2 className="text-3xl md:text-4xl font-display uppercase tracking-tight leading-tight">
                  Everything I'd seen pointed to the same problem.
                </h2>
              </TextReveal>
            </div>
            <div className="lg:col-span-7 lg:pt-16 space-y-6">
              <p className="text-base leading-relaxed opacity-50">
                After all the jobs, the agency time, the self-study - the one thing that kept proving itself true is this: most businesses have a traffic problem that's actually a structure problem. They don't need more content. They need a better foundation.
              </p>
              <p className="text-base leading-relaxed opacity-50">
                Organic Theory exists to build that foundation. Search architecture that compounds over time, automation that removes the manual drag, and design that converts rather than just impresses.
              </p>
              <p className="text-base leading-relaxed opacity-50">
                The name is intentional. Organic - because sustainable growth beats borrowed traffic. Theory - because every engagement is built on a framework, not a feeling.
              </p>
              <div className="pt-4">
                <span className="text-2xl font-display tracking-[0.3em] text-[#FAFAFA]/30">O + X</span>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA]/30 mt-1">Foundation meets execution</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 px-6 md:px-12 bg-[#F5F0EB] text-[#09090B]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#09090B]/40 mb-4">
                <ScrambleText text="[ LET'S WORK TOGETHER ]" />
              </p>
              <TextReveal>
                <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight leading-tight max-w-lg text-[#09090B]">
                  Start with the<br />$400 audit.
                </h2>
              </TextReveal>
              <p className="text-sm opacity-50 mt-4 max-w-sm leading-relaxed">
                One hour. Your site, your data, a full diagnostic and a 30-day action plan. No fluff.
              </p>
            </div>
            <MagneticButton strength={0.5}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-4 group border border-[#09090B]/20 px-10 py-5 hover:bg-[#09090B] hover:text-[#FAFAFA] transition-all duration-300 text-[#09090B] shrink-0"
              >
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold group-hover:text-[#FAFAFA] transition-colors duration-300">Book the Audit</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </MagneticButton>
          </div>
        </section>

      </div>
    </>
  );
}
