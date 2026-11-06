import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function RevealSection({ children, className = '', id }: { children: React.ReactNode, className?: string, id?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      id={id}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}