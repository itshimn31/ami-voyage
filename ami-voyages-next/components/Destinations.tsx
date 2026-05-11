'use client';

import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import SectionTitle from './SectionTitle';
import DestinationCard from './DestinationCard';
import MagneticButton from './MagneticButton';
import { destinations } from '@/data/content';

export default function Destinations() {
  return (
    <section
      id="destinations"
      className="relative overflow-hidden bg-ami-cream py-28 md:py-36"
    >
      {/* Subtle topographic */}
      <div className="absolute inset-0 topo-bg-purple opacity-25" aria-hidden />

      {/* Stylized continent outlines (decorative) */}
      <AsiaOutline className="absolute left-0 top-40 hidden text-ami-purple/15 lg:block" />
      <AfricaOutline className="absolute right-0 top-32 hidden text-ami-purple/15 lg:block" />

      {/* Dotted circle background decoration */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
        className="absolute left-1/2 top-32 -translate-x-1/2"
      >
        <svg width="560" height="560" viewBox="0 0 200 200" className="text-ami-purple/10">
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="1.5 5"
          />
        </svg>
      </motion.div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8">
        {/* Floating "Réserver" CTA pill at the top */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex justify-center"
        >
          <MagneticButton href="#contact" cursorLabel="Réserver" ariaLabel="Réserver mon voyage">
            <span className="group/r inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-ami-purple-vivid via-ami-magenta to-ami-magenta-soft px-7 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-ami-glow transition-shadow hover:shadow-ami-glow-strong">
              <Plane className="h-4 w-4 -rotate-45 transition-transform group-hover/r:translate-x-1 group-hover/r:-translate-y-1" strokeWidth={2.5} />
              Réserver
            </span>
          </MagneticButton>
        </motion.div>

        <SectionTitle
          eyebrow={destinations.eyebrow}
          title={destinations.title}
          ghost={destinations.ghostTitle}
          subtitle={destinations.subtitle}
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {destinations.cards.map((card, i) => (
            <DestinationCard
              key={card.id}
              index={i}
              title={card.title}
              description={card.description}
              cta={card.cta}
              image={card.image}
              imageAlt={card.imageAlt}
              countries={card.countries}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Simplified Asia (focus: Indian subcontinent) outline — abstract
// ---------------------------------------------------------------------
function AsiaOutline({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      aria-hidden
      width="380"
      height="420"
      viewBox="0 0 380 420"
      className={className}
      fill="none"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
    >
      <motion.path
        d="M 120 30 Q 170 20 220 40 Q 260 60 270 110 Q 280 150 250 180 Q 240 200 260 230 Q 280 260 250 290 Q 220 320 200 360 L 180 400 L 160 360 Q 130 320 110 290 Q 90 260 100 230 Q 110 200 90 180 Q 60 150 70 110 Q 80 60 120 30 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="3 4"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: 'easeInOut' }}
      />
      {/* Marker pins */}
      <circle cx="180" cy="180" r="4" fill="currentColor" opacity="0.5" />
      <circle cx="160" cy="280" r="4" fill="currentColor" opacity="0.5" />
      <circle cx="220" cy="120" r="4" fill="currentColor" opacity="0.5" />
    </motion.svg>
  );
}

// ---------------------------------------------------------------------
// Simplified Africa outline — abstract
// ---------------------------------------------------------------------
function AfricaOutline({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      aria-hidden
      width="380"
      height="460"
      viewBox="0 0 380 460"
      className={className}
      fill="none"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
    >
      <motion.path
        d="M 150 30 Q 200 20 250 50 Q 290 80 280 130 Q 270 170 290 200 Q 310 240 290 280 Q 270 320 240 350 Q 220 380 200 420 L 180 440 L 160 410 Q 140 380 130 350 Q 110 310 100 270 Q 90 230 100 190 Q 110 150 100 110 Q 90 70 120 50 Q 130 35 150 30 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="3 4"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: 'easeInOut', delay: 0.3 }}
      />
      {/* Marker pins */}
      <circle cx="200" cy="180" r="4" fill="currentColor" opacity="0.5" />
      <circle cx="160" cy="300" r="4" fill="currentColor" opacity="0.5" />
      <circle cx="220" cy="380" r="4" fill="currentColor" opacity="0.5" />
      <circle cx="180" cy="120" r="4" fill="currentColor" opacity="0.5" />
    </motion.svg>
  );
}
