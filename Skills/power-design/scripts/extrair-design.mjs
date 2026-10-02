// Extrator de design: URL (ou arquivo .html local) -> pasta no formato de "design system" do Open Design.
// Uso: node extrair-design.mjs <url|arquivo.html> <pastaDeSaida> [--nome "Nome"] [--slug meu-slug] [--permitir-local]
// MEDE os estilos calculados no navegador (Playwright/Chromium). Não adivinha: cada valor vem do DOM/CSS ou é marcado [estimado].
// SEGURANÇA: abre o site em contexto ISOLADO (sem cookies/login), executa o JavaScript dele (necessário para medir), bloqueia downloads,
// permissões e requisições a redes privadas/localhost (salvo --permitir-local). Não clica em nada, não preenche formulários, não baixa logos/imagens.
// Requer Playwright já instalado (a skill NÃO instala). Respeite os termos do site e a lei de direitos autorais ao usar o resultado.
import { pathToFileURL } from 'node:url';
import { resolve, join } from 'node:path';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const arg = process.argv.slice(2), pos = [], opt = {};
for (let i = 0; i < arg.length; i++) { if (arg[i] === '--permitir-local') opt.local = true; else if (arg[i].startsWith('--')) { opt[arg[i].slice(2)] = arg[i + 1]; i++; } else pos.push(arg[i]); }
const [alvo, saidaBase] = pos;
if (!alvo || !saidaBase) { console.error('Uso: node extrair-design.mjs <url|arquivo.html> <pastaDeSaida> [--nome N] [--slug s] [--permitir-local]'); process.exit(2); }
const ehUrl = /^https?:\/\//i.test(alvo);
if (ehUrl) { try { const u = new URL(alvo); if (u.username || u.password) { console.error('URL com usuário/senha recusada.'); process.exit(4); } } catch { console.error('URL inválida.'); process.exit(2); } }
else if (!existsSync(alvo)) { console.error('Arquivo não encontrado: ' + alvo); process.exit(2); }
const url = ehUrl ? alvo : pathToFileURL(resolve(alvo)).href;
const host = ehUrl ? new URL(alvo).hostname : 'arquivo-local';
const PRIVADO = /^(localhost|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|0\.0\.0\.0|\[?::1\]?$|\[?f[cd][0-9a-f]{2}:)/i;
if (ehUrl && PRIVADO.test(host) && !opt.local) { console.error('Alvo em rede privada/localhost recusado. Use --permitir-local só para páginas suas.'); process.exit(4); }
const slug = (opt.slug || host.replace(/^www\./, '').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'site').slice(0, 60);
const nome = opt.nome || host.replace(/^www\./, '');
const out = join(resolve(saidaBase), slug); mkdirSync(join(out, 'source', 'screenshots'), { recursive: true });

const req = createRequire(import.meta.url); let chromium;
try { chromium = req('playwright').chromium; } catch { try { chromium = req('playwright-core').chromium; } catch { console.error('Playwright não encontrado. A skill NÃO instala: peça OK ao usuário.'); process.exit(3); } }

// ---------- medição dentro da página ----------
function medir(completo) {
  const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d', { willReadFrequently: true }); const cache = new Map();
  const rgba = s => { if (!s) return null; if (cache.has(s)) return cache.get(s); cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = s; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; const r = [d[0], d[1], d[2], +(d[3] / 255).toFixed(3)]; cache.set(s, r); return r; };
  const hex = c => '#' + c.slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
  const lum = ([r, g, b]) => { const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
  const razao = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
  const sat = ([r, g, b]) => { const mx = Math.max(r, g, b) / 255, mn = Math.min(r, g, b) / 255, l = (mx + mn) / 2; return mx === mn ? 0 : (mx - mn) / (1 - Math.abs(2 * l - 1)); };
  const px = v => { const n = parseFloat(v); return Number.isFinite(n) ? Math.round(n * 100) / 100 : null; };
  const inc = (m, k, n = 1) => m.set(k, (m.get(k) || 0) + n);
  const top = (m, n) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
  const fundo = el => { for (let e = el; e; e = e.parentElement) { const c = rgba(getComputedStyle(e).backgroundColor); if (c && c[3] >= .5) return c.slice(0, 3); } return [255, 255, 255]; };
  const W = innerWidth, r = { viewport: W, titulo: document.title, lang: document.documentElement.lang || '' };
  const els = [...document.querySelectorAll('body *')].filter(e => !/^(SCRIPT|STYLE|NOSCRIPT|LINK|META|TEMPLATE|HEAD|BR|WBR|PATH|DEFS|CIRCLE|RECT|G|LINE|POLYGON|USE|SYMBOL)$/i.test(e.tagName)).slice(0, 6000);
  const vis = els.filter(e => { const rc = e.getBoundingClientRect(), s = getComputedStyle(e); return rc.width > 0 && rc.height > 0 && s.display !== 'none' && s.visibility !== 'hidden' && +s.opacity > 0; });
  r.elementos = vis.length;
  // largura de contêiner e margem lateral
  const mw = new Map(); const secY = new Map(); const sim = new Map(); let esq = Infinity;
  for (const e of vis) { const s = getComputedStyle(e), rc = e.getBoundingClientRect();
    if (/px$/.test(s.maxWidth) && px(s.maxWidth) >= 480) inc(mw, px(s.maxWidth));
    if (/^(DIV|SECTION|MAIN|HEADER|FOOTER|NAV|ARTICLE|UL)$/.test(e.tagName) && rc.width >= 280 && rc.width <= W - 8 && rc.left >= 0 && Math.abs(rc.left - (W - rc.right)) <= 2 && e.querySelectorAll('*').length >= 3) inc(sim, Math.round(rc.width) + ':' + Math.round(rc.left));
    const blocoGrande = /^(SECTION|HEADER|FOOTER|MAIN|ARTICLE)$/.test(e.tagName) || (e.parentElement && /^(MAIN|BODY)$/.test(e.parentElement.tagName) && rc.width >= W * .9);
    if (blocoGrande && rc.height > 120) { const pt = px(s.paddingTop); if (pt >= 24) inc(secY, pt); }
    if (/^(P|H1|H2|H3|LI|A|SPAN)$/.test(e.tagName) && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 2) && rc.left >= 0 && rc.left < W && rc.right > 0 && rc.bottom > 0 && rc.top < document.documentElement.scrollHeight) esq = Math.min(esq, Math.round(rc.left)); }
  const bs = [...sim.entries()].sort((a, b) => b[1] - a[1] || parseInt(b[0]) - parseInt(a[0]))[0];
  r.container = { maxWidths: top(mw, 5), secaoPaddingTop: top(secY, 4), margemEsquerdaTexto: Number.isFinite(esq) ? esq : null, blocoSimetrico: bs ? { largura: +bs[0].split(':')[0], esquerda: +bs[0].split(':')[1], ocorrencias: bs[1] } : null };
  if (!completo) return r;

  const cor = new Map(), fundoArea = new Map(), borda = new Map(), fam = new Map(), tam = new Map(), peso = new Map(), raio = new Map(), sombra = new Map(), esp = new Map(), trans = new Map(), ease = new Map();
  let animados = 0; const falhas = new Map(); let textos = 0, totalAA = 0; const corPagina = new Map(); const pgb = (() => { const a = rgba(getComputedStyle(document.body).backgroundColor), b = rgba(getComputedStyle(document.documentElement).backgroundColor); return (a && a[3] >= .5 ? a : b && b[3] >= .5 ? b : [255, 255, 255, 1]).slice(0, 3); })();
  for (const e of vis) { const s = getComputedStyle(e), rc = e.getBoundingClientRect(); const area = Math.min(rc.width * rc.height, W * 4000);
    const bg = rgba(s.backgroundColor); if (bg && bg[3] >= .5 && area > 400) inc(fundoArea, hex(bg), Math.round(area));
    const bw = px(s.borderTopWidth) || 0, bs = s.borderTopStyle; if (bw > 0 && bs !== 'none') { const bc = rgba(s.borderTopColor); if (bc && bc[3] > .1) inc(borda, hex(bc)); }
    const rd = s.borderTopLeftRadius; if (rd && rd !== '0px') inc(raio, rd.includes('%') ? rd : px(rd) + 'px');
    if (s.boxShadow && s.boxShadow !== 'none') inc(sombra, s.boxShadow);
    for (const p of [s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft, s.rowGap, s.columnGap]) { const v = px(p); if (v && v > 0 && v < 400) inc(esp, v); }
    if (s.transitionDuration && !/^0s(, 0s)*$/.test(s.transitionDuration)) { for (const d of s.transitionDuration.split(',')) { const v = d.trim(), ms = v.endsWith('ms') ? parseFloat(v) : Math.round(parseFloat(v) * 1000); if (ms > 0) inc(trans, ms); } inc(ease, s.transitionTimingFunction.split(/,(?![^(]*\))/)[0].trim()); }
    if (s.animationName && s.animationName !== 'none') animados++;
    const temTexto = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 0);
    if (temTexto) { textos++; const c = rgba(s.color); if (c) { inc(cor, hex(c)); if (Math.abs(lum(fundo(e)) - lum(pgb)) < .2) inc(corPagina, hex(c)); } inc(fam, s.fontFamily); inc(tam, px(s.fontSize)); inc(peso, s.fontWeight);
      if (c) { const b = fundo(e), a = c[3], mix = c.slice(0, 3).map((v, i) => v * a + b[i] * (1 - a)), rz = razao(mix, b), t = px(s.fontSize), grande = t >= 24 || (t >= 18.66 && parseInt(s.fontWeight) >= 700), min = grande ? 3 : 4.5; totalAA++; if (rz < min) inc(falhas, `${hex(mix)} sobre ${hex(b)} = ${rz.toFixed(2)}:1 (mín ${min})`); } } }
  const fb = rgba(getComputedStyle(document.body).backgroundColor), fh = rgba(getComputedStyle(document.documentElement).backgroundColor);
  r.paginaFundo = hex((fb && fb[3] >= .5 ? fb : fh && fh[3] >= .5 ? fh : [255, 255, 255, 1]));
  r.cores = { textoSobrePagina: top(corPagina, 8), texto: top(cor, 10), fundoPorArea: top(fundoArea, 10), borda: top(borda, 6) };
  r.fontes = top(fam, 6); r.tamanhos = top(tam, 14); r.pesos = top(peso, 6); r.raios = top(raio, 8); r.sombras = top(sombra, 5);
  r.espacamento = top(esp, 14); r.transicoesMs = top(trans, 6); r.easings = top(ease, 4); r.animados = animados; r.textos = textos;
  r.contraste = { amostras: totalAA, falhas: [...falhas.values()].reduce((a, b) => a + b, 0), piores: top(falhas, 5) };
  const vals = [...esp.keys()].filter(v => v >= 4); const dv = u => vals.length ? vals.filter(v => v % u === 0).length / vals.length : 0;
  r.unidadeBase = dv(8) >= .7 ? { unidade: 8, aderencia: +dv(8).toFixed(2) } : dv(4) >= .7 ? { unidade: 4, aderencia: +dv(4).toFixed(2) } : { unidade: null, aderencia: +Math.max(dv(4), dv(8)).toFixed(2) };
  // papéis tipográficos
  const papel = (sel, modal) => { const lista = [...document.querySelectorAll(sel)].filter(x => vis.includes(x) && x.textContent.trim().length > (modal ? 20 : 0)); let e = lista[0]; if (modal && lista.length) { const m = new Map(); lista.forEach(x => inc(m, getComputedStyle(x).fontSize)); const melhor = top(m, 1)[0][0]; e = lista.find(x => getComputedStyle(x).fontSize === melhor); } if (!e) return null; const s = getComputedStyle(e), c = rgba(s.color), t = px(s.fontSize), lh = px(s.lineHeight), ls = s.letterSpacing === 'normal' ? 0 : px(s.letterSpacing);
    return { seletor: sel, texto: e.textContent.trim().slice(0, 40), familia: s.fontFamily, tamanho: t, peso: s.fontWeight, entrelinha: lh ? +(lh / t).toFixed(3) : 'normal', trackingEm: ls ? +(ls / t).toFixed(3) : 0, cor: c ? hex(c) : null, caixa: s.textTransform, estilo: s.fontStyle }; };
  r.papeis = Object.fromEntries(['h1', 'h2', 'h3', 'h4', 'p', 'small', 'li', 'label', 'code, pre', 'nav a', 'main a, article a, p a'].map(k => [k, papel(k, k === 'p' || k === 'li')]).filter(([, v]) => v));
  // componentes
  const sig = (e) => { const s = getComputedStyle(e), bg = rgba(s.backgroundColor), c = rgba(s.color), bc = rgba(s.borderTopColor);
    return { bg: bg && bg[3] > .05 ? hex(bg) + (bg[3] < .95 ? `@${bg[3]}` : '') : 'transparente', cor: c ? hex(c) : null, raio: s.borderTopLeftRadius, padding: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`, fonte: `${px(s.fontSize)}px/${s.fontWeight}`, caixa: s.textTransform, borda: px(s.borderTopWidth) ? `${s.borderTopWidth} ${s.borderTopStyle} ${bc ? hex(bc) : ''}` : 'nenhuma', sombra: s.boxShadow !== 'none' ? s.boxShadow.slice(0, 80) : 'nenhuma', altura: Math.round(e.getBoundingClientRect().height) }; };
  const grupo = (lista, n) => { const m = new Map(); lista.forEach((e, i) => { const k = JSON.stringify(sig(e)); const g = m.get(k) || { n: 0, i, texto: (e.textContent || e.value || e.placeholder || '').trim().slice(0, 28) }; g.n++; m.set(k, g); }); return [...m.entries()].sort((a, b) => b[1].n - a[1].n).slice(0, n).map(([k, g]) => ({ ...JSON.parse(k), ocorrencias: g.n, exemplo: g.texto, _i: g.i })); };
  const botoes = vis.filter(e => /^(BUTTON)$/.test(e.tagName) || e.getAttribute('role') === 'button' || (e.tagName === 'A' && /(^|[\s_-])(btn|button|cta)([\s_-]|$)/i.test(e.className && e.className.baseVal === undefined ? e.className : '')) || (e.tagName === 'INPUT' && /submit|button/.test(e.type)));
  botoes.forEach((e, i) => e.setAttribute('data-od-b', i)); const gb = grupo(botoes, 4); gb.forEach(g => { g.sel = `[data-od-b="${g._i}"]`; delete g._i; });
  const campos = vis.filter(e => /^(INPUT|TEXTAREA|SELECT)$/.test(e.tagName) && !/hidden|checkbox|radio|submit|button/.test(e.type || '')); const gc = grupo(campos, 2); gc.forEach(g => delete g._i);
  const cards = vis.filter(e => { const s = getComputedStyle(e), rc = e.getBoundingClientRect(); return rc.width > 140 && rc.width < W * .8 && rc.height > 80 && px(s.borderTopLeftRadius) >= 4 && (s.boxShadow !== 'none' || px(s.borderTopWidth) > 0) && e.querySelector('h1,h2,h3,h4,h5,strong'); }); const gk = grupo(cards, 3); gk.forEach(g => delete g._i);
  const nav = [...document.querySelectorAll('nav, header')].find(x => vis.includes(x)); r.nav = nav ? { altura: Math.round(nav.getBoundingClientRect().height), fundo: hex(rgba(getComputedStyle(nav).backgroundColor) || [0, 0, 0, 0]), fixa: /sticky|fixed/.test(getComputedStyle(nav).position) } : null;
  r.componentes = { botoes: gb, campos: gc, cards: gk };
  // fontes e custom properties no DOM
  const cp = {}; for (const sh of document.styleSheets) { try { for (const rl of sh.cssRules) { if (rl.style && /^(:root|html|body)(\s|,|$)/.test(rl.selectorText || '')) for (const n of rl.style) if (n.startsWith('--')) cp[n] = rl.style.getPropertyValue(n).trim().slice(0, 120); } } catch { /* folha de outra origem */ } }
  r.customPropsDom = Object.entries(cp).slice(0, 80);
  r.meta = { themeColor: document.querySelector('meta[name=theme-color]')?.content || null, descricao: document.querySelector('meta[name=description]')?.content?.slice(0, 160) || null, siteName: document.querySelector('meta[property="og:site_name"]')?.content || null, icone: document.querySelector('link[rel~=icon]')?.href?.slice(0, 120) || null, colorScheme: getComputedStyle(document.documentElement).colorScheme };
  return r;
}

// ---------- execução ----------
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const cssTextos = [], hostsFonte = new Set(), hostsCss = new Set(), bloqueados = new Set();
async function abrir(vw, vh, esquema) {
  const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, acceptDownloads: false, serviceWorkers: 'block', permissions: [], colorScheme: esquema || 'light', ignoreHTTPSErrors: false });
  await ctx.route('**/*', rota => { try { const u = new URL(rota.request().url()); if (/^(https?:)$/.test(u.protocol) && PRIVADO.test(u.hostname) && !opt.local) { bloqueados.add(u.hostname); return rota.abort(); } } catch { /* ignora */ } return rota.continue(); });
  const page = await ctx.newPage(); page.setDefaultTimeout(45000);
  page.on('dialog', d => d.dismiss().catch(() => {}));
  if (!esquema) page.on('response', async resp => { try { const t = resp.request().resourceType(), u = new URL(resp.url()); if (t === 'stylesheet') { hostsCss.add(u.hostname); const b = await resp.text(); if (b.length < 3e6) cssTextos.push(b); } else if (t === 'font') hostsFonte.add(u.hostname); } catch { /* ignora */ } });
  await page.goto(url, { waitUntil: 'load' }); await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
  await page.evaluate(async () => { const h = document.documentElement.scrollHeight; document.documentElement.style.scrollBehavior = 'auto'; for (let y = 0; y < Math.min(h, 12000); y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } document.documentElement.style.scrollBehavior = 'auto'; scrollTo(0, 0); for (let i = 0; i < 20 && scrollY > 0; i++) await new Promise(r => setTimeout(r, 100)); await new Promise(r => setTimeout(r, 300)); });
  return { ctx, page };
}
let desktop, tablet, phone, dark = null, hover = [], foco = null, erro = null;
try {
  const d = await abrir(1440, 900); desktop = await d.page.evaluate(medir, true);
  await d.page.screenshot({ path: join(out, 'source/screenshots/desktop-viewport.png') });
  await d.page.screenshot({ path: join(out, 'source/screenshots/desktop-full.png'), fullPage: true, clip: undefined }).catch(() => {});
  for (const g of desktop.componentes.botoes.slice(0, 2)) { try { const antes = await d.page.evaluate(s => { const e = document.querySelector(s), c = getComputedStyle(e); return [c.backgroundColor, c.color, c.transform, c.boxShadow, c.opacity]; }, g.sel); await d.page.hover(g.sel, { timeout: 2500 }); await d.page.waitForTimeout(350);
      const depois = await d.page.evaluate(s => { const e = document.querySelector(s), c = getComputedStyle(e); return [c.backgroundColor, c.color, c.transform, c.boxShadow, c.opacity]; }, g.sel); const nomes = ['fundo', 'cor', 'transform', 'sombra', 'opacidade'];
      hover.push({ exemplo: g.exemplo, mudancas: nomes.map((n, i) => antes[i] !== depois[i] ? `${n}: ${antes[i]} -> ${depois[i]}`.slice(0, 120) : null).filter(Boolean) }); } catch { /* sem hover medível */ } }
  const paradas = []; for (let i = 0; i < 10; i++) { await d.page.keyboard.press('Tab'); const f = await d.page.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; const s = getComputedStyle(e); return { tag: e.tagName.toLowerCase(), outline: `${s.outlineWidth} ${s.outlineStyle} ${s.outlineColor}`, offset: s.outlineOffset, sombra: s.boxShadow !== 'none' ? s.boxShadow.slice(0, 100) : 'nenhuma' }; }); if (f) { f.semIndicador = /^0px none/.test(f.outline) && f.sombra === 'nenhuma'; paradas.push(f); } }
  { const com = paradas.filter(x => !x.semIndicador), cont = new Map(); com.forEach(x => cont.set(x.outline + '|' + x.sombra + '|' + x.offset, (cont.get(x.outline + '|' + x.sombra + '|' + x.offset) || 0) + 1)); const mk = [...cont.entries()].sort((a, b) => b[1] - a[1])[0]; foco = mk ? { ...com.find(x => x.outline + '|' + x.sombra + '|' + x.offset === mk[0]), paradas: paradas.length, semIndicadorEm: paradas.length - com.length } : paradas.length ? { ...paradas[0], paradas: paradas.length, semIndicadorEm: paradas.length } : null; }
  await d.ctx.close();
  const t = await abrir(768, 1024, null); tablet = await t.page.evaluate(medir, false); await t.ctx.close();
  const p = await abrir(390, 844, null); phone = await p.page.evaluate(medir, false); await p.page.screenshot({ path: join(out, 'source/screenshots/mobile-viewport.png') }); await p.ctx.close();
  const k = await abrir(1440, 900, 'dark'); const dk = await k.page.evaluate(medir, true); dark = { fundo: dk.paginaFundo, texto: dk.cores.texto.slice(0, 3), difere: dk.paginaFundo !== desktop.paginaFundo }; await k.ctx.close();
} catch (e) { erro = String(e.message || e).split('\n')[0].slice(0, 200); }
await browser.close();
if (erro || !desktop) { console.error('Falha ao medir: ' + (erro || 'sem dados') + '\n(Site com bloqueio anti-robô, login obrigatório ou fora do ar? Não tente contornar: peça ao usuário um arquivo/HTML salvo ou capturas.)'); process.exit(5); }

// ---------- CSS do site: custom properties, @font-face, breakpoints ----------
const css = cssTextos.join('\n'); const props = new Map();
for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) { const sel = m[1].trim().split(/\s*,\s*/).pop(); if (!/^(:root|html|body|\.dark|\.light|\[data-theme[^\]]*\]|\[data-mode[^\]]*\])/.test(sel)) continue; for (const d of m[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+)/g)) { const k = `${sel} ${d[1]}`; if (props.size < 120 && !props.has(k)) props.set(k, d[2].trim().slice(0, 100)); } }
const faces = [...new Set([...css.matchAll(/@font-face\s*\{[^}]*font-family\s*:\s*["']?([^;"'}]+)/g)].map(m => m[1].trim()))].slice(0, 12);
const bp = new Map(); for (const m of css.matchAll(/@media[^{]*\((?:min|max)-width\s*:\s*([\d.]+)(px|em|rem)/g)) { const v = Math.round(parseFloat(m[1]) * (m[2] === 'px' ? 1 : 16)); bp.set(v, (bp.get(v) || 0) + 1); }
const breakpoints = [...bp.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([v, n]) => ({ px: v, usos: n }));

// ---------- escolhas de tokens ----------
const hx = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const lumH = h => { const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }; const [r, g, b] = hx(h); return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
const rz = (a, b) => { const x = lumH(a), y = lumH(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
const satH = h => { const [r, g, b] = hx(h).map(v => v / 255), mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2; return mx === mn ? 0 : (mx - mn) / (1 - Math.abs(2 * l - 1)); };
const mix = (a, b, t) => '#' + hx(a).map((v, i) => Math.round(v * (1 - t) + hx(b)[i] * t).toString(16).padStart(2, '0')).join('');
const bg = desktop.paginaFundo;
const sobre = desktop.cores.textoSobrePagina.map(x => x[0]); const legivel = (c, min) => c && /^#[0-9a-f]{6}$/i.test(c) && rz(c, bg) >= min;
const fg = [desktop.papeis.h1?.cor, desktop.papeis.h2?.cor, sobre[0], desktop.cores.texto[0]?.[0]].find(c => legivel(c, 3)) || (lumH(bg) > .5 ? '#111111' : '#f5f5f5');
const muted = [desktop.papeis.p?.cor, ...sobre].find(c => c && c !== fg && legivel(c, 4.5)) || mix(fg, bg, .35);
const cardBg = desktop.componentes.cards[0]?.bg?.startsWith('#') ? desktop.componentes.cards[0].bg.slice(0, 7) : null;
const surface = cardBg && cardBg !== bg ? cardBg : (desktop.cores.fundoPorArea.map(x => x[0]).find(c => c !== bg && satH(c) < .25) || bg);
const borda = desktop.cores.borda[0]?.[0] || mix(fg, bg, .85);
const candAcento = new Map(); const somar = (c, n) => { if (c && /^#[0-9a-f]{6}$/i.test(c) && satH(c) > .25) { const l = lumH(c); if (l > .02 && l < .9) candAcento.set(c, (candAcento.get(c) || 0) + n * satH(c)); } };
desktop.componentes.botoes.forEach(b => { somar(b.bg.slice(0, 7), b.ocorrencias * 3); somar(b.cor, 0); somar(b.borda.split(' ').pop(), b.ocorrencias); });
desktop.cores.fundoPorArea.forEach(([c, a]) => somar(c, 1)); desktop.cores.texto.forEach(([c, n]) => somar(c, n)); const ap = desktop.papeis['main a, article a, p a']; if (ap) somar(ap.cor, 4);
const acento = [...candAcento.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || fg; const acentoEstimado = !candAcento.size;
const acentoOn = rz(acento, '#ffffff') >= rz(acento, '#111111') ? '#ffffff' : '#111111';
const fam1 = f => f ? f.split(',').slice(0, 8).join(',').trim() : null;
const body = parseFloat(desktop.papeis.p?.tamanho) || 16; const obs = [...new Set(desktop.tamanhos.map(x => x[0]))].filter(Boolean).sort((a, b) => a - b);
const abaixo = (v, n) => obs.filter(x => x < v).slice(-n), acima = (v, n) => obs.filter(x => x > v).slice(0, n);
const sm = abaixo(body, 1)[0] || Math.round(body * .875), xs = abaixo(sm, 1)[0] || Math.round(sm * .86);
const up = acima(body, 3); const h1 = desktop.papeis.h1?.tamanho || obs[obs.length - 1] || body * 2; const lg = up[0] || Math.round(body * 1.25), xl = up[1] || Math.round(lg * 1.2), x2 = Math.max(up[2] || 0, Math.round(xl * 1.2)); const x3 = Math.max(h1, x2 + 1), x4 = Math.max(obs[obs.length - 1] || 0, Math.round(x3 * 1.15));
const raiosTodos = desktop.raios.filter(([r]) => /px$/.test(r)); const raiosRep = raiosTodos.filter(([, n]) => n >= 2); const raiosPx = (raiosRep.length >= 2 ? raiosRep : raiosTodos).map(([r]) => parseFloat(r)).filter(r => r < 200).sort((a, b) => a - b); const temPill = desktop.raios.some(([r]) => r === '50%' || parseFloat(r) >= 200);
const pickR = i => raiosPx.length ? raiosPx[Math.min(i, raiosPx.length - 1)] : null;
const dur = desktop.transicoesMs.map(x => x[0]).sort((a, b) => a - b); const durPond = desktop.transicoesMs.flatMap(([ms, n]) => Array(n).fill(ms)).sort((a, b) => a - b);
const secY = v => { const x = v?.container?.secaoPaddingTop?.[0]?.[0]; return x ? Math.round(x) : null; };
const gut = v => v?.container?.blocoSimetrico?.esquerda ?? v?.container?.margemEsquerdaTexto ?? null;
const cmax = desktop.container.blocoSimetrico?.largura || desktop.container.maxWidths.map(x => x[0]).filter(x => x >= 900)[0] || null;
const estim = []; const E = (nome, valor, medido) => { if (!medido) estim.push(nome); return valor; };
if (!cardBg) estim.push('--surface'); if (!desktop.cores.borda[0]) estim.push('--border'); if (acentoEstimado) estim.push('--accent');
const tok = {
  '--bg': bg, '--surface': surface, '--fg': fg, '--muted': muted, '--border': borda, '--accent': acento,
  '--font-display': fam1(desktop.papeis.h1?.familia) || fam1(desktop.fontes[0]?.[0]) || 'system-ui, sans-serif', '--font-body': fam1(desktop.papeis.p?.familia) || fam1(desktop.fontes[0]?.[0]) || 'system-ui, sans-serif',
  '--text-xs': xs + 'px', '--text-sm': sm + 'px', '--text-base': body + 'px', '--text-lg': lg + 'px', '--text-xl': xl + 'px', '--text-2xl': x2 + 'px', '--text-3xl': x3 + 'px', '--text-4xl': x4 + 'px',
  '--leading-body': String(desktop.papeis.p?.entrelinha === 'normal' || !desktop.papeis.p ? 1.5 : desktop.papeis.p.entrelinha), '--leading-tight': String(desktop.papeis.h1?.entrelinha && desktop.papeis.h1.entrelinha !== 'normal' ? desktop.papeis.h1.entrelinha : 1.15), '--tracking-display': (desktop.papeis.h1?.trackingEm || 0) + 'em',
  '--section-y-desktop': E('--section-y-desktop', (secY(desktop) || 96) + 'px', !!secY(desktop)), '--section-y-tablet': E('--section-y-tablet', (secY(tablet) || secY(desktop) || 64) + 'px', !!secY(tablet)), '--section-y-phone': E('--section-y-phone', (secY(phone) || secY(tablet) || 48) + 'px', !!secY(phone)),
  '--container-max': E('--container-max', (cmax || 1200) + 'px', !!cmax), '--container-gutter-desktop': E('--container-gutter-desktop', (gut(desktop) ?? 32) + 'px', gut(desktop) !== null), '--container-gutter-tablet': E('--container-gutter-tablet', (gut(tablet) ?? 24) + 'px', gut(tablet) !== null), '--container-gutter-phone': E('--container-gutter-phone', (gut(phone) ?? 16) + 'px', gut(phone) !== null),
  '--accent-on': acentoOn,
};
if (desktop.papeis['code, pre']) tok['--font-mono'] = fam1(desktop.papeis['code, pre'].familia);
if (pickR(0) !== null) { tok['--radius-sm'] = pickR(0) + 'px'; tok['--radius-md'] = pickR(Math.floor(raiosPx.length / 2)) + 'px'; tok['--radius-lg'] = pickR(raiosPx.length - 1) + 'px'; } if (temPill) tok['--radius-pill'] = '9999px';
if (desktop.sombras[0]) tok['--elev-raised'] = desktop.sombras[0][0];
if (foco && !foco.semIndicador) tok['--focus-ring'] = foco.sombra !== 'nenhuma' ? foco.sombra : `${foco.outline.split(' ')[0]} solid ${foco.outline.split(' ').slice(2).join(' ')}`;
if (dur.length) { tok['--motion-fast'] = dur[0] + 'ms'; tok['--motion-base'] = (durPond[Math.floor(durPond.length / 2)] || dur[0]) + 'ms'; } if (desktop.easings[0]) tok['--ease-standard'] = desktop.easings[0][0];
const gerado = new Date().toISOString();
const tokensCss = `/* ${slug}/tokens.css — GERADO por power-design/extrair-design.mjs em ${gerado}\n * Fonte: ${ehUrl ? alvo : 'arquivo local'} (medição de estilos calculados; ver source/evidence.md).\n * Tokens marcados [estimado] em DESIGN.md não foram medidos. Revise antes de usar. */\n:root {\n${Object.entries(tok).map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}\n`;

// ---------- DESIGN.md ----------
const tab = (cab, linhas) => `| ${cab.join(' | ')} |\n|${cab.map(() => '---').join('|')}|\n${linhas.map(l => `| ${l.join(' | ')} |`).join('\n')}`;
const papelLinhas = Object.entries(desktop.papeis).map(([k, v]) => [`\`${k}\``, `\`${v.familia.slice(0, 40)}\``, v.tamanho + 'px', v.peso, v.entrelinha, v.trackingEm + 'em', v.cor || '-', v.caixa]);
const classeFonte = f => /mono|code|courier/i.test(f) ? 'monoespaçada' : /serif|georgia|times|garamond|palatino|baskerville|playfair|lora|merri/i.test(f.replace(/sans-serif/gi, '')) ? 'serifada' : 'sem serifa';
const comp = desktop.componentes; const lado = (g) => g.map(x => [x.exemplo ? `"${x.exemplo}"` : '-', x.ocorrencias, x.bg, x.cor || '-', x.raio, x.padding, x.fonte, x.caixa, x.borda, x.sombra === 'nenhuma' ? '-' : 'sim']);
const md = `# Design System Extraído de ${nome}

> Category: Extraído de site
> Gerado por power-design/extrair-design.mjs em ${gerado}. Fonte: ${ehUrl ? alvo : 'arquivo local'}. **Valores medidos no navegador (estilos calculados); o que não foi medido está marcado [estimado].** As seções 1 e 7 pedem julgamento: o agente as completa **depois de olhar** \`source/screenshots/\`.
> Direitos: marca, logotipo, texto e imagens do site são de seus titulares. Este documento descreve linguagem visual para **estudo ou para o produto do próprio usuário**; não copie identidade de terceiros.

## 1. Visual Theme & Atmosphere

[AGENTE: 3 a 5 frases sobre atmosfera, depois de olhar as capturas desktop e mobile. Não invente nada que as capturas e os dados abaixo não sustentem.]

Fatos medidos que sustentam o texto:
- Fundo da página ${bg} (${lumH(bg) > .5 ? 'claro' : 'escuro'}); tema escuro ${dark?.difere ? `**diferente** (fundo ${dark.fundo})` : 'sem variação detectada em prefers-color-scheme'}.
- Famílias dominantes: ${desktop.fontes.slice(0, 3).map(f => `${fam1(f[0])} (${classeFonte(f[0])})`).join('; ')}.
- Raios: ${desktop.raios.slice(0, 4).map(r => r[0]).join(', ') || 'nenhum'}; sombras: ${desktop.sombras.length ? desktop.sombras.length + ' variações' : 'nenhuma'}; animações CSS em ${desktop.animados} elementos; transições em ${desktop.transicoesMs.length ? desktop.transicoesMs.map(x => x[0] + 'ms').join(', ') : 'nenhuma'}.
- Unidade de espaçamento: ${desktop.unidadeBase.unidade ? desktop.unidadeBase.unidade + 'px (aderência ' + desktop.unidadeBase.aderencia + ')' : 'irregular (aderência 4px/8px ' + desktop.unidadeBase.aderencia + ')'}.

## 2. Color Palette & Roles

Tokens escolhidos (heurística; revise):
${tab(['Token', 'Valor', 'Como foi escolhido'], [['`--bg`', bg, 'fundo efetivo de body/html [medido]'], ['`--surface`', surface, cardBg ? 'fundo do card mais frequente [medido]' : 'fundo mais frequente ≠ página, pouco saturado [estimado]'], ['`--fg`', fg, 'cor de h1/h2 ou texto mais frequente [medido]'], ['`--muted`', muted, 'cor de parágrafo ou de texto sobre o fundo da página, ≠ fg e com contraste ≥ 4,5 [medido]'], ['`--border`', borda, desktop.cores.borda[0] ? 'borda mais frequente [medido]' : 'mistura 15% de fg [estimado]'], ['`--accent`', acento, acentoEstimado ? 'nenhum candidato saturado; usei fg [estimado]' : 'cor saturada mais ponderada (botões ×3, links, fundos) [medido]'], ['`--accent-on`', acentoOn, 'melhor contraste sobre o acento [calculado]']])}

Cores de texto (por nº de elementos): ${desktop.cores.texto.map(([c, n]) => `${c} ×${n}`).join(', ')}.
Fundos (por área): ${desktop.cores.fundoPorArea.map(([c, n]) => `${c} (${Math.round(n / 1000)}k px²)`).join(', ')}.
Bordas: ${desktop.cores.borda.map(([c, n]) => `${c} ×${n}`).join(', ') || 'nenhuma'}.
${props.size || desktop.customPropsDom.length ? `\nCustom properties declaradas no site (até 40):\n${[...props.entries()].slice(0, 40).map(([k, v]) => `- \`${k}\`: ${v}`).join('\n')}\n` : '\nO site não declara custom properties legíveis em :root.\n'}
Contraste do próprio site (texto sobre fundo opaco mais próximo; gradientes e imagens ignorados): ${desktop.contraste.falhas} de ${desktop.contraste.amostras} amostras abaixo de WCAG AA. ${desktop.contraste.piores.map(([p, n]) => `${p} ×${n}`).join('; ')}
${dark ? `\nTema escuro (prefers-color-scheme: dark): ${dark.difere ? `fundo ${dark.fundo}; textos ${dark.texto.map(t => t[0]).join(', ')}` : 'idêntico ao claro'}.` : ''}

## 3. Typography Rules

Famílias (por nº de elementos de texto): ${desktop.fontes.map(([f, n]) => `\`${f.slice(0, 80)}\` ×${n}`).join('; ')}.
Origem das fontes: ${faces.length ? '@font-face: ' + faces.join(', ') + '. ' : ''}${hostsFonte.size ? 'arquivos de fonte vindos de ' + [...hostsFonte].join(', ') + '.' : 'nenhuma requisição de arquivo de fonte (provável pilha de sistema).'}${[...hostsCss, ...hostsFonte].some(h => /googleapis|gstatic|typekit|fonts\./.test(h)) ? ' **Há fonte de terceiros (CDN): ao implementar, auto-hospede (privacidade).**' : ''}

${tab(['Papel', 'Família', 'Tamanho', 'Peso', 'Entrelinha', 'Tracking', 'Cor', 'Caixa'], papelLinhas)}

Escala observada (px × elementos): ${desktop.tamanhos.map(([t, n]) => `${t}×${n}`).join(', ')}. Pesos: ${desktop.pesos.map(([p, n]) => `${p}×${n}`).join(', ')}.
Tokens: \`--text-xs\` ${xs}px, \`--text-sm\` ${sm}px, \`--text-base\` ${body}px, \`--text-lg\` ${lg}px, \`--text-xl\` ${xl}px, \`--text-2xl\` ${x2}px, \`--text-3xl\` ${x3}px, \`--text-4xl\` ${x4}px (mapeamento da escala observada; degraus ausentes foram [estimados]).

## 4. Component Stylings

**Botões** (agrupados por estilo idêntico):
${comp.botoes.length ? tab(['Exemplo', 'Qtd', 'Fundo', 'Cor', 'Raio', 'Padding', 'Fonte', 'Caixa', 'Borda', 'Sombra'], lado(comp.botoes)) : 'Nenhum botão identificado.'}
${hover.length ? '\nHover medido: ' + hover.map(h => `"${h.exemplo}": ${h.mudancas.join('; ') || 'sem mudança medível'}`).join(' | ') : '\nHover: não medido.'}
${foco ? `Foco por teclado (${foco.paradas} paradas com Tab, ${foco.semIndicadorEm} sem indicador): ${foco.semIndicador ? '**sem indicador visível** no primeiro elemento focado (falha de acessibilidade do site; a implementação deve corrigir)' : `outline ${foco.outline}, offset ${foco.offset}, sombra ${foco.sombra}`}.` : 'Foco: nenhum elemento focável por Tab.'}

**Campos:** ${comp.campos.length ? '\n' + tab(['Exemplo', 'Qtd', 'Fundo', 'Cor', 'Raio', 'Padding', 'Fonte', 'Caixa', 'Borda', 'Sombra'], lado(comp.campos)) : 'nenhum campo identificado.'}

**Cards:** ${comp.cards.length ? '\n' + tab(['Exemplo', 'Qtd', 'Fundo', 'Cor', 'Raio', 'Padding', 'Fonte', 'Caixa', 'Borda', 'Sombra'], lado(comp.cards)) : 'nenhum card identificado pela heurística (raio ≥4px, borda/sombra e título).'}

**Navegação:** ${desktop.nav ? `altura ${desktop.nav.altura}px, fundo ${desktop.nav.fundo}, ${desktop.nav.fixa ? 'fixa' : 'rola com a página'}` : 'não identificada'}.

## 5. Layout Principles

- Unidade de espaçamento: ${desktop.unidadeBase.unidade ? desktop.unidadeBase.unidade + 'px' : 'irregular'}; valores mais usados (px × ocorrências): ${desktop.espacamento.map(([v, n]) => `${v}×${n}`).join(', ')}.
- Largura máxima de contêiner: ${cmax ? cmax + 'px [medido]' : '[estimado] 1200px'}. Margem lateral até o contêiner/texto (inclui a centralização; não é o gap do CSS): desktop ${gut(desktop) ?? '?'}px, tablet ${gut(tablet) ?? '?'}px, celular ${gut(phone) ?? '?'}px [medido por menor posição de texto; aproximação].
- Padding vertical de seção: desktop ${secY(desktop) ?? '?'}px, tablet ${secY(tablet) ?? '?'}px, celular ${secY(phone) ?? '?'}px.

## 6. Depth & Elevation

- Raios (px × elementos): ${desktop.raios.map(([r, n]) => `${r}×${n}`).join(', ') || 'nenhum (cantos retos)'}.
- Sombras mais usadas: ${desktop.sombras.length ? '\n' + desktop.sombras.map(([s, n]) => `  - \`${s.slice(0, 120)}\` ×${n}`).join('\n') : 'nenhuma (elevação por borda ou tom).'}
- Movimento: transições ${desktop.transicoesMs.map(x => x[0] + 'ms×' + x[1]).join(', ') || 'nenhuma'}; easing ${desktop.easings.map(x => x[0]).join(' | ') || '-'}.

## 7. Do's and Don'ts

[AGENTE: 4 a 8 regras prescritivas que definem esta identidade, depois de olhar as capturas.]

Derivadas dos números [derivado, revise]:
- Use \`--accent\` ${acento} só onde o site o usa (botões, links); não crie um segundo acento.
- Raio dominante ${desktop.raios[0]?.[0] || '0px'}: não misture com outro formato de canto.
- Entrelinha de corpo ${desktop.papeis.p?.entrelinha ?? '?'} e de título ${desktop.papeis.h1?.entrelinha ?? '?'}.
${desktop.contraste.falhas ? `- **Não copie** os pares de baixo contraste do site (${desktop.contraste.falhas} falhas AA): a implementação deve atingir 4,5:1 no texto normal.` : ''}

## 8. Responsive Behavior

Breakpoints declarados no CSS (px × usos): ${breakpoints.map(b => `${b.px}×${b.usos}`).join(', ') || 'nenhum encontrado (CSS de outra origem não legível ou layout fluido)'}.
Medido em 3 larguras: 1440 (${desktop.elementos} elementos visíveis), 768 (${tablet.elementos}), 390 (${phone.elementos}). Capturas: \`source/screenshots/mobile-viewport.png\`.

## 9. Agent Prompt Guide

Cole o bloco \`:root\` de \`tokens.css\` na primeira \`<style>\` e use só \`var(--token)\`. Resumo: fundo \`${bg}\`, texto \`${fg}\`, apoio \`${muted}\`, acento \`${acento}\`, borda \`${borda}\`; título ${tok['--font-display'].split(',').slice(0, 2).join(',')}, corpo ${tok['--font-body'].split(',').slice(0, 2).join(',')}; raio ${tok['--radius-md'] || 'sem raio medido'}; espaço base ${desktop.unidadeBase.unidade ? desktop.unidadeBase.unidade + 'px' : 'irregular'}.
Prompt-modelo: "Construa <página> usando o design system em \`tokens.css\` e \`DESIGN.md\`. Mantenha fundo, tipografia, raio e espaçamento medidos; contraste ≥ 4,5:1; foco visível; sem CDN."
`;
writeFileSync(join(out, 'DESIGN.md'), md); writeFileSync(join(out, 'tokens.css'), tokensCss);
writeFileSync(join(out, 'USAGE.md'), `# ${nome} — Usage\n\n## Read Order\n1. \`DESIGN.md\` (prosa; seções 1 e 7 foram completadas por um agente após olhar as capturas).\n2. \`tokens.css\` (tokens no contrato do Open Design; cole o bloco :root).\n3. \`source/evidence.md\` e \`source/tokens.source.json\` (medições brutas).\n\n## Avoid\n- Copiar logotipo, nome, texto ou imagens do site de origem.\n- Tratar valores [estimado] como medidos.\n`);
writeFileSync(join(out, 'manifest.json'), JSON.stringify({ schemaVersion: 'od-design-system-project/v1', id: slug, name: nome, category: 'Extraído de site', description: `Design system extraído por medição de ${ehUrl ? alvo : 'arquivo local'} em ${gerado.slice(0, 10)}.`, source: { type: 'local', path: out, importedAt: gerado }, files: { design: 'DESIGN.md', tokens: 'tokens.css' }, usage: 'USAGE.md', importMode: 'normalized', sourceFiles: { evidence: 'source/evidence.md', tokens: 'source/tokens.source.json' } }, null, 2) + '\n');
const evidencia = { alvo: ehUrl ? alvo : 'arquivo local', geradoEm: gerado, desktop, tablet, phone, dark, hover, foco, customPropsCss: [...props.entries()], fontFace: faces, hostsCss: [...hostsCss], hostsFonte: [...hostsFonte], breakpoints, bloqueadosRedePrivada: [...bloqueados], tokensEstimados: estim, tokens: tok };
writeFileSync(join(out, 'source/tokens.source.json'), JSON.stringify(evidencia, null, 1));
writeFileSync(join(out, 'source/evidence.md'), `# Evidência de extração\n\n- Alvo: ${evidencia.alvo}\n- Gerado em: ${gerado}\n- Elementos visíveis medidos: ${desktop.elementos} (limite 6000)\n- Tokens estimados (não medidos): ${estim.join(', ') || 'nenhum'}\n- Requisições a rede privada bloqueadas: ${[...bloqueados].join(', ') || 'nenhuma'}\n- Limitações: fundo efetivo ignora gradientes/imagens; CSS de outra origem pode não ser legível; estados além de hover/foco não medidos; site pode servir conteúdo diferente a robôs.\n`);
console.log(`OK ${out}\n  DESIGN.md (seções 1 e 7 pendentes de julgamento do agente), tokens.css (${Object.keys(tok).length} tokens), manifest.json, USAGE.md, source/`);
console.log(`  Tokens estimados (não medidos): ${estim.join(', ') || 'nenhum'}`);
console.log(`  Próximo passo: olhar source/screenshots/*.png, completar seções 1 e 7, e validar com: node --experimental-strip-types scripts/validar-open-design.mjs ${out}`);
