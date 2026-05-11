'use client';

import { motion } from 'framer-motion';
import RevealText from './RevealText';

interface Props {
  eyebrow?: string;
  title: string;
  ghost?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionTitle({
  eyebrow,
  title,
  ghost,
  subtitle,
  align = 'left',
  light = false,
}: Props) {
  return (
    <div
      className={`relative ${
        align === 'center' ? 'mx-auto text-center' : 'text-left'
      } max-w-4xl`}
    >
      {ghost && (
        <motion.span
          aria-hidden
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: light ? 0.06 : 0.05, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className={`pointer-events-none absolute -top-12 left-0 right-0 select-none font-display text-[14vw] font-extrabold leading-none tracking-tighter ${
            light ? 'text-white' : 'text-ami-purple'
          } sm:-top-20`}
          style={{ WebkitTextStroke: light ? '1px #ffffff' : '1px #8B2A9B', color: 'transparent' }}
        >
          {ghost}
        </motion.span>
      )}

      <div className="relative">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] ${
              light ? 'text-ami-magenta-soft' : 'text-ami-magenta'
            }`}
          >
            <span
              className={`h-px w-8 ${
                light ? 'bg-ami-magenta-soft' : 'bg-ami-magenta'
              }`}
            />
            {eyebrow}
          </motion.span>
        )}

        <RevealText
          as="h2"
          text={title}
          className={`font-display text-5xl font-extrabold leading-[0.95] sm:text-6xl md:text-7xl ${
            light ? 'text-white' : 'text-ami-ink'
          }`}
        />

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className={`mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${
              light ? 'text-white/80' : 'text-ami-ink/70'
            } ${align === 'center' ? 'mx-auto' : ''}`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
