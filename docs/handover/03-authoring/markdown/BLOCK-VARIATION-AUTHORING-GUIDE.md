---
id: "AUT-005"
title: "Block Variation Authoring Guide"
role: "Authoring"
topic: ""
audience: "Content authors, content managers, AEM authoring leads"
owner: "Content Lead / AEM Authoring Lead"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-13"
lastValidated: "2026-11-13"
sourceFiles: ["component-models.json"]
relatedComponents: []
relatedPages: []
confidence: "Medium"
primary: true
---

# Block Variation Authoring Guide

| Attribute | Value |
| --- | --- |
| Document ID | AUT-005 |
| Audience | Content authors, content managers, AEM authoring leads |
| Purpose | Which dialog option gives which variation, per block |
| Scope | — |
| Prerequisites | — |
| Owner | Content Lead / AEM Authoring Lead (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 13 November 2026 |
| Last validated | 13 November 2026 |
| Source files | component-models.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Accordion](#accordion)
- [Anchor List](#anchor-list)
- [Button](#button)
- [Cards](#cards)
- [Column Break](#column-break)
- [Columns](#columns)
- [Columns Container](#columns-container)
- [Conversation Canvas](#conversation-canvas)
- [Embed](#embed)
- [Filter List](#filter-list)
- [Footer](#footer)
- [Form Variations](#form-variations)
- [Fragment](#fragment)
- [Gen Carousel](#gen-carousel)
- [Hero](#hero)
- [Image Collage](#image-collage)
- [Interactive Dashboard](#interactive-dashboard)
- [List](#list)
- [Media Contacts](#media-contacts)
- [Modal](#modal)
- [Page Header](#page-header)
- [Quote](#quote)
- [Separator](#separator)
- [Tab](#tab)
- [Table](#table)
- [Table List](#table-list)
- [Tabs](#tabs)
- [TCS Header](#tcs-header)
- [Teaser](#teaser)
- [Testimonial](#testimonial)
- [Video](#video)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Accordion

No variation option.

## Anchor List

No variation option.

## Button

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Button | Style | View | Button, Icon, Link |
| Button | Style | Type | Primary, Secondary, Tertiary |
| Button | Style | Icon | Arrow right, Chevron right, Chevron down, Search |
| Button | Style | Alignment | Left, Center, Right |
| Button | Style | Text Decoration | Default, Overline, line-Through, Underline, underline overline |

## Cards

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Cards | Content | Heading type | H2, H3, H4, H5, H6 |
| Cards | Content | CTA style | Text link, Primary button, Secondary button |
| Cards | Display | Card style | Image card, Panel, Report, Statistic, Mixed |
| Cards | Display | Card colour | Default for the style, Dark, Navy, Brand blue, Light blue, Light grey, Mid grey, Grey gradient, Image background |
| Cards | Display | Image ratio | 16:9, 1:1, 4:3, 3:2 |
| Cards | Display | Panel height | Portrait (2:3), Compact, Content |
| Cards | Display | Date format | 04 Sep 26, 04-09-2026, 09-04-2026, Sep 4, 2026, 04/09/26, 4th September 2026 |
| Cards | Display | Image loading | Lazy, Eager (first screen) |
| Cards | Display | Desktop display | Grid, Horizontal scroll |
| Cards | Display | Tablet display | Grid, Horizontal scroll |
| Cards | Display | Mobile display | Grid, Horizontal scroll |
| Cards | Display | Snap alignment | Start, Center |
| Cards | Display | Scroll step | One card, Viewport |
| Cards | Display | Edge | Cards run to the edge, Inside the content width |
| Cards | Display | When there are no cards | Hide the block, Show a message |
| Cards | Display | Style options | Compact statistic title, Dividers between rows, Header centred |
| Card | Link | Open in a new tab | As the block, Yes, No |
| Card | Display | Card style | As the block, Image card, Panel, Report, Statistic |
| Card | Display | Card colour | As the block, Dark, Navy, Brand blue, Light blue, Light grey, Mid grey, Grey gradient, Image background |

## Column Break

No variation option.

## Columns

No variation option.

## Columns Container

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Columns Container | Content | Style | Columns Container, Highlight |
| Columns Container | Content | BG Color | Default, Grey, Dark, Dark green, Navy |
| Columns Container | Content | Width Type | Full Width, Fixed Width |
| Columns Container | Layout | Columns per row | Automatic, 1, 2, 3, 4 |
| Columns Container | Layout | Gap | None, Small, Medium, Large |
| Columns Container | Layout | Vertical alignment | Top, Middle, Bottom, Stretch (equal heights) |
| Columns Container | Layout | Side by side from | Tablet (600px), Desktop (900px), Large desktop (1200px) |
| Columns Container | Additional | Animation Type | None, Fade in, Fade up, Fade down, Fade left, Fade right, Slide up, Slide down, Slide left, Slide right, Scale in |
| Columns Container | Additional | Motion Speed | Medium, Fast, Slow |
| Columns Container | Additional | Animation Trigger | On Scroll / Viewport Entry, On Page Load |
| Columns Container | Additional | Padding left | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Columns Container | Additional | Padding right | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Columns Container | Additional | Padding top | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Columns Container | Additional | Padding bottom | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Columns Container | Additional | Margin left | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Columns Container | Additional | Margin right | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Columns Container | Additional | Margin top | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Columns Container | Additional | Margin bottom | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |

## Conversation Canvas

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Conversation Canvas | Content | Canvas Style | Default, Primary (sticky), Secondary |
| Conversation Canvas | Content | Floating journey | Floats and docks, Stays in place |
| Conversation Canvas | Content | Quick actions | Auto, Pills, Buttons |
| Conversation Canvas | Content | BG Style | Default, Dark (Primary) |
| Conversation Canvas | Content | Title Type | Default, Bigger Title, Medium Title |
| Conversation Canvas | Content | Navigation style | Pills, Text links |
| Conversation Canvas | Content | Search bar › Search bar button icon type | Primary, Secondary, Tertiary |
| Conversation Canvas Button | — | Views | Button, Icon, Link |
| Conversation Canvas Button | — | Type | Primary, Secondary, Tertiary |
| Conversation Canvas Button | — | Icon | Arrow right, Chevron right, Chevron down, Search |

## Embed

No variation option.

## Filter List

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Filter List | Content | Default layout | Masonry, Grid, List |
| Filter List | Content | Datasource | Query Index, Manual List |
| Filter List | Content | Page types | Article, Blog, Press release |
| Filter List | Content | Content types | Article, Blog, Insights, Case study, Whitepaper, Report, News, Event, Press release |
| Filter List | Content | Sort by | Latest First, Featured First, Priority, Alphabetical |
| Filter List | Content | Filter logic | AND, OR |
| Filter List | Cards | Card style | Default, Compact, Featured, Mixed |
| Filter List | Cards | Featured rule | Marked as featured (featured metadata), Priority 1 to 3 (priority metadata), Manual |
| Filter List | Cards | Hero rule | Latest, Featured, Manual |
| Filter Page | Page | Use | Listed (Manual List), Featured |

## Footer

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Footer | — | Link List › Link Type | Default, Open in new window |
| Footer Link | — | Open in | Same tab, New tab |

## Form Variations

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Form Variations | Content | Theme | Default, Dark |
| Text Input Field | — | Input Type | Text, Email, Tel |

## Fragment

No variation option.

## Gen Carousel

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Gen Carousel | Content | Style | Default |
| Gen Carousel | Content | Navigation | Manual, Auto, Manual and Auto |
| Gen Carousel | Additional | Animation Type | None, Fade in, Fade up, Fade down, Fade left, Fade right, Slide up, Slide down, Slide left, Slide right, Scale in |
| Gen Carousel | Additional | Motion Speed | Medium, Fast, Slow |
| Gen Carousel | Additional | Animation Trigger | On Scroll / Viewport Entry, On Page Load |
| Gen Carousel | Additional | Padding left | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Gen Carousel | Additional | Padding right | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Gen Carousel | Additional | Padding top | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Gen Carousel | Additional | Padding bottom | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Gen Carousel | Additional | Margin left | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Gen Carousel | Additional | Margin right | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Gen Carousel | Additional | Margin top | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Gen Carousel | Additional | Margin bottom | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |

## Hero

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Hero | Content | Hero Image type | Default, Lotto |
| Hero | Content | Hero View | Default, Contained image |
| Hero | Content | Title heading level | H1, H2 |
| Hero | Content | CTA List › CTA Text color | Default (Black), White |
| Hero | Content | CTA List › CTA Link Type | Default, Open in New Window |
| Hero | Content | CTA List › CTA view | Default, Primary, Secondary |
| Hero | Content | CTA List › Primary CTA BG Color (Primary only) | Default, Blue-cyan (azure) |
| Hero | Content | CTA List › Secondary CTA BG Color (Secondary only) | Default (transparent), Light grey, Black 40% |
| Hero | Content | CTA List › Secondary CTA Border color (Secondary only) | Default (as the BG Color), Black, White |
| Hero | Content | CTA List › CTA Arrow | Right, Down |
| Hero | Style | Vertical Alignment | Top, Middle, Bottom |
| Hero | Style | Horizontal Alignment | Left, Center, Right |
| Hero | Style | Text Alignment | Left align, Center align, Right align |
| Hero | Style | BG Color | Default, Light, no overlay, Dark blue, Dark blue (subtle), Black, Charcoal Black 80 (cool charcoal), Midnight Navy 60, Charcoal Black 40 (deep charcoal) |
| Hero | Style | Icon color | Default (as authored), Black, White, Blue, Pale blue |
| Hero | Style | Eyebrow color | Default (royal blue), Royal blue, Soft sky blue |
| Hero | Style | Title color | Default, Black, White |
| Hero | Style | Description color | Default, Black, White |
| CTA | — | CTA Link Type | Default, Open in New Window |
| CTA | — | CTA view | Default, Primary, Secondary |
| CTA | — | CTA Arrow | Auto (down for links to sections of this page), Right, Down |

## Image Collage

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Image Collage | Content | Title Type | H1, H2, H3, H4, H5, H6 |
| Image Collage | Content | Primary CTA Link Type | Default, Open in New Window |
| Image Collage | Content | Primary CTA Link Style | Primary Button, Primary Button (no arrow), Secondary Button, Secondary Button (no arrow) |
| Image Collage | Content | Primary CTA Background | Style default, White, Blue, Translucent white |
| Image Collage | Content | Primary CTA Shape | Style default, Rectangle |
| Image Collage | Content | Secondary CTA Link Type | Default, Open in New Window |
| Image Collage | Content | Secondary CTA Link Style | Primary Button, Primary Button (no arrow), Secondary Button, Secondary Button (no arrow) |
| Image Collage | Content | Secondary CTA Background | Style default, White, Blue, Translucent white |
| Image Collage | Content | Secondary CTA Shape | Style default, Rectangle |
| Image Collage | Style | Title weight | Layout default, Regular, Semibold |
| Image Collage | Style | Description size | Layout default, Regular (18px), Large (24px) |
| Image Collage | Style | Background color | Dark, Navy |
| Collage image item | Collage image | Image treatment | Black and white, Normal |

## Interactive Dashboard

No variation option.

## List

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| List | Content | Heading type | H2, H3, H4, H5, H6 |
| List | Content | CTA style | Text link, Primary button, Secondary button |
| List | Content | List source | Child pages, Fixed list, Tagged pages |
| List | Content | Match | Any of the tags, All of the tags |
| List | Content | Order by | Manual (as authored; path order for pages), Title, Last modified |
| List | Content | Sort order | Ascending, Descending |
| List | Display | Card style | Image card, Panel, Report, Statistic, Mixed |
| List | Display | Card colour | Default for the style, Dark, Navy, Brand blue, Light blue, Light grey, Mid grey, Grey gradient, Image background |
| List | Display | Image ratio | 16:9, 1:1, 4:3, 3:2 |
| List | Display | Panel height | Portrait (2:3), Compact, Content |
| List | Display | Date format | 04 Sep 26, 04-09-2026, 09-04-2026, Sep 4, 2026, 04/09/26, 4th September 2026 |
| List | Display | Image loading | Lazy, Eager (first screen) |
| List | Display | Desktop display | Grid, Horizontal scroll |
| List | Display | Tablet display | Grid, Horizontal scroll |
| List | Display | Mobile display | Grid, Horizontal scroll |
| List | Display | Snap alignment | Start, Center |
| List | Display | Scroll step | One card, Viewport |
| List | Display | Edge | Cards run to the edge, Inside the content width |
| List | Display | When there are no items | Hide the list, Show a message, Show the fallback items |
| List | Display | Style options | Compact statistic title, Dividers between rows, Header centred |
| List Item | Link | Open in a new tab | As the list, Yes, No |
| List Item | Display | Card style | As the list, Image card, Panel, Report, Statistic |
| List Item | Display | Card colour | As the list, Dark, Navy, Brand blue, Light blue, Light grey, Mid grey, Grey gradient, Image background |

## Media Contacts

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Media Contacts | Content | Title Type | H1, H2, H3, H4, H5, H6 |

## Modal

No variation option.

## Page Header

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Page Header | Style | Layout | Default (from the Page Type), Landing (with the featured image), Secondary (title left, text right), Article (meta row, author), Display (large title) |
| Page Header | CTAs | CTA List › CTA Link Type | Default, Open in New Window |
| Page Header | CTAs | CTA List › CTA Link Style | Text link, Primary Button, Secondary Button |
| CTA | — | CTA Link Type | Default, Open in New Window |
| CTA | — | CTA Link Style | Text link, Primary Button, Secondary Button |
| CTA | — | Button background | Style default, Blue |
| CTA | — | Button shape | Style default, Round |

## Quote

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Quote | Content | Title Type | H1, H2, H3, H4, H5, H6 |
| Quote | Content | Image Position (Desktop) | Right, Left |
| Quote | Content | Image Position (Mobile) | Top, Bottom |
| Quote | Content | BG Color | Default, Grey |

## Separator

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Separator | General | Accessibility mode | Decorative (visual only), Semantic (a thematic break) |
| Separator | General | Separator variant | Default, Subtle, Strong, Inset, Full width, Dotted, Dashed, Gradient, Branded |
| Separator | General | Theme | Auto (as the section), Light background, Dark background, Brand background |
| Separator | Style | Line style | As the variant, Solid, Dashed, Dotted, Gradient, None (spacing only) |
| Separator | Style | Line thickness | As the variant, Thin (1px), Medium (2px), Thick (3px) |
| Separator | Style | Line colour | As the variant, Default, Subtle, Neutral, Strong, Primary (brand), Secondary (light brand), Accent, Inverse (on dark) |
| Separator | Style | Line opacity | 25%, 50%, 75%, 100% |
| Separator | Style | Separator width | As the variant, 25%, 50%, 75%, 100%, Content width, Full bleed (section edge to edge) |
| Separator | Style | Maximum width | None, Small (320px), Medium (640px), Large (960px), Extra large (1280px), Content container |
| Separator | Style | Alignment | Start, Center, End |
| Separator | Style | Start decoration | None, Dot, Square, Diamond |
| Separator | Style | Center decoration | None, Dot, Square, Diamond |
| Separator | Style | End decoration | None, Dot, Square, Diamond |
| Separator | Style | Background contrast | Standard, High (stronger line) |
| Separator | Style | Desktop width | As Appearance, 25%, 50%, 75%, 100%, Content width, Full bleed (section edge to edge) |
| Separator | Style | Desktop thickness | As Appearance, Thin (1px), Medium (2px), Thick (3px) |
| Separator | Style | Desktop alignment | As Appearance, Start, Center, End |
| Separator | Style | Tablet width | As Appearance, 25%, 50%, 75%, 100%, Content width, Full bleed (section edge to edge) |
| Separator | Style | Tablet thickness | As Appearance, Thin (1px), Medium (2px), Thick (3px) |
| Separator | Style | Tablet alignment | As Appearance, Start, Center, End |
| Separator | Style | Mobile width | As Appearance, 25%, 50%, 75%, 100%, Content width, Full bleed (section edge to edge) |
| Separator | Style | Mobile thickness | As Appearance, Thin (1px), Medium (2px), Thick (3px) |
| Separator | Style | Mobile alignment | As Appearance, Start, Center, End |
| Separator | Style | Desktop top spacing | Default, None, 2XS (4px), XS (8px), Small (16px), Medium (24px), Large (40px), XL (64px), 2XL (80px) |
| Separator | Style | Desktop bottom spacing | Default, None, 2XS (4px), XS (8px), Small (16px), Medium (24px), Large (40px), XL (64px), 2XL (80px) |
| Separator | Style | Tablet top spacing | Default, None, 2XS (4px), XS (8px), Small (16px), Medium (24px), Large (40px), XL (64px), 2XL (80px) |
| Separator | Style | Tablet bottom spacing | Default, None, 2XS (4px), XS (8px), Small (16px), Medium (24px), Large (40px), XL (64px), 2XL (80px) |
| Separator | Style | Mobile top spacing | Default, None, 2XS (4px), XS (8px), Small (16px), Medium (24px), Large (40px), XL (64px), 2XL (80px) |
| Separator | Style | Mobile bottom spacing | Default, None, 2XS (4px), XS (8px), Small (16px), Medium (24px), Large (40px), XL (64px), 2XL (80px) |
| Separator | Style | Animate on view | None, Fade, Draw from start, Draw from center |
| Separator | Style | Reduced motion fallback | Show immediately, Short fade |
| Separator | Style | Print | Show when printed, Hide when printed |

## Tab

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Tab | Content | Columns per row | Automatic, 1, 2, 3, 4 |

## Table

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Table | Content | Options | Border, Header |
| Table | Content | Columns | 1 Column, 2 Columns, 3 Columns, 4 Columns, 5 Columns, 6 Columns, 7 Columns, 8 Columns, 9 Columns |

## Table List

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Table List | Content | Variation | Variation 1 - Title, description, arrow, Variation 2 - Description, large title, button, Variation 3 - Description, number, large title, arrow, Variation 4 - Wide title, grey description, arrow (row hover), Variation 5 - Label, large description (steps), Variation 6 - Description, right-aligned title, small arrow |
| Table List | Content | Background color | White (default), Black, Dark Green, Navy |
| Table List | Content | Heading Type | H2, H3, H4 |
| Table List | Content | Heading position | Above the list, Beside the list |
| Table List | Content | Style | Variation default, Filled button, Outline button, Text link |
| Table List | Items | Numbers | Variation default, Show, Show on mobile only, Hide |
| Table List | Items | Item link | Variation default, Arrow, Diagonal arrow, Circled arrow, Button |
| Table List Item | — | Trademark | None, ™ Trademark, ® Registered |

## Tabs

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Tabs Container | Content | Component | Tabs |
| Tabs Container | Content | Width Type | Full Width, Fixed Width |
| Tabs Container | Styles | Style | Underline, Boxed, Pills |
| Tabs Container | Styles | Alignment | Left, Center, Full width (stretch) |
| Tabs Container | Styles | Orientation | Horizontal, Vertical |
| Tabs Container | Additional | Animation Type | None, Fade in, Fade up, Fade down, Fade left, Fade right, Slide up, Slide down, Slide left, Slide right, Scale in |
| Tabs Container | Additional | Motion Speed | Medium, Fast, Slow |
| Tabs Container | Additional | Animation Trigger | On Scroll / Viewport Entry, On Page Load |
| Tabs Container | Additional | Padding left | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Tabs Container | Additional | Padding right | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Tabs Container | Additional | Padding top | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Tabs Container | Additional | Padding bottom | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Tabs Container | Additional | Margin left | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Tabs Container | Additional | Margin right | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Tabs Container | Additional | Margin top | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Tabs Container | Additional | Margin bottom | Default, 0 (none), 0.25rem (space-100), 0.5rem (space-200), 0.75rem (space-300), 1rem (space-400), 1.25rem (space-500), 1.5rem (space-600), 2rem (space-800), 2.5rem (space-1000), 3rem (space-1200), 4rem (space-1600), 5rem (space-2000), 6rem (space-2400), 7.5rem (space-3000) |
| Tabs | Styles | Style | Underline, Boxed, Pills |
| Tabs | Styles | Alignment | Left, Center, Full width (stretch) |
| Tabs | Styles | Orientation | Horizontal, Vertical |

## TCS Header

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| TCS Header | Content | Header over the first block | Auto (over a light Hero), Always (over the first block), Never (the page starts below the header) |

## Teaser

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Teaser | Content | Title Type | H1 (64px), H2 (48px), H3 (40px), H4 (28px), H5 (24px), H6 (20px) |
| Teaser | Content | Date Format | DD-MM-YYYY, MM-DD-YYYY, MMM d, yyyy, DD/MM/YY |
| Teaser | Content | Image type | Default, Lottie |
| Teaser | Content | Image position | Left, Right, Top, Bottom |
| Teaser | Content | Image position (mobile) | Default, Top, Bottom |
| Teaser | Content | Image ratio | Default (10:9; 16:9 above or below the text; original in Text split), Portrait (8:9), Square (1:1), Original |
| Teaser | Content | Image corners | Rounded, Square |
| Teaser | Content | Links (authored before Link items) › CTA Link Type | Default, Open in New Window |
| Teaser | Content | Links (authored before Link items) › CTA Link Style | Text link, List, Primary Button, Primary Button (no arrow), Secondary Button, Secondary Button (no arrow) |
| Teaser | Content | Links (authored before Link items) › CTA Background | Style default, White, Blue, Translucent white |
| Teaser | Content | Links (authored before Link items) › CTA Shape | Style default, Rectangle |
| Teaser | Content | List arrow | Right, Down right, None |
| Teaser | Content | Primary CTA Link Type | Default, Open in New Window |
| Teaser | Content | Primary CTA Link Style | Text link, List, Primary Button, Primary Button (no arrow), Secondary Button, Secondary Button (no arrow) |
| Teaser | Content | Primary CTA Background | Style default, White, Blue, Translucent white |
| Teaser | Content | Primary CTA Shape | Style default, Rectangle |
| Teaser | Content | Secondary CTA Link Type | Default, Open in New Window |
| Teaser | Content | Secondary CTA Link Style | Text link, List, Primary Button, Primary Button (no arrow), Secondary Button, Secondary Button (no arrow) |
| Teaser | Content | Secondary CTA Background | Style default, White, Blue, Translucent white |
| Teaser | Content | Secondary CTA Shape | Style default, Rectangle |
| Teaser | Style | Layout | Image & Text, Text split (title left, text right), Background image, Card, Image collage |
| Teaser | Style | BG Color | Default, Grey, Dark, Dark green, Navy |
| Teaser | Style | Text alignment | Layout default, Left, Center, Right, Justify |
| Teaser | Style | Vertical alignment | Layout default, Top, Center, Bottom |
| Teaser | Style | Title weight | Layout default, Regular, Semibold |
| Teaser | Style | Title color | Style default, Dark, White, Light blue |
| Teaser | Style | Description size | Layout default, Regular (18px), Large (24px) |
| Teaser | Style | Eyebrow Style | Brand, Label (uppercase, grey), Grey, White |
| Teaser | Style | Top spacing | Default, Page header (extra space above) |
| Teaser | Style | Link CTA Alignment | Default, Left |
| Link | — | CTA Link Type | Default, Open in New Window |
| Link | — | CTA Link Style | Text link, List, Primary Button, Primary Button (no arrow), Secondary Button, Secondary Button (no arrow) |
| Link | — | Button background | Style default, White, Blue, Translucent white |
| Link | — | Button shape | Style default, Rectangle |
| Collage image | Collage image | Image treatment | Black and white, Normal |

## Testimonial

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Testimonial | Content | Title Type | H1, H2, H3, H4, H5, H6 |
| Testimonial | Style | BG Color | Default, Grey, Navy |

## Video

| Component | Tab | Option | Choices |
| --- | --- | --- | --- |
| Video | Playback | Playback | Play button (on the poster image), Autoplay when in view (muted), Background video (autoplay, muted, loop, no controls) |
| Video | Playback | Aspect Ratio | 16:9 (widescreen), 4:3, 1:1 (square), 21:9 (cinema), 9:16 (vertical) |
| Video | Playback | Size | Full width, Large (900px), Medium (640px), Small (420px) |
| Video | Playback | Alignment | Center, Left, Right |

## Screenshots

> **Screenshot required**
>
> - Required screen: Block Variation Authoring Guide
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
| 1.0 | 13 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
