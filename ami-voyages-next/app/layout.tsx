import type { Metadata } from 'next';
import { Inter, Bricolage_Grotesque } from 'next/font/google';
import './globals.css';

import LenisProvider from '@/components/LenisProvider';
import CustomCursor from '@/components/CustomCursor';
import Loader from '@/components/Loader';
import WhatsAppChat from '@/components/WhatsAppChat';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ami-voyages.com'),
  title: {
    default: 'Ami Voyages — Spécialiste du voyage ethnique depuis 2002',
    template: '%s | Ami Voyages',
  },
  description:
    'Agence de voyages parisienne spécialiste du vol sec et du voyage ethnique vers l’Asie du Sud et l’Afrique Subsaharienne. Tarifs négociés, assurance incluse, paiement en 2-3x.',
  keywords: [
    'Ami Voyages',
    'voyage ethnique',
    'vol sec Paris',
    'Asie du Sud',
    'Afrique Subsaharienne',
    'agence de voyage Paris',
    'Inde',
    'Sri Lanka',
    'Sénégal',
    'Cameroun',
  ],
  authors: [{ name: 'Ami Voyages' }],
  openGraph: {
    title: 'Ami Voyages — Le spécialiste du voyage ethnique',
    description:
      'Redécouvrez votre pays d’origine avec Ami Voyages, agence parisienne depuis 2002.',
    url: 'https://www.ami-voyages.com',
    siteName: 'Ami Voyages',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ami Voyages — Le spécialiste du voyage ethnique',
    description:
      'Spécialiste du vol sec vers l’Asie du Sud et l’Afrique Subsaharienne. Depuis 2002.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${bricolage.variable}`}>
      <body>
        <Loader />
        <CustomCursor />
        <LenisProvider>{children}</LenisProvider>
        <WhatsAppChat />
      </body>
    </html>
  );
}
