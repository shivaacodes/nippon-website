import { carDetails } from './carDetails';
import { siteRoutes } from './siteRoutes';
import type { SearchResult } from '@/lib/siteSearch';

const modelResults: SearchResult[] = Object.values(carDetails).map((car) => ({
  href: `/virtual-showroom/${car.slug}`,
  title: car.fullName,
  type: 'model',
  description: `${car.tagline} Starting from ${car.basePrice}`,
  keywords: [...car.category, ...car.variants.map((variant) => variant.fuel), ...car.features.flatMap((feature) => feature.items)],
}));

const pageResults: SearchResult[] = siteRoutes
  .filter((route) => route.kind === 'page' && route.currentPath !== '/')
  .map((route) => ({
    href: route.currentPath,
    title: route.title,
    type: route.key.includes('service') ? 'service' : route.key === 'promotions' ? 'offer' : 'page',
    description: `Explore ${route.title.toLowerCase()} at Nippon Toyota.`,
    keywords: [route.key, ...route.title.split(' ')],
  }));

export const searchIndex: SearchResult[] = [...modelResults, ...pageResults];

