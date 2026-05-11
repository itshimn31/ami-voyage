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
  Send,
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
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionTitle
          eyebrow={contactSection.eyebrow}
          title={contactSection.title}
          subtitle={contactSection.intro}
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[5fr_7fr] lg:gap-8">
          {/* LEFT — info card */}
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

            <div className="relative">
              <h3 className="font-display text-3xl font-extrabold sm:text-4xl">
                Contactez-nous
              </h3>
              <p className="mt-3 max-w-sm text-sm text-white/80">
                Pour de plus amples informations, remplissez notre formulaire ou contactez-nous directement.
              </p>

              <ul className="mt-8 space-y-5">
                {contact.phones.map((phone, i) => (
                  <ContactRow key={phone} icon={<Phone className="h-4 w-4" />} highlight={i === 0}>
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="font-bold tracking-wide hover:text-ami-magenta-soft">
                      {phone}
                    </a>
                  </ContactRow>
                ))}
                <ContactRow icon={<MapPin className="h-4 w-4" />}>
                  <span>
                    {contact.address.street}
                    <br />
                    {contact.address.zip} {contact.address.city}
                  </span>
                </ContactRow>
                <ContactRow icon={<Train className="h-4 w-4" />}>
                  {contact.address.metro}
                </ContactRow>
                <ContactRow icon={<Clock className="h-4 w-4" />}>
                  {contact.hours.full}
                </ContactRow>
                <ContactRow icon={<Mail className="h-4 w-4" />}>
                  <a href={`mailto:${contact.email}`} className="hover:text-ami-magenta-soft">
                    {contact.email}
                  </a>
                </ContactRow>
              </ul>

              <div className="mt-10 flex items-center gap-3">
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

              <div className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-4 text-xs text-white/85">
                <div className="flex items-center gap-2 text-ami-magenta-soft">
                  <Plane className="h-3.5 w-3.5" strokeWidth={2.5} />
                  <span className="font-bold uppercase tracking-widest">Astuce</span>
                </div>
                <p className="mt-2">
                  Pour une réponse plus rapide, indiquez vos dates et la destination dès le premier message.
                </p>
              </div>
            </div>
          </motion.aside>

          {/* RIGHT — form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            onSubmit={onSubmit}
            className="relative isolate overflow-hidden rounded-3xl bg-ami-ink p-8 shadow-ami-glow sm:p-10"
          >
            <div
              className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-ami-purple/30 blur-[100px]"
              aria-hidden
            />
            <div
              className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-ami-magenta/20 blur-[120px]"
              aria-hidden
            />

            <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FloatingField id="fullName" label={f.fullName.label} placeholder={f.fullName.placeholder} required />
              <FloatingField id="phone" label={f.phone.label} type="tel" placeholder={f.phone.placeholder} required />
              <FloatingField id="email" label={f.email.label} type="email" placeholder={f.email.placeholder} required full />
              <FloatingField id="airline" label={f.airline.label} placeholder={f.airline.placeholder} />
              <FloatingField id="cityFrom" label={f.cityFrom.label} placeholder={f.cityFrom.placeholder} />
              <FloatingField id="departure" label={f.departure.label} type="date" placeholder=" " />
              <FloatingField id="cityTo" label={f.cityTo.label} placeholder={f.cityTo.placeholder} />
              <FloatingField id="return" label={f.return.label} type="date" placeholder=" " />
              <FloatingField
                id="message"
                label={f.message.label}
                placeholder={f.message.placeholder}
                textarea
                full
              />
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs text-white/70">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 cursor-pointer accent-ami-magenta"
              />
              <span>{f.rgpd}</span>
            </label>

            <div className="mt-8 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest text-white/50">
                Réponse sous 24h ouvrées
              </span>

              <MagneticButton
                type="submit"
                cursorLabel="Envoyer"
                ariaLabel="Envoyer ma demande"
              >
                <span className="group/s relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-ami-purple-vivid via-ami-magenta to-ami-magenta-soft px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-shadow hover:shadow-ami-glow-strong">
                  {submitted ? 'Merci, message envoyé !' : contactSection.submit}
                  <Plane
                    className="h-4 w-4 transition-transform duration-500 group-hover/s:translate-x-2 group-hover/s:-translate-y-1 group-hover/s:rotate-45"
                    strokeWidth={2.5}
                  />
                </span>
              </MagneticButton>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

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
          highlight ? 'bg-ami-magenta text-white' : 'bg-white/10 text-ami-magenta-soft'
        }`}
      >
        {icon}
      </span>
      <span className="pt-1.5 leading-relaxed text-white/90">{children}</span>
    </li>
  );
}

function FloatingField({
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
    <div className={`floating-input ${full ? 'sm:col-span-2' : ''}`}>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={4}
          placeholder={placeholder || ' '}
          required={required}
          className="resize-none"
          style={{ colorScheme: 'dark' }}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder || ' '}
          required={required}
          style={{ colorScheme: 'dark' }}
        />
      )}
      <label htmlFor={id}>{label}{required ? ' *' : ''}</label>
    </div>
  );
}
