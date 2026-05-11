'use client';

import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import { partners } from '@/data/content';

export default function PartnersMarquee() {
  // Duplicate list for seamless infinite loop
  const list = [...partners.list, ...partners.list];

  return (
    <section
      id="partners"
      aria-label="Nos partenaires aériens"
      className="relative bg-ami-cream py-12 md:py-16"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 sm:px-8 lg:flex-row lg:items-center lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="shrink-0"
        >
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-ami-magenta">
            <Plane className="h-3.5 w-3.5" />
            {partners.eyebrow}
          </div>
          <p className="mt-2 max-w-xs font-display text-2xl font-bold leading-tight text-ami-ink lg:text-3xl">
            17 compagnies de confiance
          </p>
        </motion.div>

        {/* Marquee */}
        <div className="group relative flex-1 overflow-hidden">
          {/* Gradient edge masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ami-cream to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ami-cream to-transparent" />

          <div className="flex w-max animate-marquee items-center gap-12 group-hover:[animation-play-state:paused]">
            {list.map((name, i) => (
              <PartnerLogo key={`${name}-${i}`} name={name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnerLogo({ name }: { name: string }) {
  return (
    <div
      className="group/p flex h-14 items-center gap-3 rounded-2xl border border-ami-purple/15 bg-white px-5 py-3 shadow-sm transition-all hover:border-ami-magenta/40 hover:shadow-md"
      title={name}
    >
      {/* Generic stylized logo mark */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ami-purple to-ami-magenta">
        <Plane className="h-4 w-4 -rotate-45 text-white" strokeWidth={2.5} />
      </div>
      <span className="whitespace-nowrap font-display text-base font-semibold text-ami-ink/85 transition-colors group-hover/p:text-ami-purple">
        {name}
      </span>
    </div>
  );
}
