import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 700);
    }, 2400);
    return () => clearTimeout(t);
    // intentionally omit onComplete — it changes every render and would reset the timer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[200] bg-[#09090B] flex flex-col items-center justify-center overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-5"
          >
            <span className="font-display font-bold text-[2.5rem] tracking-[0.35em] text-[#FAFAFA]">
              O<span className="text-[#A1A1AA] mx-2">+</span>X
            </span>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.35, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-[9px] tracking-[0.5em] uppercase text-[#FAFAFA]"
            >
              Organic Theory
            </motion.p>
          </motion.div>

          {/* Progress line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] bg-[#FAFAFA]/20"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
