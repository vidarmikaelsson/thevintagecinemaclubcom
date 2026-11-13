// Copies the finished build (dist/) into ready-to-upload/, the committed folder
// whose contents can be uploaded to any web host without building.
// Run via: npm run build:upload
import { cpSync, rmSync, existsSync } from 'node:fs';

const src = new URL('../dist/', import.meta.url);
const dest = new URL('../ready-to-upload/', import.meta.url);
if (!existsSync(new URL('index.html', src))) throw new Error('dist/ is empty – run "npm run build" first');
rmSync(dest, { recursive: true, force: true });
cpSync(src, dest, { recursive: true });
console.log('ready-to-upload/ updated from dist/');
