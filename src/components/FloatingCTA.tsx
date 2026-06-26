import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const check = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setShow(pct > 0.25);
    };
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-8 right-6 md:right-10 z-50"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-[#FAFAFA] text-[#09090B] px-5 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#A1A1AA] transition-colors duration-300 shadow-xl shadow-black/30"
          >
            Start a conversation
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
