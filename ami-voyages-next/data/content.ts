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
  // WhatsApp Business number in international format (no '+' or spaces).
  // Used by the floating chat widget — click opens wa.me/<number>?text=...
  // and the conversation lands in the existing chatbot (chatbot_whatsapp/)
  // via Twilio. To change, just replace this string.
  whatsapp: '33752355827',
};

// =====================================================================
// WHATSAPP CHAT WIDGET — floating bubble on every page, multilingual
// =====================================================================
// Languages mirror the agency's audience: French (default, France-based),
// English (international travellers), Hindi / Bengali / Tamil (the three
// South-Asian languages most spoken by our Indian / Bangladeshi / Sri
// Lankan / Tamil-Eelam clientele).
//
// The widget's pre-filled WhatsApp message is sent in the chosen
// language so the Twilio chatbot can detect and route correctly.
// =====================================================================

export type WhatsAppLang = 'fr' | 'en' | 'hi' | 'bn' | 'ta';

export const whatsappChat = {
  defaultLang: 'fr' as WhatsAppLang,
  avatarInitials: 'AV',
  languages: [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
    { code: 'ta', label: 'தமிழ்', flag: '🇱🇰' },
  ] as const,

  // -------------------------------------------------------------------
  // Language picker — the very first thing a new visitor sees in the
  // open chat card. Mirrors the Twilio bot's first message: a multilingual
  // greeting + a button row to pick the language for the rest of the
  // conversation.
  // -------------------------------------------------------------------
  langPicker: {
    // Multilingual greeting row, one item per supported language —
    // rendered as a single "first sentence" so visitors instantly
    // recognise their own language.
    hellos: ['Bonjour 👋', 'Hello 👋', 'नमस्ते 👋', 'নমস্কার 👋', 'வணக்கம் 👋'],
    // "Choose your language" in each supported language.
    prompts: [
      'Choisissez votre langue',
      'Choose your language',
      'अपनी भाषा चुनें',
      'আপনার ভাষা বেছে নিন',
      'உங்கள் மொழியைத் தேர்வுசெய்க',
    ],
    // Subtitle below the prompts.
    subtitle: {
      fr: 'pour discuter avec notre conseiller',
      en: 'to chat with our advisor',
      hi: 'हमारे सलाहकार से बात करने के लिए',
      bn: 'আমাদের পরামর্শদাতার সাথে কথা বলতে',
      ta: 'எங்கள் ஆலோசகருடன் பேச',
    },
  },

  // -------------------------------------------------------------------
  // Translations per language — keep the keys aligned across all locales
  // -------------------------------------------------------------------
  t: {
    fr: {
      langLabel: 'Langue',
      agentName: 'Conseiller Ami Voyages',
      agentRole: 'Lun–Sam · 10h–18h30',
      online: 'En ligne',
      teaser: '👋 Une question ? On vous répond sur WhatsApp en quelques minutes.',
      greeting:
        'Bonjour 👋 Choisissez un sujet — vous serez redirigé vers WhatsApp où notre conseiller prendra le relais.',
      footer: 'La discussion se poursuit sur WhatsApp.',
      closeAria: 'Fermer la conversation',
      openAria: 'Ouvrir la conversation WhatsApp',
    },
    en: {
      langLabel: 'Language',
      agentName: 'Ami Voyages advisor',
      agentRole: 'Mon–Sat · 10am–6:30pm',
      online: 'Online',
      teaser: '👋 Got a question? We reply on WhatsApp within minutes.',
      greeting:
        'Hi 👋 Pick a topic — you’ll be redirected to WhatsApp where our advisor will take over.',
      footer: 'The conversation continues on WhatsApp.',
      closeAria: 'Close conversation',
      openAria: 'Open WhatsApp conversation',
    },
    hi: {
      langLabel: 'भाषा',
      agentName: 'Ami Voyages सलाहकार',
      agentRole: 'सोम–शनि · सुबह 10 – शाम 6:30',
      online: 'ऑनलाइन',
      teaser: '👋 कोई सवाल? हम कुछ ही मिनटों में WhatsApp पर जवाब देंगे।',
      greeting:
        'नमस्ते 👋 एक विषय चुनें — आपको WhatsApp पर भेजा जाएगा जहाँ हमारा सलाहकार बात जारी रखेगा।',
      footer: 'बातचीत WhatsApp पर जारी रहती है।',
      closeAria: 'बातचीत बंद करें',
      openAria: 'WhatsApp बातचीत खोलें',
    },
    bn: {
      langLabel: 'ভাষা',
      agentName: 'Ami Voyages পরামর্শদাতা',
      agentRole: 'সোম–শনি · সকাল ১০টা – সন্ধ্যা ৬:৩০',
      online: 'অনলাইন',
      teaser: '👋 কোনো প্রশ্ন আছে? আমরা কয়েক মিনিটে WhatsApp-এ উত্তর দেব।',
      greeting:
        'নমস্কার 👋 একটি বিষয় বেছে নিন — আপনাকে WhatsApp-এ পাঠানো হবে যেখানে আমাদের পরামর্শদাতা সহায়তা করবেন।',
      footer: 'আলাপ WhatsApp-এ চলবে।',
      closeAria: 'কথোপকথন বন্ধ করুন',
      openAria: 'WhatsApp কথোপকথন খুলুন',
    },
    ta: {
      langLabel: 'மொழி',
      agentName: 'Ami Voyages ஆலோசகர்',
      agentRole: 'திங்கள்–சனி · காலை 10 – மாலை 6:30',
      online: 'ஆன்லைனில்',
      teaser: '👋 கேள்வி உள்ளதா? சில நிமிடங்களில் WhatsApp-ல் பதிலளிப்போம்.',
      greeting:
        'வணக்கம் 👋 ஒரு தலைப்பைத் தேர்வுசெய்க — WhatsApp-க்கு திருப்பிவிடப்படுவீர்கள், அங்கே எங்கள் ஆலோசகர் தொடர்வார்.',
      footer: 'உரையாடல் WhatsApp-ல் தொடர்கிறது.',
      closeAria: 'உரையாடலை மூடு',
      openAria: 'WhatsApp உரையாடலைத் திற',
    },
  },

  // -------------------------------------------------------------------
  // Quick choices — emoji is universal, label + message per language
  // -------------------------------------------------------------------
  choices: [
    {
      id: 'quote',
      emoji: '💸',
      fr: {
        label: 'Je veux un devis',
        message:
          'Bonjour, je souhaite obtenir un devis pour un vol. Merci de me rappeler les informations à vous transmettre.',
      },
      en: {
        label: 'I want a quote',
        message:
          'Hi, I would like a quote for a flight. Please let me know what info you need.',
      },
      hi: {
        label: 'मुझे कोटेशन चाहिए',
        message:
          'नमस्ते, मुझे एक उड़ान के लिए कोटेशन चाहिए। कृपया बताएं कि आपको कौन सी जानकारी चाहिए।',
      },
      bn: {
        label: 'আমি একটি কোটেশন চাই',
        message:
          'নমস্কার, আমি একটি ফ্লাইটের জন্য কোটেশন চাই। দয়া করে জানান কী তথ্য প্রয়োজন।',
      },
      ta: {
        label: 'எனக்கு விலை விவரம் வேண்டும்',
        message:
          'வணக்கம், விமான டிக்கெட்டிற்கான விலை விவரம் வேண்டும். எந்த தகவல்கள் தேவை என்று சொல்லுங்கள்.',
      },
    },
    {
      id: 'flight',
      emoji: '✈️',
      fr: {
        label: 'Question sur un vol',
        message:
          'Bonjour, j’ai une question concernant un vol (réservation, bagages, modification…).',
      },
      en: {
        label: 'Question about a flight',
        message:
          'Hi, I have a question about a flight (booking, baggage, change…).',
      },
      hi: {
        label: 'उड़ान के बारे में सवाल',
        message:
          'नमस्ते, मेरा एक उड़ान के बारे में सवाल है (बुकिंग, सामान, बदलाव...)।',
      },
      bn: {
        label: 'ফ্লাইট সম্পর্কে প্রশ্ন',
        message:
          'নমস্কার, আমার একটি ফ্লাইট সম্পর্কে প্রশ্ন আছে (বুকিং, ব্যাগেজ, পরিবর্তন...)।',
      },
      ta: {
        label: 'விமானம் பற்றிய கேள்வி',
        message:
          'வணக்கம், ஒரு விமானம் தொடர்பாக எனக்கு கேள்வி உள்ளது (முன்பதிவு, பெட்டிகள், மாற்றம்...).',
      },
    },
    {
      id: 'availability',
      emoji: '📅',
      fr: {
        label: 'Disponibilités & dates',
        message:
          'Bonjour, je souhaite connaître les disponibilités et les tarifs sur une destination.',
      },
      en: {
        label: 'Availability & dates',
        message: 'Hi, I would like to know availability and rates for a destination.',
      },
      hi: {
        label: 'उपलब्धता और तारीखें',
        message:
          'नमस्ते, मैं किसी गंतव्य के लिए उपलब्धता और दरें जानना चाहता हूँ।',
      },
      bn: {
        label: 'উপলব্ধতা ও তারিখ',
        message:
          'নমস্কার, একটি গন্তব্যের জন্য উপলব্ধতা এবং দাম জানতে চাই।',
      },
      ta: {
        label: 'கிடைப்பு & தேதிகள்',
        message: 'வணக்கம், ஒரு இடத்துக்கான கிடைப்பு மற்றும் விலைகள் தெரியவேண்டும்.',
      },
    },
    {
      id: 'other',
      emoji: '💬',
      fr: {
        label: 'Autre demande',
        message: 'Bonjour, je souhaite échanger avec un conseiller Ami Voyages.',
      },
      en: {
        label: 'Other request',
        message: 'Hi, I would like to chat with an Ami Voyages advisor.',
      },
      hi: {
        label: 'अन्य प्रश्न',
        message: 'नमस्ते, मैं Ami Voyages सलाहकार से बात करना चाहता हूँ।',
      },
      bn: {
        label: 'অন্য অনুরোধ',
        message: 'নমস্কার, আমি Ami Voyages-এর একজন পরামর্শদাতার সাথে কথা বলতে চাই।',
      },
      ta: {
        label: 'மற்ற கேள்விகள்',
        message: 'வணக்கம், Ami Voyages ஆலோசகர் ஒருவருடன் பேச விரும்புகிறேன்.',
      },
    },
  ],
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
  /**
   * Rotating background images for the Hero — same "iconic destination at
   * golden hour" mood, but cycling through 3 of our offered regions every
   * ~6 seconds with a smooth crossfade. Parallax wraps all of them.
   */
  bgImages: [
    {
      url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2400&q=80',
      alt: 'Taj Mahal au coucher du soleil — Inde',
      country: 'Inde',
    },
    {
      url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2400&q=80',
      alt: 'Savane africaine avec éléphants au coucher du soleil',
      country: 'Afrique Subsaharienne',
    },
    {
      url: 'https://images.unsplash.com/photo-1581791534137-9eddc5e72d1e?auto=format&fit=crop&w=2400&q=80',
      alt: 'Sigiriya, rocher du lion — Sri Lanka',
      country: 'Sri Lanka',
    },
  ],
  // Legacy single image (kept for backwards compatibility with any
  // component that still reads hero.bgImage).
  bgImage:
    'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2400&q=80',
};

// =====================================================================
// PARTENAIRES AÉRIENS
// =====================================================================
/**
 * Partner airlines.
 *
 * `domain` is the carrier's corporate domain — used to fetch their actual
 * brand logo from logo.dev (a B2B CDN designed for displaying partner
 * logos in commercial contexts). The component renders `<Image>` against
 * `https://img.logo.dev/{domain}` and falls back to a brand-colored
 * typographic card if the request fails (e.g. logo.dev rate-limited).
 *
 * To override a logo with a locally-hosted licensed SVG, drop the file
 * in `/public/images/partners/<slug>.svg` and set `logo: '/images/partners/<slug>.svg'`.
 */
export type Partner = {
  name: string;
  iata: string;
  domain: string;
  bg: string;
  text?: string;
  accent?: string;
  logo?: string;
};

export const partners = {
  eyebrow: 'Nos partenaires majeurs',
  list: [
    { name: 'Air France', iata: 'AF', domain: 'airfrance.com', bg: '#002157', accent: '#E2001A' },
    { name: 'Emirates', iata: 'EK', domain: 'emirates.com', bg: '#D71921', accent: '#FFFFFF' },
    { name: 'Lufthansa', iata: 'LH', domain: 'lufthansa.com', bg: '#05164D', accent: '#FFCC00' },
    { name: 'Turkish Airlines', iata: 'TK', domain: 'turkishairlines.com', bg: '#C70A0C', accent: '#FFFFFF' },
    { name: 'Qatar Airways', iata: 'QR', domain: 'qatarairways.com', bg: '#5C0632', accent: '#A57B26' },
    { name: 'Etihad', iata: 'EY', domain: 'etihad.com', bg: '#A88A4A', accent: '#3A2E1F' },
    { name: 'Air India', iata: 'AI', domain: 'airindia.com', bg: '#C8102E', accent: '#FFB81C' },
    { name: 'SriLankan', iata: 'UL', domain: 'srilankan.com', bg: '#003E80', accent: '#F5A800' },
    { name: 'Saudia', iata: 'SV', domain: 'saudia.com', bg: '#006C35', accent: '#FFFFFF' },
    { name: 'Kuwait Airways', iata: 'KU', domain: 'kuwaitairways.com', bg: '#0072BC', accent: '#E2001A' },
    { name: 'Royal Air Maroc', iata: 'AT', domain: 'royalairmaroc.com', bg: '#C8102E', accent: '#006633' },
    { name: 'TAP Portugal', iata: 'TP', domain: 'flytap.com', bg: '#C8102E', accent: '#009639' },
    { name: 'Brussels Airlines', iata: 'SN', domain: 'brusselsairlines.com', bg: '#9F1B32', accent: '#FFFFFF' },
    { name: 'Corsair', iata: 'SS', domain: 'flycorsair.com', bg: '#003F87', accent: '#FFFFFF' },
    { name: 'Condor', iata: 'DE', domain: 'condor.com', bg: '#FFE74C', text: '#1A1A1A', accent: '#1A1A1A' },
    { name: 'Ethiopian Airlines', iata: 'ET', domain: 'ethiopianairlines.com', bg: '#006A4D', accent: '#FFD700' },
    { name: 'JAL', iata: 'JL', domain: 'jal.com', bg: '#E60012', accent: '#FFFFFF' },
  ] satisfies Partner[],
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
// TEMOIGNAGES — Social proof clients
// =====================================================================
export const testimonials = {
  eyebrow: 'Ils nous font confiance',
  title: 'Ils ont voyagé avec nous',
  subtitle:
    'Quelques retours parmi les milliers de voyageurs accompagnés par Ami Voyages depuis 2002.',
  items: [
    {
      id: 1,
      name: 'Aïcha D.',
      destination: 'Sénégal · Dakar',
      date: 'Mars 2026',
      rating: 5,
      quote:
        'Vingt ans que je n’étais pas retournée au pays. Ami Voyages a tout pris en charge — vol, formalités, conseils. Je n’aurais pas pu rêver mieux pour ce voyage en famille.',
    },
    {
      id: 2,
      name: 'Rajesh P.',
      destination: 'Inde · Kolkata',
      date: 'Janvier 2026',
      rating: 5,
      quote:
        'Service impeccable. L’équipe comprend mes besoins et m’a obtenu un tarif imbattable sur Air India avec des conditions de bagages parfaites.',
    },
    {
      id: 3,
      name: 'Marie K.',
      destination: 'Cameroun · Douala',
      date: 'Décembre 2025',
      rating: 5,
      quote:
        'Je passe désormais exclusivement par Ami Voyages pour Douala. Tarifs négociés, billets modifiables, et un vrai contact humain à l’agence.',
    },
    {
      id: 4,
      name: 'Sanjay L.',
      destination: 'Sri Lanka · Colombo',
      date: 'Novembre 2025',
      rating: 5,
      quote:
        'On parle d’agence "ethnique" — chez Ami Voyages c’est vrai : ils comprennent mes contraintes familiales et culturelles. 22 ans d’expertise, ça se sent.',
    },
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
