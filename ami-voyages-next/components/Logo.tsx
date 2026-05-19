'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  monochrome?: boolean;
  animateOnHover?: boolean;
  /** Override default size classes (e.g. `h-16 sm:h-20`) */
  sizeClassName?: string;
}

/**
 * Ami Voyages logo — uses the official PNG at `/public/images/logo-ami-voyages.png`.
 *
 * Visual treatment to make it pop:
 * - **Drop-shadow glow** : two layered mauve/magenta drop-shadows.
 * - **Animated halo** : soft pulsing mauve disc blurred behind the logo.
 * - **Hover lift** : slight upward translation + scale + intensified glow.
 */
export default function Logo({
  className = '',
  monochrome = false,
  animateOnHover = true,
  sizeClassName = 'h-12 sm:h-14 md:h-16',
}: LogoProps) {
  return (
    <motion.div
      className={`relative inline-flex items-center ${className}`}
      whileHover={animateOnHover ? 'hover' : undefined}
      initial="rest"
      animate="rest"
    >
      {/* Pulsing halo behind the logo */}
      <motion.span
        aria-hidden
        variants={{
          rest: { opacity: 0.35, scale: 1 },
          hover: { opacity: 0.7, scale: 1.15 },
        }}
        animate={{
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{
          opacity: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[140%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ami-magenta/40 blur-2xl"
      />

      {/* Logo image with drop-shadow glow */}
      <motion.div
        variants={{
          rest: { y: 0, scale: 1 },
          hover: { y: -3, scale: 1.05 },
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 16 }}
        className="relative z-10"
      >
        <Image
          src="/images/logo-ami-voyages.png"
          alt="Ami Voyages"
          width={244}
          height={93}
          priority
          className={`w-auto ${sizeClassName}`}
          style={{
            filter: monochrome
              ? 'brightness(0) invert(1) drop-shadow(0 0 12px rgba(217,70,217,0.55)) drop-shadow(0 6px 16px rgba(0,0,0,0.35))'
              : 'drop-shadow(0 0 14px rgba(217,70,217,0.55)) drop-shadow(0 0 28px rgba(232,121,232,0.35)) drop-shadow(0 6px 18px rgba(0,0,0,0.45))',
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/**
 * Logo for the loader screen — big, centered, with a pulsing aura.
 */
export function LogoTraced({ className = '' }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      {/* Soft outer halo */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.6, scale: 1.5 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="absolute inset-0 rounded-full bg-ami-magenta/40 blur-3xl"
      />

      {/* Sharper inner glow */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full bg-ami-magenta-soft/30 blur-2xl"
      />

      <Image
        src="/images/logo-ami-voyages.png"
        alt="Ami Voyages"
        width={244}
        height={93}
        priority
        className="relative h-auto w-full"
        style={{
          filter:
            'drop-shadow(0 0 18px rgba(217,70,217,0.7)) drop-shadow(0 0 32px rgba(232,121,232,0.45)) drop-shadow(0 8px 24px rgba(0,0,0,0.4))',
        }}
      />
    </motion.div>
  );
}
