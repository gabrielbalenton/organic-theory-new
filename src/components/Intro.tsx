import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { DitheredLogo } from './ui/dithered-logo';

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const duration = reduceMotion ? 250 : 1450;
    const exitDuration = reduceMotion ? 100 : 520;
    const t = window.setTimeout(() => {
      setVisible(false);
      window.setTimeout(onComplete, exitDuration);
    }, duration);
    return () => window.clearTimeout(t);
    // intentionally omit onComplete - it changes every render and would reset the timer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.1 : 0.52, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[200] bg-[#09090B] flex flex-col items-center justify-center overflow-hidden"
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center"
          >
            <DitheredLogo
              imageSrc="/organic-theory-mark.svg"
              invert={false}
              threshold={118}
              gridSize={150}
              scale={0.82}
              dotScale={0.95}
              blur={0.8}
              particleColor="#FAFAFA"
              className="h-44 w-[min(82vw,520px)] text-[#FAFAFA]"
            />
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.38, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.42, duration: 0.45 }}
              className="mt-2 text-[9px] tracking-[0.5em] uppercase text-[#FAFAFA]"
            >
              Search · Systems · Automation
            </motion.p>
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 h-px bg-[#FAFAFA]/25"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: reduceMotion ? 0.1 : 1.35, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
