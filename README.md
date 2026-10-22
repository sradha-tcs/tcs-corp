# Content packages

> **22 October 2026 (2): the Media Contacts block, block library package 1.0.14 and handover 2.41.** The previous state of this branch is tagged `home-content-package_22-Oct-2026_1318`. The code is on main (pull request #148): install after it is deployed.
>
> - `block-library/tcs-corp-block-library-content-1.0.14.zip`: block library and curated design pages (replaces 1.0.13).
>   - New: Media Contacts folder with the pages "Media Contacts variations" and "Media Contacts: one region" (region Europe).
>   - The Press release template page ends with a Media Contacts block. The Press Release template no longer appends the contacts.
>   - The migrated press release `curated-design-pages/forms/tcs-bancs-for-treasury-marks-its-entry-into-sri-lanka-with-indian-bank` and its "Forms" parent page and image are included. This package replaces the whole curated-design-pages tree, so without them installing it would remove the migrated page; **don't install 1.0.13 or older any more**.
>   - Conversation Canvas examples use "Stays in place" instead of the removed "Decorative" journey (pull request #147).
> - `block-library/metadata-1.0.14-new-rows.csv` (and `.tsv`, to paste): the 6 rows to add to or change in the language master's Metadata sheet: the 3 Media Contacts pages, the Forms page, the migrated press release, and "Page Header: press release", whose region is now Europe as its spec says (it was Global). `metadata-language-master.csv` is the whole sheet.
> - `block-library/data-media-contacts.csv`: the 12 tcs.com media contacts (as already imported into the language master's Media Contacts sheet).
> - `block-library/placeholders.csv`: new keys `email`, `phone`, `mediaContactsEditorHint`; `mediaContacts` is now used by the Media Contacts block.
> - `press-release-migration/tcs-corp-press-release-tcs-bancs-treasury-content-1.0.1.zip`: the migrated page with the Media Contacts block after "About TCS" (replaces 1.0.0). It isn't needed when 1.0.14 is installed, which contains the same page. `MIGRATION-REPORT.md` is updated.
> - `handover/TCS-CORP-HANDOVER.pdf`: handover 2.41, 3,442 pages: chapter 6.33 Media Contacts Block with 5 screenshots, the Press Release template (4.1.4), the Media Contacts sheet (9.9), `mailto:` / `tel:` clicks without the address (F-05 closed), F-109 (releases need the block), F-110 (the template Page Header has no side gutter).
> - After installing: publish the pages and the sheets, then reindex. Add the Media Contacts block to the Site Global Templates press-release page and to press releases authored before (F-109).

> **22 October 2026: the migrated press release "TCS BaNCS for Treasury marks its entry into Sri Lanka with Indian Bank".** The previous state of this branch is tagged `home-content-package_22-Oct-2026_1057`.
>
> - `press-release-migration/tcs-corp-press-release-tcs-bancs-treasury-content-1.0.0.zip` (now 1.0.1, see above): the page `/content/tcs-corp/language-master/en/curated-design-pages/forms/tcs-bancs-for-treasury-marks-its-entry-into-sri-lanka-with-indian-bank` (press-release template), its image and 4 existing tags (merged). It creates the `forms` parent page only if it doesn't exist. Nothing else in AEM changes.
> - `press-release-migration/metadata-language-master-row.csv` (and `.tsv`): its row of the language master's Metadata sheet. Add it to the sheet; don't import it as the whole sheet.
> - `press-release-migration/data-media-contacts.csv` (and `.tsv`): the 12 TCS media contacts of the source for the language master's Media Contacts sheet (`/content/tcs-corp/language-master/en/data/media-contacts`, empty today). Every press-release page of the language master lists them.
> - `press-release-migration/MIGRATION-REPORT.md`: the section-to-block mapping, the deviations, the validation report and the open issues.
> - Then publish the page and the two sheets, and reindex.
> - Unchanged: everything below.

> **20 October 2026: install the new block library package (List Item display options).** The previous state of this branch is tagged `home-content-package_20-Oct-2026_1229`.
>
> - `block-library/tcs-corp-block-library-content-1.0.13.zip`: block library and curated design pages (replaces 1.0.12).
>   - New page "List: List Item display options" (Hide Title, Show Description / Image / Eyebrow / Label / Action Label per List Item).
>   - New page "Sections: colours with blocks" (each Section colour with text, links, buttons, Teasers, Cards, a List and an Accordion; a dark Columns Container with Grey and default Teasers).
>   - Teaser: image positions with BG Colors and both button layouts; List arrow None in "Teaser: CTA styles".
>   - Everything from 1.0.12 is included (Section Style colours, Teaser and Columns Container options).
> - `columns-container/tcs-corp-columns-container-content-1.0.7.zip`: unchanged.
> - Sheets regenerated: nothing new to import if 1.0.9's are in.
> - `handover/TCS-CORP-HANDOVER.pdf`: handover 2.40 (the screenshots shown in the block READMEs; the publication of 1.0.12 and 1.0.13 verified on aem.live; the load time; the block READMEs; the project knowledge base, in the repository at `docs/handover/knowledge-base/README.md`; the language master's query index corrected, F-108); `blocks/BLOCK-DOCUMENTATION-REPORT.md`: the block documentation report (the READMEs themselves are in the repository, `blocks/<block>/README.md`); `audit/DIALOG-OPTIONS-2026-10-20.md`: the validation report.
> - **Content in AEM authored before:** List Items show everything (the new toggles default to on); sections with Highlight keep their grey band; Teasers with a Title size take the size of their Title Type; Teasers with a BG Color have no padding until Padding is set in their Additional tab.
> - Unchanged: the curated design pages package (1.0.2), the Home package (1.0.3) and the /en metadata sheets.
>
> Installing replaces each page of the package: changes made in AEM to those pages since the last install are overwritten. Pages outside the package are kept. The older zips below are the previous versions.

## Press release migration (language master)

- `press-release-migration/tcs-corp-press-release-tcs-bancs-treasury-content-1.0.1.zip` (1.0.1: the Media Contacts block; 1.0.0 the previous version): AEM content package (Package Manager, Upload Package, Install). Migrated from https://www.tcs.com/who-we-are/newsroom/press-release/tcs-bancs-for-treasury-marks-its-entry-into-sri-lanka-with-indian-bank with the existing blocks: Page Header, Image, Text, Title, List (In the News, 4 List Items) and Teaser.
- `press-release-migration/metadata-language-master-row.csv`, `data-media-contacts.csv` (and `.tsv`, tab-separated, to paste): the sheet rows.
- `press-release-migration/MIGRATION-REPORT.md`: the mapping document and the validation report.

## Columns Container only (new pages)

Only the new Columns Container pages of the block library, without the rest of the block library:

- `columns-container/tcs-corp-columns-container-content-1.0.7.zip`: AEM content package (1.0.7: BG Color and Gap None; 1.0.6: the container Additional tab; 1.0.5: the re-audit; 1.0.4: Button blocks instead of built-in Buttons; 1.0.3: the content of the block audit; 1.0.2: Column widths removed, Columns per row is `columns-per-row`) (Package Manager, Upload Package, Install) of 4 pages under `/content/tcs-corp/language-master/en/block-library/columns-container`: the folder page and Columns of blocks; Columns per row; Alignment, gap and breakpoints. Its filter covers only that folder (installing removes the old `widths-and-columns-per-row` page), so nothing else in AEM changes. The images are those of the block library package already installed.
- `columns-container/metadata-columns-container-rows.csv` (and `.tsv`, tab-separated, to paste): the 4 rows of the language-master Metadata sheet (the Columns per row row has its new URL: replace the `widths-and-columns-per-row` row). Add them to the sheet (don't import them as the whole sheet, which would replace its other rows).
- The block library start page doesn't link the new folder unless it is updated: open `block-library/columns-container` directly, or install `block-library/tcs-corp-block-library-content-1.0.13.zip`, which updates the start page too.

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

- `block-library/tcs-corp-block-library-content-1.0.13.zip` (1.0.12, 1.0.11, 1.0.10, 1.0.9, 1.0.8, 1.0.7, 1.0.6, 1.0.5, 1.0.4, 1.0.3, 1.0.2, 1.0.1, 1.0.0: the previous versions): AEM content package (Package Manager, Upload Package, Install). Contents:
  - The block library under `/content/tcs-corp/language-master/en/block-library`: 176 pages covering every block and its variations (with the Animation and Columns Container folders).
  - The 11 curated design pages.
  - 123 supporting pages under `dummy-pages`. Each page's content is replaced; other pages are kept.
  - 118 DAM assets (71 new, 47 reused, merged).
  - 81 `tcs-corp` tags (33 new, merged).
- `block-library/REPORT.md`: block library report. `block-library/curated-design-pages-REPORT.md`: the curated pages report.
- `block-library/block-library-pages.csv`, `block-library-variations.csv`: inventory of the library pages and of every labelled example.
- `block-library/metadata-language-master.csv`, `metadata-en-rollout.csv`, `taxonomy.csv`, `tags.csv`, `placeholders.csv`, `data-*.csv`: the sheets.
