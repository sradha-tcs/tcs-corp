# Block sections (format of the audit brief, section 36)

One section per component, generated from the evidence (inventories, runtime runs, defect register). The detailed code-level review of each block (dialog field by field with file:line, keyboard, data layer) is in [blocks/](blocks/).

### Block: Text (`text`)

**A. Overview.** default-content; model `text`; allowed in section, columns-container, column, tabs; 0 instance(s) on 0 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** None found.

**C. Dialog validation**

No dialog fields.

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/text`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Title (`title`)

**A. Overview.** default-content; model `title`; allowed in section, columns-container, column, tabs; 928 instance(s) on 173 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Title (title) | text | read by the block |  | Retain |
| Title Type (titleType) | h1 (h1); h2 (h2); h3 (h3); h4 (h4); h5 (h5); h6 (h6) | see review |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/title`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Image (`image`)

**A. Overview.** default-content; model `image`; allowed in section, columns-container, column, tabs; 0 instance(s) on 0 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Image (image) | reference | read by the block |  | Retain |
| Alt Text (imageAlt) | text | read by the block |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/image`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Button (basic) (`button`)

**A. Overview.** default-content; model `button-basic`; 0 instance(s) on 0 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** D-D-27 (major, Corrected): Undeliverable View / Icon / Alignment / Tertiary

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Link (link) | aem-content | read by the block |  | Retain |
| Text (linkText) | text | see review |  | Retain |
| Title (linkTitle) | text | see review |  | Retain |
| Views (buttonView) | Button (button); Icon (icon); Link (link) | see review | see register | Remove |
| Type (linkType) | Primary (primary); Secondary (secondary); Text link ('') | see review | see register | Correct (options, condition, help text) |
| Icon (buttonIcon) | Arrow right (arrow-right); Chevron right (chevron-right); Chevron down (chevron-down); Search (search) | read by the block | see register | Remove |
| Alignment (buttonAlignment) | Left (left); Center (center); Right (right) | read by the block | see register | Remove |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/button`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Deprecate (hidden: not offered anywhere; the Button block replaces it; kept for content authored before).

**I. Final implementation.** D-D-27: button-basic model; library buttons migrated to Button blocks

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Section (`section`, class `section`)

**A. Overview.** section; model `section`; allowed in main; 1191 instance(s) on 306 page(s) of the content package. Detailed review: [blocks/group-c-containers.md](blocks/group-c-containers.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Section Name (name) | text | read by the block |  | Retain |
| Style (style) | Highlight (highlight) | read by the block |  | Retain |
| Width Type (sectionWidth) | Full Width (full-width); Fixed Width (fixed-width) | read by the block |  | Retain |
| Rounded edge (roundedEdge) | boolean | read by the block |  | Retain |
| Background Image (backgroundImage) | reference | read by the block |  | Retain |
| Image alt text (backgroundImageAlt) | text | read by the block |  | Retain |
| Anchor name (anchorName) | text | read by the block |  | Retain |

**D. Variation validation**

| Variation | Value | Result | Action |
| --- | --- | --- | --- |
| Style: Highlight | highlight | 12 example(s) render | Retain |

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/section`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Accordion (`accordion`, class `accordion`)

**A. Overview.** block, blocks/accordion; model `accordion`, filter `accordion` (accordion-item); allowed in section, columns-container, tabs; 5 instance(s) on 3 page(s) of the content package. Detailed review: [blocks/group-c-containers.md](blocks/group-c-containers.md).

**B. Current problems.** D-C-20 (minor, Corrected): Item without summary has no name (and the tab row became one live); L-3 (major, Corrected): Every live accordion starts with an empty, unnamed item (dialog tab row)

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/accordion`); clicks measured once per interaction (4 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-C-20: empty rows removed, editor placeholder; L-3: see D-C-20

**J. Test results.** 6 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Accordion Item (`accordion-item`, class `accordion-item`)

**A. Overview.** item; model `accordion-item`; allowed in accordion; 19 instance(s) on 3 page(s) of the content package. Detailed review: [blocks/group-c-containers.md](blocks/group-c-containers.md).

**B. Current problems.** D-C-20 (minor, Corrected): Item without summary has no name (and the tab row became one live); L-3 (major, Corrected): Every live accordion starts with an empty, unnamed item (dialog tab row)

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Summary (summary) | text | read by the block |  | Retain |
| Text (text) | richtext | read by the block |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/accordion-item`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-C-20: empty rows removed, editor placeholder; L-3: see D-C-20

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Anchor List (`anchor-list`, class `anchor-list`)

**A. Overview.** block, blocks/anchor-list; model `anchor-list`, filter `anchor-list` (anchor-list-item); allowed in section, columns-container, tabs; 5 instance(s) on 5 page(s) of the content package. Detailed review: [blocks/group-c-containers.md](blocks/group-c-containers.md).

**B. Current problems.** D-A-1 (major, Corrected): Header CTA style (Primary, Secondary) ignored, always tertiary; D-A-2 (major, Corrected): No visible focus ring on Panel, Report, Statistic cards (clipped); D-A-3 (major, Corrected): Card colour on Image cards: no effect, near-white CTA on white, collapsed card; D-A-4 (major, Corrected): Previous / Next disabled while focused: focus falls to the page; D-A-8 (minor, Corrected): Scroll settings shown when no breakpoint scrolls; D-A-9 (minor, Deferred): Edge bleed identical to none in full-width sections; D-A-10 (minor, Deferred): Touch swipe off and no controls: cards unreachable on touch; D-A-11 (minor, Corrected): Reduced-motion support could be switched off; D-A-12 (minor, Corrected): Component ID overrides the Anchor ID; D-A-17 (minor, Corrected): Legacy composite multifields in the dialogs; D-A-20 (minor, Corrected): fetchpriority high on every eager card image; D-A-22 (minor, Corrected): Child depth default 2 (model) vs 1 (code); D-A-26 (minor (suspected), Blocked): Card date may shift a day; D-C-19 (minor, Deferred): Listeners leak on editor re-renders

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Links (anchors) | container | read by the block |  | Retain |
| Link Title (label) | text | read by the block |  | Retain |
| Anchor Name (anchorName) | text | read by the block |  | Retain |
| Sticky (sticky) | boolean, default false | read by the block |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 18 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/anchor-list`); clicks measured once per interaction (19 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-A-1: card-list-decorator reads the collapsed bold / italic type; D-A-2: ring drawn inside the card edge; D-A-3: Card colour applies to panel / report / statistic cards only; D-A-4: aria-disabled, focus kept; D-A-8: conditions on the scroll fields; D-A-11: always honoured; field removed (0 uses); D-A-12: field removed (0 uses); stored values still read; D-A-17: labelled as authored before items (removal needs a production content check); D-A-20: first image only; D-A-22: code default 2

**J. Test results.** 5 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Anchor Link (`anchor-list-item`, class `anchor-link`)

**A. Overview.** item; model `anchor-list-item`; allowed in anchor-list; 19 instance(s) on 5 page(s) of the content package. Detailed review: [blocks/group-c-containers.md](blocks/group-c-containers.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Link Title (label) | text | read by the block |  | Retain |
| Anchor Name (anchorName) | text | read by the block |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/anchor-link`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Button (`button-block`, class `button-block`)

**A. Overview.** block, blocks/button-block; model `button-block`; allowed in section, columns-container, tabs; 64 instance(s) on 18 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** D-D-27 (major, Corrected): Undeliverable View / Icon / Alignment / Tertiary

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Link (link) | aem-content | read by the block |  | Retain |
| Text (linkText) | text | see review |  | Retain |
| Title (linkTitle) | text | see review |  | Retain |
| View (buttonView) | Button (button); Icon (icon); Link (link) | read by the block |  | Retain |
| Type (buttonVariant) | Primary (primary); Secondary (secondary); Tertiary (tertiary) | read by the block |  | Retain |
| Icon (buttonIcon) | Arrow right (arrow-right); Chevron right (chevron-right); Chevron down (chevron-down); Search (search) | read by the block |  | Retain |
| Alignment (buttonAlignment) | Left (left); Center (center); Right (right) | read by the block |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

| Variation | Value | Result | Action |
| --- | --- | --- | --- |
| View: Button | button | 45 example(s) render | Retain |
| View: Icon | icon | 9 example(s) render | Retain |
| View: Link | link | 10 example(s) render | Retain |
| Type: Primary | primary | 36 example(s) render | Retain |
| Type: Secondary | secondary | 20 example(s) render | Retain |
| Type: Tertiary | tertiary | 8 example(s) render | Retain |

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/button-block`); clicks measured once per interaction (48 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-D-27: button-basic model; library buttons migrated to Button blocks

**J. Test results.** 85 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Cards (`cards`, class `cards`)

**A. Overview.** block, blocks/cards; model `cards`, filter `cards` (card); allowed in section, columns-container, tabs; 67 instance(s) on 17 page(s) of the content package. Detailed review: [blocks/group-a-card-lists.md](blocks/group-a-card-lists.md).

**B. Current problems.** D-A-1 (major, Corrected): Header CTA style (Primary, Secondary) ignored, always tertiary; D-A-2 (major, Corrected): No visible focus ring on Panel, Report, Statistic cards (clipped); D-A-3 (major, Corrected): Card colour on Image cards: no effect, near-white CTA on white, collapsed card; D-A-4 (major, Corrected): Previous / Next disabled while focused: focus falls to the page; D-A-8 (minor, Corrected): Scroll settings shown when no breakpoint scrolls; D-A-9 (minor, Deferred): Edge bleed identical to none in full-width sections; D-A-10 (minor, Deferred): Touch swipe off and no controls: cards unreachable on touch; D-A-11 (minor, Corrected): Reduced-motion support could be switched off; D-A-12 (minor, Corrected): Component ID overrides the Anchor ID; D-A-19 (minor, Corrected): Descriptions refer to page metadata; D-A-20 (minor, Corrected): fetchpriority high on every eager card image; D-A-23 (minor, Deferred): Card ids change when cards are reordered; D-A-26 (minor (suspected), Blocked): Card date may shift a day

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Title (title) | text | read by the block |  | Retain |
| Heading type (titleType) | H2 (h2); H3 (h3); H4 (h4); H5 (h5); H6 (h6) | read by the block |  | Retain |
| Description (description) | richtext | read by the block |  | Retain |
| CTA link (link) | aem-content | read by the block |  | Retain |
| CTA text (linkText) | text | read by the block |  | Retain |
| CTA style (linkType) | Text link (''); Primary button (primary); Secondary button (secondary) | read by the block |  | Retain |
| Accessible list label (listLabel) | text | read by the block |  | Retain |
| Component ID (componentId) | text | read by the block | see register | Remove |
| Display as teaser (displayAsTeaser) | boolean, default true | read by the block |  | Retain |
| Card style (cardStyle) | Image card (image); Panel (panel); Report (report); Statistic (stat); Mixed (by page) (mixed) | read by the block | see register | Correct (help text) |
| Card colour (cardTheme) | Default for the style (''); Dark (dark); Navy (navy); Brand blue (brand); Light blue (brand-light); Light grey (grey); Mid grey (mid-grey); Grey gradient (gradient); Image background (image) | read by the block | see register | Correct (help text) |
| Image ratio (imageRatio) | 16:9 (16-9); 1:1 (1-1); 4:3 (4-3); 3:2 (3-2) | read by the block |  | Retain |
| Panel height (panelHeight) | Portrait (2:3) (portrait); Compact (compact); Content (auto) | read by the block |  | Retain |
| First card as feature (featureFirst) | boolean, default false | read by the block |  | Retain |
| Link items (linkItems) | boolean, default true | read by the block |  | Retain |
| Open links in a new tab (openInNewTab) | boolean, default false | read by the block |  | Retain |
| Show image (showImage) | boolean, default true | read by the block |  | Retain |
| Show eyebrow (showEyebrow) | boolean, default true | read by the block |  | Retain |
| Show tags (showTags) | boolean, default true | read by the block |  | Retain |
| Show description (showDescription) | boolean, default true | read by the block |  | Retain |
| Show date (showDate) | boolean, default true | read by the block |  | Retain |
| Date format (dateFormat) | 04 Sep 26 (dd-mmm-yy); 04-09-2026 (dd-mm-yyyy); 09-04-2026 (mm-dd-yyyy); Sep 4, 2026 (mmm-d-yyyy); 04/09/26 (dd/mm/yy); 4th September 2026 (do-mmmm-yyyy) | read by the block |  | Retain |
| Show call to action (showCta) | boolean, default true | read by the block |  | Retain |
| Image loading (imageLoading) | Lazy (lazy); Eager (first screen) (eager) | read by the block |  | Retain |
| Desktop display (desktopMode) | Grid (grid); Horizontal scroll (horizontal-scroll) | see review |  | Retain |
| Desktop columns (desktopColumns) | number, default 4 | see review |  | Retain |
| Desktop gap (px) (desktopGap) | number, default 24 | see review |  | Retain |
| Desktop items visible (desktopVisible) | number, default 4.2 | see review |  | Retain |
| Desktop card width (px) (desktopCardWidth) | number, default 0 | see review |  | Retain |
| Previous / next buttons on desktop (desktopControls) | boolean, default false | see review |  | Retain |
| Scroll indicator on desktop (desktopIndicator) | boolean, default false | see review |  | Retain |
| Tablet display (tabletMode) | Grid (grid); Horizontal scroll (horizontal-scroll) | see review |  | Retain |
| Tablet columns (tabletColumns) | number, default 4 | see review |  | Retain |
| Tablet gap (px) (tabletGap) | number, default 24 | see review |  | Retain |
| Tablet items visible (tabletVisible) | number, default 3.3 | see review |  | Retain |
| Tablet card width (px) (tabletCardWidth) | number, default 0 | see review |  | Retain |
| Previous / next buttons on tablet (tabletControls) | boolean, default false | see review |  | Retain |
| Scroll indicator on tablet (tabletIndicator) | boolean, default false | see review |  | Retain |
| Mobile display (mobileMode) | Grid (grid); Horizontal scroll (horizontal-scroll) | see review |  | Retain |
| Mobile columns (mobileColumns) | number, default 1 | see review |  | Retain |
| Mobile gap (px) (mobileGap) | number, default 16 | see review |  | Retain |
| Mobile items visible (mobileVisible) | number, default 1.2 | see review |  | Retain |
| Mobile card width (px) (mobileCardWidth) | number, default 0 | see review |  | Retain |
| Previous / next buttons on mobile (mobileControls) | boolean, default false | see review |  | Retain |
| Scroll indicator on mobile (mobileIndicator) | boolean, default true | see review |  | Retain |
| Equal card height (equalHeight) | boolean, default false | read by the block |  | Retain |
| Stretch cards to row height (stretchCards) | boolean, default true | read by the block |  | Retain |
| Scroll snap (scrollSnap) | boolean, default true | read by the block | see register | Correct (condition) |
| Snap alignment (snapAlign) | Start (start); Center (center) | read by the block |  | Retain |
| Hide native scrollbar (hideScrollbar) | boolean, default true | read by the block | see register | Correct (condition) |
| Allow mouse drag (mouseDrag) | boolean, default true | read by the block | see register | Correct (condition) |
| Allow touch swipe (touchSwipe) | boolean, default true | read by the block | see register | Correct (condition) |
| Keyboard scrolling (keyboardScrolling) | boolean, default true | read by the block | see register | Correct (condition) |
| Scroll step (scrollStep) | One card (one-card); Viewport (viewport) | read by the block | see register | Correct (condition) |
| Loop (loop) | boolean, default false | read by the block | see register | Correct (condition) |
| Initial item index (initialIndex) | number, default 0 | read by the block | see register | Correct (condition) |
| Edge (edgePadding) | Cards run to the edge (bleed); Inside the content width (none) | read by the block | see register | Correct (condition) |
| Reduced motion support (reducedMotion) | boolean, default true | read by the block | see register | Remove |
| When there are no cards (emptyBehavior) | Hide the block (hide); Show a message (message) | read by the block |  | Retain |
| Empty message (emptyMessage) | text | read by the block |  | Retain |
| Analytics (analyticsEnabled) | boolean, default true | read by the block |  | Retain |
| Style options (classes) | Compact statistic title (stat-compact); Dividers between rows (dividers); Header centred (header-center) | block class |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

| Variation | Value | Result | Action |
| --- | --- | --- | --- |
| Card style: Image card | image | 39 example(s) render | Retain |
| Card style: Panel | panel | 8 example(s) render | Retain |
| Card style: Report | report | 2 example(s) render | Retain |
| Card style: Statistic | stat | 17 example(s) render | Retain |
| Card style: Mixed (by page) | mixed | 1 example(s) render | Retain |
| Style options: Compact statistic title | stat-compact | 4 example(s) render | Retain |
| Style options: Dividers between rows | dividers | 2 example(s) render | Retain |
| Style options: Header centred | header-center | 1 example(s) render | Retain |

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 132 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/cards`); clicks measured once per interaction (74 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-A-1: card-list-decorator reads the collapsed bold / italic type; D-A-2: ring drawn inside the card edge; D-A-3: Card colour applies to panel / report / statistic cards only; D-A-4: aria-disabled, focus kept; D-A-8: conditions on the scroll fields; D-A-11: always honoured; field removed (0 uses); D-A-12: field removed (0 uses); stored values still read; D-A-19: neutral wording; D-A-20: first image only

**J. Test results.** 77 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Card (`card`, class `card`)

**A. Overview.** item; model `card`; allowed in cards; 269 instance(s) on 17 page(s) of the content package. Detailed review: [blocks/group-a-card-lists.md](blocks/group-a-card-lists.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Image (image) | reference | read by the block |  | Retain |
| Image alt text (imageAlt) | text | read by the block |  | Retain |
| Eyebrow (eyebrow) | text | read by the block |  | Retain |
| Title (title) | text | read by the block |  | Retain |
| Description (text) | richtext | read by the block |  | Retain |
| Label (subtitle) | text | read by the block |  | Retain |
| Tags (tags) | aem-tag | read by the block |  | Retain |
| Date (date) | date-time | read by the block |  | Retain |
| Content type (contentLabel) | text | read by the block |  | Retain |
| Reading time (readingTime) | text | read by the block |  | Retain |
| Link (link) | aem-content | read by the block |  | Retain |
| Link text (linkText) | text | read by the block |  | Retain |
| Call to action label (ctaLabel) | text | read by the block |  | Retain |
| Open in a new tab (newTab) | As the block (''); Yes (true); No (false) | read by the block |  | Retain |
| Card style (kind) | As the block (''); Image card (image); Panel (panel); Report (report); Statistic (stat) | read by the block |  | Retain |
| Card colour (theme) | As the block (''); Dark (dark); Navy (navy); Brand blue (brand); Light blue (brand-light); Light grey (grey); Mid grey (mid-grey); Grey gradient (gradient); Image background (image) | read by the block |  | Retain |
| Analytics label (analyticsLabel) | text | read by the block |  | Retain |
| Accessibility label (ariaLabel) | text | read by the block |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/card`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Column Break (`column-break`, class `column-break`)

**A. Overview.** block, blocks/column-break; model `column-break`; allowed in columns-container, tabs; 147 instance(s) on 12 page(s) of the content package. Detailed review: [blocks/group-c-containers.md](blocks/group-c-containers.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Column name (title) | text | read by the block |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/column-break`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** 194 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Columns Container (`columns-container`, class `columns-container-section`)

**A. Overview.** section, blocks/columns-container; model `columns-container`, filter `columns-container` (column-break, text, image, button-block, title, hero, teaser, quote, testimonial, anchor-list, accordion, tabs-block, table, table-list, list, separator, embed, video, modal, form-variations, filter-list, conversation-canvas, cards, fragment); allowed in main; 32 instance(s) on 8 page(s) of the content package. Detailed review: [blocks/group-c-containers.md](blocks/group-c-containers.md).

**B. Current problems.** D-C-1 (major, Corrected): Its CSS turned every section with a Columns block into a grid; D-C-4 (minor, Corrected): Duplicate id with a Column Break Anchor ID; D-C-22 (suspected, Corrected (verified live: not delivered)): classes_* on the built-in Columns component; D-C-23 (minor, Corrected): columns.js throws without rows

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Style (style) | Columns Container (columns-container-section); Highlight (highlight) | read by the block |  | Retain |
| Width Type (sectionWidth) | Full Width (full-width); Fixed Width (fixed-width) | read by the block |  | Retain |
| Background Image (backgroundImage) | reference | read by the block |  | Retain |
| Image alt text (backgroundImageAlt) | text | read by the block |  | Retain |
| Anchor name (anchorName) | text | read by the block |  | Retain |
| Columns per row (columnsPerRow) | Automatic (auto); 1 (1); 2 (2); 3 (3); 4 (4) | read by the block |  | Retain |
| Gap (columnsGap) | Small (small); Medium (medium); Large (large) | read by the block |  | Retain |
| Vertical alignment (columnsAlign) | Top (top); Middle (middle); Bottom (bottom); Stretch (equal heights) (stretch) | read by the block |  | Retain |
| Side by side from (columnsFrom) | Tablet (600px) (tablet); Desktop (900px) (desktop); Large desktop (1200px) (large) | read by the block |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

| Variation | Value | Result | Action |
| --- | --- | --- | --- |
| Style: Columns Container | columns-container-section | 32 example(s) render | Retain |
| Style: Highlight | highlight | 1 example(s) render | Retain |

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/columns-container-section`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-C-1: selectors scoped to .block.columns-container; D-C-4: corrected; D-C-22: Additional tab removed from Columns; D-C-23: corrected

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Columns (`columns`, class `columns`)

**A. Overview.** block, blocks/columns; model `columns`; 0 instance(s) on 0 page(s) of the content package. Detailed review: [blocks/group-c-containers.md](blocks/group-c-containers.md).

**B. Current problems.** D-C-22 (suspected, Corrected (verified live: not delivered)): classes_* on the built-in Columns component; D-C-23 (minor, Corrected): columns.js throws without rows

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Columns (columns) | text | read by the block |  | Retain |
| Rows (rows) | text | see review |  | Retain |
| Anchor ID (classes_anchor) | text | block class | see register | Remove |
| Hide block (classes_hideblock) | boolean, default false | block class | see register | Remove |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class | see register | Remove |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class | see register | Remove |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class | see register | Remove |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class | see register | Remove |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class | see register | Remove |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class | see register | Remove |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class | see register | Remove |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class | see register | Remove |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class | see register | Remove |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class | see register | Remove |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class | see register | Remove |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/columns`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Deprecate (hidden: not offered anywhere; Columns Container, and Column Breaks in a Tabs Container, replace it; kept for content authored before).

**I. Final implementation.** D-C-22: Additional tab removed from Columns; D-C-23: corrected

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Conversation Canvas (`conversation-canvas`, class `conversation-canvas`)

**A. Overview.** block, blocks/conversation-canvas; model `conversation-canvas`, filter `conversation-canvas` (conversation-canvas-button); allowed in section, columns-container, tabs; 33 instance(s) on 11 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** D-D-19 (major, Corrected): Search does nothing; D-D-20 (major, Corrected): Dock panel unreachable with Tab; D-D-21 (minor, Deferred): Style-dependent fields without conditions; D-D-23 (minor, Corrected): Empty Suggestions list

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Canvas Style (classes) | Default (''); Primary (sticky) (primary); Secondary (secondary) | block class |  | Retain |
| Floating journey (classes_journey) | Floats and docks (''); Docks only (nofloat); Decorative (decorative) | block class |  | Retain |
| Quick actions (classes_actions) | Auto (''); Pills (action-pills); Buttons (action-buttons) | block class |  | Retain |
| BG Style (bgStyle) | Default (default); Dark (Primary) (dark) | read by the block |  | Retain |
| BG Background Image (backgroundImage) | reference | read by the block |  | Retain |
| Icon (icon) | reference | read by the block |  | Retain |
| Icon Alt Text (iconAlt) | text | read by the block |  | Retain |
| Eyebrow (eyebrow) | text | read by the block |  | Retain |
| Title (title) | text | read by the block |  | Retain |
| Title Type (titleSize) | Default (''); Bigger Title (bigger); Medium Title (medium) | read by the block |  | Retain |
| Text (text) | richtext | read by the block |  | Retain |
| Menu (menu) | container | read by the block |  | Retain |
| Menu root path (menuRootPath) | aem-content | read by the block |  | Retain |
| Menu depth (menuDepth) | number, default 1 | read by the block |  | Retain |
| Navigation style (classes_navstyle) | Pills (''); Text links (text-links) | block class |  | Retain |
| Search bar (searchBar) | container | see review |  | Retain |
| Search bar water mark (searchPlaceholder) | text | read by the block |  | Retain |
| Search bar audio icon (searchAudioIcon) | reference | read by the block |  | Retain |
| Search bar audio icon alt text (searchAudioIconAlt) | text | read by the block |  | Retain |
| Search bar button icon type (searchButtonStyle) | Primary (primary); Secondary (secondary); Tertiary (tertiary) | read by the block |  | Retain |
| Search bar button icon type hover text (searchButtonLabel) | text | read by the block |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Background animation (classes_bganimation) | None (''); Fade in (bg-motion-fade-in); Reveal from the centre (bg-motion-reveal); Wipe left to right (bg-motion-wipe-right); Wipe right to left (bg-motion-wipe-left); Wipe bottom to top (bg-motion-wipe-up); Scale reveal (bg-motion-scale) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |
| Search page (searchPage) | aem-content | read by the block | see register | Add |

**D. Variation validation**

| Variation | Value | Result | Action |
| --- | --- | --- | --- |
| Canvas Style: Default | (default) | 28 example(s) render | Retain |
| Canvas Style: Primary (sticky) | primary | 2 example(s) render | Retain |
| Canvas Style: Secondary | secondary | 3 example(s) render | Retain |

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/conversation-canvas`); clicks measured once per interaction (37 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-D-19: integration event, else the Search page, else a status; D-D-20: DOM order with CSS order; D-D-23: corrected

**J. Test results.** 223 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Conversation Canvas Button (`conversation-canvas-button`, class `conversation-canvas-button`)

**A. Overview.** item; model `conversation-canvas-button`; allowed in conversation-canvas; 52 instance(s) on 10 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** D-D-19 (major, Corrected): Search does nothing; D-D-20 (major, Corrected): Dock panel unreachable with Tab; D-D-21 (minor, Deferred): Style-dependent fields without conditions; D-D-22 (minor, Corrected): Alignment never applied, Tertiary not deliverable; D-D-23 (minor, Corrected): Empty Suggestions list; D-D-27 (major, Corrected): Undeliverable View / Icon / Alignment / Tertiary

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Link (link) | aem-content | read by the block |  | Retain |
| Text (linkText) | text | see review |  | Retain |
| Title (linkTitle) | text | see review |  | Retain |
| Views (buttonView) | Button (button); Icon (icon); Link (link) | see review |  | Retain |
| Type (linkType) | Primary (primary); Secondary (secondary); Tertiary (tertiary) | read by the block | see register | Remove |
| Icon (buttonIcon) | Arrow right (arrow-right); Chevron right (chevron-right); Chevron down (chevron-down); Search (search) | read by the block |  | Retain |
| Alignment (buttonAlignment) | Left (left); Center (center); Right (right) | read by the block | see register | Remove |
| Type (buttonVariant) | Primary (primary); Secondary (secondary); Tertiary (tertiary) | see review | see register | Add |

**D. Variation validation**

| Variation | Value | Result | Action |
| --- | --- | --- | --- |
| Views: Button | button | 47 example(s) render | Retain |
| Views: Icon | icon | 1 example(s) render | Retain |
| Views: Link | link | 1 example(s) render | Retain |
| Type: Primary | primary | 8 example(s) render | Retain |
| Type: Secondary | secondary | 43 example(s) render | Retain |
| Type: Tertiary | tertiary | no example | Retain (add example) |

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/conversation-canvas-button`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-D-19: integration event, else the Search page, else a status; D-D-20: DOM order with CSS order; D-D-22: own model with buttonVariant; library migrated; D-D-23: corrected; D-D-27: button-basic model; library buttons migrated to Button blocks

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Embed (`embed`, class `embed`)

**A. Overview.** block, blocks/embed; model `embed`; allowed in section, columns-container, tabs; 6 instance(s) on 1 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** D-D-8 (minor, Corrected (Play)): Generic Play button name; D-D-9 (minor (suspected), Corrected): Bare URL empties the block; D-D-10 (minor, Corrected): No privacy-enhanced players

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Placeholder Image (embed_placeholder) | reference | see review |  | Retain |
| Placeholder Image Alt Text (embed_placeholderAlt) | text | see review |  | Retain |
| URI (embed_uri) | text | see review |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/embed`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-D-8: named after the placeholder alt; iframe title unchanged; D-D-9: corrected; D-D-10: youtube-nocookie, Vimeo dnt

**J. Test results.** 6 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Filter List (`filter-list`, class `filter-list`)

**A. Overview.** block, blocks/filter-list; model `filter-list`, filter `filter-list` (filter-list-tag, filter-list-category, filter-list-page); allowed in section, columns-container, tabs; 32 instance(s) on 11 page(s) of the content package. Detailed review: [blocks/group-a-card-lists.md](blocks/group-a-card-lists.md).

**B. Current problems.** D-A-1 (major, Corrected): Header CTA style (Primary, Secondary) ignored, always tertiary; D-A-2 (major, Corrected): No visible focus ring on Panel, Report, Statistic cards (clipped); D-A-3 (major, Corrected): Card colour on Image cards: no effect, near-white CTA on white, collapsed card; D-A-4 (major, Corrected): Previous / Next disabled while focused: focus falls to the page; D-A-6 (major, Corrected): Page type / Content type options do not match the site; D-A-7 (minor, Corrected): Raw content-type slugs shown; D-A-8 (minor, Corrected): Scroll settings shown when no breakpoint scrolls; D-A-9 (minor, Deferred): Edge bleed identical to none in full-width sections; D-A-10 (minor, Deferred): Touch swipe off and no controls: cards unreachable on touch; D-A-11 (minor, Corrected): Reduced-motion support could be switched off; D-A-12 (minor, Corrected): Component ID overrides the Anchor ID; D-A-17 (minor, Corrected): Legacy composite multifields in the dialogs; D-A-18 (minor, Corrected): Technical option labels; D-A-20 (minor, Corrected): fetchpriority high on every eager card image; D-A-22 (minor, Corrected): Child depth default 2 (model) vs 1 (code); D-A-25 (minor, Corrected): Result count announced on page load; D-A-26 (minor (suspected), Blocked): Card date may shift a day; D-A-29 (minor (suspected), Deferred): Ignores hide-in-nav and redirects, unlike List

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Title (title) | text | read by the block |  | Retain |
| Description (description) | richtext | read by the block |  | Retain |
| Show result count (showResultCount) | boolean, default false | read by the block |  | Retain |
| Default layout (layout) | Masonry (masonry); Grid (grid); List (list) | read by the block |  | Retain |
| Cards per page (cardsPerPage) | number, default 9 | read by the block |  | Retain |
| Load more count (loadMoreCount) | number, default 6 | read by the block |  | Retain |
| Datasource (source) | Query Index (query-index); Manual List (manual) | read by the block |  | Retain |
| Root path (rootPath) | aem-content | read by the block |  | Retain |
| Pages (authored before Pages items) (pageItems) | container | read by the block | see register | Correct (label, help text) |
| Page (page) | aem-content | read by the block |  | Retain |
| Page types (pageTypes) | Article (article); Blog (blog); Press release (press-release) | read by the block | see register | Correct (options) |
| Content types (contentTypes) | Article (article); Blog (blog); Insights (insights); Case study (case-study); Whitepaper (whitepaper); Report (report); News (news); Event (event); Press release (press-release) | read by the block | see register | Correct (options) |
| Sort by (sortBy) | Latest First (latest); Featured First (featured); Priority (priority); Alphabetical (alphabetical) | read by the block |  | Retain |
| Primary filter category (primaryCategory) | aem-tag | read by the block |  | Retain |
| Primary filter tags (authored before Tag items) (primaryTags) | container | read by the block | see register | Correct (label, help text) |
| Tag Id (tagId) | aem-tag | read by the block |  | Retain |
| Show All filter (showAll) | boolean, default true | read by the block |  | Retain |
| Allow multi select (multiSelect) | boolean, default false | read by the block |  | Retain |
| Enable advanced filter (advancedFilter) | boolean, default true | read by the block |  | Retain |
| Advanced filter categories (authored before Category items) (advancedCategories) | container | read by the block | see register | Correct (label, help text) |
| Category label (categoryLabel) | text | read by the block |  | Retain |
| Taxonomy root (taxonomyRoot) | aem-tag | read by the block |  | Retain |
| Filter logic (filterLogic) | AND (and); OR (or) | read by the block |  | Retain |
| Card style (cardStyle) | Default (default); Compact (compact); Featured (featured); Mixed (mixed) | read by the block |  | Retain |
| Enable featured cards (enableFeatured) | boolean, default true | read by the block |  | Retain |
| Featured rule (featuredRule) | Marked as featured (featured metadata) (featured); Priority 1 to 3 (priority metadata) (priority); Manual (manual) | read by the block |  | Retain |
| Featured pages (authored before Page items) (featuredItems) | container | read by the block | see register | Correct (label, help text) |
| Featured page (featuredPage) | aem-content | read by the block |  | Retain |
| Featured card count (featuredCount) | number, default 2 | read by the block |  | Retain |
| Enable hero card (enableHero) | boolean, default false | read by the block |  | Retain |
| Hero rule (heroRule) | Latest (latest); Featured (featured); Manual (manual) | read by the block |  | Retain |
| Hero page (heroPage) | aem-content | read by the block |  | Retain |
| Image source (imageSource) | text, default featured-image | read by the block |  | Retain |
| Fallback image (fallbackImage) | text, default thumbnail-image | read by the block |  | Retain |
| Eyebrow source (eyebrowSource) | text, default content-type | read by the block |  | Retain |
| Title source (titleSource) | text, default title | read by the block |  | Retain |
| Description source (descriptionSource) | text, default description | read by the block |  | Retain |
| Tag source (tagSource) | text, default tags | read by the block |  | Retain |
| Url source (urlSource) | text, default path | read by the block |  | Retain |
| Author source (authorSource) | text, default author | read by the block |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

| Variation | Value | Result | Action |
| --- | --- | --- | --- |
| Default layout: Masonry | masonry | 21 example(s) render | Retain |
| Default layout: Grid | grid | 10 example(s) render | Retain |
| Default layout: List | list | 1 example(s) render | Retain |
| Card style: Default | default | 3 example(s) render | Retain |
| Card style: Compact | compact | 5 example(s) render | Retain |
| Card style: Featured | featured | 1 example(s) render | Retain |
| Card style: Mixed | mixed | 23 example(s) render | Retain |

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 90 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/filter-list`); clicks measured once per interaction (62 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-A-1: card-list-decorator reads the collapsed bold / italic type; D-A-2: ring drawn inside the card edge; D-A-3: Card colour applies to panel / report / statistic cards only; D-A-4: aria-disabled, focus kept; D-A-6: options from models/_page.json and the content-type taxonomy; D-A-7: taxonomy labels (contentTypeLabel); D-A-8: conditions on the scroll fields; D-A-11: always honoured; field removed (0 uses); D-A-12: field removed (0 uses); stored values still read; D-A-17: labelled as authored before items (removal needs a production content check); D-A-18: readable Featured rule labels; mapping fields kept (documented); D-A-20: first image only; D-A-22: code default 2; D-A-25: live region set after the first count

**J. Test results.** 32 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Filter Tag (`filter-list-tag`, class `filter-tag`)

**A. Overview.** item; model `filter-list-tag`; allowed in filter-list; 37 instance(s) on 8 page(s) of the content package. Detailed review: [blocks/group-a-card-lists.md](blocks/group-a-card-lists.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Tag (tagId) | aem-tag | read by the block |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/filter-tag`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Filter Category (`filter-list-category`, class `filter-category`)

**A. Overview.** item; model `filter-list-category`; allowed in filter-list; 23 instance(s) on 8 page(s) of the content package. Detailed review: [blocks/group-a-card-lists.md](blocks/group-a-card-lists.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Category label (categoryLabel) | text | read by the block |  | Retain |
| Taxonomy root (taxonomyRoot) | aem-tag | read by the block |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/filter-category`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Filter Page (`filter-list-page`, class `filter-page`)

**A. Overview.** item; model `filter-list-page`; allowed in filter-list; 50 instance(s) on 5 page(s) of the content package. Detailed review: [blocks/group-a-card-lists.md](blocks/group-a-card-lists.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Page (page) | aem-content | read by the block |  | Retain |
| Use (pageRole) | Listed (Manual List) (listed); Featured (featured) | read by the block |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/filter-page`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Footer (`footer`, class `footer`)

**A. Overview.** block, blocks/footer; model `footer`, filter `footer` (footer-link); allowed in section; 3 instance(s) on 3 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** D-D-24 (minor, Corrected): New-tab links not announced

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Conversation Canvas Page (conversationCanvas) | aem-content | see review |  | Retain |
| Copyright Text (copyright) | richtext | read by the block |  | Retain |
| Link List (links) | container | read by the block |  | Retain |
| Link Title (linkText) | text | see review |  | Retain |
| Link Path (link) | aem-content | read by the block |  | Retain |
| Link Type (linkTarget) | Default (''); Open in new window (new-window) | read by the block |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 18 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/footer`); clicks measured once per interaction (9 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-D-24: corrected

**J. Test results.** 379 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Footer Link (`footer-link`, class `footer-link`)

**A. Overview.** item; model `footer-link`; allowed in footer; 9 instance(s) on 3 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** D-D-24 (minor, Corrected): New-tab links not announced

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Link Path (link) | aem-content | read by the block |  | Retain |
| Link Title (linkText) | text | see review |  | Retain |
| Link Type (linkTarget) | Default (''); Open in new window (new-window) | read by the block |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/footer-link`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-D-24: corrected

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Form Variations (`form-variations`, class `form-variations`)

**A. Overview.** block, blocks/form-variations; model `form-variations`, filter `form-variations` (field-text, field-select, field-textarea, field-checkbox, contact-card, field-submit); allowed in section, columns-container, tabs; 19 instance(s) on 5 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** D-D-1 (critical, Corrected (verified on live markup)): Forms empty on the published site; D-D-3 (major, Corrected): Success announced although nothing is sent; D-D-5 (minor, Corrected): Consent checkbox not mandatory by default; D-D-6 (minor, Corrected): Conditional fields appear unannounced; D-D-7 (minor, Corrected): Counter read literally

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Form Title / Heading (formHeading) | text | read by the block |  | Retain |
| Form Description (formDescription) | richtext | read by the block |  | Retain |
| Theme (classes) | Default (''); Dark (dark) | block class |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Background animation (classes_bganimation) | None (''); Fade in (bg-motion-fade-in); Reveal from the centre (bg-motion-reveal); Wipe left to right (bg-motion-wipe-right); Wipe right to left (bg-motion-wipe-left); Wipe bottom to top (bg-motion-wipe-up); Scale reveal (bg-motion-scale) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |
| Submit action (formAction) | aem-content | read by the block | see register | Add |

**D. Variation validation**

| Variation | Value | Result | Action |
| --- | --- | --- | --- |
| Theme: Default | (default) | 16 example(s) render | Retain |
| Theme: Dark | dark | 3 example(s) render | Retain |

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/form-variations`); clicks measured once per interaction (2 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-D-1: item cells read as AEM delivers them ("key, type"); D-D-3: Submit action (POST) or integration; else "not connected"; D-D-5: new items; D-D-6: corrected; D-D-7: corrected

**J. Test results.** 20 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Text Input Field (`field-text`, class `text-input-field`)

**A. Overview.** item; model `field-text`; allowed in form-variations; 0 instance(s) on 0 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Field type (classes) | text, default field-text | block class |  | Retain |
| Field Name / ID (name) | text | read by the block |  | Retain |
| Field Label (label) | text | read by the block |  | Retain |
| Input Type (inputKind) | Text (text); Email (email); Tel (tel) | see review |  | Retain |
| Mandatory Field (*) (required) | boolean, default false | read by the block |  | Retain |
| Show only if dropdown value equals (dependsOn) | text | read by the block |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/text-input-field`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Dropdown / Select Field (`field-select`, class `dropdown-select-field`)

**A. Overview.** item; model `field-select`; allowed in form-variations; 0 instance(s) on 0 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Field type (classes) | text, default field-select | block class |  | Retain |
| Dropdown Name / ID (name) | text | read by the block |  | Retain |
| Dropdown Label (label) | text | read by the block |  | Retain |
| Mandatory Field (*) (required) | boolean, default false | read by the block |  | Retain |
| Options (options) | text | read by the block |  | Retain |
| Show only if dropdown value equals (dependsOn) | text | read by the block |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/dropdown-select-field`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Textarea Field (`field-textarea`, class `textarea-field`)

**A. Overview.** item; model `field-textarea`; allowed in form-variations; 0 instance(s) on 0 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Field type (classes) | text, default field-textarea | block class |  | Retain |
| Field Name / ID (name) | text | read by the block |  | Retain |
| Field Label (label) | text | read by the block |  | Retain |
| Max Character Limit (maxLength) | number, default 1500 | read by the block |  | Retain |
| Mandatory Field (*) (required) | boolean, default false | read by the block |  | Retain |
| Show only if dropdown value equals (dependsOn) | text | read by the block |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/textarea-field`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Consent Checkbox Field (`field-checkbox`, class `consent-checkbox-field`)

**A. Overview.** item; model `field-checkbox`; allowed in form-variations; 0 instance(s) on 0 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Field type (classes) | text, default field-checkbox | block class |  | Retain |
| Checkbox Name / ID (name) | text | read by the block |  | Retain |
| Consent Text / Disclaimer (label) | richtext | read by the block |  | Retain |
| Mandatory Field (*) (required) | boolean, default true | read by the block | see register | Correct (default) |
| Show only if dropdown value equals (dependsOn) | text | read by the block |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/consent-checkbox-field`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Contact Card Output (`contact-card`, class `contact-card-output`)

**A. Overview.** item; model `contact-card`; allowed in form-variations; 4 instance(s) on 2 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Field type (classes) | text, default contact-card | block class |  | Retain |
| Show when dropdown value equals (region) | text | read by the block |  | Retain |
| Contact Name (contactName) | text | see review |  | Retain |
| Emails (emails) | text | read by the block |  | Retain |
| Phones (phones) | text | read by the block |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/contact-card-output`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Submit Button (`field-submit`, class `submit-button`)

**A. Overview.** item; model `field-submit`; allowed in form-variations; 12 instance(s) on 5 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** D-D-27 (major, Corrected): Undeliverable View / Icon / Alignment / Tertiary

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Field type (classes) | text, default field-submit | block class |  | Retain |
| Button Label (label) | text, default Send | read by the block |  | Retain |
| Show only if dropdown value equals (dependsOn) | text | read by the block |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/submit-button`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-D-27: button-basic model; library buttons migrated to Button blocks

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Fragment (`fragment`, class `fragment`)

**A. Overview.** block, blocks/fragment; model `fragment`; allowed in section, columns-container, tabs; 1 instance(s) on 1 page(s) of the content package. Detailed review: [blocks/group-c-containers.md](blocks/group-c-containers.md).

**B. Current problems.** D-C-17 (minor, Corrected): No recursion guard; D-C-21 (minor, Corrected): Nothing shown in the editor without a reference

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Reference (reference) | aem-content | read by the block |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/fragment`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-C-17: corrected; D-C-21: editor hints

**J. Test results.** 1 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Gen Carousel (`gen-carousel`, class `gen-carousel-section`)

**A. Overview.** section, blocks/gen-carousel; model `gen-carousel`, filter `gen-carousel` (hero, teaser); allowed in main; 5 instance(s) on 5 page(s) of the content package. Detailed review: [blocks/group-c-containers.md](blocks/group-c-containers.md).

**B. Current problems.** D-C-2 (major, Corrected): Additional tab ignored; D-C-5 (minor, Corrected): Spurious slide events and inert flicker on jumps; D-C-16 (minor, Corrected): Every carousel named Carousel; D-C-19 (minor, Deferred): Listeners leak on editor re-renders

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Style (style) | Default (gen-carousel-section) | read by the block |  | Retain |
| Navigation (carouselNavigation) | Manual (manual); Auto (auto); Manual and Auto (manual-auto) | read by the block |  | Retain |
| Autoplay interval (seconds) (carouselInterval) | number, default 5 | read by the block |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |
| Accessible name (carouselAriaLabel) | text | read by the block | see register | Add |

**D. Variation validation**

| Variation | Value | Result | Action |
| --- | --- | --- | --- |
| Style: Default | gen-carousel-section | 5 example(s) render | Retain |

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/gen-carousel-section`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-C-2: applySectionBlockOptions for all container sections; D-C-5: only the target slide; D-C-16: Accessible name field

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Hero (`hero`, class `hero`)

**A. Overview.** block, blocks/hero; model `hero`, filter `hero` (hero-cta); allowed in section, columns-container, gen-carousel, tabs; 182 instance(s) on 141 page(s) of the content package. Detailed review: [blocks/group-b-heroes-teasers.md](blocks/group-b-heroes-teasers.md).

**B. Current problems.** D-B-1 (major, Corrected): Lottie pause / play button never rendered (WCAG 2.2.2); D-B-4 (major, Corrected): Links opening a new tab not announced; D-B-8 (minor, Corrected): CTA Arrow default Right vs Auto at runtime; D-B-13 (minor, Corrected): Motion Type duplicates the Additional tab animations; D-B-14 (minor, Corrected (Teaser), Deferred (others)): Legacy composite multifields in dialogs; D-B-20 (minor (suspected), Deferred): Cell classification can misread unusual content

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Icon (content_icon) | reference | see review |  | Retain |
| Icon Image Alt Text (content_iconAlt) | text | see review |  | Retain |
| Hero Image type (classes_media) | Default (''); Lotto (lottie) | block class |  | Retain |
| Hero Image Path (image) | reference | read by the block |  | Retain |
| Hero Image alt text (imageAlt) | text | read by the block |  | Retain |
| Hero View (classes) | Default (''); Contained image (media-contained) | block class |  | Retain |
| Eyebrow (content_eyebrow) | text | see review |  | Retain |
| Title (content_title) | text | see review |  | Retain |
| Title heading level (content_titleType) | H1 (h1); H2 (h2) | see review |  | Retain |
| Description (content_description) | richtext | see review |  | Retain |
| CTA List (ctas) | container | read by the block |  | Retain |
| CTA Title (ctaText) | text | see review |  | Retain |
| CTA Link (cta) | aem-content | read by the block |  | Retain |
| CTA Link Type (ctaTarget) | Default (''); Open in New Window (new-window) | read by the block |  | Retain |
| CTA view (ctaType) | Default (''); Primary (primary); Secondary (secondary) | see review |  | Retain |
| CTA Arrow (ctaArrow) | Right (right); Down (down) | see review |  | Retain |
| Motion Type (classes_motion) | None (''); Fade in (motion-fade); Slide up (motion-slide); Zoom (image) (motion-zoom) | block class | see register | Remove |
| Vertical Alignment (classes_alignment) | Top (align-top); Middle (align-middle); Bottom (align-bottom) | block class |  | Retain |
| Horizontal Alignment (classes_horizontal) | Left (align-left); Center (align-center); Right (align-right) | block class |  | Retain |
| Text Alignment (classes_textAlignment) | Left align (text-left); Center align (text-center); Right align (text-right) | block class |  | Retain |
| BG Color (classes_background) | Default (''); Light, no overlay (bg-light); Dark blue (bg-dark); Dark blue (subtle) (bg-dark-subtle); Black (bg-black) | block class |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Background animation (classes_bganimation) | None (''); Fade in (bg-motion-fade-in); Reveal from the centre (bg-motion-reveal); Wipe left to right (bg-motion-wipe-right); Wipe right to left (bg-motion-wipe-left); Wipe bottom to top (bg-motion-wipe-up); Scale reveal (bg-motion-scale) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

| Variation | Value | Result | Action |
| --- | --- | --- | --- |
| Hero View: Default | (default) | 181 example(s) render | Retain |
| Hero View: Contained image | media-contained | 1 example(s) render | Retain |

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 18 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/hero`); clicks measured once per interaction (64 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-B-1: toggle appended after the content; D-B-4: decorateButton newTabHint (placeholder opensInNewTab); D-B-8: Auto option as default; D-B-13: mapped (Fade in, Fade up, Scale reveal, Slow); field removed; library migrated; D-B-14: Teaser labelled; removal needs a production content check

**J. Test results.** 61 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: CTA (`hero-cta`, class `cta`)

**A. Overview.** item; model `hero-cta`; allowed in hero; 214 instance(s) on 136 page(s) of the content package. Detailed review: [blocks/group-b-heroes-teasers.md](blocks/group-b-heroes-teasers.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| CTA Link (link) | aem-content | read by the block |  | Retain |
| CTA Title (linkText) | text | read by the block |  | Retain |
| CTA Link Type (linkTarget) | Default (''); Open in New Window (new-window) | read by the block |  | Retain |
| CTA view (linkStyle) | Default (''); Primary (primary); Secondary (secondary) | see review |  | Retain |
| CTA Arrow (linkArrow) | Auto (down for links to sections of this page) (''); Right (right); Down (down) | see review | see register | Correct (options, default) |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/cta`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Interactive Dashboard (`interactive-dashboard`, class `interactive-dashboard`)

**A. Overview.** block, blocks/interactive-dashboard; model `interactive-dashboard`; 1 instance(s) on 1 page(s) of the content package. Detailed review: [blocks/group-b-heroes-teasers.md](blocks/group-b-heroes-teasers.md).

**B. Current problems.** D-B-17 (minor, Corrected): Placeholder block offered to authors

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/interactive-dashboard`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Deprecate (not offered until implemented).

**I. Final implementation.** D-B-17: removed from the section and Columns Container filters

**J. Test results.** 1 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: List (`list`, class `list`)

**A. Overview.** block, blocks/list; model `list`, filter `list` (list-item); allowed in section, columns-container, tabs; 229 instance(s) on 139 page(s) of the content package. Detailed review: [blocks/group-a-card-lists.md](blocks/group-a-card-lists.md).

**B. Current problems.** D-A-1 (major, Corrected): Header CTA style (Primary, Secondary) ignored, always tertiary; D-A-2 (major, Corrected): No visible focus ring on Panel, Report, Statistic cards (clipped); D-A-3 (major, Corrected): Card colour on Image cards: no effect, near-white CTA on white, collapsed card; D-A-4 (major, Corrected): Previous / Next disabled while focused: focus falls to the page; D-A-8 (minor, Corrected): Scroll settings shown when no breakpoint scrolls; D-A-9 (minor, Deferred): Edge bleed identical to none in full-width sections; D-A-10 (minor, Deferred): Touch swipe off and no controls: cards unreachable on touch; D-A-11 (minor, Corrected): Reduced-motion support could be switched off; D-A-12 (minor, Corrected): Component ID overrides the Anchor ID; D-A-17 (minor, Corrected): Legacy composite multifields in the dialogs; D-A-20 (minor, Corrected): fetchpriority high on every eager card image; D-A-22 (minor, Corrected): Child depth default 2 (model) vs 1 (code); D-A-26 (minor (suspected), Blocked): Card date may shift a day

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Title (title) | text | read by the block |  | Retain |
| Heading type (titleType) | H2 (h2); H3 (h3); H4 (h4); H5 (h5); H6 (h6) | read by the block |  | Retain |
| Description (description) | richtext | read by the block |  | Retain |
| CTA link (link) | aem-content | read by the block |  | Retain |
| CTA text (linkText) | text | read by the block |  | Retain |
| CTA style (linkType) | Text link (''); Primary button (primary); Secondary button (secondary) | read by the block |  | Retain |
| Accessible list label (listLabel) | text | read by the block |  | Retain |
| Component ID (componentId) | text | read by the block | see register | Remove |
| List source (source) | Child pages (parent); Fixed list (fixed); Tagged pages (tags) | read by the block |  | Retain |
| Pages (pageItems) | container | read by the block |  | Retain |
| Page (page) | aem-content | read by the block |  | Retain |
| Parent page (parentPath) | aem-content | read by the block |  | Retain |
| Use the current page when empty (parentUseCurrentPage) | boolean, default true | read by the block |  | Retain |
| Direct children only (directChildrenOnly) | boolean, default true | read by the block |  | Retain |
| Child depth (childDepth) | number, default 2 | read by the block |  | Retain |
| Search root (rootPath) | aem-content | read by the block |  | Retain |
| Use the current page when empty (tagsUseCurrentPage) | boolean, default true | read by the block |  | Retain |
| Tags (tags) | aem-tag | read by the block |  | Retain |
| Match (tagMatch) | Any of the tags (any); All of the tags (all) | read by the block |  | Retain |
| Include descendant pages (includeDescendants) | boolean, default true | read by the block |  | Retain |
| Maximum search depth (maxDepth) | number, default 0 | read by the block |  | Retain |
| Order by (orderBy) | Manual (as authored; path order for pages) (manual); Title (title); Last modified (lastModified) | read by the block |  | Retain |
| Sort order (sortOrder) | Ascending (ascending); Descending (descending) | read by the block |  | Retain |
| Maximum items (maxItems) | number, default 0 | read by the block |  | Retain |
| Display as teaser (displayAsTeaser) | boolean, default true | read by the block |  | Retain |
| Card style (cardStyle) | Image card (image); Panel (panel); Report (report); Statistic (stat); Mixed (by page) (mixed) | read by the block | see register | Correct (help text) |
| Card colour (cardTheme) | Default for the style (''); Dark (dark); Navy (navy); Brand blue (brand); Light blue (brand-light); Light grey (grey); Mid grey (mid-grey); Grey gradient (gradient); Image background (image) | read by the block | see register | Correct (help text) |
| Image ratio (imageRatio) | 16:9 (16-9); 1:1 (1-1); 4:3 (4-3); 3:2 (3-2) | read by the block |  | Retain |
| Panel height (panelHeight) | Portrait (2:3) (portrait); Compact (compact); Content (auto) | read by the block |  | Retain |
| First card as feature (featureFirst) | boolean, default false | read by the block |  | Retain |
| Link items (linkItems) | boolean, default true | read by the block |  | Retain |
| Open links in a new tab (openInNewTab) | boolean, default false | read by the block |  | Retain |
| Show image (showImage) | boolean, default true | read by the block |  | Retain |
| Show eyebrow (showEyebrow) | boolean, default true | read by the block |  | Retain |
| Show tags (showTags) | boolean, default true | read by the block |  | Retain |
| Show description (showDescription) | boolean, default true | read by the block |  | Retain |
| Show date (showDate) | boolean, default true | read by the block |  | Retain |
| Date format (dateFormat) | 04 Sep 26 (dd-mmm-yy); 04-09-2026 (dd-mm-yyyy); 09-04-2026 (mm-dd-yyyy); Sep 4, 2026 (mmm-d-yyyy); 04/09/26 (dd/mm/yy); 4th September 2026 (do-mmmm-yyyy) | read by the block |  | Retain |
| Show call to action (showCta) | boolean, default true | read by the block |  | Retain |
| Image loading (imageLoading) | Lazy (lazy); Eager (first screen) (eager) | read by the block |  | Retain |
| Desktop display (desktopMode) | Grid (grid); Horizontal scroll (horizontal-scroll) | see review |  | Retain |
| Desktop columns (desktopColumns) | number, default 4 | see review |  | Retain |
| Desktop gap (px) (desktopGap) | number, default 24 | see review |  | Retain |
| Desktop items visible (desktopVisible) | number, default 4.2 | see review |  | Retain |
| Desktop card width (px) (desktopCardWidth) | number, default 0 | see review |  | Retain |
| Previous / next buttons on desktop (desktopControls) | boolean, default false | see review |  | Retain |
| Scroll indicator on desktop (desktopIndicator) | boolean, default false | see review |  | Retain |
| Tablet display (tabletMode) | Grid (grid); Horizontal scroll (horizontal-scroll) | see review |  | Retain |
| Tablet columns (tabletColumns) | number, default 4 | see review |  | Retain |
| Tablet gap (px) (tabletGap) | number, default 24 | see review |  | Retain |
| Tablet items visible (tabletVisible) | number, default 3.3 | see review |  | Retain |
| Tablet card width (px) (tabletCardWidth) | number, default 0 | see review |  | Retain |
| Previous / next buttons on tablet (tabletControls) | boolean, default false | see review |  | Retain |
| Scroll indicator on tablet (tabletIndicator) | boolean, default false | see review |  | Retain |
| Mobile display (mobileMode) | Grid (grid); Horizontal scroll (horizontal-scroll) | see review |  | Retain |
| Mobile columns (mobileColumns) | number, default 1 | see review |  | Retain |
| Mobile gap (px) (mobileGap) | number, default 16 | see review |  | Retain |
| Mobile items visible (mobileVisible) | number, default 1.2 | see review |  | Retain |
| Mobile card width (px) (mobileCardWidth) | number, default 0 | see review |  | Retain |
| Previous / next buttons on mobile (mobileControls) | boolean, default false | see review |  | Retain |
| Scroll indicator on mobile (mobileIndicator) | boolean, default true | see review |  | Retain |
| Equal card height (equalHeight) | boolean, default false | read by the block |  | Retain |
| Stretch cards to row height (stretchCards) | boolean, default true | read by the block |  | Retain |
| Scroll snap (scrollSnap) | boolean, default true | read by the block | see register | Correct (condition) |
| Snap alignment (snapAlign) | Start (start); Center (center) | read by the block |  | Retain |
| Hide native scrollbar (hideScrollbar) | boolean, default true | read by the block | see register | Correct (condition) |
| Allow mouse drag (mouseDrag) | boolean, default true | read by the block | see register | Correct (condition) |
| Allow touch swipe (touchSwipe) | boolean, default true | read by the block | see register | Correct (condition) |
| Keyboard scrolling (keyboardScrolling) | boolean, default true | read by the block | see register | Correct (condition) |
| Scroll step (scrollStep) | One card (one-card); Viewport (viewport) | read by the block | see register | Correct (condition) |
| Loop (loop) | boolean, default false | read by the block | see register | Correct (condition) |
| Initial item index (initialIndex) | number, default 0 | read by the block | see register | Correct (condition) |
| Edge (edgePadding) | Cards run to the edge (bleed); Inside the content width (none) | read by the block | see register | Correct (condition) |
| Reduced motion support (reducedMotion) | boolean, default true | read by the block | see register | Remove |
| When there are no items (emptyBehavior) | Hide the list (hide); Show a message (message); Show the fallback items (fallback) | read by the block |  | Retain |
| Empty message (emptyMessage) | text | read by the block |  | Retain |
| Analytics (analyticsEnabled) | boolean, default true | read by the block |  | Retain |
| Style options (classes) | Compact statistic title (stat-compact); Dividers between rows (dividers); Header centred (header-center) | block class |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

| Variation | Value | Result | Action |
| --- | --- | --- | --- |
| Card style: Image card | image | 181 example(s) render | Retain |
| Card style: Panel | panel | 13 example(s) render | Retain |
| Card style: Report | report | 2 example(s) render | Retain |
| Card style: Statistic | stat | 14 example(s) render | Retain |
| Card style: Mixed (by page) | mixed | 19 example(s) render | Retain |
| Style options: Compact statistic title | stat-compact | 3 example(s) render | Retain |
| Style options: Dividers between rows | dividers | 2 example(s) render | Retain |
| Style options: Header centred | header-center | 1 example(s) render | Retain |

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 168 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/list`); clicks measured once per interaction (232 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-A-1: card-list-decorator reads the collapsed bold / italic type; D-A-2: ring drawn inside the card edge; D-A-3: Card colour applies to panel / report / statistic cards only; D-A-4: aria-disabled, focus kept; D-A-8: conditions on the scroll fields; D-A-11: always honoured; field removed (0 uses); D-A-12: field removed (0 uses); stored values still read; D-A-17: labelled as authored before items (removal needs a production content check); D-A-20: first image only; D-A-22: code default 2

**J. Test results.** 146 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: List Item (`list-item`, class `list-item`)

**A. Overview.** item; model `list-item`; allowed in list; 364 instance(s) on 51 page(s) of the content package. Detailed review: [blocks/group-a-card-lists.md](blocks/group-a-card-lists.md).

**B. Current problems.** D-A-1 (major, Corrected): Header CTA style (Primary, Secondary) ignored, always tertiary; D-A-2 (major, Corrected): No visible focus ring on Panel, Report, Statistic cards (clipped); D-A-3 (major, Corrected): Card colour on Image cards: no effect, near-white CTA on white, collapsed card; D-A-4 (major, Corrected): Previous / Next disabled while focused: focus falls to the page; D-A-8 (minor, Corrected): Scroll settings shown when no breakpoint scrolls; D-A-9 (minor, Deferred): Edge bleed identical to none in full-width sections; D-A-10 (minor, Deferred): Touch swipe off and no controls: cards unreachable on touch; D-A-11 (minor, Corrected): Reduced-motion support could be switched off; D-A-12 (minor, Corrected): Component ID overrides the Anchor ID; D-A-17 (minor, Corrected): Legacy composite multifields in the dialogs; D-A-20 (minor, Corrected): fetchpriority high on every eager card image; D-A-22 (minor, Corrected): Child depth default 2 (model) vs 1 (code); D-A-26 (minor (suspected), Blocked): Card date may shift a day

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Page or link (link) | aem-content | read by the block |  | Retain |
| Link text (linkText) | text | read by the block |  | Retain |
| Open in a new tab (newTab) | As the list (''); Yes (true); No (false) | read by the block |  | Retain |
| Title (headline) | text | read by the block |  | Retain |
| Description (summary) | text | read by the block |  | Retain |
| Image (image) | reference | read by the block |  | Retain |
| Image alt text (imageAlt) | text | read by the block |  | Retain |
| Eyebrow (eyebrow) | text | read by the block |  | Retain |
| Tags (tags) | aem-tag | read by the block |  | Retain |
| Label (subtitle) | text | read by the block |  | Retain |
| Call to action label (ctaLabel) | text | read by the block |  | Retain |
| Card style (kind) | As the list (''); Image card (image); Panel (panel); Report (report); Statistic (stat) | read by the block |  | Retain |
| Card colour (theme) | As the list (''); Dark (dark); Navy (navy); Brand blue (brand); Light blue (brand-light); Light grey (grey); Mid grey (mid-grey); Grey gradient (gradient); Image background (image) | read by the block |  | Retain |
| Analytics label (analyticsLabel) | text | read by the block |  | Retain |
| Accessibility label (ariaLabel) | text | read by the block |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/list-item`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-A-1: card-list-decorator reads the collapsed bold / italic type; D-A-2: ring drawn inside the card edge; D-A-3: Card colour applies to panel / report / statistic cards only; D-A-4: aria-disabled, focus kept; D-A-8: conditions on the scroll fields; D-A-11: always honoured; field removed (0 uses); D-A-12: field removed (0 uses); stored values still read; D-A-17: labelled as authored before items (removal needs a production content check); D-A-20: first image only; D-A-22: code default 2

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Modal (`modal`, class `modal`)

**A. Overview.** block, blocks/modal; model `modal`; allowed in section, columns-container, tabs; 3 instance(s) on 3 page(s) of the content package. Detailed review: [blocks/group-c-containers.md](blocks/group-c-containers.md).

**B. Current problems.** D-C-9 (minor, Corrected): Double click opens two dialogs; D-C-10 (minor, Corrected): Transient data-layer id; D-C-11 (minor (suspected), Corrected): Focus return in Safari; D-C-21 (minor, Corrected): Nothing shown in the editor without a reference

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Modal Content (link) | aem-content | read by the block |  | Retain |
| Button Text (linkText) | text | see review |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/modal`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-C-9: corrected; D-C-10: stable id from the opener / path; D-C-11: opener passed explicitly; D-C-21: editor hints

**J. Test results.** 3 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Page Header (`page-header`, class `page-header`)

**A. Overview.** block, blocks/page-header; model `page-header`, filter `page-header` (page-header-cta); allowed in section; 18 instance(s) on 18 page(s) of the content package. Detailed review: [blocks/group-b-heroes-teasers.md](blocks/group-b-heroes-teasers.md).

**B. Current problems.** D-B-4 (major, Corrected): Links opening a new tab not announced; D-B-7 (minor, Corrected): CTA style defaults disagree; Text link equals unset; D-B-12 (minor, Corrected): Featured image always decorative; D-B-14 (minor, Corrected (Teaser), Deferred (others)): Legacy composite multifields in dialogs; D-D-26 (minor, Corrected): Page behind the full-screen menu reachable

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Layout (classes) | Default (from the Page Type) (''); Landing (with the featured image) (landing); Secondary (title left, text right) (secondary); Article (meta row, author) (article); Display (large title) (display) | block class |  | Retain |
| CTA List (ctas) | container | read by the block |  | Retain |
| CTA Title (ctaText) | text | see review |  | Retain |
| CTA Link (cta) | aem-content | read by the block |  | Retain |
| CTA Link Type (ctaTarget) | Default (''); Open in New Window (new-window) | read by the block |  | Retain |
| CTA Link Style (ctaStyle) | Text link (''); Primary Button (primary); Secondary Button (secondary) | see review |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

| Variation | Value | Result | Action |
| --- | --- | --- | --- |
| Layout: Default (from the Page Type) | (default) | 4 example(s) render | Retain |
| Layout: Landing (with the featured image) | landing | 3 example(s) render | Retain |
| Layout: Secondary (title left, text right) | secondary | 4 example(s) render | Retain |
| Layout: Article (meta row, author) | article | 6 example(s) render | Retain |
| Layout: Display (large title) | display | 1 example(s) render | Retain |

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 68 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/page-header`); clicks measured once per interaction (30 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-B-4: decorateButton newTabHint (placeholder opensInNewTab); D-B-7: Text link stored as tertiary; Primary for new CTAs; D-B-12: image-alt metadata; D-B-14: Teaser labelled; removal needs a production content check; D-D-26: inert

**J. Test results.** 22 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: CTA (`page-header-cta`, class `cta`)

**A. Overview.** item; model `page-header-cta`; allowed in page-header; 26 instance(s) on 15 page(s) of the content package. Detailed review: [blocks/group-b-heroes-teasers.md](blocks/group-b-heroes-teasers.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| CTA Link (link) | aem-content | read by the block |  | Retain |
| CTA Title (linkText) | text | see review |  | Retain |
| CTA Link Type (linkTarget) | Default (''); Open in New Window (new-window) | read by the block |  | Retain |
| CTA Link Style (linkStyle) | Text link (tertiary); Primary Button (primary); Secondary Button (secondary) | see review | see register | Correct (options) |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/cta`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Quote (`quote`, class `quote`)

**A. Overview.** block, blocks/quote; model `quote`; allowed in section, columns-container, tabs; 12 instance(s) on 5 page(s) of the content package. Detailed review: [blocks/group-b-heroes-teasers.md](blocks/group-b-heroes-teasers.md).

**B. Current problems.** D-B-6 (minor, Corrected): figcaption outside a figure; D-B-9 (minor, Corrected): Style select with one option, no effect

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Eyebrow (eyebrow) | text | read by the block |  | Retain |
| Title (title) | text | read by the block |  | Retain |
| Title Type (titleType) | H1 (h1); H2 (h2); H3 (h3); H4 (h4); H5 (h5); H6 (h6) | read by the block |  | Retain |
| Quote (quote) | richtext | read by the block |  | Retain |
| Quote Author (author) | richtext | read by the block |  | Retain |
| Image (image) | reference | read by the block |  | Retain |
| Image Alt Text (imageAlt) | text | read by the block |  | Retain |
| Image Position (Desktop) (imagePosition) | Right (right); Left (left) | read by the block |  | Retain |
| Image Position (Mobile) (imagePositionMobile) | Top (top); Bottom (bottom) | read by the block |  | Retain |
| Style (classes) | Default ('') | block class | see register | Remove |
| BG Color (bgColor) | Default (''); Grey (grey) | read by the block |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Background animation (classes_bganimation) | None (''); Fade in (bg-motion-fade-in); Reveal from the centre (bg-motion-reveal); Wipe left to right (bg-motion-wipe-right); Wipe right to left (bg-motion-wipe-left); Wipe bottom to top (bg-motion-wipe-up); Scale reveal (bg-motion-scale) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 18 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/quote`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-B-6: figure.quote-card-text; D-B-9: field removed

**J. Test results.** 14 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Separator (`separator`, class `separator`)

**A. Overview.** block, blocks/separator; model `separator`; allowed in section, columns-container, tabs; 118 instance(s) on 3 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** D-D-15 (minor, Corrected): Width Auto = 100%; D-D-16 (minor, Corrected): Variant Custom = Default; D-D-17 (minor, Deferred): Duplicate controls

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Component ID (componentId) | text | read by the block |  | Retain |
| Accessibility mode (accessibilityMode) | Decorative (visual only) (decorative); Semantic (a thematic break) (semantic) | read by the block |  | Retain |
| Accessible label (accessibleLabel) | text | read by the block |  | Retain |
| Separator variant (variant) | Default (default); Subtle (subtle); Strong (strong); Inset (inset); Full width (full-width); Dotted (dotted); Dashed (dashed); Gradient (gradient); Branded (branded) | read by the block | see register | Correct (options) |
| Theme (theme) | Auto (as the section) (auto); Light background (light); Dark background (dark); Brand background (brand) | read by the block |  | Retain |
| Line style (lineStyle) | As the variant (''); Solid (solid); Dashed (dashed); Dotted (dotted); Gradient (gradient); None (spacing only) (none) | read by the block |  | Retain |
| Line thickness (lineThickness) | As the variant (''); Thin (1px) (thin); Medium (2px) (medium); Thick (3px) (thick) | read by the block |  | Retain |
| Line colour (lineColor) | As the variant (''); Default (default); Subtle (subtle); Neutral (neutral); Strong (strong); Primary (brand) (primary); Secondary (light brand) (secondary); Accent (accent); Inverse (on dark) (inverse) | read by the block |  | Retain |
| Line opacity (lineOpacity) | 25% (25); 50% (50); 75% (75); 100% (100) | read by the block |  | Retain |
| Separator width (width) | As the variant (''); 25% (25-percent); 50% (50-percent); 75% (75-percent); 100% (100-percent); Content width (content-width); Full bleed (section edge to edge) (full-bleed) | read by the block | see register | Correct (options) |
| Maximum width (maxWidth) | None (none); Small (320px) (small); Medium (640px) (medium); Large (960px) (large); Extra large (1280px) (extra-large); Content container (content-container) | read by the block |  | Retain |
| Alignment (alignment) | Start (start); Center (center); End (end) | read by the block |  | Retain |
| Start decoration (startDecoration) | None (none); Dot (dot); Square (square); Diamond (diamond) | read by the block |  | Retain |
| Center decoration (centerDecoration) | None (none); Dot (dot); Square (square); Diamond (diamond) | read by the block |  | Retain |
| End decoration (endDecoration) | None (none); Dot (dot); Square (square); Diamond (diamond) | read by the block |  | Retain |
| Background contrast (contrastMode) | Standard (standard); High (stronger line) (high) | read by the block |  | Retain |
| Show on desktop (showDesktop) | boolean, default true | see review |  | Retain |
| Show on tablet (showTablet) | boolean, default true | see review |  | Retain |
| Show on mobile (showMobile) | boolean, default true | see review |  | Retain |
| Desktop width (desktopWidth) | As Appearance (inherit); 25% (25-percent); 50% (50-percent); 75% (75-percent); 100% (100-percent); Content width (content-width); Full bleed (section edge to edge) (full-bleed) | see review | see register | Correct (options) |
| Desktop thickness (desktopThickness) | As Appearance (inherit); Thin (1px) (thin); Medium (2px) (medium); Thick (3px) (thick) | see review |  | Retain |
| Desktop alignment (desktopAlignment) | As Appearance (inherit); Start (start); Center (center); End (end) | see review |  | Retain |
| Tablet width (tabletWidth) | As Appearance (inherit); 25% (25-percent); 50% (50-percent); 75% (75-percent); 100% (100-percent); Content width (content-width); Full bleed (section edge to edge) (full-bleed) | see review | see register | Correct (options) |
| Tablet thickness (tabletThickness) | As Appearance (inherit); Thin (1px) (thin); Medium (2px) (medium); Thick (3px) (thick) | see review |  | Retain |
| Tablet alignment (tabletAlignment) | As Appearance (inherit); Start (start); Center (center); End (end) | see review |  | Retain |
| Mobile width (mobileWidth) | As Appearance (inherit); 25% (25-percent); 50% (50-percent); 75% (75-percent); 100% (100-percent); Content width (content-width); Full bleed (section edge to edge) (full-bleed) | see review | see register | Correct (options) |
| Mobile thickness (mobileThickness) | As Appearance (inherit); Thin (1px) (thin); Medium (2px) (medium); Thick (3px) (thick) | see review |  | Retain |
| Mobile alignment (mobileAlignment) | As Appearance (inherit); Start (start); Center (center); End (end) | see review |  | Retain |
| Desktop top spacing (desktopTopSpacing) | Default (default); None (none); 2XS (4px) (2xs); XS (8px) (xs); Small (16px) (small); Medium (24px) (medium); Large (40px) (large); XL (64px) (xl); 2XL (80px) (2xl) | see review |  | Retain |
| Desktop bottom spacing (desktopBottomSpacing) | Default (default); None (none); 2XS (4px) (2xs); XS (8px) (xs); Small (16px) (small); Medium (24px) (medium); Large (40px) (large); XL (64px) (xl); 2XL (80px) (2xl) | see review |  | Retain |
| Tablet top spacing (tabletTopSpacing) | Default (default); None (none); 2XS (4px) (2xs); XS (8px) (xs); Small (16px) (small); Medium (24px) (medium); Large (40px) (large); XL (64px) (xl); 2XL (80px) (2xl) | see review |  | Retain |
| Tablet bottom spacing (tabletBottomSpacing) | Default (default); None (none); 2XS (4px) (2xs); XS (8px) (xs); Small (16px) (small); Medium (24px) (medium); Large (40px) (large); XL (64px) (xl); 2XL (80px) (2xl) | see review |  | Retain |
| Mobile top spacing (mobileTopSpacing) | Default (default); None (none); 2XS (4px) (2xs); XS (8px) (xs); Small (16px) (small); Medium (24px) (medium); Large (40px) (large); XL (64px) (xl); 2XL (80px) (2xl) | see review |  | Retain |
| Mobile bottom spacing (mobileBottomSpacing) | Default (default); None (none); 2XS (4px) (2xs); XS (8px) (xs); Small (16px) (small); Medium (24px) (medium); Large (40px) (large); XL (64px) (xl); 2XL (80px) (2xl) | see review |  | Retain |
| Use section padding (useSectionPadding) | boolean, default false | read by the block |  | Retain |
| Stretch to container width (stretchToContainer) | boolean, default false | read by the block |  | Retain |
| Respect content maximum width (respectMaxWidth) | boolean, default true | read by the block |  | Retain |
| Animate on view (animateOnView) | None (none); Fade (fade); Draw from start (draw-from-start); Draw from center (draw-from-center) | read by the block |  | Retain |
| Reduced motion fallback (reducedMotionFallback) | Show immediately (static); Short fade (fade) | read by the block |  | Retain |
| Print (printVisibility) | Show when printed (show); Hide when printed (hide) | read by the block |  | Retain |
| Analytics (analyticsEnabled) | boolean, default false | read by the block |  | Retain |
| Analytics label (analyticsLabel) | text | read by the block |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

| Variation | Value | Result | Action |
| --- | --- | --- | --- |
| Separator variant: Default | default | 103 example(s) render | Retain |
| Separator variant: Subtle | subtle | 1 example(s) render | Retain |
| Separator variant: Strong | strong | 6 example(s) render | Retain |
| Separator variant: Inset | inset | 1 example(s) render | Retain |
| Separator variant: Full width | full-width | 1 example(s) render | Retain |
| Separator variant: Dotted | dotted | 1 example(s) render | Retain |
| Separator variant: Dashed | dashed | 1 example(s) render | Retain |
| Separator variant: Gradient | gradient | 1 example(s) render | Retain |
| Separator variant: Branded | branded | 3 example(s) render | Retain |

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/separator`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-D-15: option removed (values still read); library migrated; D-D-16: option removed (values still read); library migrated

**J. Test results.** 118 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Tab (`tab`, class `tab`)

**A. Overview.** block, blocks/tab; model `tab`; allowed in tabs; 53 instance(s) on 4 page(s) of the content package. Detailed review: [blocks/group-c-containers.md](blocks/group-c-containers.md).

**B. Current problems.** D-C-7 (minor, Corrected): Additional tab without effect

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Title (title) | text | read by the block |  | Retain |
| ID (tabId) | text | read by the block |  | Retain |
| Active tab (activeTab) | boolean | read by the block |  | Retain |
| Anchor ID (classes_anchor) | text | block class | see register | Remove |
| Hide block (classes_hideblock) | boolean, default false | block class | see register | Correct (help text) |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class | see register | Remove |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class | see register | Remove |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class | see register | Remove |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class | see register | Remove |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class | see register | Remove |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class | see register | Remove |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class | see register | Remove |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class | see register | Remove |
| Columns per row (classes_perrow) | Automatic (''); 1 (per-row-1); 2 (per-row-2); 3 (per-row-3); 4 (per-row-4) | block class | see register | Add |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/tab`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-C-7: Hide block hides the tab; anchor and spacing fields removed (0 uses)

**J. Test results.** 53 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Table List (`table-list`, class `table-list`)

**A. Overview.** block, blocks/table-list; model `table-list`, filter `table-list` (table-list-card); allowed in section, columns-container, tabs; 23 instance(s) on 12 page(s) of the content package. Detailed review: [blocks/group-a-card-lists.md](blocks/group-a-card-lists.md).

**B. Current problems.** D-A-1 (major, Corrected): Header CTA style (Primary, Secondary) ignored, always tertiary; D-A-2 (major, Corrected): No visible focus ring on Panel, Report, Statistic cards (clipped); D-A-3 (major, Corrected): Card colour on Image cards: no effect, near-white CTA on white, collapsed card; D-A-4 (major, Corrected): Previous / Next disabled while focused: focus falls to the page; D-A-8 (minor, Corrected): Scroll settings shown when no breakpoint scrolls; D-A-9 (minor, Deferred): Edge bleed identical to none in full-width sections; D-A-10 (minor, Deferred): Touch swipe off and no controls: cards unreachable on touch; D-A-11 (minor, Corrected): Reduced-motion support could be switched off; D-A-12 (minor, Corrected): Component ID overrides the Anchor ID; D-A-13 (minor, Corrected): Motion Type duplicates Animation Type; D-A-14 (minor, Deferred): Items above the maximum vanish in Universal Editor; D-A-15 (minor, Corrected): New items prefilled with sample content (TwinX), visible on the live page; D-A-16 (minor, Corrected): Orphan Table List Header definition; D-A-17 (minor, Corrected): Legacy composite multifields in the dialogs; D-A-20 (minor, Corrected): fetchpriority high on every eager card image; D-A-22 (minor, Corrected): Child depth default 2 (model) vs 1 (code); D-A-26 (minor (suspected), Blocked): Card date may shift a day; D-A-28 (minor, Corrected): Empty heading for an item without title; D-C-7 (minor, Corrected): Additional tab without effect; D-D-14 (minor, Corrected): Ragged rows after a Columns change; L-1 (major, Corrected): Live tables have two empty rows (dialog tabs); the first is the header

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Variation (variations) | Variation 1 - Title, description, arrow (industries); Variation 2 - Description, large title, button (solutions); Variation 3 - Description, number, large title, arrow (products) | read by the block |  | Retain |
| Heading (listHeading) | text | read by the block |  | Retain |
| Heading Type (listHeadingType) | H2 (h2); H3 (h3); H4 (h4) | see review |  | Retain |
| Maximum items (maxCards) | number, default 4 | read by the block |  | Retain |
| Text (viewAllLabel) | text | read by the block |  | Retain |
| Link (viewAllLink) | aem-content | read by the block |  | Retain |
| Style (ctaStyle) | Variation default (''); Filled button (primary); Outline button (secondary); Text link (tertiary) | read by the block |  | Retain |
| Numbers (numbers) | Variation default (''); Show (show); Show on mobile only (mobile); Hide (hide) | read by the block |  | Retain |
| Item link (itemAction) | Variation default (''); Arrow (arrow); Diagonal arrow (arrow-up-right); Button (button) | read by the block |  | Retain |
| Button text (itemButtonLabel) | text, default Explore | read by the block |  | Retain |
| Motion Type (motion) | None (none); Fade (fade); Slide (slide); Reveal (reveal) | read by the block | see register | Remove |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 8 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/table-list`); clicks measured once per interaction (39 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-A-1: card-list-decorator reads the collapsed bold / italic type; D-A-2: ring drawn inside the card edge; D-A-3: Card colour applies to panel / report / statistic cards only; D-A-4: aria-disabled, focus kept; D-A-8: conditions on the scroll fields; D-A-11: always honoured; field removed (0 uses); D-A-12: field removed (0 uses); stored values still read; D-A-13: mapped to Animation Type on the items (staggered); field removed; library migrated; D-A-15: template and model defaults removed; D-A-16: definition and model removed (0 uses; reader kept); D-A-17: labelled as authored before items (removal needs a production content check); D-A-20: first image only; D-A-22: code default 2; D-A-28: no heading outside the editor; D-C-7: Hide block hides the tab; anchor and spacing fields removed (0 uses); D-D-14: rows padded; L-1: tab rows skipped

**J. Test results.** 23 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Table List Item (`table-list-card`, class `table-list-item`)

**A. Overview.** item; model `table-list-card`; allowed in table-list; 84 instance(s) on 12 page(s) of the content package. Detailed review: [blocks/group-a-card-lists.md](blocks/group-a-card-lists.md).

**B. Current problems.** D-A-1 (major, Corrected): Header CTA style (Primary, Secondary) ignored, always tertiary; D-A-2 (major, Corrected): No visible focus ring on Panel, Report, Statistic cards (clipped); D-A-3 (major, Corrected): Card colour on Image cards: no effect, near-white CTA on white, collapsed card; D-A-4 (major, Corrected): Previous / Next disabled while focused: focus falls to the page; D-A-8 (minor, Corrected): Scroll settings shown when no breakpoint scrolls; D-A-9 (minor, Deferred): Edge bleed identical to none in full-width sections; D-A-10 (minor, Deferred): Touch swipe off and no controls: cards unreachable on touch; D-A-11 (minor, Corrected): Reduced-motion support could be switched off; D-A-12 (minor, Corrected): Component ID overrides the Anchor ID; D-A-13 (minor, Corrected): Motion Type duplicates Animation Type; D-A-14 (minor, Deferred): Items above the maximum vanish in Universal Editor; D-A-15 (minor, Corrected): New items prefilled with sample content (TwinX), visible on the live page; D-A-16 (minor, Corrected): Orphan Table List Header definition; D-A-17 (minor, Corrected): Legacy composite multifields in the dialogs; D-A-20 (minor, Corrected): fetchpriority high on every eager card image; D-A-22 (minor, Corrected): Child depth default 2 (model) vs 1 (code); D-A-26 (minor (suspected), Blocked): Card date may shift a day; D-A-28 (minor, Corrected): Empty heading for an item without title; D-C-7 (minor, Corrected): Additional tab without effect; D-D-14 (minor, Corrected): Ragged rows after a Columns change; L-1 (major, Corrected): Live tables have two empty rows (dialog tabs); the first is the header

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Number (number) | text | read by the block |  | Retain |
| Title (title) | text | read by the block | see register | Correct (default) |
| Trademark (trademark) | None (''); ™ Trademark (tm); ® Registered (r) | read by the block |  | Retain |
| Description (description) | richtext | read by the block | see register | Correct (default) |
| Link (link) | aem-content | read by the block |  | Retain |
| Button text (linkText) | text | read by the block |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/table-list-item`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-A-1: card-list-decorator reads the collapsed bold / italic type; D-A-2: ring drawn inside the card edge; D-A-3: Card colour applies to panel / report / statistic cards only; D-A-4: aria-disabled, focus kept; D-A-8: conditions on the scroll fields; D-A-11: always honoured; field removed (0 uses); D-A-12: field removed (0 uses); stored values still read; D-A-13: mapped to Animation Type on the items (staggered); field removed; library migrated; D-A-15: template and model defaults removed; D-A-16: definition and model removed (0 uses; reader kept); D-A-17: labelled as authored before items (removal needs a production content check); D-A-20: first image only; D-A-22: code default 2; D-A-28: no heading outside the editor; D-C-7: Hide block hides the tab; anchor and spacing fields removed (0 uses); D-D-14: rows padded; L-1: tab rows skipped

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Table (`table`, class `table`)

**A. Overview.** block, blocks/table; model `table`, filter `table` (table-row); allowed in section, columns-container, tabs; 12 instance(s) on 1 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** D-C-7 (minor, Corrected): Additional tab without effect; D-D-14 (minor, Corrected): Ragged rows after a Columns change; L-1 (major, Corrected): Live tables have two empty rows (dialog tabs); the first is the header

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Options (classes) | Border (''); Header ('') | block class |  | Retain |
| Columns (filter) | 1 Column (table); 2 Columns (table-2-columns); 3 Columns (table-3-columns); 4 Columns (table-4-columns); 5 Columns (table-5-columns) | read by the block |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

| Variation | Value | Result | Action |
| --- | --- | --- | --- |
| Options: Border | (default) | 12 example(s) render | Retain |
| Options: Header | (default) | 12 example(s) render | Retain |

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/table`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-C-7: Hide block hides the tab; anchor and spacing fields removed (0 uses); D-D-14: rows padded; L-1: tab rows skipped

**J. Test results.** 12 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Row (`table-row`, class `row`)

**A. Overview.** item; model `table-row`; allowed in table; 5 instance(s) on 1 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Column1 (column1text) | richtext | see review |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/row`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Row (`table-col-2`, class `row`)

**A. Overview.** item; model `table-col-2`; allowed in table-2-columns; 12 instance(s) on 1 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Column1 (column1text) | richtext | see review |  | Retain |
| Column2 (column2text) | richtext | see review |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/row`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Row (`table-col-3`, class `row`)

**A. Overview.** item; model `table-col-3`; allowed in table-3-columns; 22 instance(s) on 1 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Column1 (column1text) | richtext | see review |  | Retain |
| Column2 (column2text) | richtext | see review |  | Retain |
| Column3 (column3text) | richtext | see review |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/row`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Row (`table-col-4`, class `row`)

**A. Overview.** item; model `table-col-4`; allowed in table-4-columns; 9 instance(s) on 1 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Column1 (column1text) | richtext | see review |  | Retain |
| Column2 (column2text) | richtext | see review |  | Retain |
| Column3 (column3text) | richtext | see review |  | Retain |
| Column4 (column4text) | richtext | see review |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/row`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Row (`table-col-5`, class `row`)

**A. Overview.** item; model `table-col-5`; allowed in table-5-columns; 10 instance(s) on 1 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Column1 (column1text) | richtext | see review |  | Retain |
| Column2 (column2text) | richtext | see review |  | Retain |
| Column3 (column3text) | richtext | see review |  | Retain |
| Column4 (column4text) | richtext | see review |  | Retain |
| Column5 (column5text) | richtext | see review |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/row`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Tabs Container (`tabs`, class `tabs-section`)

**A. Overview.** section, blocks/tabs; model `tabs`, filter `tabs` (tab, column-break, text, image, button-block, title, hero, teaser, quote, testimonial, anchor-list, accordion, table, table-list, list, separator, embed, video, modal, form-variations, filter-list, conversation-canvas, cards, fragment, tabs-block); allowed in main; 17 instance(s) on 4 page(s) of the content package. Detailed review: [blocks/group-c-containers.md](blocks/group-c-containers.md).

**B. Current problems.** D-C-2 (major, Corrected): Additional tab ignored; D-C-3 (major, Corrected): Duplicate panel ids, wrong aria-controls, wrong deep links; D-C-7 (minor, Corrected): Additional tab without effect; D-C-8 (minor, Corrected): Two Tabs with the same ID share state

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Component (style) | Tabs (tabs-section) | read by the block |  | Retain |
| ID (anchorName) | text | read by the block |  | Retain |
| Width Type (sectionWidth) | Full Width (full-width); Fixed Width (fixed-width) | read by the block |  | Retain |
| Label (tabsAriaLabel) | text | read by the block |  | Retain |
| Style (tabsStyle) | Underline (underline); Boxed (boxed); Pills (pills) | read by the block |  | Retain |
| Alignment (tabsAlignment) | Left (left); Center (center); Full width (stretch) (stretch) | read by the block |  | Retain |
| Orientation (tabsOrientation) | Horizontal (horizontal); Vertical (vertical) | read by the block |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

| Variation | Value | Result | Action |
| --- | --- | --- | --- |
| Component: Tabs | tabs-section | 17 example(s) render | Retain |
| Style: Underline | underline | 15 example(s) render | Retain |
| Style: Boxed | boxed | 1 example(s) render | Retain |
| Style: Pills | pills | 1 example(s) render | Retain |

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/tabs-section`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-C-2: applySectionBlockOptions for all container sections; D-C-3: ids reserved first; data-tab-id for deep links; D-C-7: Hide block hides the tab; anchor and spacing fields removed (0 uses); D-C-8: state per editor resource only

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Tabs (`tabs-block`, class `tabs`)

**A. Overview.** block, blocks/tabs; model `tabs-block`, filter `tabs-block` (tabs-item); allowed in section, columns-container, tabs; 7 instance(s) on 3 page(s) of the content package. Detailed review: [blocks/group-c-containers.md](blocks/group-c-containers.md).

**B. Current problems.** D-C-3 (major, Corrected): Duplicate panel ids, wrong aria-controls, wrong deep links; D-C-7 (minor, Corrected): Additional tab without effect; D-C-8 (minor, Corrected): Two Tabs with the same ID share state

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| ID (tabsId) | text | read by the block |  | Retain |
| Label (tabsAriaLabel) | text | read by the block |  | Retain |
| Style (tabsStyle) | Underline (underline); Boxed (boxed); Pills (pills) | read by the block |  | Retain |
| Alignment (tabsAlignment) | Left (left); Center (center); Full width (stretch) (stretch) | read by the block |  | Retain |
| Orientation (tabsOrientation) | Horizontal (horizontal); Vertical (vertical) | read by the block |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

| Variation | Value | Result | Action |
| --- | --- | --- | --- |
| Style: Underline | underline | 5 example(s) render | Retain |
| Style: Boxed | boxed | 1 example(s) render | Retain |
| Style: Pills | pills | 1 example(s) render | Retain |

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 50 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/tabs`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-C-3: ids reserved first; data-tab-id for deep links; D-C-7: Hide block hides the tab; anchor and spacing fields removed (0 uses); D-C-8: state per editor resource only

**J. Test results.** 24 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Tab (`tabs-item`, class `tab`)

**A. Overview.** item, blocks/tab; model `tabs-item`; allowed in tabs-block; 20 instance(s) on 3 page(s) of the content package. Detailed review: [blocks/group-c-containers.md](blocks/group-c-containers.md).

**B. Current problems.** D-C-7 (minor, Corrected): Additional tab without effect

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Title (title) | text | read by the block |  | Retain |
| ID (tabId) | text | read by the block |  | Retain |
| Active tab (activeTab) | boolean | read by the block |  | Retain |
| Fragment (fragment) | aem-content | read by the block |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/tab`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-C-7: Hide block hides the tab; anchor and spacing fields removed (0 uses)

**J. Test results.** 53 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: TCS Header (`tcs-header`, class `tcs-header`)

**A. Overview.** block, blocks/tcs-header; model `tcs-header`; allowed in section; 2 instance(s) on 2 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** D-D-25 (minor, Corrected): No-image fallback dead; TATA logo link without name (live); D-D-26 (minor, Corrected): Page behind the full-screen menu reachable

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| TCS Logo (tcsLogo) | reference | read by the block |  | Retain |
| TCS Logo Alt Text (tcsLogoAlt) | text, default Tata Consultancy Services | read by the block |  | Retain |
| TCS Logo Link (tcsLogoLink) | aem-content | read by the block |  | Retain |
| TATA Logo (tataLogo) | reference | read by the block |  | Retain |
| TATA Logo Alt Text (tataLogoAlt) | text, default TATA Group | read by the block |  | Retain |
| TATA Logo Link (tataLogoLink) | aem-content | read by the block |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/tcs-header`); clicks measured once per interaction (4 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-D-25: placeholder names; D-D-26: inert

**J. Test results.** 2 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Teaser (`teaser`, class `teaser`)

**A. Overview.** block, blocks/teaser; model `teaser`, filter `teaser` (teaser-link, teaser-stat); allowed in section, columns-container, gen-carousel, tabs; 147 instance(s) on 27 page(s) of the content package. Detailed review: [blocks/group-b-heroes-teasers.md](blocks/group-b-heroes-teasers.md).

**B. Current problems.** D-B-2 (major, Corrected): Primary / Secondary CTA dropped when a Link item exists; D-B-3 (major, Corrected): Personalization option without runtime; D-B-4 (major, Corrected): Links opening a new tab not announced; D-B-10 (minor, Deferred): Image corners / ratio identical in Text split; D-B-11 (minor, Deferred): Mobile image position Top = Default; D-B-14 (minor, Corrected (Teaser), Deferred (others)): Legacy composite multifields in dialogs; D-B-15 (minor, Deferred): Background animation offered where it cannot animate; D-B-19 (minor, Corrected): Dead teaser-links-* classes; D-B-21 (minor (suspected), Corrected): A Stat item with a link read as a Link item

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Eyebrow (eyebrow) | text | read by the block |  | Retain |
| Show Eyebrow (showEyebrow) | boolean, default true | read by the block |  | Retain |
| Title (title) | text | read by the block |  | Retain |
| Title Type (titleType) | H1 (h1); H2 (h2); H3 (h3); H4 (h4); H5 (h5); H6 (h6) | read by the block |  | Retain |
| Hide Title (titleHidden) | boolean, default false | read by the block |  | Retain |
| Description (description) | richtext | read by the block |  | Retain |
| Show Description (showDescription) | boolean, default true | read by the block |  | Retain |
| Short Description (shortDescription) | richtext | read by the block |  | Retain |
| View All Text (viewAllText) | text | see review |  | Retain |
| View All Link (viewAll) | aem-content | read by the block |  | Retain |
| Show Date (showDate) | boolean, default false | read by the block |  | Retain |
| Date (date) | date-time | read by the block |  | Retain |
| Date Format (dateFormat) | DD-MM-YYYY (dd-mm-yyyy); MM-DD-YYYY (mm-dd-yyyy); MMM d, yyyy (mmm-d-yyyy); DD/MM/YY (dd/mm/yy) | read by the block |  | Retain |
| Date label (dateLabel) | text | read by the block |  | Retain |
| Reading time (readingTime) | text | read by the block |  | Retain |
| Display Tags (displayTags) | boolean, default false | read by the block |  | Retain |
| Tags (tags) | aem-tag | read by the block |  | Retain |
| Listen link (listenLink) | aem-content | read by the block |  | Retain |
| Download (download) | boolean, default false | read by the block |  | Retain |
| Share (socialShare) | boolean, default false | read by the block |  | Retain |
| Author name (authorName) | text | read by the block |  | Retain |
| Author designation (authorDesignation) | text | read by the block |  | Retain |
| Author image (authorImage) | reference | read by the block |  | Retain |
| Author image alt text (authorImageAlt) | text | read by the block |  | Retain |
| Image type (imageFormat) | Default (''); Lotto (lottie) | read by the block |  | Retain |
| Image (image) | reference | read by the block |  | Retain |
| Image alt text (imageAlt) | text | read by the block |  | Retain |
| Hide Image (hideImage) | boolean, default false | read by the block |  | Retain |
| Image position (imagePosition) | Left (left); Right (right) | read by the block |  | Retain |
| Image position (mobile) (imagePositionMobile) | Default (''); Top (mobile-image-top); Bottom (mobile-image-bottom) | read by the block |  | Retain |
| Image ratio (imageRatio) | Default (10:9) (''); Portrait (8:9) (ratio-8-9); Square (1:1) (ratio-1-1); Original (ratio-original) | read by the block |  | Retain |
| Image corners (imageCorners) | Rounded (''); Square (square) | read by the block |  | Retain |
| Multiple links (multiLinks) | boolean, default false | read by the block | see register | Correct (help text) |
| Links (authored before Link items) (links) | container | read by the block | see register | Correct (label, help text) |
| CTA Title (ctaText) | text | see review |  | Retain |
| CTA Link (cta) | aem-content | read by the block |  | Retain |
| CTA Link Type (ctaTarget) | Default (''); Open in New Window (new-window) | read by the block |  | Retain |
| CTA Link Style (ctaStyle) | Text link (''); List (list); Primary Button (primary); Secondary Button (secondary) | read by the block |  | Retain |
| List arrow (linkArrow) | Right (''); Down right (arrow-down-right) | read by the block |  | Retain |
| Primary CTA Title (primaryCtaText) | text | see review |  | Retain |
| Primary CTA Link (primaryCta) | aem-content | read by the block |  | Retain |
| Primary CTA Link Type (primaryCtaTarget) | Default (''); Open in New Window (new-window) | read by the block |  | Retain |
| Primary CTA Link Style (primaryCtaStyle) | Text link (''); List (list); Primary Button (primary); Secondary Button (secondary) | read by the block |  | Retain |
| Secondary CTA Title (secondaryCtaText) | text | see review |  | Retain |
| Secondary CTA Link (secondaryCta) | aem-content | read by the block |  | Retain |
| Secondary CTA Link Type (secondaryCtaTarget) | Default (''); Open in New Window (new-window) | read by the block |  | Retain |
| Secondary CTA Link Style (secondaryCtaStyle) | Text link (''); List (list); Primary Button (primary); Secondary Button (secondary) | read by the block |  | Retain |
| Stats (authored before Stat items) (stats) | container | read by the block | see register | Correct (label, help text) |
| Stats Title (statLabel) | richtext | see review |  | Retain |
| Stats Value (statValue) | richtext | see review |  | Retain |
| Layout (classes) | Image & Text (''); Text split (title left, text right) (no-image); Background image (background); Card (card) | block class |  | Retain |
| BG Color (bgColor) | Default (''); Grey (grey); Dark (dark); Dark green (dark-green) | read by the block |  | Retain |
| Text alignment (textAlignment) | Layout default (''); Left (text-left); Center (text-center); Right (text-right) | read by the block |  | Retain |
| Vertical alignment (verticalAlignment) | Layout default (''); Top (valign-top); Center (valign-middle); Bottom (valign-bottom) | read by the block |  | Retain |
| Title size (titleSize) | Layout default (''); Medium (40px) (title-m); Large (48px) (title-l); Extra large (64px) (title-xl); Display (96px) (title-display) | read by the block |  | Retain |
| Title weight (titleWeight) | Layout default (''); Regular (title-regular); Semibold (title-semibold) | read by the block |  | Retain |
| Description size (descriptionSize) | Layout default (''); Regular (18px) (text-regular); Large (24px) (text-large) | read by the block |  | Retain |
| Eyebrow style (eyebrowStyle) | Brand (''); Label (uppercase, grey) (eyebrow-label) | read by the block |  | Retain |
| Top spacing (topSpacing) | Default (''); Page header (extra space above) (spacing-header) | read by the block |  | Retain |
| Personalization (personalization) | boolean, default false | read by the block | see register | Remove |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Background animation (classes_bganimation) | None (''); Fade in (bg-motion-fade-in); Reveal from the centre (bg-motion-reveal); Wipe left to right (bg-motion-wipe-right); Wipe right to left (bg-motion-wipe-left); Wipe bottom to top (bg-motion-wipe-up); Scale reveal (bg-motion-scale) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

| Variation | Value | Result | Action |
| --- | --- | --- | --- |
| Layout: Image & Text | (default) | 65 example(s) render | Retain |
| Layout: Text split (title left, text right) | no-image | 65 example(s) render | Retain |
| Layout: Background image | background | 15 example(s) render | Retain |
| Layout: Card | card | 2 example(s) render | Retain |

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 154 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/teaser`); clicks measured once per interaction (104 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-B-2: CTAs then Link items; D-B-3: field and marker removed; library migrated; D-B-4: decorateButton newTabHint (placeholder opensInNewTab); D-B-14: Teaser labelled; removal needs a production content check; D-B-19: corrected; D-B-21: link required in the first cell

**J. Test results.** 149 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Link (`teaser-link`, class `link`)

**A. Overview.** item; model `teaser-link`; allowed in teaser; 60 instance(s) on 10 page(s) of the content package. Detailed review: [blocks/group-b-heroes-teasers.md](blocks/group-b-heroes-teasers.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| CTA Link (link) | aem-content | read by the block |  | Retain |
| CTA Title (linkText) | text | see review |  | Retain |
| CTA Link Type (linkTarget) | Default (''); Open in New Window (new-window) | read by the block |  | Retain |
| CTA Link Style (linkStyle) | Text link (''); List (list); Primary Button (primary); Secondary Button (secondary) | read by the block |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/link`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Stat (`teaser-stat`, class `stat`)

**A. Overview.** item; model `teaser-stat`; allowed in teaser; 15 instance(s) on 4 page(s) of the content package. Detailed review: [blocks/group-b-heroes-teasers.md](blocks/group-b-heroes-teasers.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Stats Title (statLabel) | richtext | see review |  | Retain |
| Stats Value (statValue) | richtext | see review |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/stat`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Testimonial (`testimonial`, class `testimonial`)

**A. Overview.** block, blocks/testimonial; model `testimonial`, filter `testimonial` (testimonial-stat); allowed in section, columns-container, tabs; 17 instance(s) on 7 page(s) of the content package. Detailed review: [blocks/group-b-heroes-teasers.md](blocks/group-b-heroes-teasers.md).

**B. Current problems.** D-B-5 (minor, Corrected): Quote hidden when the Show Description row is missing; D-B-9 (minor, Corrected): Style select with one option, no effect; D-B-14 (minor, Corrected (Teaser), Deferred (others)): Legacy composite multifields in dialogs; D-B-15 (minor, Deferred): Background animation offered where it cannot animate; D-B-18 (minor, Corrected): Wrong field descriptions

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Eyebrow (eyebrow) | text | read by the block |  | Retain |
| Title (title) | text | read by the block |  | Retain |
| Title Type (titleType) | H1 (h1); H2 (h2); H3 (h3); H4 (h4); H5 (h5); H6 (h6) | read by the block |  | Retain |
| Description (description) | richtext | read by the block |  | Retain |
| Author (authorName) | text | read by the block | see register | Correct (help text) |
| Author Image (authorImage) | reference | read by the block |  | Retain |
| Author Image Alt Text (authorImageAlt) | text | read by the block |  | Retain |
| Designation & Location (designationLocation) | richtext | read by the block | see register | Correct (help text) |
| Stats (stats) | container | read by the block |  | Retain |
| Stats Title (statLabel) | richtext | see review |  | Retain |
| Stats Value (statValue) | richtext | see review |  | Retain |
| Style (classes) | Default ('') | block class | see register | Remove |
| BG Color (bgColor) | Default (''); Grey (grey) | read by the block |  | Retain |
| Hide Eyebrow (hideEyebrow) | boolean, default false | read by the block |  | Retain |
| Hide Title (titleHidden) | boolean, default false | read by the block |  | Retain |
| Show Description (showDescription) | boolean, default true | read by the block |  | Retain |
| Hide Author Details (hideAuthor) | boolean, default false | read by the block |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Background animation (classes_bganimation) | None (''); Fade in (bg-motion-fade-in); Reveal from the centre (bg-motion-reveal); Wipe left to right (bg-motion-wipe-right); Wipe right to left (bg-motion-wipe-left); Wipe bottom to top (bg-motion-wipe-up); Scale reveal (bg-motion-scale) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 18 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/testimonial`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-B-5: isOnByDefault; D-B-9: field removed; D-B-14: Teaser labelled; removal needs a production content check; D-B-18: corrected

**J. Test results.** 17 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Stat (`testimonial-stat`, class `stat`)

**A. Overview.** item; model `testimonial-stat`; allowed in testimonial; 32 instance(s) on 3 page(s) of the content package. Detailed review: [blocks/group-b-heroes-teasers.md](blocks/group-b-heroes-teasers.md).

**B. Current problems.** None found.

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Stats Title (statLabel) | richtext | see review |  | Retain |
| Stats Value (statValue) | richtext | see review |  | Retain |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/stat`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Retain.

**I. Final implementation.** Unchanged.

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Video (`video`, class `video`)

**A. Overview.** block, blocks/video; model `video`; allowed in section, columns-container, tabs; 27 instance(s) on 2 page(s) of the content package. Detailed review: [blocks/group-d-forms-media-chrome.md](blocks/group-d-forms-media-chrome.md).

**B. Current problems.** D-C-18 (minor, Corrected): Empty unreferenced filter; D-D-11 (minor, Corrected): Play in a Pop-up without condition; D-D-12 (minor, Corrected): Click playback without poster or controls cannot start / pause; L-2 (major, Corrected): Poster image never delivered (grouped field in a key-value block)

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Video (uri) | aem-content | read by the block |  | Retain |
| Title (label) | text | read by the block |  | Retain |
| Caption (caption) | richtext | read by the block |  | Retain |
| Transcript (transcript) | aem-content | read by the block |  | Retain |
| Poster Image (placeholder_image) | reference | read by the block | see register | Remove |
| Poster Image Alt Text (placeholder_imageAlt) | text | read by the block | see register | Remove |
| Captions File (WebVTT) (captions) | aem-content | read by the block |  | Retain |
| Captions Language (captionsLanguage) | text | read by the block |  | Retain |
| Captions Name (captionsLabel) | text | read by the block |  | Retain |
| Privacy-enhanced Mode (privacyMode) | boolean, default true | read by the block |  | Retain |
| Playback (playback) | Play button (on the poster image) (click); Autoplay when in view (muted) (autoplay); Background video (autoplay, muted, loop, no controls) (background) | read by the block |  | Retain |
| Muted (muted) | boolean, default false | read by the block |  | Retain |
| Loop (loop) | boolean, default false | read by the block |  | Retain |
| Show Player Controls (controls) | boolean, default true | read by the block |  | Retain |
| Start At (seconds) (startTime) | number | read by the block |  | Retain |
| End At (seconds) (endTime) | number | read by the block |  | Retain |
| Play in a Pop-up (openInModal) | boolean, default false | read by the block | see register | Correct (condition) |
| Pause When Out of View (pauseOffscreen) | boolean, default true | read by the block |  | Retain |
| Aspect Ratio (aspectRatio) | 16:9 (widescreen) (16-9); 4:3 (4-3); 1:1 (square) (1-1); 21:9 (cinema) (21-9); 9:16 (vertical) (9-16) | read by the block |  | Retain |
| Size (size) | Full width (full); Large (900px) (large); Medium (640px) (medium); Small (420px) (small) | read by the block |  | Retain |
| Alignment (alignment) | Center (center); Left (left); Right (right) | read by the block |  | Retain |
| Rounded Corners (rounded) | boolean, default true | read by the block |  | Retain |
| Anchor ID (classes_anchor) | text | block class |  | Retain |
| Hide block (classes_hideblock) | boolean, default false | block class |  | Retain |
| Animation Type (classes_animation) | None (''); Fade in (motion-fade-in); Fade up (motion-fade-up); Fade down (motion-fade-down); Fade left (motion-fade-left); Fade right (motion-fade-right); Slide up (motion-slide-up); Slide down (motion-slide-down); Slide left (motion-slide-left); Slide right (motion-slide-right); Scale in (motion-scale-in) | block class |  | Retain |
| Motion Speed (classes_animationspeed) | Medium (''); Fast (motion-fast); Slow (motion-slow) | block class |  | Retain |
| Animation Trigger (classes_animationtrigger) | On Scroll / Viewport Entry (''); On Page Load (motion-on-load) | block class |  | Retain |
| Padding left (classes_paddingleft) | Default (''); 0 (none) (pl-0); 0.25rem (space-100) (pl-100); 0.5rem (space-200) (pl-200); 0.75rem (space-300) (pl-300); 1rem (space-400) (pl-400); 1.25rem (space-500) (pl-500); 1.5rem (space-600) (pl-600); 2rem (space-800) (pl-800); 2.5rem (space-1000) (pl-1000); 3rem (space-1200) (pl-1200); 4rem (space-1600) (pl-1600); 5rem (space-2000) (pl-2000); 6rem (space-2400) (pl-2400); 7.5rem (space-3000) (pl-3000) | block class |  | Retain |
| Padding right (classes_paddingright) | Default (''); 0 (none) (pr-0); 0.25rem (space-100) (pr-100); 0.5rem (space-200) (pr-200); 0.75rem (space-300) (pr-300); 1rem (space-400) (pr-400); 1.25rem (space-500) (pr-500); 1.5rem (space-600) (pr-600); 2rem (space-800) (pr-800); 2.5rem (space-1000) (pr-1000); 3rem (space-1200) (pr-1200); 4rem (space-1600) (pr-1600); 5rem (space-2000) (pr-2000); 6rem (space-2400) (pr-2400); 7.5rem (space-3000) (pr-3000) | block class |  | Retain |
| Padding top (classes_paddingtop) | Default (''); 0 (none) (pt-0); 0.25rem (space-100) (pt-100); 0.5rem (space-200) (pt-200); 0.75rem (space-300) (pt-300); 1rem (space-400) (pt-400); 1.25rem (space-500) (pt-500); 1.5rem (space-600) (pt-600); 2rem (space-800) (pt-800); 2.5rem (space-1000) (pt-1000); 3rem (space-1200) (pt-1200); 4rem (space-1600) (pt-1600); 5rem (space-2000) (pt-2000); 6rem (space-2400) (pt-2400); 7.5rem (space-3000) (pt-3000) | block class |  | Retain |
| Padding bottom (classes_paddingbottom) | Default (''); 0 (none) (pb-0); 0.25rem (space-100) (pb-100); 0.5rem (space-200) (pb-200); 0.75rem (space-300) (pb-300); 1rem (space-400) (pb-400); 1.25rem (space-500) (pb-500); 1.5rem (space-600) (pb-600); 2rem (space-800) (pb-800); 2.5rem (space-1000) (pb-1000); 3rem (space-1200) (pb-1200); 4rem (space-1600) (pb-1600); 5rem (space-2000) (pb-2000); 6rem (space-2400) (pb-2400); 7.5rem (space-3000) (pb-3000) | block class |  | Retain |
| Margin left (classes_marginleft) | Default (''); 0 (none) (ml-0); 0.25rem (space-100) (ml-100); 0.5rem (space-200) (ml-200); 0.75rem (space-300) (ml-300); 1rem (space-400) (ml-400); 1.25rem (space-500) (ml-500); 1.5rem (space-600) (ml-600); 2rem (space-800) (ml-800); 2.5rem (space-1000) (ml-1000); 3rem (space-1200) (ml-1200); 4rem (space-1600) (ml-1600); 5rem (space-2000) (ml-2000); 6rem (space-2400) (ml-2400); 7.5rem (space-3000) (ml-3000) | block class |  | Retain |
| Margin right (classes_marginright) | Default (''); 0 (none) (mr-0); 0.25rem (space-100) (mr-100); 0.5rem (space-200) (mr-200); 0.75rem (space-300) (mr-300); 1rem (space-400) (mr-400); 1.25rem (space-500) (mr-500); 1.5rem (space-600) (mr-600); 2rem (space-800) (mr-800); 2.5rem (space-1000) (mr-1000); 3rem (space-1200) (mr-1200); 4rem (space-1600) (mr-1600); 5rem (space-2000) (mr-2000); 6rem (space-2400) (mr-2400); 7.5rem (space-3000) (mr-3000) | block class |  | Retain |
| Margin top (classes_margintop) | Default (''); 0 (none) (mt-0); 0.25rem (space-100) (mt-100); 0.5rem (space-200) (mt-200); 0.75rem (space-300) (mt-300); 1rem (space-400) (mt-400); 1.25rem (space-500) (mt-500); 1.5rem (space-600) (mt-600); 2rem (space-800) (mt-800); 2.5rem (space-1000) (mt-1000); 3rem (space-1200) (mt-1200); 4rem (space-1600) (mt-1600); 5rem (space-2000) (mt-2000); 6rem (space-2400) (mt-2400); 7.5rem (space-3000) (mt-3000) | block class |  | Retain |
| Margin bottom (classes_marginbottom) | Default (''); 0 (none) (mb-0); 0.25rem (space-100) (mb-100); 0.5rem (space-200) (mb-200); 0.75rem (space-300) (mb-300); 1rem (space-400) (mb-400); 1.25rem (space-500) (mb-500); 1.5rem (space-600) (mb-600); 2rem (space-800) (mb-800); 2.5rem (space-1000) (mb-1000); 3rem (space-1200) (mb-1200); 4rem (space-1600) (mb-1600); 5rem (space-2000) (mb-2000); 6rem (space-2400) (mb-2400); 7.5rem (space-3000) (mb-3000) | block class |  | Retain |
| Poster Image (poster) | reference | read by the block | see register | Add |
| Poster Image Alt Text (posterAlt) | text | read by the block | see register | Add |

**D. Variation validation**

| Variation | Value | Result | Action |
| --- | --- | --- | --- |
| Playback: Play button (on the poster image) | click | 21 example(s) render | Retain |
| Playback: Autoplay when in view (muted) | autoplay | 1 example(s) render | Retain |
| Playback: Background video (autoplay, muted, loop, no controls) | background | 5 example(s) render | Retain |

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 12 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/video`); clicks measured once per interaction (3 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Modify.

**I. Final implementation.** D-C-18: corrected; D-D-11: corrected; D-D-12: controls kept; L-2: poster / posterAlt; library migrated

**J. Test results.** 27 instance(s) at 1440 px, 0 not loaded, no console errors on their pages at 5 widths (1440, 1024, 768, 600, 390); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]

### Block: Table List Header (`table-list-header`, class `table-list-header`)

**A. Overview.** item; model `table-list-header`; 0 instance(s) on 0 page(s) of the content package. Detailed review: [blocks/group-a-card-lists.md](blocks/group-a-card-lists.md).

**B. Current problems.** D-A-1 (major, Corrected): Header CTA style (Primary, Secondary) ignored, always tertiary; D-A-2 (major, Corrected): No visible focus ring on Panel, Report, Statistic cards (clipped); D-A-3 (major, Corrected): Card colour on Image cards: no effect, near-white CTA on white, collapsed card; D-A-4 (major, Corrected): Previous / Next disabled while focused: focus falls to the page; D-A-8 (minor, Corrected): Scroll settings shown when no breakpoint scrolls; D-A-9 (minor, Deferred): Edge bleed identical to none in full-width sections; D-A-10 (minor, Deferred): Touch swipe off and no controls: cards unreachable on touch; D-A-11 (minor, Corrected): Reduced-motion support could be switched off; D-A-12 (minor, Corrected): Component ID overrides the Anchor ID; D-A-13 (minor, Corrected): Motion Type duplicates Animation Type; D-A-14 (minor, Deferred): Items above the maximum vanish in Universal Editor; D-A-15 (minor, Corrected): New items prefilled with sample content (TwinX), visible on the live page; D-A-16 (minor, Corrected): Orphan Table List Header definition; D-A-17 (minor, Corrected): Legacy composite multifields in the dialogs; D-A-20 (minor, Corrected): fetchpriority high on every eager card image; D-A-22 (minor, Corrected): Child depth default 2 (model) vs 1 (code); D-A-26 (minor (suspected), Blocked): Card date may shift a day; D-A-28 (minor, Corrected): Empty heading for an item without title; D-C-7 (minor, Corrected): Additional tab without effect; D-D-14 (minor, Corrected): Ragged rows after a Columns change; D-D-26 (minor, Corrected): Page behind the full-screen menu reachable; L-1 (major, Corrected): Live tables have two empty rows (dialog tabs); the first is the header

**C. Dialog validation**

| Field | Current values | Functional mapping | Issue | Final decision |
| --- | --- | --- | --- | --- |
| Heading (heading) | text, default Our transformation solutions | see review | see register | Remove |
| Explore All Link (exploreLink) | richtext | see review | see register | Remove |

**D. Variation validation**

No visual variations beyond the dialog fields above.

**E. Accessibility.** axe (WCAG 2.0 / 2.1 / 2.2 A and AA, 1440 and 390 px) on this block: 0 violation node(s) before, 0 after. Keyboard and semantics: see the review's section E.

**F. Data layer and Analytics.** Registered by decorators/data-layer-decorator.js (`tcs-corp/components/table-list-header`); clicks measured once per interaction (0 test clicks after, 0 duplicates). Analytics mapping: blocked (no Tags / Web SDK in the project).

**G. Personalization.** Not personalizable: no personalization runtime in the project (no Target, no audience source); default content only.

**H. Refactoring decision.** Remove.

**I. Final implementation.** D-A-1: card-list-decorator reads the collapsed bold / italic type; D-A-2: ring drawn inside the card edge; D-A-3: Card colour applies to panel / report / statistic cards only; D-A-4: aria-disabled, focus kept; D-A-8: conditions on the scroll fields; D-A-11: always honoured; field removed (0 uses); D-A-12: field removed (0 uses); stored values still read; D-A-13: mapped to Animation Type on the items (staggered); field removed; library migrated; D-A-15: template and model defaults removed; D-A-16: definition and model removed (0 uses; reader kept); D-A-17: labelled as authored before items (removal needs a production content check); D-A-20: first image only; D-A-22: code default 2; D-A-28: no heading outside the editor; D-C-7: Hide block hides the tab; anchor and spacing fields removed (0 uses); D-D-14: rows padded; D-D-26: inert; L-1: tab rows skipped

**J. Test results.** Not on a library page as a block (decorated by its parent or core component); axe after: 0.

**K. Evidence.** [Screenshot Placeholder: Universal Editor authoring view] [Screenshot Placeholder: Dialog fields] [Screenshot Placeholder: Desktop / Tablet / Mobile rendering] [Screenshot Placeholder: Keyboard focus state] [Screenshot Placeholder: Data-layer output]
