# Ami Voyages — Chatbot WhatsApp multilingue

Chatbot WhatsApp pour l'agence de voyage **Ami Voyages**, spécialisée dans
l'Asie du Sud (Bangladesh, Inde du Sud, Sri Lanka) et l'Afrique subsaharienne.

Il filtre les questions récurrentes (horaires, prix, visa, bagages, paiements…)
en **5 langues** (français, anglais, bangla, hindi, tamoul) avant transfert vers
un agent humain — l'agent reçoit alors un résumé automatique **en français**.

---

## Architecture

```
chatbot_whatsapp/
├── index.js                    # Serveur Express + webhook Twilio
├── config/
│   └── faq.json                # Réponses FAQ × 5 langues (modifiable sans toucher au code)
└── services/
    ├── sessionManager.js       # Sessions in-memory (4 h d'inactivité avant reset)
    ├── languageHandler.js      # Sélection de langue + détection mots-clés escalade
    ├── llmService.js           # Wrapper Anthropic Claude API
    ├── faqMatcher.js           # Classification LLM → catégorie FAQ
    ├── summaryGenerator.js     # Résumé français pour l'agent
    └── whatsappSender.js       # Envoi via Twilio API
```

## Pré-requis

- Node.js ≥ 20
- Un compte Twilio avec WhatsApp activé (sandbox ou numéro approuvé)
- Une clé API Anthropic Claude

## Installation

```bash
cd chatbot_whatsapp
npm install
cp .env.example .env
# éditer .env avec vos vraies valeurs
npm start
```

## Configuration du webhook Twilio

Twilio doit appeler `POST /webhook` à chaque message entrant.
Pour exposer un serveur local pendant le développement :

```bash
ngrok http 3000
# puis copier l'URL https publique dans la console Twilio :
# Messaging > WhatsApp > Sandbox Settings > "When a message comes in"
# → https://xxxx.ngrok.io/webhook
```

## Modifier les réponses FAQ

Toutes les réponses sont dans [`config/faq.json`](config/faq.json), structurées par catégorie et par langue :

```json
"horaires": {
  "_description_classifier": "Le client demande les horaires d'ouverture.",
  "fr": "🕐 Horaires d'Ami Voyages...",
  "en": "🕐 Ami Voyages opening hours...",
  ...
}
```

- La clé `_description_classifier` est lue **uniquement par le LLM** pour décider
  si un message correspond à cette catégorie. Vous pouvez l'affiner sans toucher
  au code pour améliorer la précision.
- Les clés `fr`, `en`, `bn`, `hi`, `ta` sont les **réponses livrées au client**.
- Aucun redémarrage n'est nécessaire **si vous voulez recharger à chaud** ;
  sinon redémarrer le serveur prend en compte les changements immédiatement.

## Catégories FAQ couvertes

| Catégorie | Description |
|---|---|
| `horaires` | Horaires et adresse de l'agence |
| `billets_disponibilite` | Disponibilité des vols |
| `prix` | Tarifs et devis |
| `visa` | Services visa |
| `paiement_moyens` | Moyens de paiement acceptés |
| `annulation` | Annulation / modification de billet |
| `bagages` | Franchise bagages |
| `sieges` | Choix des sièges |
| `bus` | Voyages en bus |
| `telephone` | Pourquoi l'agence ne répond pas toujours au téléphone |
| `paiement_conditions` | Paiement en plusieurs fois |
| `rappel` | Demande de rappel par un agent |

## Déclencheurs d'escalade vers un agent humain

Le bot transfère automatiquement à un humain dans 4 cas :

1. **Demande explicite** — mots-clés : `agent`, `humain`, `help`, `aide`,
   `সাহায্য`, `मदद`, `உதவி` (et variantes par langue).
2. **Insatisfaction explicite** — mots-clés négatifs détectés.
3. **Question hors périmètre après 2 tentatives** infructueuses de classification.
4. **5 échanges atteints** sans résolution satisfaisante.

À l'escalade, l'agence reçoit un message structuré sur le numéro
`AGENCY_INTERNAL_WHATSAPP` :

```
📋 RÉSUMÉ DE CONVERSATION — Ami Voyages Bot
👤 Client : +33XXXXXXXXX
🕐 Date/Heure : 16/05/2026 14:32
🌍 Langue utilisée : বাংলা (Bangla)
📝 Résumé de la demande : (3-5 lignes générées en français par Claude)
❓ Questions posées : ...
✅ Réponses fournies par le bot : ...
⚠️ Raison du transfert : Question hors périmètre
🔁 Statut : En attente de prise en charge par un agent
```

## Variables d'environnement clés

Voir [`.env.example`](.env.example) pour la liste complète. Les plus
importantes :

| Variable | Rôle |
|---|---|
| `ANTHROPIC_API_KEY` | Clé Anthropic pour classification + résumé |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` | Authentification Twilio |
| `TWILIO_WHATSAPP_NUMBER` | Numéro WhatsApp d'envoi (préfixé par `whatsapp:`) |
| `AGENCY_INTERNAL_WHATSAPP` | Destinataire des résumés d'escalade |
| `SESSION_TIMEOUT_MS` | Durée avant reset session (défaut : 4 h) |
| `MAX_EXCHANGES_BEFORE_ESCALATION` | Seuil d'échanges (défaut : 5) |
| `MAX_FAILED_CLASSIFICATIONS` | Seuil d'échecs (défaut : 2) |

## Notes production

- **Sessions in-memory** : pour un déploiement multi-instance (PM2 cluster,
  Kubernetes…), remplacer la `Map` de [`services/sessionManager.js`](services/sessionManager.js)
  par un store Redis. L'interface publique du module est conçue pour rester
  identique.
- **Validation des signatures Twilio** : pour la production, ajouter un middleware
  vérifiant l'en-tête `X-Twilio-Signature` (voir `twilio.webhook()` dans le SDK).
- **Modèles Claude** : par défaut Haiku 4.5 pour la classification (rapide,
  économique) et Sonnet 4.6 pour les résumés (qualité de français). Modifiables
  via `.env`.

## Health-check

```
GET /health → { status: "ok", activeSessions: <n>, timeoutMs: 14400000 }
```
