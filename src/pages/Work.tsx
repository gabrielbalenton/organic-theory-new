import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { portfolioData } from '../data/portfolioData';
import { ParallaxImage, TiltCard } from '../components/ParallaxImage';
import { ScrambleText } from '../components/ScrambleText';
import { TextReveal } from '../components/TextReveal';
import { MagneticButton } from '../components/MagneticButton';

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

        {/* Header */}
        <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] text-[#A1A1AA] mb-6 font-bold tracking-[0.3em] uppercase"
            >
              <ScrambleText text="[ PORTFOLIO ]" delay={0.3} />
            </motion.p>
            <TextReveal>
              <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-4 font-display uppercase">THE VAULT</h1>
            </TextReveal>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm"
            >
              {portfolioData.length} case studies
            </motion.p>
          </div>
        </section>

        {/* Case studies */}
        <div className="border-t border-[#FAFAFA]/10">
          {portfolioData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-[#FAFAFA]/10 group"
            >
              {/* Image side */}
              <div className={`lg:col-span-7 ${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <TiltCard className="h-[420px] md:h-[580px] lg:h-[640px] w-full relative overflow-hidden">
                  <ParallaxImage
                    src={project.image}
                    alt={project.alt}
                    className="absolute inset-0 w-full h-full"
                    strength={8}
                  />
                  {/* Grayscale + tint overlay */}
                  <div className="absolute inset-0 bg-[#09090B]/50 mix-blend-color group-hover:opacity-0 transition-opacity duration-700" />
                  {/* Hover text overlay */}
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-[#09090B]/80"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="text-2xl font-display tracking-[0.4em] text-[#FAFAFA] mb-6">O+X</div>
                    <div className="text-center space-y-3">
                      {project.metrics.map(m => (
                        <div key={m} className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold border-b border-[#FAFAFA]/20 pb-2 text-[#FAFAFA]">{m}</div>
                      ))}
                    </div>
                  </motion.div>
                  {/* ID badge */}
                  <div className="absolute top-5 left-5 text-[10px] tracking-[0.3em] uppercase font-bold text-[#FAFAFA]/40">{project.id}</div>
                </TiltCard>
              </div>

              {/* Text side */}
              <div className={`lg:col-span-5 flex flex-col justify-center py-12 px-6 md:px-10 order-2 ${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <span className="text-[10px] text-[#A1A1AA] mb-4 block font-bold tracking-[0.3em]">
                  <ScrambleText text={`${project.id} // ${project.client}`} delay={0.2} />
                </span>
                <TextReveal>
                  <h2 className="text-2xl md:text-3xl mb-5 font-display uppercase tracking-wider">{project.title}</h2>
                </TextReveal>
                <p className="text-sm leading-relaxed opacity-50 mb-8">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.metrics.map(m => (
                    <span key={m} className="text-[10px] tracking-[0.2em] uppercase font-bold border border-[#FAFAFA]/15 px-3 py-1 text-[#A1A1AA]">
                      {m}
                    </span>
                  ))}
                </div>
                <MagneticButton>
                  <Link
                    to={project.slug}
                    className="inline-flex items-center gap-4 group/btn border border-[#FAFAFA]/20 px-6 py-3 hover:bg-[#FAFAFA] hover:text-[#09090B] transition-all duration-300 self-start"
                  >
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold">{project.buttonLabel}</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </>
  );
}
