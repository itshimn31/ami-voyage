'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [touch, setTouch] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });

  useEffect(() => {
    setMounted(true);
    const isTouch =
      window.matchMedia('(hover: none), (pointer: coarse)').matches ||
      window.innerWidth < 1024;
    if (isTouch) {
      setTouch(true);
      return;
    }

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target?.closest) return;
      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor]'
      ) as HTMLElement | null;
      if (interactive) {
        const txt = interactive.getAttribute('data-cursor');
        setLabel(txt && txt !== 'true' ? txt : null);
        setIsPointer(true);
      } else {
        setIsPointer(false);
        setLabel(null);
      }
    };

    const leave = () => setHidden(true);

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    window.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseleave', leave);
    };
  }, [x, y]);

  if (!mounted || touch) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ translateX: sx, translateY: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <motion.div
          animate={{
            scale: label ? 4 : isPointer ? 1.7 : 1,
            opacity: hidden ? 0 : 1,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-white"
        >
          {label && (
            <span className="text-[8px] font-semibold uppercase tracking-wider text-ami-purple-deep">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        style={{ translateX: x, translateY: y }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: isPointer ? 0.4 : 1,
            opacity: hidden ? 0 : 0.55,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="h-2 w-2 rounded-full bg-ami-magenta shadow-[0_0_18px_4px_rgba(217,70,217,0.6)]"
        />
      </motion.div>
    </>
  );
}
