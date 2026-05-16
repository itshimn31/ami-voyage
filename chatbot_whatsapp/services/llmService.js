/**
 * llmService.js
 * ----------------------------------------------------------------------------
 * Wrapper minimal autour du SDK Anthropic pour les deux usages de l'app :
 *   1. classify() — choisir une catégorie FAQ (ou renvoyer null) en fonction
 *      du message client. Sortie JSON structurée.
 *   2. summarize() — générer le résumé en français à destination de l'agent.
 *
 * Le SDK officiel `@anthropic-ai/sdk` lit automatiquement ANTHROPIC_API_KEY
 * depuis l'environnement.
 *
 * Les modèles utilisés sont configurables via .env (ANTHROPIC_MODEL_*) pour
 * permettre de basculer rapidement entre Haiku / Sonnet / Opus selon le
 * compromis coût / qualité.
 * ----------------------------------------------------------------------------
 */

const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic.Anthropic();

const CLASSIFICATION_MODEL = process.env.ANTHROPIC_MODEL_CLASSIFICATION || 'claude-haiku-4-5';
const SUMMARY_MODEL = process.env.ANTHROPIC_MODEL_SUMMARY || 'claude-sonnet-4-6';

/**
 * Classifie un message client dans l'une des catégories FAQ disponibles.
 *
 * @param {object} params
 * @param {string} params.userMessage   - Le message brut du client
 * @param {Array}  params.history       - Historique récent (≤ 10 derniers tours)
 * @param {object} params.categoriesMap - Dictionnaire { clé: description } des
 *                                        catégories disponibles
 * @returns {Promise<{category: string|null, confidence: number}>}
 */
async function classify({ userMessage, history = [], categoriesMap }) {
  // On construit la liste des catégories sous une forme dense pour le prompt
  const categoryList = Object.entries(categoriesMap)
    .map(([key, description]) => `- ${key} : ${description}`)
    .join('\n');

  // Contexte conversationnel court (4 derniers tours suffisent pour la classif)
  const contextLines = history.slice(-4).map((m) => {
    const prefix = m.role === 'user' ? 'Client' : m.role === 'bot' ? 'Bot' : 'Agent';
    return `${prefix} : ${m.text}`;
  });
  const contextBlock = contextLines.length
    ? `\n\nContexte récent :\n${contextLines.join('\n')}`
    : '';

  const systemPrompt = `Tu es un classifieur d'intentions pour le service client d'une agence de voyage spécialisée dans l'Asie du Sud (Bangladesh, Inde du Sud, Sri Lanka) et l'Afrique Subsaharienne.

Ta seule mission : déterminer si le message du client correspond à l'une des catégories suivantes, et laquelle.

Catégories disponibles :
${categoryList}

Règles :
- Si le message correspond clairement à une catégorie, renvoie sa clé exacte.
- Si le message est hors périmètre (réservation spécifique, problème complexe, question ouverte), renvoie "null".
- Si tu hésites entre 2 catégories, choisis la plus probable.
- N'invente jamais une catégorie qui ne figure pas dans la liste.

Réponds UNIQUEMENT au format JSON suivant, sans aucun autre texte :
{"category": "<clé_exacte_ou_null>", "confidence": <nombre_entre_0_et_1>}`;

  const userPrompt = `Message du client : "${userMessage}"${contextBlock}

Classifie ce message.`;

  const response = await client.messages.create({
    model: CLASSIFICATION_MODEL,
    max_tokens: 200,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  });

  // On extrait le bloc texte de la réponse
  const textBlock = response.content.find((b) => b.type === 'text');
  const rawText = textBlock ? textBlock.text.trim() : '';

  // Le modèle renvoie du JSON ; on tente de le parser proprement
  try {
    // Nettoyage défensif : extraire le 1er objet JSON même si le modèle a
    // ajouté du texte autour (ce qui ne devrait pas arriver, mais sécurité)
    const match = rawText.match(/\{[\s\S]*\}/);
    if (!match) return { category: null, confidence: 0 };
    const parsed = JSON.parse(match[0]);

    // Le modèle peut renvoyer "null" sous forme de chaîne ou de null réel
    const category = parsed.category && parsed.category !== 'null' ? parsed.category : null;
    const confidence = typeof parsed.confidence === 'number' ? parsed.confidence : 0;

    return { category, confidence };
  } catch (err) {
    console.error('[llmService] Erreur de parsing classification :', err.message, 'rawText=', rawText);
    return { category: null, confidence: 0 };
  }
}

/**
 * Génère un résumé EN FRANÇAIS de la conversation pour transmission à l'agent.
 *
 * @param {object} params
 * @param {Array}  params.history     - Historique complet de la conversation
 * @param {string} params.languageLabel - Libellé humain de la langue du client
 * @returns {Promise<string>} Résumé court (3-5 lignes) en français
 */
async function summarize({ history, languageLabel }) {
  // Transcription brute pour le contexte du modèle
  const transcript = history
    .map((m) => {
      const prefix =
        m.role === 'user' ? 'Client' : m.role === 'bot' ? 'Bot' : 'Agent';
      return `${prefix} : ${m.text}`;
    })
    .join('\n');

  const systemPrompt = `Tu es un assistant qui produit des résumés EXCLUSIVEMENT EN FRANÇAIS pour les agents d'Ami Voyages, agence de voyage parisienne.

Ta mission : résumer la demande du client en 3 à 5 lignes maximum, dans un français professionnel et neutre.

Règles strictes :
- Toujours en français, même si la conversation est dans une autre langue.
- Synthétise UNIQUEMENT la demande du client et son contexte — pas les réponses du bot.
- Mentionne les éléments concrets s'ils figurent (destination, dates, nombre de passagers, type de service).
- Reste factuel : pas de jugement de valeur sur le client ou la qualité du bot.
- Pas de formules de politesse ni d'introduction du type "Voici le résumé". Le résumé lui-même, point.`;

  const userPrompt = `Conversation à résumer (langue du client : ${languageLabel}) :

${transcript}

Produis le résumé en français.`;

  const response = await client.messages.create({
    model: SUMMARY_MODEL,
    max_tokens: 400,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  });

  const textBlock = response.content.find((b) => b.type === 'text');
  return textBlock ? textBlock.text.trim() : '(résumé indisponible)';
}

module.exports = {
  classify,
  summarize,
};
