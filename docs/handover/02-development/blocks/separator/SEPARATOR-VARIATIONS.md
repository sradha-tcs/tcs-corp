---
id: "DEV-V-separator"
title: "Separator Block — Variations"
role: "Development"
topic: "variations"
audience: "Developers, technical leads, block owners, AI coding agents"
owner: "Technical Lead / Block Owner"
approver: "Product Owner (to be confirmed)"
version: "1.0"
status: "Draft for review"
lastUpdated: "2026-11-08"
lastValidated: "2026-11-08"
sourceFiles: ["blocks/separator/_separator.json"]
relatedComponents: ["separator"]
relatedPages: ["/design-block-master/en/block-library/separator","/design-block-master/en/block-library/separator/option-reference","/design-block-master/en/block-library/separator/separator-variations","/design-block-master/en/block-library/separator/theme-auto"]
confidence: "Medium"
primary: false
---

# Separator Block — Variations

| Attribute | Value |
| --- | --- |
| Document ID | DEV-V-separator |
| Audience | Developers, technical leads, block owners, AI coding agents |
| Purpose | Every option of the Separator block's dialog that changes its presentation, and whether the block library shows it |
| Scope | — |
| Prerequisites | — |
| Owner | Technical Lead / Block Owner (proposed) |
| Approver | Product Owner (to be confirmed) |
| Version | 1.0 |
| Status | Draft for review |
| Last updated | 8 November 2026 |
| Last validated | 8 November 2026 |
| Source files | blocks/separator/_separator.json |
| Related documents | — |
| Related AEM paths | — |

## Contents

- [Variation fields](#variation-fields)
- [Matrix](#matrix)
- [Narrative (block README)](#narrative-block-readme)
- [Screenshots](#screenshots)
- [Known limitations](#known-limitations)
- [Open items](#open-items)
- [Change history](#change-history)

## Variation fields

| Component | Field | Tab | Multiple | Options (label = value) | Default |
| --- | --- | --- | --- | --- | --- |
| `separator` | Accessibility mode (`accessibilityMode`) | General | No | Decorative (visual only) = `decorative`; Semantic (a thematic break) = `semantic` | `decorative` |
| `separator` | Separator variant (`variant`) | General | No | Default = `default`; Subtle = `subtle`; Strong = `strong`; Inset = `inset`; Full width = `full-width`; Dotted = `dotted`; Dashed = `dashed`; Gradient = `gradient`; Branded = `branded` | `default` |
| `separator` | Theme (`theme`) | General | No | Auto (as the section) = `auto`; Light background = `light`; Dark background = `dark`; Brand background = `brand` | `auto` |
| `separator` | Line style (`lineStyle`) | Style | No | As the variant = `""`; Solid = `solid`; Dashed = `dashed`; Dotted = `dotted`; Gradient = `gradient`; None (spacing only) = `none` | `` |
| `separator` | Line thickness (`lineThickness`) | Style | No | As the variant = `""`; Thin (1px) = `thin`; Medium (2px) = `medium`; Thick (3px) = `thick` | `` |
| `separator` | Line colour (`lineColor`) | Style | No | As the variant = `""`; Default = `default`; Subtle = `subtle`; Neutral = `neutral`; Strong = `strong`; Primary (brand) = `primary`; Secondary (light brand) = `secondary`; Accent = `accent`; Inverse (on dark) = `inverse` | `` |
| `separator` | Line opacity (`lineOpacity`) | Style | No | 25% = `25`; 50% = `50`; 75% = `75`; 100% = `100` | `100` |
| `separator` | Separator width (`width`) | Style | No | As the variant = `""`; 25% = `25-percent`; 50% = `50-percent`; 75% = `75-percent`; 100% = `100-percent`; Content width = `content-width`; Full bleed (section edge to edge) = `full-bleed` | `` |
| `separator` | Maximum width (`maxWidth`) | Style | No | None = `none`; Small (320px) = `small`; Medium (640px) = `medium`; Large (960px) = `large`; Extra large (1280px) = `extra-large`; Content container = `content-container` | `none` |
| `separator` | Alignment (`alignment`) | Style | No | Start = `start`; Center = `center`; End = `end` | `center` |
| `separator` | Start decoration (`startDecoration`) | Style | No | None = `none`; Dot = `dot`; Square = `square`; Diamond = `diamond` | `none` |
| `separator` | Center decoration (`centerDecoration`) | Style | No | None = `none`; Dot = `dot`; Square = `square`; Diamond = `diamond` | `none` |
| `separator` | End decoration (`endDecoration`) | Style | No | None = `none`; Dot = `dot`; Square = `square`; Diamond = `diamond` | `none` |
| `separator` | Background contrast (`contrastMode`) | Style | No | Standard = `standard`; High (stronger line) = `high` | `standard` |
| `separator` | Desktop width (`desktopWidth`) | Style | No | As Appearance = `inherit`; 25% = `25-percent`; 50% = `50-percent`; 75% = `75-percent`; 100% = `100-percent`; Content width = `content-width`; Full bleed (section edge to edge) = `full-bleed` | `inherit` |
| `separator` | Desktop thickness (`desktopThickness`) | Style | No | As Appearance = `inherit`; Thin (1px) = `thin`; Medium (2px) = `medium`; Thick (3px) = `thick` | `inherit` |
| `separator` | Desktop alignment (`desktopAlignment`) | Style | No | As Appearance = `inherit`; Start = `start`; Center = `center`; End = `end` | `inherit` |
| `separator` | Tablet width (`tabletWidth`) | Style | No | As Appearance = `inherit`; 25% = `25-percent`; 50% = `50-percent`; 75% = `75-percent`; 100% = `100-percent`; Content width = `content-width`; Full bleed (section edge to edge) = `full-bleed` | `inherit` |
| `separator` | Tablet thickness (`tabletThickness`) | Style | No | As Appearance = `inherit`; Thin (1px) = `thin`; Medium (2px) = `medium`; Thick (3px) = `thick` | `inherit` |
| `separator` | Tablet alignment (`tabletAlignment`) | Style | No | As Appearance = `inherit`; Start = `start`; Center = `center`; End = `end` | `inherit` |
| `separator` | Mobile width (`mobileWidth`) | Style | No | As Appearance = `inherit`; 25% = `25-percent`; 50% = `50-percent`; 75% = `75-percent`; 100% = `100-percent`; Content width = `content-width`; Full bleed (section edge to edge) = `full-bleed` | `inherit` |
| `separator` | Mobile thickness (`mobileThickness`) | Style | No | As Appearance = `inherit`; Thin (1px) = `thin`; Medium (2px) = `medium`; Thick (3px) = `thick` | `inherit` |
| `separator` | Mobile alignment (`mobileAlignment`) | Style | No | As Appearance = `inherit`; Start = `start`; Center = `center`; End = `end` | `inherit` |
| `separator` | Desktop top spacing (`desktopTopSpacing`) | Style | No | Default = `default`; None = `none`; 2XS (4px) = `2xs`; XS (8px) = `xs`; Small (16px) = `small`; Medium (24px) = `medium`; Large (40px) = `large`; XL (64px) = `xl`; 2XL (80px) = `2xl` | `default` |
| `separator` | Desktop bottom spacing (`desktopBottomSpacing`) | Style | No | Default = `default`; None = `none`; 2XS (4px) = `2xs`; XS (8px) = `xs`; Small (16px) = `small`; Medium (24px) = `medium`; Large (40px) = `large`; XL (64px) = `xl`; 2XL (80px) = `2xl` | `default` |
| `separator` | Tablet top spacing (`tabletTopSpacing`) | Style | No | Default = `default`; None = `none`; 2XS (4px) = `2xs`; XS (8px) = `xs`; Small (16px) = `small`; Medium (24px) = `medium`; Large (40px) = `large`; XL (64px) = `xl`; 2XL (80px) = `2xl` | `default` |
| `separator` | Tablet bottom spacing (`tabletBottomSpacing`) | Style | No | Default = `default`; None = `none`; 2XS (4px) = `2xs`; XS (8px) = `xs`; Small (16px) = `small`; Medium (24px) = `medium`; Large (40px) = `large`; XL (64px) = `xl`; 2XL (80px) = `2xl` | `default` |
| `separator` | Mobile top spacing (`mobileTopSpacing`) | Style | No | Default = `default`; None = `none`; 2XS (4px) = `2xs`; XS (8px) = `xs`; Small (16px) = `small`; Medium (24px) = `medium`; Large (40px) = `large`; XL (64px) = `xl`; 2XL (80px) = `2xl` | `default` |
| `separator` | Mobile bottom spacing (`mobileBottomSpacing`) | Style | No | Default = `default`; None = `none`; 2XS (4px) = `2xs`; XS (8px) = `xs`; Small (16px) = `small`; Medium (24px) = `medium`; Large (40px) = `large`; XL (64px) = `xl`; 2XL (80px) = `2xl` | `default` |
| `separator` | Animate on view (`animateOnView`) | Style | No | None = `none`; Fade = `fade`; Draw from start = `draw-from-start`; Draw from center = `draw-from-center` | `none` |
| `separator` | Reduced motion fallback (`reducedMotionFallback`) | Style | No | Show immediately = `static`; Short fade = `fade` | `static` |
| `separator` | Print (`printVisibility`) | Style | No | Show when printed = `show`; Hide when printed = `hide` | `show` |

## Matrix

Status: every option is supported by the model and the code that reads it. "In the block library" compares the option's class with the classes of the Separator blocks on the published block library pages (4 pages); options stored as data or field values can't be checked from the classes.

| Component | Field | Option | Value | Status | In the block library |
| --- | --- | --- | --- | --- | --- |
| separator | Accessibility mode | Decorative (visual only) | `decorative` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Accessibility mode | Semantic (a thematic break) | `semantic` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Separator variant | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Separator variant | Subtle | `subtle` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Separator variant | Strong | `strong` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Separator variant | Inset | `inset` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Separator variant | Full width | `full-width` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Separator variant | Dotted | `dotted` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Separator variant | Dashed | `dashed` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Separator variant | Gradient | `gradient` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Separator variant | Branded | `branded` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Theme | Auto (as the section) | `auto` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Theme | Light background | `light` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Theme | Dark background | `dark` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Theme | Brand background | `brand` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line style | As the variant | `""` | Supported (in the model) | n/a (default) |
| separator | Line style | Solid | `solid` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line style | Dashed | `dashed` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line style | Dotted | `dotted` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line style | Gradient | `gradient` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line style | None (spacing only) | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line thickness | As the variant | `""` | Supported (in the model) | n/a (default) |
| separator | Line thickness | Thin (1px) | `thin` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line thickness | Medium (2px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line thickness | Thick (3px) | `thick` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line colour | As the variant | `""` | Supported (in the model) | n/a (default) |
| separator | Line colour | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line colour | Subtle | `subtle` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line colour | Neutral | `neutral` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line colour | Strong | `strong` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line colour | Primary (brand) | `primary` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line colour | Secondary (light brand) | `secondary` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line colour | Accent | `accent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line colour | Inverse (on dark) | `inverse` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line opacity | 25% | `25` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line opacity | 50% | `50` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line opacity | 75% | `75` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Line opacity | 100% | `100` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Separator width | As the variant | `""` | Supported (in the model) | n/a (default) |
| separator | Separator width | 25% | `25-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Separator width | 50% | `50-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Separator width | 75% | `75-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Separator width | 100% | `100-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Separator width | Content width | `content-width` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Separator width | Full bleed (section edge to edge) | `full-bleed` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Maximum width | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Maximum width | Small (320px) | `small` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Maximum width | Medium (640px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Maximum width | Large (960px) | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Maximum width | Extra large (1280px) | `extra-large` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Maximum width | Content container | `content-container` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Alignment | Start | `start` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Alignment | Center | `center` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Alignment | End | `end` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Start decoration | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Start decoration | Dot | `dot` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Start decoration | Square | `square` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Start decoration | Diamond | `diamond` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Center decoration | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Center decoration | Dot | `dot` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Center decoration | Square | `square` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Center decoration | Diamond | `diamond` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | End decoration | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | End decoration | Dot | `dot` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | End decoration | Square | `square` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | End decoration | Diamond | `diamond` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Background contrast | Standard | `standard` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Background contrast | High (stronger line) | `high` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop width | As Appearance | `inherit` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop width | 25% | `25-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop width | 50% | `50-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop width | 75% | `75-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop width | 100% | `100-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop width | Content width | `content-width` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop width | Full bleed (section edge to edge) | `full-bleed` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop thickness | As Appearance | `inherit` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop thickness | Thin (1px) | `thin` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop thickness | Medium (2px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop thickness | Thick (3px) | `thick` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop alignment | As Appearance | `inherit` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop alignment | Start | `start` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop alignment | Center | `center` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop alignment | End | `end` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet width | As Appearance | `inherit` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet width | 25% | `25-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet width | 50% | `50-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet width | 75% | `75-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet width | 100% | `100-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet width | Content width | `content-width` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet width | Full bleed (section edge to edge) | `full-bleed` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet thickness | As Appearance | `inherit` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet thickness | Thin (1px) | `thin` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet thickness | Medium (2px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet thickness | Thick (3px) | `thick` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet alignment | As Appearance | `inherit` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet alignment | Start | `start` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet alignment | Center | `center` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet alignment | End | `end` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile width | As Appearance | `inherit` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile width | 25% | `25-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile width | 50% | `50-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile width | 75% | `75-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile width | 100% | `100-percent` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile width | Content width | `content-width` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile width | Full bleed (section edge to edge) | `full-bleed` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile thickness | As Appearance | `inherit` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile thickness | Thin (1px) | `thin` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile thickness | Medium (2px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile thickness | Thick (3px) | `thick` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile alignment | As Appearance | `inherit` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile alignment | Start | `start` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile alignment | Center | `center` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile alignment | End | `end` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop top spacing | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop top spacing | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop top spacing | 2XS (4px) | `2xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop top spacing | XS (8px) | `xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop top spacing | Small (16px) | `small` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop top spacing | Medium (24px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop top spacing | Large (40px) | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop top spacing | XL (64px) | `xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop top spacing | 2XL (80px) | `2xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop bottom spacing | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop bottom spacing | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop bottom spacing | 2XS (4px) | `2xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop bottom spacing | XS (8px) | `xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop bottom spacing | Small (16px) | `small` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop bottom spacing | Medium (24px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop bottom spacing | Large (40px) | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop bottom spacing | XL (64px) | `xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Desktop bottom spacing | 2XL (80px) | `2xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet top spacing | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet top spacing | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet top spacing | 2XS (4px) | `2xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet top spacing | XS (8px) | `xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet top spacing | Small (16px) | `small` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet top spacing | Medium (24px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet top spacing | Large (40px) | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet top spacing | XL (64px) | `xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet top spacing | 2XL (80px) | `2xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet bottom spacing | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet bottom spacing | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet bottom spacing | 2XS (4px) | `2xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet bottom spacing | XS (8px) | `xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet bottom spacing | Small (16px) | `small` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet bottom spacing | Medium (24px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet bottom spacing | Large (40px) | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet bottom spacing | XL (64px) | `xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Tablet bottom spacing | 2XL (80px) | `2xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile top spacing | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile top spacing | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile top spacing | 2XS (4px) | `2xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile top spacing | XS (8px) | `xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile top spacing | Small (16px) | `small` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile top spacing | Medium (24px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile top spacing | Large (40px) | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile top spacing | XL (64px) | `xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile top spacing | 2XL (80px) | `2xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile bottom spacing | Default | `default` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile bottom spacing | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile bottom spacing | 2XS (4px) | `2xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile bottom spacing | XS (8px) | `xs` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile bottom spacing | Small (16px) | `small` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile bottom spacing | Medium (24px) | `medium` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile bottom spacing | Large (40px) | `large` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile bottom spacing | XL (64px) | `xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Mobile bottom spacing | 2XL (80px) | `2xl` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Animate on view | None | `none` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Animate on view | Fade | `fade` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Animate on view | Draw from start | `draw-from-start` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Animate on view | Draw from center | `draw-from-center` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Reduced motion fallback | Show immediately | `static` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Reduced motion fallback | Short fade | `fade` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Print | Show when printed | `show` | Supported (in the model) | Not checkable (data attribute / field value) |
| separator | Print | Hide when printed | `hide` | Supported (in the model) | Not checkable (data attribute / field value) |

## Narrative (block README)

The variations are the values of `_separator.json`, normalized by `separator-config.js` (`VARIANTS`, `THEMES`, `LINE_STYLES`, `WIDTHS`, `ANIMATIONS`, …) and styled in `separator.css`.

#### Semantic, Decorative, Spacing only

| What it is | Settings | Screen readers | Markup |
| ---------- | -------- | -------------- | ------ |
| Thematic break (the topic changes) | Accessibility mode **Semantic** | Announce a separator (with the Accessible label as its name, if set) | `hr.separator-rule` (`aria-label` when labelled) |
| Visual division only | **Decorative** (default) | Ignore it | `div.separator-line[aria-hidden="true"] > hr` |
| Spacing only | Decorative + Line style **None** | Nothing | No `<hr>`; the block keeps its spacing |

A Semantic separator with Line style None is still a break for screen readers but nothing is visible; the editor warns about it (placeholder `separatorInvisible`).

#### Variants: Default, Subtle, Strong, Inset, Full width, Dotted, Dashed, Gradient, Branded

Presets (`VARIANT_PRESETS`): Default solid thin default 100 %; Subtle solid thin subtle 100 %; Strong solid medium strong 100 %; Inset solid thin default 100 % with a `--space-1000` inset; Full width solid thin default full bleed; Dotted dotted medium default; Dashed dashed thin default; Gradient gradient medium primary; Branded solid medium primary 100 %. Any Style setting other than "As the variant" overrides the preset.

```text
[Screenshot Placeholder]

File name:
separator-variants-mobile.png

Purpose:
All nine variants stacked at 390px, each labelled.

Annotations:
A = Default
B = Inset (indented)
C = Full width (over the section padding)
D = Gradient
```

#### Themes: Auto, Light, Dark, Brand

Auto follows the section: the dark palette inside `.section.dark`, the brand palette inside `.section.brand`, else the light palette. Choose Light, Dark or Brand when the background isn't such a section (an image, or Section Style Dark / Dark Green, whose theme contract changes only `--color-border-brand`, i.e. the Primary colour).

#### Widths, maximum width, alignment, stretch

25 / 50 / 75 / 100 %, Content width, Full bleed; Maximum width Small to Extra large or Content container; Alignment Start / Center / End (logical, right-to-left aware); Stretch to container width (legacy) fills the container; Respect content maximum width caps every width at `--content-max-width`. Full bleed uses the section's inline padding, so it never overflows the page.

#### Decorations: dot, square, diamond

At the start, centre and / or end of the line; visual only (`aria-hidden`), coloured as the line, sized with the thickness.

#### Responsive visibility and overrides

Show on desktop / tablet / mobile; per-breakpoint width, thickness, alignment and spacing ("As Appearance" / Default keep the general values).

```text
[Screenshot Placeholder]

File name:
separator-responsive-overrides-tablet.png

Purpose:
A separator with Desktop width 50 %, Tablet width 75 % and Mobile width 100 % at 1024px: the tablet value applies.

Annotations:
A = Line at 75 % on tablet
```

#### Animate on view: Fade, Draw from start, Draw from center

Once, when 10 % of the block is in view: the line fades in (0.6s opacity) or scales from its start (right in right-to-left) or centre. For reduced motion: Show immediately (no animation is prepared) or Short fade (opacity only). The hidden starting state exists only after the script added `animate-ready`, so a failure never hides the line.

#### Print and Analytics

Hide when printed removes it from print; Analytics on adds its state to the data layer (see [Data Layer and Analytics](https://github.com/sradha-tcs/tcs-corp/blob/main/blocks/separator/README.md#data-layer-and-analytics)).

## Screenshots

No screenshot belongs to this document (it describes code, configuration or process). Evidence screenshots are listed in the [screenshot register](../../../SCREENSHOT-REGISTER.md).

## Known limitations

- Combination rules (which options cannot be combined) are described in the README narrative only where they exist; unsupported combinations are not enumerated.

## Open items

- None.

## Change history

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 8 November 2026 | Delivery team (documentation program) | First version of the role-specific documentation (master documentation prompt), generated from the repository and the published reference pages |
