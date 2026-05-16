/**
 * summaryGenerator.js
 * ----------------------------------------------------------------------------
 * Assemble le message de résumé EN FRANÇAIS envoyé au numéro interne de
 * l'agence au moment de l'escalade.
 *
 * Le format est strictement celui imposé par le brief :
 *
 *   📋 RÉSUMÉ DE CONVERSATION — Ami Voyages Bot
 *   👤 Client : [numéro WhatsApp]
 *   🕐 Date/Heure : [timestamp]
 *   🌍 Langue utilisée : [langue]
 *   📝 Résumé de la demande : [résumé en 3-5 lignes généré automatiquement]
 *   ❓ Questions posées : [liste]
 *   ✅ Réponses fournies par le bot : [liste]
 *   ⚠️ Raison du transfert : [Question hors périmètre / Insatisfaction / Demande explicite]
 *   🔁 Statut : En attente de prise en charge par un agent
 * ----------------------------------------------------------------------------
 */

const llmService = require('./llmService');
const { getLanguageLabel } = require('./languageHandler');

const TRANSFER_REASONS = Object.freeze({
  OUT_OF_SCOPE: 'Question hors périmètre',
  DISSATISFACTION: 'Insatisfaction',
  EXPLICIT_REQUEST: 'Demande explicite',
  TOO_MANY_EXCHANGES: 'Trop d\'échanges sans résolution',
});

/**
 * Formate un timestamp ISO en chaîne lisible (Europe/Paris).
 */
function formatTimestamp(date = new Date()) {
  return date.toLocaleString('fr-FR', {
    timeZone: 'Europe/Paris',
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

/**
 * Nettoie un numéro WhatsApp Twilio ("whatsapp:+33...") pour l'affichage.
 */
function cleanPhoneNumber(rawPhone) {
  if (!rawPhone) return '(inconnu)';
  return rawPhone.replace(/^whatsapp:/i, '').trim();
}

/**
 * Extrait la liste des questions posées par le client depuis l'historique.
 */
function extractClientQuestions(history) {
  return history
    .filter((m) => m.role === 'user')
    .map((m, idx) => `${idx + 1}. ${m.text}`)
    .join('\n');
}

/**
 * Extrait la liste des réponses (catégories) fournies par le bot.
 * On affiche la clé de catégorie + un extrait court si disponible.
 */
function extractBotAnswers(history) {
  const botMessages = history.filter((m) => m.role === 'bot');
  if (!botMessages.length) return '(aucune réponse automatique fournie)';

  return botMessages
    .map((m, idx) => {
      const label = m.category ? `[${m.category}]` : '[message système]';
      // On tronque les longues réponses pour la lisibilité du résumé agent
      const preview = m.text.length > 80 ? `${m.text.slice(0, 80)}…` : m.text;
      return `${idx + 1}. ${label} ${preview}`;
    })
    .join('\n');
}

/**
 * Construit le bloc texte complet du résumé.
 *
 * @param {object} params
 * @param {string} params.phoneNumber  Numéro WhatsApp du client (raw Twilio)
 * @param {string} params.language     Code langue (fr, en, bn, hi, ta)
 * @param {Array}  params.history      Historique complet de la session
 * @param {string} params.reason       Raison du transfert (cf. TRANSFER_REASONS)
 * @returns {Promise<string>}          Message prêt à envoyer à l'agent
 */
async function buildAgentSummary({ phoneNumber, language, history, reason }) {
  const languageLabel = getLanguageLabel(language);

  // 1. Génération du résumé en français via LLM
  let llmSummary;
  try {
    llmSummary = await llmService.summarize({ history, languageLabel });
  } catch (err) {
    console.error('[summaryGenerator] Échec de génération du résumé LLM :', err.message);
    llmSummary = '(résumé automatique indisponible — voir l\'historique ci-dessous)';
  }

  const questions = extractClientQuestions(history) || '(aucune question explicite)';
  const answers = extractBotAnswers(history);

  return [
    '📋 RÉSUMÉ DE CONVERSATION — Ami Voyages Bot',
    `👤 Client : ${cleanPhoneNumber(phoneNumber)}`,
    `🕐 Date/Heure : ${formatTimestamp()}`,
    `🌍 Langue utilisée : ${languageLabel}`,
    '',
    '📝 Résumé de la demande :',
    llmSummary,
    '',
    '❓ Questions posées :',
    questions,
    '',
    '✅ Réponses fournies par le bot :',
    answers,
    '',
    `⚠️ Raison du transfert : ${reason}`,
    '🔁 Statut : En attente de prise en charge par un agent',
  ].join('\n');
}

module.exports = {
  TRANSFER_REASONS,
  buildAgentSummary,
};
