import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DitheredMark } from './ui/dithered-mark';

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 520);
    }, 1450);
    return () => clearTimeout(t);
    // intentionally omit onComplete - it changes every render and would reset the timer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#FAF9F4] text-[#2F3A45]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <div className="h-36 w-36 md:h-44 md:w-44">
              <DitheredMark />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.56, y: 0 }}
              transition={{ delay: 0.32, duration: 0.45 }}
              className="mt-1 text-[9px] font-bold uppercase tracking-[0.42em] text-[#2F3A45]"
            >
              Organic Theory
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.34 }}
              transition={{ delay: 0.5, duration: 0.45 }}
              className="mt-3 text-[8px] uppercase tracking-[0.22em] text-[#2F3A45]"
            >
              Search · Systems · Build
            </motion.p>
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 h-px bg-[#8DA5B7]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.28, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
