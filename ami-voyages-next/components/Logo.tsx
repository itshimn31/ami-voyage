'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  monochrome?: boolean;
  animateOnHover?: boolean;
}

/**
 * Ami Voyages logo — matches the brand identity exactly.
 *
 *   "Ami"  +  thick mauve V (filled, sharp bottom point)  +  "oyages"
 *
 * V is sized to match the cap height of the surrounding white letters,
 * with a very subtle top-to-bottom gradient for depth.
 */
export default function Logo({
  className = '',
  monochrome = false,
  animateOnHover = true,
}: LogoProps) {
  const vFill = monochrome ? '#ffffff' : 'url(#ami-v-grad)';

  return (
    <motion.div
      className={`group relative inline-flex items-center ${className}`}
      whileHover={animateOnHover ? 'hover' : undefined}
      initial="rest"
      animate="rest"
    >
      <svg
        viewBox="0 0 320 64"
        className="h-9 w-auto sm:h-10"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Ami Voyages"
      >
        <defs>
          <linearGradient id="ami-v-grad" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="#C84BD8" />
            <stop offset="60%" stopColor="#A030B5" />
            <stop offset="100%" stopColor="#831A95" />
          </linearGradient>
        </defs>

        {/* "Ami" */}
        <text
          x="0"
          y="48"
          fontFamily="var(--font-display), 'Bricolage Grotesque', sans-serif"
          fontWeight="800"
          fontSize="50"
          fill="#ffffff"
          letterSpacing="-0.02em"
        >
          Ami
        </text>

        {/* Thick mauve V — the V of "Voyages" */}
        <motion.path
          d="M 86 10 L 100 10 L 116 38 L 132 10 L 146 10 L 116 54 Z"
          fill={vFill}
          variants={{
            rest: { y: 0, scale: 1 },
            hover: { y: -2, scale: 1.06 },
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 16 }}
          style={{ transformOrigin: '116px 32px' }}
        />

        {/* "oyages" */}
        <text
          x="148"
          y="48"
          fontFamily="var(--font-display), 'Bricolage Grotesque', sans-serif"
          fontWeight="800"
          fontSize="50"
          fill="#ffffff"
          letterSpacing="-0.02em"
        >
          oyages
        </text>
      </svg>
    </motion.div>
  );
}

/**
 * Animated logo for the loader — strokes draw themselves then fill in.
 */
export function LogoTraced({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ami Voyages"
    >
      <defs>
        <linearGradient id="ami-v-grad-trace" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#C84BD8" />
          <stop offset="60%" stopColor="#A030B5" />
          <stop offset="100%" stopColor="#831A95" />
        </linearGradient>
      </defs>

      {/* "Ami" — outline traces, then fills */}
      <motion.text
        x="0"
        y="48"
        fontFamily="var(--font-display), sans-serif"
        fontWeight="800"
        fontSize="50"
        fill="#ffffff"
        fillOpacity="0"
        stroke="#ffffff"
        strokeWidth="1"
        letterSpacing="-0.02em"
        initial={{ pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      >
        Ami
      </motion.text>

      {/* V — outline then fills with mauve */}
      <motion.path
        d="M 86 10 L 100 10 L 116 38 L 132 10 L 146 10 L 116 54 Z"
        stroke="#E879E8"
        strokeWidth="1.5"
        fill="url(#ami-v-grad-trace)"
        initial={{ pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* "oyages" */}
      <motion.text
        x="148"
        y="48"
        fontFamily="var(--font-display), sans-serif"
        fontWeight="800"
        fontSize="50"
        fill="#ffffff"
        fillOpacity="0"
        stroke="#ffffff"
        strokeWidth="1"
        letterSpacing="-0.02em"
        initial={{ pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.4 }}
      >
        oyages
      </motion.text>
    </svg>
  );
}
