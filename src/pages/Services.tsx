import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { RevealSection } from '../components/RevealSection';
import { auditService, coreServices, ongoingServices } from '../data/servicesData';

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-6 mb-10">
      <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#71717A] shrink-0">{children}</p>
      <div className="flex-1 h-px bg-[#09090B]/10" />
    </div>
  );
}

function ServiceCard({ service }: { service: typeof coreServices[0] }) {
  return (
    <div className="relative overflow-hidden border border-[#09090B]/10 bg-white p-8 md:p-10 flex flex-col justify-between hover:border-[#09090B]/30 transition-colors duration-500 group">
      <span
        aria-hidden="true"
        className="absolute -top-6 -right-3 text-[160px] font-display leading-none text-[#09090B] opacity-[0.03] select-none pointer-events-none"
      >
        {service.id}
      </span>

      <div>
        <div className="mb-6">
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#71717A] block mb-3">{service.id}</span>
          <h3 className="text-xl md:text-2xl font-display uppercase tracking-wider mb-4 leading-tight">{service.name}</h3>
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold border border-[#09090B]/15 px-3 py-1 inline-block text-[#71717A]">
            {service.price}
          </span>
        </div>

        <p className="text-sm leading-relaxed opacity-60 mb-6">{service.descriptor}</p>

        <div className="w-8 h-px bg-[#09090B]/15 mb-6" />

        <ul className="space-y-2.5 mb-10">
          {service.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3 text-sm opacity-70">
              <span className="text-[#09090B] opacity-30 shrink-0 mt-px">—</span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <Link
        to="/contact"
        className="inline-flex items-center gap-4 group/btn border border-[#09090B]/20 px-6 py-3 hover:bg-[#09090B] hover:text-[#FAFAFA] transition-all duration-300 self-start"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-bold">Initiate Brief</span>
        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>
  );
}

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services & Pricing | Organic Theory</title>
        <meta name="description" content="Search architecture, AI automation, workflow engineering, and interface builds. Start with a $400 audit. No retainer required." />
        <link rel="canonical" href="https://organictheory.vercel.app/services" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#F4F4F5] text-[#09090B]">

        {/* Header */}
        <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] text-[#71717A] mb-6 font-bold tracking-[0.3em] uppercase">[ THE OFFER ]</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 font-display uppercase tracking-tight">
              What I build,<br />
              <span className="text-[#71717A]">and what it costs.</span>
            </h1>
            <p className="text-sm md:text-base leading-relaxed opacity-60 max-w-xl">
              Start with an audit to see exactly what's leaking. Then build the layers that fix it. No retainer required to begin.
            </p>
          </motion.div>
        </section>

        {/* START HERE — Audit */}
        <RevealSection className="py-20 px-6 md:px-12 border-t border-[#09090B]/10">
          <div className="max-w-7xl mx-auto">
            <SectionLabel>[ START HERE ]</SectionLabel>

            <div className="relative overflow-hidden bg-[#09090B] text-[#FAFAFA] p-10 md:p-14 lg:p-16">
              {/* Rotating brand mark */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
                className="absolute top-8 right-8 w-44 h-44 opacity-[0.06] pointer-events-none"
              >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="42" stroke="#FAFAFA" strokeWidth="1" />
                  <path d="M20 20L80 80M80 20L20 80" stroke="#FAFAFA" strokeWidth="1" />
                </svg>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">
                {/* Left col */}
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#A1A1AA] mb-8">
                    [ SEARCH &amp; SYSTEMS AUDIT ]
                  </p>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-display uppercase tracking-tight leading-tight mb-6">
                    {auditService.name}
                  </h2>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold border border-[#FAFAFA]/20 px-3 py-1 inline-block text-[#A1A1AA] mb-8">
                    {auditService.price}
                  </span>
                  <p className="text-sm md:text-base leading-relaxed opacity-60 max-w-sm">
                    {auditService.descriptor}
                  </p>
                </div>

                {/* Right col */}
                <div className="flex flex-col justify-between gap-10">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {auditService.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm opacity-70">
                        <span className="text-[#A1A1AA] shrink-0 mt-px">—</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-4 group border border-[#FAFAFA]/20 px-8 py-4 hover:bg-[#FAFAFA] transition-all duration-300 ease-out self-start"
                  >
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold group-hover:text-[#09090B] transition-colors duration-300">
                      Book the Audit
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-[#FAFAFA] group-hover:translate-x-1 group-hover:text-[#09090B] transition-all duration-300"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* CORE BUILDS */}
        <RevealSection className="py-20 px-6 md:px-12 border-t border-[#09090B]/10">
          <div className="max-w-7xl mx-auto">
            <SectionLabel>[ CORE BUILDS — ONE-TIME ]</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coreServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </RevealSection>

        {/* ONGOING */}
        <RevealSection className="py-20 px-6 md:px-12 border-t border-[#09090B]/10">
          <div className="max-w-7xl mx-auto">
            <SectionLabel>[ ONGOING — MONTHLY ]</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ongoingServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </RevealSection>

      </div>
    </>
  );
}
