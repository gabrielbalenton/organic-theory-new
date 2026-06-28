import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import { TextReveal } from '../components/TextReveal';
import { MagneticButton } from '../components/MagneticButton';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);
  const currentIndex = blogPosts.findIndex(p => p.slug === slug);
  const next = blogPosts[currentIndex + 1];
  const prev = blogPosts[currentIndex - 1];

  if (!post) {
    return (
      <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#A1A1AA] mb-4">Post not found</p>
          <Link to="/insights" className="text-sm opacity-40 hover:opacity-100 transition-opacity">← Back to Insights</Link>
        </div>
      </div>
    );
  }

  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: 'Gabriel Balenton', url: 'https://organic-theory.vercel.app' },
    publisher: { '@type': 'Organization', name: 'Organic Theory', url: 'https://organic-theory.vercel.app' },
    datePublished: post.date,
    url: `https://organic-theory.vercel.app/insights/${post.slug}`,
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Organic Theory</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://organic-theory.vercel.app/insights/${post.slug}`} />
        <link rel="canonical" href={`https://organic-theory.vercel.app/insights/${post.slug}`} />
        <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>
      </Helmet>

      <div className="w-full min-h-screen bg-[#09090B] text-[#FAFAFA]">

        {/* Header */}
        <section className="pt-32 pb-16 px-6 md:px-12 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/insights" className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-bold opacity-40 hover:opacity-100 transition-opacity duration-200 mb-10 group">
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform duration-200" />
              Insights
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase border border-[#FAFAFA]/15 px-2.5 py-1 text-[#A1A1AA]">{post.category}</span>
              <span className="text-[10px] tracking-[0.15em] uppercase opacity-30">{post.readTime} min read</span>
              <span className="text-[10px] tracking-[0.15em] uppercase opacity-30">{new Date(post.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </motion.div>
          <TextReveal>
            <h1 className="text-3xl md:text-4xl lg:text-5xl leading-[1.15] font-display uppercase tracking-tight">{post.title}</h1>
          </TextReveal>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg leading-relaxed mt-6 max-w-2xl"
          >
            {post.excerpt}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-3 mt-8 pt-8 border-t border-[#FAFAFA]/10"
          >
            <div className="w-8 h-8 border border-[#FAFAFA]/20 flex items-center justify-center text-xs font-display">G</div>
            <div>
              <p className="text-xs font-bold tracking-[0.1em]">Gabriel Balenton</p>
              <p className="text-[10px] opacity-40 tracking-[0.15em]">Organic Theory</p>
            </div>
          </motion.div>
        </section>

        {/* Divider line */}
        <div className="border-t border-[#FAFAFA]/10" />

        {/* Body */}
        <article className="px-6 md:px-12 py-16 max-w-4xl mx-auto">
          <div className="max-w-2xl space-y-10">
            {post.sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
              >
                {section.heading && (
                  <h2 className="text-lg md:text-xl font-display uppercase tracking-wider mb-4 text-[#FAFAFA]">{section.heading}</h2>
                )}
                <p className="text-base leading-[1.8] opacity-60">{section.body}</p>
              </motion.div>
            ))}
          </div>
        </article>

        {/* Bottom CTA */}
        <section className="border-t border-[#FAFAFA]/10 px-6 md:px-12 py-16 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <p className="text-[10px] text-[#A1A1AA] mb-3 font-bold tracking-[0.3em] uppercase">[ APPLY THIS ]</p>
              <h3 className="text-xl md:text-2xl font-display uppercase tracking-wide">Want this built for your brand?</h3>
              <p className="text-sm opacity-40 mt-2 max-w-sm leading-relaxed">Start with the $400 audit to see exactly what your site needs first.</p>
            </div>
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-4 group border border-[#FAFAFA]/20 px-8 py-4 hover:bg-[#FAFAFA] hover:text-[#09090B] transition-all duration-300 shrink-0"
              >
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold group-hover:text-[#09090B] transition-colors duration-300">Book the Audit</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 group-hover:text-[#09090B] transition-all duration-300" />
              </Link>
            </MagneticButton>
          </div>
        </section>

        {/* Prev / Next */}
        {(prev || next) && (
          <div className="border-t border-[#FAFAFA]/10 grid grid-cols-1 md:grid-cols-2">
            {prev ? (
              <Link to={`/insights/${prev.slug}`} className="px-6 md:px-12 py-10 border-r border-[#FAFAFA]/10 group hover:bg-[#FAFAFA]/[0.02] transition-colors duration-300">
                <p className="text-[10px] tracking-[0.25em] uppercase opacity-30 mb-3 flex items-center gap-2"><ArrowLeft size={10} /> Previous</p>
                <p className="text-sm font-display uppercase tracking-wide opacity-60 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">{prev.title}</p>
              </Link>
            ) : <div />}
            {next && (
              <Link to={`/insights/${next.slug}`} className="px-6 md:px-12 py-10 text-right group hover:bg-[#FAFAFA]/[0.02] transition-colors duration-300">
                <p className="text-[10px] tracking-[0.25em] uppercase opacity-30 mb-3 flex items-center justify-end gap-2">Next <ArrowRight size={10} /></p>
                <p className="text-sm font-display uppercase tracking-wide opacity-60 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">{next.title}</p>
              </Link>
            )}
          </div>
        )}

      </div>
    </>
  );
}
