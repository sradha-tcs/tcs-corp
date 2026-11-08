# Dynamic Media for the migrated assets (KB-D-067)

Decided on 8 November 2026: the assets stay in the **Sites author's own DAM** (there is no separate AEM Assets
environment) and **Dynamic Media with OpenAPI** delivers them from the environment's delivery tier, images
included. The 8,432 migrated pages below `/language-masters/en` reference every asset by its delivery URL; the old
root `/language-master/en` keeps its DAM paths.

```
images                    https://<delivery host>/adobe/assets/urn:aaid:aem:<asset id>/as/<file name>
videos, audio, documents  https://<delivery host>/adobe/assets/urn:aaid:aem:<asset id>/original/as/<file name>
```

Only **approved** assets are delivered. The site code renders the delivery URLs (`decorateDeliveryImages`: images
as responsive pictures from Dynamic Media), and authors pick assets with the **Dynamic Media asset picker**
(Universal Editor Custom Content Advisor, pull request "Dynamic Media asset picker" in the site repository).

## 1. Prepare the assets (AEM administrator, Sites author)

1. **Reprocess** the assets: Assets > Files > `tcs-corp` > select the folders > **Reprocess** (all renditions).
   Assets installed with content packages aren't processed; the next step waits until they are.
2. Approval, metadata and the asset IDs: from the branch's root folder (see `RUN-SCRIPTS.md`),

   ```bash
   export EDAM_AUTHOR=https://author-p<program>-e<environment>.adobeaemcloud.com   # the Sites author
   export DELIVERY_HOST=delivery-p<program>-e<environment>.adobeaemcloud.com        # its delivery tier
   bash edam-assets.sh --steps 4,5 --batch B001     # pilot; without --batch: all 14,352 assets
   ```

   Step 4 waits for each asset's processing, writes title, description, tags and source and **approves** it;
   step 5 exports the asset IDs to `edam-state/asset-ids.csv` and checks 5 delivered images (200). Exit code 3:
   assets still processing, run the same command again later.

## 2. Rebuild and install the pages (Sites author)

```bash
export SITES_AUTHOR=$EDAM_AUTHOR
bash aem-sites.sh --batch B001      # pilot; without --batch: all 60 page packages
```

It rebuilds the page packages 1.3.0 as **1.3.0-edam** with the delivery URLs (`--images dynamic-media`, the
default) into `packages-for-edam-sites/content-packages/`, installs them (each page replaced by its rebuilt
version; B004 has no pages and is skipped) and writes the sheets with their asset cells rewritten to
`content-packages/sheets/` (replace `data/authors` on the author with `data-authors.csv` from there). Packages
whose assets have no ID yet aren't built (exit code 4: run step 1 for them, then again).

Then preview, publish and index the pages below `/language-masters/en` (the migration team runs it through the
Admin API).

## 3. The asset picker for authors (AEM administrator, once per Sites environment)

1. **Extension Manager** (Experience Cloud): select the Sites environment and enable **Universal Editor Custom
   Content Advisor** (namespace parameter unset).
2. Fill in the templates in `asset-selector/`: `<author host>` and `<delivery host>` are the Sites environment's
   host names without `https://`. `aemTierType` `delivery` lists approved assets only, `rootPath` is
   `/content/dam/tcs-corp`, `alwaysUseDMDelivery` stores delivery URLs.
3. Upload them to the Sites author: Assets > Files > create `tcs-corp-config`, in it `asset-selector`, and upload
   `image.config.json` and `image-or-animation.config.json` (same names; not published).
4. Merge the "Dynamic Media asset picker" pull request (the fields aren't editable without the extension), then
   open a Teaser in Universal Editor: its Image field lists the approved images of `/content/dam/tcs-corp`.

| Configuration | Fields |
|---|---|
| `image.config.json`: images | Card, Columns Container and Section Background Image, Conversation Canvas (background, icon, search bar audio icon), Embed placeholder, Hero icon, Image, Image Collage item, List Item, Quote, TCS Header logos, Teaser author image, Teaser Collage image, Testimonial author image, Video poster |
| `image-or-animation.config.json`: images and Lottie animations (`.json`) | Hero Image Path, Teaser Image |

## To check in the B001 pilot (not recorded yet)

- The alt text of images delivered as links (the pages keep their `<field>Alt` values).
- Section backgrounds (delivered as a data attribute), the built-in Image component, SVG logos.
- Lottie files and videos loading from the delivery host.
- The relative `configUrl` of the picker on the Sites author.
