# Wave 2 report: press releases (9 batches of up to 250 pages)

| | |
|---|---|
| Date | 2026-10-23 |
| Batches | 250 pages each, newest releases first (the order of the list by last modification); every batch crawled and built on its own (pass 1), then the final link pass rebuilt every batch and Wave 1; the delivered build is checked: every page without a browser, one page in ten in the browser |
| Scope | The press releases of `The As-is page (Lift and Shift).csv` after the Wave 1 pilot, at their target path `/content/tcs-corp/language-master/en/who-we-are/newsroom/press-release` (the CSV's target path, as decided for T-01) |
| Status | Built and checked in the local preview. **Not installed, not published** |

## 1. Dashboard

| Batch | Crawled | Migrated | Skipped | New images | Tags | Redirects | Checked | One H1 | Page scroll | Empty links | Console errors | 10 contact groups | Fidelity (sample) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Batch 1 | 250 | 250 | 0 | 93 | 4 | 0 | 25 | 25 | 0 | 0 | 0 | 25 | 99.9 % (25 pages) |
| Batch 2 | 250 | 250 | 0 | 106 | 7 | 0 | 25 | 25 | 0 | 0 | 0 | 25 | 100 % (25 pages) |
| Batch 3 | 250 | 250 | 0 | 83 | 5 | 1 | 25 | 25 | 0 | 0 | 0 | 25 | 100 % (25 pages) |
| Batch 4 | 250 | 250 | 0 | 145 | 2 | 0 | 25 | 25 | 0 | 0 | 0 | 25 | 99.9 % (25 pages) |
| Batch 5 | 250 | 250 | 0 | 91 | 4 | 1 | 25 | 25 | 0 | 0 | 0 | 25 | 100 % (25 pages) |
| Batch 6 | 250 | 250 | 0 | 63 | 1 | 1 | 25 | 25 | 0 | 0 | 0 | 25 | 100 % (25 pages) |
| Batch 7 | 250 | 248 | 2 | 86 | 3 | 3 | 25 | 25 | 0 | 0 | 0 | 25 | 100 % (25 pages) |
| Batch 8 | 250 | 250 | 0 | 78 | 3 | 1 | 25 | 25 | 0 | 0 | 0 | 25 | 100 % (25 pages) |
| Batch 9 | 157 | 157 | 0 | 48 | 1 | 0 | 16 | 16 | 0 | 0 | 0 | 16 | 99.8 % (16 pages) |
| **Total** | **2157** | **2155** | **2** | **793** | | **7** | | | | | | | **100 %** (216 pages) |

**Skipped pages**

| Source | Reason |
|---|---|
| https://www.tcs.com/who-we-are/newsroom/press-release/old-petco-selects-tcs-optumera-to-drive-intelligent-merchandising-strategy | the source page has no content (no title, no text) |
| https://www.tcs.com/who-we-are/newsroom/press-release/tcs-appoints-andrew-essex-as-senior-managing-partner | the source page has no content (no title, no text) |

## 2. Final link pass

Once every batch was migrated, Wave 1 and every batch were rebuilt so that a link to a page of the list goes to its migrated page. A link to a page of a later wave (newsroom, investor, careers) stays on tcs.com until that page is migrated, so no link points to a missing page.

| Wave | Pages | Internal links | Kept to tcs.com (page not migrated yet) | Outside the scope (tcs.com) |
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

## 3. Checks of every page (without a browser)

Title (the Page Header's H1), description, publish date, heading levels, image alt texts, links with text, tables (Table blocks of at most 9 columns, none left in a text), the Media Contacts, In the News and Connect with us blocks.

| Wave | Pages | Title | Description | Publish date | Media Contacts | Tables | Images | Problems |
|---|---|---|---|---|---|---|---|---|
| w3 | 20 | 20 | 18 | 17 | 18 | 1 | 3 | 3 |
| w4-b01 | 250 | 250 | 245 | 243 | 71 | 1 | 162 | 7 |
| w4-b02 | 250 | 250 | 249 | 250 | 0 | 0 | 239 | 2 |
| w4-b03 | 5 | 5 | 5 | 5 | 0 | 0 | 3 | 0 |
| w5 | 132 | 132 | 132 | 89 | 0 | 51 | 2 | 19 |

**Releases without a publish date** (14: the source text has no dateline): add `publish-date` in their Metadata sheet row.

- `/language-master/en/who-we-are/newsroom/press-release/statement-on-the-passing-of-padma-bhushan-shri-f-c-kohli`
- `/language-master/en/who-we-are/newsroom/press-release/council-europe-development-bank-partners-tcs-transform-reconciliation-processes`
- `/language-master/en/who-we-are/newsroom/press-release/tcs-diamond-level-partner-oracle-partner-network`
- `/language-master/en/who-we-are/newsroom/press-release/tcs-omnistore-stevie-awards`
- `/language-master/en/who-we-are/newsroom/press-release/mobile-nfv-management-framework`
- `/language-master/en/who-we-are/newsroom/press-release/tcs-inks-deal-bank-bhutan-modernize-digital-core-enhance-customer-experience`
- `/language-master/en/who-we-are/newsroom/press-release/class-eight-student-thrissur-kerela-aditya-kb-wins-indias-largest-interschool-quiz-tcs-inquizitive-2023`
- `/language-master/en/who-we-are/newsroom/press-release/ca-world-2013`
- `/language-master/en/who-we-are/newsroom/press-release/everest-group-peak-matrix-tcs-banking-business-process-services`
- `/language-master/en/who-we-are/newsroom/press-release/sony-pictures-entertainment-and-tata-consultancy-services-sign-landmark-service-oriented-architecture-agreement`
- `/language-master/en/who-we-are/newsroom/press-release/tata-consultancy-services-sets-up-strategic-unit-to-expand-presence-in-emerging-markets`
- `/language-master/en/who-we-are/newsroom/press-release/tcs-data-quest-top-20-fifth-consecutive-year`
- `/language-master/en/who-we-are/newsroom/press-release/tcs-it-services-bpo-uk-universal-workplace-pension-scheme`
- `/language-master/en/who-we-are/newsroom/press-release/tcs-successful-bidder-nest-scheme-administration-services-pada-uk`

## 4. Issues (all batches, `deliverables/issues-w2.csv`)

| Issue | Count |
|---|---|
| link outside the migration scope (kept to tcs.com) | 8536 |
| no hero image | 604 |
| no meta description in the source (generated from the first paragraph, review) | 191 |
| no About TCS section | 140 |
| document not downloaded (kept to tcs.com) | 38 |
| table with merged cells flattened into a Table block (review) | 34 |
| hero alt reused across releases, set decorative (review) | 23 |
| hero alt was generic, set decorative (review) | 9 |
| old media contacts table left out (Media Contacts block) | 9 |
| hero alt is another release's title, set decorative (review) | 7 |
| inline image alt was generic, set decorative (review) | 6 |
| image download failed | 3 |
| unmapped source tag | 3 |
| hero alt of the UAT image set decorative (review) | 1 |
| link to a page of the list not migrated yet (kept to tcs.com until it is) | 1 |
| no publish date found | 1 |
| inline image left out (icon or no source) | 1 |

## 5. Browser checks per batch (one page in ten of the delivered build)

### Batch 1

- Pages checked: 25 (widths 375 px: 9, 768 px: 8, 1440 px: 8); HTTP 200: 25
- Exactly one H1: 25; pages with skipped heading levels: 0; images without alt: 0; minimum text contrast (sampled): 5.36 : 1
- Releases with a publish date: 25 / 25; data layer page entry: 25; Media Contacts with 10 groups: 25
- Fidelity: sentences not found: everest-group-tcs-leader-insurance-applications-outsourcing: The Everest Group evaluated leading global IT vendors servicing large (&gt;US$25 million),

### Batch 2

- Pages checked: 25 (widths 375 px: 9, 768 px: 8, 1440 px: 8); HTTP 200: 25
- Exactly one H1: 25; pages with skipped heading levels: 0; images without alt: 0; minimum text contrast (sampled): 5.36 : 1
- Releases with a publish date: 25 / 25; data layer page entry: 25; Media Contacts with 10 groups: 25

### Batch 3

- Pages checked: 25 (widths 375 px: 9, 768 px: 8, 1440 px: 8); HTTP 200: 25
- Exactly one H1: 25; pages with skipped heading levels: 0; images without alt: 0; minimum text contrast (sampled): 5.36 : 1
- Releases with a publish date: 25 / 25; data layer page entry: 25; Media Contacts with 10 groups: 25

### Batch 4

- Pages checked: 25 (widths 375 px: 9, 768 px: 8, 1440 px: 8); HTTP 200: 25
- Exactly one H1: 25; pages with skipped heading levels: 0; images without alt: 0; minimum text contrast (sampled): 5.36 : 1
- Releases with a publish date: 25 / 25; data layer page entry: 25; Media Contacts with 10 groups: 25
- Fidelity: sentences not found: tcs-ranked-one-in-customer-satisfaction-by-european-companies: #1 in customer satisfaction in both small and large contracts (annual value &lt;€5 million

### Batch 5

- Pages checked: 25 (widths 375 px: 9, 768 px: 8, 1440 px: 8); HTTP 200: 25
- Exactly one H1: 25; pages with skipped heading levels: 0; images without alt: 0; minimum text contrast (sampled): 5.36 : 1
- Releases with a publish date: 25 / 25; data layer page entry: 25; Media Contacts with 10 groups: 25

### Batch 6

- Pages checked: 25 (widths 375 px: 9, 768 px: 8, 1440 px: 8); HTTP 200: 25
- Exactly one H1: 25; pages with skipped heading levels: 0; images without alt: 0; minimum text contrast (sampled): 5.36 : 1
- Releases with a publish date: 24 / 25; data layer page entry: 25; Media Contacts with 10 groups: 25

### Batch 7

- Pages checked: 25 (widths 375 px: 9, 768 px: 8, 1440 px: 8); HTTP 200: 25
- Exactly one H1: 25; pages with skipped heading levels: 0; images without alt: 0; minimum text contrast (sampled): 5.36 : 1
- Releases with a publish date: 25 / 25; data layer page entry: 25; Media Contacts with 10 groups: 25

### Batch 8

- Pages checked: 25 (widths 375 px: 9, 768 px: 8, 1440 px: 8); HTTP 200: 25
- Exactly one H1: 25; pages with skipped heading levels: 0; images without alt: 0; minimum text contrast (sampled): 5.36 : 1
- Releases with a publish date: 25 / 25; data layer page entry: 25; Media Contacts with 10 groups: 25

### Batch 9

- Pages checked: 16 (widths 375 px: 6, 768 px: 5, 1440 px: 5); HTTP 200: 16
- Exactly one H1: 16; pages with skipped heading levels: 0; images without alt: 0; minimum text contrast (sampled): 5.36 : 1
- Releases with a publish date: 16 / 16; data layer page entry: 16; Media Contacts with 10 groups: 16
- Fidelity: sentences not found: tcs-wins-2016-run-sap-partner-of-the-year-pinnacle-award: [[IMG:0]]“It is an honor to be recognized with this prestigious award for Run SAP excellen

## 6. Packages (final link pass)

| Batch | Package |
|---|---|
| Batch 1 | `waves/w2-b01/tcs-corp-migration-w2-b01-press-releases-1.0.0.zip` |
| Batch 2 | `waves/w2-b02/tcs-corp-migration-w2-b02-press-releases-1.0.0.zip` |
| Batch 3 | `waves/w2-b03/tcs-corp-migration-w2-b03-press-releases-1.0.0.zip` |
| Batch 4 | `waves/w2-b04/tcs-corp-migration-w2-b04-press-releases-1.0.0.zip` |
| Batch 5 | `waves/w2-b05/tcs-corp-migration-w2-b05-press-releases-1.0.0.zip` |
| Batch 6 | `waves/w2-b06/tcs-corp-migration-w2-b06-press-releases-1.0.0.zip` |
| Batch 7 | `waves/w2-b07/tcs-corp-migration-w2-b07-press-releases-1.0.0.zip` |
| Batch 8 | `waves/w2-b08/tcs-corp-migration-w2-b08-press-releases-1.0.0.zip` |
| Batch 9 | `waves/w2-b09/tcs-corp-migration-w2-b09-press-releases-1.0.0.zip` |

Each package has a filter per page, per new image and per tag (merged): installing a batch changes only its own pages. The hub pages (Press releases, Newsroom) come with Wave 1 1.0.1; their parents are created only if missing. Images already in the DAM from an earlier batch are referenced, not packaged again, so **install the batches in order** (Wave 1 first).

## 7. How to install

1. Package Manager: install Wave 1 1.0.1 first, then the batches in the order of the table.
2. Metadata sheet (`/content/tcs-corp/language-master/en/metadata`): paste the rows of `deliverables/paste/metadata-<batch>-part<n>-no-header.tsv` below the existing rows (100 rows a file), save; preview and publish the sheet at its `.json` path.
3. Publish the pages of each batch and their images; reindex.
