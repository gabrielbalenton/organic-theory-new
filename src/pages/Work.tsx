import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { RevealSection } from '../components/RevealSection';
import { portfolioData } from '../data/portfolioData';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Work() {
  return (
    <>
      <Helmet>
        <title>The Vault | Case Studies & Results | Organic Theory</title>
        <meta name="description" content="Real results from real builds. Search visibility from 0 to 63%, Lighthouse SEO score of 100, 1,281 pages deployed. See the work." />
        <meta property="og:title" content="The Vault | Case Studies | Organic Theory" />
        <meta property="og:url" content="https://organictheory.vercel.app/vault" />
        <link rel="canonical" href="https://organictheory.vercel.app/vault" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#09090B] text-[#FAFAFA]">
        <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[10px] text-[#A1A1AA] mb-6 font-bold tracking-[0.3em] uppercase">[ PORTFOLIO ]</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-4 font-display uppercase">THE VAULT</h1>
            <p className="text-sm opacity-40">{portfolioData.length} case studies</p>
          </motion.div>
        </section>

        <RevealSection className="pb-28 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto flex flex-col gap-0">
            {portfolioData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-[#FAFAFA]/10 py-14 group"
              >
                {/* Text side */}
                <div className={`lg:col-span-5 flex flex-col justify-center order-2 ${index % 2 !== 0 ? 'lg:order-2 lg:pl-16' : 'lg:order-1 lg:pr-16'}`}>
                  <span className="text-[10px] text-[#A1A1AA] mb-4 block font-bold tracking-[0.3em]">
                    {project.id} // {project.client}
                  </span>
                  <h2 className="text-2xl md:text-3xl mb-5 font-display uppercase tracking-wider">{project.title}</h2>
                  <p className="text-sm leading-relaxed opacity-50 mb-8">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.metrics.map(m => (
                      <span key={m} className="text-[10px] tracking-[0.2em] uppercase font-bold border border-[#FAFAFA]/15 px-3 py-1 text-[#A1A1AA]">
                        {m}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={project.slug}
                    className="inline-flex items-center gap-4 group/btn border border-[#FAFAFA]/20 px-6 py-3 hover:bg-[#FAFAFA] hover:text-[#09090B] transition-all duration-300 self-start"
                  >
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold">{project.buttonLabel}</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>

                {/* Image side */}
                <div className={`lg:col-span-7 order-1 ${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'} mb-8 lg:mb-0`}>
                  <div className="aspect-[16/10] border border-[#FAFAFA]/10 overflow-hidden bg-[#111] relative group/img">
                    <img
                      src={project.image}
                      alt={project.alt}
                      className="w-full h-full object-cover grayscale opacity-60 group-hover/img:opacity-90 group-hover/img:grayscale-0 transition-all duration-1000"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#09090B]/90 translate-y-full group-hover/img:translate-y-0 transition-transform duration-500 flex flex-col items-center justify-center p-8">
                      <div className="text-3xl font-display mb-6 tracking-[0.4em] text-[#FAFAFA]">O+X</div>
                      <div className="text-center space-y-3">
                        {project.metrics.map(m => (
                          <div key={m} className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold border-b border-[#FAFAFA]/20 pb-2 text-[#FAFAFA]">{m}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </RevealSection>
      </div>
    </>
  );
}
