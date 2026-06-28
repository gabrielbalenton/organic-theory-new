import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { TextReveal } from '../components/TextReveal';
import { ScrambleText } from '../components/ScrambleText';
import { MagneticButton } from '../components/MagneticButton';

const EASE = [0.22, 1, 0.36, 1] as const;

const PATHS = [
  {
    number: '01',
    heading: 'My site isn\'t performing.',
    detail: 'Rankings are flat. Traffic isn\'t converting. You\'re not sure what\'s broken — or you suspect everything is fine but the results say otherwise. Start with a full diagnostic before spending another dollar on content or ads.',
    cta: 'Book the $400 Audit',
    to: '/contact',
    accent: true,
  },
  {
    number: '02',
    heading: 'I want to learn to do it myself.',
    detail: 'You\'d rather understand the system than pay someone to run it. The courses cover technical SEO, automation, AEO, web design, email, CRM, and more — built from real client work, not theory.',
    cta: 'Browse Courses',
    to: '/courses',
    accent: false,
  },
  {
    number: '03',
    heading: 'I\'m not sure what I need yet.',
    detail: 'Run the free mini audit first. Drop your URL and get an instant snapshot of your SEO and performance scores — no email required. It\'ll tell you whether there\'s a real problem worth solving.',
    cta: 'Run the Free Audit',
    to: '/tools',
    accent: false,
  },
  {
    number: '04',
    heading: 'Show me the results first.',
    detail: 'Fair. Four case studies — real clients, real numbers, real builds. Search visibility from 0 to 63%, Lighthouse SEO score of 100, 1,281 pages deployed. See what the work actually looks like.',
    cta: 'View Case Studies',
    to: '/case-studies',
    accent: false,
  },
];

export default function Start() {
  return (
    <>
      <Helmet>
        <title>Where to Start | Organic Theory</title>
        <meta name="description" content="Not sure where to begin? Four paths depending on where you are — book an audit, take a course, run the free tool, or see the case studies first." />
        <link rel="canonical" href="https://organic-theory.vercel.app/start" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#09090B] text-[#FAFAFA]">

        {/* Hero */}
        <section className="pt-40 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] text-[#A1A1AA] mb-8 font-bold tracking-[0.3em] uppercase"
          >
            <ScrambleText text="[ START HERE ]" delay={0.3} />
          </motion.p>
          <TextReveal>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-editorial uppercase tracking-tight leading-[0.95] mb-8 max-w-3xl">
              Where do you want to start?
            </h1>
          </TextReveal>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base max-w-md leading-relaxed"
          >
            Pick the one that sounds most like you.
          </motion.p>
        </section>

        {/* Paths */}
        <section className="border-t border-[#FAFAFA]/10 max-w-7xl mx-auto px-6 md:px-12">
          {PATHS.map((path, i) => (
            <motion.div
              key={path.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className={`grid grid-cols-1 md:grid-cols-12 gap-8 py-14 border-b border-[#FAFAFA]/10 group ${path.accent ? 'bg-[#FAFAFA]/[0.02]' : ''}`}
            >
              {/* Number */}
              <div className="md:col-span-1">
                <span className="text-4xl font-display text-[#FAFAFA]/10 leading-none">{path.number}</span>
              </div>

              {/* Content */}
              <div className="md:col-span-7">
                <h2 className="text-xl md:text-2xl font-display uppercase tracking-wide mb-4 leading-snug">
                  {path.heading}
                </h2>
                <p className="text-sm leading-relaxed opacity-50 max-w-xl">{path.detail}</p>
              </div>

              {/* CTA */}
              <div className="md:col-span-4 flex items-center md:justify-end">
                <MagneticButton strength={0.4}>
                  <Link
                    to={path.to}
                    className={`inline-flex items-center gap-4 group/btn px-8 py-4 text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-300 ${
                      path.accent
                        ? 'bg-[#FAFAFA] text-[#09090B] hover:bg-[#A1A1AA]'
                        : 'border border-[#FAFAFA]/20 text-[#FAFAFA] hover:bg-[#FAFAFA]/5'
                    }`}
                  >
                    {path.cta}
                    <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Footer note */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-sm text-[#A1A1AA]/40 max-w-md leading-relaxed"
          >
            Still not sure? The free audit takes 30 seconds and costs nothing. It's the lowest-risk place to start.
          </motion.p>
        </section>

      </div>
    </>
  );
}
