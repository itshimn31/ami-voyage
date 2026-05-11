'use client';

import { motion } from 'framer-motion';
import { Award, MapPinned, Users, Sparkles, type LucideIcon } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { stats } from '@/data/content';

const icons: LucideIcon[] = [Award, MapPinned, Users, Sparkles];

export default function Stats() {
  return (
    <section
      aria-label="Chiffres clés"
      className="relative isolate overflow-hidden bg-gradient-to-br from-ami-purple-deep via-ami-purple to-ami-purple-vivid py-24 md:py-32"
    >
      <div className="absolute inset-0 topo-bg opacity-25" aria-hidden />
      <div
        className="absolute -left-32 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-ami-magenta/30 blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-ami-purple-vivid/40 blur-[120px]"
        aria-hidden
      />

      {/* Decorative dotted circle */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-32 left-1/2 hidden h-[500px] w-[500px] -translate-x-1/2 rounded-full border-2 border-dashed border-white/10 md:block"
      />

      {/* Plane that crosses */}
      <motion.div
        aria-hidden
        animate={{ x: ['-12vw', '112vw'], y: [0, -16, 0] }}
        transition={{
          x: { duration: 18, repeat: Infinity, ease: 'linear' },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute top-12 z-0 hidden md:block"
      >
        <svg width="42" height="42" viewBox="0 0 64 64" fill="none">
          <path
            d="M2 38 L24 32 L36 8 L42 8 L34 34 L52 30 L58 22 L62 24 L56 36 L62 40 L60 44 L46 42 L40 50 L48 54 L46 58 L34 50 L20 54 L18 50 L26 44 L8 46 L2 42 Z"
            fill="rgba(255,255,255,0.18)"
          />
        </svg>
      </motion.div>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-2 gap-x-6 gap-y-12 px-4 sm:px-8 md:grid-cols-4 md:gap-10">
        {stats.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative text-center md:text-left"
            >
              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12, type: 'spring' }}
                whileHover={{ rotate: 8, scale: 1.1 }}
                className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md md:mx-0"
              >
                <Icon className="h-6 w-6 text-ami-magenta-soft" strokeWidth={1.8} />
              </motion.div>

              {/* Big counter */}
              <div className="font-display text-5xl font-extrabold leading-none sm:text-6xl md:text-7xl">
                <AnimatedCounter
                  to={item.value}
                  suffix={item.suffix}
                  className="bg-gradient-to-br from-white via-ami-magenta-soft to-white bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(217,70,217,0.4)]"
                />
              </div>

              <div className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-white/80 sm:text-base">
                {item.label}
              </div>

              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 + i * 0.12 }}
                className="mx-auto mt-4 h-px w-10 origin-left bg-gradient-to-r from-ami-magenta-soft to-transparent md:mx-0"
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
