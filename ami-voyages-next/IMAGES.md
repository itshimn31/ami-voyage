# 📸 Inventaire des images — Ami Voyages

Ce document liste **chaque image** affichée sur le site, avec son chemin, sa
destination, ses dimensions recommandées et son statut.

| Statut       | Signification                                                  |
| ------------ | -------------------------------------------------------------- |
| `[UNSPLASH]` | Image chargée automatiquement depuis Unsplash (URL distante).   |
| `[CLIENT]`   | À fournir par Ami Voyages — placeholder mauve élégant en attendant. |

> Les URLs Unsplash sont définies directement dans `data/content.ts` et passent par `next/image`. Pour remplacer une image distante par une image locale fournie par le client, déposez-la dans `/public/images/` puis remplacez l'URL dans `data/content.ts` par `/images/votre-photo.jpg`.

---

## 1. Hero — Plein écran

| Champ            | Valeur                                                                |
| ---------------- | --------------------------------------------------------------------- |
| Statut           | `[UNSPLASH]`                                                          |
| Composant        | `components/Hero.tsx`                                                 |
| Clé `content.ts` | `hero.bgImage`                                                        |
| Dimensions reco. | 2400 × 1600 px                                                        |
| Ratio            | 3:2                                                                   |
| Sujet            | Taj Mahal au coucher du soleil OU avion au décollage face au soleil   |
| URL actuelle     | `images.unsplash.com/photo-1564507592333-c60657eea523`                |

---

## 2. Vol Sec / Spécialiste — Photo droite

| Champ            | Valeur                                                       |
| ---------------- | ------------------------------------------------------------ |
| Statut           | `[UNSPLASH]`                                                 |
| Composant        | `components/FlightSpecialist.tsx`                            |
| Clé `content.ts` | `flightSpecialist.image`                                     |
| Dimensions reco. | 1600 × 2000 px                                               |
| Ratio            | 4:5 (portrait)                                               |
| Sujet            | Tarmac d'aéroport avec avions partenaires alignés au coucher |
| URL actuelle     | `images.unsplash.com/photo-1556388158-158ea5ccacbd`          |

---

## 3. Destination — Asie du Sud

| Champ            | Valeur                                              |
| ---------------- | --------------------------------------------------- |
| Statut           | `[UNSPLASH]`                                        |
| Composant        | `components/DestinationCard.tsx` (via Destinations) |
| Clé `content.ts` | `destinations.cards[0].image`                       |
| Dimensions reco. | 1800 × 2200 px                                      |
| Ratio            | 4:5                                                 |
| Sujet            | Taj Mahal, Inde colorée, voyageuse devant monument  |
| URL actuelle     | `images.unsplash.com/photo-1564507592333-c60657eea523` |

---

## 4. Destination — Afrique Subsaharienne

| Champ            | Valeur                                                |
| ---------------- | ----------------------------------------------------- |
| Statut           | `[UNSPLASH]`                                          |
| Composant        | `components/DestinationCard.tsx` (via Destinations)   |
| Clé `content.ts` | `destinations.cards[1].image`                         |
| Dimensions reco. | 1800 × 2200 px                                        |
| Ratio            | 4:5                                                   |
| Sujet            | Savane africaine, éléphants ou village coloré         |
| URL actuelle     | `images.unsplash.com/photo-1547471080-7cc2caa01a7e`   |

---

## 5. Formalités — Photo droite

| Champ            | Valeur                                              |
| ---------------- | --------------------------------------------------- |
| Statut           | `[UNSPLASH]`                                        |
| Composant        | `components/Formalities.tsx`                        |
| Clé `content.ts` | `formalities.image`                                 |
| Dimensions reco. | 1600 × 2000 px                                      |
| Ratio            | 4:5                                                 |
| Sujet            | Famille à l'aéroport avec valises, sourires         |
| URL actuelle     | `images.unsplash.com/photo-1569154941061-e231b4725ef1` |

---

## 6. Valeurs — Vue de Paris depuis l'avion

| Champ            | Valeur                                              |
| ---------------- | --------------------------------------------------- |
| Statut           | `[UNSPLASH]`                                        |
| Composant        | `components/Values.tsx`                             |
| Clé `content.ts` | `values.image`                                      |
| Dimensions reco. | 1800 × 2200 px                                      |
| Ratio            | 4:5                                                 |
| Sujet            | Aile d'avion survolant Paris (Tour Eiffel visible)  |
| URL actuelle     | `images.unsplash.com/photo-1502602898657-3e91760cbb34` |

---

## 🟪 Photos `[CLIENT]` à fournir

Ces visuels doivent être fournis par Ami Voyages pour personnaliser le site. En
attendant, un **placeholder dégradé mauve** (composant `PlaceholderImage`) peut
être affiché.

| ID                | Description                                                  | Ratio | Format     |
| ----------------- | ------------------------------------------------------------ | ----- | ---------- |
| `team-agency`     | Photo de l'équipe ou de l'agence parisienne (157 rue Lafayette) | 4:3   | `.jpg`     |
| `testimonial-1`   | Avatar / portrait client satisfait                           | 1:1   | `.jpg`     |
| `testimonial-2`   | Avatar / portrait client satisfait                           | 1:1   | `.jpg`     |
| `testimonial-3`   | Avatar / portrait client satisfait                           | 1:1   | `.jpg`     |
| `partner-logos/*` | Logos vectoriels haute résolution des compagnies aériennes   | —     | `.svg`     |

> Les logos partenaires sont actuellement représentés par un mark générique
> (icône avion mauve). Pour basculer vers les vrais logos, déposez-les dans
> `/public/images/partners/<compagnie>.svg` et adaptez le composant
> `components/PartnersMarquee.tsx`.

---

## 🛠 Comment remplacer une image

1. Déposez votre fichier dans `public/images/<nom>.jpg`.
2. Ouvrez `data/content.ts`.
3. Remplacez l'URL Unsplash par `'/images/<nom>.jpg'`.
4. (Optionnel) Mettez à jour la valeur `imageAlt` correspondante pour le SEO.

```ts
// Avant
image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?...',

// Après
image: '/images/agence-paris.jpg',
```

> ✅ `next/image` continuera d'optimiser automatiquement et de servir un
> placeholder flouté pendant le chargement.
