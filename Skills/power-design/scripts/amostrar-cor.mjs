// Amostra cores de uma imagem. Uso: node amostrar-cor.mjs <img.png> <x> <y> [raio=2]   → hex médio do bloco (x,y em px da imagem)
//                                   node amostrar-cor.mjs <img.png> --paleta [N=8]        → N cores dominantes (quantização grosseira)
// Dica da skill: amostre em áreas CHAPADAS, não em borda serrilhada nem gradiente. Só lê a imagem; sem rede.
import { readFileSync } from 'node:fs'; import { createRequire } from 'node:module';
const [img, x, y, r] = process.argv.slice(2); if (!img || !x) { console.error('Uso: amostrar-cor.mjs <img> <x> <y> [raio]  |  <img> --paleta [N]'); process.exit(2); }
const req = createRequire(import.meta.url); let chromium;
try { chromium = req('playwright').chromium; } catch { try { chromium = req('playwright-core').chromium; } catch { console.error('Playwright não encontrado. A skill NÃO instala: peça OK.'); process.exit(3); } }
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined }); const p = await b.newPage(); await p.setContent('<canvas></canvas>');
let out; try { out = await p.evaluate(async ({ s, x, y, r }) => {
  const im = await new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => no(new Error('imagem inválida')); i.src = 'data:image/png;base64,' + s; });
  const c = document.createElement('canvas'); c.width = im.naturalWidth; c.height = im.naturalHeight; const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(im, 0, 0);
  const hex = v => '#' + v.map(n => Math.round(n).toString(16).padStart(2, '0')).join('');
  if (x === '--paleta') { const d = g.getImageData(0, 0, c.width, c.height).data, m = new Map(), n = Number(y || 8);
    for (let i = 0; i < d.length; i += 16) { const k = [d[i] >> 4, d[i + 1] >> 4, d[i + 2] >> 4].join(','); const e = m.get(k) || { c: 0, s: [0, 0, 0] }; e.c++; e.s[0] += d[i]; e.s[1] += d[i + 1]; e.s[2] += d[i + 2]; m.set(k, e); }
    const tot = [...m.values()].reduce((q, e) => q + e.c, 0); return [...m.values()].sort((p, q) => q.c - p.c).slice(0, n).map(e => `${hex(e.s.map(v => v / e.c))}  ${(100 * e.c / tot).toFixed(1)}%`); }
  const X = Number(x), Y = Number(y), R = Number(r ?? 2); if (X < 0 || Y < 0 || X >= c.width || Y >= c.height) throw new Error(`fora da imagem (${c.width}x${c.height})`);
  const w = Math.min(c.width - Math.max(0, X - R), 2 * R + 1), h = Math.min(c.height - Math.max(0, Y - R), 2 * R + 1), d = g.getImageData(Math.max(0, X - R), Math.max(0, Y - R), w, h).data; const s2 = [0, 0, 0]; let k = 0, mn = [255, 255, 255], mx = [0, 0, 0];
  for (let i = 0; i < d.length; i += 4) { for (let j = 0; j < 3; j++) { s2[j] += d[i + j]; mn[j] = Math.min(mn[j], d[i + j]); mx[j] = Math.max(mx[j], d[i + j]); } k++; }
  return [`${hex(s2.map(v => v / k))}  (bloco ${w}x${h}; variação máx. por canal ${Math.max(...mx.map((v, j) => v - mn[j]))}${Math.max(...mx.map((v, j) => v - mn[j])) > 12 ? ' — NÃO é área chapada, mova a amostra' : ''})`];
}, { s: readFileSync(img).toString('base64'), x, y, r }); } catch (e) { await b.close(); console.error('Erro: ' + String(e.message).split('\n')[0].slice(0, 140)); process.exit(5); }
await b.close(); console.log(out.join('\n'));
