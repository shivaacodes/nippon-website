export type CustomerAction =
  | 'explore'
  | 'enquire'
  | 'test-drive'
  | 'price'
  | 'brochure'
  | 'service'
  | 'contact';

export type SiteRoute = {
  key: string;
  currentPath: string;
  legacyPaths: string[];
  kind: 'page' | 'redirect' | 'external';
  title: string;
  customerActions: CustomerAction[];
};

export const siteRoutes: SiteRoute[] = [
  { key: 'home', currentPath: '/', legacyPaths: [], kind: 'page', title: 'Nippon Toyota', customerActions: ['explore', 'test-drive', 'enquire'] },
  { key: 'showroom', currentPath: '/virtual-showroom', legacyPaths: ['/virtual-showroom/'], kind: 'page', title: 'Virtual showroom', customerActions: ['explore', 'test-drive', 'enquire'] },
  { key: 'test-drive', currentPath: '/testdrive', legacyPaths: ['/testdrive/'], kind: 'page', title: 'Book a test drive', customerActions: ['test-drive', 'contact'] },
  { key: 'price-list', currentPath: '/pricelist', legacyPaths: ['/pricelist/'], kind: 'page', title: 'Price list', customerActions: ['price', 'enquire'] },
  { key: 'buy-now', currentPath: '/buynow', legacyPaths: ['/buynow/', '/enquire-now/'], kind: 'page', title: 'Buy a Toyota', customerActions: ['enquire', 'test-drive'] },
  { key: 'brochure', currentPath: '/brochure', legacyPaths: ['/brochure/'], kind: 'page', title: 'Brochures', customerActions: ['brochure', 'enquire'] },
  { key: 'exchange', currentPath: '/exchange', legacyPaths: ['/buynow/?exchange=1'], kind: 'page', title: 'Exchange your car', customerActions: ['enquire'] },
  { key: 'service', currentPath: '/service', legacyPaths: ['/q-service/'], kind: 'page', title: 'Toyota service', customerActions: ['service', 'contact'] },
  { key: 'service-menu', currentPath: '/service/full-menu', legacyPaths: ['/q-service/full-menu/'], kind: 'page', title: 'Service menu', customerActions: ['service', 'contact'] },
  { key: 'accessories', currentPath: '/accessories', legacyPaths: ['/accessories.html'], kind: 'page', title: 'Accessories', customerActions: ['enquire'] },
  { key: 'used-cars', currentPath: '/used-cars', legacyPaths: ['/used-cars.html'], kind: 'page', title: 'Used cars', customerActions: ['explore', 'enquire'] },
  { key: 'loan', currentPath: '/loan', legacyPaths: ['/apply-loan/'], kind: 'page', title: 'Toyota finance', customerActions: ['enquire'] },
  { key: 'insurance', currentPath: '/insurance', legacyPaths: ['/insurance/'], kind: 'page', title: 'Toyota insurance', customerActions: ['enquire'] },
  { key: 'promotions', currentPath: '/promotions', legacyPaths: ['/promotions/'], kind: 'page', title: 'Toyota offers', customerActions: ['enquire'] },
  { key: 'whats-new', currentPath: '/whats-new', legacyPaths: ['/whats-new/'], kind: 'page', title: "What's new", customerActions: ['explore'] },
  { key: 'feedback', currentPath: '/feedback', legacyPaths: ['/feedback/'], kind: 'page', title: 'Feedback', customerActions: ['contact'] },
  { key: 'testimonials', currentPath: '/testimonials', legacyPaths: ['/testimonials/'], kind: 'page', title: 'Customer stories', customerActions: ['explore', 'enquire'] },
  { key: 'events', currentPath: '/events', legacyPaths: ['/events.html'], kind: 'page', title: 'Events', customerActions: ['explore', 'contact'] },
  { key: 'driving-school', currentPath: '/driving-school', legacyPaths: ['/driving-school.html/'], kind: 'page', title: 'Driving school', customerActions: ['explore', 'contact'] },
  { key: 'careers', currentPath: '/careers', legacyPaths: ['/careers/'], kind: 'page', title: 'Careers', customerActions: ['contact'] },
  { key: 'about', currentPath: '/about', legacyPaths: ['/about-us.html'], kind: 'page', title: 'About Nippon Toyota', customerActions: ['contact'] },
  { key: 'toyota-india', currentPath: '/toyota-india', legacyPaths: [], kind: 'page', title: 'Toyota India', customerActions: ['explore'] },
  { key: 'contact', currentPath: '/contact', legacyPaths: ['/contact-co01a.html'], kind: 'page', title: 'Contact Nippon Toyota', customerActions: ['contact', 'enquire'] },
  { key: 'disclaimer', currentPath: '/disclaimer', legacyPaths: ['/disclaimer.html'], kind: 'page', title: 'Disclaimer', customerActions: [] },
];

export const routeByPath = new Map(
  siteRoutes.flatMap((route) => [route.currentPath, ...route.legacyPaths].map((path) => [path, route] as const)),
);
