import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Organic Theory</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="w-full min-h-screen bg-[#09090B] text-[#FAFAFA] flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col items-center gap-8 max-w-lg"
        >
          {/* Rotating mark */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 opacity-10"
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="42" stroke="#FAFAFA" strokeWidth="1.2" />
              <path d="M20 20L80 80M80 20L20 80" stroke="#FAFAFA" strokeWidth="1.2" />
            </svg>
          </motion.div>

          <div>
            <p className="text-[10px] text-[#A1A1AA] mb-4 font-bold tracking-[0.3em] uppercase">[ 404 ]</p>
            <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tight leading-none mb-6">
              Nothing<br />
              <span className="text-[#A1A1AA]">here.</span>
            </h1>
            <p className="text-sm opacity-50 leading-relaxed max-w-xs mx-auto">
              This page doesn't exist or was moved. The system keeps running — just not here.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-4 group border border-[#FAFAFA]/20 px-8 py-4 hover:bg-[#FAFAFA] transition-all duration-300"
            >
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold group-hover:text-[#09090B] transition-colors duration-300">Back to home</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 group-hover:text-[#09090B] transition-all duration-300" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-4 px-8 py-4 opacity-40 hover:opacity-100 transition-opacity duration-300"
            >
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold">Start a conversation</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
