# EDAM asset picker: set-up

Authors pick the site's assets in Universal Editor from the separate AEM Assets environment (EDAM, KB-D-064)
with the **Universal Editor Custom Content Advisor** extension (Adobe Developer: "Universal Editor Custom
Content Advisor", Extension Manager > extensions developed by Adobe). The 20 asset fields of 15 component models
use it (`custom-asset-namespace:custom-asset`); each is followed by its MIME type field (`<field>MimeType`,
`custom-asset-namespace:custom-asset-mimetype`), which the picker fills, so images go through the Edge Delivery
media bus (E-D3) and blocks keep reading `<picture>` elements. Videos, documents and Lottie files are delivered by
Dynamic Media with OpenAPI as links (`decorateDeliveryImages`, `utils/media.js` `deliveryAsset`).

| Picker configuration | Fields |
|---|---|
| `image.config.json`: images | Card, Columns Container and Section Background Image, Conversation Canvas (background, icon, search bar audio icon), Embed placeholder, Hero icon, Image, Image Collage item, List Item, Quote, TCS Header logos, Teaser author image, Teaser Collage image, Testimonial author image, Video poster |
| `image-or-animation.config.json`: images and Lottie animations (`.json`) | Hero Image Path, Teaser Image (their Image type Lotto / Lottie) |

## Why the configuration isn't in the repository

The configuration lists the Assets environment's author and delivery hosts (`repoNames`), which carry the
program and environment ids, and the repository holds none (AGENTS.md, privacy). The models therefore read it
from a path on the **Sites author** (`configUrl` = `/content/dam/tcs-corp-config/asset-selector/<name>.config.json`, a
relative path the extension resolves on the AEM environment Universal Editor edits), and this folder keeps
templates with placeholders. Another benefit: each Sites environment (development, stage, production) can list
its own Assets environment without a code change.

## Set-up (AEM administrator, once per Sites environment)

1. **Extension Manager** (Experience Cloud > Extension Manager): select the Sites environment and enable
   **Universal Editor Custom Content Advisor**. Leave its namespace parameter (`asset-namespace`) unset: the
   models use the default `custom-asset-namespace`.
2. **Fill in the two templates** of this folder:
   - `<assets author host>` and `<assets delivery host>`: the Assets environment's host names without `https://`
     (`author-p…-e….adobeaemcloud.com`, `delivery-p…-e….adobeaemcloud.com`);
   - `<custom delivery domain>` (decision E-D2): the custom delivery domain; without one, remove `assetDomainMapping`
     (E-D2 answered 8 November 2026: the default delivery host for now, so remove it).
   `aemTierType` `delivery` lists approved assets only (the only ones delivered); `rootPath` is the site's
   folder on EDAM (`/content/dam/tcs-corp`); `alwaysUseDMDelivery` stores delivery URLs.
3. **Upload them to the Sites author**: Assets > Files > create the folder `tcs-corp-config`, in it
   `asset-selector`, and upload `image.config.json` and `image-or-animation.config.json` (same names). They are
   read by the editor only: don't publish them.
4. **Check**: open a page in Universal Editor, select a Teaser and open its Image field: the picker lists the
   Assets environment, images only, approved assets only. Pick one and publish: the page shows the image from
   the media bus (an `<img>` below `./media_…`). The Hero Image Path of a Lotto Hero also lists `.json` files.

## Behaviour and limits

- Pages authored before keep their `/content/dam/...` paths and render as before; the fields show those paths
  until an author picks again.
- The `custom-asset-namespace:*` field types come from the extension: without it, expect the asset fields not to
  be editable. Enable it before deploying this code to an environment authors use (this is why the change waits
  on `edam-main`).
- The picker opens only from the field in the properties panel (not by clicking the asset on the page).
- Not recorded yet (to check in the B001 pilot): the relative `configUrl` on the Sites author, the built-in
  Image component with a delivery URL, the Section background (delivered as a data attribute), Lottie files
  fetched from the delivery host (CORS), and the MIME type of SVG logos.
