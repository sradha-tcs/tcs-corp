# Link fixes for /design-block-master/en (9 November 2026)

From the 146 live pages and the header / footer references (plain HTML, every link that leaves the root or does not resolve). The full list, one row per page and link, is `dbm-link-fixes.csv` (columns page, link, kind, fix, note).

## 1. Replace (author: Find and Replace below `/content/tcs-corp/design-block-master/en`)

343 links on 134 pages; each target exists in `/design-block-master/en`:

| Find | Replace with | Links |
|---|---|---|
| `/content/tcs-corp/design-block-master/english/` | `/content/tcs-corp/design-block-master/en/` | 147 |
| `/language-master/en/` (and `/content/tcs-corp/language-master/en/`) in links | `/content/tcs-corp/design-block-master/en/` | 196 |

Replace the testing-root links only where the CSV says `replace`: 3 links have no design-block-master page (section 2).

## 2. Author decisions

| Page | Link | Why |
|---|---|---|
| `/design-block-master/en/curated-design-pages/case-study` | `/content/dam/tcs-corp/open-video-2025-025-002.mp4` | no target page: needs an author decision |
| `/design-block-master/en/curated-design-pages/story` | `/content/dam/tcs-corp/open-video-2025-025-002.mp4` | no target page: needs an author decision |
| `/design-block-master/en/curated-design-pages/media-and-investor` | `/language-master/en/media-and-investor/environmental-impact-assessments-details` | no design-block-master page: the testing root page exists (keep, or copy the page) |
| `/design-block-master/en/curated-design-pages/news-and-events` | `/language-master/en/news-and-events/newsroom` | no design-block-master page: the testing root page exists (keep, or copy the page) |
| `/design-block-master/en/curated-design-pages/news-and-events` | `/language-master/en/news-and-events/events` | no design-block-master page: the testing root page exists (keep, or copy the page) |
| `/design-block-master/en/curated-design-pages/news-and-events` | `/language-master/en/news-and-events` | no target page: needs an author decision |
| `/design-block-master/en/curated-design-pages/who-we-are` | `/language-master/en/dummy-pages/jaguar-tcs-racing` | no target page: needs an author decision |
| `/design-block-master/en/curated-design-pages/who-we-are` | `/language-master/en/dummy-pages/jaguar` | no target page: needs an author decision |
| `/design-block-master/en/curated-design-pages/industry-landing-page` | `/content/tcs-corp/language-master` | no target page: needs an author decision |
| `/design-block-master/en/curated-design-pages/industry-landing-page` | `/content/aem-eds-xwalk` | no target page: needs an author decision |
| `/design-block-master/en/curated-design-pages/home` | `/content/2026` | no target page: needs an author decision |
| `/design-block-master/en/curated-design-pages/what-we-do` | `/content/cq:i18n` | no target page: needs an author decision |
| `/design-block-master/en/curated-design-pages/what-we-do` | `/content/dam` | no target page: needs an author decision |

## 3. Header and footer page properties

142 of the 146 pages inherit Navigation and Footer; the root page sets Navigation to its own `tcs-header` (correct); 3 pages set them to the testing root. Set them to the root's own references (or clear them to inherit):

| Page | Property | Now | Set to |
|---|---|---|---|
| `/design-block-master/en/curated-design-pages/media-and-investor` | Navigation | `/language-master/en/references/tcs-header` | `/content/tcs-corp/design-block-master/en/references/tcs-header` |
| `/design-block-master/en/curated-design-pages/home` | Navigation, Footer | `/language-master/en/references/tcs-header`, `/language-master/en/references/tcs-footer` | `/content/tcs-corp/design-block-master/en/references/tcs-header`, `.../tcs-footer` |
| `/design-block-master/en/curated-design-pages/story` | Footer | `/language-master/en/references/footer` | `/content/tcs-corp/design-block-master/en/references/footer` |

The footer reference links the footer canvas as `/content/tcs-corp/design-block-master/english/references/footer-conversation-canvas` (in section 1): with `en` the canvas page (live) loads on every page.

## After the edits

Republish the changed pages and the references (I can do it on your word), then the link check is rerun.

## Pages with links to replace

- `/design-block-master/en/curated-design-pages` (11)
- `/design-block-master/en/curated-design-pages/case-study` (4)
- `/design-block-master/en/curated-design-pages/collection` (19)
- `/design-block-master/en/curated-design-pages/forms/website-feedback-form` (1)
- `/design-block-master/en/curated-design-pages/home` (25)
- `/design-block-master/en/curated-design-pages/industry-landing-page` (20)
- `/design-block-master/en/curated-design-pages/insights` (3)
- `/design-block-master/en/curated-design-pages/media-and-investor` (14)
- `/design-block-master/en/curated-design-pages/news-and-events` (3)
- `/design-block-master/en/curated-design-pages/product` (10)
- `/design-block-master/en/curated-design-pages/services` (10)
- `/design-block-master/en/curated-design-pages/story` (9)
- `/design-block-master/en/curated-design-pages/what-we-do` (8)
- `/design-block-master/en/curated-design-pages/who-we-are` (10)
- `/design-block-master/en/dummy-pages/about-tcs` (1)
- `/design-block-master/en/dummy-pages/ai-at-scale` (1)
- `/design-block-master/en/dummy-pages/careers` (1)
- `/design-block-master/en/dummy-pages/careers/experienced-professionals` (1)
- `/design-block-master/en/dummy-pages/careers/graduates` (1)
- `/design-block-master/en/dummy-pages/case-studies` (1)
- `/design-block-master/en/dummy-pages/case-studies/better-operational-decisions-connected-intelligence` (2)
- `/design-block-master/en/dummy-pages/case-studies/increasing-streaming-hours-uk-platform` (2)
- `/design-block-master/en/dummy-pages/case-studies/intelligence-in-everyday-employee-services` (2)
- `/design-block-master/en/dummy-pages/case-studies/modernising-core-banking-for-a-regional-bank` (2)
- `/design-block-master/en/dummy-pages/case-studies/orchestrating-vehicle-app-charging-service-experience` (2)
- `/design-block-master/en/dummy-pages/case-studies/personalised-banking-at-scale` (2)
- `/design-block-master/en/dummy-pages/case-studies/real-time-network-resilience-for-a-bank` (2)
- `/design-block-master/en/dummy-pages/case-studies/reimagine-customer-service-with-people-and-agents` (2)
- `/design-block-master/en/dummy-pages/case-studies/reimagining-in-home-entertainment-experience` (2)
- `/design-block-master/en/dummy-pages/case-studies/transforming-overnight-liquidity-modelling` (2)
- `/design-block-master/en/dummy-pages/contact` (1)
- `/design-block-master/en/dummy-pages/core-modernisation` (1)
- `/design-block-master/en/dummy-pages/customer-experience` (1)
- `/design-block-master/en/dummy-pages/cyber-resilience` (1)
- `/design-block-master/en/dummy-pages/explore-insights` (2)
- `/design-block-master/en/dummy-pages/formula-e-sponsorship` (1)
- `/design-block-master/en/dummy-pages/human-ai-service-autonomy-model` (1)
- `/design-block-master/en/dummy-pages/inclusion-and-belonging` (1)
- `/design-block-master/en/dummy-pages/industries` (1)
- `/design-block-master/en/dummy-pages/industries/banking` (2)
- `/design-block-master/en/dummy-pages/industries/communications-media-information` (2)
- `/design-block-master/en/dummy-pages/industries/cpg-distribution` (2)
- `/design-block-master/en/dummy-pages/industries/education` (2)
- `/design-block-master/en/dummy-pages/insights` (1)
- `/design-block-master/en/dummy-pages/insights/adobe-experience-platform-insights` (2)
- `/design-block-master/en/dummy-pages/insights/agentic-ai-banking-operations` (2)
- `/design-block-master/en/dummy-pages/insights/agentic-ai-in-hr-chros-future-ready-enterprises` (2)
- `/design-block-master/en/dummy-pages/insights/ai-agents-for-customer-service` (2)
- `/design-block-master/en/dummy-pages/insights/ai-agents-in-everyday-banking` (2)
- `/design-block-master/en/dummy-pages/insights/ai-agents-need-guardrails-not-just-goals` (2)
- `/design-block-master/en/dummy-pages/insights/ai-driven-transformation` (2)
- `/design-block-master/en/dummy-pages/insights/ai-ready-data-centre-infrastructure-report` (2)
- `/design-block-master/en/dummy-pages/insights/audience-growth-stagnant-streaming-market` (2)
- `/design-block-master/en/dummy-pages/insights/banking-industry-innovation` (2)
- `/design-block-master/en/dummy-pages/insights/beyond-transactions-towards-the-agentic-bank` (2)
- `/design-block-master/en/dummy-pages/insights/cloud-modernization-strategy` (2)
- `/design-block-master/en/dummy-pages/insights/confidence-in-a-connected-world` (2)
- `/design-block-master/en/dummy-pages/insights/connected-factories-industrial-ai` (2)
- `/design-block-master/en/dummy-pages/insights/customer-data-platforms` (2)
- `/design-block-master/en/dummy-pages/insights/data-centre-becomes-intelligence-factory` (2)
- `/design-block-master/en/dummy-pages/insights/decision-intelligence-report` (2)
- `/design-block-master/en/dummy-pages/insights/decision-twins-testing-strategy` (2)
- `/design-block-master/en/dummy-pages/insights/digital-commerce-trends` (2)
- `/design-block-master/en/dummy-pages/insights/enabling-banking-innovation-resilience-core-modernisation` (2)
- `/design-block-master/en/dummy-pages/insights/enterprise-data-modernization` (2)
- `/design-block-master/en/dummy-pages/insights/fighting-fraud-with-agentic-ai` (2)
- `/design-block-master/en/dummy-pages/insights/five-decisions-data-centre-strategy` (2)
- `/design-block-master/en/dummy-pages/insights/foresight-factory-floor-digital-twin-logistics` (2)
- `/design-block-master/en/dummy-pages/insights/future-of-customer-experience` (2)
- `/design-block-master/en/dummy-pages/insights/generative-ai-in-enterprises` (2)
- `/design-block-master/en/dummy-pages/insights/hyper-personalization-at-scale` (2)
- `/design-block-master/en/dummy-pages/insights/multimodal-ai-evidence-based-engineering-assurance` (2)
- `/design-block-master/en/dummy-pages/insights/payments-and-real-time-finance` (2)
- `/design-block-master/en/dummy-pages/insights/real-world-impact-tcs-wisdom-ai` (2)
- `/design-block-master/en/dummy-pages/insights/reimagining-how-your-business-works` (2)
- `/design-block-master/en/dummy-pages/insights/retailers-journey-to-smarter-fulfilment` (2)
- `/design-block-master/en/dummy-pages/insights/rethinking-kyc-with-ai-agents` (2)
- `/design-block-master/en/dummy-pages/insights/simulating-supply-chain-disruption-digital-twin` (2)
- `/design-block-master/en/dummy-pages/insights/skies-of-the-future-aerospace-strategies` (2)
- `/design-block-master/en/dummy-pages/insights/smarter-lending-with-ai-agents` (2)
- `/design-block-master/en/dummy-pages/insights/sustainable-scale-economics-of-compute` (2)
- `/design-block-master/en/dummy-pages/insights/tcs-launches-next-gen-soc-services` (2)
- `/design-block-master/en/dummy-pages/insights/the-self-defending-bank` (2)
- `/design-block-master/en/dummy-pages/insights/why-premiumisation-is-reshaping-indias-cpg-industry` (2)
- `/design-block-master/en/dummy-pages/insights/why-supply-chains-need-a-resilience-reset` (2)
- `/design-block-master/en/dummy-pages/investors` (1)
- `/design-block-master/en/dummy-pages/investors/annual-report` (2)
- `/design-block-master/en/dummy-pages/investors/annual-report/financial-review` (2)
- `/design-block-master/en/dummy-pages/investors/annual-report/governance-and-sustainability` (2)
- `/design-block-master/en/dummy-pages/investors/annual-report/strategy-and-business-review` (2)
- `/design-block-master/en/dummy-pages/investors/ceo-letters` (1)
- `/design-block-master/en/dummy-pages/investors/ceo-letters/client-priorities-shared-progress` (2)
- `/design-block-master/en/dummy-pages/investors/ceo-letters/innovation-with-purpose` (2)
- `/design-block-master/en/dummy-pages/investors/ceo-letters/investing-in-people-and-skills` (2)
- `/design-block-master/en/dummy-pages/investors/ceo-letters/responsible-growth-priorities` (2)
- `/design-block-master/en/dummy-pages/investors/letter-from-the-chairman` (1)
- `/design-block-master/en/dummy-pages/learning-and-growth` (1)
- `/design-block-master/en/dummy-pages/marathon-sponsorship` (1)
- `/design-block-master/en/dummy-pages/newsroom` (1)
- `/design-block-master/en/dummy-pages/newsroom/best-buy-gcc-transition-to-tcs` (2)
- `/design-block-master/en/dummy-pages/newsroom/industrial-intelligence-foundry` (2)
- `/design-block-master/en/dummy-pages/newsroom/inside-the-technology-powering-marathon-race-day` (2)
- `/design-block-master/en/dummy-pages/newsroom/media-kit` (1)
- `/design-block-master/en/dummy-pages/newsroom/mystate-selects-tcs-bancs` (2)
- `/design-block-master/en/dummy-pages/newsroom/next-gen-system-on-chip-design-services` (2)
- `/design-block-master/en/dummy-pages/newsroom/personalising-the-streaming-experience` (2)
- `/design-block-master/en/dummy-pages/newsroom/tcs-google-cloud-ai-native-autonomous-enterprises` (2)
- `/design-block-master/en/dummy-pages/newsroom/tcs-iem-kolkata-ai-centre-of-excellence` (2)
- `/design-block-master/en/dummy-pages/newsroom/tcs-jaguar-renew-formula-e-sponsorship` (2)
- `/design-block-master/en/dummy-pages/newsroom/tcs-partners-manageengine-sovereign-cloud` (2)
- `/design-block-master/en/dummy-pages/newsroom/tcs-q2-fy27-results-announced` (2)
- `/design-block-master/en/dummy-pages/newsroom/tcs-technology-innovation-partner-jfk-terminal-one` (2)
- `/design-block-master/en/dummy-pages/our-people` (1)
- `/design-block-master/en/dummy-pages/our-story` (1)
- `/design-block-master/en/dummy-pages/products` (1)
- `/design-block-master/en/dummy-pages/products/cognix` (1)
- `/design-block-master/en/dummy-pages/products/tcs-add` (1)
- `/design-block-master/en/dummy-pages/products/tcs-bancs` (1)
- `/design-block-master/en/dummy-pages/products/twinx-operations-optimisation` (1)
- `/design-block-master/en/dummy-pages/products/twinx-strategic-marketing` (1)
- `/design-block-master/en/dummy-pages/research-and-innovation` (1)
- `/design-block-master/en/dummy-pages/services` (1)
- `/design-block-master/en/dummy-pages/services/ai-and-data` (1)
- `/design-block-master/en/dummy-pages/services/banking-operations` (1)
- `/design-block-master/en/dummy-pages/services/cloud` (1)
- `/design-block-master/en/dummy-pages/services/customer-experience` (1)
- `/design-block-master/en/dummy-pages/services/cybersecurity` (1)
- `/design-block-master/en/dummy-pages/services/engineering` (1)
- `/design-block-master/en/dummy-pages/services/enterprise-transformation` (1)
- `/design-block-master/en/dummy-pages/services/risk-and-compliance` (1)
- `/design-block-master/en/dummy-pages/solutions` (1)
- `/design-block-master/en/dummy-pages/transformation-themes` (1)
- `/design-block-master/en/dummy-pages/what-we-do` (1)
- `/design-block-master/en/references/footer` (1)
