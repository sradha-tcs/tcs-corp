# Handover Documentation

Handover guides for the TCS Corporate website (AEM Edge Delivery Services with Universal Editor), generated on October 11, 2026.

| Guide | Audience | Covers |
|---|---|---|
| [AUTHOR-GUIDE.pdf](AUTHOR-GUIDE.pdf) | Content authors and managers | The 13 locale sites, pages to create per locale (references, error pages, block library, sheets, data), Site Global Templates, page properties, blocks, sheets and publishing |
| [DEVELOPER-GUIDE.pdf](DEVELOPER-GUIDE.pdf) | Developers | Architecture, `scripts.js`, locale utils (`utils/site.js`), decorators and utils, templates, `paths.json` generation (`npm run build:paths`), design system, blocks, models, common tasks |
| [ADMIN-GUIDE.pdf](ADMIN-GUIDE.pdf) | Site administrators | Configuration service, path mapping, bulk metadata sources, redirects (CDN), error pages, indexing and sitemap, adding a locale, status and troubleshooting |

The guides are not served on the website (`docs/` is listed in `.hlxignore`). Regenerate them with the project-management handover tooling when the site structure or code changes.
