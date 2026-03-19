import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async'; 
import { RevealSection } from '../components/RevealSection';
import { portfolioData } from '../data/portfolioData';

export default function Work() {
  return (
    <>
      <Helmet>
        <title>The Vault | SEO Case Studies & Digital Solve Portfolio</title>
        <meta name="description" content="Explore the 'Solve' side of the Organic Theory logic. Real-world results for timber marketplaces, e-commerce, and industrial consulting." />
        <link rel="canonical" href="https://organictheory.vercel.app/work" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#F4F4F5] text-[#09090B]">
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs md:text-sm text-[#71717A] mb-8 font-bold tracking-[0.2em] uppercase">[ PORTFOLIO ]</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 font-display uppercase">THE VAULT</h1>
          </motion.div>
        </section>

        <RevealSection className="py-20 px-6 md:px-12 border-t border-[#09090B]/10">
          <div className="max-w-7xl mx-auto flex flex-col gap-32 md:gap-48">
            {portfolioData.map((project, index) => (
              <div 
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className={`lg:col-span-5 order-2 ${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <span className="text-xs text-[#71717A] mb-4 block font-bold tracking-widest">{project.id} // {project.client}</span>
                  <h2 className="text-3xl md:text-4xl mb-6 font-display uppercase tracking-wider">{project.title}</h2>
                  
                  <p className="text-base leading-relaxed opacity-70 mb-8 font-medium">
                    {project.id === '01' 
                      ? "We didn't just build a site; we engineered a digital timber marketplace. By restructuring the search architecture, we achieved a 100/100 SEO score, turning technical friction into a high-performance inventory engine."
                      : "Facing a massive deployment hurdle, we built a scalable engine that birthed 1,281 council-compliant pages in 56 days. The result? A 154% surge in search impressions through sheer structural efficiency."
                    }
                  </p>

                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-4 group border border-[#09090B]/20 px-6 py-3 hover:bg-[#09090B] hover:text-[#FAFAFA] transition-all duration-300"
                  >
                    <span className="text-xs tracking-[0.2em] uppercase font-bold">
                      {project.id === '01' ? '[ SEE THE CALIBRATION LOGIC ]' : '[ EXPLORE THE SCALE STRATEGY ]'}
                    </span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
                
                <motion.div 
                  className={`lg:col-span-7 order-1 ${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <div className="aspect-[16/10] border border-[#09090B]/10 overflow-hidden bg-white p-2 md:p-4 shadow-sm relative group">
                    <img 
                      src={project.image} 
                      alt={project.alt}
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-[#09090B]/90 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col items-center justify-center text-[#FAFAFA] p-6">
                      <div className="text-4xl font-display mb-6 tracking-[0.4em]">O+X</div>
                      <div className="text-center space-y-3">
                        {project.metrics.map(m => (
                          <div key={m} className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold border-b border-[#FAFAFA]/20 pb-1">{m}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </>
  );
}