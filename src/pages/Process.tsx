import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { ScrambleText } from '../components/ScrambleText';
import { KineticTextReveal } from '../components/ui/kinetic-text-reveal';
import { ScrollChoreography } from '../components/ui/scroll-choreography';
import { DitherGradient } from '../components/ui/dither-gradient';

const STEPS = [
  {
    number: '01',
    phase: 'Discovery',
    title: 'Understand the system before touching it.',
    duration: '1–2 days',
    description: 'Every engagement starts with structured discovery. I map the current stack, how data moves, what gets done manually, and where the friction actually lives. No template gets applied before the problem is understood.',
    deliverables: ['Current-state audit document', 'Stack mapping', 'Priority problem list', 'Scope definition'],
  },
  {
    number: '02',
    phase: 'Audit',
    title: 'Diagnose before prescribing.',
    duration: '2–5 days',
    description: 'The Search & Systems Audit covers technical SEO, Core Web Vitals, content structure, search visibility, workflow gaps, and automation opportunities. The output is a prioritized 30-day action plan tied to your actual situation.',
    deliverables: ['Crawl analysis', 'Core Web Vitals assessment', 'Visibility & keyword gap report', 'Workflow friction map', '30-day action plan'],
  },
  {
    number: '03',
    phase: 'Architecture',
    title: 'Design the system on paper before building it.',
    duration: '3–7 days',
    description: 'Search builds get keyword clusters, content hierarchies, internal linking and page templates. Automation gets triggers, conditions and action paths. The architecture phase removes uncertainty before expensive execution begins.',
    deliverables: ['Architecture map', 'Keyword clusters', 'Automation flow', 'Tech decisions', 'Milestones'],
  },
  {
    number: '04',
    phase: 'Build',
    title: 'Build precisely. No scope creep.',
    duration: '1–8 weeks',
    description: 'The approved architecture becomes the build. Search pages, schema, automations, APIs, interface work and QA are handled against a defined scope so the project stays understandable and accountable.',
    deliverables: ['Scoped build', 'Testing documentation', 'QA sign-off', 'Staging review'],
  },
  {
    number: '05',
    phase: 'Launch',
    title: 'Deploy with a checklist, not a prayer.',
    duration: '1–2 days',
    description: 'Redirects, canonicals, sitemaps, Search Console, live workflow paths, accessibility, performance and analytics are verified before the switch is treated as complete.',
    deliverables: ['Launch checklist', 'Analytics verification', 'Monitoring setup', 'Handover documentation'],
  },
  {
    number: '06',
    phase: 'Measure & Iterate',
    title: 'Track what matters. Adjust what doesn’t.',
    duration: 'Ongoing',
    description: 'The work is measured against the outcome it was designed for. Search visibility, workflow success rates, conversion signals and technical health determine the next move instead of arbitrary activity.',
    deliverables: ['Performance reporting', 'Automation health checks', 'Visibility tracking', 'Strategy review'],
  },
];

const FAQS = [
  { q: 'Do I have to start with the audit?', a: 'Not always. If you have a clear brief and we have spoken, we can go straight to the build. The audit is the right starting point when the real problem is still unclear.' },
  { q: 'How long does a typical engagement take?', a: 'A search architecture build is commonly 4–8 weeks. Automation is usually 2–3 weeks. Interface builds depend on scope and can range from a few weeks to several months.' },
  { q: 'Do you work with agencies or direct clients?', a: 'Both. I work directly with brands and also support agencies that need specialist strategy or delivery.' },
  { q: 'What if scope changes during the build?', a: 'Scope changes are documented and agreed before they are actioned. Nothing is quietly added to the project.' },
  { q: 'Can I hire you for strategy without execution?', a: 'Yes. Strategy-only work is useful when an internal team can execute but needs the architecture designed first.' },
  { q: 'Is there a minimum engagement size?', a: 'The $400 audit is the practical entry point. Most implementation projects start around $1,500 and scale with complexity.' },
];

export default function Process() {
  const choreographySteps = STEPS.map(step => ({
    number: step.number,
    title: `${step.phase}. ${step.title}`,
    description: step.description,
    detail: `${step.duration} · ${step.deliverables.join(' · ')}`,
  }));

  return (
    <>
      <Helmet>
        <title>How It Works | The Process | Organic Theory</title>
        <meta name="description" content="Discovery, audit, architecture, build, launch, measure. Six phases from first conversation to live system. No guesswork, no scope creep." />
        <meta property="og:site_name" content="Organic Theory" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://organic-theory.vercel.app/process" />
        <meta property="og:title" content="How It Works | The Process | Organic Theory" />
        <meta property="og:description" content="Six phases from first conversation to live system. Discovery, audit, architecture, build, launch, measure. No guesswork, no scope creep." />
        <link rel="canonical" href="https://organic-theory.vercel.app/process" />
      </Helmet>

      <main className="min-h-screen bg-[#FAF9F4] text-[#2F3A45]">
        <header className="px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-36">
          <div className="mx-auto max-w-7xl">
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="ot-eyebrow mb-6">
              <ScrambleText text="[ HOW IT WORKS ]" delay={0.25} />
            </motion.p>
            <KineticTextReveal
              text="Six phases. No surprises."
              splitBy="words"
              stagger={0.045}
              distance={20}
              className="max-w-[12ch] font-editorial text-5xl leading-[0.96] tracking-[-0.045em] md:text-7xl lg:text-8xl"
            />
            <p className="mt-8 max-w-2xl text-sm leading-7 text-[#2F3A45]/64 md:text-base">
              From first conversation to live system, the sequence stays consistent: understand, diagnose, architect, build, launch, measure. The scope changes. The discipline does not.
            </p>
          </div>
        </header>

        <div className="border-y border-[#2F3A45]/10">
          <ScrollChoreography steps={choreographySteps} />
        </div>

        <section className="px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
              <div>
                <p className="ot-eyebrow mb-5">[ COMMON QUESTIONS ]</p>
                <h2 className="max-w-[9ch] font-editorial text-4xl leading-none tracking-[-0.035em] md:text-6xl">The practical bits.</h2>
              </div>
              <div className="grid gap-x-10 md:grid-cols-2">
                {FAQS.map((item, index) => (
                  <motion.div
                    key={item.q}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.2) }}
                    className="border-t border-[#2F3A45]/10 py-6"
                  >
                    <h3 className="text-sm font-bold leading-6 text-[#2F3A45]">{item.q}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#2F3A45]/58">{item.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <DitherGradient className="border-t border-[#2F3A45]/10 px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="ot-eyebrow mb-5">[ START PHASE 01 ]</p>
              <h2 className="max-w-[10ch] font-editorial text-5xl leading-[0.98] tracking-[-0.04em] md:text-7xl">Ready to start the process?</h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-[#2F3A45]/62">Book the audit and the first phase becomes concrete immediately.</p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <Link to="/contact" className="ot-primary-button inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">
                Book the audit · $400 <ArrowRight size={13} />
              </Link>
              <Link to="/services" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2F3A45]/52 hover:text-[#2F3A45]">View all services →</Link>
            </div>
          </div>
        </DitherGradient>
      </main>
    </>
  );
}
