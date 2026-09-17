import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export function DitherGradient({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <div className={`relative overflow-hidden bg-[#E8E2DB] ${className}`}>
      <motion.div
        aria-hidden="true"
        className="absolute -inset-[20%]"
        animate={reduced ? undefined : { x: ['-2%', '3%', '-2%'], y: ['1%', '-2%', '1%'] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(circle at 22% 32%, rgba(141,165,183,.22), transparent 28%), radial-gradient(circle at 76% 66%, rgba(143,168,151,.18), transparent 30%), radial-gradient(circle at 56% 12%, rgba(250,249,244,.72), transparent 25%)',
          filter: 'blur(18px)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.20] mix-blend-multiply"
        style={{
          backgroundImage:
            'radial-gradient(rgba(47,58,69,.24) 0.65px, transparent 0.65px)',
          backgroundSize: '6px 6px',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
