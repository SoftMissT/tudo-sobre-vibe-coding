// Verificador de interface renderizada (Playwright). Abre a página, tira capturas (grava PNG na pasta de saída) e imprime achados.
// Uso: node render-check.mjs <arquivo.html|localhost> [pastaDeSaida] [--permitir-externo]
// ATENÇÃO: o Chromium EXECUTA o JavaScript da página e faz as requisições dela. Por isso URL externa é recusada sem --permitir-externo. Requer Playwright + Chromium já instalados (a skill não instala).
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';

const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
const permitirExterno = process.argv.includes('--permitir-externo');
const alvo = args[0];
const saida = resolve(args[1] || './render-check-out');
if (!alvo) { console.error('Uso: node render-check.mjs <arquivo.html|URL> [saida]'); process.exit(2); }
if (/^https?:\/\//.test(alvo) && !permitirExterno && !/^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?(\/|$)/.test(alvo)) { console.error('URL externa recusada: a página executa JS no navegador. Peça OK ao usuário e use --permitir-externo.'); process.exit(4); }
const url = /^https?:\/\//.test(alvo) ? alvo : pathToFileURL(resolve(alvo)).href;
let chromium;
const req = createRequire(import.meta.url);
try { chromium = req('playwright').chromium; } catch { try { chromium = req('playwright-core').chromium; } catch { console.error('Playwright não encontrado. A skill NÃO instala: peça OK ao usuário (npm i -D playwright) ou use o Playwright MCP.'); process.exit(3); } }
mkdirSync(saida, { recursive: true });

const viewports = [['mobile', 375, 800], ['tablet', 768, 1024], ['desktop', 1440, 900]];
const achados = [];
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
for (const [nome, w, h] of viewports) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  const erros = [];
  page.on('console', m => { if (m.type() === 'error') erros.push(m.text()); });
  page.on('pageerror', e => erros.push(String(e)));
  await page.goto(url, { waitUntil: 'load' });
  await page.screenshot({ path: `${saida}/${nome}.png`, fullPage: true });
  const r = await page.evaluate(() => {
    const lum = ([r, g, b]) => { const f = c => { c /= 255; return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
    const rgba = s => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number); return { c: p.slice(0, 3), a: p[3] ?? 1 }; };
    const fundo = el => { for (let e = el; e; e = e.parentElement) { const c = rgba(getComputedStyle(e).backgroundColor); if (c && c.a > .95) return c.c; } return [255, 255, 255]; };
    const nome = el => (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.textContent || el.getAttribute('title') || '').trim();
    const out = { overflowX: document.documentElement.scrollWidth > innerWidth + 1, semAlt: [], botaoSemNome: [], inputSemRotulo: [], contraste: [], h1: document.querySelectorAll('h1').length,
      lang: document.documentElement.lang || '', viewport: !!document.querySelector('meta[name=viewport]'), zoomBloqueado: /user-scalable\s*=\s*no|maximum-scale\s*=\s*1(\D|$)/.test(document.querySelector('meta[name=viewport]')?.content || ''),
      imgSemDim: [], divClicavel: [], transitionAll: false, reducedMotion: false };
    document.querySelectorAll('img').forEach(i => { if (!i.hasAttribute('alt')) out.semAlt.push(i.outerHTML.slice(0, 70)); if (!i.getAttribute('width') && !i.getAttribute('height') && !i.style.aspectRatio) out.imgSemDim.push(i.outerHTML.slice(0, 70)); });
    document.querySelectorAll('button,[role=button],a[href]').forEach(b => { if (!nome(b) && !b.querySelector('img[alt]:not([alt=""])')) out.botaoSemNome.push(b.outerHTML.slice(0, 70)); });
    document.querySelectorAll('input:not([type=hidden]),select,textarea').forEach(i => { if (!i.labels?.length && !i.getAttribute('aria-label') && !i.getAttribute('aria-labelledby')) out.inputSemRotulo.push(i.outerHTML.slice(0, 70)); });
    document.querySelectorAll('div[onclick],span[onclick]').forEach(d => out.divClicavel.push(d.outerHTML.slice(0, 70)));
    const varre = rules => { for (const rl of rules) { if (/transition\s*:\s*all/.test(rl.cssText) || (rl.style && rl.style.transitionDuration && !/^0(\.0+)?m?s(,\s*0(\.0+)?m?s)*$/.test(rl.style.transitionDuration) && /(^|,\s*)all(\s*,|$)/.test(rl.style.transitionProperty))) out.transitionAll = true; if (rl.media && /prefers-reduced-motion/.test(rl.conditionText || rl.media.mediaText)) out.reducedMotion = true; if (rl.cssRules) varre(rl.cssRules); } };
    for (const sh of document.styleSheets) { try { varre(sh.cssRules); } catch {} }
    const vistos = new Set();
    document.querySelectorAll('body *').forEach(el => {
      if (![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) return;
      const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none') return;
      const fg = rgba(cs.color); if (!fg) return; const bg = fundo(el);
      const a = fg.a, mix = fg.c.map((v, i) => v * a + bg[i] * (1 - a));
      const L1 = lum(mix), L2 = lum(bg), ratio = (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05);
      const px = parseFloat(cs.fontSize), grande = px >= 24 || (px >= 18.66 && parseInt(cs.fontWeight) >= 700), min = grande ? 3 : 4.5;
      const k = el.tagName + cs.color + JSON.stringify(bg); if (ratio < min && !vistos.has(k)) { vistos.add(k); out.contraste.push(`${el.tagName.toLowerCase()} "${(el.textContent || '').trim().slice(0, 28)}" ${ratio.toFixed(2)}:1 (mín ${min})`); }
    });
    return out;
  });
  // foco: Tab até 15 vezes; cada elemento focado precisa mostrar outline ou box-shadow visível
  let semFoco = 0, focaveis = 0; const jaVisto = new Set();
  for (let i = 0; i < 15; i++) {
    await page.keyboard.press('Tab');
    const f = await page.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; const s = getComputedStyle(e); return { id: e.outerHTML.slice(0, 120), tag: e.tagName.toLowerCase(), ok: (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== 'none' }; });
    if (f && !jaVisto.has(f.id)) { jaVisto.add(f.id); focaveis++; if (!f.ok) semFoco++; }
  }
  const add = (cond, msg) => cond && achados.push(`[${nome}] ${msg}`);
  add(r.overflowX, 'rolagem horizontal (conteúdo mais largo que a tela)');
  r.semAlt.forEach(x => add(true, `img sem alt: ${x}`)); r.botaoSemNome.forEach(x => add(true, `botão/link sem nome acessível: ${x}`));
  r.inputSemRotulo.forEach(x => add(true, `campo sem rótulo: ${x}`)); r.divClicavel.forEach(x => add(true, `div/span com onclick (use button/a): ${x}`));
  r.contraste.slice(0, 8).forEach(x => add(true, `contraste baixo: ${x}`)); erros.forEach(x => add(true, `erro de console: ${x.slice(0, 90)}`));
  add(semFoco > 0, `${semFoco} de ${focaveis} elementos focados por Tab sem indicador de foco visível`);
  if (nome === 'mobile') { add(r.h1 !== 1, `h1 encontrados: ${r.h1} (esperado 1)`); add(!r.lang, 'html sem atributo lang'); add(!r.viewport, 'sem meta viewport'); add(r.zoomBloqueado, 'zoom bloqueado no meta viewport');
    add(r.transitionAll, '"transition: all" encontrado'); add(!r.reducedMotion, 'sem @media (prefers-reduced-motion) [pode ser legítimo se não há animação]'); r.imgSemDim.slice(0, 5).forEach(x => add(true, `img sem width/height (CLS): ${x}`)); }
  await page.close();
}
await browser.close();
console.log(`ALVO: ${url}\nCAPTURAS: ${saida}/{mobile,tablet,desktop}.png`);
if (!achados.length) console.log('✓ nenhum achado nas verificações automáticas (isto NÃO substitui olhar as capturas nem teste com leitor de tela)');
else { console.log(`ACHADOS (${achados.length}):`); achados.forEach(a => console.log(' - ' + a)); }
process.exit(achados.length ? 1 : 0);
