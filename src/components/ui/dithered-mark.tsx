import { useEffect, useMemo, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export function DitheredMark({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const points = useMemo(() => {
    const pts: Array<{ x: number; y: number; group: number }> = [];
    const size = 44;
    for (let y = -size; y <= size; y += 4) {
      for (let x = -size; x <= size; x += 4) {
        const r = Math.hypot(x, y);
        const ring = r > 31 && r < 39;
        const diag = Math.abs(Math.abs(x) - Math.abs(y)) < 2.2 && r < 31;
        if (ring || diag) pts.push({ x, y, group: ring ? 0 : 1 });
      }
    }
    return pts;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    let mx = -999;
    let my = -999;
    let active = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const move = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      active = true;
    };
    const leave = () => { active = false; };
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerleave', leave);

    const draw = (time: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w / 2;
      const cy = h / 2;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        let x = cx + p.x;
        let y = cy + p.y;
        if (!reduced) {
          const dx = x - mx;
          const dy = y - my;
          const d = Math.hypot(dx, dy);
          if (active && d < 82 && d > 0.1) {
            const force = (1 - d / 82) * 9;
            x += (dx / d) * force;
            y += (dy / d) * force;
          }
          const drift = Math.sin(time * 0.0012 + i * 0.17) * 0.45;
          x += drift;
          y -= drift * 0.4;
        }
        ctx.beginPath();
        ctx.fillStyle = p.group === 0 ? '#2F3A45' : '#8DA5B7';
        ctx.globalAlpha = p.group === 0 ? 0.82 : 0.62;
        ctx.arc(x, y, p.group === 0 ? 1.25 : 1.05, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerleave', leave);
    };
  }, [points, reduced]);

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-label="Organic Theory O plus X mark" />;
}
