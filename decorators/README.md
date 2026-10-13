# Decorators

Decorators **create or decorate page elements** the same way in every block: buttons, links,
headings, images, tags, dates, media players and accessibility helpers. Each file has a single
purpose. Pure helpers that don't build UI (reading authored values, dates, URLs, environment
checks) live in [`../utils`](../utils/README.md).

| Decorator | Exports | Used by |
|---|---|---|
| `button-decorator.js` | `decorateButton`, `createButton`, `setButtonDisabled`, `setButtonAlignment`, `removeButtonDecoration` | most blocks, header |
| `icon-button-decorator.js` | `createIconButton` | gen-carousel, article meta decorator, modal, embed, video, conversation-canvas |
| `content-buttons-decorator.js` | `decorateButtons` (authored links in content become buttons) | `scripts.js`, `editor-support.js` |
| `link-decorator.js` | `setLinkTarget` (open in a new window) | button decorator, teaser |
| `heading-decorator.js` | `buildHeading` (Title + Title Type), `HEADINGS` | teaser, quote, testimonial, form-variations |
| `content-decorator.js` | `fromCell` (property content into an element, keeping editor instrumentation) | teaser, quote, testimonial, page-header, form-variations |
| `image-decorator.js` | `pictureOf` (image with its alt text field) | teaser, quote, testimonial, page-header |
| `responsive-image-decorator.js` | `buildImage` (image from a URL; site media optimized) | `scripts.js` (section backgrounds), conversation-canvas |
| `date-decorator.js` | `buildTime` (`<time>` for a date) | article meta decorator |
| `tag-decorator.js` | `buildTagList` | teaser, page-header |
| `media-decorator.js` | `createFrame`, `createYoutubeFrame`, `createVimeoFrame`, `createVideoElement` | embed, video |
| `animation-decorator.js` | `createAnimation`, `playAnimation` (Lottie animations of the Lotto image type, loaded when near the viewport) | hero, teaser |
| `article-meta-decorator.js` | `buildPublished`, `buildReadingTime`, `buildPageActions` (listen / download / share), `buildAuthorLockup` | page-header, teaser |
| `stats-decorator.js` | `buildStats` (Stats composite multifield as a description list) | testimonial, teaser |
| `seo-decorator.js` | `decorateHead` (bulk metadata SEO / social columns to the standard head tags, `<html lang>`) | `scripts.js` |
| `social-links-decorator.js` | `buildSocialLinks` (Social Links data sheet as an icon list) | footer |
| `template-decorator.js` | `ensurePageHeader`, `appendLoadedSection` (structure templates add before decoration) | article, blog, press-release templates |
| `author-bio-decorator.js` | `buildAuthorBio` (About the author from the Authors sheet) | article / blog template |
| `contact-list-decorator.js` | `buildContactList` (contacts with mail / phone links, e.g. Media Contacts) | press-release template |
| `a11y-decorator.js` | `hideVisually`, `createHiddenText` (with `.visually-hidden` in `styles/styles.css`) | teaser, testimonial, conversation-canvas |

## Guidelines

- New blocks use these decorators for buttons and shared behavior instead of setting classes
  or building the same elements themselves.
- Keep one purpose per file; add a new decorator rather than growing an unrelated one.
- Decorators may use utils; utils never import decorators.
