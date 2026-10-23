# W6–W7 migration report

| | |
|---|---|
| Date | 2026-10-23 |
| Scope | W6 careers (221), W7 forms (6) of `The As-is page (Lift and Shift).csv`, at the CSV's target paths (careers/denmark at /careers/denmark, decision W6-D5) |
| Blocks | Per the confirmed block mapping (`W6-W7-BLOCK-MAPPING.md`, decisions W6-D1 … W7-D6); existing blocks only |

## 1. Pages

| Wave | Pages | Migrated | Listing pages added | Images | Every-page check problems | Browser check (1 in 10) | Package |
|---|---|---|---|---|---|---|---|
| W6 careers | 221 | 221 | 4 | 156 | 116 | 23/23 load, 23/23 one H1, 0 images without alt, 0 pages with console errors | tcs-corp-migration-w6-careers-1.0.0.zip (36 MB) |
| W7 forms | 6 | 6 | 0 | 0 | 0 | 1/1 load, 1/1 one H1, 0 images without alt, 0 pages with console errors | tcs-corp-migration-w7-forms-1.0.0.zip (0 MB) |

## 2. Issues to review

| Issue | Count |
|---|---|
| link outside the migration scope (kept to tcs.com) | 594 |
| no date found | 116 |
| no meta description in the source (generated, review) | 107 |
| poll left out (decision W6-D1) | 17 |
| component "relatedContent" migrated as text (review) | 3 |
| hero carousel: more slides not migrated (review) | 2 |
| image not downloaded | 2 |
| component "image" migrated as text (review) | 2 |
| component "contentCards" migrated as text (review) | 1 |
| component "storyCardCarousel" migrated as text (review) | 1 |

The full list is in `issues-w6-w7.csv`.

## 3. Sheets

- Metadata: 231 rows (`metadata-w6-w7-rows.csv`; also in the consolidated `waves/consolidated/metadata.csv`).
- Redirects: 1 rows (`redirects-w6-w7.csv`, tcs.com path → language master path).
- Authors: 20 rows (`authors-w6-w7-rows.csv`, decision W6-D2; the articles carry their `author-id`).

## 4. Install

1. Install `tcs-corp-migration-w6-careers-1.0.0.zip` and `tcs-corp-migration-w7-forms-1.0.0.zip` (each page has its own filter: nothing else changes).
2. Replace the Metadata, Redirects and Authors sheets with the consolidated CSVs, then publish them.
3. Then the pages can be published and the index updated.
