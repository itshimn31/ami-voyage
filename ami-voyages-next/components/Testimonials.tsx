'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SectionTitle from './SectionTitle';
import { testimonials } from '@/data/content';

export default function Testimonials() {
  return (
    <section
      id="temoignages"
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      {/* Very subtle accents only — no mauve overlay, kept clean */}
      <div
        className="absolute -left-32 top-32 h-72 w-72 rounded-full bg-ami-magenta/5 blur-[100px]"
        aria-hidden
      />
      <div
        className="absolute -right-32 bottom-32 h-80 w-80 rounded-full bg-ami-purple/5 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8">
        <SectionTitle
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          subtitle={testimonials.subtitle}
          align="center"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {testimonials.items.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} featured={i === 0} />
          ))}
        </motion.div>

        {/* Average rating bar at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-ami-magenta text-ami-magenta" />
            ))}
          </div>
          <span className="text-sm font-medium text-ami-ink/75">
            <span className="font-display text-lg font-extrabold text-ami-ink">4.9 / 5</span>{' '}
            sur la base de <strong className="text-ami-purple">500+ avis</strong> clients
          </span>
        </motion.div>
      </div>
    </section>
  );
}

type Testimonial = (typeof testimonials.items)[number];

function TestimonialCard({
  testimonial,
  featured = false,
}: {
  testimonial: Testimonial;
  featured?: boolean;
}) {
  const initials = testimonial.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
      whileHover={{ y: -6 }}
      className={`group/t relative isolate flex h-full flex-col overflow-hidden rounded-3xl border p-7 shadow-sm transition-shadow hover:shadow-ami-glow sm:p-8 ${
        featured
          ? 'border-ami-magenta/30 bg-gradient-to-br from-ami-cream to-white'
          : 'border-ami-purple/10 bg-white'
      }`}
    >
      {/* Decorative quote mark */}
      <Quote
        className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 text-ami-purple/10 transition-transform duration-500 group-hover/t:scale-110 group-hover/t:text-ami-magenta/15"
        strokeWidth={1.5}
      />

      {/* Stars */}
      <div className="relative flex items-center gap-0.5">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-ami-magenta text-ami-magenta"
            strokeWidth={0}
          />
        ))}
        {testimonial.rating < 5 &&
          [...Array(5 - testimonial.rating)].map((_, i) => (
            <Star key={`empty-${i}`} className="h-4 w-4 text-ami-purple/20" strokeWidth={1.5} />
          ))}
      </div>

      {/* Quote */}
      <blockquote className="relative mt-5 flex-1">
        <p className="font-display text-base leading-relaxed text-ami-ink/85 sm:text-[15px]">
          « {testimonial.quote} »
        </p>
      </blockquote>

      {/* Divider */}
      <div className="relative mt-6 h-px w-full bg-gradient-to-r from-transparent via-ami-purple/20 to-transparent" />

      {/* Author */}
      <footer className="relative mt-5 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-ami-purple-deep via-ami-purple to-ami-magenta font-display text-sm font-extrabold text-white shadow-md">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate font-display text-sm font-bold text-ami-ink">
            {testimonial.name}
          </div>
          <div className="truncate text-xs text-ami-ink/60">
            {testimonial.destination} · {testimonial.date}
          </div>
        </div>
      </footer>
    </motion.article>
  );
}
