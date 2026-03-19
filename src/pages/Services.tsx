import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { RevealSection } from '../components/RevealSection'; 
import { servicesData } from '../data/servicesData';

export default function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <Helmet>
        <title>Strategic Services | Search Architecture & Workflow Engineering</title>
        <meta name="description" content="Explore Organic Theory's core competencies: from Search Engine Architecture to Automated Workflow Engineering." />
        <meta property="og:title" content="Core Competencies | Organic Theory" />
        <meta property="og:description" content="Technical consulting focused on Search Architecture and Workflow Automation." />
        <link rel="canonical" href="https://organictheory.vercel.app/services" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Organic Theory",
              "url": "https://organictheory.vercel.app/services",
              "founder": {
                "@type": "Person",
                "name": "Gabriel Balenton"
              }
            }
          `}
        </script>
      </Helmet>

      <div className="w-full min-h-screen bg-[#F4F4F5] text-[#09090B]">
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs md:text-sm text-[#71717A] mb-8 font-bold tracking-[0.2em] uppercase">[ SYSTEM COMPONENTS ]</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 font-display uppercase">CORE COMPETENCIES</h1>
          </motion.div>
        </section>

        <RevealSection className="py-20 px-6 md:px-12 border-t border-[#09090B]/10">
          <div className="max-w-5xl mx-auto flex flex-col gap-4">
            {servicesData.map((service, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={service.id} className="border border-[#09090B]/20 bg-[#F4F4F5] overflow-hidden transition-colors duration-300">
                  <button 
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full text-left flex flex-col md:flex-row md:items-stretch p-0 hover:bg-white/50 transition-colors group"
                  >
                    <div 
                      className="w-full md:w-48 h-24 md:h-auto border-b md:border-b-0 md:border-r border-[#09090B]/10 opacity-50 grayscale group-hover:opacity-100 transition-all"
                      style={{ backgroundImage: `url("${service.pattern}")`, backgroundRepeat: 'repeat', backgroundSize: '40px' }}
                    />
                    
                    <div className="p-6 md:p-8 flex-grow flex justify-between items-center bg-transparent">
                      <div>
                        <span className="text-xs text-[#71717A] block mb-2">{service.id}</span>
                        <h2 className="text-xl md:text-2xl font-display uppercase tracking-widest">{service.title}</h2>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-sm font-bold hidden md:block">{service.price}</span>
                        <div className="w-8 h-8 flex items-center justify-center border border-[#09090B]/20 rounded-full group-hover:border-[#09090B]">
                          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                        </div>
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                      >
                        <div className="p-6 md:p-8 md:ml-48 border-t border-[#09090B]/10 bg-white">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                            <h3 className="text-xs tracking-[0.2em] uppercase text-[#71717A] mb-4 md:mb-0">Strategic Solve</h3>
                            <span className="text-sm font-bold md:hidden mb-4">{service.price}</span>
                            
                            <Link 
                              to="/contact" 
                              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-bold hover:text-[#71717A] transition-colors"
                            >
                              Initiate Brief <ArrowRight size={14} />
                            </Link>
                          </div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            {service.bullets.map((bullet, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm normal-case tracking-normal opacity-80 font-medium">
                                <span className="text-[#09090B] opacity-30">—</span> {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </RevealSection>
      </div>
    </>
  );
}