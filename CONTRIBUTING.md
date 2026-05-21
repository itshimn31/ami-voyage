# Contribuer à Ami Voyages

Bienvenue ! Ce document est le manuel d'équipe pour bosser sur ce repo
**sans se marcher sur les pieds**.

À lire entièrement avant le premier commit.

---

## 🌳 Structure des branches

Deux branches permanentes — pas une de plus :

| Branche | Rôle | Push direct autorisé ? |
| --- | --- | --- |
| **`prod`** | Le code en ligne sur ami-voyages.com. Sacré. | ❌ Jamais. Seulement merge depuis `main`. |
| **`main`** | Branche d'intégration : c'est là qu'arrivent les features finies et testées. | ❌ Jamais. Seulement merge depuis une branche de feature. |

Toutes les **autres branches sont temporaires** — on les crée pour une tâche, on
les supprime après merge.

---

## 🏷️ Nommage des branches temporaires

Format obligatoire : `<type>/<description-en-kebab-case>`

| Préfixe | Pour quoi | Exemple |
| --- | --- | --- |
| `feat/` | Nouvelle fonctionnalité visible côté utilisateur | `feat/booking-form` |
| `fix/` | Correction de bug | `fix/mobile-menu-overflow` |
| `refactor/` | Réécriture sans changement fonctionnel | `refactor/contact-form` |
| `chore/` | Maintenance, dépendances, config | `chore/upgrade-nextjs` |
| `docs/` | Modifs de doc uniquement | `docs/readme-deploy` |
| `style/` | Formatting, lint (sans logique métier) | `style/eslint-cleanup` |
| `test/` | Ajout / réparation de tests | `test/contact-form` |

❌ **Pas accepté** : `mon-truc`, `temp`, `test1`, `wip`, ton prénom seul.

---

## 🔄 Le workflow standard, étape par étape

### 1. Avant de commencer une tâche

```bash
git checkout main
git pull --rebase origin main
git checkout -b feat/ma-feature
```

### 2. Pendant que tu codes

- Commits aussi petits que tu veux — on les nettoie au merge avec "Squash".
- Pour chaque commit, écris un **message clair** (voir la section "Messages
  de commit" plus bas).

### 3. Avant de pousser

Rebase sur `main` à jour pour éviter les conflits :

```bash
git fetch origin
git rebase origin/main
# résoudre les conflits si besoin
```

### 4. Pousser et ouvrir la PR

```bash
git push -u origin feat/ma-feature
gh pr create --base main
```

- ✅ Base de la PR = **toujours `main`**.
- ✅ Une PR = une chose logique. Pas de PR fourre-tout.
- ✅ Description = remplir le template (résumé + test plan).

### 5. Review

- L'autre membre de l'équipe relit, commente, demande des changements.
- Tu pousses des commits supplémentaires sur la même branche tant que
  c'est pas approuvé.
- Une fois approuvé : **Squash & merge** vers `main`.

### 6. Après merge

```bash
git checkout main
git pull --rebase
git branch -d feat/ma-feature
git push origin --delete feat/ma-feature   # ou cocher la case sur GitHub
```

### 7. Mettre en prod

Une fois que `main` est dans un état stable et déployable :

- Ouvrir une PR `main → prod`
- Les deux membres relisent et valident
- Merge — le déploiement se déclenche (CI/CD à configurer).

---

## ✍️ Messages de commit (Conventional Commits, simplifié)

Format :

```
<type>: <description courte, à l'impératif, sans point final>

(optionnel : un paragraphe expliquant le « pourquoi »)
```

**Types acceptés** : `feat`, `fix`, `refactor`, `docs`, `chore`, `style`, `test`, `perf`.

### Bons exemples

```
feat: add WhatsApp chatbot integration

Listens for incoming messages on the agency's WhatsApp number and
routes them to a Claude-powered triage that detects language and
forwards to a human agent for complex cases.
```

```
fix: prevent mobile menu from horizontally overflowing
```

```
refactor: extract HoursTicket from Hero
```

### Mauvais exemples (à ne pas faire)

```
update                       ← Aucune info
"fix"                        ← Quoi ?
WIP                          ← Ne devrait pas être commit
asdf                         ← Sérieusement
"j'ai changé le formulaire"  ← Pas à l'impératif, contexte flou
```

---

## 🚦 Règles d'or anti-conflit

1. **Branches courtes** — vise 3-4 jours max. Plus longue → ça diverge et
   les conflits arrivent.
2. **Rebase souvent** — `git fetch && git rebase origin/main` chaque matin
   sur ta branche active.
3. **PRs petites** — 200-400 lignes max. Au-delà, splitte en plusieurs PRs.
4. **Communique avant de toucher au même fichier** — un message dans le
   chat de l'équipe : « Je touche au Hero pour 2h, posez pas dessus ».
5. **Jamais de `git push --force` sur `main` ou `prod`.** Sur tes propres
   branches `feat/...`, utilise `--force-with-lease` si vraiment nécessaire.
6. **Jamais de commit direct sur `main` ou `prod`.** Toujours passer par
   une PR, sans exception.

---

## 🛡️ Branches protégées (déjà configuré côté GitHub)

`main` :
- ✅ PR obligatoire avant merge
- ✅ 1 approbation requise (= l'autre dev valide)
- ✅ Dismiss stale approvals quand de nouveaux commits sont poussés
- ✅ Conversations résolues avant merge
- ✅ Force push bloqué

`prod` :
- ✅ Toutes les règles de `main`
- ✅ PR uniquement depuis `main` (pas d'autres branches)
- ✅ Restrict push aux mainteneurs

Si ce n'est pas encore activé : Settings → Branches → Add rule.

---

## 🆘 Que faire quand…

### …je suis sur la mauvaise branche et j'ai déjà commit ?

```bash
git log --oneline -5                # repère le commit
git reset HEAD~1 --soft             # annule le commit, garde les modifs
git stash                           # met les modifs de côté
git checkout -b feat/la-bonne-branche
git stash pop                       # ramène les modifs
git add . && git commit -m "..."
```

### …j'ai un conflit au rebase ?

```bash
git status                          # vois les fichiers en conflit
# édite chaque fichier, choisis entre <<<<< HEAD et >>>>>
git add <fichier-résolu>
git rebase --continue
```

Si tu paniques : `git rebase --abort` et demande de l'aide.

### …j'ai poussé un secret/mot de passe par erreur ?

1. **Préviens immédiatement** dans le chat équipe
2. Considère le secret comme compromis — change-le où qu'il soit utilisé
3. On nettoiera l'historique git ensemble

### …je veux annuler un commit déjà sur `main` ?

Ne touche pas à l'historique de `main`. Crée une nouvelle PR qui défait
le commit avec :

```bash
git checkout -b fix/revert-xxx
git revert <sha-du-commit>
git push origin fix/revert-xxx
gh pr create --base main
```

---

## 👋 Onboarding (premier jour)

```bash
# 1. Cloner
git clone https://github.com/itshimn31/ami-voyage.git
cd ami-voyage

# 2. Lire les docs
# - README.md           ← démarrer le projet
# - CONTRIBUTING.md     ← ce fichier
# - CLAUDE.md           ← règles pour les agents IA
# - ami-voyages-next/README.md  ← détails techniques du site

# 3. Configurer Git
git config user.name "Ton Prénom"
git config user.email "ton@email.com"

# 4. Configurer gh CLI
gh auth login
gh auth setup-git

# 5. Lancer le projet
cd ami-voyages-next
npm install
npm run dev
# ouvrir http://localhost:3000
```

Bienvenue dans l'équipe 🚀
