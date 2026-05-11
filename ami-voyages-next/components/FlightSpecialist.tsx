'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { flightSpecialist } from '@/data/content';

export default function FlightSpecialist() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '12%']);

  return (
    <section
      id="vol-sec"
      ref={ref}
      className="relative overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left — gradient with topographic */}
        <div className="relative isolate overflow-hidden bg-gradient-to-br from-ami-purple-deep via-ami-purple to-ami-purple-vivid px-6 py-20 sm:px-12 md:px-16 lg:py-32">
          <div className="absolute inset-0 topo-bg opacity-30" aria-hidden />
          <div
            className="absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-ami-magenta/30 blur-[100px]"
            aria-hidden
          />
          <div className="relative max-w-xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-ami-magenta-soft"
            >
              <span className="h-px w-8 bg-ami-magenta-soft" />
              {flightSpecialist.eyebrow}
            </motion.span>

            <RevealText
              as="h2"
              text={flightSpecialist.title}
              className="font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl"
            />

            <div className="mt-8 space-y-4">
              {flightSpecialist.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                  className="text-base leading-relaxed text-white/85 sm:text-lg"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-10"
            >
              <MagneticButton
                href={flightSpecialist.cta.href}
                cursorLabel="Contact"
              >
                <span className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-ami-purple-deep shadow-lg transition-all hover:bg-ami-magenta-soft hover:text-white">
                  {flightSpecialist.cta.label}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* Right — editorial photo */}
        <div className="relative isolate min-h-[480px] overflow-hidden bg-ami-ink lg:min-h-0">
          <motion.div
            style={{ y: imgY }}
            className="absolute inset-0 h-[120%]"
          >
            <Image
              src={flightSpecialist.image}
              alt={flightSpecialist.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ami-purple-deep/60 via-transparent to-transparent" />

          {/* Floating mini-card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl sm:max-w-sm"
          >
            <div className="text-xs uppercase tracking-widest text-ami-magenta-soft">
              Agence Paris
            </div>
            <p className="mt-1 font-display text-lg font-bold text-white">
              157 rue Lafayette · 75010
            </p>
            <p className="text-sm text-white/70">Métro/RER : Gare du Nord</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
