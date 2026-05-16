/**
 * languageHandler.js
 * ----------------------------------------------------------------------------
 * Gère la sélection de la langue du client et la détection des mots-clés
 * d'escalade ("agent", "humain", "help", "aide" et équivalents multilingues).
 *
 * Le message de bienvenue est imposé par le brief : il liste les 5 langues
 * supportées et invite le client à répondre par 1, 2, 3, 4 ou 5.
 * ----------------------------------------------------------------------------
 */

// Codes ISO simplifiés utilisés dans toute l'application
const LANGUAGES = Object.freeze({
  FR: 'fr',
  EN: 'en',
  BN: 'bn',
  HI: 'hi',
  TA: 'ta',
});

// Mapping numéro saisi par le client → code langue interne
const DIGIT_TO_LANGUAGE = Object.freeze({
  '1': LANGUAGES.FR,
  '2': LANGUAGES.EN,
  '3': LANGUAGES.BN,
  '4': LANGUAGES.HI,
  '5': LANGUAGES.TA,
});

// Libellés humains pour les résumés agent et les logs
const LANGUAGE_LABELS = Object.freeze({
  [LANGUAGES.FR]: 'Français',
  [LANGUAGES.EN]: 'English',
  [LANGUAGES.BN]: 'বাংলা (Bangla)',
  [LANGUAGES.HI]: 'हिन्दी (Hindi)',
  [LANGUAGES.TA]: 'தமிழ் (Tamoul)',
});

// Message de bienvenue strictement conforme au brief
const WELCOME_MESSAGE =
  '🌍 Bienvenue chez Ami Voyages ! / Welcome to Ami Voyages ! / আমি ভ্রমণে আপনাকে স্বাগতম! / Ami Voyages में आपका स्वागत है! / Ami Voyages-க்கு வரவேற்கிறோம்!\n\n' +
  'Veuillez choisir votre langue / Please choose your language :\n' +
  '1️⃣ Français\n' +
  '2️⃣ English\n' +
  '3️⃣ বাংলা (Bangla)\n' +
  '4️⃣ हिन्दी (Hindi)\n' +
  '5️⃣ தமிழ் (Tamoul)';

/**
 * Mots-clés déclenchant une escalade explicite vers un agent humain.
 * Couvre les 5 langues : on tolère majuscules / minuscules / variantes.
 */
const ESCALATION_KEYWORDS = [
  // Français
  'agent', 'humain', 'human', 'conseiller', 'opérateur', 'operateur',
  'parler à quelqu\'un', 'parler a quelqu\'un', 'personne',
  // Anglais
  'help', 'support', 'representative', 'speak to someone',
  // Aide (FR/EN)
  'aide',
  // Bangla : help / agent / humain / aide
  'সাহায্য', 'এজেন্ট', 'মানুষ', 'প্রতিনিধি',
  // Hindi
  'सहायता', 'मदद', 'एजेंट', 'इंसान', 'प्रतिनिधि',
  // Tamoul
  'உதவி', 'முகவர்', 'மனிதர்', 'பிரதிநிதி',
];

/**
 * Mots-clés indiquant une insatisfaction explicite du client.
 * Détectés en complément des classifications LLM pour réagir vite.
 */
const DISSATISFACTION_KEYWORDS = [
  // Français
  'inadmissible', 'inacceptable', 'pas content', 'mécontent', 'mecontent',
  'pas satisfait', 'pas satisfaite', 'nul', 'arnaque', 'scandaleux',
  'remboursement immédiat', 'porter plainte',
  // Anglais
  'unacceptable', 'not happy', 'disappointed', 'terrible service', 'awful',
  'refund now', 'lawsuit', 'complaint',
  // Bangla
  'অগ্রহণযোগ্য', 'হতাশ', 'অভিযোগ',
  // Hindi
  'अस्वीकार्य', 'निराश', 'शिकायत',
  // Tamoul
  'ஏற்றுக்கொள்ள முடியாது', 'ஏமாற்றம்', 'புகார்',
];

/**
 * Convertit un message brut du client en code langue, ou null si non reconnu.
 * On accepte aussi des entrées comme " 1 " ou "1." par souplesse.
 */
function parseLanguageChoice(rawInput) {
  if (!rawInput) return null;
  const cleaned = rawInput.trim().replace(/[^\d]/g, '').charAt(0);
  return DIGIT_TO_LANGUAGE[cleaned] || null;
}

/**
 * Recherche d'un mot-clé d'escalade dans le message du client.
 * Insensible à la casse et tolère les caractères ponctuation.
 */
function detectEscalationKeyword(message) {
  if (!message) return false;
  const lower = message.toLowerCase();
  return ESCALATION_KEYWORDS.some((keyword) => lower.includes(keyword.toLowerCase()));
}

/**
 * Recherche d'expressions d'insatisfaction explicite.
 */
function detectDissatisfaction(message) {
  if (!message) return false;
  const lower = message.toLowerCase();
  return DISSATISFACTION_KEYWORDS.some((keyword) => lower.includes(keyword.toLowerCase()));
}

/**
 * Renvoie le libellé humain d'une langue, ou la langue elle-même en fallback.
 */
function getLanguageLabel(languageCode) {
  return LANGUAGE_LABELS[languageCode] || languageCode || 'inconnue';
}

module.exports = {
  LANGUAGES,
  LANGUAGE_LABELS,
  WELCOME_MESSAGE,
  parseLanguageChoice,
  detectEscalationKeyword,
  detectDissatisfaction,
  getLanguageLabel,
};
