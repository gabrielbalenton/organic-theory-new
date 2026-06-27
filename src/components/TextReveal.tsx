import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export function TextReveal({ children, className = '', delay = 0, as: Tag = 'div' }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={{ display: 'block' }}>
      <motion.div
        initial={{ y: '105%', opacity: 0 }}
        animate={inView ? { y: '0%', opacity: 1 } : {}}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Multi-line - wraps each line in its own mask
export function TextRevealLines({ lines, className = '', staggerDelay = 0.1, baseDelay = 0 }: {
  lines: string[];
  className?: string;
  staggerDelay?: number;
  baseDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });

  return (
    <div ref={ref}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            className={className}
            initial={{ y: '105%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: baseDelay + i * staggerDelay, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
