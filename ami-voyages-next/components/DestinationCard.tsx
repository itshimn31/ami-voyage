'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface Country {
  flag: string;
  name: string;
}

interface Props {
  title: string;
  description: string;
  cta: string;
  image: string;
  imageAlt: string;
  countries: Country[];
  index: number;
}

export default function DestinationCard({
  title,
  description,
  cta,
  image,
  imageAlt,
  countries,
  index,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative isolate flex min-h-[640px] flex-col justify-end overflow-hidden rounded-3xl shadow-ami-glow lg:min-h-[720px]"
      data-cursor="Découvrir"
    >
      {/* Parallax photo */}
      <motion.div
        style={{ y: imgY }}
        className="absolute inset-0 h-[120%]"
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
        />
      </motion.div>

      {/* Mauve gradient overlay (intensifies on hover) */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ami-purple-deep via-ami-purple-deep/60 to-transparent transition-opacity duration-700 group-hover:from-ami-purple-deep group-hover:via-ami-purple/80"
        aria-hidden
      />
      <div className="absolute inset-0 bg-ami-purple-deep/0 mix-blend-multiply transition-colors duration-700 group-hover:bg-ami-purple/30" aria-hidden />

      {/* Topographic */}
      <div className="absolute inset-0 topo-bg opacity-15" aria-hidden />

      {/* Floating index */}
      <div className="absolute right-8 top-8 z-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md">
          <span className="font-display text-xl font-extrabold text-white">
            0{index + 1}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 sm:p-10 md:p-12">
        <h3 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h3>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
          {description}
        </p>

        {/* Countries */}
        <ul className="mt-7 flex flex-wrap gap-2">
          {countries.map((c, i) => (
            <motion.li
              key={c.name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
              className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-colors hover:border-ami-magenta-soft hover:bg-ami-magenta/20"
            >
              <span className="text-base leading-none">{c.flag}</span>
              {c.name}
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="group/cta mt-8 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-white"
        >
          <span className="relative">
            {cta}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left bg-ami-magenta-soft transition-transform duration-500 group-hover/cta:scale-x-100 scale-x-0" />
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ami-magenta transition-all group-hover/cta:rotate-45 group-hover/cta:bg-white group-hover/cta:text-ami-purple-deep">
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </span>
        </a>
      </div>
    </motion.article>
  );
}
