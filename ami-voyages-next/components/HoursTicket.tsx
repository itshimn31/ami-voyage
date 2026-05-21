'use client';

import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import { contact } from '@/data/content';

/**
 * Floating boarding-pass-style ticket that displays the agency's opening
 * hours. Dark mauve gradient with side notches (SVG mask), a dashed
 * separator between the hours block and a "VOYAGE" stamp on the right.
 *
 * Used in the Hero so the hours are immediately visible when a visitor
 * lands on the site.
 */
export default function HoursTicket({ className = '' }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 2.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.03 }}
      className={`relative inline-block ${className}`}
      role="img"
      aria-label={`Horaires d’ouverture : ${contact.hours.full}`}
    >
      <svg
        viewBox="0 0 320 110"
        preserveAspectRatio="none"
        className="block h-[110px] w-[320px] drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
      >
        <defs>
          {/* Mauve gradient body */}
          <linearGradient id="ticket-grad" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="#3D1147" />
            <stop offset="55%" stopColor="#2A0A33" />
            <stop offset="100%" stopColor="#1A0822" />
          </linearGradient>

          {/* Subtle topo overlay */}
          <pattern
            id="ticket-topo"
            patternUnits="userSpaceOnUse"
            width="80"
            height="80"
          >
            <circle cx="40" cy="40" r="20" fill="none" stroke="white" strokeWidth="0.4" opacity="0.08" />
            <circle cx="40" cy="40" r="36" fill="none" stroke="white" strokeWidth="0.4" opacity="0.08" />
          </pattern>

          {/* Notch mask — punches semicircles into the left & right edges */}
          <mask id="ticket-notches">
            <rect x="0" y="0" width="320" height="110" rx="14" ry="14" fill="white" />
            <circle cx="0" cy="55" r="11" fill="black" />
            <circle cx="320" cy="55" r="11" fill="black" />
          </mask>
        </defs>

        {/* Ticket body */}
        <g mask="url(#ticket-notches)">
          <rect width="320" height="110" fill="url(#ticket-grad)" />
          <rect width="320" height="110" fill="url(#ticket-topo)" />
          {/* Top edge highlight */}
          <rect x="0" y="0" width="320" height="1" fill="#D946D9" opacity="0.4" />
          {/* Magenta glow blob top-right */}
          <circle cx="280" cy="20" r="40" fill="#D946D9" opacity="0.18" />
        </g>

        {/* Dashed vertical separator between hours and stamp */}
        <line
          x1="232"
          y1="14"
          x2="232"
          y2="96"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
          strokeDasharray="2 3"
        />
      </svg>

      {/* Content overlay */}
      <div className="absolute inset-0 flex">
        {/* LEFT — opening hours */}
        <div className="flex flex-1 flex-col justify-center gap-0.5 pl-6 pr-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">
            Ouvert
          </span>
          <span className="font-display text-[15px] font-extrabold leading-tight text-white">
            du <span className="text-ami-magenta-soft">lundi</span> au{' '}
            <span className="text-ami-magenta-soft">samedi</span>
          </span>
          <span className="font-display text-[15px] font-extrabold leading-tight text-white">
            de <span className="text-ami-magenta-soft">10h</span> à{' '}
            <span className="text-ami-magenta-soft">18h30</span>
          </span>
          <span className="text-[10px] italic tracking-wide text-white/60">
            sans interruption
          </span>
        </div>

        {/* RIGHT — "VOYAGE" stamp */}
        <div className="flex w-[68px] flex-col items-center justify-center pr-3">
          <motion.div
            animate={{ rotate: [-15, -8, -15], y: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Plane
              className="h-6 w-6 text-ami-magenta-soft"
              strokeWidth={2}
              fill="currentColor"
              fillOpacity={0.15}
            />
          </motion.div>
          <span
            className="mt-2 font-display text-[11px] font-extrabold uppercase tracking-[0.25em] text-white/90"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
            }}
          >
            Voyage
          </span>
        </div>
      </div>
    </motion.div>
  );
}
