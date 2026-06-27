import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const sx = useSpring(mx, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(my, { stiffness: 500, damping: 40, mass: 0.3 });

  useEffect(() => {
    // Touch devices skip entirely
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest('a, button, [data-hover]'));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [visible, mx, my]);

  if (!visible) return null;

  return (
    <>
      {/* X - instant, mix-blend-difference so it's always visible */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999] font-bold leading-none select-none text-white"
        style={{ x: mx, y: my, translateX: '-50%', translateY: '-50%', fontSize: '12px', mixBlendMode: 'difference' }}
      >
        ×
      </motion.div>
      {/* Ring - spring lag */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[998] transition-all duration-200 border border-white"
        style={{
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 44 : 28,
          height: hovering ? 44 : 28,
          opacity: hovering ? 0.8 : 0.35,
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
