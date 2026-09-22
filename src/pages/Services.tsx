import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { auditService, coreServices, ongoingServices } from '../data/servicesData';
import { ScrambleText } from '../components/ScrambleText';
import { KineticTextReveal } from '../components/ui/kinetic-text-reveal';
import { ServicesScrollChoreography } from '../components/ui/services-scroll-choreography';
import { DitherGradient } from '../components/ui/dither-gradient';

const EASE = [0.22, 1, 0.36, 1] as const;

const SERVICES_CHOREOGRAPHY_IMAGES = {
  topLeft: '/images/services-choreography/traffic.svg',
  topRight: '/images/services-choreography/infrastructure.svg',
  bottomLeft: '/images/services-choreography/capture.svg',
  bottomRight: '/images/services-choreography/conversion.svg',
  hero: '/images/services-choreography/modular-by-design.svg',
};

function OfferCard({ service, index }: { service: typeof coreServices[0]; index: number }) {
  const accent = index % 3 === 1 ? '#8FA897' : index % 3 === 0 ? '#8DA5B7' : '#B7AFA6';
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.24), ease: EASE }}
      className="group flex h-full flex-col rounded-[22px] border border-[#2F3A45]/10 bg-[#E8E2DB]/65 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#2F3A45]/18 hover:bg-[#E8E2DB] hover:shadow-[0_18px_45px_rgba(47,58,69,0.08)] md:p-9"
    >
      <div className="flex items-center justify-between gap-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#2F3A45]/42">{service.id}</span>
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
      </div>
      <h3 className="mt-12 font-editorial text-3xl leading-[1.02] tracking-[-0.025em] text-[#2F3A45]">{service.name}</h3>
      <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2F3A45]/54">{service.price}</p>
      <p className="mt-6 text-sm leading-7 text-[#2F3A45]/66">{service.descriptor}</p>
      <div className="mt-8 border-t border-[#2F3A45]/10 pt-6">
        <ul className="space-y-3">
          {service.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3 text-sm leading-6 text-[#2F3A45]/62">
              <Check size={13} className="mt-1 shrink-0 text-[#8FA897]" strokeWidth={2} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/contact" className="mt-9 inline-flex items-center gap-3 self-start border-b border-[#2F3A45]/25 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2F3A45] transition-colors hover:border-[#8DA5B7]">
        Start a brief <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </motion.article>
  );
}

export default function Services() {
  const schemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What does the Search & Systems Audit include?', acceptedAnswer: { '@type': 'Answer', text: 'The audit covers search visibility, site structure, speed, workflow gaps, and delivers a prioritized fix list with a 30-day action plan.' } },
      { '@type': 'Question', name: 'Do I need to commit to a monthly plan?', acceptedAnswer: { '@type': 'Answer', text: 'No monthly commitment required. Start with the $400 audit, then choose which projects to commission. You only pay for the work you want done.' } },
      { '@type': 'Question', name: 'What is the difference between Search Architecture and AI Automation?', acceptedAnswer: { '@type': 'Answer', text: 'Search Architecture focuses on being found - keyword strategy, technical SEO, and content structure. AI Automation focuses on intelligence inside your workflow - AI agents, lead routing, and smart processing.' } },
      { '@type': 'Question', name: 'What is the difference between Interface Design and Full-Stack Development?', acceptedAnswer: { '@type': 'Answer', text: 'Interface Design and Development is for public websites, landing pages, CMS builds, and front-end experiences. Full-Stack Development is for applications that also require databases, authentication, permissions, business logic, APIs, and operational workflows.' } },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Services & Pricing | Organic Theory</title>
        <meta name="description" content="Search architecture, AI automation, workflow engineering, interface builds, and full-stack development. Start with a $400 audit. No retainer required." />
        <meta property="og:site_name" content="Organic Theory" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://organic-theory.vercel.app/services" />
        <meta property="og:title" content="Services & Pricing | Organic Theory" />
        <meta property="og:description" content="From a $400 audit to full-stack product builds. Search, AI, workflow, interface, and custom software. No retainer required." />
        <link rel="canonical" href="https://organic-theory.vercel.app/services" />
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
      </Helmet>

      <main className="min-h-screen bg-[#FAF9F4] text-[#2F3A45]">
        <header className="px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-36">
          <div className="mx-auto max-w-7xl">
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="ot-eyebrow mb-6">
              <ScrambleText text="[ THE OFFER ]" delay={0.25} />
            </motion.p>
            <KineticTextReveal
              text="What I build, and what it costs."
              splitBy="words"
              stagger={0.04}
              distance={20}
              className="max-w-[13ch] font-editorial text-5xl leading-[0.96] tracking-[-0.045em] md:text-7xl lg:text-8xl"
            />
            <p className="mt-8 max-w-2xl text-sm leading-7 text-[#2F3A45]/64 md:text-base">
              Start with a diagnostic, then commission only the work that earns its place. No padded retainer, no forced package, no visual noise around the decision.
            </p>
          </div>
        </header>

        <section className="border-y border-[#2F3A45]/10 bg-[#E8E2DB]/42 px-6 py-16 md:px-12 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="ot-eyebrow mb-5">[ START HERE ]</p>
              <h2 className="max-w-[10ch] font-editorial text-4xl leading-none tracking-[-0.035em] md:text-6xl">A clear first step.</h2>
            </div>
            <div className="rounded-[24px] border border-[#2F3A45]/10 bg-[#FAF9F4] p-7 shadow-[0_18px_45px_rgba(47,58,69,0.06)] md:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8DA5B7]">Search & Systems Audit</p>
                  <h3 className="mt-3 font-editorial text-3xl text-[#2F3A45] md:text-4xl">{auditService.name}</h3>
                </div>
                <span className="rounded-full border border-[#2F3A45]/12 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2F3A45]/62">{auditService.price}</span>
              </div>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#2F3A45]/66">{auditService.descriptor}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {auditService.bullets.map((bullet, i) => <div key={i} className="flex items-start gap-3 text-sm text-[#2F3A45]/62"><Check size={13} className="mt-1 shrink-0 text-[#8FA897]" />{bullet}</div>)}
              </div>
              <Link to="/contact" className="ot-primary-button mt-9 inline-flex items-center gap-3 rounded-full px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">
                Book the audit <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-[#2F3A45]/10 bg-[#FAF9F4] px-6 pb-10 pt-24 md:px-12 md:pb-14 md:pt-28">
          <div className="mx-auto max-w-7xl">
            <p className="ot-eyebrow mb-5">[ WHAT I BUILD ]</p>
            <h2 className="max-w-[12ch] font-editorial text-5xl leading-[0.96] tracking-[-0.04em] text-[#2F3A45] md:text-7xl">
              One system. Several layers.
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#2F3A45]/62 md:text-base">
              Search, automation, interfaces, and full-stack products should reinforce each other. The four growth layers stay intact; custom software becomes available when the business needs more than a website or off-the-shelf tool.
            </p>
          </div>
        </section>

        <ServicesScrollChoreography
          className="bg-[#FAF9F4]"
          images={SERVICES_CHOREOGRAPHY_IMAGES}
        />

        <section className="border-t border-[#2F3A45]/10 px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="ot-eyebrow mb-4">[ CORE BUILDS ]</p>
                <h2 className="font-editorial text-4xl tracking-[-0.03em] md:text-6xl">Choose the layer that matters.</h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-[#2F3A45]/58">Each engagement is scoped around the work itself. These are starting points, not rigid packages.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {coreServices.map((service, index) => <OfferCard key={service.id} service={service} index={index} />)}
            </div>
          </div>
        </section>

        <section className="border-t border-[#2F3A45]/10 bg-[#E8E2DB]/45 px-6 py-20 md:px-12 md:py-24">
          <div className="mx-auto max-w-7xl">
            <p className="ot-eyebrow mb-4">[ ONGOING ]</p>
            <div className="grid gap-4 md:grid-cols-2">
              {ongoingServices.map((service, index) => <OfferCard key={service.id} service={service as typeof coreServices[0]} index={index + 5} />)}
            </div>
          </div>
        </section>

        <DitherGradient className="border-t border-[#2F3A45]/10 px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-5xl text-center">
            <p className="ot-eyebrow mb-5">[ NEXT STEP ]</p>
            <h2 className="font-editorial text-5xl leading-[0.98] tracking-[-0.04em] md:text-7xl">Start with clarity, then decide what deserves to be built.</h2>
            <Link to="/contact" className="ot-primary-button mt-9 inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">
              Start a conversation <ArrowRight size={13} />
            </Link>
          </div>
        </DitherGradient>
      </main>
    </>
  );
}
