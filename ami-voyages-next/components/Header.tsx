'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, MapPin, FileText, Mail, Facebook, Menu, X, Plane, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { contact, destinations, navigation } from '@/data/content';

const iconMap = {
  home: Home,
  destinations: MapPin,
  formalities: FileText,
  contact: Mail,
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', mobileOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.4, ease: 'easeOut' }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-ami-purple/85 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.3)]'
            : 'bg-ami-purple/40 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-8 lg:py-4">
          {/* Logo */}
          <a href="#hero" aria-label="Ami Voyages — Accueil" className="relative z-10">
            <Logo />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const Icon = iconMap[item.icon];
              if (item.hasMega) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                  >
                    <a
                      href={item.href}
                      className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                      {item.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${
                          megaOpen ? 'rotate-180' : ''
                        }`}
                        strokeWidth={2}
                      />
                    </a>
                    <AnimatePresence>{megaOpen && <MegaMenu />}</AnimatePresence>
                  </div>
                );
              }
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/90 transition-colors hover:text-white"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                  {item.label}
                </a>
              );
            })}
            <a
              href={contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Ami Voyages"
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-ami-magenta hover:scale-110"
            >
              <Facebook className="h-4 w-4" strokeWidth={2} />
            </a>
          </nav>

          {/* Right block — schedule ticket */}
          <div className="hidden items-center gap-4 lg:flex">
            <ScheduleTicket />
            <PassportStamp />
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setMobileOpen((s) => !s)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function MegaMenu() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="absolute left-1/2 top-full mt-3 w-[640px] -translate-x-1/2 rounded-3xl border border-white/15 bg-ami-purple-deep/95 p-6 shadow-2xl backdrop-blur-xl"
    >
      <div className="grid grid-cols-2 gap-6">
        {destinations.cards.map((card) => (
          <div key={card.id}>
            <h4 className="mb-3 font-display text-base font-bold text-ami-magenta-soft">
              {card.title}
            </h4>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5">
              {card.countries.map((c) => (
                <li key={c.name}>
                  <a
                    href="#destinations"
                    className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-white/85 transition hover:bg-white/10 hover:text-white"
                  >
                    <span className="text-base">{c.flag}</span>
                    <span>{c.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/60">
        <span>+50 destinations dans le monde entier</span>
        <a href="#destinations" className="font-semibold text-ami-magenta-soft hover:text-white">
          Tout voir →
        </a>
      </div>
    </motion.div>
  );
}

function ScheduleTicket() {
  return (
    <div className="relative hidden items-stretch overflow-hidden rounded-lg bg-ami-purple-deep text-[10px] uppercase tracking-wider text-white shadow-lg xl:flex">
      {/* zigzag left edge */}
      <div className="relative w-3 bg-ami-purple-deep">
        <div
          className="absolute inset-y-0 left-0 w-3"
          style={{
            backgroundImage:
              'radial-gradient(circle at 0 6px, transparent 3px, #5D1A6B 3.5px)',
            backgroundSize: '6px 12px',
            backgroundRepeat: 'repeat-y',
          }}
        />
      </div>
      <div className="px-3 py-2 leading-tight">
        {contact.hours.lines.map((l, i) => (
          <div key={i} className={i === 0 ? 'font-bold text-ami-magenta-soft' : 'text-white/90'}>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

function PassportStamp() {
  return (
    <motion.div
      whileHover={{ rotate: 0, scale: 1.05 }}
      animate={{ rotate: -8 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className="hidden items-center gap-2 rounded-md border-2 border-ami-magenta-soft px-3 py-1.5 text-ami-magenta-soft xl:flex"
    >
      <Plane className="h-4 w-4" strokeWidth={2.5} />
      <span className="font-display text-xs font-extrabold uppercase tracking-widest">
        Voyage
      </span>
    </motion.div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-40 flex flex-col bg-ami-purple-deep lg:hidden"
    >
      <div className="absolute inset-0 topo-bg opacity-25" />
      <div className="relative flex h-full flex-col px-6 pt-24">
        <nav className="flex flex-col">
          {navigation.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={onClose}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="flex items-center gap-4 border-b border-white/10 py-5 text-2xl font-display font-bold text-white transition-colors hover:text-ami-magenta-soft"
              >
                <Icon className="h-6 w-6 text-ami-magenta-soft" strokeWidth={1.8} />
                {item.label}
              </motion.a>
            );
          })}
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-auto pb-10"
        >
          <div className="rounded-2xl border border-white/15 bg-white/5 p-5 text-white/90">
            <div className="text-xs uppercase tracking-widest text-ami-magenta-soft">
              Horaires
            </div>
            <div className="mt-2 text-sm font-medium">{contact.hours.full}</div>
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/70">
              <span>{contact.phones[0]}</span>
              <span>·</span>
              <span>{contact.address.street}, {contact.address.city}</span>
            </div>
            <a
              href={contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-ami-magenta text-white"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
