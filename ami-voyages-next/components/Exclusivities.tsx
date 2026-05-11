'use client';

import { motion } from 'framer-motion';
import {
  PlaneTakeoff,
  Ticket,
  CreditCard,
  ShieldCheck,
  RefreshCcw,
  ShieldAlert,
  Gift,
  Plane,
  type LucideIcon,
} from 'lucide-react';
import SectionTitle from './SectionTitle';
import { exclusivities } from '@/data/content';

const iconMap: Record<string, LucideIcon> = {
  'plane-route': PlaneTakeoff,
  ticket: Ticket,
  'credit-card': CreditCard,
  'shield-check': ShieldCheck,
  refresh: RefreshCcw,
  shield: ShieldAlert,
  gift: Gift,
};

// Scattered "zigzag" positioning across a 12-column grid
const POSITIONS = [
  'lg:col-start-1 lg:col-span-6',     // 0 — far left, wide
  'lg:col-start-8 lg:col-span-5',     // 1 — far right
  'lg:col-start-2 lg:col-span-6',     // 2 — slightly indented left
  'lg:col-start-7 lg:col-span-6',     // 3 — right side
  'lg:col-start-1 lg:col-span-5',     // 4 — far left tight
  'lg:col-start-7 lg:col-span-5',     // 5 — right
  'lg:col-start-3 lg:col-span-7',     // 6 — centered-ish
];

export default function Exclusivities() {
  return (
    <section
      id="exclusivites"
      className="relative isolate overflow-hidden bg-ami-cream py-28 md:py-36"
    >
      {/* Topo background */}
      <div className="absolute inset-0 topo-bg-purple opacity-40" aria-hidden />

      {/* Decorative dotted circles */}
      <DottedCircle
        size={520}
        className="absolute -right-32 top-1/4 hidden text-ami-purple/20 md:block"
        spinDuration={120}
      />
      <DottedCircle
        size={380}
        className="absolute -left-24 bottom-32 hidden text-ami-magenta/20 lg:block"
        spinDuration={90}
        reverse
      />

      {/* Soft glow blobs */}
      <div
        className="absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-ami-magenta/8 blur-[100px]"
        aria-hidden
      />

      {/* Flying plane decoration */}
      <FlyingPlane />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionTitle
          eyebrow={exclusivities.eyebrow}
          title={exclusivities.title}
          subtitle={exclusivities.subtitle}
        />

        {/* Zigzag scattered grid */}
        <div className="relative mt-20 grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-16">
          {exclusivities.items.map((item, i) => (
            <ZigzagItem
              key={item.title}
              item={item}
              index={i}
              position={POSITIONS[i] || POSITIONS[0]}
            />
          ))}
        </div>

        {/* Big airplane silhouette at bottom-right */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="pointer-events-none absolute -right-20 bottom-10 hidden lg:block"
        >
          <Plane
            className="h-40 w-40 -rotate-12 text-ami-purple/8"
            strokeWidth={1}
          />
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Zigzag item — icon-on-side, slides in from alternating direction,
// floats subtly + dramatic hover lift
// ---------------------------------------------------------------------
function ZigzagItem({
  item,
  index,
  position,
}: {
  item: (typeof exclusivities.items)[number];
  index: number;
  position: string;
}) {
  const Icon = iconMap[item.icon];
  const isRight = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 60 : -60, y: 24 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className={`group/x relative flex items-start gap-5 sm:gap-6 ${position} ${
        isRight ? 'lg:flex-row-reverse lg:text-right' : ''
      }`}
      data-cursor="Voir"
    >
      {/* Icon box — floats and rotates on hover */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 4 + (index % 3) * 0.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="shrink-0"
      >
        <motion.div
          whileHover={{ rotate: isRight ? -10 : 10, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 250, damping: 12 }}
          className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-ami-ink via-ami-purple-deep to-ami-purple shadow-[0_15px_35px_-12px_rgba(93,26,107,0.65)] sm:h-20 sm:w-20"
        >
          {/* Hover glow */}
          <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-ami-magenta/40 opacity-0 blur-2xl transition-opacity duration-500 group-hover/x:opacity-100" />
          {/* Topo overlay */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl topo-bg opacity-20"
            aria-hidden
          />
          {/* Magenta accent corner */}
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-ami-magenta-soft shadow-[0_0_8px_2px_rgba(232,121,232,0.6)]" />

          {Icon && (
            <Icon
              className="relative h-7 w-7 text-ami-magenta-soft transition-colors group-hover/x:text-white sm:h-8 sm:w-8"
              strokeWidth={1.7}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Text */}
      <div className="flex-1 pt-1.5">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-ami-magenta">
          0{index + 1}
        </span>
        <h3 className="mt-1.5 font-display text-xl font-extrabold leading-tight text-ami-ink transition-colors group-hover/x:text-ami-purple sm:text-2xl">
          {item.title}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ami-ink/70 sm:text-base">
          {item.short}
        </p>
        {/* Animated underline that grows on hover */}
        <div className="mt-3 h-px w-12 origin-left bg-gradient-to-r from-ami-purple to-ami-magenta transition-transform duration-500 group-hover/x:scale-x-[6]" />
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------
// Decorative slowly rotating dotted circle (signature element)
// ---------------------------------------------------------------------
function DottedCircle({
  size,
  className = '',
  spinDuration = 90,
  reverse = false,
}: {
  size: number;
  className?: string;
  spinDuration?: number;
  reverse?: boolean;
}) {
  return (
    <motion.div
      aria-hidden
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: spinDuration, repeat: Infinity, ease: 'linear' }}
      className={className}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 200 200" width={size} height={size}>
        <circle
          cx="100"
          cy="100"
          r="98"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 8"
        />
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="1 6"
        />
        {/* Tiny marker dot */}
        <circle cx="100" cy="2" r="4" fill="currentColor" />
      </svg>
    </motion.div>
  );
}

// ---------------------------------------------------------------------
// Flying plane that crosses the section continuously
// ---------------------------------------------------------------------
function FlyingPlane() {
  return (
    <motion.div
      aria-hidden
      animate={{
        x: ['-15vw', '115vw'],
        y: [0, -30, 20, -10, 0],
      }}
      transition={{
        x: { duration: 22, repeat: Infinity, ease: 'linear' },
        y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
      }}
      className="pointer-events-none absolute left-0 top-[60%] z-10 hidden md:block"
    >
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
        <defs>
          <linearGradient id="ex-plane" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A020B0" />
            <stop offset="100%" stopColor="#D946D9" />
          </linearGradient>
        </defs>
        <path
          d="M2 38 L24 32 L36 8 L42 8 L34 34 L52 30 L58 22 L62 24 L56 36 L62 40 L60 44 L46 42 L40 50 L48 54 L46 58 L34 50 L20 54 L18 50 L26 44 L8 46 L2 42 Z"
          fill="url(#ex-plane)"
          opacity="0.6"
        />
      </svg>
    </motion.div>
  );
}
