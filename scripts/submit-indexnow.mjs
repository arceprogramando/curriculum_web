/**
 * Envía URLs del sitemap a IndexNow (Bing y partners).
 * Solo corre en producción (VERCEL_ENV=production) o con --force.
 *
 * Uso:
 *   node scripts/submit-indexnow.mjs
 *   node scripts/submit-indexnow.mjs --force
 *   npm run indexnow
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const HOST = 'arceprog.dev';
const KEY = 'RosTqGG9WFFJNd-9mi4YzPJwClJqYFqt';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const force = process.argv.includes('--force');
const isProd = process.env.VERCEL_ENV === 'production' || process.env.INDEXNOW_SUBMIT === '1';

if (!force && !isProd) {
  console.log(
    '[indexnow] Skip: no es producción. Usá --force o INDEXNOW_SUBMIT=1 para forzar.',
  );
  process.exit(0);
}

function collectUrls() {
  const urls = new Set();
  const sitemapPaths = [
    resolve(root, 'dist/sitemap-0.xml'),
    resolve(root, 'dist/sitemap-index.xml'),
  ];

  for (const path of sitemapPaths) {
    if (!existsSync(path)) continue;
    const xml = readFileSync(path, 'utf8');
    for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const loc = match[1].trim();
      if (
        loc.startsWith(`https://${HOST}/`) &&
        !loc.includes('/cv/') &&
        !loc.includes('/crear-cv/vista')
      ) {
        urls.add(loc);
      }
    }
  }

  if (urls.size === 0) {
    urls.add(`https://${HOST}/`);
    urls.add(`https://${HOST}/en/`);
  }

  return [...urls];
}

const keyProbe = await fetch(KEY_LOCATION);
const keyBody = (await keyProbe.text()).trim();
if (!keyProbe.ok || keyBody !== KEY) {
  console.warn(
    `[indexnow] Clave aún no pública en ${KEY_LOCATION} (status ${keyProbe.status}). ` +
      'Tras el primer deploy que publique el .txt, volvé a correr npm run indexnow.',
  );
  process.exit(0);
}

const urlList = collectUrls();
const body = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList,
};

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

const text = await res.text();
if (res.ok || res.status === 202) {
  console.log(`[indexnow] OK ${res.status}: ${urlList.length} URLs enviadas.`);
} else {
  console.error(`[indexnow] Error ${res.status}: ${text || res.statusText}`);
  process.exit(1);
}
