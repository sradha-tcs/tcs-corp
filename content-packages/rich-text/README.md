# Rich Text block library package

`tcs-corp-rich-text-library-content-1.0.2.zip` (current; 1.0.0 and 1.0.1 were removed from the branch on 27 November 2026 and are in its history): an AEM content package (FileVault, group `tcs-corp`) with the block
library pages of the **Rich Text** block and the built-in **Text** component (KB-D-080, KB-D-082, KB-D-083), at most ten variations a page.

It is kept here, on the branch `feat/rte-rich-text`, because pushing to `sradha-tcs/tcs-corp-delivery`
(`archive/home-content-package/rich-text/`, where KB-D-070 keeps content packages) was refused (403). KB-D-081
(Proposed) records the exception; move it there once write access is available. The folder isn't served (`.hlxignore`).

| | |
|---|---|
| Filter | `/content/tcs-corp/design-block-master/en/block-library/rich-text` (only this tree; installing replaces it) |
| Pages | 9: the folder page `rich-text` (a List of the pages) and the 8 pages below |
| Variations | 73 (1.0.2 adds `text-component-styles` and `text-component-inline`: the built-in Text's styles as the Section's Text tab, KB-D-083; 1.0.1 added `rich-text-inline`: the Style options that replace the toolbar tools Edge Delivery doesn't publish, KB-D-082) |
| Images | `/content/dam/tcs-corp/block-library/images/wide-sample.jpg`, from the block library package (sradha-tcs/tcs-corp-delivery `archive/home-content-package/block-library/`): install that first on an environment without it |
| Code | Needs the Rich Text block, the Section Text tab and the editor toolbar of the branch `feat/rte-rich-text` (PR #293) on the site; without them the blocks don't render and Universal Editor doesn't offer the toolbar |
| Generator | `node tools/library/generate-rich-text-library.mjs` (from the current models; `--root language-master` for the other review root, `--version` for the package version) |

| Page | Variations |
|---|---|
| `rich-text-layout` | 10: Default; Alignment Center, Right, Justify; Width Medium, Narrow, Narrow + Center; Columns Two, Three, Two + Justify |
| `rich-text-typography` | 10: Text size Small, Large; Lead paragraph; Small + Secondary; Text colour Secondary, Brand; on Grey, Dark and Dark green Sections; an introduction (Center, Lead, Narrow, Large) |
| `rich-text-toolbar` | 10: Headings H2–H6; inline formatting (bold, italic, underline, strikethrough, code, superscript, subscript); nested lists; links; buttons (bold / italic / both / plain link); table; wide table; code block; image; special characters and quote |
| `rich-text-inline` | 9: Underlined text Underline, Brand colour, Secondary colour, Highlight; Brand with bold and a heading; Brand on a Dark Section; Highlight on a Dark green Section; Text direction Right to left; Links to other sites Open in a new tab |
| `rich-text-additional` | 7: Anchor ID; animations (Fade up; Slide left Slow; Scale in Fast On page load); padding; margin; Hide block |
| `text-component-styles` | 10: Section Text tab: Text alignment Center, Right, Justify; Text size Small, Large; First paragraph Lead; Text colour Secondary, Brand; Text columns Two, Three |
| `text-component-inline` | 8: Section Text tab: Underlined text Brand, Secondary, Highlight; Brand on Dark; Highlight on Dark green; Text direction Right to left; Links to other sites new tab; an introduction (Center, Lead, Large, Brand) |
| `text-component` | 9: the Text component's toolbar (no tables): headings, formatting, lists, links, buttons, image, code block, special characters and quote, on a Dark Section |

## Install

1. AEM author: **Tools > Deployment > Packages** (Package Manager) > **Upload Package**, choose the zip, then **Install**.
2. Open `/content/tcs-corp/design-block-master/en/block-library/rich-text` in the Sites console, select the folder page
   and its 8 child pages and **Quick Publish** them (or Manage Publication, including the children).
3. Check the published pages at `/design-block-master/en/block-library/rich-text/<page>`.

Checked before release: the zip (`unzip -t`), every `.content.xml` parses as XML and the rich text in it is balanced HTML;
the delivered markup of every page rendered in the preview at 1280 and 375px (`drafts/rich-text-library/`).
Installed on AEM: Not recorded. Installing a newer version replaces the tree (1.0.1 added `rich-text-inline`, 1.0.2 the two `text-component-*` style pages).

SHA-256 1.0.2: `a9f927c5100580069b3b803c5969b7ee2aeb3df6e80afcf6db4ad1121149449d` (24,414 bytes). Regenerating with the same
models gives the same file (fixed dates, no timestamps).
