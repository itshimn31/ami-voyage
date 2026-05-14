'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  MapPin,
  Train,
  Clock,
  Mail,
  Facebook,
  Plane,
  ArrowRight,
  Sparkles,
  Check,
} from 'lucide-react';
import SectionTitle from './SectionTitle';
import MagneticButton from './MagneticButton';
import { contact, contactSection } from '@/data/content';

export default function ContactSection() {
  const f = contactSection.fields;
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ami-cream py-24 md:py-32"
    >
      {/* Subtle topo backdrop */}
      <div className="absolute inset-0 topo-bg-purple opacity-25" aria-hidden />

      {/* Decorative rotating circle */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
        className="absolute -right-40 top-1/4 hidden lg:block"
      >
        <svg width="500" height="500" viewBox="0 0 200 200" className="text-ami-purple/12">
          <circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1.5 5" />
          <circle cx="100" cy="2" r="3" fill="currentColor" />
        </svg>
      </motion.div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionTitle
          eyebrow={contactSection.eyebrow}
          title={contactSection.title}
          subtitle={contactSection.intro}
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[5fr_7fr] lg:gap-8">
          {/* =========================================================== */}
          {/* LEFT — info card                                            */}
          {/* =========================================================== */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-ami-purple-deep via-ami-purple to-ami-purple-vivid p-8 text-white shadow-ami-glow sm:p-10"
          >
            <div className="absolute inset-0 topo-bg opacity-25" aria-hidden />
            <div
              className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-ami-magenta/30 blur-[100px]"
              aria-hidden
            />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ami-magenta to-transparent" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-ami-magenta-soft">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
                Agence Paris
              </span>
              <h3 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
                Contactez-nous
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
                Pour de plus amples informations, remplissez notre formulaire ou contactez-nous directement.
              </p>

              <ul className="mt-8 space-y-4">
                {contact.phones.map((phone, i) => (
                  <ContactRow key={phone} icon={<Phone className="h-4 w-4" />} highlight={i === 0}>
                    <a
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="font-bold tracking-wide hover:text-ami-magenta-soft"
                    >
                      {phone}
                    </a>
                  </ContactRow>
                ))}
                <ContactRow icon={<MapPin className="h-4 w-4" />}>
                  {contact.address.street}
                  <br />
                  {contact.address.zip} {contact.address.city}
                </ContactRow>
                <ContactRow icon={<Train className="h-4 w-4" />}>
                  {contact.address.metro}
                </ContactRow>
                <ContactRow icon={<Clock className="h-4 w-4" />}>{contact.hours.full}</ContactRow>
                <ContactRow icon={<Mail className="h-4 w-4" />}>
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-ami-magenta-soft"
                  >
                    {contact.email}
                  </a>
                </ContactRow>
              </ul>

              <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6">
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Ami Voyages"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:scale-110 hover:bg-ami-magenta"
                >
                  <Facebook className="h-4 w-4" strokeWidth={2} />
                </a>
                <span className="text-xs uppercase tracking-widest text-white/60">
                  Suivez-nous
                </span>
              </div>

              <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-ami-magenta-soft">
                  <Plane className="h-3.5 w-3.5 -rotate-45" strokeWidth={2.5} />
                  <span className="text-[11px] font-bold uppercase tracking-widest">Astuce</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/85">
                  Pour une réponse plus rapide, indiquez vos dates et la destination dès le premier message.
                </p>
              </div>
            </div>
          </motion.aside>

          {/* =========================================================== */}
          {/* RIGHT — Form                                                */}
          {/* =========================================================== */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            onSubmit={onSubmit}
            className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#1A0922] via-ami-purple-deep to-[#2A0F35] p-7 shadow-ami-glow sm:p-10"
          >
            <div className="absolute inset-0 topo-bg opacity-12" aria-hidden />
            <div
              className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-ami-purple/35 blur-[100px]"
              aria-hidden
            />
            <div
              className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-ami-magenta/20 blur-[120px]"
              aria-hidden
            />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ami-magenta to-transparent" />

            <div className="relative">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-ami-magenta-soft">
                  <Mail className="h-3.5 w-3.5" strokeWidth={2.5} />
                  Formulaire de demande
                </span>
                <h3 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-3xl">
                  Précisez votre projet de voyage
                </h3>
                <p className="mt-2 text-sm text-white/65">
                  Tous les champs marqués * sont obligatoires. Réponse sous 24h ouvrées.
                </p>
              </motion.div>

              {/* Fields */}
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id="fullName" label={f.fullName.label} placeholder={f.fullName.placeholder} required />
                <Field id="phone" label={f.phone.label} type="tel" placeholder={f.phone.placeholder} required />
                <Field id="email" label={f.email.label} type="email" placeholder={f.email.placeholder} required />
                <Field id="airline" label={f.airline.label} placeholder={f.airline.placeholder} />
                <Field id="cityFrom" label={f.cityFrom.label} placeholder={f.cityFrom.placeholder} />
                <Field id="cityTo" label={f.cityTo.label} placeholder={f.cityTo.placeholder} />
                <Field id="departure" label={f.departure.label} type="date" />
                <Field id="return" label={f.return.label} type="date" />
                <Field
                  id="message"
                  label={f.message.label}
                  placeholder={f.message.placeholder}
                  textarea
                  full
                />
              </div>

              {/* RGPD */}
              <label className="mt-6 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-white/75">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-ami-magenta"
                />
                <span>{f.rgpd}</span>
              </label>

              {/* Footer */}
              <div className="mt-8 flex flex-col items-stretch gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/55">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ami-magenta" />
                  Réponse sous 24h ouvrées
                </span>

                <MagneticButton
                  type="submit"
                  cursorLabel="Envoyer"
                  ariaLabel="Envoyer ma demande"
                  strength={0.25}
                >
                  <span className="group/s relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-ami-purple-vivid via-ami-magenta to-ami-magenta-soft px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-ami-glow-strong transition-shadow hover:shadow-[0_0_40px_0_rgba(217,70,217,0.55)]">
                    {submitted ? (
                      <>
                        <Check className="h-4 w-4" strokeWidth={3} />
                        Message envoyé !
                      </>
                    ) : (
                      <>
                        {contactSection.submit}
                        <Plane
                          className="h-4 w-4 -rotate-45 transition-transform duration-500 group-hover/s:translate-x-2 group-hover/s:-translate-y-1"
                          strokeWidth={2.5}
                        />
                      </>
                    )}
                  </span>
                </MagneticButton>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// Contact info row (left card)
// =====================================================================
function ContactRow({
  icon,
  children,
  highlight = false,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <li className="flex items-start gap-4 text-sm">
      <span
        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          highlight
            ? 'bg-ami-magenta text-white shadow-[0_0_15px_0_rgba(217,70,217,0.4)]'
            : 'bg-white/10 text-ami-magenta-soft'
        }`}
      >
        {icon}
      </span>
      <span className="pt-1.5 leading-relaxed text-white/90">{children}</span>
    </li>
  );
}

// =====================================================================
// Field — clean fixed label above input, animated bottom underline
// on focus. Works reliably for dates (no placeholder hack needed).
// =====================================================================
function Field({
  id,
  label,
  placeholder,
  type = 'text',
  required = false,
  full = false,
  textarea = false,
}: {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  full?: boolean;
  textarea?: boolean;
}) {
  return (
    <div className={`group/f relative ${full ? 'sm:col-span-2' : ''}`}>
      <label
        htmlFor={id}
        className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75 transition-colors group-focus-within/f:text-ami-magenta-soft"
      >
        {label}
        {required && <span className="text-ami-magenta-soft">*</span>}
      </label>

      <div className="relative">
        {textarea ? (
          <textarea
            id={id}
            name={id}
            rows={5}
            placeholder={placeholder}
            required={required}
            className="w-full resize-none rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 transition-all focus:border-ami-magenta focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-ami-magenta/25"
          />
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            required={required}
            style={{ colorScheme: 'dark' }}
            className="w-full rounded-xl border border-white/20 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 transition-all focus:border-ami-magenta focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-ami-magenta/25"
          />
        )}

        {/* Animated underline glow on focus */}
        <span className="pointer-events-none absolute inset-x-3 -bottom-px h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-ami-magenta to-transparent transition-transform duration-300 group-focus-within/f:scale-x-100" />
      </div>
    </div>
  );
}
