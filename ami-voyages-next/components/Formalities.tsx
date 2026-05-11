'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, BookOpen, Stamp, FileText, ArrowRight } from 'lucide-react';
import SectionTitle from './SectionTitle';
import MagneticButton from './MagneticButton';
import { formalities } from '@/data/content';

const iconMap = {
  passport: BookOpen,
  stamp: Stamp,
  docs: FileText,
};

export default function Formalities() {
  const [active, setActive] = useState(0);
  const slides = formalities.slides;

  const prev = () => setActive((a) => (a - 1 + slides.length) % slides.length);
  const next = () => setActive((a) => (a + 1) % slides.length);

  const Icon = iconMap[slides[active].icon as keyof typeof iconMap];

  return (
    <section
      id="formalites"
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      {/* Subtle topo decoration */}
      <div className="absolute inset-0 topo-bg-purple opacity-15" aria-hidden />

      {/* Large rotating dotted circle decoration (matches reference) */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 130, repeat: Infinity, ease: 'linear' }}
        className="absolute -left-32 bottom-10 hidden md:block"
      >
        <svg width="480" height="480" viewBox="0 0 200 200" className="text-ami-purple/15">
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeDasharray="1.5 5"
          />
          <circle
            cx="100"
            cy="100"
            r="74"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="1 6"
          />
          <circle cx="100" cy="2" r="3" fill="currentColor" />
        </svg>
      </motion.div>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
        {/* LEFT — title + dark mauve carousel panel */}
        <div>
          <SectionTitle
            eyebrow={formalities.eyebrow}
            title={formalities.title}
            ghost={formalities.ghostTitle}
          />

          {/* Sub-title with mauve emphasis */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-xl font-display text-xl font-bold text-ami-ink/85 sm:text-2xl"
          >
            Formalités{' '}
            <span className="relative inline-block text-ami-purple">
              pour les ressortissants d’autres pays
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-ami-purple to-ami-magenta"
              />
            </span>
          </motion.p>

          {/* Dark mauve carousel panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-ami-ink via-ami-purple-deep to-ami-purple p-8 shadow-ami-glow sm:p-10"
          >
            {/* Topographic */}
            <div className="absolute inset-0 topo-bg opacity-25" aria-hidden />
            {/* Glow */}
            <div
              className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-ami-magenta/25 blur-3xl"
              aria-hidden
            />
            {/* Top accent bar */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ami-magenta to-transparent" />

            {/* Header — icon + controls */}
            <div className="relative flex items-start justify-between gap-4">
              <motion.div
                animate={{ rotate: [0, -6, 0, 6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-ami-magenta to-ami-magenta-soft text-white shadow-lg"
              >
                <Icon className="h-6 w-6" strokeWidth={2} />
              </motion.div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Précédent"
                  data-cursor="Préc."
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-ami-magenta hover:bg-ami-magenta"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Suivant"
                  data-cursor="Suiv."
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-ami-magenta hover:bg-ami-magenta"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Slide content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 30, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -30, filter: 'blur(4px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative mt-7"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-ami-magenta-soft">
                  Étape {active + 1} / {slides.length}
                </div>
                <h3 className="mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
                  {slides[active].title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
                  {formalities.paragraph}
                </p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
                  {slides[active].text}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Dots + CTA */}
            <div className="relative mt-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Aller à l'étape ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === active
                        ? 'w-10 bg-gradient-to-r from-ami-magenta to-ami-magenta-soft shadow-[0_0_10px_2px_rgba(217,70,217,0.4)]'
                        : 'w-3 bg-white/25 hover:bg-white/45'
                    }`}
                  />
                ))}
              </div>

              <MagneticButton href="#contact" cursorLabel="Voir" ariaLabel="En savoir plus sur les formalités">
                <span className="group/cta inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-ami-purple-deep shadow-md transition-colors hover:bg-ami-magenta-soft hover:text-white">
                  En savoir plus
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5" strokeWidth={2.5} />
                </span>
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-ami-glow lg:aspect-[5/6]"
        >
          <Image
            src={formalities.image}
            alt={formalities.imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ami-purple-deep/70 via-transparent to-transparent" />

          {/* Dotted circle on image */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            className="absolute right-8 top-8 h-24 w-24 rounded-full border-2 border-dashed border-white/35"
          />

          {/* Floating ticket card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/25 bg-white/15 p-5 text-white backdrop-blur-xl sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-xs"
          >
            <div className="text-[11px] uppercase tracking-widest text-ami-magenta-soft">
              Voyage serein
            </div>
            <p className="mt-1.5 font-display text-lg font-bold leading-tight">
              On vous accompagne sur toutes les démarches administratives.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
