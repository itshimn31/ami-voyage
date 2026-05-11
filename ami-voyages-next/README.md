# Ami Voyages — Site officiel (Next.js)

Refonte complète du site **ami-voyages.com** : agence parisienne spécialiste du
vol sec et du voyage ethnique vers l'Asie du Sud et l'Afrique Subsaharienne,
depuis 2002.

---

## 🚀 Démarrage rapide

```bash
npm install
npm run dev
```

Puis ouvrez [http://localhost:3000](http://localhost:3000).

### Build production

```bash
npm run build
npm start
```

---

## 🛠 Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** avec palette `ami-*` personnalisée
- **Framer Motion** pour toutes les animations (reveal, parallaxe, magnetic)
- **GSAP** disponible pour effets avancés (déjà en dépendance)
- **Lenis** pour le smooth scroll global
- **Lucide React** pour les icônes
- **next/font** (`Bricolage Grotesque` + `Inter`) optimisées

---

## 🗂 Architecture

```
ami-voyages-next/
├── app/
│   ├── layout.tsx          # Fonts, métadonnées SEO, Loader, Cursor, Lenis
│   ├── page.tsx            # Composition de la home (single-page)
│   └── globals.css         # Tailwind + utilities custom (topo, ticket, gradient…)
├── components/
│   ├── Logo.tsx            # SVG inline du logo (animable au hover)
│   ├── Loader.tsx          # Loader d'entrée (logo qui se trace)
│   ├── CustomCursor.tsx    # Curseur custom mauve (desktop only)
│   ├── LenisProvider.tsx   # Smooth scroll global + scroll-to anchors
│   ├── Header.tsx          # Sticky nav + mega-menu + ticket horaires + tampon
│   ├── Hero.tsx            # Section plein écran + recherche + badges
│   ├── SearchBar.tsx       # Barre de recherche flottante
│   ├── PartnersMarquee.tsx # Marquee infini des compagnies aériennes
│   ├── FlightSpecialist.tsx# « Votre spécialiste du vol sec »
│   ├── Destinations.tsx    # Wrapper des deux DestinationCard
│   ├── DestinationCard.tsx # Carte immersive (parallaxe + zoom + hover overlay)
│   ├── PlaneTrail.tsx      # Avion SVG qui traverse au scroll
│   ├── Formalities.tsx     # Section Formalités + carrousel 3 étapes
│   ├── Exclusivities.tsx   # Grille 7 cartes (icône + reveal au hover)
│   ├── Stats.tsx           # 4 compteurs animés au scroll
│   ├── Values.tsx          # Section Valeurs + bloc citation
│   ├── ContactSection.tsx  # Carte info + formulaire (floating labels)
│   ├── Footer.tsx          # 4 colonnes + mini-carte + bandeau légal
│   ├── MagneticButton.tsx  # Bouton magnétique réutilisable
│   ├── AnimatedCounter.tsx # Compteur animé (entrée du viewport)
│   ├── RevealText.tsx      # Texte qui se révèle mot à mot
│   ├── SectionTitle.tsx    # Titre de section + ghost outline
│   └── PlaceholderImage.tsx# Placeholder mauve pour photos client à venir
├── data/
│   └── content.ts          # ⭐ Tous les textes, coordonnées, listes
├── public/images/          # Images locales (logos, photos client)
├── tailwind.config.ts      # Palette ami-* + animations + ombres
├── IMAGES.md               # Inventaire complet des images
└── README.md
```

---

## ✏️ Où modifier les textes

**Toute la copy est centralisée dans `data/content.ts`.** Aucun composant ne
contient de texte en dur. Pour modifier :

```ts
// data/content.ts
export const hero = {
  title: {
    pre: 'Redécouvrez',
    accent: 'votre pays d'origine.', // ← changez ici
  },
  // ...
};
```

Sections exportées :
`brand`, `contact`, `navigation`, `hero`, `partners`, `flightSpecialist`,
`destinations`, `formalities`, `exclusivities`, `stats`, `values`,
`contactSection`, `footer`.

---

## 🖼 Où remplacer les images

Voir [`IMAGES.md`](./IMAGES.md) pour l'inventaire complet.

**En résumé** :

1. Déposez votre photo dans `public/images/votre-photo.jpg`.
2. Dans `data/content.ts`, remplacez l'URL Unsplash par `/images/votre-photo.jpg`.
3. Adaptez le champ `imageAlt` pour le SEO.

```ts
// Avant
image: 'https://images.unsplash.com/photo-...',

// Après
image: '/images/agence-paris.jpg',
imageAlt: 'L'équipe Ami Voyages dans son agence parisienne',
```

---

## 🌍 Comment ajouter une destination

Ouvrir `data/content.ts` puis modifier `destinations.cards[].countries` :

```ts
{
  id: 'asie',
  // ...
  countries: [
    { flag: '🇮🇳', name: 'Inde' },
    { flag: '🇲🇻', name: 'Maldives' }, // ← nouveau pays
    // ...
  ],
}
```

Le mega-menu du header et la carte de destination se mettent à jour
automatiquement.

Pour ajouter **une 3ᵉ grande carte** (au-delà de Asie / Afrique), ajoutez un
nouvel objet dans `destinations.cards` (avec `id`, `title`, `description`,
`cta`, `image`, `imageAlt`, `countries`). Pensez à passer la grille de
`Destinations.tsx` en 3 colonnes (`lg:grid-cols-3`).

---

## 🎨 Palette de couleurs

Définie dans `tailwind.config.ts`, accessible partout via `bg-ami-purple`,
`text-ami-magenta`, etc.

| Token                | Hex       | Usage                          |
| -------------------- | --------- | ------------------------------ |
| `ami-purple`         | `#8B2A9B` | Header, accents principaux     |
| `ami-purple-deep`    | `#5D1A6B` | Footer, fonds sombres          |
| `ami-purple-vivid`   | `#A020B0` | Gradients, CTAs                |
| `ami-magenta`        | `#D946D9` | Boutons, hovers, highlights    |
| `ami-magenta-soft`   | `#E879E8` | Badges, accents légers         |
| `ami-cream`          | `#F8F5F2` | Fonds alternés                 |
| `ami-ink`            | `#1A0F22` | Texte foncé                    |

**Gradient signature** : `bg-gradient-to-br from-ami-purple-deep via-ami-purple to-ami-magenta`

---

## ✨ Animations livrées

- ✅ Curseur custom mauve (desktop, désactivé en touch)
- ✅ Smooth scroll Lenis + scroll-to ancres
- ✅ Loader d'entrée (logo tracé en SVG, fade out 2.2s)
- ✅ Parallaxe sur Hero, FlightSpecialist, Destinations, Formalities, Values
- ✅ Reveal au scroll (fade + Y, stagger sur enfants)
- ✅ Texte mot à mot sur les gros titres (`<RevealText />`)
- ✅ Magnetic buttons sur tous les CTAs majeurs
- ✅ Hover image zoom + overlay mauve (DestinationCard)
- ✅ Marquee infini partenaires (pause au hover)
- ✅ Compteurs animés au scroll (Stats)
- ✅ Gradient hypnotique animé (Hero)
- ✅ Avion SVG qui traverse + traînée mauve (PlaneTrail)
- ✅ Floating labels animés sur les inputs du formulaire
- ✅ Micro-anim scale 0.97 au tap + glow mauve au hover
- ✅ `prefers-reduced-motion` respecté

---

## 🧭 Accessibilité

- Contrastes texte AA respectés (texte blanc sur mauve foncé, etc.)
- Focus visible mauve sur tous les éléments interactifs
- `alt` complets sur toutes les images
- `aria-label` sur les boutons icônes
- Mega-menu navigable au clavier (en cours d'amélioration)
- `prefers-reduced-motion` => animations désactivées

---

## ⚡ Performances

- `next/image` partout, lazy loading, placeholder blur natif
- `next/font` (Inter + Bricolage Grotesque), display swap
- Code splitting automatique par section (Server / Client components)
- Lighthouse cible : ≥ 90 sur Desktop

---

## 📝 SEO

- Métadonnées Next.js (titre, description, OG, Twitter)
- `metadataBase` configuré sur `ami-voyages.com`
- `lang="fr"` sur la racine
- Robots: index + follow

À ajouter quand le client le souhaite :
- Open Graph image (déposer `public/og.jpg` et l'ajouter dans `app/layout.tsx`)
- Sitemap (`app/sitemap.ts`)
- `robots.ts`

---

## 📞 Coordonnées Ami Voyages

- 📞 01 53 26 73 86 / 07 52 35 58 27
- 📍 157 rue Lafayette, 75010 PARIS — Métro/RER Gare du Nord
- ✉️ amivoyages2002@free.fr
- 🕐 Lundi → Samedi · 10h–18h30 sans interruption
- Facebook : `facebook.com/amivoyages2002`

---

© 2026 Ami Voyages — Le spécialiste du voyage ethnique depuis 2002.
