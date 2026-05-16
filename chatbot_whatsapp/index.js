/**
 * index.js
 * ----------------------------------------------------------------------------
 * Point d'entrée du chatbot WhatsApp Ami Voyages.
 *
 * Expose un endpoint POST /webhook que Twilio appelle à chaque message
 * WhatsApp entrant. Le traitement complet d'un message suit ce pipeline :
 *
 *   1. Récupération / création de session (sessionManager)
 *   2. Si nouvelle session  → envoi du menu de langue, retour
 *   3. Si en attente langue → parsing du chiffre, set langue, retour
 *   4. Si session ACTIVE :
 *      a. Vérifier mots-clés "agent / humain / aide / help" → escalade directe
 *      b. Vérifier expressions d'insatisfaction → escalade
 *      c. Classifier la question avec le LLM
 *         - Si catégorie reconnue → envoyer la réponse FAQ dans la bonne langue
 *         - Sinon → incrémenter compteur d'échecs ; demander une reformulation
 *      d. Si seuil d'échecs ou d'échanges atteint → escalade
 *   5. Si état TRANSFERRED → ne pas répondre (l'agent humain prend la main)
 * ----------------------------------------------------------------------------
 */

require('dotenv').config();

const express = require('express');

const sessionManager = require('./services/sessionManager');
const languageHandler = require('./services/languageHandler');
const faqMatcher = require('./services/faqMatcher');
const summaryGenerator = require('./services/summaryGenerator');
const whatsappSender = require('./services/whatsappSender');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const AGENCY_INTERNAL_WHATSAPP = process.env.AGENCY_INTERNAL_WHATSAPP;
const MAX_EXCHANGES = parseInt(process.env.MAX_EXCHANGES_BEFORE_ESCALATION, 10) || 5;
const MAX_FAILED_CLASSIFICATIONS =
  parseInt(process.env.MAX_FAILED_CLASSIFICATIONS, 10) || 2;

const app = express();
app.use(express.urlencoded({ extended: false })); // Twilio envoie du form-urlencoded
app.use(express.json());

// ----------------------------------------------------------------------------
// Endpoints utilitaires
// ----------------------------------------------------------------------------

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', ...sessionManager.getStats() });
});

// ----------------------------------------------------------------------------
// Webhook Twilio WhatsApp
// ----------------------------------------------------------------------------

app.post('/webhook', async (req, res) => {
  // On répond immédiatement 200 à Twilio pour éviter les retries en cas de
  // traitement long (appels LLM). L'envoi de la réponse au client se fait en
  // async via l'API REST Twilio.
  res.status(200).type('text/xml').send('<Response></Response>');

  const from = req.body.From; // "whatsapp:+33..."
  const body = (req.body.Body || '').trim();

  if (!from) {
    console.warn('[webhook] champ From manquant, requête ignorée');
    return;
  }

  console.log(`[webhook] ← ${from} : "${body}"`);

  try {
    await handleIncomingMessage(from, body);
  } catch (err) {
    console.error('[webhook] Erreur de traitement :', err);
    // Tentative de notification minimale en français
    try {
      await whatsappSender.sendMessage(
        from,
        'Désolé, une erreur technique est survenue. Un agent va vous recontacter rapidement.'
      );
    } catch (_) {
      /* on a déjà loggué l'erreur principale */
    }
  }
});

// ----------------------------------------------------------------------------
// Pipeline principal de traitement d'un message entrant
// ----------------------------------------------------------------------------

async function handleIncomingMessage(from, message) {
  let session = sessionManager.getSession(from);

  // -------- Cas 1 : nouvelle session ou session expirée ---------------------
  if (!session) {
    session = sessionManager.createSession(from);
    sessionManager.appendMessage(from, 'user', message);
    await whatsappSender.sendMessage(from, languageHandler.WELCOME_MESSAGE);
    sessionManager.appendMessage(from, 'bot', languageHandler.WELCOME_MESSAGE);
    return;
  }

  // Trace systématique du message client dans l'historique
  sessionManager.appendMessage(from, 'user', message);

  // -------- Cas 2 : session déjà transférée à un agent ----------------------
  if (session.state === sessionManager.STATES.TRANSFERRED) {
    // Le bot ne répond plus — l'agent humain prend la main.
    // (Optionnel : envoyer un accusé "votre message a été ajouté au dossier"
    //  si on veut une UX explicite.)
    console.log(`[pipeline] Session ${from} déjà transférée, message non traité par le bot`);
    return;
  }

  // -------- Cas 3 : sélection de la langue ----------------------------------
  if (session.state === sessionManager.STATES.AWAITING_LANGUAGE) {
    const choice = languageHandler.parseLanguageChoice(message);
    if (!choice) {
      // Réponse polie de relance — on prend le message FR par défaut puisque
      // la langue n'est pas encore connue (mais on cite les 5 chiffres).
      const retry = faqMatcher.getSystemMessage('language_not_recognized', 'fr');
      await whatsappSender.sendMessage(from, retry);
      sessionManager.appendMessage(from, 'bot', retry);
      return;
    }
    sessionManager.setLanguage(from, choice);
    const confirm = buildLanguageConfirmation(choice);
    await whatsappSender.sendMessage(from, confirm);
    sessionManager.appendMessage(from, 'bot', confirm);
    return;
  }

  // -------- Cas 4 : session ACTIVE → routage métier -------------------------
  await routeActiveMessage(from, message, session);
}

/**
 * Renvoie un court message de confirmation après le choix de langue
 * (invite ouverte du type "Comment puis-je vous aider ?").
 */
function buildLanguageConfirmation(languageCode) {
  const map = {
    fr: '✅ Parfait, nous échangerons en français.\n\nComment puis-je vous aider ? Vous pouvez me poser une question sur nos vols, visas, tarifs, bagages, paiements…',
    en: '✅ Great, we\'ll continue in English.\n\nHow can I help you? Feel free to ask about flights, visas, prices, baggage, payments…',
    bn: '✅ পরিপূর্ণ, আমরা বাংলায় কথা বলব।\n\nআমি কীভাবে সাহায্য করতে পারি? ফ্লাইট, ভিসা, দাম, ব্যাগেজ, পরিশোধ — যেকোনো প্রশ্ন জিজ্ঞাসা করুন।',
    hi: '✅ बहुत बढ़िया, हम हिन्दी में बात करेंगे।\n\nमैं आपकी कैसे मदद कर सकता हूँ? उड़ान, वीज़ा, मूल्य, सामान, भुगतान — कोई भी प्रश्न पूछें।',
    ta: '✅ சிறப்பு, தமிழில் தொடர்வோம்.\n\nநான் எவ்வாறு உதவ முடியும்? விமானங்கள், விசா, விலைகள், சாமான்கள், கட்டணம் — எந்தக் கேள்வியும் கேளுங்கள்.',
  };
  return map[languageCode] || map.fr;
}

/**
 * Pipeline pour les sessions ACTIVE :
 *   - escalade explicite (mots-clés)
 *   - escalade par insatisfaction
 *   - classification FAQ → réponse ou demande de reformulation
 *   - escalade par seuils (échecs / nombre d'échanges)
 */
async function routeActiveMessage(from, message, session) {
  // (a) Escalade explicite ?
  if (languageHandler.detectEscalationKeyword(message)) {
    await escalateToAgent(from, session, summaryGenerator.TRANSFER_REASONS.EXPLICIT_REQUEST);
    return;
  }

  // (b) Insatisfaction explicite ?
  if (languageHandler.detectDissatisfaction(message)) {
    await escalateToAgent(from, session, summaryGenerator.TRANSFER_REASONS.DISSATISFACTION);
    return;
  }

  // (c) Classification LLM
  const { category, confidence } = await faqMatcher.matchCategory(message, session.history);

  if (category && confidence >= 0.4) {
    // Match FAQ trouvé — on répond dans la langue de la session
    const answer = faqMatcher.getAnswer(category, session.language);
    if (answer) {
      await whatsappSender.sendMessage(from, answer);
      sessionManager.appendMessage(from, 'bot', answer, category);
      sessionManager.resetFailedClassifications(from);
      sessionManager.incrementExchange(from);

      // Garde-fou : même un client qui obtient des réponses peut « saturer »
      // la conversation — on escalade après MAX_EXCHANGES tours.
      if (session.exchangeCount + 1 >= MAX_EXCHANGES) {
        await escalateToAgent(
          from,
          session,
          summaryGenerator.TRANSFER_REASONS.TOO_MANY_EXCHANGES
        );
      }
      return;
    }
  }

  // (d) Hors-périmètre → on incrémente et on demande une reformulation
  sessionManager.incrementFailedClassification(from);
  sessionManager.incrementExchange(from);

  const updated = sessionManager.getSession(from);

  if (updated.failedClassifications >= MAX_FAILED_CLASSIFICATIONS) {
    await escalateToAgent(from, updated, summaryGenerator.TRANSFER_REASONS.OUT_OF_SCOPE);
    return;
  }

  if (updated.exchangeCount >= MAX_EXCHANGES) {
    await escalateToAgent(from, updated, summaryGenerator.TRANSFER_REASONS.TOO_MANY_EXCHANGES);
    return;
  }

  const fallback = faqMatcher.getSystemMessage('fallback_clarification', session.language);
  await whatsappSender.sendMessage(from, fallback);
  sessionManager.appendMessage(from, 'bot', fallback);
}

/**
 * Procédure complète d'escalade :
 *   1. Génère le résumé en français
 *   2. L'envoie au numéro interne de l'agence
 *   3. Envoie au client le message de transfert dans sa langue
 *   4. Marque la session comme TRANSFERRED
 */
async function escalateToAgent(from, session, reason) {
  console.log(`[escalation] ${from} — raison : ${reason}`);

  if (!AGENCY_INTERNAL_WHATSAPP) {
    console.error('[escalation] AGENCY_INTERNAL_WHATSAPP non défini — résumé non envoyé');
  } else {
    try {
      const summary = await summaryGenerator.buildAgentSummary({
        phoneNumber: from,
        language: session.language,
        history: session.history,
        reason,
      });
      await whatsappSender.sendMessage(AGENCY_INTERNAL_WHATSAPP, summary);
    } catch (err) {
      console.error('[escalation] Échec d\'envoi du résumé à l\'agence :', err.message);
    }
  }

  // Confirmation au client dans sa langue
  const transferMessage =
    faqMatcher.getSystemMessage('transfer_to_agent', session.language) ||
    faqMatcher.getSystemMessage('transfer_to_agent', 'fr');

  try {
    await whatsappSender.sendMessage(from, transferMessage);
    sessionManager.appendMessage(from, 'bot', transferMessage);
  } catch (err) {
    console.error('[escalation] Échec de notification au client :', err.message);
  }

  sessionManager.markTransferred(from);
}

// ----------------------------------------------------------------------------
// Démarrage du serveur + tâche périodique de purge des sessions
// ----------------------------------------------------------------------------

const PURGE_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes
setInterval(() => {
  const purged = sessionManager.purgeExpiredSessions();
  if (purged > 0) console.log(`[purge] ${purged} session(s) expirée(s) supprimée(s)`);
}, PURGE_INTERVAL_MS);

app.listen(PORT, () => {
  console.log(`🚀 Chatbot Ami Voyages prêt sur http://localhost:${PORT}`);
  console.log(`   • Webhook Twilio : POST /webhook`);
  console.log(`   • Health-check   : GET  /health`);
});

module.exports = app; // exporté pour les tests éventuels
