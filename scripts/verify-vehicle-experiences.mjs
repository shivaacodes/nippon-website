import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const carDetails = fs.readFileSync(path.join(root, 'src/data/carDetails.ts'), 'utf8');
const vehicleExperiences = fs.readFileSync(path.join(root, 'src/data/vehicleExperiences.ts'), 'utf8');

const carSlugs = [...carDetails.matchAll(/^  "([^"]+)": \{/gm)].map(([, slug]) => slug);
const experienceSlugs = [
  ...vehicleExperiences.matchAll(/^  (?:"([^"]+)"|'([^']+)'|([a-z0-9-]+)): /gm),
].map(([, doubleQuoted, singleQuoted, bare]) => doubleQuoted ?? singleQuoted ?? bare);

const missing = carSlugs.filter((slug) => !experienceSlugs.includes(slug));
if (missing.length > 0) {
  console.error(`Missing vehicle experiences: ${missing.join(', ')}`);
  process.exit(1);
}

console.log(`Checked ${carSlugs.length} vehicle routes. Every model has a 3D or virtual showroom source.`);
