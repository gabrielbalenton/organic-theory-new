import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={{ display: 'block' }}>
      <motion.div
        initial={reduced ? { opacity: 0 } : { y: '102%', opacity: 0, filter: 'blur(7px)' }}
        animate={inView ? { y: '0%', opacity: 1, filter: 'blur(0px)' } : {}}
        transition={{ duration: reduced ? 0.01 : 0.82, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function TextRevealLines({ lines, className = '', staggerDelay = 0.1, baseDelay = 0 }: {
  lines: string[];
  className?: string;
  staggerDelay?: number;
  baseDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  const reduced = useReducedMotion();

  return (
    <div ref={ref}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden pb-[0.06em]">
          <motion.div
            className={className}
            initial={reduced ? { opacity: 0 } : { y: '102%', opacity: 0, filter: 'blur(7px)' }}
            animate={inView ? { y: '0%', opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: reduced ? 0.01 : 0.88, delay: baseDelay + i * staggerDelay, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
