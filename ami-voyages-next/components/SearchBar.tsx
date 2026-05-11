'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Plane, Search } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { destinations } from '@/data/content';

export default function SearchBar() {
  const [destination, setDestination] = useState('');
  const [departure, setDeparture] = useState('');
  const [retour, setRetour] = useState('');
  const [travelers, setTravelers] = useState('2');

  return (
    <motion.form
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={(e) => {
        e.preventDefault();
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      }}
      className="relative w-full max-w-5xl rounded-3xl border border-white/30 bg-white/15 p-3 shadow-2xl backdrop-blur-xl sm:rounded-full"
      style={{
        boxShadow:
          '0 20px 60px -15px rgba(93, 26, 107, 0.6), 0 0 0 1px rgba(217, 70, 217, 0.25), inset 0 1px 0 rgba(255,255,255,0.3)',
      }}
    >
      <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[1.4fr_1fr_1fr_0.8fr_auto] sm:gap-1">
        {/* Destination */}
        <div className="flex items-center gap-3 px-4 py-3 sm:border-r sm:border-white/20">
          <MapPin className="h-4 w-4 text-ami-magenta-soft" strokeWidth={2} />
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            aria-label="Destination"
            className="w-full bg-transparent text-sm font-medium text-white outline-none [&>option]:text-ami-ink"
          >
            <option value="">Destination</option>
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
        </div>

        {/* Date départ */}
        <label className="flex cursor-pointer items-center gap-3 px-4 py-3 sm:border-r sm:border-white/20">
          <Calendar className="h-4 w-4 text-ami-magenta-soft" strokeWidth={2} />
          <span className="flex-1">
            <span className="block text-[10px] uppercase tracking-widest text-white/60">Départ</span>
            <input
              type="date"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              aria-label="Date de départ"
              className="w-full bg-transparent text-sm font-medium text-white outline-none [color-scheme:dark]"
            />
          </span>
        </label>

        {/* Date retour */}
        <label className="flex cursor-pointer items-center gap-3 px-4 py-3 sm:border-r sm:border-white/20">
          <Calendar className="h-4 w-4 text-ami-magenta-soft" strokeWidth={2} />
          <span className="flex-1">
            <span className="block text-[10px] uppercase tracking-widest text-white/60">Retour</span>
            <input
              type="date"
              value={retour}
              onChange={(e) => setRetour(e.target.value)}
              aria-label="Date de retour"
              className="w-full bg-transparent text-sm font-medium text-white outline-none [color-scheme:dark]"
            />
          </span>
        </label>

        {/* Voyageurs */}
        <div className="flex items-center gap-3 px-4 py-3">
          <Users className="h-4 w-4 text-ami-magenta-soft" strokeWidth={2} />
          <select
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            aria-label="Nombre de voyageurs"
            className="w-full bg-transparent text-sm font-medium text-white outline-none [&>option]:text-ami-ink"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n > 1 ? 'voyageurs' : 'voyageur'}
              </option>
            ))}
          </select>
        </div>

        {/* CTA */}
        <MagneticButton
          type="submit"
          cursorLabel="Rechercher"
          className="group"
          ariaLabel="Rechercher mon vol"
        >
          <div className="group/btn relative flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ami-purple-vivid via-ami-magenta to-ami-magenta-soft px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-ami-glow-strong">
            <Search className="h-4 w-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">Rechercher mon vol</span>
            <span className="sm:hidden">Rechercher</span>
            <Plane
              className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-1 group-hover/btn:rotate-45"
              strokeWidth={2.5}
            />
          </div>
        </MagneticButton>
      </div>
    </motion.form>
  );
}
