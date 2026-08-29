const origin = process.env.SITE_ORIGIN || 'http://localhost:3000';
const routes = [
  '/', '/virtual-showroom', '/testdrive', '/pricelist', '/buynow', '/brochure', '/exchange', '/service', '/service/full-menu',
  '/accessories', '/used-cars', '/loan', '/insurance', '/promotions', '/whats-new', '/feedback', '/testimonials', '/events',
  '/driving-school', '/careers', '/about', '/toyota-india', '/contact', '/disclaimer', '/sitemap.xml', '/robots.txt',
];
const failures = [];
for (const route of routes) {
  try {
    const response = await fetch(`${origin}${route}`);
    if (!response.ok) failures.push(`${route} returned ${response.status}`);
    else console.log(`${response.status} ${route}`);
  } catch (error) {
    failures.push(`${route} failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}
if (failures.length) {
  console.error(`Route verification failed:\n${failures.map((failure) => `- ${failure}`).join('\n')}`);
  process.exitCode = 1;
} else console.log(`Route verification passed for ${routes.length} URLs.`);
