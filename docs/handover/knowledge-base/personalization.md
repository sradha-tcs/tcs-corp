# Personalization

This file records the verified state of personalization on the TCS Corporate Website: there is no personalization runtime, no audience and no decision scope, and every block renders its authored default content for every visitor. It lists what exists that a future implementation could build on, which data could feed it, and the requirements any future design must meet. The requirements are recorded from the handover and the audits; none of them is implemented behaviour.

| Attribute | Value |
| --- | --- |
| Audience | Product owner, solution architects, developers, analytics and personalization teams, QA, AI agents |
| Source of truth | The code ([`blocks/`](../../../blocks/README.md), [`utils/metadata.js`](../../../utils/metadata.js), [`helix-query.yaml`](../../../helix-query.yaml), [`scripts/delayed.js`](../../../scripts/delayed.js)), the block READMEs (Personalization sections), [`docs/audit/BLOCK-ECOSYSTEM-AUDIT.md`](../../../docs/audit/BLOCK-ECOSYSTEM-AUDIT.md) (section 8), handover Part 11 — Analytics & Data Layer (11.7.7) and Part 2 — Solution Architecture (2.9.8 Adobe Target) in [`TCS-CORP-HANDOVER.md`](../TCS-CORP-HANDOVER.md) |
| Last reviewed | Written from main at commit 2d06316 on 21 October 2026 |
| Status | Current (verified absence); Requires validation for any future design (blocked: personalization design, audiences, Adobe Target / AJO access) |

## Verified state

| Item | State | Evidence |
| --- | --- | --- |
| Adobe Target (at.js, Web SDK decisions, mboxes) | Not implemented | No Target, `alloy` or decision code in `blocks/`, `decorators/`, `utils/`, `scripts/`, `templates/` |
| Adobe Journey Optimizer (web channel, offers) | Not implemented | No AJO code |
| AEP Web SDK / Edge Network | Not configured (blocked: measurement plan) | `scripts/delayed.js` holds only a comment; see [Data layer and analytics](./data-layer-and-analytics.md) |
| Audiences, segments, visitor profiles | None | No audience source, no identity, no consent ([Security, privacy and consent](./security-privacy-consent.md)) |
| Decision scopes, activities, offers | None | — |
| Edge or server-side personalization | None | Edge Delivery serves the same cached HTML to every visitor |
| Experimentation (A/B tests) | None | No experimentation plugin or code |
| Personalized impressions in the data layer | None | No personalization events or fields in `decorators/data-layer-decorator.js` |
| Personalization fields in block dialogs | None | No `personalization` field in `models/` or `blocks/*/_*.json` |

## Decisions found

| Decision | Source |
| --- | --- |
| The Teaser's Personalization option (a class `personalization` and `data-personalization="true"` that nothing read) was removed from the dialog and the code; library content was migrated; Teasers authored with it still render | Handover revision 2.27 (19 October 2026), audit defect D-B-3 ([`docs/audit/BLOCK-ECOSYSTEM-AUDIT.md`](../../../docs/audit/BLOCK-ECOSYSTEM-AUDIT.md)), re-audit section 1 ([`docs/audit/REAUDIT-2026-10-20.md`](../../../docs/audit/REAUDIT-2026-10-20.md)), [`blocks/teaser/README.md`](../../../blocks/teaser/README.md) |
| Every block is classified "Not personalizable"; personalized rendering, fallback, flicker, cache-key and analytics tests are blocked until an approved personalization design exists | Audit section 8 |
| Area-specific navigation and footers are content choices (inherited Navigation / Footer pages), not audience personalization | [`blocks/header/README.md`](../../../blocks/header/README.md), [`blocks/footer/README.md`](../../../blocks/footer/README.md) |

Several handover chapters written before 2.27 (for example 1.6.2, 2.9.8, the Teaser chapter 6.11 Variation 66 and 16.4) still describe the Teaser marker; the code and revision 2.27 are authoritative.

## Block support

No block supports personalization: every block (see the inventory in [`blocks/README.md`](../../../blocks/README.md)) renders its authored default content, and each block README states "This block does not currently expose verified personalization behavior".

Script hooks that exist but have no caller in the repository:

| Hook | Block | Default without a caller |
| --- | --- | --- |
| `setConversationCanvasSuggestions(block, suggestions)` | Conversation Canvas (Primary, sticky) | The page's tag labels as suggestion pills ([`blocks/conversation-canvas/README.md`](../../../blocks/conversation-canvas/README.md)) |
| `setConversationCanvasFilters(block, tags)` | Conversation Canvas (Secondary) | No filter tags (the list stays hidden) |
| `conversation-canvas:search` DOM event (cancelable) | Conversation Canvas | The Search page with `?q=`, else a "not available" status |
| `form-variations:submit` DOM event with `detail.respondWith(promise)` | Form Variations | POST to the Submit action, else "not connected" |

These are integration points (code comments name a personalisation service as one possible caller), not personalization features.

## What a future implementation can build on

| Foundation | What it offers | Source |
| --- | --- | --- |
| Adobe Client Data Layer | Page entry (language, Page Type, tags, path), one component entry per block with a stable id (Anchor ID / Component ID, else `{block}-{n}`), `cmp:*` events | [Data layer and analytics](./data-layer-and-analytics.md) |
| Default content of every block | The authored content renders for everyone and is the natural fallback | Block READMEs; Edge Delivery cached HTML |
| Additional tab | Anchor ID (a stable block id and component id for targeting), Hide block, spacing and animation classes on every block model except header and footer | [`AGENTS.md`](../../../AGENTS.md) (Additional tab), [`decorators/block-options-decorator.js`](../../../decorators/block-options-decorator.js) |
| Page metadata | Page properties and the bulk metadata columns, read by `getPageMetadata()` | [`utils/metadata.js`](../../../utils/metadata.js) |
| Query index | Metadata columns indexed per page (below) | [`helix-query.yaml`](../../../helix-query.yaml), [`utils/query-index.js`](../../../utils/query-index.js) |
| Delayed phase | `scripts/delayed.js`, imported 3 seconds after load, where the planned Tags / Web SDK embed goes | [`scripts/scripts.js`](../../../scripts/scripts.js) `loadDelayed` |
| Shared DOM events | `tabs:change`, `tabs:reveal`, `header:menu`, `conversation-canvas:search`, `form-variations:submit` | [`AGENTS.md`](../../../AGENTS.md) (Shared events and helpers) |

## Data that could feed personalization

| Data | Where it is available today | Current use |
| --- | --- | --- |
| `persona` | Bulk metadata column, `getPageMetadata().persona`, query index `persona` | None in blocks (handover 14.9, item 17) |
| `region`, `country`, `language` | Metadata columns, query index; `xdm:language` in the data layer page entry | `region` selects the contacts of the Media Contacts block (`blocks/media-contacts/media-contacts.js`, `inRegion`): page metadata, not the visitor |
| `campaign-id` | Metadata column, `getPageMetadata().campaignId`, query index `campaignId` | None |
| `page-type`, `content-type`, `category`, tags | Metadata, query index, data layer (`xdm:template`, `xdm:tags`) | Templates, Page Header, List, Filter List |
| `featured`, `priority` | Metadata, query index | Filter List spotlight and featured cards |
| Data sheets (`authors`, `locations`, `partners`, `social-links`, `media-contacts`; `region` columns) | `utils/data.js` | Page Header, footer, Press Release |

All of these describe the page, not the visitor. No visitor attribute (segment, behaviour, geolocation, login) is collected.

## Requirements for any future personalization

Requirements recorded for a future design; none is implemented, and the design itself is a blocked dependency (audit section 9: activities, audiences, the personalization design).

| Area | Requirement | Source |
| --- | --- | --- |
| Default content and fallback | The authored content stays the default and renders when no decision arrives, the service fails or consent is denied | Handover 2.9.8 (failure handling), audit section 7 (Personalization: denied → default content) |
| Consent | No decision request before consent; the consent model and categories must be approved first | Handover 11.7.6, audit section 7 |
| Identity | An identity strategy (Web SDK ECID or other) must be decided; none exists | Not recorded (blocked) |
| Caching | Edge Delivery serves the same cached default content to every visitor; the design must define where variants are applied (browser or edge) and how they interact with the cache (cache keys) | Audit section 8 (cache-key tests blocked) |
| Flicker and performance | Personalizing above-the-fold content conflicts with the eager LCP phase; any pre-hiding needs a performance review; keep the Core Web Vitals targets | Handover 2.9.8 and 11.7.7 |
| Security | Offer content must respect the CSP (`strict-dynamic`) and be inserted with DOM APIs | Handover 2.9.8 |
| Accessibility | Personalized content must meet the same WCAG 2.1 AA rules as the block it replaces (headings, names, focus, placeholders for UI text) | [`AGENTS.md`](../../../AGENTS.md) (Accessibility) |
| Analytics | Personalized impressions and decisions must be measurable through the existing data layer (no parallel tracking) | [Data layer and analytics](./data-layer-and-analytics.md) |
| Authoring and QA modes | Nothing personalized in Universal Editor edit mode; preview, live and a forced-variant QA mode need defining | Blocked (personalization design) |

## Validation status

| Test | Status |
| --- | --- |
| Default content of every block renders (no personalization) | Passed (audit runtime runs: 940 page loads, no block not loaded) |
| Personalized rendering, fallback, flicker, cache key, personalized analytics | Blocked: approved personalization design, Adobe Target / AJO access |

## Related

- [Architecture](./architecture.md), [Blocks](./blocks.md), [Indexing and search](./indexing-and-search.md), [Decision log](./decision-log.md)
- [Data layer and analytics](./data-layer-and-analytics.md)
- [Security, privacy and consent](./security-privacy-consent.md)
- [`blocks/README.md`](../../../blocks/README.md) and the block READMEs (Personalization sections)
- [`AGENTS.md`](../../../AGENTS.md) (Site structure and site data: metadata columns)
- [`docs/audit/BLOCK-ECOSYSTEM-AUDIT.md`](../../../docs/audit/BLOCK-ECOSYSTEM-AUDIT.md) (sections 7, 8, 9)
- Handover Part 2 — Solution Architecture (2.9.8), Part 11 — Analytics & Data Layer (11.7.7), Part 16 — Handover Findings and Open Items Register ([`TCS-CORP-HANDOVER.md`](../TCS-CORP-HANDOVER.md))
