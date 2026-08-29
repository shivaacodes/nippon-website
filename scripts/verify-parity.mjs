import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const pageRoot = join(root, 'src', 'app');
const routeSource = readFileSync(join(root, 'src', 'data', 'siteRoutes.ts'), 'utf8');
const assetSource = readFileSync(join(root, 'src', 'data', 'assetManifest.ts'), 'utf8');
const requiredPages = [...routeSource.matchAll(/currentPath: '([^']+)'/g)].map((match) => match[1]);
const legacyPaths = [...routeSource.matchAll(/legacyPaths: \[([^\]]*)\]/g)].flatMap((match) => [...match[1].matchAll(/'([^']+)'/g)].map((item) => item[1]));
const missingPages = requiredPages.filter((route) => !existsSync(join(pageRoot, ...(route === '/' ? [] : route.slice(1).split('/')), 'page.tsx')));
const missingAssets = [...assetSource.matchAll(/path: '([^']+)'[^\n]*status: 'approved-local'/g)].map((match) => match[1]).filter((assetPath) => !existsSync(join(root, 'public', assetPath.replace(/^\//, '').replaceAll('/', '\\'))));
const duplicate = (items) => [...new Set(items.filter((item, index) => items.indexOf(item) !== index))];
const duplicateRoutes = duplicate(requiredPages);
const duplicateLegacy = duplicate(legacyPaths);
const missingTitles = [...routeSource.matchAll(/\{ key: '([^']+)'[^\n]*title: '([^']*)'/g)].filter((match) => !match[2].trim()).map((match) => match[1]);
const modelRoot = join(pageRoot, 'virtual-showroom');
const modelPages = existsSync(modelRoot) ? readdirSync(modelRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory()).length : 0;

console.log(`Checked ${requiredPages.length} canonical customer routes.`);
console.log(`Found ${modelPages} showroom route folders.`);
if (missingPages.length) console.error(`Missing canonical pages:\n${missingPages.map((route) => `- ${route}`).join('\n')}`);
if (missingAssets.length) console.error(`Missing local assets:\n${missingAssets.map((assetPath) => `- ${assetPath}`).join('\n')}`);
if (duplicateRoutes.length) console.error(`Duplicate canonical routes:\n${duplicateRoutes.map((route) => `- ${route}`).join('\n')}`);
if (duplicateLegacy.length) console.error(`Duplicate legacy routes:\n${duplicateLegacy.map((route) => `- ${route}`).join('\n')}`);
if (missingTitles.length) console.error(`Routes without titles:\n${missingTitles.map((route) => `- ${route}`).join('\n')}`);

if (missingPages.length || missingAssets.length || duplicateRoutes.length || duplicateLegacy.length || missingTitles.length) process.exitCode = 1;
else console.log('Parity route, title, and local asset checks passed.');
