'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionTitle from './SectionTitle';
import MagneticButton from './MagneticButton';
import { themes } from '@/data/content';

/**
 * 3D stacked card carousel — three mauve theme cards rotate through
 * front/left/right positions with depth, auto-advance every 6s, and
 * support manual prev/next + click-on-side-card to bring it forward.
 */
export default function ThemesCarousel() {
  const items = themes.items;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % items.length);
    }, 6000);
    return () => clearInterval(id);
  }, [items.length, paused]);

  const next = () => setActive((a) => (a + 1) % items.length);
  const prev = () => setActive((a) => (a - 1 + items.length) % items.length);

  return (
    <section
      id="themes"
      className="relative isolate overflow-hidden bg-ami-purple-deep py-24 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background */}
      <div className="absolute inset-0 hero-gradient opacity-40" aria-hidden />
      <div className="absolute inset-0 topo-bg opacity-20" aria-hidden />
      <div
        className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-ami-magenta/25 blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute -right-32 bottom-20 h-[28rem] w-[28rem] rounded-full bg-ami-purple-vivid/30 blur-[140px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionTitle
          eyebrow={themes.eyebrow}
          title={themes.title}
          subtitle={themes.subtitle}
          align="center"
          light
        />

        {/* Carousel stage */}
        <div className="relative mt-16 flex h-[600px] items-center justify-center md:h-[580px]">
          {/* Cards */}
          <div className="relative h-full w-full" style={{ perspective: '1200px' }}>
            {items.map((item, i) => {
              const delta = ((i - active) % items.length + items.length) % items.length;
              const position: 'center' | 'right' | 'left' =
                delta === 0 ? 'center' : delta === 1 ? 'right' : 'left';
              return (
                <ThemeCard
                  key={item.id}
                  item={item}
                  position={position}
                  onClick={() => setActive(i)}
                  isActive={position === 'center'}
                />
              );
            })}
          </div>

          {/* Side controls */}
          <button
            type="button"
            onClick={prev}
            aria-label="Thème précédent"
            data-cursor="Préc."
            className="absolute left-2 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-ami-magenta sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Thème suivant"
            data-cursor="Suiv."
            className="absolute right-2 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-ami-magenta sm:right-6"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
          </button>

          {/* Vertical dot indicators (right) */}
          <div className="absolute right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex xl:right-12">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Aller au thème ${i + 1}`}
                className="group/d flex h-8 w-3 items-center justify-center"
              >
                <span
                  className={`h-3 rounded-full transition-all ${
                    i === active
                      ? 'h-10 w-3 bg-ami-magenta shadow-[0_0_12px_2px_rgba(217,70,217,0.5)]'
                      : 'w-3 bg-white/30 group-hover/d:bg-white/60'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative mx-auto mt-2 max-w-md">
          <div className="h-px w-full bg-white/15">
            <AnimatePresence mode="wait">
              <motion.div
                key={`progress-${active}-${paused}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: paused ? 0 : 1 }}
                transition={{ duration: paused ? 0 : 6, ease: 'linear' }}
                className="h-px origin-left bg-gradient-to-r from-ami-magenta to-ami-magenta-soft"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------
// Single card — 3D positioning based on its current slot
// ---------------------------------------------------------------------
type ThemeItem = (typeof themes.items)[number];

function ThemeCard({
  item,
  position,
  onClick,
  isActive,
}: {
  item: ThemeItem;
  position: 'center' | 'left' | 'right';
  onClick: () => void;
  isActive: boolean;
}) {
  const variants = {
    center: {
      x: '-50%',
      y: '-50%',
      scale: 1,
      opacity: 1,
      rotateY: 0,
      zIndex: 30,
      filter: 'brightness(1)',
    },
    left: {
      x: 'calc(-50% - 280px)',
      y: '-50%',
      scale: 0.82,
      opacity: 0.45,
      rotateY: 18,
      zIndex: 10,
      filter: 'brightness(0.65)',
    },
    right: {
      x: 'calc(-50% + 280px)',
      y: '-50%',
      scale: 0.82,
      opacity: 0.45,
      rotateY: -18,
      zIndex: 10,
      filter: 'brightness(0.65)',
    },
  };

  return (
    <motion.article
      animate={variants[position]}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onClick={!isActive ? onClick : undefined}
      data-cursor={isActive ? undefined : 'Voir'}
      className={`absolute left-1/2 top-1/2 w-[88%] max-w-[440px] origin-center overflow-hidden rounded-[28px] shadow-ami-glow-strong sm:w-[420px] ${
        !isActive ? 'cursor-pointer' : ''
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 640px) 420px, 88vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ami-purple-deep via-ami-purple-deep/30 to-transparent" />
        <div className="absolute inset-0 bg-ami-purple/15 mix-blend-multiply" />
      </div>

      {/* Body — sits on the mauve gradient panel */}
      <div className="relative bg-gradient-to-br from-ami-purple-deep via-ami-purple to-ami-purple-vivid p-7 sm:p-8">
        <div className="absolute inset-0 topo-bg opacity-25" aria-hidden />
        <div
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ami-magenta/30 blur-3xl"
          aria-hidden
        />

        <div className="relative">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-ami-magenta-soft">
            <span className="h-px w-6 bg-ami-magenta-soft" />
            {item.eyebrow}
          </span>
          <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
            {item.text}
          </p>

          <MagneticButton
            href="#contact"
            cursorLabel="Voir"
            ariaLabel={`${item.cta} — ${item.title}`}
          >
            <span className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-bold text-ami-purple-deep shadow-md transition-colors hover:bg-ami-magenta-soft hover:text-white">
              {item.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </span>
          </MagneticButton>
        </div>
      </div>
    </motion.article>
  );
}
