# Instructions pour les agents IA (Claude, Cursor, etc.)

Ce fichier est lu automatiquement par Claude Code et compatibles à chaque
session ouverte dans ce repo. Il contient les **règles non-négociables**
que toute IA travaillant sur ce projet doit suivre.

---

## 🛑 Règle n°1 — Ne JAMAIS commit sans demander le message

Avant chaque `git commit`, tu dois :

1. Montrer les fichiers stagés (`git status --short`)
2. **Proposer** un message de commit en 1-2 lignes
3. **Demander** à l'humain s'il valide ou veut réécrire le message
4. **Attendre** la réponse avant d'exécuter `git commit`

Exception unique : commits triviaux dans une boucle déjà autorisée
explicitement (par exemple « commit chaque étape de cette migration »).
Même là, demander confirmation au début de la boucle.

---

## 🛡️ Règles sur les branches

- **Jamais** de commit ni push direct sur `main` ou `prod`.
- Toujours créer une branche `feat/...`, `fix/...`, `refactor/...`,
  `chore/...`, `docs/...` ou `test/...`.
- Une PR = un changement logique. Ne pile pas des features différentes
  dans une même branche.
- Avant de commencer : `git checkout main && git pull --rebase` puis
  branche.

---

## 🚫 Actions interdites sans autorisation explicite

Demande systématiquement avant :

- `git push --force` ou `--force-with-lease` (même sur branches feature)
- `git reset --hard`
- `git rebase` qui réécrit l'historique d'une branche partagée
- Suppression d'une branche distante (`git push origin --delete`)
- Tout `git checkout -- <fichier>` qui détruit du travail non commit
- Toute modification de `.github/workflows/`, `package.json` (deps),
  `tailwind.config.ts` (palette), ou `next.config.js`
- Toute commande qui touche au déploiement (Vercel, etc.)
- Installation de nouvelles dépendances npm

Les opérations en **lecture seule** (`git status`, `git log`, `git diff`,
`grep`, lecture de fichiers, `npm run dev`, `npm run build`) sont libres.

---

## 📝 Format des messages de commit (Conventional Commits)

```
<type>: <description courte à l'impératif, sans point final>

(optionnel : un paragraphe expliquant le « pourquoi »)
```

Types : `feat`, `fix`, `refactor`, `docs`, `chore`, `style`, `test`, `perf`.

Ne PAS ajouter de ligne `Co-Authored-By:` par défaut — sauf si l'humain
le demande explicitement pour un commit donné.

---

## 🎨 Conventions du projet (à respecter strictement)

### Palette de couleurs

Toutes les couleurs viennent de `tailwind.config.ts` sous `ami.*` :
`purple`, `purple-deep`, `purple-vivid`, `magenta`, `magenta-soft`, `cream`,
`ink`.

**Ne pas inventer de nouvelles couleurs hors palette.**

### Textes & contenu

Tout le contenu (titres, paragraphes, listes de pays, coordonnées,
témoignages…) vient de `ami-voyages-next/data/content.ts`. **Aucun texte
en dur dans les composants.**

### Images

- Photos distantes via Unsplash (URLs `images.unsplash.com`) ou logo.dev
  (`img.logo.dev`). Toute nouvelle source d'image doit être ajoutée à
  `next.config.js` → `images.remotePatterns`.
- Photos client/locales dans `public/images/`. Documenter dans
  `IMAGES.md`.
- Toujours `next/image` (jamais `<img>` direct).

### Composants

- Tous les composants `'use client'` qui utilisent Framer Motion.
- Server components par défaut quand pas d'interactivité.
- Animations via Framer Motion (jamais d'animation CSS pure quand on a
  besoin de scroll-triggered, parallax, ou stagger).

### Accessibilité

- `alt` complets sur toutes les images
- `aria-label` sur les boutons icônes
- `*:focus-visible` doit rester visible (outline magenta défini dans
  `globals.css`)
- Respecter `prefers-reduced-motion`

---

## 🧪 Avant chaque PR, vérifier

```bash
cd ami-voyages-next
npm run build    # doit passer sans erreur
npm run lint     # idéalement clean
```

Si `npm run build` échoue, ne pas pousser tant que ce n'est pas corrigé.

---

## 📂 Architecture du repo

```
amivoyage/
├── ami-voyages-next/          # le site Next.js (la prod)
│   ├── app/                   # App Router : layout, pages
│   ├── components/            # tous les composants UI
│   ├── data/content.ts        # 🎯 source unique de vérité textuelle
│   ├── public/images/         # photos client / partenaires
│   ├── tailwind.config.ts     # palette ami-*
│   └── next.config.js
│
├── ami-voyages/               # ancien site statique (référence historique,
│                              # pas à toucher)
├── chatbot_whatsapp/          # bot WhatsApp séparé (ignoré côté Git)
│
├── CONTRIBUTING.md            # workflow Git humain
├── CLAUDE.md                  # ce fichier
└── .github/PULL_REQUEST_TEMPLATE.md
```

---

## ✅ Checklist mentale avant chaque action

Avant d'exécuter une commande qui modifie l'état du repo, te poser :

1. Suis-je sur la bonne branche ? (`feat/...` et pas `main`)
2. L'humain m'a-t-il explicitement autorisé cette action ?
3. Pour un commit : ai-je demandé le message ?
4. Cette modif est-elle isolable dans une PR claire ?
5. La build passe-t-elle toujours ?

Si « non » à au moins une question : s'arrêter, demander.
