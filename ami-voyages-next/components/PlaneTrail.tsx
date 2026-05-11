'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Decorative SVG plane that crosses the screen horizontally as the user
 * scrolls between destinations and formalities, leaving a dotted mauve trail.
 */
export default function PlaneTrail() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['-15%', '110%']);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], ['10%', '-20%', '-30%']);
  const trailScale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <section
      ref={ref}
      aria-hidden
      className="relative h-32 w-full overflow-hidden bg-ami-cream md:h-44"
    >
      {/* Dotted trail across the section */}
      <motion.svg
        viewBox="0 0 1400 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        style={{ scaleX: trailScale, originX: 0 }}
      >
        <path
          d="M -50 80 Q 350 20 700 50 T 1450 10"
          fill="none"
          stroke="#D946D9"
          strokeWidth="2"
          strokeDasharray="2 8"
          strokeLinecap="round"
          opacity="0.6"
        />
      </motion.svg>

      {/* Plane SVG */}
      <motion.div
        style={{ x, y }}
        className="absolute top-1/2 -translate-y-1/2"
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="-rotate-12 drop-shadow-[0_4px_20px_rgba(217,70,217,0.4)]"
        >
          <path
            d="M2 38 L24 32 L36 8 L42 8 L34 34 L52 30 L58 22 L62 24 L56 36 L62 40 L60 44 L46 42 L40 50 L48 54 L46 58 L34 50 L20 54 L18 50 L26 44 L8 46 L2 42 Z"
            fill="url(#plane-grad)"
          />
          <defs>
            <linearGradient id="plane-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#A020B0" />
              <stop offset="100%" stopColor="#D946D9" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </section>
  );
}
