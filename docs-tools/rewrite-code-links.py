"""Code repository links to the documents of migrated-page-content-edam after docs/ was regenerated as the
role-specific set (8 November 2026): a link whose target still exists in the new set (docs/handover/...)
stays; any other (the former handover, proposals, audit, animation and block reports, the EDAM set-up)
points to the archive tag that keeps them. Raw screenshot URLs are left to npm run build:docs.
Usage: python3 -I rewrite-code-links.py <repo> <new docs dir>"""
import os
import re
import subprocess
import sys

repo, new_docs = sys.argv[1:3]
TAG = 'archive/docs-before-role-docs-2026-11-08'
URL = re.compile(r'https://github\.com/sradha-tcs/tcs-corp/(blob|tree)/migrated-page-content-edam/(docs/[^)\s`"\'>|]*)')
files = subprocess.run(['git', '-C', repo, 'ls-files', '*.md', '*.mjs', '*.js', '*.json'], capture_output=True, text=True, check=True).stdout.split()
total = kept = 0
for f in files:
    p = os.path.join(repo, f)
    s = open(p, encoding='utf-8').read()
    if 'migrated-page-content-edam/docs/' not in s:
        continue

    def sub(m):
        global total, kept
        kind, path = m.groups()
        target = path.split('#')[0]
        rel = target[len('docs/handover/'):] if target.startswith('docs/handover/') else None
        if rel is not None and (rel == '' or os.path.exists(os.path.join(new_docs, rel.rstrip('/')))):
            kept += 1
            return m.group(0)
        total += 1
        return f'https://github.com/sradha-tcs/tcs-corp/{kind}/{TAG}/{path}'
    t = URL.sub(sub, s)
    if t != s:
        open(p, 'w', encoding='utf-8').write(t)
print('rewritten to the archive tag:', total, '| kept (in the new set):', kept)
