'use client';

import { useRef, useState, MouseEvent, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  cursorLabel?: string;
  ariaLabel?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  type = 'button',
  cursorLabel,
  ariaLabel,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPos({ x, y });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  const inner = (
    <motion.span
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.4 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        ref={(el) => { ref.current = el; }}
        href={href}
        className={`inline-block ${className}`}
        aria-label={ariaLabel}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        data-cursor={cursorLabel || 'true'}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      ref={(el) => { ref.current = el; }}
      type={type}
      onClick={onClick}
      className={`inline-block ${className}`}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor={cursorLabel || 'true'}
    >
      {inner}
    </button>
  );
}
