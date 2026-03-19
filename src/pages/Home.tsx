import { motion } from 'framer-motion'; 
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { RevealSection } from '../components/RevealSection';
import { homeData } from '../data/homeData';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Organic Theory | Strategic Search Architecture & SEO Logic</title>
        <meta name="description" content="Digital consultancy specializing in high-performance SEO systems and workflow automation." />
      </Helmet>

      <div className="w-full overflow-x-hidden bg-[#09090B] text-[#FAFAFA]">
        <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-1 lg:order-2 flex justify-center items-center relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 md:w-64 md:h-64 opacity-20"
              >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="50" cy="50" r="42" stroke="#FAFAFA" strokeWidth="1" />
                  <path d="M20 20L80 80M80 20L20 80" stroke="#FAFAFA" strokeWidth="1" />
                </svg>
              </motion.div>
            </div>

            <div className="order-2 lg:order-1">
              <p className="text-[10px] text-[#A1A1AA] mb-8 font-bold tracking-[0.3em] uppercase">
                {homeData.hero.badge}
              </p>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 font-display uppercase tracking-tight">
                {homeData.hero.titlePrimary} <br />
                <span className="text-[#A1A1AA]">{homeData.hero.titleAccent}</span>
              </h1>
              
              <p className="max-w-xl text-sm md:text-base leading-relaxed opacity-70 mb-12">
                {homeData.hero.description}
              </p>
              
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-4 group border border-[#FAFAFA]/20 px-8 py-4 hover:bg-[#FAFAFA] transition-all duration-300 ease-out"
              >
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold group-hover:text-[#09090B] transition-colors duration-300">
                  Let’s Talk Strategy
                </span>
                <ArrowRight size={16} className="text-[#FAFAFA] group-hover:translate-x-1 group-hover:text-[#09090B] transition-all duration-300" />
              </Link>
            </div>
          </div>
        </section>

        <RevealSection className="py-20 px-6 md:px-12 border-t border-[#FAFAFA]/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl mb-8 font-display uppercase tracking-widest">{homeData.methodology.title}</h2>
              <p className="text-sm md:text-base leading-relaxed opacity-60">
                {homeData.methodology.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              {homeData.methodology.pillars.map((pillar) => (
                <div key={pillar.id} className="border border-[#FAFAFA]/10 p-6 md:p-8 flex flex-col justify-between aspect-square bg-[#FAFAFA]/5 hover:border-[#FAFAFA]/40 transition-colors duration-500">
                  <span className={`text-3xl font-display ${pillar.accent ? 'text-[#A1A1AA]' : 'text-[#FAFAFA]'}`}>{pillar.id}</span>
                  <span className="text-[10px] tracking-[0.2em] uppercase opacity-60">{pillar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </div>
    </>
  );
}