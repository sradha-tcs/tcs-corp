// SVG files over the 40 KB Edge Delivery limit rendered as PNG (Chromium): the natural size of the SVG,
// scaled up to at least 1,600 px wide (at most 2x, at most 3,000 px), transparent background.
// Usage: node svg-to-png.mjs <plan json> <svg dir> <png dir>
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const [planFile, svgDir, pngDir] = process.argv.slice(2);
const plan = JSON.parse(readFileSync(planFile, 'utf8'));
mkdirSync(svgDir, { recursive: true }); mkdirSync(pngDir, { recursive: true });
const FONT_DIR = process.env.SVG_FONTS || '/tmp/svg-fix/fonts';
const fonts = {};
const font = (file) => { fonts[file] ||= readFileSync(join(FONT_DIR, file)).toString('base64'); return fonts[file]; };
// [family in the SVGs, open font file, weight, style]
const FACES = [];
['Calibri', 'Calibri_MSFontService'].forEach((f) => FACES.push(
  [f, 'Carlito-Regular.ttf', 400, 'normal'], [f, 'Carlito-Bold.ttf', 700, 'normal'],
  [f, 'Carlito-Italic.ttf', 400, 'italic'], [f, 'Carlito-BoldItalic.ttf', 700, 'italic'],
));
FACES.push(
  ['Calibri-Bold', 'Carlito-Bold.ttf', '100 900', 'normal'], ['Calibri-BoldItalic', 'Carlito-BoldItalic.ttf', '100 900', 'normal'],
  ['Calibri-Italic', 'Carlito-Italic.ttf', '100 900', 'normal'], ['Calibri-LightItalic', 'Carlito-Italic.ttf', '100 900', 'normal'],
  ['Calibri-Light', 'Carlito-Regular.ttf', '100 900', 'normal'],
);
['Arial', 'ArialMT', 'Arial_MSFontService'].forEach((f) => FACES.push(
  [f, 'LiberationSans-Regular.ttf', 400, 'normal'], [f, 'LiberationSans-Bold.ttf', 700, 'normal'],
  [f, 'LiberationSans-Italic.ttf', 400, 'italic'], [f, 'LiberationSans-BoldItalic.ttf', 700, 'italic'],
));
const browser = await chromium.launch();
const report = [];
for (const [ref, v] of Object.entries(plan.svgs)) {
  const name = ref.replace(/^\/content\/dam\//, '').replace(/\//g, '__');
  const svg = join(svgDir, name);
  if (!existsSync(svg)) writeFileSync(svg, execFileSync('unzip', ['-p', v.package, `jcr_root${ref}/_jcr_content/renditions/original`], { maxBuffer: 64 * 1024 * 1024 }));
  const png = join(pngDir, name.replace(/\.svg$/i, '.png'));
  const page = await browser.newPage({ viewport: { width: 3200, height: 3200 } });
  // the SVGs set Calibri / Arial (Office exports, text positioned glyph by glyph), which aren't installed:
  // the render copy defines those family names with the metric-compatible open fonts (Carlito, Liberation
  // Sans, embedded as data URLs: an SVG image loads nothing else), so the text keeps its positions
  let text = readFileSync(svg, 'utf8');
  const faces = FACES.filter(([family]) => new RegExp(`['",:\\s]${family}['",;\\s}]`).test(text))
    .map(([family, file, weight, style]) => `@font-face{font-family:'${family}';src:url(data:font/ttf;base64,${font(file)});font-weight:${weight};font-style:${style}}`);
  if (faces.length) text = text.replace(/<svg\b[^>]*>/, (tag) => `${tag}<style>${faces.join('')}</style>`);
  const render = `${svg}.render.svg`;
  writeFileSync(render, text);
  const html = `${svg}.html`;
  writeFileSync(html, `<html><body style="margin:0;background:transparent"><img id="i" src="./${name}.render.svg"></body></html>`);
  await page.goto(`file://${html}`);
  await page.waitForFunction(() => document.getElementById('i').complete, null, { timeout: 30000 });
  const nat = await page.evaluate(() => { const i = document.getElementById('i'); return { w: i.naturalWidth || 0, h: i.naturalHeight || 0 }; });
  let w = nat.w || 1200; let h = nat.h || 800;
  const scale = Math.min(2, Math.max(1, 1600 / w), 3000 / w);
  w = Math.round(w * scale); h = Math.round(h * scale);
  await page.setViewportSize({ width: Math.max(w, 1), height: Math.max(h, 1) });
  await page.evaluate(([ww, hh]) => { const i = document.getElementById('i'); i.style.width = `${ww}px`; i.style.height = `${hh}px`; i.style.display = 'block'; }, [w, h]);
  await page.locator('#i').screenshot({ path: png, omitBackground: true });
  await page.close();
  report.push({ ref, png: v.png, svgBytes: v.size, pngBytes: readFileSync(png).length, width: w, height: h, natural: nat });
}
await browser.close();
writeFileSync(join(pngDir, 'report.json'), JSON.stringify(report, null, 1));
console.log(report.length, 'PNG', `${(report.reduce((n, r) => n + r.pngBytes, 0) / 1048576).toFixed(1)} MB`, 'max', Math.max(...report.map((r) => r.pngBytes)), 'no natural size', report.filter((r) => !r.natural.w).length);
