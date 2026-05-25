'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';
import { partners, type Partner } from '@/data/content';

const LOGO_TOKEN = 'pk_X-1ZO13GSgeOoUrIuJ6GMQ';

function logoUrl(p: Partner) {
  if (p.logo) return p.logo;
  return `https://img.logo.dev/${p.domain}?token=${LOGO_TOKEN}&size=200&format=png&retina=true`;
}

export default function PartnersMarquee() {
  // Duplicate list for seamless infinite loop
  const list = [...partners.list, ...partners.list];

  return (
    <section
      id="partners"
      aria-label="Nos partenaires aériens"
      className="relative bg-ami-cream py-16 md:py-24"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-4 sm:px-8 lg:flex-row lg:items-center lg:gap-14">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="shrink-0"
        >
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-ami-magenta">
            <Plane className="h-3.5 w-3.5 -rotate-45" />
            {partners.eyebrow}
          </div>
          <p className="mt-2 max-w-xs font-display text-2xl font-bold leading-tight text-ami-ink lg:text-3xl">
            {partners.list.length} compagnies de confiance
          </p>
          <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-ami-ink/60">
            Tarifs négociés et conditions de bagages privilégiées sur chacune d’elles.
          </p>
        </motion.div>

        {/* Marquee */}
        <div className="group relative flex-1 overflow-hidden">
          {/* Gradient edge masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ami-cream to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ami-cream to-transparent" />

          <div className="flex w-max animate-marquee items-center gap-5 group-hover:[animation-play-state:paused]">
            {list.map((p, i) => (
              <PartnerCard key={`${p.iata}-${i}`} partner={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Partner card — tries to load the real airline logo via logo.dev,
// falls back to a brand-colored typographic plate if the image errors.
// ---------------------------------------------------------------------
function PartnerCard({ partner }: { partner: Partner }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <PartnerFallbackCard partner={partner} />;
  }

  return (
    <motion.a
      href="#destinations"
      whileHover={{ y: -4, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className="group/p relative flex h-24 w-[220px] shrink-0 items-center gap-4 overflow-hidden rounded-2xl border border-ami-purple/10 bg-white px-4 py-3 shadow-sm transition-shadow hover:border-ami-magenta/35 hover:shadow-ami-glow"
      title={partner.name}
      data-cursor="Voir"
    >
      {/* Brand color accent stripe on left edge */}
      <span
        aria-hidden
        className="absolute inset-y-3 left-0 w-[3px] rounded-r-full"
        style={{ backgroundColor: partner.bg }}
      />

      {/* Logo image */}
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-ami-cream/60 p-1.5">
        <Image
          src={logoUrl(partner)}
          alt={`${partner.name} logo`}
          width={64}
          height={64}
          unoptimized
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Name + IATA */}
      <div className="flex min-w-0 flex-col leading-tight">
        <span className="truncate font-display text-sm font-extrabold text-ami-ink">
          {partner.name}
        </span>
        <span className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-ami-purple/70">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: partner.bg }}
          />
          {partner.iata} · partenaire
        </span>
      </div>
    </motion.a>
  );
}

// ---------------------------------------------------------------------
// Fallback — brand-colored typographic card if remote logo fails.
// ---------------------------------------------------------------------
function PartnerFallbackCard({ partner }: { partner: Partner }) {
  const textColor = partner.text || '#FFFFFF';
  const accent = partner.accent || '#FFFFFF';
  const isLightBg = partner.text === '#1A1A1A';

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className="group/p relative flex h-24 w-[220px] shrink-0 items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 shadow-lg ring-1 ring-black/5"
      style={{
        backgroundColor: partner.bg,
        color: textColor,
        boxShadow: `0 10px 30px -10px ${partner.bg}80, 0 4px 12px -4px rgba(0,0,0,0.2)`,
      }}
      title={partner.name}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ backgroundColor: isLightBg ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.45)' }}
      />

      {/* IATA badge */}
      <span
        className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-[15px] font-extrabold tracking-tighter"
        style={{
          backgroundColor: isLightBg ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.18)',
          color: accent,
        }}
      >
        {partner.iata}
      </span>

      <div className="relative flex min-w-0 flex-col leading-tight">
        <span
          className="truncate font-display text-[13px] font-extrabold uppercase tracking-tight"
          style={{ color: textColor }}
        >
          {partner.name}
        </span>
        <span
          className="mt-1 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] opacity-85"
          style={{ color: accent }}
        >
          <Plane className="h-2.5 w-2.5 -rotate-45" strokeWidth={2.5} />
          Partenaire officiel
        </span>
      </div>
    </motion.div>
  );
}
