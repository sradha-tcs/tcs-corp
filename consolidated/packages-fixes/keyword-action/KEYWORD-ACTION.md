# keyword-action column in the /language-masters/en metadata sheet (13 November 2026)

`metadata.csv`: the metadata sheet with the hide-in-nav rows for the 359 folder pages (9,794 rows) and the new column
`keyword-action`, right after `meta-keywords`. Install it in place of the `metadata` sheet of `/content/tcs-corp/language-masters/en`.

| keyword-action | Page keywords (`<meta name="keywords">`) |
|---|---|
| `default` or empty | The page dialog's Keywords override the sheet's `meta-keywords` (the sheet's are used only when the dialog has none) |
| `override` | The sheet's `meta-keywords` override the dialog's Keywords (the dialog's are used only when the sheet has none) |
| `merge` | Both: the dialog's Keywords first, then the sheet's, each keyword once (compared without case) |

Unknown values act as `default`. The code: `utils/keywords.js` (`resolveKeywords`), applied by `decorators/seo-decorator.js` in the browser.

All rows are empty (`default`). Of the 13 published pages with sheet keywords, one shows other keywords than before the change
(the sheet won until now): `/language-masters/en/who-we-are/newsroom/press-release/tcs-partners-with-cumberland-building-society-transform-core-banking-solution`,
dialog `press release`, sheet `press release, TCS BaNCS™`. Set its row to `override` or `merge` to keep the sheet's keywords.
