# Fix of the unpublished /language-masters/en pages (9 November 2026)

- `tcs-corp-ema-fix-unpublished-1.0.0.zip`: 183 pages (72 renamed, 67 with PNG images, 44 other pages with updated links) and 120 PNG assets
- `tcs-corp-ema-fix-unpublished-cleanup-1.0.0.zip`: removes 56 old page trees (72 pages); install after checking the new pages
- `metadata.csv` (72 URLs changed) and `redirects.csv` (72 destinations changed): the consolidated sheets with the new published paths

## Install

1. Install `tcs-corp-ema-fix-unpublished-1.0.0.zip` (Package Manager, or `install-packages.sh` with this file): it only adds or replaces the pages and PNG files listed below; the old wrong-named pages stay for now.
2. Replace the `metadata` and `redirects` sheets of `/content/tcs-corp/language-masters/en` with the two CSV files here (as the consolidated sheets before; only the rows of the renamed pages differ).
3. Publish (preview, live) and reindex the pages: done from this side once the package is installed.
4. After checking the new pages: install `tcs-corp-ema-fix-unpublished-cleanup-1.0.0.zip` to remove the old wrong-named pages, and unpublish the 14 old live URLs below.

## Why the pages failed

- Edge Delivery lower-cases the page's own name and normalises it (a-z, 0-9, single hyphens, no leading or trailing hyphen), then asks the author for that path: a page named `Articles`, `a--b`, `a_b`, `x_msm_moved` or `a-` is not found. Parent folders keep their case, so the children of `Articles` were published at `.../Articles/<page>`.
- Images: the built-in Image component with an SVG over 40 KB (the Edge Delivery limit for SVG) fails the whole page.

## Pages that move from a live URL (14)

They are children of a renamed folder: published at the new path, their old URL stays live until it is unpublished (after checking the new pages).

- `/language-masters/en/careers/chile/Articles/chile-culture` -> `/language-masters/en/careers/chile/articles/chile-culture`
- `/language-masters/en/careers/chile/Articles/chile-diversity-inclusion` -> `/language-masters/en/careers/chile/articles/chile-diversity-inclusion`
- `/language-masters/en/careers/chile/Articles/chile-learning` -> `/language-masters/en/careers/chile/articles/chile-learning`
- `/language-masters/en/careers/chile/Articles/chile-milestones` -> `/language-masters/en/careers/chile/articles/chile-milestones`
- `/language-masters/en/careers/chile/Articles/chile-our-stories` -> `/language-masters/en/careers/chile/articles/chile-our-stories`
- `/language-masters/en/careers/chile/Articles/chile-strength` -> `/language-masters/en/careers/chile/articles/chile-strength`
- `/language-masters/en/careers/chile/Articles/chile-tcs-empowers` -> `/language-masters/en/careers/chile/articles/chile-tcs-empowers`
- `/language-masters/en/careers/chile/Articles/codevita-contest` -> `/language-masters/en/careers/chile/articles/codevita-contest`
- `/language-masters/en/careers/colombia/Articles/colombia-culture` -> `/language-masters/en/careers/colombia/articles/colombia-culture`
- `/language-masters/en/careers/colombia/Articles/colombia-diversity-inclusion` -> `/language-masters/en/careers/colombia/articles/colombia-diversity-inclusion`
- `/language-masters/en/careers/colombia/Articles/colombia-learning` -> `/language-masters/en/careers/colombia/articles/colombia-learning`
- `/language-masters/en/careers/colombia/Articles/colombia-milestones` -> `/language-masters/en/careers/colombia/articles/colombia-milestones`
- `/language-masters/en/careers/colombia/Articles/colombia-strength` -> `/language-masters/en/careers/colombia/articles/colombia-strength`
- `/language-masters/en/careers/colombia/Articles/colombia-tcs-empowers` -> `/language-masters/en/careers/colombia/articles/colombia-tcs-empowers`

## Pages

| Page (AEM, before) | Page (AEM, after) | Links changed | Images changed |
|---|---|---|---|
| `/content/tcs-corp/language-masters/en/careers/chile` | same | 3 | 0 |
| `/content/tcs-corp/language-masters/en/careers/chile/Articles` | `/content/tcs-corp/language-masters/en/careers/chile/articles` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/chile/Articles/chile-culture` | `/content/tcs-corp/language-masters/en/careers/chile/articles/chile-culture` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/chile/Articles/chile-diversity-inclusion` | `/content/tcs-corp/language-masters/en/careers/chile/articles/chile-diversity-inclusion` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/chile/Articles/chile-learning` | `/content/tcs-corp/language-masters/en/careers/chile/articles/chile-learning` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/chile/Articles/chile-milestones` | `/content/tcs-corp/language-masters/en/careers/chile/articles/chile-milestones` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/chile/Articles/chile-our-stories` | `/content/tcs-corp/language-masters/en/careers/chile/articles/chile-our-stories` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/chile/Articles/chile-strength` | `/content/tcs-corp/language-masters/en/careers/chile/articles/chile-strength` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/chile/Articles/chile-tcs-empowers` | `/content/tcs-corp/language-masters/en/careers/chile/articles/chile-tcs-empowers` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/chile/Articles/codevita-contest` | `/content/tcs-corp/language-masters/en/careers/chile/articles/codevita-contest` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/colombia` | same | 3 | 0 |
| `/content/tcs-corp/language-masters/en/careers/colombia/Articles` | `/content/tcs-corp/language-masters/en/careers/colombia/articles` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/colombia/Articles/Ivan-Zapata-story` | `/content/tcs-corp/language-masters/en/careers/colombia/articles/ivan-zapata-story` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/colombia/Articles/Jorge-de-La-Ossa-Gll` | `/content/tcs-corp/language-masters/en/careers/colombia/articles/jorge-de-la-ossa-gll` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/colombia/Articles/colombia-culture` | `/content/tcs-corp/language-masters/en/careers/colombia/articles/colombia-culture` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/colombia/Articles/colombia-diversity-inclusion` | `/content/tcs-corp/language-masters/en/careers/colombia/articles/colombia-diversity-inclusion` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/colombia/Articles/colombia-learning` | `/content/tcs-corp/language-masters/en/careers/colombia/articles/colombia-learning` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/colombia/Articles/colombia-milestones` | `/content/tcs-corp/language-masters/en/careers/colombia/articles/colombia-milestones` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/colombia/Articles/colombia-strength` | `/content/tcs-corp/language-masters/en/careers/colombia/articles/colombia-strength` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/colombia/Articles/colombia-tcs-empowers` | `/content/tcs-corp/language-masters/en/careers/colombia/articles/colombia-tcs-empowers` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/india/tcs-bsc-ignite-Hiring` | `/content/tcs-corp/language-masters/en/careers/india/tcs-bsc-ignite-hiring` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/testimonials/Amol-Kale` | `/content/tcs-corp/language-masters/en/careers/testimonials/amol-kale` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/testimonials/Ananth-Muralidharan` | `/content/tcs-corp/language-masters/en/careers/testimonials/ananth-muralidharan` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/testimonials/Anjali-Hate` | `/content/tcs-corp/language-masters/en/careers/testimonials/anjali-hate` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/testimonials/Apul-Gupta` | `/content/tcs-corp/language-masters/en/careers/testimonials/apul-gupta` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/testimonials/Ashish-Bhatnagar` | `/content/tcs-corp/language-masters/en/careers/testimonials/ashish-bhatnagar` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/testimonials/Krishnendu-Chakraborty` | `/content/tcs-corp/language-masters/en/careers/testimonials/krishnendu-chakraborty` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/testimonials/Nilesh-Rahane` | `/content/tcs-corp/language-masters/en/careers/testimonials/nilesh-rahane` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/testimonials/Rajiv-Kudesia` | `/content/tcs-corp/language-masters/en/careers/testimonials/rajiv-kudesia` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/testimonials/Sanjay-Das` | `/content/tcs-corp/language-masters/en/careers/testimonials/sanjay-das` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/careers/testimonials/Vaibhav-Parashar` | `/content/tcs-corp/language-masters/en/careers/testimonials/vaibhav-parashar` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/contact-us/industry-overlay/talk-to-an-expert-healthcare/article/future-health-wellness-centers-pharmacies-transformation-form_msm_moved` | `/content/tcs-corp/language-masters/en/contact-us/industry-overlay/talk-to-an-expert-healthcare/article/future-health-wellness-centers-pharmacies-transformation-form-msm-moved` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/contact-us/industry-overlay/talk-to-an-expert-life-sciences/article_msm_moved` | `/content/tcs-corp/language-masters/en/contact-us/industry-overlay/talk-to-an-expert-life-sciences/article-msm-moved` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/contact-us/product-overlay/talk-to-an-expert-tcs-add/article_msm_moved` | `/content/tcs-corp/language-masters/en/contact-us/product-overlay/talk-to-an-expert-tcs-add/article-msm-moved` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/insights/authors/Anand-Sitaraman` | `/content/tcs-corp/language-masters/en/insights/authors/anand-sitaraman` | 1 | 0 |
| `/content/tcs-corp/language-masters/en/insights/authors/Pradeep-Rao` | `/content/tcs-corp/language-masters/en/insights/authors/pradeep-rao` | 1 | 0 |
| `/content/tcs-corp/language-masters/en/insights/authors/Praveen-Gauravaram` | `/content/tcs-corp/language-masters/en/insights/authors/praveen-gauravaram` | 1 | 0 |
| `/content/tcs-corp/language-masters/en/insights/authors/SachinPunalekar` | `/content/tcs-corp/language-masters/en/insights/authors/sachinpunalekar` | 1 | 0 |
| `/content/tcs-corp/language-masters/en/insights/authors/Sanjay-Prasad` | `/content/tcs-corp/language-masters/en/insights/authors/sanjay-prasad` | 1 | 0 |
| `/content/tcs-corp/language-masters/en/insights/authors/Serge-Perignon` | `/content/tcs-corp/language-masters/en/insights/authors/serge-perignon` | 1 | 0 |
| `/content/tcs-corp/language-masters/en/insights/authors/abarnita-sen` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/insights/authors/akhilesh-tiwari` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/insights/authors/anindya-pradhan` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/insights/authors/aniruddha-mukherjee` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/insights/authors/chetan-hirurkar` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/insights/authors/dinanath-kholkar-CSBS` | `/content/tcs-corp/language-masters/en/insights/authors/dinanath-kholkar-csbs` | 1 | 0 |
| `/content/tcs-corp/language-masters/en/insights/authors/hrishikesh-vaishnav` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/insights/authors/joe-diPrima` | `/content/tcs-corp/language-masters/en/insights/authors/joe-diprima` | 1 | 0 |
| `/content/tcs-corp/language-masters/en/insights/authors/subhadip-mahalanabish` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/insights/blogs/evolving-market-risks-financial-institutions-response` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/insights/blogs/futurists-optimistic-about-future-work` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/insights/blogs/generative-ai-telecom-optimize-knowledge-base` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/insights/blogs/generative-ai-transforming-banking-customer-onboarding` | same | 0 | 2 |
| `/content/tcs-corp/language-masters/en/insights/blogs/how-ethical-explainable-ai-build-responsible-ai-for-future` | same | 0 | 5 |
| `/content/tcs-corp/language-masters/en/insights/blogs/measuring-grid-resilience-utilities-assess-disruptive-events-impact` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/insights/perspectives/articles/european-leaders-focus-on-innovation---customers` | `/content/tcs-corp/language-masters/en/insights/perspectives/articles/european-leaders-focus-on-innovation-customers` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/insights/perspectives/articles/location-independent-agile-model-remote-working` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/insights/perspectives/articles/the-ascent-of-the-smarter-faster-lighter-enterprise` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/insights/perspectives/articles/the-four-pillars-of-the-futurist-cfo` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/investor-relations/corporate-action/schedule-of-events-Q3-2023-24-dec-29-2023` | `/content/tcs-corp/language-masters/en/investor-relations/corporate-action/schedule-of-events-q3-2023-24-dec-29-2023` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/banking/blog/data-driven-pricing-game-changing-Innovation-banking` | `/content/tcs-corp/language-masters/en/what-we-do/industries/banking/blog/data-driven-pricing-game-changing-innovation-banking` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/banking/solution/digital-mortgage-suite` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/banking/solution/tcs-digital-mortgage-suite` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/banking/white-paper/data-driven-decision-making-mortgage-business` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/banking/white-paper/digitalisation-existing-mortgage-jouneys-uk` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/consumer-packaged-goods-and-distribution/article/cpg-ecosystem-partnership-digital-transformation` | same | 0 | 4 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/consumer-packaged-goods-and-distribution/white-paper/a-supply-chain-model-for-a-robust-pre-owned-jewelry-market-` | `/content/tcs-corp/language-masters/en/what-we-do/industries/consumer-packaged-goods-and-distribution/white-paper/a-supply-chain-model-for-a-robust-pre-owned-jewelry-market` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/consumer-packaged-goods-and-distribution/white-paper/cpg-precision-distribution-data-driven-approach` | same | 0 | 2 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/education/solution/digital-security-as-a-service-education` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/energy-resources-utilities/white-paper/the-beginning-of-a-new-era-for-Utilities` | `/content/tcs-corp/language-masters/en/what-we-do/industries/energy-resources-utilities/white-paper/the-beginning-of-a-new-era-for-utilities` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/healthcare/article/future-health-wellness-centers-pharmacies-transformation_msm_moved` | `/content/tcs-corp/language-masters/en/what-we-do/industries/healthcare/article/future-health-wellness-centers-pharmacies-transformation-msm-moved` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/insurance/white-paper/accelerated-computing-mitigate-cybersecurity-threats` | same | 0 | 2 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/insurance/white-paper/ai-agents-insurance-claims-function` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/insurance/white-paper/ai-technologies-transform-disability-insurance-claims` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/insurance/white-paper/embedded-insurance-innovation-better-cx` | same | 0 | 2 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/insurance/white-paper/generative-agentic-autonomous-vehicle-insurance` | same | 0 | 2 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/insurance/white-paper/improved-cx-persuasive-chatbots` | same | 0 | 3 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/insurance/white-paper/supply-chain-risk-management-insurance` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/manufacturing/blog/Building-sustainable-supply-chains` | `/content/tcs-corp/language-masters/en/what-we-do/industries/manufacturing/blog/building-sustainable-supply-chains` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/manufacturing/white-paper/cognitive-demand-forecasting-solution-framework` | same | 0 | 2 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/manufacturing/white-paper/connected-vehicle-data-cyber-security` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/manufacturing/white-paper/digital-commerce-manufacturing-sector-agility` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/manufacturing/white-paper/generative-ai-manufacturing-knowledge-gap` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/manufacturing/white-paper/next-gen-technologies-ai-future-mobility` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/manufacturing/white-paper/software-defined-vehicles-mobility-experience` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/manufacturing/white-paper/sustainable-aviation-manufacturing-practices` | same | 0 | 5 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/manufacturing/white-paper/zero-waste-manufacturing-circular-economy` | same | 0 | 4 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/public-services/solution/digigov-federated-identity-management-solution` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/public-services/solution/digigov-foundation-government-services` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/public-services/white-paper/addressing-climate-change-health-threats` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/retail/article/omnistore-2022-retail-system-awards` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/retail/solution/algo-retail-enhance-customer-lifetime-value` | same | 0 | 2 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/retail/white-paper/bimodal-supply-chain-fashion-retail` | same | 0 | 3 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/retail/white-paper/food-freshness-monitoring-cold-supply-chain` | same | 0 | 3 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/retail/white-paper/retail-sustainability-framework-value-chain` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/retail/white-paper/supplier-relationship-experience-transformation` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/retail/white-paper/supply-chain-outsourcing-framework` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/retail/white-paper/tracking-digital-influence-store-sales` | same | 0 | 2 |
| `/content/tcs-corp/language-masters/en/what-we-do/industries/travel-and-logistics/white-paper/smart-airport-reimagine-operating-model` | same | 0 | 2 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/quartz/interbank-Borrowing-Quartz-Magazine` | `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/quartz/interbank-borrowing-quartz-magazine` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/quartz/magazine/magazine-edition-3-quartz-takes-off` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/quartz/magazine/quartz-magazine-edition-1-future-is-tokenized` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/quartz/magazine/quartz-magazine-edition-2-the-new-age` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/quartz/magazine/quartz-magazine-edition-4-the-ideas-issue` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-bancs/articles/automated-loan-management-lending-solution` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-bancs/articles/bancs-revolutionizing-digital-contracts` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-bancs/articles/bancs-zero-downtime-solution` | same | 0 | 2 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-bancs/articles/frictionless-payments-journey-switzerland` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-bancs/case-study/bancs-credit-unions-building-societies-transformation` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-bancs/collateral/bancs-newsletter` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-bancs/collateral/bancs-solutions-awards-recognitions` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-bancs/interview/euroclear-post-trade-processing-transformation` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-bancs/marketplace/business-services-partners` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-bancs/marketplace/cloud-partners` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-bancs/marketplace/consulting-partners` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-bancs/marketplace/technology-partners` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-bancs/newsletter/single-event-processing-corporate-actions` | same | 0 | 2 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-bancs/solution/bancs-global-banking-platform` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-bancs/solution/community-banks` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-bancs/solution/tcs-bancs-banking-platform-cooperative-banks` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-hobs/solution/hobs-unified-catalog-product-lifecycle-management` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-hobs/white-papers/generative-ai-reimagine-telelcom-ui-ux` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-mastercraft/whitepaper/five-step-approach-privacy-safe-data-analytics` | same | 0 | 2 |
| `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-omnistore/solution_msm_moved` | `/content/tcs-corp/language-masters/en/what-we-do/products-platforms/tcs-omnistore/solution-msm-moved` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/artificial-intelligence/white-paper/building-future-ready-private-sovereign-ai` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/artificial-intelligence/white-paper/generative-ai-customer-service-transformation` | same | 0 | 4 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/artificial-intelligence/white-paper/responsible-ai-driving-progress-innovation-social-good` | same | 0 | 4 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/cloud/aws/whitepaper/banks-adopt-cloud-infrastructure-transform-risk-processes_msm_moved` | `/content/tcs-corp/language-masters/en/what-we-do/services/cloud/aws/whitepaper/banks-adopt-cloud-infrastructure-transform-risk-processes-msm-moved` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/cloud/aws/whitepaper_msm_moved` | `/content/tcs-corp/language-masters/en/what-we-do/services/cloud/aws/whitepaper-msm-moved` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/cloud/microsoft/white-paper/supply-chain-decarbonization-missing-link-net-zero` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/cognitive-business-operations/solution/innovative-strategies-future-ready-HR-operations` | `/content/tcs-corp/language-masters/en/what-we-do/services/cognitive-business-operations/solution/innovative-strategies-future-ready-hr-operations` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/cognitive-business-operations/solution/tcs-customer-experience-service` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/cognitive-business-operations/white-paper/proactive-hr-operations-digital-friends` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/consulting/white-paper/cloud-platform-transforming-pharma-partnerships` | same | 0 | 2 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/consulting/white-paper/five-ways-manage-achieve-synergy-targets-mergers-and-acquisitions` | same | 0 | 3 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/consulting/white-paper/how-reimagined-operating-model-improves-sustainability-initiatives` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/consulting/white-paper/semantic-data-provide-knowledge-unlock-value` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/consulting/white-paper/tsa-management-best-practices` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/data-and-analytics/white-paper/master-data-management-supply-chain-resilience` | same | 0 | 2 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/enterprise-solutions/solution/oracle-fusion-for-engineering-procurement-construction-companies` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/enterprise-solutions/solution/tcs-servitization-engine-oracle-cloud-increase-customer-lifetime-value` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/enterprise-solutions/white-paper/generative-ai-human-resources` | same | 0 | 3 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/iot-digital-engineering/solution/tcs-digifleet-improved-supply-chain-operations` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/iot-digital-engineering/white-paper/digital-thread-generative-ai-intelligent-insights` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/iot-digital-engineering/white-paper/four-tech-mega-trends-iot-edge` | same | 0 | 2 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/iot-digital-engineering/white-paper/generative-ai-industry-value-chains` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/iot-digital-engineering/white-paper/iot-connected-services-business-model-transformation` | same | 0 | 6 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/iot-digital-engineering/white-paper/manufacturing-technology-digital-factory` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/iot-digital-engineering/white-paper/sustainability-by-design-build-value` | same | 0 | 2 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/network-solutions-and-services/solution/connected-enterprise-accelerating-next-era-digital-change` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/network-solutions-and-services/solution/network-planning-design-services` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/network-solutions-and-services/white-paper/site-engineering-acceleration-5g-network-deployment` | same | 0 | 3 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/sustainability-services/white-paper/rise-sustainable-responsible-supply-chains` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/what-we-do/services/tcs-interactive/white-paper/superforecaster-precise-decisioning` | same | 0 | 2 |
| `/content/tcs-corp/language-masters/en/who-we-are/events/bancs-Sibos-2024-beijing` | `/content/tcs-corp/language-masters/en/who-we-are/events/bancs-sibos-2024-beijing` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/events/distributech-International-2023-sustainable-future` | `/content/tcs-corp/language-masters/en/who-we-are/events/distributech-international-2023-sustainable-future` | 1 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/events/isitc-annual-securities-operations-summit` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/events/shared-services-and-outsourcing-week-2025` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/events/tcs-at-building-societies-annual-conference-2026` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/events/tcs-bancs-at-bfsi-it-summit-2026` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/events/tcs-bancs-at-world-credit-union-conference-2026` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/events/tcs-bancs-sifma-ops-corporate-actions` | same | 1 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/newsroom/analyst-reports/convergence-private-5G-wi-fi-6-propel-new-enterprise-private-network` | `/content/tcs-corp/language-masters/en/who-we-are/newsroom/analyst-reports/convergence-private-5g-wi-fi-6-propel-new-enterprise-private-network` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/newsroom/analyst-reports/universal-banking---the-role-of-cro-in-enterprise-risk-managemen` | `/content/tcs-corp/language-masters/en/who-we-are/newsroom/analyst-reports/universal-banking-the-role-of-cro-in-enterprise-risk-managemen` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/intelligent-swadeshi-4G-network-launched-bsnl-connects-26700-more-villages` | `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/intelligent-swadeshi-4g-network-launched-bsnl-connects-26700-more-villages` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/leader-digital-finance-accounting-business-process-services-idc-marketScape` | `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/leader-digital-finance-accounting-business-process-services-idc-marketscape` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcs--member-jaspar-japan-automotive-consortium` | `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcs-member-jaspar-japan-automotive-consortium` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcs-bancs-powers-societe-generale-securities-services-transformation-of-pan-European-custody-platform` | `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcs-bancs-powers-societe-generale-securities-services-transformation-of-pan-european-custody-platform` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcs-certified-top-employe-in-latin-america-` | `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcs-certified-top-employe-in-latin-america` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcs-named-among-the-top-50-community-minded-companies-in-the-US-by-points-of-light` | `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcs-named-among-the-top-50-community-minded-companies-in-the-us-by-points-of-light` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcs-named-leader-in-property-and-casualty-operation-transformation-services-by-nelsonHall` | `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcs-named-leader-in-property-and-casualty-operation-transformation-services-by-nelsonhall` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcs-omniStore-wins-omnichannel-technology-of-the-year-award` | `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcs-omnistore-wins-omnichannel-technology-of-the-year-award` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcs-partners-with-Cumberland-building-society-transform-core-banking-solution` | `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcs-partners-with-cumberland-building-society-transform-core-banking-solution` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcs-partners-with-google-cloud-to-build--industry-specific-cloud-solutions` | `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcs-partners-with-google-cloud-to-build-industry-specific-cloud-solutions` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcs-savvis-cloud-enabled-tcs-bancs-hosted_offering-north-america` | `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcs-savvis-cloud-enabled-tcs-bancs-hosted-offering-north-america` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcsleader-in-manufacturing-service-life-cycle-management-` | `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/tcsleader-in-manufacturing-service-life-cycle-management` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/winners-of-tcs-ion-intelliGem-contest-demonstrate-outstanding-21st-century-skills` | `/content/tcs-corp/language-masters/en/who-we-are/newsroom/press-release/winners-of-tcs-ion-intelligem-contest-demonstrate-outstanding-21st-century-skills` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/newsroom/tcs-in-the-news/bcci_tcs_online_live_streaming_cricket` | `/content/tcs-corp/language-masters/en/who-we-are/newsroom/tcs-in-the-news/bcci-tcs-online-live-streaming-cricket` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/tcs-way/article/innovating-performance-management-system` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/who-we-are/worldwide/europe/tcs-summit-europe/about/summit-europe-2025-roundup` | same | 0 | 1 |
| `/content/tcs-corp/language-masters/en/who-we-are/worldwide/summit/insights/from-volcanoes-to-ai--using-technology-to-improve-air-travel` | `/content/tcs-corp/language-masters/en/who-we-are/worldwide/summit/insights/from-volcanoes-to-ai-using-technology-to-improve-air-travel` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/worldwide/summit/insights/predicting-delays-with-ai--how-tech-helps-postnord-deliver-for-c` | `/content/tcs-corp/language-masters/en/who-we-are/worldwide/summit/insights/predicting-delays-with-ai-how-tech-helps-postnord-deliver-for-c` | 0 | 0 |
| `/content/tcs-corp/language-masters/en/who-we-are/worldwide/tcs-na/summit-tcs-north-america/about/summit-north-america-2025-roundup` | same | 0 | 1 |

## Images

| SVG (over 40 KB) | PNG | SVG size | PNG size | PNG size (px) |
|---|---|---|---|---|
| `/content/dam/tcs-corp/images/insights/blogs/ai-driven-retail-experiences.svg` | `/content/dam/tcs-corp/images/insights/blogs/ai-driven-retail-experiences.png` | 194 KB | 182 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/insights/blogs/ethical-customer-support-banking.svg` | `/content/dam/tcs-corp/images/insights/blogs/ethical-customer-support-banking.png` | 168 KB | 148 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/insights/blogs/evolving-market-risks-financial-institutions-response-inline-fig1.svg` | `/content/dam/tcs-corp/images/insights/blogs/evolving-market-risks-financial-institutions-response-inline-fig1.png` | 553 KB | 588 KB | 1600 x 1004 |
| `/content/dam/tcs-corp/images/insights/blogs/executives-main-concerns-genai.svg` | `/content/dam/tcs-corp/images/insights/blogs/executives-main-concerns-genai.png` | 53 KB | 112 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/insights/blogs/generative-ai-transforming-banking-customer-onboarding-infog1.svg` | `/content/dam/tcs-corp/images/insights/blogs/generative-ai-transforming-banking-customer-onboarding-infog1.png` | 45 KB | 182 KB | 1600 x 1076 |
| `/content/dam/tcs-corp/images/insights/blogs/generative-ai-transforming-banking-customer-onboarding-infog2.svg` | `/content/dam/tcs-corp/images/insights/blogs/generative-ai-transforming-banking-customer-onboarding-infog2.png` | 109 KB | 163 KB | 1600 x 1076 |
| `/content/dam/tcs-corp/images/insights/blogs/index1.svg` | `/content/dam/tcs-corp/images/insights/blogs/index1.png` | 82 KB | 913 KB | 1600 x 1111 |
| `/content/dam/tcs-corp/images/insights/blogs/personalised-financial-wellness-powered-ai.svg` | `/content/dam/tcs-corp/images/insights/blogs/personalised-financial-wellness-powered-ai.png` | 121 KB | 113 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/insights/blogs/risks-solutions-related-ethical-ai.svg` | `/content/dam/tcs-corp/images/insights/blogs/risks-solutions-related-ethical-ai.png` | 184 KB | 109 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/insights/blogs/tcs-workingtowardsthefuture-infographic-1.svg` | `/content/dam/tcs-corp/images/insights/blogs/tcs-workingtowardsthefuture-infographic-1.png` | 248 KB | 334 KB | 1600 x 1034 |
| `/content/dam/tcs-corp/images/what-we-do/industries/4dimensionalframework-table.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/4dimensionalframework-table.png` | 1550 KB | 262 KB | 1600 x 988 |
| `/content/dam/tcs-corp/images/what-we-do/industries/accelerated-computing-mitigate-cybersecurity-threats-fig1.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/accelerated-computing-mitigate-cybersecurity-threats-fig1.png` | 91 KB | 54 KB | 1600 x 720 |
| `/content/dam/tcs-corp/images/what-we-do/industries/accelerated-computing-mitigate-cybersecurity-threats-fig2.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/accelerated-computing-mitigate-cybersecurity-threats-fig2.png` | 217 KB | 225 KB | 1600 x 1034 |
| `/content/dam/tcs-corp/images/what-we-do/industries/ai-powered.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/ai-powered.png` | 409 KB | 187 KB | 1600 x 1004 |
| `/content/dam/tcs-corp/images/what-we-do/industries/bfsi-wp-claimsautomationcompositeai-figure1.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/bfsi-wp-claimsautomationcompositeai-figure1.png` | 976 KB | 318 KB | 1600 x 1159 |
| `/content/dam/tcs-corp/images/what-we-do/industries/bimodal-supply-chain-approach.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/bimodal-supply-chain-approach.png` | 268 KB | 161 KB | 1600 x 960 |
| `/content/dam/tcs-corp/images/what-we-do/industries/chatbot-one.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/chatbot-one.png` | 1253 KB | 117 KB | 1600 x 839 |
| `/content/dam/tcs-corp/images/what-we-do/industries/chatbot-three.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/chatbot-three.png` | 626 KB | 395 KB | 1600 x 3038 |
| `/content/dam/tcs-corp/images/what-we-do/industries/chatbot-two.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/chatbot-two.png` | 1129 KB | 134 KB | 1600 x 839 |
| `/content/dam/tcs-corp/images/what-we-do/industries/climate-health-data-platform-infographic-1.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/climate-health-data-platform-infographic-1.png` | 403 KB | 235 KB | 1600 x 1206 |
| `/content/dam/tcs-corp/images/what-we-do/industries/cognitive-demand-figure-01.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/cognitive-demand-figure-01.png` | 280 KB | 173 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/industries/cognitive-demand-figure-02.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/cognitive-demand-figure-02.png` | 634 KB | 203 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/industries/connected-vehicle-data-cyber-security.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/connected-vehicle-data-cyber-security.png` | 511 KB | 265 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/industries/cpg-2-u.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/cpg-2-u.png` | 814 KB | 209 KB | 1600 x 839 |
| `/content/dam/tcs-corp/images/what-we-do/industries/cpg-3-u.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/cpg-3-u.png` | 681 KB | 207 KB | 1600 x 839 |
| `/content/dam/tcs-corp/images/what-we-do/industries/customizing-llms.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/customizing-llms.png` | 567 KB | 260 KB | 1600 x 795 |
| `/content/dam/tcs-corp/images/what-we-do/industries/cyber-security-diagram-u.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/cyber-security-diagram-u.png` | 823 KB | 269 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/industries/data-driven-supply-chain.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/data-driven-supply-chain.png` | 528 KB | 174 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/industries/disability-claims-insurance-transformation-figure2.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/disability-claims-insurance-transformation-figure2.png` | 511 KB | 197 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/industries/embeded-one.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/embeded-one.png` | 162 KB | 144 KB | 1600 x 839 |
| `/content/dam/tcs-corp/images/what-we-do/industries/embeded-two.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/embeded-two.png` | 292 KB | 143 KB | 1600 x 779 |
| `/content/dam/tcs-corp/images/what-we-do/industries/federated-identity-management-final.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/federated-identity-management-final.png` | 698 KB | 247 KB | 1600 x 803 |
| `/content/dam/tcs-corp/images/what-we-do/industries/fig-201.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/fig-201.png` | 121 KB | 186 KB | 1600 x 1132 |
| `/content/dam/tcs-corp/images/what-we-do/industries/fig-202.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/fig-202.png` | 60 KB | 249 KB | 1600 x 1132 |
| `/content/dam/tcs-corp/images/what-we-do/industries/fig-203.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/fig-203.png` | 42 KB | 233 KB | 1600 x 1132 |
| `/content/dam/tcs-corp/images/what-we-do/industries/fig-204.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/fig-204.png` | 87 KB | 359 KB | 1600 x 1371 |
| `/content/dam/tcs-corp/images/what-we-do/industries/figure-2-illustrative-mapping.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/figure-2-illustrative-mapping.png` | 114 KB | 108 KB | 1600 x 1132 |
| `/content/dam/tcs-corp/images/what-we-do/industries/figure-3-adaptive-airport-operating-model.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/figure-3-adaptive-airport-operating-model.png` | 241 KB | 268 KB | 1600 x 1132 |
| `/content/dam/tcs-corp/images/what-we-do/industries/figure-3-mfg-update.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/figure-3-mfg-update.png` | 508 KB | 228 KB | 1600 x 980 |
| `/content/dam/tcs-corp/images/what-we-do/industries/figure1keyconsiderationsforfreshnessmonitoring-update.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/figure1keyconsiderationsforfreshnessmonitoring-update.png` | 806 KB | 276 KB | 1600 x 1116 |
| `/content/dam/tcs-corp/images/what-we-do/industries/figure2trackingwastagetoimprovefreshnessmonitoring-update.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/figure2trackingwastagetoimprovefreshnessmonitoring-update.png` | 313 KB | 120 KB | 1600 x 699 |
| `/content/dam/tcs-corp/images/what-we-do/industries/figure3industryreferenceforbenefitsevaluation-update.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/figure3industryreferenceforbenefitsevaluation-update.png` | 417 KB | 158 KB | 1600 x 1101 |
| `/content/dam/tcs-corp/images/what-we-do/industries/genai-editable-diagramsv1-1.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/genai-editable-diagramsv1-1.png` | 773 KB | 181 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/industries/graphics-reinventing-mobility-experience-wp.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/graphics-reinventing-mobility-experience-wp.png` | 279 KB | 122 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/industries/impact-due-to-overproduction.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/impact-due-to-overproduction.png` | 508 KB | 281 KB | 1600 x 882 |
| `/content/dam/tcs-corp/images/what-we-do/industries/insuring-driverless-future-infog1.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/insuring-driverless-future-infog1.png` | 96 KB | 195 KB | 1600 x 927 |
| `/content/dam/tcs-corp/images/what-we-do/industries/insuring-driverless-future-infog2.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/insuring-driverless-future-infog2.png` | 388 KB | 200 KB | 1600 x 870 |
| `/content/dam/tcs-corp/images/what-we-do/industries/realizing-tcs-algo-retail-v3.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/realizing-tcs-algo-retail-v3.png` | 728 KB | 168 KB | 1600 x 592 |
| `/content/dam/tcs-corp/images/what-we-do/industries/retail-sustainability-framework-value-chain-inline.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/retail-sustainability-framework-value-chain-inline.png` | 246 KB | 218 KB | 1600 x 1096 |
| `/content/dam/tcs-corp/images/what-we-do/industries/sdms-retailer-ecosystem.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/sdms-retailer-ecosystem.png` | 828 KB | 246 KB | 1600 x 1356 |
| `/content/dam/tcs-corp/images/what-we-do/industries/sustainable-aviation-manufacturing-practices-info-1.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/sustainable-aviation-manufacturing-practices-info-1.png` | 361 KB | 150 KB | 1600 x 1132 |
| `/content/dam/tcs-corp/images/what-we-do/industries/sustainable-aviation-manufacturing-practices-info-2.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/sustainable-aviation-manufacturing-practices-info-2.png` | 190 KB | 91 KB | 1600 x 1132 |
| `/content/dam/tcs-corp/images/what-we-do/industries/sustainable-aviation-manufacturing-practices-info-3.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/sustainable-aviation-manufacturing-practices-info-3.png` | 341 KB | 110 KB | 1600 x 1132 |
| `/content/dam/tcs-corp/images/what-we-do/industries/sustainable-aviation-manufacturing-practices-info-4.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/sustainable-aviation-manufacturing-practices-info-4.png` | 140 KB | 148 KB | 1600 x 1132 |
| `/content/dam/tcs-corp/images/what-we-do/industries/sustainable-aviation-manufacturing-practices-info-5.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/sustainable-aviation-manufacturing-practices-info-5.png` | 181 KB | 99 KB | 1600 x 1132 |
| `/content/dam/tcs-corp/images/what-we-do/industries/tcs-digigov-enterprise-portal-infographic.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/tcs-digigov-enterprise-portal-infographic.png` | 775 KB | 219 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/industries/tracking-and-measuring-tcs-web-influence-sales-diagrams-figure-1.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/tracking-and-measuring-tcs-web-influence-sales-diagrams-figure-1.png` | 185 KB | 72 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/industries/tracking-and-measuring-tcs-web-influence-sales-diagrams-figure-2.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/tracking-and-measuring-tcs-web-influence-sales-diagrams-figure-2.png` | 650 KB | 169 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/industries/unlock-exponential-business-outcomes-v3.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/unlock-exponential-business-outcomes-v3.png` | 433 KB | 223 KB | 1600 x 1008 |
| `/content/dam/tcs-corp/images/what-we-do/industries/zero-waste-manufacturing-circular-economy-figure-01.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/zero-waste-manufacturing-circular-economy-figure-01.png` | 337 KB | 179 KB | 1600 x 1132 |
| `/content/dam/tcs-corp/images/what-we-do/industries/zero-waste-manufacturing-circular-economy-figure-02.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/zero-waste-manufacturing-circular-economy-figure-02.png` | 771 KB | 213 KB | 1600 x 1132 |
| `/content/dam/tcs-corp/images/what-we-do/industries/zero-waste-manufacturing-circular-economy-figure-03.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/zero-waste-manufacturing-circular-economy-figure-03.png` | 787 KB | 212 KB | 1600 x 1132 |
| `/content/dam/tcs-corp/images/what-we-do/industries/zero-waste-manufacturing-circular-economy-figure-04.svg` | `/content/dam/tcs-corp/images/what-we-do/industries/zero-waste-manufacturing-circular-economy-figure-04.png` | 814 KB | 285 KB | 1600 x 1132 |
| `/content/dam/tcs-corp/images/what-we-do/products-platforms/02-revised.svg` | `/content/dam/tcs-corp/images/what-we-do/products-platforms/02-revised.png` | 1014 KB | 206 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/products-platforms/bancs-automated-loan-management-diagram.svg` | `/content/dam/tcs-corp/images/what-we-do/products-platforms/bancs-automated-loan-management-diagram.png` | 1045 KB | 158 KB | 1600 x 1121 |
| `/content/dam/tcs-corp/images/what-we-do/products-platforms/bancs-revolutionizing-digital-contracts-fig1.svg` | `/content/dam/tcs-corp/images/what-we-do/products-platforms/bancs-revolutionizing-digital-contracts-fig1.png` | 56 KB | 85 KB | 1600 x 909 |
| `/content/dam/tcs-corp/images/what-we-do/products-platforms/bancs-zero-downtime-solution-1-1.svg` | `/content/dam/tcs-corp/images/what-we-do/products-platforms/bancs-zero-downtime-solution-1-1.png` | 46 KB | 55 KB | 1600 x 581 |
| `/content/dam/tcs-corp/images/what-we-do/products-platforms/bancs-zero-downtime-solution-4-1.svg` | `/content/dam/tcs-corp/images/what-we-do/products-platforms/bancs-zero-downtime-solution-4-1.png` | 278 KB | 128 KB | 1600 x 960 |
| `/content/dam/tcs-corp/images/what-we-do/products-platforms/generative-reimagine-telelcom-ui-ux.svg` | `/content/dam/tcs-corp/images/what-we-do/products-platforms/generative-reimagine-telelcom-ui-ux.png` | 443 KB | 285 KB | 1600 x 1818 |
| `/content/dam/tcs-corp/images/what-we-do/products-platforms/hobs-uni-diarma-new.svg` | `/content/dam/tcs-corp/images/what-we-do/products-platforms/hobs-uni-diarma-new.png` | 210 KB | 134 KB | 1600 x 839 |
| `/content/dam/tcs-corp/images/what-we-do/products-platforms/image2-bancs-article.svg` | `/content/dam/tcs-corp/images/what-we-do/products-platforms/image2-bancs-article.png` | 297 KB | 118 KB | 1600 x 814 |
| `/content/dam/tcs-corp/images/what-we-do/products-platforms/mastercraft-info.svg` | `/content/dam/tcs-corp/images/what-we-do/products-platforms/mastercraft-info.png` | 449 KB | 145 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/products-platforms/single-event-processing-in-corporate-actions-chart1.svg` | `/content/dam/tcs-corp/images/what-we-do/products-platforms/single-event-processing-in-corporate-actions-chart1.png` | 846 KB | 179 KB | 1600 x 1127 |
| `/content/dam/tcs-corp/images/what-we-do/products-platforms/single-event-processing-in-corporate-actions-chart2.svg` | `/content/dam/tcs-corp/images/what-we-do/products-platforms/single-event-processing-in-corporate-actions-chart2.png` | 726 KB | 188 KB | 1600 x 1509 |
| `/content/dam/tcs-corp/images/what-we-do/services/766030935-mdm-in-supply-chains-01.svg` | `/content/dam/tcs-corp/images/what-we-do/services/766030935-mdm-in-supply-chains-01.png` | 275 KB | 229 KB | 1600 x 1132 |
| `/content/dam/tcs-corp/images/what-we-do/services/766030935-mdm-in-supply-chains-02.svg` | `/content/dam/tcs-corp/images/what-we-do/services/766030935-mdm-in-supply-chains-02.png` | 393 KB | 145 KB | 1600 x 1132 |
| `/content/dam/tcs-corp/images/what-we-do/services/autonomous-one.svg` | `/content/dam/tcs-corp/images/what-we-do/services/autonomous-one.png` | 586 KB | 245 KB | 1600 x 839 |
| `/content/dam/tcs-corp/images/what-we-do/services/autonomous-three.svg` | `/content/dam/tcs-corp/images/what-we-do/services/autonomous-three.png` | 382 KB | 132 KB | 1600 x 839 |
| `/content/dam/tcs-corp/images/what-we-do/services/autonomous-two-1.svg` | `/content/dam/tcs-corp/images/what-we-do/services/autonomous-two-1.png` | 775 KB | 119 KB | 1600 x 839 |
| `/content/dam/tcs-corp/images/what-we-do/services/cloud-platform-transforming-pharma-partnerships-figure-1.svg` | `/content/dam/tcs-corp/images/what-we-do/services/cloud-platform-transforming-pharma-partnerships-figure-1.png` | 140 KB | 143 KB | 1600 x 1132 |
| `/content/dam/tcs-corp/images/what-we-do/services/cloud-platform-transforming-pharma-partnerships-figure-2.svg` | `/content/dam/tcs-corp/images/what-we-do/services/cloud-platform-transforming-pharma-partnerships-figure-2.png` | 150 KB | 190 KB | 1600 x 1132 |
| `/content/dam/tcs-corp/images/what-we-do/services/diagram-02.svg` | `/content/dam/tcs-corp/images/what-we-do/services/diagram-02.png` | 224 KB | 212 KB | 1600 x 839 |
| `/content/dam/tcs-corp/images/what-we-do/services/digi-two-nw.svg` | `/content/dam/tcs-corp/images/what-we-do/services/digi-two-nw.png` | 209 KB | 124 KB | 1600 x 839 |
| `/content/dam/tcs-corp/images/what-we-do/services/digifleet-infographic-dmove-dpulse.svg` | `/content/dam/tcs-corp/images/what-we-do/services/digifleet-infographic-dmove-dpulse.png` | 170 KB | 207 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/services/digital-thread-and-genai-paper.svg` | `/content/dam/tcs-corp/images/what-we-do/services/digital-thread-and-genai-paper.png` | 239 KB | 116 KB | 1600 x 1081 |
| `/content/dam/tcs-corp/images/what-we-do/services/easy-implementation.svg` | `/content/dam/tcs-corp/images/what-we-do/services/easy-implementation.png` | 721 KB | 230 KB | 1600 x 839 |
| `/content/dam/tcs-corp/images/what-we-do/services/epc-solutions.svg` | `/content/dam/tcs-corp/images/what-we-do/services/epc-solutions.png` | 205 KB | 120 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/services/experience-layer.svg` | `/content/dam/tcs-corp/images/what-we-do/services/experience-layer.png` | 270 KB | 139 KB | 1600 x 839 |
| `/content/dam/tcs-corp/images/what-we-do/services/fig-1-1.svg` | `/content/dam/tcs-corp/images/what-we-do/services/fig-1-1.png` | 279 KB | 196 KB | 1600 x 1176 |
| `/content/dam/tcs-corp/images/what-we-do/services/fig-2-1.svg` | `/content/dam/tcs-corp/images/what-we-do/services/fig-2-1.png` | 536 KB | 231 KB | 1600 x 1176 |
| `/content/dam/tcs-corp/images/what-we-do/services/fig-3.svg` | `/content/dam/tcs-corp/images/what-we-do/services/fig-3.png` | 146 KB | 155 KB | 1600 x 1176 |
| `/content/dam/tcs-corp/images/what-we-do/services/fig-4.svg` | `/content/dam/tcs-corp/images/what-we-do/services/fig-4.png` | 631 KB | 289 KB | 1600 x 1121 |
| `/content/dam/tcs-corp/images/what-we-do/services/fig-5.svg` | `/content/dam/tcs-corp/images/what-we-do/services/fig-5.png` | 275 KB | 157 KB | 1600 x 1121 |
| `/content/dam/tcs-corp/images/what-we-do/services/fig-6.svg` | `/content/dam/tcs-corp/images/what-we-do/services/fig-6.png` | 268 KB | 216 KB | 1600 x 1121 |
| `/content/dam/tcs-corp/images/what-we-do/services/future-of-iot-pov-infographics-02.svg` | `/content/dam/tcs-corp/images/what-we-do/services/future-of-iot-pov-infographics-02.png` | 352 KB | 247 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/services/future-of-iot-pov-infographics.svg` | `/content/dam/tcs-corp/images/what-we-do/services/future-of-iot-pov-infographics.png` | 177 KB | 87 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/services/gen-ai-1.svg` | `/content/dam/tcs-corp/images/what-we-do/services/gen-ai-1.png` | 330 KB | 179 KB | 1600 x 902 |
| `/content/dam/tcs-corp/images/what-we-do/services/generative-ai-customer-service-transformation-fig3-new.svg` | `/content/dam/tcs-corp/images/what-we-do/services/generative-ai-customer-service-transformation-fig3-new.png` | 787 KB | 312 KB | 1600 x 1039 |
| `/content/dam/tcs-corp/images/what-we-do/services/generative-ai-customer-service-transformation-fig3.svg` | `/content/dam/tcs-corp/images/what-we-do/services/generative-ai-customer-service-transformation-fig3.png` | 43 KB | 167 KB | 1600 x 800 |
| `/content/dam/tcs-corp/images/what-we-do/services/generative-ai-customer-service-transformation-fig4.svg` | `/content/dam/tcs-corp/images/what-we-do/services/generative-ai-customer-service-transformation-fig4.png` | 749 KB | 221 KB | 1600 x 839 |
| `/content/dam/tcs-corp/images/what-we-do/services/image-03.svg` | `/content/dam/tcs-corp/images/what-we-do/services/image-03.png` | 55 KB | 108 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/services/iot-neural-manufacturing-2.svg` | `/content/dam/tcs-corp/images/what-we-do/services/iot-neural-manufacturing-2.png` | 268 KB | 143 KB | 1600 x 773 |
| `/content/dam/tcs-corp/images/what-we-do/services/key-three-sus.svg` | `/content/dam/tcs-corp/images/what-we-do/services/key-three-sus.png` | 440 KB | 111 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/services/lfs-heading.svg` | `/content/dam/tcs-corp/images/what-we-do/services/lfs-heading.png` | 184 KB | 114 KB | 1600 x 839 |
| `/content/dam/tcs-corp/images/what-we-do/services/rai-pov-fig-1.svg` | `/content/dam/tcs-corp/images/what-we-do/services/rai-pov-fig-1.png` | 641 KB | 173 KB | 1600 x 576 |
| `/content/dam/tcs-corp/images/what-we-do/services/rai-pov-fig-2-new.svg` | `/content/dam/tcs-corp/images/what-we-do/services/rai-pov-fig-2-new.png` | 517 KB | 179 KB | 1600 x 800 |
| `/content/dam/tcs-corp/images/what-we-do/services/rai-pov-fig-3.svg` | `/content/dam/tcs-corp/images/what-we-do/services/rai-pov-fig-3.png` | 379 KB | 119 KB | 1600 x 715 |
| `/content/dam/tcs-corp/images/what-we-do/services/rai-pov-fig-4.svg` | `/content/dam/tcs-corp/images/what-we-do/services/rai-pov-fig-4.png` | 369 KB | 150 KB | 1600 x 800 |
| `/content/dam/tcs-corp/images/what-we-do/services/recipe-for-superforecasting.svg` | `/content/dam/tcs-corp/images/what-we-do/services/recipe-for-superforecasting.png` | 165 KB | 114 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/services/reinventing-martech-platforms-precise-decisioning.svg` | `/content/dam/tcs-corp/images/what-we-do/services/reinventing-martech-platforms-precise-decisioning.png` | 203 KB | 118 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/services/servitalization.svg` | `/content/dam/tcs-corp/images/what-we-do/services/servitalization.png` | 922 KB | 239 KB | 1600 x 839 |
| `/content/dam/tcs-corp/images/what-we-do/services/sovereign-ai-fig1.svg` | `/content/dam/tcs-corp/images/what-we-do/services/sovereign-ai-fig1.png` | 193 KB | 179 KB | 3000 x 1259 |
| `/content/dam/tcs-corp/images/what-we-do/services/sustainability-revised.svg` | `/content/dam/tcs-corp/images/what-we-do/services/sustainability-revised.png` | 893 KB | 179 KB | 1600 x 839 |
| `/content/dam/tcs-corp/images/what-we-do/services/sustainability-three.svg` | `/content/dam/tcs-corp/images/what-we-do/services/sustainability-three.png` | 782 KB | 156 KB | 1600 x 839 |
| `/content/dam/tcs-corp/images/what-we-do/services/svg-newest.svg` | `/content/dam/tcs-corp/images/what-we-do/services/svg-newest.png` | 334 KB | 174 KB | 1600 x 842 |
| `/content/dam/tcs-corp/images/what-we-do/services/tsa-strategy-ensure-smooth-divestiture.svg` | `/content/dam/tcs-corp/images/what-we-do/services/tsa-strategy-ensure-smooth-divestiture.png` | 72 KB | 281 KB | 3000 x 1195 |
| `/content/dam/tcs-corp/images/what-we-do/services/updated-lfs.svg` | `/content/dam/tcs-corp/images/what-we-do/services/updated-lfs.png` | 122 KB | 159 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/what-we-do/services/value-drivers.svg` | `/content/dam/tcs-corp/images/what-we-do/services/value-drivers.png` | 324 KB | 158 KB | 1600 x 839 |
| `/content/dam/tcs-corp/images/who-we-are/tcs-way/infographic-tcs-performance-management-1.svg` | `/content/dam/tcs-corp/images/who-we-are/tcs-way/infographic-tcs-performance-management-1.png` | 540 KB | 210 KB | 1600 x 899 |
| `/content/dam/tcs-corp/images/who-we-are/worldwide/tcs-summit-north-america-pae-logo.svg` | `/content/dam/tcs-corp/images/who-we-are/worldwide/tcs-summit-north-america-pae-logo.png` | 63 KB | 49 KB | 1600 x 416 |
