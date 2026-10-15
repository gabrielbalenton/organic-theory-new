import { useEffect } from 'react';

type Rgba = { r: number; g: number; b: number; a: number };

let mountCount = 0;
let stopGlobalCursor: (() => void) | null = null;

function parseColor(value: string): Rgba | null {
  const match = value.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,\/]\s*([\d.]+))?\s*\)/i);
  if (!match) return null;
  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
    a: match[4] === undefined ? 1 : Number(match[4]),
  };
}

function relativeLuminance({ r, g, b }: Rgba) {
  const channel = (value: number) => {
    const n = value / 255;
    return n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function cursorColorAt(x: number, y: number) {
  const hit = document.elementFromPoint(x, y) as HTMLElement | null;
  if (!hit) return '#111111';

  const explicit = hit.closest<HTMLElement>('[data-cursor-theme]')?.dataset.cursorTheme;
  if (explicit === 'dark') return '#FFFFFF';
  if (explicit === 'light') return '#111111';

  // Explicit high-contrast regions in the Organic Theory design system are dark.
  if (hit.closest('.ot-contrast')) return '#FFFFFF';

  let node: HTMLElement | null = hit;
  while (node) {
    const style = window.getComputedStyle(node);
    const background = parseColor(style.backgroundColor);

    // Ignore near-transparent decorative layers and use the first meaningful surface.
    if (background && background.a >= 0.18) {
      return relativeLuminance(background) >= 0.48 ? '#111111' : '#FFFFFF';
    }

    node = node.parentElement;
  }

  // Image/gradient sections often have transparent CSS backgrounds but inherit a
  // contrasting text color. Use that as the fallback signal before assuming light.
  const foreground = parseColor(window.getComputedStyle(hit).color);
  if (foreground) {
    return relativeLuminance(foreground) >= 0.62 ? '#FFFFFF' : '#111111';
  }

  return '#111111';
}

function startCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return () => undefined;

  const cross = document.createElement('div');
  const ring = document.createElement('div');

  Object.assign(cross.style, {
    position: 'fixed',
    left: '0',
    top: '0',
    zIndex: '9999',
    pointerEvents: 'none',
    userSelect: 'none',
    fontSize: '12px',
    fontWeight: '700',
    lineHeight: '1',
    color: '#111111',
    transform: 'translate(-100px, -100px) translate(-50%, -50%)',
    opacity: '0',
    transition: 'color 90ms linear, opacity 90ms linear',
  });
  cross.textContent = '×';
  cross.dataset.organicTheoryCursor = 'cross';

  Object.assign(ring.style, {
    position: 'fixed',
    left: '0',
    top: '0',
    zIndex: '9998',
    pointerEvents: 'none',
    width: '28px',
    height: '28px',
    borderRadius: '9999px',
    border: '1px solid #111111',
    transform: 'translate(-100px, -100px) translate(-50%, -50%)',
    opacity: '0',
    transition: 'width 160ms ease, height 160ms ease, border-color 90ms linear, opacity 90ms linear',
  });
  ring.dataset.organicTheoryCursor = 'ring';

  document.body.append(cross, ring);

  let targetX = -100;
  let targetY = -100;
  let ringX = -100;
  let ringY = -100;
  let raf = 0;
  let hovering = false;
  let hiddenForNative = false;
  let lastColor = '#111111';

  const setVisible = (visible: boolean) => {
    cross.style.opacity = visible ? '1' : '0';
    ring.style.opacity = visible ? (hovering ? '0.82' : '0.42') : '0';
  };

  const updateTargetState = (target: EventTarget | null) => {
    const element = target instanceof HTMLElement ? target : null;
    hiddenForNative = Boolean(element?.closest('input, textarea, select, [contenteditable], .use-native-cursor'));
    hovering = Boolean(element?.closest('a, button, [data-hover]'));
    ring.style.width = hovering ? '44px' : '28px';
    ring.style.height = hovering ? '44px' : '28px';
    if (!hiddenForNative) setVisible(true);
    else setVisible(false);
  };

  const onMove = (event: MouseEvent) => {
    targetX = event.clientX;
    targetY = event.clientY;
    cross.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;

    const nextColor = cursorColorAt(targetX, targetY);
    if (nextColor !== lastColor) {
      lastColor = nextColor;
      cross.style.color = nextColor;
      ring.style.borderColor = nextColor;
    }

    updateTargetState(event.target);
  };

  const onOver = (event: MouseEvent) => updateTargetState(event.target);
  const onLeave = () => setVisible(false);
  const onEnter = () => {
    if (!hiddenForNative && targetX >= 0) setVisible(true);
  };

  const animate = () => {
    ringX += (targetX - ringX) * 0.22;
    ringY += (targetY - ringY) * 0.22;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    raf = window.requestAnimationFrame(animate);
  };

  window.addEventListener('mousemove', onMove, { passive: true });
  window.addEventListener('mouseover', onOver, { passive: true });
  document.documentElement.addEventListener('mouseleave', onLeave);
  document.documentElement.addEventListener('mouseenter', onEnter);
  raf = window.requestAnimationFrame(animate);

  return () => {
    window.cancelAnimationFrame(raf);
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseover', onOver);
    document.documentElement.removeEventListener('mouseleave', onLeave);
    document.documentElement.removeEventListener('mouseenter', onEnter);
    cross.remove();
    ring.remove();
  };
}

export default function Cursor() {
  useEffect(() => {
    mountCount += 1;
    if (mountCount === 1) stopGlobalCursor = startCursor();

    return () => {
      mountCount -= 1;
      if (mountCount === 0) {
        stopGlobalCursor?.();
        stopGlobalCursor = null;
      }
    };
  }, []);

  return null;
}
