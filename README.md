# Content packages

> **19 October 2026: install the new block library package.** The previous state of this branch is tagged `home-content-package_19-Oct-2026_1629`.
>
> - `block-library/tcs-corp-block-library-content-1.0.6.zip`: block library and curated design pages (replaces 1.0.5).
>   - `foundations/button-icons-and-alignment` now uses the new **Button** block (Button Block), whose View, Type, Icon and Alignment all work. The built-in Button doesn't deliver them.
>   - The Columns Container folder no longer has Column widths. `widths-and-columns-per-row` is now `columns-per-row`; installing removes the old page.
> - `block-library/metadata-language-master.csv` (311 rows) and `metadata-en-rollout.csv`: the Columns per row row has its new URL. Import the language-master sheet again.
> - `block-library/placeholders.csv`: adds `buttonBlockEmpty`. Taxonomy, tags and data sheets are regenerated.
> - Only the Columns Container pages: `columns-container/tcs-corp-columns-container-content-1.0.2.zip` (see below).
> - Unchanged: the curated design pages package (1.0.2), the Home package (1.0.3) and the /en metadata sheets.
>
> Installing replaces each page of the package: changes made in AEM to those pages since the last install are overwritten. Pages outside the package are kept. The older zips below are the previous versions.

## Columns Container only (new pages)

Only the new Columns Container pages of the block library, without the rest of the block library:

- `columns-container/tcs-corp-columns-container-content-1.0.2.zip`: AEM content package (1.0.2: Column widths removed, the columns are of equal width; Widths and columns per row is now Columns per row, `columns-per-row`) (Package Manager, Upload Package, Install) of 4 pages under `/content/tcs-corp/language-master/en/block-library/columns-container`: the folder page and Columns of blocks; Columns per row; Alignment, gap and breakpoints. Its filter covers only that folder (installing removes the old `widths-and-columns-per-row` page), so nothing else in AEM changes. The images are those of the block library package already installed.
- `columns-container/metadata-columns-container-rows.csv` (and `.tsv`, tab-separated, to paste): the 4 rows of the language-master Metadata sheet (the Columns per row row has its new URL: replace the `widths-and-columns-per-row` row). Add them to the sheet (don't import them as the whole sheet, which would replace its other rows).
- The block library start page doesn't link the new folder unless it is updated: open `block-library/columns-container` directly, or install `block-library/tcs-corp-block-library-content-1.0.6.zip`, which updates the start page too.

## Project handover

- `handover/TCS-CORP-HANDOVER.pdf`: the project handover, version 2.24 (19 October 2026, 3,420 pages; with the Columns Container): architecture, site structure, every component with its fields and variations, metadata, sheets, operations, troubleshooting and the findings register. The same file as `docs/handover/TCS-CORP-HANDOVER.pdf` on main.

## /en metadata sheet after the language-master rollout

- `home-content/metadata-en-after-rollout.csv`: the /en Metadata sheet (/content/tcs-corp/us/en/metadata) to use after language-master/en is rolled out to us/en. It has 136 rows in 38 columns:
  - The 43 rows of today's sheet, with their values unchanged.
  - Five new columns, eyebrow, card-title, card-description, card-style and card-theme, filled in from the language-master rows.
  - 93 new rows: the rolled-out curated design pages (12) and supporting pages (81).

  The block library has no rows, because /en doesn't publish it. Import the file in place of the current sheet after the rollout.

## Home page

Downloads for the TCS Home page implementation (sample content):

- `home-content/tcs-corp-home-content-1.0.3.zip`: AEM content package (Package Manager, Upload Package, Install). 1.0.3 stores the CTAs as Hero CTA items and the filters as Filter List items (PR #90). 1.0.2 re-authored the "Ideas shaping impact" (Insight & Opinion) section of the Home page after the Figma design, with images on its List Items, and adds two pages: Multimodal AI for evidence-based engineering assurance, and Audience growth in a stagnant streaming market
- `home-content/metadata.csv`: the Metadata sheet (/content/tcs-corp/us/en/metadata), 43 rows in its 33 columns plus card-style and card-theme (empty; 18 October 2026), as published
- `home-content/authors.csv`: the Authors sheet (/content/tcs-corp/us/en/data/authors)
- `home-content/HOME-IMPLEMENTATION-REPORT.pdf`: implementation report and go-live steps
- `home-content/tcs-corp-home-content-1.0.2.zip`, `1.0.1.zip`: the previous packages

This branch holds files only (no site code).
- `home-content/metadata-new-rows.tsv`: the two new rows of the Metadata sheet (1.0.2), tab-separated, to paste into the sheet in AEM (select the first empty row, paste); also change the publish-date of the Agentic AI in HR row to 2026-10-12

## What We Do page (language master)

- `what-we-do/tcs-corp-what-we-do-content-1.0.1.zip` (1.0.1: item children; 1.0.0 the previous version): AEM content package (Package Manager, Upload Package, Install): /content/tcs-corp/language-master/en/what-we-do, 8 supporting pages under language-master/en/dummy-pages, 19 DAM assets under /content/dam/tcs-corp/what-we-do and 13 capability tags (tcs-corp:capability/..., merged). Built from the Figma L1 what we do designs and the temp-design-pages/what-we-do template.

## Who Are We page (language master)

- `who-are-we/tcs-corp-who-are-we-content-1.0.2.zip` (1.0.2: item children, PR #90): AEM content package (Package Manager, Upload Package, Install): /content/tcs-corp/language-master/en/who-are-we, 8 supporting pages under language-master/en/dummy-pages (our-story, our-people, careers, learning-and-growth, inclusion-and-belonging, research-and-innovation, formula-e-sponsorship, marathon-sponsorship), 13 DAM assets under /content/dam/tcs-corp/who-are-we and 5 topic tags (tcs-corp:topic/people-culture, learning, inclusion, research-innovation, heritage; merged). Built from the Figma who are we designs and the temp-design-pages/who-are-we template. The "Explore what we do" hero button links to the What We Do page: install its package too. Needs the code of PRs #87 and #89 (merged). 1.0.1: the Values list pages are in the new Pages list (a Page per item, PR #89); 1.0.0 is the previous version.

## Curated design pages (language master) — current

Replaces the What We Do and Who We Are packages above (install only this one).

- `curated-design-pages/tcs-corp-curated-design-pages-content-1.0.2.zip` (1.0.1, 1.0.0: the previous versions): AEM content package (Package Manager, Upload Package, Install). Contents:
  - The 11 pages under `/content/tcs-corp/language-master/en/curated-design-pages`, plus a root page listing them.
  - 119 supporting pages under `language-master/en/dummy-pages`. Each page's content is replaced; other pages are kept.
  - 58 new DAM assets under `/content/dam/tcs-corp/curated-design-pages`, and 47 reused assets (merged).
  - 77 `tcs-corp` tags, 29 of them new (merged).
- `curated-design-pages/REPORT.md`: implementation report (per page, and consolidated).
- `curated-design-pages/metadata-language-master.csv`, `metadata-en-rollout.csv`: bulk metadata sheet rows.
- `curated-design-pages/taxonomy.csv`, `tags.csv`: taxonomy page rows and the tag register.
- `curated-design-pages/placeholders.csv`: the placeholders sheet (every UI text key).
- `curated-design-pages/data-*.csv`: data sheets (Authors, Locations, Partners, Social Links, Media Contacts).

## Block library + curated design pages (language master) — current, install this one

Contains the curated design pages package above, so install only this one.

- `block-library/tcs-corp-block-library-content-1.0.6.zip` (1.0.5, 1.0.4, 1.0.3, 1.0.2, 1.0.1, 1.0.0: the previous versions): AEM content package (Package Manager, Upload Package, Install). Contents:
  - The block library under `/content/tcs-corp/language-master/en/block-library`: 176 pages covering every block and its variations (with the Animation and Columns Container folders).
  - The 11 curated design pages.
  - 123 supporting pages under `dummy-pages`. Each page's content is replaced; other pages are kept.
  - 118 DAM assets (71 new, 47 reused, merged).
  - 81 `tcs-corp` tags (33 new, merged).
- `block-library/REPORT.md`: block library report. `block-library/curated-design-pages-REPORT.md`: the curated pages report.
- `block-library/block-library-pages.csv`, `block-library-variations.csv`: inventory of the library pages and of every labelled example.
- `block-library/metadata-language-master.csv`, `metadata-en-rollout.csv`, `taxonomy.csv`, `tags.csv`, `placeholders.csv`, `data-*.csv`: the sheets.
