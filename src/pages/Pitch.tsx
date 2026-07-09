import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { getPitch } from '../data/pitchData';
import { TextReveal } from '../components/TextReveal';
import { MagneticButton } from '../components/MagneticButton';
import Cursor from '../components/Cursor';
import { WebsiteMockup } from '../components/mockups/WebsiteMockup';
import { EmailMockup } from '../components/mockups/EmailMockup';
import { DashboardMockup } from '../components/mockups/DashboardMockup';
import { SEOSnippetMockup } from '../components/mockups/SEOSnippetMockup';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Pitch() {
  const { slug } = useParams<{ slug: string }>();
  const pitch = getPitch(slug);

  if (!pitch) {
    return (
      <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex items-center justify-center">
        <Cursor />
        <div className="text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#A1A1AA] mb-4">Pitch not found</p>
          <Link to="/" className="text-sm opacity-40 hover:opacity-100 transition-opacity">← Back home</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pitch.clientName} | Organic Theory</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Cursor />

      <div className="w-full min-h-screen bg-[#09090B] text-[#FAFAFA]">

        {/* Hero */}
        <section className="pt-32 pb-16 px-6 md:px-12 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] text-[#A1A1AA] mb-8 font-bold tracking-[0.3em] uppercase"
          >
            [ FOR {pitch.clientName.toUpperCase()} ]
          </motion.p>
          <TextReveal>
            <h1 className="text-2xl md:text-3xl lg:text-4xl leading-[1.35] font-display tracking-tight max-w-2xl normal-case">
              {pitch.problem}
            </h1>
          </TextReveal>
        </section>

        {/* Preview mockup */}
        {pitch.preview && (
          <section className="px-6 md:px-12 pb-16 max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[10px] text-[#A1A1AA] mb-6 font-bold tracking-[0.3em] uppercase"
            >
              [ WHAT I'D BUILD FOR {pitch.clientName.toUpperCase()} ]
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            >
              {pitch.preview.type === 'website' && <WebsiteMockup {...pitch.preview} />}
              {pitch.preview.type === 'email' && <EmailMockup {...pitch.preview} />}
              {pitch.preview.type === 'dashboard' && <DashboardMockup {...pitch.preview} />}
              {pitch.preview.type === 'seo' && <SEOSnippetMockup {...pitch.preview} />}
            </motion.div>
            <p className="text-xs opacity-30 mt-4 max-w-md">
              A concept, built from your job post — not a template. The real version is tailored, tested, and yours.
            </p>
          </section>
        )}

        {/* Divider */}
        <div className="border-t border-[#FAFAFA]/10" />

        {/* Points */}
        <section className="max-w-4xl mx-auto px-6 md:px-12">
          {pitch.points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 py-12 border-b border-[#FAFAFA]/10"
            >
              <div className="md:col-span-1">
                <span className="text-3xl font-display text-[#FAFAFA]/10 leading-none">0{i + 1}</span>
              </div>
              <div className="md:col-span-11">
                <h2 className="text-lg md:text-xl font-display uppercase tracking-wide mb-3 leading-snug">
                  {point.heading}
                </h2>
                <p className="text-sm leading-relaxed opacity-50 max-w-xl">{point.detail}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 py-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col md:flex-row justify-between items-start gap-8 border-t border-[#FAFAFA]/10 pt-12"
          >
            <div>
              <p className="text-[10px] text-[#A1A1AA] mb-3 font-bold tracking-[0.3em] uppercase">[ NEXT STEP ]</p>
              <h3 className="text-xl md:text-2xl font-display uppercase tracking-wide">Want this fixed?</h3>
              <p className="text-sm opacity-40 mt-2 max-w-sm leading-relaxed">
                Start with a short call - I'll walk you through exactly what I'd build before you commit to anything.
              </p>
            </div>
            <MagneticButton>
              <Link
                to={pitch.ctaTo}
                className="inline-flex items-center gap-4 group border border-[#FAFAFA]/20 px-8 py-4 hover:bg-[#FAFAFA] hover:text-[#09090B] transition-all duration-300 shrink-0"
              >
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold group-hover:text-[#09090B] transition-colors duration-300">{pitch.ctaLabel}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 group-hover:text-[#09090B] transition-all duration-300" />
              </Link>
            </MagneticButton>
          </motion.div>
        </section>

      </div>
    </>
  );
}
