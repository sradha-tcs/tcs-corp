# Page Type from the sheet: the `template` column (13 November 2026)

`metadata.csv`: the `/language-masters/en` metadata sheet with the column `page-type` renamed to **`template`**
(9,794 rows; it also has the hide-in-nav rows for the 359 folder pages and the `keyword-action` column).
Install it in place of the `metadata` sheet of `/content/tcs-corp/language-masters/en`.

| Source | Name | Precedence |
|---|---|---|
| Metadata sheet | `template` | Overrides the page dialog's Page Type |
| Page dialog | Page Type (`page-type`) | Used when the sheet row has no `template` |

Why the column is renamed: Edge Delivery lets a page's own metadata win over a sheet column of the same name, so a
sheet `page-type` can't override the dialog's `page-type`. A sheet that keeps a `page-type` column still applies, but only
where the dialog has no Page Type.

The code (`utils/page-type.js`, `scripts/scripts.js`, `utils/metadata.js`, `utils/query-index.js`, `helix-query.yaml`) is in
the PR "the metadata sheet's template column overrides the page dialog's Page Type". After the sheet is installed and
published and the code merged, reindex the pages so the index gets the `template` column.

Values today: article 5,556, press-release 2,420, listing 667, home 3, blog 1, empty 1,147. The dialog's Page Type of the
7,965 migrated pages that have one has the same value as the sheet, so no page changes its template when the sheet is installed.
