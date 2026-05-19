'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LogoTraced } from './Logo';

export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-ami-purple-deep"
          aria-label="Chargement"
        >
          <div className="absolute inset-0 topo-bg opacity-30" />
          <motion.div
            initial={{ scale: 0.94 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="relative flex flex-col items-center gap-6"
          >
            <div className="w-[260px] sm:w-[340px]">
              <LogoTraced className="h-auto w-full" />
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              className="h-[2px] w-32 origin-left bg-gradient-to-r from-transparent via-ami-magenta to-transparent"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="text-[11px] uppercase tracking-[0.4em] text-white/70"
            >
              Le spécialiste du voyage ethnique
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
