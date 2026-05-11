# Ami Voyages — Site web

Site web premium multi-pages pour **Ami Voyages**, agence de voyage parisienne
spécialiste du vol sec vers l'Asie du Sud et l'Afrique Subsaharienne (depuis 2002).

## Structure

```
ami-voyages/
├── index.html                    # Accueil avec hero + moteur de recherche
├── asie-du-sud.html              # Page destinations Asie du Sud
├── afrique-subsaharienne.html    # Page destinations Afrique Subsaharienne
├── formalites.html               # Page formalités (accordéon)
├── contact.html                  # Contact + formulaire de devis
├── styles.css                    # Feuille de styles unique
├── script.js                     # JS vanilla unique
└── README.md                     # Ce fichier
```

## Lancer le site

Le site est **100 % statique**. Trois manières de l'ouvrir :

1. **Double-clic** sur `index.html` — fonctionne immédiatement, pas de serveur requis.
2. **Live Server** (extension VS Code) — pour bénéficier du rechargement automatique.
3. **Serveur local** :
   ```bash
   cd ami-voyages
   python3 -m http.server 8000
   # puis http://localhost:8000
   ```

## Direction artistique

- **Style** : carnet de voyage éditorial premium (Airbnb / Off the Grid / magazine)
- **Palette** : terracotta / ivoire / nuit / or / sauge — pas de violet
- **Typographies** : Fraunces (titres), Manrope (corps), Caveat (touches manuscrites)
- **Effets** : grain SVG en overlay, animations `IntersectionObserver`, backdrop-filter
- **Aucune image bitmap externe** : tout est en SVG, gradients CSS et placeholders

## Customisation rapide

### Changer les couleurs
Éditez les variables CSS au début de `styles.css` :
```css
:root {
  --terracotta: #C5532E;
  --ivory: #F5EFE6;
  --night: #1A2238;
  /* ... */
}
```

### Changer les coordonnées
Cherchez `01 53 26 73 86`, `07 52 35 58 27`, `amivoyages2002@free.fr` et
`157 rue Lafayette` dans les fichiers HTML.

### Connecter le formulaire de contact
Le formulaire dans `contact.html` est en validation côté client uniquement.
Pour l'envoyer par email, deux options simples :

1. **Formspree** : remplacez `<form id="contact-form" novalidate>` par
   `<form action="https://formspree.io/f/VOTRE_ID" method="POST">` et retirez
   le `e.preventDefault()` dans `script.js`.
2. **Backend dédié** : ajoutez l'URL de votre endpoint en `action` et adaptez
   le handler dans `script.js`.

### Connecter le moteur de recherche aux APIs (Amadeus, Skyscanner...)
Le moteur en page d'accueil pré-remplit aujourd'hui le formulaire de contact
via les paramètres d'URL. Pour le brancher à une vraie API de recherche de
vols, modifiez la fonction du `searchForm.addEventListener('submit', ...)`
dans `script.js`.

## Accessibilité & SEO

- HTML5 sémantique (header, main, section, article, footer, nav)
- ARIA labels sur les éléments interactifs
- Focus visible (outline terracotta)
- Contrastes WCAG AA respectés
- Meta descriptions uniques par page
- Schema.org `TravelAgency` sur la page d'accueil
- Open Graph configuré
- Stylesheet d'impression basique
- `prefers-reduced-motion` respecté

## Compatibilité

- Tous navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Mobile-first, breakpoints 640px et 1024px
- Aucune dépendance externe sauf Google Fonts (Fraunces, Manrope, Caveat)

## Déploiement

Le site est prêt pour tout hébergement statique :

- **Netlify** : glisser-déposer le dossier `ami-voyages/` sur l'interface
- **Vercel** : `vercel deploy`
- **GitHub Pages** : pousser dans la branche `gh-pages`
- **OVH / hébergement classique** : transférer les fichiers en FTP

Aucun build step requis.

## Licence

© 2002–2026 Ami Voyages. Tous droits réservés.
