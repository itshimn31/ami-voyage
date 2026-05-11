'use client';

import { motion } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  accentClass?: string;
  accentText?: string;
}

/**
 * Reveals text word-by-word with fade + slide-up.
 * If accentText is supplied, words after the boundary use accentClass.
 */
export default function RevealText({
  text,
  className = '',
  delay = 0,
  stagger = 0.06,
  as = 'h2',
  accentClass = '',
  accentText = '',
}: Props) {
  const Tag = motion[as] as any;
  const words = text.split(' ');
  let accentIndex = -1;
  if (accentText) {
    const accentWords = accentText.split(' ');
    accentIndex = words.length - accentWords.length;
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="relative inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block whitespace-pre ${
              accentIndex >= 0 && i >= accentIndex ? accentClass : ''
            }`}
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
