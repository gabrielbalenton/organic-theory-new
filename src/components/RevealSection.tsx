import React from 'react';
import { motion } from 'framer-motion';

export function RevealSection({ children, className = '', id }: { children: React.ReactNode, className?: string, id?: string }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}