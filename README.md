# Home page content package

Downloads for the TCS Home page implementation (sample content):

- `home-content/tcs-corp-home-content-1.0.2.zip`: AEM content package (Package Manager, Upload Package, Install). 1.0.2 re-authors the "Ideas shaping impact" (Insight & Opinion) section of the Home page after the Figma design, with images on its List Items, and adds two pages: Multimodal AI for evidence-based engineering assurance, and Audience growth in a stagnant streaming market
- `home-content/metadata.csv`: the Metadata sheet (/content/tcs-corp/us/en/metadata), 43 rows in its 33 columns (1.0.2: the two new pages, and the Agentic AI in HR publish date 2026-10-12)
- `home-content/authors.csv`: the Authors sheet (/content/tcs-corp/us/en/data/authors)
- `home-content/HOME-IMPLEMENTATION-REPORT.pdf`: implementation report and go-live steps
- `home-content/tcs-corp-home-content-1.0.1.zip`: the previous package

This branch holds files only (no site code).
- `home-content/metadata-new-rows.tsv`: the two new rows of the Metadata sheet (1.0.2), tab-separated, to paste into the sheet in AEM (select the first empty row, paste); also change the publish-date of the Agentic AI in HR row to 2026-10-12

## What We Do page (language master)

- `what-we-do/tcs-corp-what-we-do-content-1.0.0.zip`: AEM content package (Package Manager, Upload Package, Install): /content/tcs-corp/language-master/en/what-we-do, 8 supporting pages under language-master/en/dummy-pages, 19 DAM assets under /content/dam/tcs-corp/what-we-do and 13 capability tags (tcs-corp:capability/..., merged). Built from the Figma L1 what we do designs and the temp-design-pages/what-we-do template.

## Who Are We page (language master)

- `who-are-we/tcs-corp-who-are-we-content-1.0.1.zip`: AEM content package (Package Manager, Upload Package, Install): /content/tcs-corp/language-master/en/who-are-we, 8 supporting pages under language-master/en/dummy-pages (our-story, our-people, careers, learning-and-growth, inclusion-and-belonging, research-and-innovation, formula-e-sponsorship, marathon-sponsorship), 13 DAM assets under /content/dam/tcs-corp/who-are-we and 5 topic tags (tcs-corp:topic/people-culture, learning, inclusion, research-innovation, heritage; merged). Built from the Figma who are we designs and the temp-design-pages/who-are-we template. The "Explore what we do" hero button links to the What We Do page: install its package too. Needs the code of PRs #87 and #89 (merged). 1.0.1: the Values list pages are in the new Pages list (a Page per item, PR #89); 1.0.0 is the previous version.

## Curated design pages (language master) — current

Replaces the What We Do and Who We Are packages above (install only this one).

- `curated-design-pages/tcs-corp-curated-design-pages-content-1.0.0.zip`: AEM content package (Package Manager, Upload Package, Install). Contents:
  - The 11 pages under `/content/tcs-corp/language-master/en/curated-design-pages`, plus a root page listing them.
  - 119 supporting pages under `language-master/en/dummy-pages`. Each page's content is replaced; other pages are kept.
  - 58 new DAM assets under `/content/dam/tcs-corp/curated-design-pages`, and 47 reused assets (merged).
  - 77 `tcs-corp` tags, 29 of them new (merged).
- `curated-design-pages/REPORT.md`: implementation report (per page, and consolidated).
- `curated-design-pages/metadata-language-master.csv`, `metadata-en-rollout.csv`: bulk metadata sheet rows.
- `curated-design-pages/taxonomy.csv`, `tags.csv`: taxonomy page rows and the tag register.
- `curated-design-pages/placeholders.csv`: the placeholders sheet (every UI text key).
- `curated-design-pages/data-*.csv`: data sheets (Authors, Locations, Partners, Social Links, Media Contacts).
