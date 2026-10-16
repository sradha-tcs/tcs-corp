# Navigation content package

Builds `docs/content-packages/tcs-corp-navigation-content-final.zip`, the sample pages of the site
navigation (L1-L2-L3, Figma *New Screens from New DS* Navigation 1124:25825, desktop Full menu)
below `/content/tcs-corp/us/en/home`, from `navigation-tree.json`:

```sh
node tools/navigation-package/build-navigation-package.mjs
```

- `navigation-tree.json`: the hierarchy (title, URL-safe page name, Figma node), in Figma order.
- `navigation-tree.csv`: written by the build (level, title, parent, order, AEM and published path).
- The build checks page names, sibling duplicates and the depth (3) before writing the ZIP.
- The package README (inside the ZIP) has the installation steps: check the page defaults
  (`cq:template`, `sling:resourceType`), install (merge filter, one root per L1 page), publish,
  then set Menu root path (Conversation Canvas) and Navigation Root (TCS Header) on the
  Navigation page.

The folder is not served (`.hlxignore`).
