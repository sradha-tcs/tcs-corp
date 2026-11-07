# Batch B002-W2-N-A03

Wave 2 | NEW | A03 L1 - Who We Are | 12 workbook rows | URL patterns: who-we-are, who-we-are/*

Outcomes: {'PARTIALLY_MIGRATED': 5, 'VALIDATED': 7}

| Check | Result |
|---|---|
| Every-page check | 12 pages, 0 problems (none) |
| Browser check (1 page in 10; 375 / 768 / 1440 px) | 2/2 load, 2 one H1, 0 images without alt, 0 empty links, 0 horizontal scroll, 0 console errors |

| Issue | Count |
|---|---|
| links kept to tcs.com (outside the workbook / under review) | 103 |
| video streamed by the source player (blob URL) not migrated: needs the video file in the DAM | 4 |
| no meta description in the source (generated, review) | 2 |
| BLOCK_GAP timelineContainer: no migration-ready block (kept as text where it has text) | 1 |
| staticRelatedContent: 4 linked page(s) not migrated yet, left out of the List | 1 |
| component "horizontalAccordion" migrated as text (review) | 1 |

Per row: `batch-results.csv`; metadata rows, redirects, authors and issues: the CSVs of this folder.
