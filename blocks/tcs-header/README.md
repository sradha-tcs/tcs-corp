# TCS Header

A key-value block with the TCS and TATA logos and their links (Figma *New Screens from New DS*,
"Nav Bar-NEW"). Allowed in sections (`models/_section.json`).

| Field | Notes |
|---|---|
| TCS Logo, TCS Logo Alt Text | Image; the alt text names the link (default "Tata Consultancy Services") |
| TCS Logo Link | Usually the locale Home page |
| TATA Logo, TATA Logo Alt Text | Image; default alt text "TATA Group" |
| TATA Logo Link | Usually https://www.tata.com/ |
| Additional tab | Anchor ID, Hide block, padding and margin (as every block) |

- **On the Navigation page** (the first section, before the menu list): the site header
  (`blocks/header`) takes its brand (TCS logo) and tools (TATA logo) from the block; the first
  other section is the menu. Without the block the nav page keeps its positional sections
  (brand, sections, tools).
- **Anywhere else:** the logo bar, logos together on mobile and tablet, TCS left and TATA right
  from 1200px.
- A logo without an image shows its alt text; without a link it isn't a link.

Output: `.tcs-header-bar` with `a.tcs-header-brand` and `a.tcs-header-group` (each holding the
picture); `blocks/header` relies on these two classes.
