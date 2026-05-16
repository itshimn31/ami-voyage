/**
 * whatsappSender.js
 * ----------------------------------------------------------------------------
 * Wrapper autour de l'API Twilio pour envoyer des messages WhatsApp sortants.
 *
 * L'API Twilio attend des numéros préfixés par `whatsapp:` — par exemple
 * `whatsapp:+33612345678`. Si l'appelant fournit un numéro nu (Twilio nous le
 * passe parfois préfixé, parfois non selon le contexte), on normalise.
 *
 * Note : on n'utilise pas TwiML (réponse inline au webhook) car le bot doit
 * pouvoir envoyer plusieurs messages distincts (réponse client + résumé agent)
 * — l'API REST est plus adaptée à ce cas d'usage.
 * ----------------------------------------------------------------------------
 */

const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;

// Le client Twilio est initialisé paresseusement pour ne pas crasher
// l'import si les variables d'env manquent en dev local (cas des tests).
let client = null;
function getClient() {
  if (client) return client;
  if (!accountSid || !authToken) {
    throw new Error(
      'TWILIO_ACCOUNT_SID et TWILIO_AUTH_TOKEN doivent être définis dans .env'
    );
  }
  client = twilio(accountSid, authToken);
  return client;
}

/**
 * Normalise un numéro pour l'API Twilio WhatsApp.
 * - Accepte "whatsapp:+33...", "+33...", "33...".
 * - Renvoie toujours le format "whatsapp:+33...".
 */
function normalize(phone) {
  if (!phone) throw new Error('whatsappSender.normalize : numéro manquant');
  let p = phone.trim();
  if (p.startsWith('whatsapp:')) return p;
  if (!p.startsWith('+')) p = `+${p}`;
  return `whatsapp:${p}`;
}

/**
 * Envoie un message WhatsApp.
 *
 * @param {string} to    Numéro du destinataire (sera normalisé)
 * @param {string} body  Texte du message (max 1600 caractères par WhatsApp)
 * @returns {Promise<object>} Objet Message Twilio
 */
async function sendMessage(to, body) {
  if (!body || !body.trim()) {
    throw new Error('whatsappSender.sendMessage : body vide');
  }
  if (!fromNumber) {
    throw new Error('TWILIO_WHATSAPP_NUMBER doit être défini dans .env');
  }

  const twilioClient = getClient();
  const message = await twilioClient.messages.create({
    from: fromNumber,
    to: normalize(to),
    body: body.slice(0, 1600), // garde-fou : WhatsApp coupe au-delà
  });

  console.log(`[whatsappSender] → ${to} (sid=${message.sid})`);
  return message;
}

module.exports = {
  sendMessage,
  normalize,
};
