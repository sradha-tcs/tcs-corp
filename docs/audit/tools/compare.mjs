// Published (aem.page: real AEM delivery + main code) vs local preview (renderer): for each
// block of each page, its status and a content signature (text length, links, images, iframes,
// controls, headings, table rows). Prints the blocks that differ.
//   node compare.mjs <listfile: folder/page per line>
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire('/home/node/.npm/_npx/520e866687cefe78/node_modules/');
const { chromium } = require('playwright');

const list = readFileSync(process.argv[2], 'utf8').split('\n').filter(Boolean);
const LIVE = process.env.LIVE || 'https://main--tcs-corp--sradha-tcs.aem.page/language-master/en/block-library/';
const LOCAL = process.env.LOCAL || 'http://localhost:3000/drafts/en/block-library/';
const browser = await chromium.launch({ executablePath: '/ms-playwright/chromium-1208/chrome-linux64/chrome' });

async function signature(url) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message.slice(0, 160)));
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 45000 });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } });
    await page.waitForTimeout(2000);
    const blocks = await page.evaluate(() => [...document.querySelectorAll('main .block')].map((b) => {
      const q = (s) => b.querySelectorAll(s).length;
      return {
        name: b.dataset.blockName || b.classList[0], status: b.dataset.blockStatus,
        sig: `t${Math.round(b.innerText.trim().length / 20)} a${q('a[href]')} img${q('img')} if${q('iframe')} ctl${q('input,select,textarea,button')} h${q('h1,h2,h3,h4,h5,h6')} tr${q('tr')}`,
        text: b.innerText.trim().slice(0, 70).replace(/\s+/g, ' '),
      };
    }));
    return { blocks, errors };
  } catch (e) {
    return { blocks: [], errors: [String(e.message).slice(0, 160)] };
  } finally { await page.close(); }
}

const out = [];
for (const p of list) {
  // eslint-disable-next-line no-await-in-loop
  const [live, local] = await Promise.all([signature(LIVE + p), signature(LOCAL + p)]);
  const n = Math.max(live.blocks.length, local.blocks.length);
  const diffs = [];
  for (let i = 0; i < n; i += 1) {
    const a = live.blocks[i]; const b = local.blocks[i];
    if (!a || !b || a.name !== b.name || a.sig !== b.sig) diffs.push({ i, live: a, local: b });
  }
  out.push({ page: p, live: live.blocks.length, local: local.blocks.length, liveErrors: live.errors, localErrors: local.errors, diffs });
  console.log(`${p}: live ${live.blocks.length} local ${local.blocks.length} diffs ${diffs.length}${live.errors.length ? ` LIVE-ERR ${live.errors[0]}` : ''}`);
  diffs.slice(0, 4).forEach((d) => console.log(`   #${d.i} ${d.live?.name}:${d.live?.sig} | ${d.local?.name}:${d.local?.sig}  «${d.live?.text}» vs «${d.local?.text}»`));
}
writeFileSync(`/tmp/audit/compare-${Date.now()}.json`, JSON.stringify(out, null, 1));
await browser.close();
