"""Builds the rename package for the three /language-masters/en folders Edge Delivery can't publish (their
own names aren't EDS-safe: IT_Testing, Perspectives, Blogs; 9 November 2026):
- tcs-corp-ema-fix-folders-1.0.0.zip: the folders at their lower-case paths (simple pages with their title)
  with their child pages, and every migrated page linking to the old paths with the new links (the version of
  tcs-corp-ema-fix-unpublished where that package changed the page). Each page has its own filter.
- tcs-corp-ema-fix-folders-cleanup-1.0.0.zip: removes the old folders and their children.
- metadata.csv / redirects.csv (from the fix package's sheets) with the new published paths, FOLDERS-REPORT.md.
Usage: python3 -I build-rename-package.py <fix package dir> <out dir>"""
import csv
import glob
import io
import json
import os
import re
import sys
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
PKG = os.path.join(HERE, '..', 'ema', 'consolidated', 'packages') + '/'
ROOT = '/content/tcs-corp/language-masters/en'
PUB = '/language-masters/en'
fixdir, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
FOLDERS = {'/IT_Testing': ('/it-testing', 'IT_Testing'),
           '/what-we-do/industries/banking/Perspectives': ('/what-we-do/industries/banking/perspectives', 'Perspectives'),
           '/what-we-do/research/Blogs': ('/what-we-do/research/blogs', 'Blogs')}
roots = {l.strip() for l in open('/tmp/lm-roots.txt') if l.strip()}
live = {l.strip() for l in open('/tmp/pub-lms.txt') if l.strip()}
# page XML: the fix package's version first, else the 1.3.0 page packages
xml_of = {}
with zipfile.ZipFile(os.path.join(fixdir, 'tcs-corp-ema-fix-unpublished-1.0.0.zip')) as zf:
    for n in zf.namelist():
        if n.endswith('/.content.xml') and n.startswith('jcr_root' + ROOT):
            xml_of[n[len('jcr_root'):-len('/.content.xml')]] = zf.read(n).decode('utf-8')
fixed_pages = set(xml_of)
for z in sorted(glob.glob(PKG + '*-1.3.0.zip')):
    if '-assets-' in z:
        continue
    with zipfile.ZipFile(z) as zf:
        for n in zf.namelist():
            if n.endswith('/.content.xml') and n.startswith('jcr_root' + ROOT):
                p = n[len('jcr_root'):-len('/.content.xml')]
                if p in roots and p not in xml_of:
                    xml_of[p] = zf.read(n).decode('utf-8')
# renames: the folders and every page below them
rel = {}
for old, (new, _) in FOLDERS.items():
    rel[old] = new
    for p in roots:
        if p.startswith(ROOT + old + '/'):
            rel[p[len(ROOT):]] = new + p[len(ROOT) + len(old):]
LINK = re.compile(r'(/content/tcs-corp)?' + re.escape(PUB) + '(' + '|'.join(re.escape(r) for r in sorted(rel, key=len, reverse=True)) + r')(?=[".#?/&<\'\s]|\.html|$)')
fix = lambda s: LINK.subn(lambda m: (m.group(1) or '') + PUB + rel[m.group(2)], s)
FOLDER_XML = ('<?xml version="1.0" encoding="UTF-8"?>\n<jcr:root xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0" '
              'xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:sling="http://sling.apache.org/jcr/sling/1.0" jcr:primaryType="cq:Page">'
              '<jcr:content cq:template="/libs/core/franklin/templates/page" sling:resourceType="core/franklin/components/page/v1/page" '
              'jcr:primaryType="cq:PageContent" jcr:title="{title}"/></jcr:root>\n')
entries, filters, rows = [], [], []
page_filter = lambda p: f'<filter root="{p}"><include pattern="{p}"/><include pattern="{p}/jcr:content(/.*)?"/></filter>'
for old, (new, title) in FOLDERS.items():
    entries.append((f'jcr_root{ROOT}{new}/.content.xml', FOLDER_XML.format(title=title).encode('utf-8')))
    filters.append(page_filter(ROOT + new))
    rows.append((ROOT + old, ROOT + new, 0, 'folder page (new)'))
for o, n in sorted(rel.items()):
    if o in FOLDERS:
        continue
    s, links = fix(xml_of[ROOT + o])
    entries.append((f'jcr_root{ROOT}{n}/.content.xml', s.encode('utf-8')))
    filters.append(page_filter(ROOT + n))
    rows.append((ROOT + o, ROOT + n, links, 'moved' + (' (fix package version)' if ROOT + o in fixed_pages else '')))
moved = {ROOT + o for o in rel}
for p, s in sorted(xml_of.items()):
    if p in moved:
        continue
    s2, links = fix(s)
    if links:
        entries.append((f'jcr_root{p}/.content.xml', s2.encode('utf-8')))
        filters.append(page_filter(p))
        rows.append((p, p, links, 'links updated' + (' (fix package version)' if p in fixed_pages else '')))


def write_pkg(name, description, ents, flts):
    props = ('<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">\n<properties>\n'
             '<comment>FileVault Package Properties</comment>\n'
             f'<entry key="name">{name}</entry>\n<entry key="group">tcs-corp</entry>\n<entry key="version">1.0.0</entry>\n'
             f'<entry key="description">{description}</entry>\n<entry key="createdBy">TCS Corp delivery</entry>\n'
             '<entry key="requiresRoot">false</entry>\n<entry key="allowIndexDefinitions">false</entry>\n<entry key="packageType">content</entry>\n</properties>\n')
    flt = '<?xml version="1.0" encoding="UTF-8"?>\n<workspaceFilter version="1.0">\n' + ''.join(f'  {f}\n' for f in flts) + '</workspaceFilter>\n'
    path = os.path.join(out, f'{name}-1.0.0.zip')
    with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED) as zf:
        for d in sorted({'META-INF/', 'META-INF/vault/', 'jcr_root/'} | {n[:i + 1] for n, _ in ents for i in range(len(n)) if n[i] == '/'}):
            zf.writestr(d, b'')
        zf.writestr('META-INF/vault/filter.xml', flt)
        zf.writestr('META-INF/vault/properties.xml', props)
        for n, data in ents:
            zf.writestr(n, data)
    return path


n_moved = len(rel) - len(FOLDERS)
n_ref = sum(1 for r in rows if r[3].startswith('links'))
fix_zip = write_pkg('tcs-corp-ema-fix-folders', (
    'TCS Corporate Website: the /language-masters/en folders IT_Testing, banking/Perspectives and research/Blogs at Edge Delivery-safe paths '
    f'(it-testing, perspectives, blogs) with their {n_moved} child pages, and {n_ref} pages linking to them with the new links. The old folders '
    'stay (see the cleanup package). Each page has its own filter (the page and its content only): nothing else in AEM changes.'), entries, filters)
clean_zip = write_pkg('tcs-corp-ema-fix-folders-cleanup', (
    f'TCS Corporate Website: removes the old /language-masters/en folders IT_Testing, banking/Perspectives and research/Blogs and their {n_moved} '
    'child pages, recreated by tcs-corp-ema-fix-folders. Install only after checking the new pages.'), [], [f'<filter root="{ROOT}{o}"/>' for o in FOLDERS])
# sheets
SHEET_LINK = re.compile(re.escape(PUB) + '(' + '|'.join(re.escape(r) for r in sorted(rel, key=len, reverse=True)) + r')(?=[/#?*.]|$)')
changed = {}
for sheet, col in (('metadata.csv', 'url'), ('redirects.csv', 'destination')):
    data = list(csv.DictReader(open(os.path.join(fixdir, sheet), newline='')))
    n = 0
    for row in data:
        new = SHEET_LINK.sub(lambda m: PUB + rel[m.group(1)], row[col])
        if new != row[col]:
            row[col] = new
            n += 1
    buf = io.StringIO()
    w = csv.DictWriter(buf, fieldnames=list(data[0].keys()), quoting=csv.QUOTE_ALL, lineterminator='\n')
    w.writeheader()
    w.writerows(data)
    open(os.path.join(out, sheet), 'w').write(buf.getvalue())
    changed[sheet] = n
moved_live = sorted(PUB + o for o in rel if PUB + o in live)
md = ['# Rename of the three /language-masters/en folders (9 November 2026)', '',
      f'- `{os.path.basename(fix_zip)}`: {len(FOLDERS)} folder pages and {n_moved} child pages at their new paths, {n_ref} pages with updated links',
      f'- `{os.path.basename(clean_zip)}`: removes the {len(FOLDERS)} old folders and their {n_moved} child pages (install after checking)',
      f'- `metadata.csv` ({changed["metadata.csv"]} URLs changed) and `redirects.csv` ({changed["redirects.csv"]} destinations changed): '
      'the sheets of the fix package with the new paths', '',
      '## Install', '',
      '1. Install `tcs-corp-ema-fix-folders-1.0.0.zip`, then replace the `metadata` and `redirects` sheets of `/content/tcs-corp/language-masters/en` with the two CSV files.',
      '2. Publish (preview, live) and reindex the new pages and the pages with updated links, publish the two sheets.',
      '3. After checking: install `tcs-corp-ema-fix-folders-cleanup-1.0.0.zip` and unpublish the old live URLs below.', '',
      f'## Old live URLs to unpublish after the move ({len(moved_live)})', '']
md += [f'- `{p}` -> `{PUB + rel[p[len(PUB):]]}`' for p in moved_live]
md += ['', '## Pages', '', '| Page (AEM, before) | Page (AEM, after) | Links changed | Change |', '|---|---|---|---|']
md += [f'| `{a}` | {"`" + b + "`" if b != a else "same"} | {l} | {c} |' for a, b, l, c in rows]
open(os.path.join(out, 'FOLDERS-REPORT.md'), 'w').write('\n'.join(md) + '\n')
json.dump({'pages': [{'before': a, 'after': b, 'links': l, 'change': c} for a, b, l, c in rows], 'oldLive': moved_live,
           'cleanup': [ROOT + o for o in FOLDERS]}, open(os.path.join(out, 'folders-manifest.json'), 'w'), indent=1)
print('folders', len(FOLDERS), '| moved children', n_moved, '| pages with link updates', n_ref, '| link edits', sum(r[2] for r in rows),
      '| sheets', changed, '| old live URLs', len(moved_live))
