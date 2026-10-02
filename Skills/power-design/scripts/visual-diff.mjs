// Comparador visual: referência (imagem do usuário) x captura da implementação. Usa o Chromium do Playwright (canvas); sem dependências extras.
// Uso: node visual-diff.mjs <referencia.png> <captura.png> [diff.png] [--max <pct>] [--tol <0-255>]
// Saída: % de pixels diferentes, diferença de tamanho e as 5 regiões piores (em pixels da REFERÊNCIA) para corrigir "a maior diferença primeiro".
// Só lê as duas imagens e grava o diff.png pedido. Não usa rede.
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const arg = process.argv.slice(2); const pos = []; const opt = {};
for (let i = 0; i < arg.length; i++) { if (arg[i].startsWith('--')) { opt[arg[i].slice(2)] = arg[i + 1]; i++; } else pos.push(arg[i]); }
const [refP, outP, diffP] = pos;
if (!refP || !outP) { console.error('Uso: node visual-diff.mjs <referencia.png> <captura.png> [diff.png] [--max pct] [--tol 0-255]'); process.exit(2); }
const tol = Number(opt.tol ?? 24), max = opt.max !== undefined ? Number(opt.max) : null;
const req = createRequire(import.meta.url); let chromium;
try { chromium = req('playwright').chromium; } catch { try { chromium = req('playwright-core').chromium; } catch { console.error('Playwright não encontrado. A skill NÃO instala: peça OK ao usuário.'); process.exit(3); } }
const b64 = p => readFileSync(p).toString('base64');
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage(); await page.setContent('<canvas id=c></canvas>');
let r;
try { r = await page.evaluate(async ({ a, b, tol }) => {
  const load = s => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('imagem inválida')); i.src = 'data:image/png;base64,' + s; });
  const [A, B] = [await load(a), await load(b)];
  const W = A.naturalWidth, H = A.naturalHeight, scale = W / B.naturalWidth, bh = Math.round(B.naturalHeight * scale);
  const px = (img, w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d', { willReadFrequently: true }); x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.drawImage(img, 0, 0, w, h); return x.getImageData(0, 0, w, h).data; };
  const da = px(A, W, H), db = px(B, W, H);   // captura reescalada para a largura da referência; fora da área = branco
  const cols = 4, rows = Math.max(8, Math.round(H / 400)), cw = W / cols, ch = H / rows, cell = new Float64Array(cols * rows), cnt = new Float64Array(cols * rows);
  const out = new Uint8ClampedArray(da.length); let diff = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = (y * W + x) * 4; const d = Math.max(Math.abs(da[i] - db[i]), Math.abs(da[i + 1] - db[i + 1]), Math.abs(da[i + 2] - db[i + 2]));
    const k = Math.min(rows - 1, Math.floor(y / ch)) * cols + Math.min(cols - 1, Math.floor(x / cw)); cnt[k]++; const bad = d > tol; if (bad) { diff++; cell[k]++; }
    out[i] = bad ? 255 : da[i] * .3 + 178; out[i + 1] = bad ? 0 : da[i + 1] * .3 + 178; out[i + 2] = bad ? 0 : da[i + 2] * .3 + 178; out[i + 3] = 255; }
  const c = document.createElement('canvas'); c.width = W; c.height = H; c.getContext('2d').putImageData(new ImageData(out, W, H), 0, 0);
  const regioes = [...cell].map((v, k) => ({ pct: 100 * v / cnt[k], x0: Math.round((k % cols) * cw), x1: Math.round(((k % cols) + 1) * cw), y0: Math.round(Math.floor(k / cols) * ch), y1: Math.round((Math.floor(k / cols) + 1) * ch) })).sort((p, q) => q.pct - p.pct).slice(0, 5);
  return { W, H, bw: B.naturalWidth, bh0: B.naturalHeight, bh, diffPct: 100 * diff / (W * H), regioes, png: c.toDataURL('image/png').split(',')[1] };
}, { a: b64(refP), b: b64(outP), tol }); } catch (e) { await browser.close(); console.error('Erro ao comparar (arquivo ausente, não é PNG/JPG válido ou imagem enorme): ' + String(e.message).split('\n')[0].slice(0, 140)); process.exit(5); }
await browser.close();
if (diffP) writeFileSync(diffP, Buffer.from(r.png, 'base64'));
console.log(`REFERÊNCIA ${r.W}x${r.H} | CAPTURA ${r.bw}x${r.bh0} (reescalada p/ largura da referência: altura ${r.bh}; diferença de altura ${r.bh - r.H}px)`);
console.log(`PIXELS DIFERENTES (tolerância ${tol}/255): ${r.diffPct.toFixed(2)}%`);
console.log('PIORES REGIÕES (px da referência):'); r.regioes.forEach(g => console.log(`  x ${g.x0}-${g.x1}, y ${g.y0}-${g.y1}: ${g.pct.toFixed(1)}% diferente`));
if (diffP) console.log(`DIFF: ${diffP} (vermelho = diferente)`);
console.log('Nota: % baixo NÃO prova fidelidade (fonte, texto e imagem podem diferir pouco em pixels e muito em estrutura); olhe as duas imagens.');
process.exit(max !== null && r.diffPct > max ? 1 : 0);
