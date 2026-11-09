// Retries the failed paths of a publish-fix.mjs step one request at a time (the author times out under a
// bulk job's parallel fetches), up to 3 tries each; updates the step's failed list in publish-fix-state.json.
// Usage: node retry-one-by-one.mjs <preview|live>
import { readFileSync, writeFileSync } from 'node:fs';

const ADMIN = 'https://admin.hlx.page';
const S = 'sradha-tcs/tcs-corp/main';
const STATE = new URL(process.env.STATE || './publish-fix-state.json', import.meta.url).pathname;
const state = JSON.parse(readFileSync(STATE, 'utf8'));
const step = process.argv[2];
const job = state.jobs[step];
const still = [];
for (const f of job.failed) {
  let res;
  for (let t = 0; t < 3; t += 1) {
    const r = await fetch(`${ADMIN}/${step}/${S}${f.path}`, { method: 'POST' });
    res = { path: f.path, status: r.status, error: r.headers.get('x-error') };
    if (r.ok) break;
    await new Promise((ok) => { setTimeout(ok, 3000); });
  }
  if (res.status >= 300) still.push(res);
  job.failed = [...still, ...job.failed.slice(job.failed.indexOf(f) + 1)];
  writeFileSync(STATE, JSON.stringify(state, null, 1));
}
console.log(step, 'still failing', still.length, JSON.stringify(still.slice(0, 8)));
