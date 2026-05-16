/**
 * sessionManager.js
 * ----------------------------------------------------------------------------
 * Gestion des sessions clients identifiées par leur numéro WhatsApp.
 *
 * Une session contient :
 *   - state              : étape du flux conversationnel (AWAITING_LANGUAGE,
 *                          ACTIVE, TRANSFERRED)
 *   - language           : code langue choisi (fr, en, bn, hi, ta)
 *   - history            : historique des échanges (rôle + texte)
 *   - exchangeCount      : nombre d'échanges avec le bot
 *   - failedClassifications : compteur de questions hors-périmètre consécutives
 *   - lastActivityAt     : timestamp pour gérer l'expiration (4 h par défaut)
 *
 * NOTE : implémentation in-memory (Map). Pour un usage production multi-instance,
 * remplacer par Redis ou une base de données partagée — l'interface publique
 * exposée par ce module reste identique.
 * ----------------------------------------------------------------------------
 */

const SESSION_TIMEOUT_MS = parseInt(process.env.SESSION_TIMEOUT_MS, 10) || 4 * 60 * 60 * 1000;

const STATES = Object.freeze({
  AWAITING_LANGUAGE: 'AWAITING_LANGUAGE',
  ACTIVE: 'ACTIVE',
  TRANSFERRED: 'TRANSFERRED',
});

// Map<phoneNumber, sessionObject>
const sessions = new Map();

/**
 * Crée une nouvelle session vierge pour un numéro client.
 * Démarre en état AWAITING_LANGUAGE — le bot enverra alors le menu de langues.
 */
function createSession(phoneNumber) {
  const session = {
    phoneNumber,
    state: STATES.AWAITING_LANGUAGE,
    language: null,
    history: [], // [{ role: 'user'|'bot'|'agent', text, category?, timestamp }]
    exchangeCount: 0,
    failedClassifications: 0,
    lastActivityAt: Date.now(),
    createdAt: Date.now(),
  };
  sessions.set(phoneNumber, session);
  return session;
}

/**
 * Récupère la session d'un client.
 * Si la session a expiré (inactivité > SESSION_TIMEOUT_MS), elle est purgée
 * et le client recommence à zéro (= nouveau message de bienvenue).
 */
function getSession(phoneNumber) {
  const session = sessions.get(phoneNumber);
  if (!session) return null;

  const elapsed = Date.now() - session.lastActivityAt;
  if (elapsed > SESSION_TIMEOUT_MS) {
    sessions.delete(phoneNumber);
    return null;
  }
  return session;
}

/**
 * Récupère la session existante ou en crée une nouvelle si nécessaire.
 * C'est la méthode à utiliser en début de traitement d'un message entrant.
 */
function getOrCreateSession(phoneNumber) {
  return getSession(phoneNumber) || createSession(phoneNumber);
}

/**
 * Met à jour la langue choisie et fait basculer la session en ACTIVE.
 */
function setLanguage(phoneNumber, languageCode) {
  const session = sessions.get(phoneNumber);
  if (!session) return null;
  session.language = languageCode;
  session.state = STATES.ACTIVE;
  session.lastActivityAt = Date.now();
  return session;
}

/**
 * Ajoute un message à l'historique de la session.
 * `role` : 'user' (client), 'bot' (réponse automatique), 'agent' (message humain)
 * `category` (optionnel) : catégorie FAQ détectée pour les réponses du bot
 */
function appendMessage(phoneNumber, role, text, category = null) {
  const session = sessions.get(phoneNumber);
  if (!session) return null;
  session.history.push({
    role,
    text,
    category,
    timestamp: new Date().toISOString(),
  });
  session.lastActivityAt = Date.now();
  return session;
}

/**
 * Incrémente le compteur global d'échanges. Sert au déclencheur d'escalade
 * automatique après MAX_EXCHANGES_BEFORE_ESCALATION échanges sans résolution.
 */
function incrementExchange(phoneNumber) {
  const session = sessions.get(phoneNumber);
  if (!session) return null;
  session.exchangeCount += 1;
  return session;
}

/**
 * Incrémente / réinitialise le compteur de classifications infructueuses.
 * On escalade après MAX_FAILED_CLASSIFICATIONS échecs *consécutifs*.
 */
function incrementFailedClassification(phoneNumber) {
  const session = sessions.get(phoneNumber);
  if (!session) return null;
  session.failedClassifications += 1;
  return session;
}

function resetFailedClassifications(phoneNumber) {
  const session = sessions.get(phoneNumber);
  if (!session) return null;
  session.failedClassifications = 0;
  return session;
}

/**
 * Marque la session comme transférée à un agent humain.
 * Les messages suivants ne déclenchent plus le bot — un agent prend la main.
 */
function markTransferred(phoneNumber) {
  const session = sessions.get(phoneNumber);
  if (!session) return null;
  session.state = STATES.TRANSFERRED;
  return session;
}

/**
 * Supprime explicitement la session (par exemple sur demande de réinitialisation).
 */
function deleteSession(phoneNumber) {
  return sessions.delete(phoneNumber);
}

/**
 * Tâche périodique : purge des sessions inactives.
 * À lancer toutes les 30 minutes depuis index.js via setInterval.
 */
function purgeExpiredSessions() {
  const now = Date.now();
  let purged = 0;
  for (const [phone, session] of sessions.entries()) {
    if (now - session.lastActivityAt > SESSION_TIMEOUT_MS) {
      sessions.delete(phone);
      purged += 1;
    }
  }
  return purged;
}

/**
 * Statistiques de debug pour monitoring / endpoint de santé.
 */
function getStats() {
  return {
    activeSessions: sessions.size,
    timeoutMs: SESSION_TIMEOUT_MS,
  };
}

module.exports = {
  STATES,
  createSession,
  getSession,
  getOrCreateSession,
  setLanguage,
  appendMessage,
  incrementExchange,
  incrementFailedClassification,
  resetFailedClassifications,
  markTransferred,
  deleteSession,
  purgeExpiredSessions,
  getStats,
};
