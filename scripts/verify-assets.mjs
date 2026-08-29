import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const source = readFileSync(join(root, 'src', 'data', 'assetManifest.ts'), 'utf8');
const localAssets = [...source.matchAll(/path: '([^']+)'[^\n]*status: 'approved-local'/g)].map((match) => match[1]);
const missing = localAssets.filter((assetPath) => !existsSync(join(root, 'public', assetPath.replace(/^\//, '').replaceAll('/', '\\'))));

console.log(`Checked ${localAssets.length} approved local assets.`);
if (missing.length) {
  console.error(`Missing local assets:\n${missing.map((assetPath) => `- ${assetPath}`).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log('Asset manifest check passed.');
}
