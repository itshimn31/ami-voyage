/**
 * faqMatcher.js
 * ----------------------------------------------------------------------------
 * Charge le catalogue FAQ (config/faq.json) et expose deux fonctions clés :
 *   - matchCategory()  : utilise le LLM pour classer le message dans une
 *                        catégorie connue (ou null si hors-périmètre).
 *   - getAnswer()      : récupère la réponse pré-rédigée dans la bonne langue.
 *
 * Le fichier faq.json contient pour chaque catégorie une clé
 * `_description_classifier` lue uniquement par le LLM pour décider du match :
 * cela permet d'enrichir / corriger les règles de classification SANS modifier
 * le code, en éditant simplement le JSON.
 * ----------------------------------------------------------------------------
 */

const path = require('path');
const fs = require('fs');
const llmService = require('./llmService');

// Chargement synchrone au démarrage — le fichier est petit et stable
const FAQ_PATH = path.join(__dirname, '..', 'config', 'faq.json');
const faq = JSON.parse(fs.readFileSync(FAQ_PATH, 'utf8'));

// Préfixe interne (clés commençant par _) → exclus de la classification
function isFaqCategoryKey(key) {
  return !key.startsWith('_');
}

/**
 * Construit le dictionnaire { clé: description } passé au LLM pour la
 * classification. Les descriptions sont stockées en français dans le JSON.
 */
function buildCategoriesMap() {
  const map = {};
  for (const [key, value] of Object.entries(faq)) {
    if (!isFaqCategoryKey(key)) continue;
    map[key] = value._description_classifier || `Catégorie ${key}`;
  }
  return map;
}

const categoriesMap = buildCategoriesMap();

/**
 * Demande au LLM de classer le message dans une catégorie FAQ.
 *
 * @param {string} userMessage Message brut du client
 * @param {Array}  history     Historique des échanges pour contexte
 * @returns {Promise<{category: string|null, confidence: number}>}
 */
async function matchCategory(userMessage, history = []) {
  const result = await llmService.classify({
    userMessage,
    history,
    categoriesMap,
  });

  // Garde-fou : si le LLM renvoie une catégorie inconnue (hallucination),
  // on la rejette plutôt que de planter au moment du getAnswer().
  if (result.category && !categoriesMap[result.category]) {
    console.warn(`[faqMatcher] Catégorie inconnue renvoyée par le LLM : "${result.category}" — ignorée`);
    return { category: null, confidence: 0 };
  }
  return result;
}

/**
 * Récupère la réponse pré-rédigée dans la langue demandée.
 * Si la traduction manque (cas pathologique), on retombe sur le français.
 */
function getAnswer(categoryKey, languageCode) {
  const entry = faq[categoryKey];
  if (!entry) return null;
  return entry[languageCode] || entry.fr || null;
}

/**
 * Récupère un message système (langue non reconnue, fallback, transfert agent).
 * Utilisé pour les messages de service côté bot.
 */
function getSystemMessage(messageKey, languageCode) {
  const sys = faq._system_messages;
  if (!sys || !sys[messageKey]) return null;
  return sys[messageKey][languageCode] || sys[messageKey].fr || null;
}

module.exports = {
  matchCategory,
  getAnswer,
  getSystemMessage,
  // Exposé pour les tests / inspection
  _categoriesMap: categoriesMap,
};
