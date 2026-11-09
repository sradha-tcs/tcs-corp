"""Builds the fix package for the /language-masters/en pages that could not be published (9 November 2026),
from fix-unpublished-plan.json and the PNGs of svg-to-png.mjs:
- tcs-corp-ema-fix-unpublished-1.0.0.zip: the renamed pages at their Edge Delivery-safe paths (the old nodes
  stay), the pages with an SVG over 40 KB with the PNG instead, the pages linking to a renamed page with the
  new links, and the PNG assets. Each page has its own filter (the page and its content only).
- tcs-corp-ema-fix-unpublished-cleanup-1.0.0.zip: removes the old wrong-named pages (install after checking).
- metadata.csv / redirects.csv with the renamed pages' published paths, and FIX-REPORT.md.
Usage: python3 -I build-fix-package.py <png dir> <out dir>"""
import csv
import io
import json
import os
import re
import sys
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
EMA = os.path.join(HERE, '..', 'ema') + '/'
PKG = EMA + 'consolidated/packages/'
SHEETS = EMA + 'consolidated/sheets/'
ROOT = '/content/tcs-corp/language-masters/en'
PUB = '/language-masters/en'
png_dir, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
plan = json.load(open(os.path.join(HERE, 'fix-unpublished-plan.json')))
renames, svgs, refpages, pkg_of = plan['renames'], plan['svgs'], plan['referencePages'], plan['pkgOf']
report = {r['ref']: r for r in json.load(open(os.path.join(png_dir, 'report.json')))}
live = {l.strip() for l in open('/tmp/pub-lms.txt') if l.strip()}
pub = lambda p: PUB + p[len(ROOT):]
# Edge Delivery lower-cases only a page's own name, so children of a folder with capital letters are live at
# their old URL; they move with the folder (their old URL stays live until it is unpublished)
moved_live = sorted(pub(o) for o in renames if pub(o) in live)

# links to a renamed page, as its AEM path or its published path (with .html, a query, an anchor or a child)
rel = {o[len(ROOT):]: n[len(ROOT):] for o, n in renames.items()}
LINK = re.compile(r'(/content/tcs-corp)?' + re.escape(PUB) + '(' + '|'.join(re.escape(r) for r in sorted(rel, key=len, reverse=True)) + r')(?=[".#?/&<\'\s]|\.html|$)')
SVG = re.compile('|'.join(re.escape(s) for s in sorted(svgs, key=len, reverse=True)))


def fix(xml):
    xml, links = LINK.subn(lambda m: (m.group(1) or '') + PUB + rel[m.group(2)], xml)
    xml, images = SVG.subn(lambda m: svgs[m.group(0)]['png'], xml)
    return xml, links, images


pages = sorted(set(renames) | set(refpages) | {p for v in svgs.values() for p in v['pages']})
zips = {}


def source(z):
    if z not in zips:
        zips[z] = zipfile.ZipFile(z if z.startswith('/') else PKG + z)
    return zips[z]


def write_pkg(name, description, entries, filters):
    props = f'''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
<comment>FileVault Package Properties</comment>
<entry key="name">{name}</entry>
<entry key="group">tcs-corp</entry>
<entry key="version">1.0.0</entry>
<entry key="description">{description}</entry>
<entry key="createdBy">TCS Corp delivery</entry>
<entry key="requiresRoot">false</entry>
<entry key="allowIndexDefinitions">false</entry>
<entry key="packageType">content</entry>
</properties>
'''
    flt = '<?xml version="1.0" encoding="UTF-8"?>\n<workspaceFilter version="1.0">\n' + ''.join(f'  {f}\n' for f in filters) + '</workspaceFilter>\n'
    path = os.path.join(out, f'{name}-1.0.0.zip')
    with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED) as zf:
        dirs = sorted({'META-INF/', 'META-INF/vault/', 'jcr_root/'} | {n[:i + 1] for n, _ in entries for i in range(len(n)) if n[i] == '/'})
        for d in dirs:
            zf.writestr(d, b'')
        zf.writestr('META-INF/vault/filter.xml', flt)
        zf.writestr('META-INF/vault/properties.xml', props)
        for n, data in entries:
            zf.writestr(n, data)
    return path


page_filter = lambda p: f'<filter root="{p}"><include pattern="{p}"/><include pattern="{p}/jcr:content(/.*)?"/></filter>'
entries, filters, rows = [], [], []
for p in pages:
    xml = source(pkg_of[p]).read(f'jcr_root{p}/.content.xml').decode('utf-8')
    xml, links, images = fix(xml)
    target = renames.get(p, p)
    entries.append((f'jcr_root{target}/.content.xml', xml.encode('utf-8')))
    filters.append(page_filter(target))
    rows.append((p, target, links, images))
# PNG assets: the SVG asset's node with the PNG as its original
for ref, v in sorted(svgs.items()):
    z = source(v['package'])
    r = report[ref]
    asset = z.read(f'jcr_root{ref}/.content.xml').decode('utf-8')
    asset = asset.replace('image/svg+xml', 'image/png')
    asset = re.sub(r'(<metadata\b[^>]*?)(/?>)', lambda m: f'{m.group(1)} tiff:ImageWidth="{{Long}}{r["width"]}" tiff:ImageLength="{{Long}}{r["height"]}"{m.group(2)}', asset, count=1)
    rendition = z.read(f'jcr_root{ref}/_jcr_content/renditions/original.dir/.content.xml').decode('utf-8').replace('image/svg+xml', 'image/png')
    png = v['png']
    data = open(os.path.join(png_dir, ref[len('/content/dam/'):].replace('/', '__')[:-4] + '.png'), 'rb').read()
    entries += [(f'jcr_root{png}/.content.xml', asset.encode('utf-8')),
                (f'jcr_root{png}/_jcr_content/renditions/original', data),
                (f'jcr_root{png}/_jcr_content/renditions/original.dir/.content.xml', rendition.encode('utf-8'))]
    filters.insert(0, f'<filter root="{png}"/>')
n_ren = sum(1 for p in pages if p in renames)
fix_zip = write_pkg('tcs-corp-ema-fix-unpublished', (
    f'TCS Corporate Website: fix of the {len(plan["failingWithoutFix"]) or 125} /language-masters/en pages Edge Delivery could not publish. '
    f'{n_ren} pages at Edge Delivery-safe paths (lower case, a-z 0-9 and single hyphens; the old nodes stay, see the cleanup package), '
    f'{len(svgs)} PNG images replacing the SVG files over the 40 KB limit, and the pages linking to the renamed pages with the new links. '
    'Each page has its own filter (the page and its content only): nothing else in AEM changes.'), entries, filters)
# cleanup: the top-most old pages (their old children go with them); a filter without content removes the node
tops = sorted(o for o in renames if not any(o.startswith(f'{b}/') for b in renames if b != o))
clean_zip = write_pkg('tcs-corp-ema-fix-unpublished-cleanup', (
    f'TCS Corporate Website: removes the {len(tops)} old wrong-named /language-masters/en pages (and their old children, {len(renames)} pages in all) '
    'that tcs-corp-ema-fix-unpublished recreated at Edge Delivery-safe paths. Install only after checking the new pages.'),
    [], [f'<filter root="{t}"/>' for t in tops])
# sheets: published paths of the renamed pages
pmap = {pub(o): pub(n) for o, n in renames.items()}
SHEET_LINK = re.compile(re.escape(PUB) + '(' + '|'.join(re.escape(r) for r in sorted(rel, key=len, reverse=True)) + r')(?=[/#?*.]|$)')
changed = {}
for sheet, cols in (('metadata.csv', ('url',)), ('redirects.csv', ('destination',))):
    rows_in = list(csv.DictReader(open(SHEETS + sheet, newline='')))
    n = 0
    for row in rows_in:
        for c in cols:
            new = SHEET_LINK.sub(lambda m: PUB + rel[m.group(1)], row[c])
            if new != row[c]:
                row[c] = new
                n += 1
    buf = io.StringIO()
    w = csv.DictWriter(buf, fieldnames=list(rows_in[0].keys()), quoting=csv.QUOTE_ALL, lineterminator='\n')
    w.writeheader()
    w.writerows(rows_in)
    open(os.path.join(out, sheet), 'w').write(buf.getvalue())
    changed[sheet] = n
# report
md = ['# Fix of the unpublished /language-masters/en pages (9 November 2026)', '',
      f'- `{os.path.basename(fix_zip)}`: {len(pages)} pages ({n_ren} renamed, {sum(1 for r in rows if r[3])} with PNG images, '
      f'{sum(1 for r in rows if r[2] and r[0] not in renames)} other pages with updated links) and {len(svgs)} PNG assets',
      f'- `{os.path.basename(clean_zip)}`: removes {len(tops)} old page trees ({len(renames)} pages); install after checking the new pages',
      f'- `metadata.csv` ({changed["metadata.csv"]} URLs changed) and `redirects.csv` ({changed["redirects.csv"]} destinations changed): '
      'the consolidated sheets with the new published paths', '',
      '## Install', '',
      '1. Install `tcs-corp-ema-fix-unpublished-1.0.0.zip` (Package Manager, or `install-packages.sh` with this file): '
      'it only adds or replaces the pages and PNG files listed below; the old wrong-named pages stay for now.',
      '2. Replace the `metadata` and `redirects` sheets of `/content/tcs-corp/language-masters/en` with the two CSV files here '
      '(as the consolidated sheets before; only the rows of the renamed pages differ).',
      '3. Publish (preview, live) and reindex the pages: done from this side once the package is installed.',
      '4. After checking the new pages: install `tcs-corp-ema-fix-unpublished-cleanup-1.0.0.zip` to remove the old '
      'wrong-named pages, and unpublish the 14 old live URLs below.', '',
      '## Why the pages failed', '',
      '- Edge Delivery lower-cases the page\'s own name and normalises it (a-z, 0-9, single hyphens, no leading or trailing hyphen), '
      'then asks the author for that path: a page named `Articles`, `a--b`, `a_b`, `x_msm_moved` or `a-` is not found. Parent folders keep their case, '
      'so the children of `Articles` were published at `.../Articles/<page>`.',
      '- Images: the built-in Image component with an SVG over 40 KB (the Edge Delivery limit for SVG) fails the whole page.', '',
      f'## Pages that move from a live URL ({len(moved_live)})', '',
      'They are children of a renamed folder: published at the new path, their old URL stays live until it is unpublished '
      '(after checking the new pages).', '']
md += [f'- `{p}` -> `{pmap[p]}`' for p in moved_live]
md += ['', '## Pages', '', '| Page (AEM, before) | Page (AEM, after) | Links changed | Images changed |', '|---|---|---|---|']
md += [f'| `{p}` | {"`" + t + "`" if t != p else "same"} | {l} | {i} |' for p, t, l, i in rows]
md += ['', '## Images', '', '| SVG (over 40 KB) | PNG | SVG size | PNG size | PNG size (px) |', '|---|---|---|---|---|']
md += [f'| `{r}` | `{v["png"]}` | {v["size"] // 1024} KB | {report[r]["pngBytes"] // 1024} KB | {report[r]["width"]} x {report[r]["height"]} |' for r, v in sorted(svgs.items())]
open(os.path.join(out, 'FIX-REPORT.md'), 'w').write('\n'.join(md) + '\n')
json.dump({'pages': [{'before': p, 'after': t, 'links': l, 'images': i} for p, t, l, i in rows], 'pngs': {r: v['png'] for r, v in svgs.items()}, 'cleanup': tops},
          open(os.path.join(out, 'fix-manifest.json'), 'w'), indent=1)
print('pages', len(pages), '| renamed', n_ren, '| link edits', sum(r[2] for r in rows), '| image edits', sum(r[3] for r in rows), '| pngs', len(svgs),
      '| cleanup roots', len(tops), '| sheets', changed, '|', os.path.getsize(fix_zip) // 1024, 'KB')
print('pages without any change:', [r[0] for r in rows if r[0] not in renames and not r[2] and not r[3]][:5])
