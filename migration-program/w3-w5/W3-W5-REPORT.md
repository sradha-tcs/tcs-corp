# W3–W5 migration report

| | |
|---|---|
| Date | 2026-10-23 |
| Scope | W3 other press releases (20), W4 newsroom (505, batches of 250), W5 investor (132) of `The As-is page (Lift and Shift).csv`, at the CSV's target paths |
| Blocks | Per the confirmed block mapping (`W3-W5-BLOCK-MAPPING.md`, decisions D-1 … D-6); existing blocks only |
| Status | Built and checked in the local preview. **Not installed, not published** |

## 1. Dashboard

| Wave | Pages | Migrated | Skipped / failed | Images and documents | Every-page check: problems | Browser check (1 in 10) | Package |
|---|---|---|---|---|---|---|---|
| W3 other press releases | 20 | 20 | 0 | 43 | 3 | 2/2 load, 2 one H1, 0 scroll, 0 empty links, 0 errors | `tcs-corp-migration-w3-press-releases-1.0.0.zip` (19 MB) |
| W4 newsroom, batch 1 | 250 | 250 | 0 | 177 | 7 | 25/25 load, 25 one H1, 0 scroll, 0 empty links, 1 errors | `tcs-corp-migration-w4-b01-newsroom-1.0.0.zip` (63 MB) |
| W4 newsroom, batch 2 | 250 | 250 | 0 | 154 | 2 | 25/25 load, 25 one H1, 0 scroll, 0 empty links, 0 errors | `tcs-corp-migration-w4-b02-newsroom-1.0.0.zip` (38 MB) |
| W4 newsroom, batch 3 | 5 | 5 | 0 | 0 | 0 | 1/1 load, 1 one H1, 0 scroll, 0 empty links, 0 errors | `tcs-corp-migration-w4-b03-newsroom-1.0.0.zip` (0 MB) |
| W5 investor | 132 | 132 | 0 | 1696 | 19 | 14/14 load, 14 one H1, 0 scroll, 1 empty links, 0 errors | `tcs-corp-migration-w5-investor-1.0.0.zip` (4 MB) |

**W5 document packages:** 16 packages, 1234 MB in total (decision: documents in packages of at most 95 MB, installed after the pages).

## 2. Final link pass

Every wave (W1, W2 batches 1–9, W3, W4, W5) was rebuilt once W3–W5 were migrated, so that links between pages of the list go to their migrated pages; links to pages of W6 / W7 (careers, forms) stay on tcs.com until they are migrated.

| Wave | Pages | Internal links | Kept to tcs.com (not migrated yet) | Outside the scope |
|---|---|---|---|---|
| w1 | 150 | 181 | 0 | 541 |
| w2-b01 | 250 | 302 | 0 | 1110 |
| w2-b02 | 250 | 290 | 1 | 918 |
| w2-b03 | 250 | 274 | 0 | 833 |
| w2-b04 | 250 | 275 | 0 | 842 |
| w2-b05 | 250 | 265 | 0 | 894 |
| w2-b06 | 250 | 260 | 0 | 1167 |
| w2-b07 | 248 | 253 | 0 | 1095 |
| w2-b08 | 250 | 271 | 0 | 1002 |
| w2-b09 | 157 | 167 | 0 | 675 |
| w3 | 20 | 19 | 0 | 10 |
| w4-b01 | 250 | 256 | 0 | 243 |
| w4-b02 | 250 | 254 | 0 | 104 |
| w4-b03 | 5 | 5 | 0 | 1 |
| w5 | 132 | 54 | 0 | 96 |

Internal links to a page that doesn't exist: **0**.

## 3. Issues to review (all W3–W5 pages)

| Issue | Count |
|---|---|
| unmapped source tag | 512 |
| link outside the migration scope (kept to tcs.com) | 454 |
| no About TCS section | 445 |
| hero alt was generic, set decorative (review) | 225 |
| no hero image | 131 |
| no meta description in the source (generated from the first paragraph, review) | 108 |
| no meta description in the source (generated, review) | 89 |
| no date found | 18 |
| document not downloaded (kept to tcs.com) | 9 |
| image not downloaded | 7 |
| third-party embed (check its provider allows it) | 6 |
| hero alt reused across releases, set decorative (review) | 5 |
| hero alt is another release's title, set decorative (review) | 4 |
| no publish date found | 3 |
| corporate action without its document in the listing (author the link) | 3 |
| audio player not migrated (audio file of the source player; author an Embed or link) | 2 |
| hero alt of the UAT image set decorative (review) | 1 |
| inline image alt was generic, set decorative (review) | 1 |
| table of 22 columns kept in the text (needs authoring) | 1 |

The full list is in `issues-w3-w5.csv`.

## 4. How to install (in this order)

1. **Wave 1 1.0.2 and Wave 2 batches 1–9 1.0.1** (the final link pass changed their links): install over the earlier versions.
2. **W3, W4 batches 1–3, W5 pages** packages.
3. **W5 document packages** 01 … 16; publish the documents in the DAM (documents other than images are served only once published).
4. Metadata sheet: paste `paste/metadata-w3-w5-part<n>-no-header.csv` (100 rows a file) below the existing rows; publish the sheet at `/language-master/en/metadata.json`.
5. Publish the pages of W1–W5 and reindex.
