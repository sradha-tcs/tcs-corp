---
id: "AUD-004"
title: "Accessibility Audit"
role: "Audit and remediation"
topic: ""
audience: "Technical lead, QA lead, documentation owner, product owner"
owner: "Documentation Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: []
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Accessibility Audit

| Attribute | Value |
| --- | --- |
| Document ID | AUD-004 |
| Audience | Technical lead, QA lead, documentation owner, product owner |
| Purpose | Automated DOM accessibility checks of the reference pages |
| Scope | — |
| Prerequisites | — |
| Owner | Documentation Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Summary (200 pages at 1440 px)](#summary-200-pages-at-1440-px)
- [Pages with findings](#pages-with-findings)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Summary (200 pages at 1440 px)

| Check | Total |
| --- | --- |
| Images without an alt attribute | 0 |
| Buttons without an accessible name | 0 |
| Links without a name | 0 |
| Heading level skips | 45 |
| Pages with duplicate ids | 0 |
| Pages without exactly one H1 | 43 |
| Pages without html lang | 0 |

## Pages with findings

| Page | img no alt | unnamed buttons | unnamed links | heading skips | duplicate ids | H1 |
| --- | --- | --- | --- | --- | --- | --- |
| block-library | 0 | 0 | 0 | 1 | — | 1 |
| block-library/accordion | 0 | 0 | 0 | 1 | — | 1 |
| block-library/anchor-list | 0 | 0 | 0 | 1 | — | 1 |
| block-library/animation | 0 | 0 | 0 | 1 | — | 1 |
| block-library/animation/background-animation | 0 | 0 | 0 | 0 | — | 7 |
| block-library/animation/background-by-block | 0 | 0 | 0 | 0 | — | 4 |
| block-library/animation/content-animation | 0 | 0 | 0 | 0 | — | 3 |
| block-library/cards | 0 | 0 | 0 | 1 | — | 1 |
| block-library/columns | 0 | 0 | 0 | 1 | — | 1 |
| block-library/columns-container | 0 | 0 | 0 | 1 | — | 1 |
| block-library/conversation-canvas | 0 | 0 | 0 | 1 | — | 1 |
| block-library/conversation-canvas/conversation-canvas | 0 | 0 | 0 | 0 | — | 0 |
| block-library/embed | 0 | 0 | 0 | 1 | — | 1 |
| block-library/filter-list | 0 | 0 | 0 | 1 | — | 1 |
| block-library/footer | 0 | 0 | 0 | 1 | — | 1 |
| block-library/footer/campaign-page | 0 | 0 | 0 | 0 | — | 0 |
| block-library/footer/default-footer-page | 0 | 0 | 0 | 0 | — | 0 |
| block-library/footer/footer-campaign | 0 | 0 | 0 | 0 | — | 0 |
| block-library/footer/footer-conversation-canvas | 0 | 0 | 0 | 0 | — | 0 |
| block-library/footer/footer-default | 0 | 0 | 0 | 0 | — | 0 |
| block-library/footer/footer-investors | 0 | 0 | 0 | 0 | — | 0 |
| block-library/form-variations | 0 | 0 | 0 | 1 | — | 1 |
| block-library/foundations | 0 | 0 | 0 | 1 | — | 1 |
| block-library/foundations/title | 0 | 0 | 0 | 0 | — | 2 |
| block-library/fragment | 0 | 0 | 0 | 1 | — | 1 |
| block-library/fragment/fragments | 0 | 0 | 0 | 1 | — | 1 |
| block-library/fragment/fragments/cta-banner | 0 | 0 | 0 | 0 | — | 0 |
| block-library/gen-carousel | 0 | 0 | 0 | 1 | — | 1 |
| block-library/gen-carousel/auto | 0 | 0 | 0 | 0 | — | 3 |
| block-library/gen-carousel/hero-slides | 0 | 0 | 0 | 0 | — | 3 |
| block-library/gen-carousel/manual-and-auto | 0 | 0 | 0 | 0 | — | 2 |
| block-library/gen-carousel/teaser-slides | 0 | 0 | 0 | 0 | — | 0 |
| block-library/header | 0 | 0 | 0 | 1 | — | 1 |
| block-library/header/nav-careers | 0 | 0 | 0 | 0 | — | 0 |
| block-library/header/nav-default | 0 | 0 | 0 | 0 | — | 0 |
| block-library/hero | 0 | 0 | 0 | 1 | — | 1 |
| block-library/hero/hero-ctas | 0 | 0 | 0 | 0 | — | 6 |
| block-library/hero/hero-motion | 0 | 0 | 0 | 0 | — | 4 |
| block-library/hero/hero-overview | 0 | 0 | 0 | 0 | — | 6 |
| block-library/hero/hero-styles | 0 | 0 | 0 | 0 | — | 14 |
| block-library/interactive-dashboard | 0 | 0 | 0 | 1 | — | 1 |
| block-library/list | 0 | 0 | 0 | 1 | — | 1 |
| block-library/modal | 0 | 0 | 0 | 1 | — | 1 |
| block-library/modal/fragments | 0 | 0 | 0 | 1 | — | 1 |
| block-library/modal/fragments/contact-form | 0 | 0 | 0 | 0 | — | 0 |
| block-library/modal/fragments/privacy-notice | 0 | 0 | 0 | 0 | — | 0 |
| block-library/modal/fragments/recognition | 0 | 0 | 0 | 0 | — | 0 |
| block-library/modal/fragments/terms | 0 | 0 | 0 | 0 | — | 0 |
| block-library/page-header | 0 | 0 | 0 | 1 | — | 1 |
| block-library/quote | 0 | 0 | 0 | 1 | — | 1 |
| block-library/quote/quote-variations | 0 | 0 | 0 | 1 | — | 3 |
| block-library/separator | 0 | 0 | 0 | 1 | — | 1 |
| block-library/table | 0 | 0 | 0 | 1 | — | 1 |
| block-library/table-list | 0 | 0 | 0 | 1 | — | 1 |
| block-library/tabs | 0 | 0 | 0 | 1 | — | 1 |
| block-library/tabs/fragments | 0 | 0 | 0 | 1 | — | 1 |
| block-library/tabs/fragments/cloud-overview | 0 | 0 | 0 | 0 | — | 0 |
| block-library/tabs/fragments/consulting-overview | 0 | 0 | 0 | 0 | — | 0 |
| block-library/tabs/fragments/security-overview | 0 | 0 | 0 | 0 | — | 0 |
| block-library/tabs/fragments/tab-industries | 0 | 0 | 0 | 0 | — | 0 |
| block-library/tabs/fragments/tab-overview | 0 | 0 | 0 | 0 | — | 0 |
| block-library/tabs/tab | 0 | 0 | 0 | 1 | — | 1 |
| block-library/tabs/tab-deep-link | 0 | 0 | 0 | 1 | — | 1 |
| block-library/tabs/tabs-fixed-width | 0 | 0 | 0 | 1 | — | 1 |
| block-library/tabs/tabs-section | 0 | 0 | 0 | 1 | — | 1 |
| block-library/teaser | 0 | 0 | 0 | 1 | — | 1 |
| block-library/teaser/title-sizes-and-weights | 0 | 0 | 0 | 3 | — | 1 |
| block-library/templates | 0 | 0 | 0 | 1 | — | 1 |
| block-library/templates/press-release-template | 0 | 0 | 0 | 1 | — | 1 |
| block-library/testimonial | 0 | 0 | 0 | 1 | — | 1 |
| block-library/video | 0 | 0 | 0 | 1 | — | 1 |
| curated-design-pages | 0 | 0 | 0 | 1 | — | 1 |
| curated-design-pages/forms/ar-landing | 0 | 0 | 0 | 0 | — | 0 |
| curated-design-pages/forms/csr | 0 | 0 | 0 | 0 | — | 0 |
| curated-design-pages/forms/csr-form | 0 | 0 | 0 | 0 | — | 0 |
| curated-design-pages/forms/global-contact-us | 0 | 0 | 0 | 0 | — | 0 |
| curated-design-pages/forms/inquizitive | 0 | 0 | 0 | 0 | — | 0 |
| curated-design-pages/forms/media-form | 0 | 0 | 0 | 0 | — | 0 |
| curated-design-pages/forms/talk-to-an-expert-retail | 0 | 0 | 0 | 0 | — | 0 |
| curated-design-pages/forms/website-feedback-form | 0 | 0 | 0 | 0 | — | 0 |
| curated-design-pages/insights | 0 | 0 | 0 | 1 | — | 1 |
| curated-design-pages/media-and-investor | 0 | 0 | 0 | 1 | — | 1 |
| curated-design-pages/product | 0 | 0 | 0 | 0 | — | 0 |
| curated-design-pages/services | 0 | 0 | 0 | 0 | — | 2 |
| curated-design-pages/who-we-are | 0 | 0 | 0 | 0 | — | 3 |

Keyboard, focus order, contrast and screen reader checks: Not Run (AB-05). Block library pages show several examples of the same block, so some findings (duplicate ids, several H1) are expected on them.

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../SCREENSHOT-REGISTER.md).

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
