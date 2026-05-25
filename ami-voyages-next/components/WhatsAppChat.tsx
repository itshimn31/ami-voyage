'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowUpRight, ArrowLeft, Globe } from 'lucide-react';
import { contact, whatsappChat, type WhatsAppLang } from '@/data/content';

const TEASER_DELAY_MS = 6000;
const DISMISS_STORAGE_KEY = 'ami-wa-teaser-dismissed-at';
const LANG_STORAGE_KEY = 'ami-wa-lang';
const LANG_PICKED_KEY = 'ami-wa-lang-picked';
const DISMISS_TTL_MS = 24 * 60 * 60 * 1000; // 24h

const SUPPORTED_LANGS: WhatsAppLang[] = ['fr', 'en', 'hi', 'bn', 'ta'];

type ViewMode = 'picker' | 'chat';

/**
 * Floating WhatsApp chat entry-point — multilingual (fr / en / hi / bn / ta).
 *
 * Two views inside the card, controlled by `viewMode`:
 *   - `picker` : multilingual "first sentence" (Bonjour · Hello · नमस्ते · …)
 *                + 5 big language buttons in each language's native script.
 *   - `chat`   : greeting + 4 quick-action choices in the chosen language,
 *                each opening WhatsApp with a pre-filled message.
 *
 * First-time visitors land on `picker`. Once they pick, `hasEverPickedLang`
 * is set in localStorage and the next visit lands on `chat` directly. The
 * "Changer de langue" button in the chat header swaps the view back to
 * `picker` (full card, no clipped dropdown) so all 5 options are always
 * fully visible.
 */
export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<WhatsAppLang>(whatsappChat.defaultLang);
  const [hasEverPickedLang, setHasEverPickedLang] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('picker');

  // Pick up persisted state on mount.
  useEffect(() => {
    setMounted(true);

    let initialLang: WhatsAppLang = whatsappChat.defaultLang;
    let everPicked = false;
    try {
      const storedLang = localStorage.getItem(LANG_STORAGE_KEY) as WhatsAppLang | null;
      const storedPicked = localStorage.getItem(LANG_PICKED_KEY) === '1';
      if (storedLang && SUPPORTED_LANGS.includes(storedLang)) {
        initialLang = storedLang;
      }
      everPicked = storedPicked;
    } catch {
      // ignore (private browsing etc.)
    }
    setLang(initialLang);
    setHasEverPickedLang(everPicked);
    setViewMode(everPicked ? 'chat' : 'picker');

    // Teaser auto-popup logic — respects user dismissal for 24h.
    let dismissedAt = 0;
    try {
      dismissedAt = Number(localStorage.getItem(DISMISS_STORAGE_KEY) || '0');
    } catch {
      // ignore
    }
    if (dismissedAt && Date.now() - dismissedAt < DISMISS_TTL_MS) return;

    const t = setTimeout(() => setShowTeaser(true), TEASER_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  // Persist language whenever it changes.
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang, mounted]);

  const openChat = () => {
    setIsOpen(true);
    setShowTeaser(false);
  };

  const dismissTeaser = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    setShowTeaser(false);
    try {
      localStorage.setItem(DISMISS_STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore
    }
  };

  // Lock in a language choice — moves the card to the chat step.
  const pickLang = (code: WhatsAppLang) => {
    setLang(code);
    setHasEverPickedLang(true);
    setViewMode('chat');
    try {
      localStorage.setItem(LANG_PICKED_KEY, '1');
    } catch {
      // ignore
    }
  };

  const waUrl = (msg: string) =>
    `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(msg)}`;

  if (!mounted) return null;

  const tr = whatsappChat.t[lang];
  const currentLangMeta =
    whatsappChat.languages.find((l) => l.code === lang) ?? whatsappChat.languages[0];

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
            aria-label={tr.openAria}
          >
            {tr.teaser}
            <span
              role="button"
              tabIndex={0}
              onClick={dismissTeaser}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') dismissTeaser(e);
              }}
              aria-label="Fermer ce message / Close"
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
            className="w-[min(370px,calc(100vw-2.5rem))] origin-bottom-right overflow-hidden rounded-3xl bg-white shadow-[0_30px_60px_-15px_rgba(93,26,107,0.5)] ring-1 ring-ami-purple/10"
            role="dialog"
            aria-label="Ami Voyages WhatsApp"
          >
            {/* Header */}
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-ami-purple-deep via-ami-purple to-ami-magenta px-5 py-4 text-white">
              <div className="absolute inset-0 topo-bg opacity-25" aria-hidden />
              <div
                className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-ami-magenta-soft/40 blur-3xl"
                aria-hidden
              />
              <div className="relative flex items-center gap-3">
                {/* Back arrow when viewing picker from an established chat */}
                {viewMode === 'picker' && hasEverPickedLang ? (
                  <button
                    type="button"
                    onClick={() => setViewMode('chat')}
                    aria-label="Retour à la conversation / Back"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                ) : (
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 font-display text-sm font-extrabold tracking-tight backdrop-blur">
                    {whatsappChat.avatarInitials}
                  </span>
                )}

                <div className="min-w-0 flex-1 leading-tight">
                  <div className="truncate font-display text-base font-bold">
                    {viewMode === 'chat' ? tr.agentName : 'Ami Voyages'}
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/85">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-70" />
                      <span className="relative h-2 w-2 rounded-full bg-green-400" />
                    </span>
                    <span className="truncate">
                      {viewMode === 'chat'
                        ? `${tr.online} · ${tr.agentRole}`
                        : `${whatsappChat.t.fr.online} · ${whatsappChat.t.fr.agentRole}`}
                    </span>
                  </div>
                </div>

                {/* "Change language" button — only visible in chat view.
                    Click swaps the card to the full picker so all flags
                    and labels are always fully visible (no clipped dropdown). */}
                {viewMode === 'chat' && (
                  <button
                    type="button"
                    onClick={() => setViewMode('picker')}
                    aria-label={`${tr.langLabel} : ${currentLangMeta.label}`}
                    title={tr.langLabel}
                    className="flex h-9 items-center gap-1.5 rounded-full bg-white/15 px-2.5 text-[11px] font-bold text-white transition hover:bg-white/25"
                  >
                    <Globe className="h-3.5 w-3.5" strokeWidth={2.5} />
                    <span className="text-base leading-none">{currentLangMeta.flag}</span>
                    <span className="uppercase">{currentLangMeta.code}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label={viewMode === 'chat' ? tr.closeAria : 'Fermer / Close'}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
                >
                  <X className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Body — either the language picker or the chat */}
            <AnimatePresence mode="wait">
              {viewMode === 'picker' ? (
                <motion.div
                  key="picker"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-ami-cream/40 px-5 py-6"
                >
                  {/* The "first sentence" — a row of hellos in every language */}
                  <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-display text-base font-bold leading-tight text-ami-ink sm:text-lg">
                    {whatsappChat.langPicker.hellos.map((h, i) => (
                      <span
                        key={i}
                        className={
                          i % 2 === 0 ? 'text-ami-purple-deep' : 'text-ami-magenta'
                        }
                      >
                        {h}
                        {i < whatsappChat.langPicker.hellos.length - 1 && (
                          <span className="ml-2 text-ami-purple/30">·</span>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Prompts stack — every visitor sees their own */}
                  <ul className="mt-4 space-y-0.5 text-center text-[12px] leading-snug text-ami-ink/65">
                    {whatsappChat.langPicker.prompts.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>

                  {/* Language buttons — current language is highlighted when
                      re-entering the picker, so the visitor knows what's
                      currently in use. */}
                  <div className="mt-5 space-y-2">
                    {whatsappChat.languages.map((l, i) => {
                      const selected = hasEverPickedLang && l.code === lang;
                      return (
                        <motion.button
                          key={l.code}
                          type="button"
                          onClick={() => pickLang(l.code as WhatsAppLang)}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                          whileHover={{ x: 4 }}
                          className={`group flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-bold transition-all ${
                            selected
                              ? 'border-ami-magenta bg-gradient-to-r from-ami-magenta/10 via-ami-magenta/5 to-transparent text-ami-purple-deep shadow-sm ring-1 ring-ami-magenta/40'
                              : 'border-ami-purple/15 bg-white text-ami-ink hover:border-ami-magenta hover:shadow-md'
                          }`}
                        >
                          <span className="text-xl leading-none">{l.flag}</span>
                          <span className="flex-1">{l.label}</span>
                          <span
                            className={`text-[10px] uppercase tracking-widest ${
                              selected ? 'text-ami-magenta' : 'text-ami-purple/55 group-hover:text-ami-magenta'
                            }`}
                          >
                            {l.code}
                          </span>
                          <ArrowUpRight
                            className={`h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:rotate-45 ${
                              selected ? 'text-ami-magenta' : 'text-ami-purple/40 group-hover:text-ami-magenta'
                            }`}
                            strokeWidth={2.5}
                          />
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Greeting bubble */}
                  <div className="bg-ami-cream/50 px-5 pb-2 pt-5">
                    <motion.div
                      key={`greeting-${lang}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="max-w-[88%] rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm leading-relaxed text-ami-ink shadow-sm ring-1 ring-ami-purple/8"
                    >
                      {tr.greeting}
                    </motion.div>
                  </div>

                  {/* Quick choices */}
                  <div className="space-y-2 bg-ami-cream/50 px-5 pb-5 pt-3">
                    {whatsappChat.choices.map((c, i) => {
                      const local = c[lang];
                      return (
                        <motion.a
                          key={`${c.id}-${lang}`}
                          href={waUrl(local.message)}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                          whileHover={{ x: 4 }}
                          className="group flex items-center gap-3 rounded-2xl border border-ami-purple/15 bg-white px-4 py-3 text-sm font-medium text-ami-ink transition-all hover:border-ami-magenta hover:shadow-md"
                        >
                          <span className="text-xl leading-none">{c.emoji}</span>
                          <span className="flex-1">{local.label}</span>
                          <ArrowUpRight
                            className="h-4 w-4 text-ami-purple/40 transition-transform group-hover:rotate-45 group-hover:text-ami-magenta"
                            strokeWidth={2.5}
                          />
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <div className="flex items-center justify-center gap-1.5 border-t border-ami-purple/10 bg-white px-5 py-3 text-[11px] text-ami-ink/55">
              <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
              {viewMode === 'chat' ? tr.footer : 'WhatsApp · Ami Voyages'}
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
        aria-label={isOpen ? tr.closeAria : tr.openAria}
        data-cursor={isOpen ? 'Fermer' : 'Discuter'}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_15px_30px_-8px_rgba(37,211,102,0.55)] transition-shadow hover:shadow-[0_20px_40px_-8px_rgba(37,211,102,0.75)] sm:h-16 sm:w-16"
      >
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

        {/* Unread badge */}
        {!isOpen && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ami-magenta text-[10px] font-bold text-white shadow-md ring-2 ring-white">
            1
          </span>
        )}

        {/* Small globe icon to hint at multilingual support */}
        {!isOpen && (
          <span
            aria-hidden
            className="absolute -bottom-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#25D366] shadow ring-2 ring-white"
          >
            <Globe className="h-3 w-3" strokeWidth={2.5} />
          </span>
        )}
      </motion.button>
    </div>
  );
}

// ---------------------------------------------------------------------
// Inline WhatsApp glyph
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
