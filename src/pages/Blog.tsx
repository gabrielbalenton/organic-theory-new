import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import { TextReveal } from '../components/TextReveal';
import { ScrambleText } from '../components/ScrambleText';
import { MagneticButton } from '../components/MagneticButton';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Insights | SEO, Automation & Systems | Organic Theory</title>
        <meta name="description" content="Practical insights on search architecture, AI automation, workflow engineering, and content strategy from Organic Theory." />
        <link rel="canonical" href="https://organic-theory.vercel.app/insights" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#09090B] text-[#FAFAFA]">

        <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-[10px] text-[#A1A1AA] mb-6 font-bold tracking-[0.3em] uppercase"
          >
            <ScrambleText text="[ INSIGHTS ]" delay={0.3} />
          </motion.p>
          <TextReveal>
            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.0] mb-6 font-display uppercase tracking-tight">
              The thinking<br /><span className="text-[#A1A1AA]">behind the work.</span>
            </h1>
          </TextReveal>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-base max-w-md leading-relaxed"
          >
            No fluff. Practical frameworks for search, automation, and systems - written from live client work.
          </motion.p>
        </section>

        <div className="border-t border-[#FAFAFA]/10 max-w-7xl mx-auto px-6 md:px-12">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              className="border-b border-[#FAFAFA]/10 group"
            >
              <Link to={`/insights/${post.slug}`} className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 md:py-12 hover:bg-[#FAFAFA]/[0.02] transition-colors duration-300 -mx-6 px-6 md:-mx-12 md:px-12">
                <div className="md:col-span-1 flex items-start pt-1">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#A1A1AA]/40">0{i + 1}</span>
                </div>
                <div className="md:col-span-2 flex items-start gap-2 pt-1">
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase border border-[#FAFAFA]/15 px-2.5 py-1 text-[#A1A1AA]">{post.category}</span>
                </div>
                <div className="md:col-span-7">
                  <h2 className="text-xl md:text-2xl font-display uppercase tracking-wide leading-tight mb-3 group-hover:opacity-70 transition-opacity duration-300">{post.title}</h2>
                  <p className="text-sm opacity-40 leading-relaxed max-w-xl">{post.excerpt}</p>
                </div>
                <div className="md:col-span-2 flex md:flex-col md:items-end justify-between items-center md:justify-start gap-4 md:pt-1">
                  <span className="text-[10px] tracking-[0.15em] uppercase opacity-30">{post.readTime} min read</span>
                  <ArrowRight size={16} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <section className="border-t border-[#FAFAFA]/10 mt-0 bg-[#F5F0EB] text-[#09090B] py-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#09090B]/40 mb-3">
                <ScrambleText text="[ READY TO ACT ]" />
              </p>
              <TextReveal>
                <h2 className="text-2xl md:text-4xl font-display uppercase tracking-tight text-[#09090B]">
                  Reading isn't enough.<br />Let's build it.
                </h2>
              </TextReveal>
            </div>
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-4 group border border-[#09090B]/20 px-8 py-4 hover:bg-[#09090B] hover:text-[#FAFAFA] transition-all duration-300 text-[#09090B] shrink-0"
              >
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold group-hover:text-[#FAFAFA] transition-colors duration-300">Start a conversation</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </MagneticButton>
          </div>
        </section>

      </div>
    </>
  );
}
