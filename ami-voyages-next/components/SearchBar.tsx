'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Users,
  Plane,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';
import MagneticButton from './MagneticButton';
import { destinations } from '@/data/content';

/**
 * Quote-request wizard — replaces the misleading "search flights" bar.
 * Three honest steps: destination → dates → travelers → submit.
 * On submit, pre-fills the Contact form via a custom window event and
 * scrolls to the contact section.
 */
export default function SearchBar() {
  const [step, setStep] = useState(0);
  const [destination, setDestination] = useState('');
  const [departure, setDeparture] = useState('');
  const [retour, setRetour] = useState('');
  const [travelers, setTravelers] = useState('2');

  const totalSteps = 3;

  const canAdvance =
    (step === 0 && destination) ||
    (step === 1 && departure && retour) ||
    (step === 2 && travelers);

  const next = () => {
    if (canAdvance && step < totalSteps - 1) setStep(step + 1);
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const submit = () => {
    if (!canAdvance) return;
    // Pre-fill the contact form
    window.dispatchEvent(
      new CustomEvent('ami:prefill-contact', {
        detail: { destination, departure, retour, travelers },
      })
    );
    // Scroll to contact
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-3xl rounded-3xl border border-white/30 bg-white/15 p-5 backdrop-blur-xl sm:p-6"
      style={{
        boxShadow:
          '0 20px 60px -15px rgba(93, 26, 107, 0.6), 0 0 0 1px rgba(217, 70, 217, 0.25), inset 0 1px 0 rgba(255,255,255,0.3)',
      }}
    >
      {/* Step indicator */}
      <div className="flex items-center justify-between gap-2 px-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ami-magenta-soft">
          Étape {step + 1} / {totalSteps}
        </span>
        <div className="flex items-center gap-2">
          {[...Array(totalSteps)].map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === step
                  ? 'w-10 bg-gradient-to-r from-ami-magenta to-ami-magenta-soft shadow-[0_0_10px_rgba(217,70,217,0.5)]'
                  : i < step
                  ? 'w-3 bg-ami-magenta-soft'
                  : 'w-3 bg-white/25'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="relative mt-4 min-h-[80px]">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <StepShell key="s0" icon={<MapPin className="h-5 w-5" />} title="Vers où souhaitez-vous voyager ?">
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                aria-label="Destination"
                className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-base font-medium text-white outline-none transition-colors focus:border-ami-magenta focus:bg-white/15 [&>option]:text-ami-ink"
              >
                <option value="">Choisissez votre destination…</option>
                {destinations.cards.map((card) => (
                  <optgroup key={card.id} label={card.title}>
                    {card.countries.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </StepShell>
          )}

          {step === 1 && (
            <StepShell key="s1" icon={<Calendar className="h-5 w-5" />} title="Quand partez-vous ?">
              <div className="grid grid-cols-2 gap-3">
                <DateInput label="Départ" value={departure} onChange={setDeparture} />
                <DateInput label="Retour" value={retour} onChange={setRetour} min={departure} />
              </div>
            </StepShell>
          )}

          {step === 2 && (
            <StepShell key="s2" icon={<Users className="h-5 w-5" />} title="Combien de voyageurs ?">
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, '6+'].map((n) => {
                  const v = String(n);
                  const selected = travelers === v;
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setTravelers(v)}
                      className={`flex h-12 min-w-[3rem] items-center justify-center rounded-xl border px-4 text-sm font-bold transition-all ${
                        selected
                          ? 'border-ami-magenta bg-ami-magenta text-white shadow-[0_0_20px_rgba(217,70,217,0.4)]'
                          : 'border-white/25 bg-white/10 text-white hover:border-ami-magenta-soft hover:bg-white/15'
                      }`}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            </StepShell>
          )}
        </AnimatePresence>
      </div>

      {/* Footer — nav buttons */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={prev}
          disabled={step === 0}
          aria-label="Étape précédente"
          className={`flex h-11 items-center gap-1.5 rounded-full border border-white/25 px-4 text-xs font-semibold uppercase tracking-wider transition-all ${
            step === 0
              ? 'cursor-not-allowed opacity-30'
              : 'bg-white/10 text-white hover:scale-105 hover:bg-white/15'
          }`}
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
          Précédent
        </button>

        {step < totalSteps - 1 ? (
          <button
            type="button"
            onClick={next}
            disabled={!canAdvance}
            aria-label="Étape suivante"
            data-cursor="Suivant"
            className={`flex h-11 items-center gap-2 rounded-full px-6 text-xs font-bold uppercase tracking-wider transition-all ${
              canAdvance
                ? 'bg-gradient-to-r from-ami-purple-vivid to-ami-magenta text-white shadow-lg hover:scale-105 hover:shadow-ami-glow-strong'
                : 'cursor-not-allowed bg-white/10 text-white/40'
            }`}
          >
            Suivant
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </button>
        ) : (
          <MagneticButton
            type="button"
            onClick={submit}
            cursorLabel="Devis"
            ariaLabel="Recevoir mon devis"
            strength={0.3}
          >
            <span className="group/s flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-ami-purple-vivid via-ami-magenta to-ami-magenta-soft px-6 text-xs font-bold uppercase tracking-wider text-white shadow-ami-glow transition-shadow hover:shadow-ami-glow-strong">
              <Check className="h-4 w-4" strokeWidth={2.5} />
              Recevoir mon devis
              <Plane
                className="h-4 w-4 -rotate-45 transition-transform duration-500 group-hover/s:translate-x-1 group-hover/s:-translate-y-0.5"
                strokeWidth={2.5}
              />
            </span>
          </MagneticButton>
        )}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------
function StepShell({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0"
    >
      <div className="mb-3 flex items-center gap-2 text-ami-magenta-soft">
        {icon}
        <span className="font-display text-base font-bold text-white sm:text-lg">{title}</span>
      </div>
      {children}
    </motion.div>
  );
}

function DateInput({
  label,
  value,
  onChange,
  min,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  min?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
        {label}
      </span>
      <input
        type="date"
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`Date de ${label.toLowerCase()}`}
        style={{ colorScheme: 'dark' }}
        className="rounded-xl border border-white/25 bg-white/10 px-3 py-2.5 text-sm font-medium text-white outline-none transition-colors focus:border-ami-magenta focus:bg-white/15"
      />
    </label>
  );
}
