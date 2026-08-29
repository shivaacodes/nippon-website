import type { MetadataRoute } from 'next';
import { carDetails } from '@/data/carDetails';
import { siteRoutes } from '@/data/siteRoutes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nippon-toyota.com';
  const pages = siteRoutes.filter((route) => route.kind === 'page').map((route) => ({
    url: `${baseUrl}${route.currentPath}`,
    changeFrequency: route.key === 'home' ? 'daily' as const : 'weekly' as const,
    priority: route.key === 'home' ? 1 : route.key === 'showroom' ? 0.9 : 0.7,
  }));
  const models = Object.values(carDetails).map((car) => ({
    url: `${baseUrl}/virtual-showroom/${car.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  return [...pages, ...models];
}
