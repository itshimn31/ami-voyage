'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface Props {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  to,
  duration = 1.8,
  suffix = '',
  className = '',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  const display =
    to >= 1000 ? value.toLocaleString('fr-FR') : value.toString();

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
