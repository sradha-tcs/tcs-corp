---
id: "AUT-016"
title: "Accessibility Authoring Guide"
role: "Authoring"
topic: ""
audience: "Content authors, content managers, AEM authoring leads"
owner: "Content Lead / AEM Authoring Lead"
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

# Accessibility Authoring Guide

| Attribute | Value |
| --- | --- |
| Document ID | AUT-016 |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | What authors must do for accessibility |
| Scope | — |
| Prerequisites | — |
| Owner | Content Lead / AEM Authoring Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | — |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Accessibility responsibilities](#accessibility-responsibilities)
- [Images, alt text and decorative images](#images-alt-text-and-decorative-images)
- [Links and buttons](#links-and-buttons)
- [Responsibilities](#responsibilities)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Accessibility responsibilities

The code implements WCAG 2.1 AA behaviour ([AGENTS.md](https://github.com/sradha-tcs/tcs-corp/blob/main/AGENTS.md#blocks), "Accessibility"); authors are responsible for the content:

- One `h1` per page (Page Header, a Hero with H1 or a Title h1) and heading levels in order; don't choose a level for its size.
- Alt text for every informative image and every Lottie / file reference; empty only for decorative images.
- Meaningful link and button text (not "click here"); the Accessibility label fields of List Items and Cards where the visible text isn't enough.
- Captions for videos with speech (WebVTT, published as an asset).
- Don't rely on colour alone; use the Section Style and BG Color options, which keep the theme contrast.
- Use animations sparingly (one or two effects per page); reduced motion is honoured by the code.

## Images, alt text and decorative images

- Image fields have alt text fields; an empty alt marks the image as decorative (`alt=""`). Section backgrounds have their own alt field (`backgroundimagealt`) and default to decorative (`buildSectionBackground` in `scripts/scripts.js`).
- Authored icons are `img` with an empty alt (`decorateIcons` in `scripts/aem.js`); button arrows and list arrows are CSS masks, not content.
- Lottie animations: `role="img"` with the label, or `aria-hidden` without one; a non-image reference's link text is its Alt (`animationLabel`, `utils/media.js`; AGENTS.md "AEM delivery rules").
- Background videos are `aria-hidden` and their iframe has `tabindex="-1"`.
- Text over images (Hero, Teaser Background image / Card) relies on overlays; axe can't judge text over images, so the re-audit tested them in targeted browser checks ([re-audit](https://github.com/sradha-tcs/tcs-corp/blob/archive/docs-before-role-docs-2026-11-08/docs/audit/REAUDIT-2026-10-20.md), section 2).

## Links and buttons

- Actions are `<button>` elements; navigation is `<a href>`. Every button and link button goes through the button decorators (`decorators/button-decorator.js`, `icon-button-decorator.js`, `content-buttons-decorator.js`).
- **New tab**: `setLinkTarget` sets `target="_blank"` and `rel="noopener noreferrer"`; `announceNewTab(a, hint)` adds visually hidden text, or extends an existing `aria-label`, with the `opensInNewTab` placeholder (WCAG 3.2.5 practice). Used by the button decorator, card lists, Teaser, Page Header and Footer; social links add the hint to their hidden label. **Open**: the article author bio's "View LinkedIn profile" link opens a new tab without the hint (`decorators/author-bio-decorator.js`; handover F-52).
- Links in running text are underlined on dark backgrounds so they are not told apart by colour alone (theme contract).
- Disabled buttons use `aria-disabled="true"` or `:disabled`.

## Responsibilities

| Role | Responsibilities |
| --- | --- |
| Content authors | Write meaningful alt text, or leave it empty only for decorative images; choose heading levels in a logical order (one H1 per page, from the Page Header or the first Title); write link and button text that makes sense out of context; add captions / transcripts to videos; don't put information only in an animation, image or colour; check pages in the block library's language; keep placeholders translated |
| Developers | Use semantic elements and the shared decorators (buttons, links, headings, `announceNewTab`, `hideVisually`); keep all UI text in placeholders with an English fallback; keyboard support (Tab, Shift+Tab, Enter, Space, Escape, arrows, Home / End where the pattern needs it); visible focus; pause controls for moving content; reduced motion; semantic tokens for text colours so the theme contract applies; update the block README's Accessibility section |
| Designers | Provide colours that pass 4.5:1 (text) and 3:1 (non-text, focus) on every background, including the dark bands; sign off the contrast token change (audit); define focus, hover, disabled and error states; keep targets at least 1.5rem (24px, WCAG 2.5.8); design dark and Grey island combinations |
| QA | Run the axe harness at 1440 and 390px on the block library and curated pages; keyboard-test each changed block; check reduced motion, 200% zoom and 320px reflow; screen-reader runs when available; record results with the test vocabulary (Passed, Failed, Corrected and passed, Blocked, Not applicable) |
| Site administrators | Keep the placeholders (`/{locale}/placeholders.json`) complete per locale, including the accessibility strings (`opensInNewTab`, `pauseAnimation`, `playAnimation`, slide labels); publish error pages per locale; keep `<html lang>`-relevant metadata (language) correct |
| AI agents | Follow AGENTS.md "Accessibility" and this page; never claim a test that wasn't run; use `announceNewTab`, placeholders and the button decorators instead of re-implementing them; check new blocks inside the dark theme contract; record gaps as "Not recorded" or "Blocked" |

## Screenshots

> **Screenshot required**
>
> - Required screen: Accessibility Authoring Guide
> - Required role/access: AEM Sites author with Universal Editor (content author)
> - Required navigation steps: AEM Sites console > /content/tcs-corp/language-masters/en > open a page in Universal Editor
> - Reason unavailable: No AEM author access in the documentation program (access blocker AB-01)
> - Owner: Content Lead / AEM Authoring Lead (proposed)
> - Target completion date: To be confirmed

## Known limitations

- None recorded for this document.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
