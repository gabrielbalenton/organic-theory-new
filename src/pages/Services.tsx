import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { RevealSection } from '../components/RevealSection';
import { auditService, coreServices, ongoingServices } from '../data/servicesData';
import { TextReveal } from '../components/TextReveal';
import { ScrambleText } from '../components/ScrambleText';
import { MagneticButton } from '../components/MagneticButton';
import { ParallaxImage } from '../components/ParallaxImage';

const EASE = [0.22, 1, 0.36, 1] as const;

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-6 mb-10">
      <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#A1A1AA] shrink-0">
        <ScrambleText text={children} />
      </p>
      <div className="flex-1 h-px bg-[#FAFAFA]/10" />
    </div>
  );
}

function ServiceCard({ service, index }: { service: typeof coreServices[0]; index: number; key?: React.Key }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className="relative overflow-hidden border border-[#FAFAFA]/10 bg-[#FAFAFA]/[0.02] p-8 md:p-10 flex flex-col justify-between hover:border-[#FAFAFA]/25 hover:bg-[#FAFAFA]/[0.04] transition-all duration-500 group"
    >
      <span aria-hidden="true" className="absolute -top-6 -right-3 text-[160px] font-display leading-none text-[#FAFAFA] opacity-[0.025] select-none pointer-events-none">
        {service.id}
      </span>

      <div>
        <div className="mb-6">
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#A1A1AA] block mb-3">{service.id}</span>
          <h3 className="text-xl md:text-2xl font-display uppercase tracking-wider mb-4 leading-tight text-[#FAFAFA]">{service.name}</h3>
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold border border-[#FAFAFA]/15 px-3 py-1 inline-block text-[#A1A1AA]">
            {service.price}
          </span>
        </div>
        <p className="text-sm leading-relaxed opacity-50 mb-6">{service.descriptor}</p>
        <div className="w-8 h-px bg-[#FAFAFA]/15 mb-6" />
        <ul className="space-y-2.5 mb-10">
          {service.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3 text-sm opacity-60">
              <span className="text-[#A1A1AA] shrink-0 mt-px">-</span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <Link
        to="/contact"
        className="inline-flex items-center gap-4 group/btn border border-[#FAFAFA]/20 px-6 py-3 hover:bg-[#FAFAFA] hover:text-[#09090B] transition-all duration-300 self-start"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-bold">Initiate Brief</span>
        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
      </Link>
    </motion.div>
  );
}

export default function Services() {
  const schemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What does the Search & Systems Audit include?', acceptedAnswer: { '@type': 'Answer', text: 'The audit covers search visibility, site structure, speed, workflow gaps, and delivers a prioritized fix list with a 30-day action plan.' } },
      { '@type': 'Question', name: 'Do I need a retainer to work with Organic Theory?', acceptedAnswer: { '@type': 'Answer', text: 'No retainer required. You can start with the $400 audit, then commission individual builds as needed.' } },
      { '@type': 'Question', name: 'What is the difference between Search Architecture and AI Automation?', acceptedAnswer: { '@type': 'Answer', text: 'Search Architecture focuses on being found - keyword strategy, technical SEO, and content structure. AI Automation focuses on intelligence inside your workflow - AI agents, lead routing, and smart processing.' } },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Services & Pricing | Organic Theory</title>
        <meta name="description" content="Search architecture, AI automation, workflow engineering, and interface builds. Start with a $400 audit. No retainer required." />
        <meta property="og:title" content="Services & Pricing | Organic Theory" />
        <meta property="og:description" content="From a $400 audit to full system builds. Search, AI, workflow, and interface." />
        <meta property="og:url" content="https://organictheory.vercel.app/services" />
        <link rel="canonical" href="https://organictheory.vercel.app/services" />
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
      </Helmet>

      <div className="w-full min-h-screen bg-[#09090B] text-[#FAFAFA]">

        {/* Header with hero image */}
        <section className="pt-32 pb-0 px-0 overflow-hidden">
          <div className="px-6 md:px-12 max-w-7xl mx-auto pb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] text-[#A1A1AA] mb-6 font-bold tracking-[0.3em] uppercase"
            >
              <ScrambleText text="[ THE OFFER ]" delay={0.3} />
            </motion.p>
            <TextReveal>
              <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 font-display uppercase tracking-tight">
                What I build,<br />
                <span className="text-[#A1A1AA]">and what it costs.</span>
              </h1>
            </TextReveal>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm md:text-base leading-relaxed max-w-xl"
            >
              Start with an audit to see exactly what's leaking. Then build the layers that fix it. No retainer required to begin.
            </motion.p>
          </div>
          {/* Hero image full-width */}
          <div className="relative h-[40vh] md:h-[55vh] w-full overflow-hidden">
            <ParallaxImage
              src="/images/services-hero.png"
              alt="Services overview"
              className="absolute inset-0 w-full h-full"
              strength={10}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/60 via-transparent to-[#09090B]/80" />
          </div>
        </section>

        {/* START HERE */}
        <RevealSection className="py-20 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto">
            <SectionLabel>[ START HERE ]</SectionLabel>
            <div className="relative overflow-hidden border border-[#FAFAFA]/15 bg-[#FAFAFA]/[0.04] p-10 md:p-14 lg:p-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
                className="absolute top-8 right-8 w-44 h-44 opacity-[0.05] pointer-events-none"
              >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="42" stroke="#FAFAFA" strokeWidth="1" />
                  <path d="M20 20L80 80M80 20L20 80" stroke="#FAFAFA" strokeWidth="1" />
                </svg>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#A1A1AA] mb-8">[ SEARCH &amp; SYSTEMS AUDIT ]</p>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-display uppercase tracking-tight leading-tight mb-6">{auditService.name}</h2>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold border border-[#FAFAFA]/20 px-3 py-1 inline-block text-[#A1A1AA] mb-8">{auditService.price}</span>
                  <p className="text-sm md:text-base leading-relaxed opacity-50 max-w-sm">{auditService.descriptor}</p>
                </div>
                <div className="flex flex-col justify-between gap-10">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {auditService.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm opacity-60">
                        <span className="text-[#A1A1AA] shrink-0 mt-px">-</span>{b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-4 group border border-[#FAFAFA]/20 px-8 py-4 hover:bg-[#FAFAFA] transition-all duration-300 ease-out self-start"
                  >
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold group-hover:text-[#09090B] transition-colors duration-300">Book the Audit</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 group-hover:text-[#09090B] transition-all duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* CORE BUILDS */}
        <RevealSection className="py-20 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto">
            <SectionLabel>[ CORE BUILDS - ONE-TIME ]</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coreServices.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
            </div>
          </div>
        </RevealSection>

        {/* ONGOING */}
        <RevealSection className="py-20 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto">
            <SectionLabel>[ ONGOING - MONTHLY ]</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ongoingServices.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
            </div>
          </div>
        </RevealSection>

      </div>
    </>
  );
}
