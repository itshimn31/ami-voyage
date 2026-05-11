// =====================================================================
// AMI VOYAGES — Contenu centralisé
// =====================================================================
// Modifiez ici tous les textes, coordonnées, listes de pays et services.
// Aucun composant ne hardcode de copy : tout vient de ce fichier.
// =====================================================================

export const brand = {
  name: 'Ami Voyages',
  tagline: 'Le spécialiste du voyage ethnique',
  subTagline: 'Redécouvrez votre pays d’origine',
  since: 2002,
  positioning:
    'Agence parisienne spécialiste du vol sec et du voyage ethnique vers l’Asie du Sud et l’Afrique Subsaharienne.',
};

export const contact = {
  phones: ['01 53 26 73 86', '07 52 35 58 27'],
  address: {
    street: '157 rue Lafayette',
    zip: '75010',
    city: 'PARIS',
    metro: 'Métro / RER : Gare du Nord',
  },
  email: 'amivoyages2002@free.fr',
  hours: {
    short: 'Lun–Sam · 10h–18h30',
    full: 'Du lundi au samedi, de 10h à 18h30 sans interruption',
    lines: ['Ouvert', 'du lundi au samedi', 'de 10h à 18h30', 'sans interruption'],
  },
  facebook: 'https://www.facebook.com/amivoyages2002',
};

export const navigation = [
  { label: 'Accueil', href: '#hero', icon: 'home' as const },
  { label: 'Nos Destinations', href: '#destinations', icon: 'destinations' as const, hasMega: true },
  { label: 'Les Formalités', href: '#formalites', icon: 'formalities' as const },
  { label: 'Contact', href: '#contact', icon: 'contact' as const },
];

// =====================================================================
// HERO
// =====================================================================
export const hero = {
  eyebrow: 'Depuis 2002',
  title: {
    pre: 'Redécouvrez',
    accent: 'votre pays d’origine.',
  },
  subtitle:
    'Spécialiste du voyage ethnique vers l’Asie du Sud et l’Afrique Subsaharienne. Depuis 2002, nous construisons à vos côtés le voyage qui vous ramène à vos racines.',
  badges: [
    { icon: 'check', label: 'Tarifs négociés' },
    { icon: 'check', label: 'Paiement en 2-3x' },
    { icon: 'check', label: 'Assurance incluse' },
    { icon: 'star', label: '4.8/5 — 500+ avis' },
  ],
  scrollLabel: 'Découvrir',
  bgImage:
    'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2400&q=80',
};

// =====================================================================
// PARTENAIRES AÉRIENS
// =====================================================================
export const partners = {
  eyebrow: 'Nos partenaires majeurs',
  list: [
    'Emirates',
    'Brussels Airlines',
    'Kuwait Airways',
    'Etihad',
    'Saudia',
    'Turkish Airlines',
    'Air India',
    'Corsair',
    'TAP Portugal',
    'Royal Air Maroc',
    'Air France',
    'Lufthansa',
    'SriLankan',
    'Condor',
    'JAL',
    'Qatar Airways',
    'Ethiopian Airlines',
  ],
};

// =====================================================================
// VOL SEC SPECIALIST
// =====================================================================
export const flightSpecialist = {
  eyebrow: 'Depuis 2002',
  title: 'Votre spécialiste du vol sec à Paris',
  paragraphs: [
    'Bienvenue chez Ami Voyages. Nous vous accompagnons pour retrouver vos proches et retourner vers vos terres d’origine en Asie du Sud et en Afrique Subsaharienne.',
    'Nos conseillers-spécialistes construisent à vos côtés le voyage de vos rêves : voyage privé ou en groupe, professionnel ou de loisirs.',
  ],
  cta: { label: 'Contactez-nous', href: '#contact' },
  image:
    'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=1600&q=80',
  imageAlt: 'Tarmac d’aéroport avec avions partenaires alignés au coucher du soleil',
};

// =====================================================================
// THEMES — Carousel 3D de "raisons / angles" entre Vol sec et Destinations
// =====================================================================
export const themes = {
  eyebrow: 'Nos forfaits',
  title: 'Trois façons de voyager',
  subtitle:
    'Quel que soit votre besoin — partir vite, retrouver ses racines, ou voyager en profondeur — nous construisons l’itinéraire avec vous.',
  items: [
    {
      id: 'vol-sec',
      eyebrow: 'Vol sec',
      title: 'Vols secs depuis toute la France',
      text: 'Des départs depuis Paris, Marseille, Toulouse et Lyon. Optez pour la solution la plus flexible et la plus abordable, sur la compagnie de votre choix.',
      cta: 'Voir les départs',
      image:
        'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?auto=format&fit=crop&w=1400&q=80',
      imageAlt: 'Tarmac d’aéroport avec avions partenaires alignés',
    },
    {
      id: 'racines',
      eyebrow: 'Redécouvrez',
      title: 'Vos racines, à votre rythme',
      text: 'Partez à la rencontre de vos origines. Partagez avec ces peuples une parenthèse de vie, par le regard et les gestes — un voyage qui change.',
      cta: 'Explorer',
      image:
        'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=80',
      imageAlt: 'Coucher de soleil sur la savane africaine',
    },
    {
      id: 'ethnique',
      eyebrow: 'Voyage ethnique',
      title: 'L’authenticité, notre signature',
      text: 'Notre expertise unique depuis 2002 : un voyage ethnique vers l’Asie du Sud et l’Afrique Subsaharienne, conçu sur-mesure par nos conseillers-spécialistes.',
      cta: 'Découvrir',
      image:
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1400&q=80',
      imageAlt: 'Taj Mahal au coucher du soleil, Inde',
    },
  ],
};

// =====================================================================
// DESTINATIONS
// =====================================================================
export const destinations = {
  eyebrow: 'Explorez',
  title: 'Nos Destinations',
  ghostTitle: 'DESTINATIONS',
  subtitle:
    'Venez nous rencontrer dans notre agence de vol sec du lundi au samedi de 10h à 18h30 pour préparer votre voyage.',
  cards: [
    {
      id: 'asie',
      title: 'Asie du Sud',
      description:
        'Avec Ami Voyages, réalisez votre voyage de rêve à la carte dans toute l’Asie du Sud, bénéficiez d’une assistance 24/7. Voyagez l’esprit tranquille en famille, en couple ou entre amis.',
      cta: 'Découvrir l’Asie du Sud',
      image:
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1800&q=80',
      imageAlt: 'Taj Mahal au coucher du soleil, Inde',
      countries: [
        { flag: '🇮🇳', name: 'Inde' },
        { flag: '🇱🇰', name: 'Sri Lanka' },
        { flag: '🇧🇩', name: 'Bangladesh' },
      ],
    },
    {
      id: 'afrique',
      title: 'Afrique Subsaharienne',
      description:
        'Voyagez en Afrique Subsaharienne, berceau de l’humanité. Cette destination est idéale, de par la richesse de sa culture et de ses panoramas.',
      cta: 'Découvrir l’Afrique',
      image:
        'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1800&q=80',
      imageAlt: 'Savane africaine avec éléphants au coucher du soleil',
      countries: [
        { flag: '🇹🇬', name: 'Togo' },
        { flag: '🇨🇩', name: 'Rép. du Congo' },
        { flag: '🇰🇲', name: 'Comores' },
        { flag: '🇨🇬', name: 'Congo' },
        { flag: '🇳🇬', name: 'Nigéria' },
        { flag: '🇨🇻', name: 'Cap Vert' },
        { flag: '🇲🇱', name: 'Mali' },
        { flag: '🇬🇭', name: 'Ghana' },
        { flag: '🇬🇳', name: 'Guinée' },
        { flag: '🇧🇯', name: 'Bénin' },
        { flag: '🇨🇮', name: 'Côte d’Ivoire' },
        { flag: '🇸🇳', name: 'Sénégal' },
        { flag: '🇨🇫', name: 'Centrafrique' },
        { flag: '🇦🇴', name: 'Angola' },
        { flag: '🇨🇲', name: 'Cameroun' },
        { flag: '🇬🇦', name: 'Gabon' },
      ],
    },
  ],
};

// =====================================================================
// FORMALITES
// =====================================================================
export const formalities = {
  eyebrow: 'Préparation',
  title: 'Les Formalités',
  ghostTitle: 'FORMALITÉS',
  paragraph:
    'Pour voyager l’esprit serein, il est indispensable de vérifier certains documents de voyage requis : le passeport, le visa et les documents d’identité auprès de l’ambassade et du consulat dans votre pays d’origine et en France.',
  image:
    'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1600&q=80',
  imageAlt: 'Famille souriante à l’aéroport avec valises',
  slides: [
    {
      icon: 'passport',
      title: 'Passeport',
      text: 'Vérifiez la validité de votre passeport — au moins 6 mois après la date de retour pour la plupart des destinations.',
    },
    {
      icon: 'stamp',
      title: 'Visa',
      text: 'Renseignez-vous sur les conditions de visa du pays de destination. Notre équipe vous oriente vers les démarches consulaires adéquates.',
    },
    {
      icon: 'docs',
      title: 'Documents d’ambassade',
      text: 'Documents d’identité, attestations et justificatifs : nous vous aidons à constituer un dossier complet auprès des ambassades concernées.',
    },
  ],
};

// =====================================================================
// EXCLUSIVITES
// =====================================================================
export const exclusivities = {
  eyebrow: 'Pourquoi nous',
  title: 'Nos Exclusivités',
  subtitle: 'Découvrez les forfaits et exclusivités offerts par votre expert du vol sec.',
  items: [
    {
      icon: 'plane-route',
      title: 'Vols multi-villes',
      short: 'Vols secs avec de nombreux départs depuis Paris, Marseille, Toulouse, Lyon.',
      long: 'Combinez vos étapes et personnalisez votre itinéraire au départ des principales villes françaises.',
    },
    {
      icon: 'ticket',
      title: 'Tarifs négociés',
      short: 'Tarifs négociés avec des conditions de bagages privilégiées.',
      long: 'Notre statut d’agence partenaire nous permet d’obtenir des prix et des franchises bagages avantageux.',
    },
    {
      icon: 'credit-card',
      title: 'Facilités de paiement',
      short: 'Paiement en 2 ou 3 fois.',
      long: 'Étalez le règlement de votre voyage en toute sérénité, sans frais cachés.',
    },
    {
      icon: 'shield-check',
      title: 'Paiement sécurisé',
      short: 'Données totalement chiffrées.',
      long: 'Nos paiements sont protégés par les protocoles de sécurité bancaires les plus exigeants.',
    },
    {
      icon: 'refresh',
      title: 'Billet flexy',
      short: 'Tous vos billets modifiables et remboursables.',
      long: 'Profitez d’une flexibilité totale en cas de changement de programme ou d’imprévu.',
    },
    {
      icon: 'shield',
      title: 'Assurance Annulation',
      short: 'Sans motif ni justificatif.',
      long: 'Assurez votre voyage et annulez librement, sans avoir à justifier votre décision.',
    },
    {
      icon: 'gift',
      title: 'Chèques Vacances',
      short: 'Payez sur place vos billets d’avion.',
      long: 'Nous acceptons les Chèques Vacances directement en agence pour le règlement de vos billets.',
    },
  ],
};

// =====================================================================
// STATS
// =====================================================================
export const stats = {
  items: [
    { value: 22, suffix: '+', label: 'Années d’expertise' },
    { value: 50, suffix: '+', label: 'Destinations' },
    { value: 10000, suffix: '+', label: 'Voyageurs satisfaits' },
    { value: 98, suffix: '%', label: 'Taux de satisfaction' },
  ],
};

// =====================================================================
// VALEURS
// =====================================================================
export const values = {
  eyebrow: 'Notre engagement',
  title: 'Nos Valeurs',
  ghostTitle: 'VALEURS',
  paragraph:
    'Gage de professionnalisme, nous vous proposons une expertise de qualité. Ensemble, nous imaginons les meilleurs circuits possibles et nos créateurs de voyages réalisent un travail de terrain minutieux.',
  quote:
    'Ami Voyages, le spécialiste du voyage ethnique vers l’Asie du Sud et l’Afrique Subsaharienne.',
  image:
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1800&q=80',
  imageAlt: 'Aile d’avion survolant Paris avec la Tour Eiffel visible',
};

// =====================================================================
// CONTACT
// =====================================================================
export const contactSection = {
  eyebrow: 'Parlons de votre projet',
  title: 'Contactez-nous',
  intro: 'Pour de plus amples informations, remplissez notre formulaire.',
  fields: {
    fullName: { label: 'Nom et Prénom', placeholder: 'Jean Dupont' },
    phone: { label: 'Téléphone', placeholder: '06 12 34 56 78' },
    email: { label: 'Email', placeholder: 'vous@exemple.com' },
    airline: { label: 'Compagnie aérienne souhaitée', placeholder: 'Air France, Emirates…' },
    departure: { label: 'Date de départ', placeholder: 'jj/mm/aaaa' },
    return: { label: 'Date de retour', placeholder: 'jj/mm/aaaa' },
    cityFrom: { label: 'Ville de départ', placeholder: 'Paris' },
    cityTo: { label: 'Ville d’arrivée', placeholder: 'Delhi' },
    message: {
      label: 'Votre message',
      placeholder:
        'Précisez votre destination, dates, nombre d’adultes (+12 ans) / enfants (2-11 ans) / bébés (-2 ans), compagnie aérienne souhaitée…',
    },
    rgpd: 'En soumettant ce formulaire, j’accepte la politique de confidentialité d’Ami Voyages.',
  },
  submit: 'Envoyer ma demande',
};

// =====================================================================
// FOOTER
// =====================================================================
export const footer = {
  tagline: 'Le spécialiste du voyage ethnique depuis 2002.',
  columns: {
    menu: [
      { label: 'Accueil', href: '#hero' },
      { label: 'Les Formalités', href: '#formalites' },
      { label: 'Contact', href: '#contact' },
    ],
    services: [
      { label: 'Asie du Sud', href: '#destinations' },
      { label: 'Afrique Subsaharienne', href: '#destinations' },
      { label: 'Vol sec', href: '#vol-sec' },
      { label: 'Formalités', href: '#formalites' },
    ],
  },
  copyright: '© 2026 Ami Voyages',
  legal: [
    { label: 'Mentions légales', href: '#' },
    { label: 'Politique de confidentialité', href: '#' },
    { label: 'Plan du site', href: '#' },
  ],
};
