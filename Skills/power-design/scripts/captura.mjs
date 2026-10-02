// Captura uma página em viewport fixo. Uso: node captura.mjs <arquivo.html|localhost> <saida.png> [--largura 1440] [--altura 900] [--cheia]
// Sem --cheia captura só o viewport (sem rolagem), útil para comparar com uma referência. URL externa é recusada (a página executa JS).
import { pathToFileURL } from 'node:url'; import { resolve } from 'node:path'; import { createRequire } from 'node:module';
const a = process.argv.slice(2), pos = [], o = {};
for (let i = 0; i < a.length; i++) { if (a[i] === '--cheia') o.cheia = true; else if (a[i].startsWith('--')) { o[a[i].slice(2)] = a[i + 1]; i++; } else pos.push(a[i]); }
const [alvo, saida] = pos; if (!alvo || !saida) { console.error('Uso: node captura.mjs <html|localhost> <saida.png> [--largura N] [--altura N] [--cheia]'); process.exit(2); }
if (/^https?:\/\//.test(alvo) && !/^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?(\/|$)/.test(alvo)) { console.error('URL externa recusada: a página executa JS no navegador. Peça OK ao usuário.'); process.exit(4); }
const req = createRequire(import.meta.url); let chromium;
try { chromium = req('playwright').chromium; } catch { try { chromium = req('playwright-core').chromium; } catch { console.error('Playwright não encontrado. A skill NÃO instala: peça OK ao usuário.'); process.exit(3); } }
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const p = await b.newPage({ viewport: { width: Number(o.largura || 1440), height: Number(o.altura || 900) } });
await p.goto(/^https?:\/\//.test(alvo) ? alvo : pathToFileURL(resolve(alvo)).href, { waitUntil: 'load' });
await p.screenshot({ path: resolve(saida), fullPage: !!o.cheia }); await b.close(); console.log('OK ' + resolve(saida));
