'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Check, Star, ChevronDown, ArrowUpRight } from 'lucide-react';
import RevealText from './RevealText';
import SearchBar from './SearchBar';
import { hero, destinations } from '@/data/content';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const asia = destinations.cards[0];
  const africa = destinations.cards[1];

  return (
    <section
      id="hero"
      ref={ref}
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden pt-28 pb-20"
      style={{ minHeight: '900px' }}
    >
      {/* Animated mauve gradient base */}
      <div className="absolute inset-0 hero-gradient" aria-hidden />

      {/* Parallax photo layer */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-0"
        aria-hidden
      >
        <div className="relative h-[120%] w-full">
          <Image
            src={hero.bgImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-55 mix-blend-luminosity"
          />
        </div>
      </motion.div>

      {/* Dark gradient overlay for legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-ami-purple-deep/70 via-ami-purple/40 to-ami-purple-deep/85"
        aria-hidden
      />

      {/* Topographic pattern */}
      <div className="absolute inset-0 topo-bg opacity-25" aria-hidden />

      {/* Glow blobs */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-32 top-32 h-96 w-96 rounded-full bg-ami-magenta/30 blur-[120px]"
        aria-hidden
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-32 bottom-20 h-[28rem] w-[28rem] rounded-full bg-ami-purple-vivid/40 blur-[140px]"
        aria-hidden
      />

      {/* Content — grid layout with side cards on lg+ */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-8 px-4 sm:px-8 lg:grid-cols-[230px_1fr_230px] lg:gap-6 xl:grid-cols-[260px_1fr_260px] xl:gap-10"
      >
        {/* LEFT — Asie du Sud card (lg+) */}
        <HeroRegionCard card={asia} side="left" maxCountries={5} />

        {/* CENTER — main content */}
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ami-magenta" />
            {hero.eyebrow}
          </motion.span>

          <h1 className="relative max-w-3xl text-balance font-display text-5xl font-extrabold leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem]">
            <RevealText
              as="span"
              text={hero.title.pre}
              className="block"
              delay={2.6}
            />
            <RevealText
              as="span"
              text={hero.title.accent}
              className="block text-gradient-magenta"
              delay={2.9}
              stagger={0.08}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.6, duration: 0.8 }}
            className="mt-7 max-w-xl text-balance text-base text-white/85 sm:text-lg"
          >
            {hero.subtitle}
          </motion.p>

          {/* Region pills — visible only below lg (replaces side cards on small screens) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.18, delayChildren: 3.85 } },
            }}
            className="mt-7 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:hidden"
            aria-label="Régions de spécialité"
          >
            {destinations.cards.map((card) => (
              <motion.a
                key={card.id}
                href="#destinations"
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.92 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                data-cursor="Voir"
                className="group/r flex items-center gap-3 rounded-full border border-white/25 bg-white/10 py-2.5 pl-2.5 pr-5 backdrop-blur-xl transition-colors hover:border-ami-magenta-soft hover:bg-white/15 sm:gap-4"
              >
                <span className="flex -space-x-1.5">
                  {card.countries.slice(0, 4).map((c, i) => (
                    <span
                      key={c.name}
                      style={{ zIndex: 10 - i }}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-ami-purple-deep/60 bg-white/20 text-base ring-1 ring-white/20"
                    >
                      {c.flag}
                    </span>
                  ))}
                  {card.countries.length > 4 && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-ami-purple-deep/60 bg-ami-magenta text-[10px] font-bold text-white">
                      +{card.countries.length - 4}
                    </span>
                  )}
                </span>
                <span className="font-display text-sm font-bold text-white sm:text-base">
                  {card.title}
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-ami-magenta-soft transition-transform group-hover/r:rotate-45"
                  strokeWidth={2.5}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Search bar */}
          <div className="mt-8 w-full">
            <SearchBar />
          </div>

          {/* Floating badges */}
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: 4 } },
            }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {hero.badges.map((badge, i) => (
              <motion.li
                key={badge.label}
                variants={{
                  hidden: { opacity: 0, y: 16, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  y: { duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md sm:text-sm"
              >
                {badge.icon === 'check' ? (
                  <Check className="h-4 w-4 text-ami-magenta-soft" strokeWidth={2.5} />
                ) : (
                  <Star className="h-4 w-4 fill-ami-magenta-soft text-ami-magenta-soft" />
                )}
                {badge.label}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* RIGHT — Afrique Subsaharienne card (lg+) */}
        <HeroRegionCard card={africa} side="right" maxCountries={9} />
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#partners"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70 hover:text-white"
        aria-label="Découvrir la suite"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">{hero.scrollLabel}</span>
        <div className="relative flex h-9 w-5 justify-center rounded-full border border-white/40">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-1.5 h-1.5 w-1 rounded-full bg-white"
          />
        </div>
        <ChevronDown className="h-4 w-4 animate-bounce" strokeWidth={2} />
      </motion.a>
    </section>
  );
}

// =====================================================================
// Floating region card on the sides of the hero (desktop only).
// =====================================================================
type CardData = (typeof destinations.cards)[number];

function HeroRegionCard({
  card,
  side,
  maxCountries,
}: {
  card: CardData;
  side: 'left' | 'right';
  maxCountries: number;
}) {
  const shown = card.countries.slice(0, maxCountries);
  const extra = card.countries.length - maxCountries;
  const cols = shown.length > 5 ? 'grid-cols-2' : 'grid-cols-1';

  return (
    <motion.aside
      initial={{ opacity: 0, x: side === 'left' ? -40 : 40, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 3.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="hidden lg:block"
      aria-label={card.title}
    >
      <a
        href="#destinations"
        data-cursor="Voir"
        className="group/card relative block overflow-hidden rounded-3xl border border-white/25 bg-white/10 shadow-2xl backdrop-blur-2xl transition-shadow hover:shadow-ami-glow-strong"
        style={{
          boxShadow:
            '0 30px 80px -20px rgba(93, 26, 107, 0.7), inset 0 1px 0 rgba(255,255,255,0.25)',
        }}
      >
        {/* Header strip */}
        <div className="relative overflow-hidden bg-gradient-to-r from-ami-purple-deep via-ami-purple to-ami-magenta px-4 py-3">
          <div className="absolute inset-0 topo-bg opacity-30" aria-hidden />
          <div
            className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-ami-magenta-soft/40 blur-2xl"
            aria-hidden
          />
          <h3 className="relative font-display text-[12px] font-extrabold uppercase tracking-[0.22em] text-white">
            {card.title}
          </h3>
        </div>

        {/* Country list */}
        <ul className={`grid gap-2 px-4 py-4 ${cols}`}>
          {shown.map((c, i) => (
            <motion.li
              key={c.name}
              initial={{ opacity: 0, x: side === 'left' ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.7 + i * 0.04, duration: 0.4 }}
              className="flex items-center gap-2 text-[13px] font-medium leading-tight text-white/90"
            >
              <span className="text-base leading-none">{c.flag}</span>
              <span className="truncate">{c.name}</span>
            </motion.li>
          ))}
          {extra > 0 && (
            <li
              className={`flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-ami-magenta-soft ${
                shown.length > 5 ? 'col-span-2' : ''
              }`}
            >
              <span className="h-px flex-1 bg-ami-magenta-soft/40" />
              + {extra} autres pays
              <span className="h-px flex-1 bg-ami-magenta-soft/40" />
            </li>
          )}
        </ul>

        {/* Footer CTA */}
        <div className="flex items-center justify-between border-t border-white/10 bg-black/15 px-4 py-2.5">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">
            Découvrir
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ami-magenta text-white transition-transform group-hover/card:rotate-45">
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        </div>
      </a>
    </motion.aside>
  );
}
