"""Plan of the fix package for the /language-masters/en pages that could not be published (9 November 2026):
1. renames: every migrated page whose path has a segment Edge Delivery can't address (capital letters, _,
   --, a leading or trailing -) gets the normalised name (lower case, [a-z0-9-], single hyphens), its children
   with it; collisions with an existing page are reported;
2. images: SVG files over the 40 KB Edge Delivery limit referenced by the pages that failed become PNG;
3. references: every migrated page linking to a renamed page (its AEM path, with or without .html).
Writes fix-unpublished-plan.json. Usage: python3 -I fix-unpublished-plan.py"""
import csv
import glob
import json
import re
import zipfile

EMA = '/backups/sradha-tcs/tcs-corp/repo/.home-work/migration/ema/'
PKG = EMA + 'consolidated/packages/'
ROOT = '/content/tcs-corp/language-masters/en'
roots = [l.strip() for l in open('/tmp/lm-roots.txt') if l.strip()]
rows = list(csv.DictReader(open('/tmp/np/NOT-PUBLISHED-LANGUAGE-MASTERS-2026-11-08.csv')))
failing = {r['author path'] for r in rows}
norm = lambda seg: re.sub(r'-+', '-', re.sub(r'[^a-z0-9]', '-', seg.lower())).strip('-')


def fixed(path):
    rel = path[len(ROOT):]
    return ROOT + '/'.join(norm(s) if s else s for s in rel.split('/'))


# the failing pages with a name Edge Delivery can't address, and the pages below them (they move with them);
# other paths (e.g. a published child of a folder with a capital letter) stay as they are
bad = {p for p in failing if fixed(p) != p}
renames = {p: fixed(p) for p in roots if p in bad or any(p.startswith(f'{b}/') for b in bad)}
existing = set(roots)
collisions = {o: n for o, n in renames.items() if n in existing and n != o}
# page XML of every migrated page (from the 1.3.0 page packages) and its package
xml_of, pkg_of = {}, {}
for z in sorted(glob.glob(PKG + '*-1.3.0.zip')):
    if '-assets-' in z:
        continue
    with zipfile.ZipFile(z) as zf:
        for n in zf.namelist():
            if n.endswith('/.content.xml') and n.startswith('jcr_root' + ROOT):
                p = n[len('jcr_root'):-len('/.content.xml')]
                if p in existing:
                    xml_of[p] = zf.read(n).decode('utf-8')
                    pkg_of[p] = z.rsplit('/', 1)[-1]
# images over 40 KB in the failing pages
exp = {r['path']: r for r in csv.DictReader(open(EMA + 'consolidated/tools/expected-assets.csv'))}
earlier = {r['path']: r for r in csv.DictReader(open(EMA + 'packages-earlier-run-assets/ASSETS.csv'))}


def asset_size(ref):
    if ref in exp:
        z, name = PKG + exp[ref]['package'], f'jcr_root{ref}/_jcr_content/renditions/original'
    elif ref in earlier:
        z, name = EMA + 'packages-earlier-run-assets/' + earlier[ref]['package'], f'jcr_root{ref}/_jcr_content/renditions/original'
    else:
        return None, None
    try:
        with zipfile.ZipFile(z) as zf:
            return zf.getinfo(name).file_size, z
    except KeyError:
        return None, z


svgs = {}
for p in failing:
    s = xml_of.get(p, '')
    for ref in set(re.findall(r'(/content/dam/[^"&#?\s]+\.svg)', s, re.I)):
        size, z = asset_size(ref)
        if size and size > 40 * 1024:
            svgs[ref] = {'size': size, 'package': z, 'png': re.sub(r'\.svg$', '.png', ref, flags=re.I), 'pages': svgs.get(ref, {}).get('pages', []) + [p]}
# reference pages: links to the AEM path of a renamed page
pattern = re.compile('|'.join(re.escape(o) for o in sorted(renames, key=len, reverse=True)) + r'(?=[".#?/&]|\.html)') if renames else None
refpages = {}
for p, s in xml_of.items():
    if p in renames:
        continue
    hits = set(m.group(0) for m in pattern.finditer(s)) if pattern else set()
    if hits:
        refpages[p] = sorted(hits)
plan = {
    'renames': renames, 'collisions': collisions, 'svgs': svgs, 'referencePages': refpages,
    'failingWithoutFix': sorted(p for p in failing if p not in renames and not any(p in v['pages'] for v in svgs.values())),
    'pkgOf': {p: pkg_of[p] for p in set(renames) | set(refpages) | failing if p in pkg_of},
}
json.dump(plan, open('/backups/sradha-tcs/tcs-corp/repo/.home-work/migration/program/fix-unpublished-plan.json', 'w'), indent=1)
print('renames', len(renames), '| collisions', len(collisions), '| svgs over 40 KB', len(svgs), f"({sum(v['size'] for v in svgs.values()) / 1048576:.1f} MB)", '| reference pages', len(refpages), '| failing pages without a fix', len(plan['failingWithoutFix']))
print('collisions:', list(collisions.items())[:5])
print('without fix:', plan['failingWithoutFix'][:10])
