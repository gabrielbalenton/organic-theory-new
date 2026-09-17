import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface DitherGradientProps {
  children?: ReactNode;
  className?: string;
  colorFrom?: string;
  colorMid?: string;
  colorTo?: string;
  intensity?: number;
  speed?: number;
  angle?: number;
  resolutionScale?: number;
}

export function DitherGradient({
  children,
  className = '',
  colorFrom = '#FAF9F4',
  colorMid = '#E8E2DB',
  colorTo = '#DCE4E1',
  intensity = 0.16,
  speed = 1,
  angle = 18,
}: DitherGradientProps) {
  const reduced = useReducedMotion();
  const duration = Math.max(10, 18 / Math.max(speed, 0.2));
  const dotOpacity = Math.min(0.28, Math.max(0.08, intensity * 1.25));

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: colorFrom }}
      aria-hidden={children ? undefined : true}
    >
      <motion.div
        aria-hidden="true"
        className="absolute -inset-[24%]"
        animate={reduced ? undefined : { x: ['-3%', '3%', '-3%'], y: ['2%', '-2%', '2%'], rotate: [angle - 1, angle + 1, angle - 1] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: `radial-gradient(circle at 22% 32%, ${colorMid} 0%, transparent 30%), radial-gradient(circle at 76% 68%, ${colorTo} 0%, transparent 31%), radial-gradient(circle at 55% 12%, rgba(250,249,244,.68), transparent 26%)`,
          filter: 'blur(24px)',
          opacity: 0.68,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-multiply"
        style={{
          opacity: dotOpacity,
          backgroundImage: 'radial-gradient(rgba(47,58,69,.22) 0.6px, transparent 0.6px)',
          backgroundSize: '6px 6px',
        }}
      />
      {children ? <div className="relative z-10">{children}</div> : null}
    </div>
  );
}
