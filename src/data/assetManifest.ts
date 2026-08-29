export type AssetRecord = {
  key: string;
  kind: 'image' | 'video' | 'panorama' | 'model' | 'document';
  path: string;
  modelSlug?: string;
  sourcePage?: string;
  alt: string;
  status: 'approved-local' | 'approved-remote' | 'missing' | 'review';
};

export const assetManifest: AssetRecord[] = [
  { key: 'home-video', kind: 'video', path: '/toyota-video.mp4', sourcePage: '/', alt: 'Toyota vehicle film', status: 'approved-local' },
  { key: 'nippon-logo', kind: 'image', path: '/nippon-toyota.png', sourcePage: '/', alt: 'Nippon Toyota', status: 'approved-local' },
  { key: 'glanza', kind: 'image', path: '/glanza.png', modelSlug: 'glanza', sourcePage: '/virtual-showroom/glanza', alt: 'Toyota Glanza', status: 'approved-local' },
  { key: 'taisor', kind: 'image', path: '/taisor.png', modelSlug: 'urban-cruiser-taisor', sourcePage: '/virtual-showroom/urban-cruiser-taisor', alt: 'Toyota Urban Cruiser Taisor', status: 'approved-local' },
  { key: 'rumion', kind: 'image', path: '/rumion.png', modelSlug: 'rumion', sourcePage: '/virtual-showroom/rumion', alt: 'Toyota Rumion', status: 'approved-local' },
  { key: 'hyryder', kind: 'image', path: '/hyryder.png', modelSlug: 'urban-cruiser-hyryder', sourcePage: '/virtual-showroom/urban-cruiser-hyryder', alt: 'Toyota Urban Cruiser Hyryder', status: 'approved-local' },
  { key: 'ebella', kind: 'image', path: '/ebella.png', modelSlug: 'urban-cruiser-ebella', sourcePage: '/virtual-showroom/urban-cruiser-ebella', alt: 'Toyota Urban Cruiser Ebella', status: 'approved-local' },
  { key: 'crysta', kind: 'image', path: '/crysta.png', modelSlug: 'innova-crysta', sourcePage: '/virtual-showroom/innova-crysta', alt: 'Toyota Innova Crysta', status: 'approved-local' },
  { key: 'hycross', kind: 'image', path: '/hycross.png', modelSlug: 'innova-hycross', sourcePage: '/virtual-showroom/innova-hycross', alt: 'Toyota Innova HyCross', status: 'approved-local' },
  { key: 'hilux', kind: 'image', path: '/hilux.png', modelSlug: 'hilux', sourcePage: '/virtual-showroom/hilux', alt: 'Toyota Hilux', status: 'approved-local' },
  { key: 'fortuner', kind: 'image', path: '/fortuner-v2.png', modelSlug: 'fortuner', sourcePage: '/virtual-showroom/fortuner', alt: 'Toyota Fortuner', status: 'approved-local' },
  { key: 'legender', kind: 'image', path: '/legender.png', modelSlug: 'legender', sourcePage: '/virtual-showroom/legender', alt: 'Toyota Fortuner Legender', status: 'approved-local' },
  { key: 'camry', kind: 'image', path: '/camry.png', modelSlug: 'camry', sourcePage: '/virtual-showroom/camry', alt: 'Toyota Camry', status: 'approved-local' },
  { key: 'vellfire', kind: 'image', path: '/vellfire.png', modelSlug: 'vellfire', sourcePage: '/virtual-showroom/vellfire', alt: 'Toyota Vellfire', status: 'approved-local' },
  { key: 'land-cruiser-300', kind: 'image', path: '/land-cruiser-300.png', modelSlug: 'land-cruiser-300', sourcePage: '/virtual-showroom/land-cruiser-300', alt: 'Toyota Land Cruiser 300', status: 'approved-local' },
  { key: 'showroom-entrance', kind: 'panorama', path: '/assets/toyota-360/images/one3d-entrance-static.jpg', sourcePage: '/virtual-showroom', alt: 'Toyota virtual showroom entrance', status: 'approved-local' },
];

export function assetForModel(modelSlug: string) {
  return assetManifest.find((asset) => asset.modelSlug === modelSlug);
}

