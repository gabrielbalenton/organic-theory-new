import { ArrowRight, ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { RevealSection } from './RevealSection';
import type { CaseStudy } from '../data/caseStudyData';

export function CaseStudyLayout({ study }: { study: CaseStudy }) {
  return (
    <>
      <Helmet>
        <title>{study.seo.title}</title>
        <meta name="description" content={study.seo.description} />
        <meta property="og:title" content={study.seo.title} />
        <meta property="og:description" content={study.seo.description} />
        <meta property="og:url" content={study.seo.canonical} />
        {study.coverImage ? <meta property="og:image" content={`https://organic-theory.vercel.app${study.coverImage}`} /> : null}
        <link rel="canonical" href={study.seo.canonical} />
      </Helmet>

      <div className="w-full min-h-screen bg-[#09090B] text-[#FAFAFA]">
        <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] text-[#A1A1AA] mb-6 font-bold tracking-[0.3em] uppercase">
              [ {study.label} ]
            </p>
            <p className="text-sm md:text-base opacity-60 mb-4 uppercase tracking-widest font-bold">
              {study.client}
            </p>
            <p className="text-base md:text-lg opacity-50 mb-10 max-w-2xl leading-relaxed">
              {study.context}
            </p>
            {study.headline && (
              <h1 className="text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-display uppercase tracking-tight max-w-5xl">
                {study.headline}
              </h1>
            )}
          </motion.div>

          {study.metrics?.length ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-12 grid grid-cols-2 gap-px border border-[#FAFAFA]/10 bg-[#FAFAFA]/10 md:grid-cols-4 lg:grid-cols-5"
            >
              {study.metrics.map(metric => (
                <div key={`${metric.value}-${metric.label}`} className="bg-[#09090B] px-5 py-6 md:px-6">
                  <p className="font-display text-2xl md:text-3xl">{metric.value}</p>
                  <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#A1A1AA]/65">{metric.label}</p>
                </div>
              ))}
            </motion.div>
          ) : null}

          {study.stack?.length ? (
            <div className="mt-7 flex flex-wrap gap-2">
              {study.stack.map(item => (
                <span key={item} className="rounded-full border border-[#FAFAFA]/12 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#FAFAFA]/55">
                  {item}
                </span>
              ))}
            </div>
          ) : null}

          {study.coverImage ? (
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-12 overflow-hidden rounded-[22px] border border-[#FAFAFA]/10 bg-[#FAFAFA]/[0.03]"
            >
              <img
                src={study.coverImage}
                alt={study.coverAlt || ''}
                className="h-auto w-full"
              />
            </motion.div>
          ) : null}
        </section>

        {study.sections.map((section) => (
          <div key={section.title}>
            <RevealSection className="py-16 px-6 md:px-12 border-t border-[#FAFAFA]/10">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                <div className="lg:col-span-3">
                  <p className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#A1A1AA] pt-1">
                    {section.title}
                  </p>
                </div>
                <div className="lg:col-span-9">
                  {section.body && (
                    <p className="text-sm md:text-base leading-relaxed opacity-70 max-w-3xl">
                      {section.body}
                    </p>
                  )}
                  {section.items && (
                    <ul className="space-y-5 max-w-3xl">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex gap-4">
                          <span className="text-[#A1A1AA] text-[10px] font-bold tracking-[0.2em] pt-[3px] shrink-0">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <p className="text-sm md:text-base leading-relaxed opacity-70">{item}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </RevealSection>
          </div>
        ))}

        <RevealSection className="py-20 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-4 group border border-[#FAFAFA]/20 px-8 py-4 hover:bg-[#FAFAFA] transition-all duration-300 ease-out"
            >
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold group-hover:text-[#09090B] transition-colors duration-300">
                Have a problem like this? Start a conversation
              </span>
              <ArrowRight size={16} className="text-[#FAFAFA] group-hover:translate-x-1 group-hover:text-[#09090B] transition-all duration-300" />
            </Link>

            {study.downloadUrl && (
              <a
                href={study.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 group border border-[#FAFAFA]/10 px-8 py-4 hover:border-[#FAFAFA]/40 transition-all duration-300 ease-out"
              >
                <Download size={16} className="text-[#A1A1AA]" />
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  Download full report (PDF)
                </span>
              </a>
            )}
          </div>

          <div className="max-w-7xl mx-auto mt-12">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-3 group opacity-40 hover:opacity-100 transition-opacity duration-300"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold">Back to Case Studies</span>
            </Link>
          </div>
        </RevealSection>
      </div>
    </>
  );
}
