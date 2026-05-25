'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, ArrowUpRight, Check } from 'lucide-react';
import { contact, whatsappChat } from '@/data/content';

const TEASER_DELAY_MS = 6000;
const DISMISS_STORAGE_KEY = 'ami-wa-teaser-dismissed-at';
const DISMISS_TTL_MS = 24 * 60 * 60 * 1000; // 24h

/**
 * Floating WhatsApp chat entry-point.
 *
 * The actual chatbot lives in `chatbot_whatsapp/` and runs on Twilio
 * WhatsApp. This widget is the in-page bridge: a green FAB always
 * visible at the bottom-right, with a teaser bubble that pops up after
 * a few seconds, and an open card with quick-action choices that each
 * deep-link to `wa.me/<number>?text=<encoded message>`.
 *
 * The visitor's choice lands on the agency's WhatsApp, where the
 * existing chatbot picks up and routes to the right FAQ / human agent.
 */
export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Teaser auto-popup logic — respects user dismissal for 24h.
    const dismissedAt = Number(localStorage.getItem(DISMISS_STORAGE_KEY) || '0');
    if (dismissedAt && Date.now() - dismissedAt < DISMISS_TTL_MS) return;

    const t = setTimeout(() => setShowTeaser(true), TEASER_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // Open the chat card → also hides the teaser.
  const openChat = () => {
    setIsOpen(true);
    setShowTeaser(false);
  };

  const dismissTeaser = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTeaser(false);
    try {
      localStorage.setItem(DISMISS_STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore (private browsing etc.)
    }
  };

  const waUrl = (msg: string) =>
    `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(msg)}`;

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      {/* Teaser bubble */}
      <AnimatePresence>
        {showTeaser && !isOpen && (
          <motion.button
            type="button"
            onClick={openChat}
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            className="group relative max-w-[260px] cursor-pointer rounded-2xl rounded-br-sm bg-white px-4 py-3 text-left text-sm font-medium text-ami-ink shadow-[0_15px_40px_-15px_rgba(93,26,107,0.45)] ring-1 ring-ami-purple/10"
            aria-label="Ouvrir la conversation"
          >
            {whatsappChat.teaser}
            <span
              role="button"
              tabIndex={0}
              onClick={dismissTeaser}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') dismissTeaser(e as any);
              }}
              aria-label="Fermer ce message"
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ami-ink text-white opacity-0 transition-opacity hover:bg-ami-purple group-hover:opacity-100"
            >
              <X className="h-3 w-3" strokeWidth={3} />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Open chat card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            className="w-[min(360px,calc(100vw-2.5rem))] origin-bottom-right overflow-hidden rounded-3xl bg-white shadow-[0_30px_60px_-15px_rgba(93,26,107,0.5)] ring-1 ring-ami-purple/10"
            role="dialog"
            aria-label="Discuter sur WhatsApp"
          >
            {/* Header */}
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-ami-purple-deep via-ami-purple to-ami-magenta px-5 py-4 text-white">
              <div className="absolute inset-0 topo-bg opacity-25" aria-hidden />
              <div
                className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-ami-magenta-soft/40 blur-3xl"
                aria-hidden
              />
              <div className="relative flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 font-display text-sm font-extrabold tracking-tight backdrop-blur">
                  {whatsappChat.agent.avatarInitials}
                </span>
                <div className="flex-1 leading-tight">
                  <div className="font-display text-base font-bold">
                    {whatsappChat.agent.name}
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/85">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-70" />
                      <span className="relative h-2 w-2 rounded-full bg-green-400" />
                    </span>
                    En ligne · {whatsappChat.agent.role}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Fermer la fenêtre de chat"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
                >
                  <X className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Greeting bubble */}
            <div className="bg-ami-cream/50 px-5 pb-2 pt-5">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm leading-relaxed text-ami-ink shadow-sm ring-1 ring-ami-purple/8"
              >
                {whatsappChat.greeting}
              </motion.div>
            </div>

            {/* Quick choices */}
            <div className="space-y-2 bg-ami-cream/50 px-5 pb-5 pt-3">
              {whatsappChat.choices.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={waUrl(c.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.05, duration: 0.35 }}
                  whileHover={{ x: 4 }}
                  className="group flex items-center gap-3 rounded-2xl border border-ami-purple/15 bg-white px-4 py-3 text-sm font-medium text-ami-ink transition-all hover:border-ami-magenta hover:shadow-md"
                >
                  <span className="text-xl leading-none">{c.emoji}</span>
                  <span className="flex-1">{c.label}</span>
                  <ArrowUpRight
                    className="h-4 w-4 text-ami-purple/40 transition-transform group-hover:rotate-45 group-hover:text-ami-magenta"
                    strokeWidth={2.5}
                  />
                </motion.a>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-1.5 border-t border-ami-purple/10 bg-white px-5 py-3 text-[11px] text-ami-ink/55">
              <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
              {whatsappChat.footer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB — always visible */}
      <motion.button
        type="button"
        onClick={() => (isOpen ? setIsOpen(false) : openChat())}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={
          isOpen
            ? { rotate: 0 }
            : { rotate: [0, -8, 8, -4, 4, 0] }
        }
        transition={
          isOpen
            ? { duration: 0.2 }
            : { duration: 1.6, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }
        }
        aria-label={isOpen ? 'Fermer la conversation' : 'Ouvrir la conversation WhatsApp'}
        data-cursor={isOpen ? 'Fermer' : 'Discuter'}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_15px_30px_-8px_rgba(37,211,102,0.55)] transition-shadow hover:shadow-[0_20px_40px_-8px_rgba(37,211,102,0.75)] sm:h-16 sm:w-16"
      >
        {/* Pulse glow */}
        {!isOpen && (
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30"
          />
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="h-6 w-6" strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread badge for first impression */}
        {!isOpen && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ami-magenta text-[10px] font-bold text-white shadow-md ring-2 ring-white">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
}

// ---------------------------------------------------------------------
// Inline WhatsApp glyph — simpler than the Lucide MessageCircle for
// instant brand recognition. Uses currentColor so it inherits the FAB
// foreground.
// ---------------------------------------------------------------------
function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19.05 4.91A10.46 10.46 0 0 0 11.56 2C5.84 2 1.2 6.65 1.2 12.36c0 1.83.48 3.62 1.39 5.19L1.11 22l4.55-1.45a10.34 10.34 0 0 0 5.9 1.83h.01c5.71 0 10.36-4.65 10.37-10.36a10.3 10.3 0 0 0-2.89-7.11Zm-7.49 15.93h-.01a8.62 8.62 0 0 1-4.38-1.2l-.31-.19-2.7.86.86-2.63-.2-.32a8.6 8.6 0 0 1-1.32-4.6c0-4.76 3.87-8.62 8.63-8.62 2.3 0 4.46.9 6.09 2.53a8.55 8.55 0 0 1 2.52 6.1c0 4.75-3.86 8.61-8.61 8.61Zm4.72-6.45c-.26-.13-1.53-.76-1.76-.84-.24-.09-.41-.13-.58.13-.17.26-.66.84-.81 1.01-.15.17-.3.19-.55.06-.26-.13-1.09-.4-2.07-1.28-.77-.69-1.28-1.53-1.43-1.79-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.8-1.91-.21-.5-.42-.43-.58-.44h-.49c-.17 0-.45.06-.69.32-.24.26-.91.89-.91 2.17 0 1.28.93 2.52 1.06 2.7.13.17 1.83 2.8 4.43 3.92.62.27 1.1.43 1.48.55.62.2 1.19.17 1.64.1.5-.07 1.53-.62 1.74-1.23.21-.61.21-1.13.15-1.23-.07-.1-.24-.17-.5-.3Z" />
    </svg>
  );
}
