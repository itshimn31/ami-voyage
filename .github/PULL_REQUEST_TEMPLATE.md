<!--
Merci pour ta PR ! Remplis chaque section. Une PR non remplie ne sera
pas reviewée. Voir CONTRIBUTING.md pour le workflow complet.
-->

## 📝 Résumé

<!-- 2-3 lignes max : qu'est-ce que cette PR change et pourquoi ? -->

## 🏷️ Type de changement

<!-- Coche ce qui correspond (un seul type idéalement) -->

- [ ] `feat` — nouvelle fonctionnalité visible côté utilisateur
- [ ] `fix` — correction de bug
- [ ] `refactor` — réécriture sans changement fonctionnel
- [ ] `chore` — maintenance, dépendances, config
- [ ] `docs` — documentation
- [ ] `style` — formatting, lint
- [ ] `test` — tests
- [ ] `perf` — amélioration de performance

## 🔍 Détails techniques

<!--
Liste les fichiers modifiés et explique brièvement le « comment ».
Pas besoin d'être exhaustif — juste ce qu'un reviewer doit savoir
pour comprendre le diff sans poser de question.
-->

-
-

## 🧪 Plan de test

<!--
Étapes pour vérifier que ça marche. Le reviewer va les suivre.
-->

- [ ] `cd ami-voyages-next && npm install`
- [ ] `npm run build` passe sans erreur
- [ ] `npm run dev` puis ouvrir http://localhost:3000
- [ ]
- [ ]

## 📸 Captures d'écran / vidéo

<!--
Obligatoire si la PR touche à l'UI. Glisse-dépose les images ici.
Avant / Après quand pertinent.
-->

## ⚠️ Notes pour le reviewer

<!--
À remplir uniquement si nécessaire :
- breaking changes ?
- migration de données ?
- variables d'env à ajouter ?
- dépend d'une autre PR ?
-->

## ✅ Checklist auto-review (à cocher avant de demander une review)

- [ ] J'ai lu le diff complet de ma PR avant de soumettre
- [ ] Les textes sont dans `data/content.ts` (rien en dur dans les composants)
- [ ] Les couleurs sont dans la palette `ami-*` (pas de hex inventé)
- [ ] `npm run build` passe
- [ ] Les images ont des `alt` complets
- [ ] La PR cible bien `main` (et pas `prod`)
- [ ] Le nom de la branche suit le format `<type>/<description>`
