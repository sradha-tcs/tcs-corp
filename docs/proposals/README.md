# Proposals

Design proposals for the TCS Corporate website. A proposal describes the current state, the
gaps and a target design for review; it changes no code. Accepted proposals are implemented in
their own pull requests, and the handover (`docs/handover/TCS-CORP-HANDOVER.md`) and the block
READMEs are updated with them. The documents aren't served on the website (`docs/` is listed in
`.hlxignore`).

| Proposal | Date | Status | Summary |
|---|---|---|---|
| [Cards and Card refactoring](cards-card-refactoring.md) | 14 October 2026 | For review — decisions D-1 to D-6 open | Cards blocks made before the redesign lost their settings and original look; restores them (Classic) and extends the Cards container (sources, presentations, carousel, filtering) and the Card item (more fields), with shared code from List, Filter List and Gen Carousel |
| [Assets from a separate AEM Assets environment (EDAM)](remote-assets-edam.md) | 8 November 2026 | For review — decisions E-D1 to E-D5 open (KB-D-064) | All site assets in a separate AEM Assets environment, picked in Universal Editor with the Custom Content Advisor and delivered by Dynamic Media with OpenAPI URLs; the step-by-step plan for the migration packages (assets on EDAM, approval, page packages rebuilt with delivery URLs), the code changes and the decisions |
| [Redirects at the CDN](redirects-cdn.md) | 24 October 2026 | For review — decisions R-D1 to R-D4 open (KB-D-055) | The rules the production CDN applies in front of the site: `/` → `/en/`, the old tcs.com URLs of the 3,191 migrated pages (pattern rule and the Redirects sheets), the authored redirects of each locale; data, test cases, acceptance criteria, alternatives |
