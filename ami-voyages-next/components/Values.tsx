'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Quote, Plane } from 'lucide-react';
import SectionTitle from './SectionTitle';
import RevealText from './RevealText';
import { brand, values } from '@/data/content';

export default function Values() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '15%']);
  const ghostX = useTransform(scrollYProgress, [0, 1], ['-8%', '12%']);

  return (
    <section
      id="valeurs"
      ref={ref}
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 sm:px-8 lg:grid-cols-12 lg:gap-16">
        {/* LEFT — title + paragraph + quote block */}
        <div className="lg:col-span-7">
          <SectionTitle
            eyebrow={values.eyebrow}
            title={values.title}
            ghost={values.ghostTitle}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-ami-ink/75 sm:text-lg"
          >
            {values.paragraph}
          </motion.p>

          {/* Quote block — premium with ghost text + flying plane */}
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-ami-purple-deep via-ami-purple to-ami-magenta p-10 shadow-ami-glow sm:p-14"
          >
            {/* Ghost brand name behind quote */}
            <motion.span
              aria-hidden
              style={{ x: ghostX }}
              className="pointer-events-none absolute -bottom-4 -left-2 select-none whitespace-nowrap font-display text-[28vw] font-extrabold leading-none tracking-tighter sm:text-[180px] md:text-[200px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.14 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4 }}
            >
              <span
                style={{
                  WebkitTextStroke: '1.5px rgba(255,255,255,0.45)',
                  color: 'transparent',
                }}
              >
                {brand.name}
              </span>
            </motion.span>

            {/* Topographic */}
            <div className="absolute inset-0 topo-bg opacity-25" aria-hidden />

            {/* Flying plane silhouette */}
            <motion.div
              aria-hidden
              animate={{
                x: ['-10%', '110%'],
                y: [0, -8, 4, 0],
              }}
              transition={{
                x: { duration: 14, repeat: Infinity, ease: 'linear', delay: 1 },
                y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="absolute right-0 top-10"
            >
              <Plane
                className="h-8 w-8 -rotate-12 text-white/60"
                strokeWidth={1.5}
                fill="rgba(255,255,255,0.2)"
              />
            </motion.div>

            {/* Decorative blob */}
            <div
              className="absolute -right-20 -top-10 h-48 w-48 rounded-full bg-ami-magenta-soft/30 blur-3xl"
              aria-hidden
            />

            <Quote
              className="absolute -left-2 -top-4 h-32 w-32 text-white/15"
              strokeWidth={1.5}
            />

            <blockquote className="relative">
              <RevealText
                as="p"
                text={`« ${values.quote} »`}
                stagger={0.05}
                className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl"
              />
              <motion.figcaption
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="mt-7 flex items-center gap-3 text-sm uppercase tracking-widest text-ami-magenta-soft"
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="h-px w-10 origin-left bg-ami-magenta-soft"
                />
                Ami Voyages — Paris
              </motion.figcaption>
            </blockquote>
          </motion.figure>
        </div>

        {/* RIGHT — parallax image */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-ami-glow lg:sticky lg:top-28"
          >
            <motion.div style={{ y: imgY }} className="absolute inset-0 h-[120%]">
              <Image
                src={values.image}
                alt={values.imageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ami-purple-deep/80 via-transparent to-transparent" />

            {/* Decorative dotted circle on image */}
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
              className="absolute right-8 top-8 h-24 w-24 rounded-full border-2 border-dashed border-white/30"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/25 bg-white/15 p-5 text-white backdrop-blur-xl"
            >
              <div className="text-[11px] uppercase tracking-widest text-ami-magenta-soft">
                Bon voyage
              </div>
              <p className="mt-1.5 font-display text-lg font-bold leading-tight">
                Au-dessus de Paris, on rêve déjà du retour.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
