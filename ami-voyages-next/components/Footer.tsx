'use client';

import { motion } from 'framer-motion';
import { Facebook, Phone, MapPin, Mail, Clock, ArrowUp } from 'lucide-react';
import Logo from './Logo';
import { brand, contact, footer } from '@/data/content';

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-gradient-to-br from-ami-purple-deep via-[#3F0E4F] to-ami-purple-deep text-white">
      <div className="absolute inset-0 topo-bg opacity-15" aria-hidden />
      <div
        className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-ami-magenta/15 blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-ami-purple-vivid/20 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1400px] px-4 py-20 sm:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo & tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/75">
              {footer.tagline}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Ami Voyages"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-all hover:scale-110 hover:border-ami-magenta hover:bg-ami-magenta"
              >
                <Facebook className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </motion.div>

          {/* Menu */}
          <FooterColumn title="Menu" delay={0.1}>
            <ul className="space-y-3">
              {footer.columns.menu.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-white/75 transition-colors hover:text-ami-magenta-soft"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Prestations */}
          <FooterColumn title="Prestations" delay={0.2}>
            <ul className="space-y-3">
              {footer.columns.services.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-white/75 transition-colors hover:text-ami-magenta-soft"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Contact info */}
          <FooterColumn title="Retrouvez-nous" delay={0.3}>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ami-magenta-soft" />
                <span>
                  {contact.address.street}
                  <br />
                  {contact.address.zip} {contact.address.city}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-ami-magenta-soft" />
                <a
                  href={`tel:${contact.phones[0].replace(/\s/g, '')}`}
                  className="hover:text-ami-magenta-soft"
                >
                  {contact.phones[0]}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-ami-magenta-soft" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-ami-magenta-soft"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-ami-magenta-soft" />
                <span>{contact.hours.short}</span>
              </li>
            </ul>

            {/* Mini map placeholder */}
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="Plan d'accès Ami Voyages"
                src="https://www.openstreetmap.org/export/embed.html?bbox=2.353%2C48.876%2C2.363%2C48.881&layer=mapnik&marker=48.8786%2C2.3573"
                className="h-32 w-full grayscale-[0.3]"
                loading="lazy"
              />
            </div>
          </FooterColumn>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 bg-ami-purple-deep/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-white/60 sm:flex-row sm:px-8">
          <span>
            {footer.copyright} | {brand.name} — {brand.tagline}
          </span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footer.legal.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-ami-magenta-soft"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#hero"
              aria-label="Retour en haut"
              className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-all hover:scale-110 hover:border-ami-magenta-soft hover:bg-ami-magenta-soft hover:text-ami-purple-deep"
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  delay = 0,
  children,
}: {
  title: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <h4 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.2em] text-ami-magenta-soft">
        {title}
      </h4>
      {children}
    </motion.div>
  );
}
