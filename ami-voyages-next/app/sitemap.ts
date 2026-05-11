import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.ami-voyages.com';
  const lastModified = new Date();

  return [
    { url: base, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/#destinations`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/#formalites`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/#exclusivites`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/#contact`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
