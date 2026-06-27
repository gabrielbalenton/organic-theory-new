import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { TextReveal, TextRevealLines } from '../components/TextReveal';
import { ScrambleText } from '../components/ScrambleText';
import { MagneticButton } from '../components/MagneticButton';

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    number: '01',
    phase: 'Discovery',
    title: 'Understand the system before touching it.',
    duration: '1–2 days',
    description: 'Every engagement starts with a structured discovery. I map your current digital stack - what tools you use, how data flows between them, what your team does manually, and where the friction lives. I review your analytics, crawl your site, and document what I find. No assumptions, no templates applied before I understand the problem.',
    deliverables: ['Current-state audit document', 'Stack mapping (tools, integrations, gaps)', 'Priority problem list', 'Scope definition for the build'],
  },
  {
    number: '02',
    phase: 'Audit',
    title: 'Diagnose before prescribing.',
    duration: '2–5 days',
    description: 'The $400 Search & Systems Audit is often where most engagements begin. It covers technical SEO, Core Web Vitals, content structure, search visibility, workflow gaps, and automation opportunities. The output is a prioritized fix list with a 30-day action plan - not a report full of generic recommendations, but a specific roadmap tied to your situation.',
    deliverables: ['Full Screaming Frog crawl analysis', 'Core Web Vitals assessment', 'Search visibility & keyword gap report', 'Workflow friction map', '30-day prioritized action plan'],
  },
  {
    number: '03',
    phase: 'Architecture',
    title: 'Design the system on paper before building it.',
    duration: '3–7 days',
    description: 'Before any code or content is written, I architect the solution. For search builds, this means keyword clustering, content hierarchies, internal linking strategy, and page templates. For automation, it means mapping every trigger, condition, and action path across tools. This phase prevents expensive rebuilds later and aligns the build with the outcome we\'re targeting.',
    deliverables: ['Content architecture map', 'Keyword cluster document', 'Automation flow diagram', 'Tech stack decisions with rationale', 'Build timeline and milestones'],
  },
  {
    number: '04',
    phase: 'Build',
    title: 'Build precisely. No scope creep.',
    duration: '1–8 weeks',
    description: 'The build phase executes the architecture. Search builds involve creating or restructuring pages, implementing schema, optimising technical elements, and building out content. Automation builds involve creating workflows in Make, n8n, or Zapier, connecting APIs, and testing every path. Interface builds involve design and development in Webflow, Framer, or code. The scope is fixed - what was agreed is what gets built.',
    deliverables: ['All deliverables scoped in the architecture phase', 'Testing documentation', 'QA checklist sign-off', 'Staging environment review'],
  },
  {
    number: '05',
    phase: 'Launch',
    title: 'Deploy with a checklist, not a prayer.',
    duration: '1–2 days',
    description: 'Launch day follows a documented checklist. For search builds: redirect mapping, canonical verification, sitemap submission, Search Console validation. For automation builds: live environment testing across all paths, edge case verification, error alert setup. For interface builds: performance testing, cross-browser QA, accessibility check, analytics verification. Nothing goes live until it\'s checked.',
    deliverables: ['Launch checklist completion record', 'Analytics tracking verification', 'Search Console / monitoring setup', 'Handover documentation'],
  },
  {
    number: '06',
    phase: 'Measure & Iterate',
    title: 'Track what matters. Adjust what doesn\'t.',
    duration: 'Ongoing',
    description: 'The month after launch is where most agencies disappear. I stay in. For ongoing retainers, this phase involves monthly reporting on the metrics that matter for the specific build - Search Console data, automation success rates, CWV scores, organic traffic trends. For one-time builds, I provide a 30-day check-in report with performance data and any recommended adjustments.',
    deliverables: ['Monthly Looker Studio report', 'Automation health checks', 'Search visibility tracking', 'Quarterly strategy review (retainer clients)'],
  },
];

export default function Process() {
  return (
    <>
      <Helmet>
        <title>How It Works | The Process | Organic Theory</title>
        <meta name="description" content="Discovery, audit, architecture, build, launch, measure. Six phases from first conversation to live system. No guesswork, no scope creep." />
        <link rel="canonical" href="https://organictheory.vercel.app/process" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#09090B] text-[#FAFAFA]">

        {/* Header */}
        <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-[10px] text-[#A1A1AA] mb-6 font-bold tracking-[0.3em] uppercase"
          >
            <ScrambleText text="[ HOW IT WORKS ]" delay={0.3} />
          </motion.p>
          <TextRevealLines
            lines={['Six phases.', 'No surprises.']}
            className="text-4xl md:text-6xl lg:text-7xl leading-[1.0] font-display uppercase tracking-tight"
            staggerDelay={0.12}
          />
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm md:text-base max-w-lg leading-relaxed mt-6"
          >
            From first conversation to live system. Every engagement follows the same architecture - discover, audit, design, build, launch, measure. What changes is the scope and the specific tools.
          </motion.p>
        </section>

        {/* Steps */}
        <div className="border-t border-[#FAFAFA]/10 max-w-7xl mx-auto px-6 md:px-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-16 md:py-20 border-b border-[#FAFAFA]/10 group"
            >
              {/* Number + phase */}
              <div className="lg:col-span-2 flex flex-row lg:flex-col items-start gap-4 lg:gap-2">
                <span className="text-5xl font-display text-[#A1A1AA]/20 leading-none">{step.number}</span>
                <div className="lg:mt-2">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#A1A1AA]">{step.phase}</span>
                  <br />
                  <span className="text-[10px] tracking-[0.15em] uppercase opacity-30 mt-1 block">{step.duration}</span>
                </div>
              </div>

              {/* Main content */}
              <div className="lg:col-span-6">
                <TextReveal>
                  <h2 className="text-xl md:text-2xl font-display uppercase tracking-wide leading-tight mb-5">{step.title}</h2>
                </TextReveal>
                <p className="text-sm leading-[1.8] opacity-50">{step.description}</p>
              </div>

              {/* Deliverables */}
              <div className="lg:col-span-4 lg:pl-8">
                <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#A1A1AA] mb-4">Deliverables</p>
                <ul className="space-y-2.5">
                  {step.deliverables.map((d, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + j * 0.06, ease: EASE }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="text-[#A1A1AA] shrink-0 mt-px">-</span>
                      <span className="opacity-50">{d}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ strip */}
        <section className="border-t border-[#FAFAFA]/10 py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#A1A1AA] mb-8">
                <ScrambleText text="[ COMMON QUESTIONS ]" />
              </p>
              {[
                { q: 'Do I have to start with the audit?', a: 'Not always. If you have a clear brief and we\'ve spoken, we can go straight to the build. The audit is the right starting point when you\'re not sure what the problem is.' },
                { q: 'How long does a typical engagement take?', a: 'A search architecture build runs 4–8 weeks. An automation build is usually 2–3 weeks. Interface builds depend on scope - from 3 weeks to 3 months for a full site.' },
                { q: 'Do you work with agencies or just direct clients?', a: 'Both. I white-label for agencies who need specialist delivery, and I work directly with brands who want the strategy and the build in one place.' },
              ].map(({ q, a }) => (
                <div key={q} className="mb-8">
                  <h3 className="text-sm font-bold mb-2">{q}</h3>
                  <p className="text-sm opacity-40 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-between">
              {[
                { q: 'What if the scope changes during the build?', a: 'Scope changes are documented and agreed before they\'re actioned. Nothing is added to a build without a written change order. This protects both parties.' },
                { q: 'Can I just hire you for strategy without execution?', a: 'Yes. Strategy-only engagements work well for in-house teams who can execute but need the architecture designed. Priced per project.' },
                { q: 'Is there a minimum engagement size?', a: 'The $400 audit is the starting point. There\'s no minimum beyond that - but most builds start at $1,500 and scale from there.' },
              ].map(({ q, a }) => (
                <div key={q} className="mb-8">
                  <h3 className="text-sm font-bold mb-2">{q}</h3>
                  <p className="text-sm opacity-40 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#F5F0EB] text-[#09090B] py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#09090B]/40 mb-4">
                <ScrambleText text="[ START PHASE 01 ]" />
              </p>
              <TextReveal>
                <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight leading-tight max-w-lg text-[#09090B]">
                  Ready to start<br />the process?
                </h2>
              </TextReveal>
              <p className="text-sm opacity-50 mt-4 max-w-sm leading-relaxed">
                Book the $400 audit and we begin Phase 01 immediately.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <MagneticButton>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-4 group border border-[#09090B]/20 px-10 py-5 hover:bg-[#09090B] hover:text-[#FAFAFA] transition-all duration-300 text-[#09090B]"
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold group-hover:text-[#FAFAFA] transition-colors duration-300">Book the Audit - $400</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              </MagneticButton>
              <Link to="/services" className="text-[10px] tracking-[0.2em] uppercase font-bold opacity-40 hover:opacity-70 transition-opacity text-center">
                View all services →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
