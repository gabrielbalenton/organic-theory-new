import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$-/\\';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function ScrambleText({ text, className = '', delay = 0, speed = 28 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(text);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const timeout = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplay(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ' || char === '[' || char === ']' || char === '(' || char === ')') return char;
              if (i < iteration) return text[i];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );
        iteration += 0.6;
        if (iteration >= text.length) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, speed);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [inView, text, delay, speed]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
