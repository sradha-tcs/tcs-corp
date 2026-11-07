# Pilot report (wave 1)

Pilot rows: 11 | built: 10 | outcomes: {'PARTIALLY_MIGRATED': 5, 'VALIDATED': 5, 'FAILED': 1}

| Check | Result |
|---|---|
| Every-page check (no browser) | 10 pages; problems: 1 (no publish date) |
| Browser check (375 / 768 / 1440 px) | 10/10 load, 10/10 one H1, 0 images without alt, 0 empty links, 0 horizontal scroll, 0 console errors, lowest contrast 5.36 |

| Row | Archetype | Outcome | Destination | Gaps / problems |
|---|---|---|---|---|
| 4951 | A02 | PARTIALLY_MIGRATED | `/language-master/en/what-we-do/tcs-research-and-innovation` | video streamed by the source player (blob URL) not migrated: needs the video file in the DAM (1); BLOCK_GAP timelineContainer: no migration-ready block (kept as text where it has text) (1) |
| 4952 | A03 | PARTIALLY_MIGRATED | `/language-master/en/who-we-are` | BLOCK_GAP timelineContainer: no migration-ready block (kept as text where it has text) (1) |
| 5009 | A05 | VALIDATED | `/language-master/en/who-we-are/events` | - |
| 2112 | A06 | FAILED | `/language-master/en/investor-relations/shareholder-satisfaction-survey` | not crawled |
| 2120 | A07 | PARTIALLY_MIGRATED | `/language-master/en/what-we-do/industries/banking` | video streamed by the source player (blob URL) not migrated: needs the video file in the DAM (1) |
| 4182 | A08 | PARTIALLY_MIGRATED | `/language-master/en/what-we-do/services/ai-data-and-analytics` | component "horizontalAccordion" migrated as text (review) (1) |
| 3974 | A09 | VALIDATED | `/language-master/en/what-we-do/products-platforms/tcs-hobs` | - |
| 1922 | A10 | VALIDATED | `/language-master/en/insights/topics/blockchain-topic` | collection: Filter List of the child pages added (archetype A10) |
| 1855 | A11 | PARTIALLY_MIGRATED | `/language-master/en/insights/global-studies/intelligent-choice-architectures-reimagine-decision-making` | video streamed by the source player (blob URL) not migrated: needs the video file in the DAM (1) |
| 3969 | A12 | VALIDATED | `/language-master/en/what-we-do/products-platforms/tcs-erp-on-cloud-sap-landscape-migration-modernization/case-study/erp-cloud-platform-transform-indirect-procurement` | - |
| 1879 | A10 | VALIDATED | `/language-master/en/insights/perspectives` | collection: Filter List of the child pages added (archetype A10) |

Mappings validated in the pilot: anchorLinks, dynamicFilter, featureGrid, heroBanner, latestCards, recommendedReading, relatedContent, staticRelatedContent, storyCard, storyCardCarousel, textWithAsset, topHighlightsSlider.
Still PILOT (not on a pilot page; validated on their first batch, before its bulk run): contentCards, heroCarousel, horizontalAccordion, textImage, eventsHeroBanner, featuredArticles, regionalPrivacy.
