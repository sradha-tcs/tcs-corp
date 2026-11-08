# Installation order (assets of earlier migration runs)

For **fresh environments** (a local or new AEM author without the October migration packages): install these packages **before the
page packages** of `../consolidated/packages/` (or anywhere in that sequence before the pages are published). Each asset has a
merge filter: it is created where it is missing; on an author that already has it (e.g. from the October packages) nothing changes.

| # | Batch | Package | MB |
|---|---|---|---|
| 1 | earlier-runs | tcs-corp-ema-earlier-assets-01-1.2.0.zip | 81.8 |
| 2 | earlier-runs | tcs-corp-ema-earlier-assets-02-1.2.0.zip | 78.0 |
| 3 | earlier-runs | tcs-corp-ema-earlier-assets-03-1.2.0.zip | 83.4 |
| 4 | earlier-runs | tcs-corp-ema-earlier-assets-04-1.2.0.zip | 70.2 |
| 5 | earlier-runs | tcs-corp-ema-earlier-assets-05-1.2.0.zip | 84.6 |
| 6 | earlier-runs | tcs-corp-ema-earlier-assets-06-1.2.0.zip | 83.3 |
| 7 | earlier-runs | tcs-corp-ema-earlier-assets-07-1.2.0.zip | 72.4 |
| 8 | earlier-runs | tcs-corp-ema-earlier-assets-08-1.2.0.zip | 77.2 |
| 9 | earlier-runs | tcs-corp-ema-earlier-assets-09-1.2.0.zip | 84.8 |
| 10 | earlier-runs | tcs-corp-ema-earlier-assets-10-1.2.0.zip | 82.7 |
| 11 | earlier-runs | tcs-corp-ema-earlier-assets-11-1.2.0.zip | 83.7 |
| 12 | earlier-runs | tcs-corp-ema-earlier-assets-12-1.2.0.zip | 85.7 |
| 13 | earlier-runs | tcs-corp-ema-earlier-assets-13-1.2.0.zip | 61.5 |
