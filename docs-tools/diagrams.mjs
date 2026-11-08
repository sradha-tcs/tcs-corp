// Mermaid sources of the architecture diagrams (labels quoted so punctuation is safe).
export const mermaid = {
  'system-context.mmd': `flowchart LR
  author(["Content author"]) -->|edits| UE["Universal Editor"]
  UE -->|reads and writes| AEM[("AEM Sites author<br/>/content/tcs-corp")]
  dev(["Developer"]) -->|push and pull request| GH[("GitHub sradha-tcs/tcs-corp")]
  GH -->|AEM Code Sync| CODE["Edge Delivery code bus"]
  AEM -->|publish, Admin API preview and live| CONTENT["Edge Delivery content and media bus"]
  CODE --> EDS{{"Edge Delivery Services<br/>aem.page and aem.live"}}
  CONTENT --> EDS
  DM[("Dynamic Media with OpenAPI<br/>delivery tier")] -->|approved assets| EDS
  EDS -->|HTML, JS, CSS, sheets, query index| visitor(["Site visitor"])
  EDS -->|window.adobeDataLayer| ACDL["Adobe Client Data Layer<br/>no Tags or Web SDK"]`,
  'delivery-flow.mmd': `sequenceDiagram
  participant A as Author (Universal Editor)
  participant S as AEM Sites author
  participant P as Edge Delivery preview (aem.page)
  participant L as Edge Delivery live (aem.live)
  participant I as Query index
  A->>S: edit page and block fields
  A->>S: Publish (Quick publish or Manage publication)
  S->>P: technical account previews the page
  S->>L: publishes it
  L->>I: page indexed (helix-query.yaml) unless excluded
  Note over P,L: Admin API POST preview, live, index (bulk jobs for migrations)`,
  'page-loading.mmd': `flowchart TB
  start["loadPage"] --> eager["Eager: decorateMain, decorateDeliveryImages,<br/>first section, template, LCP image"]
  eager --> lazy["Lazy: other sections, header, footer,<br/>lazy-styles.css, block modules preloaded"]
  lazy --> delayed["Delayed: delayed.js after 3 s"]
  eager -.-> motion["prepareMotion per section"]
  lazy -.-> dl["Data layer: page and component entries"]`,
  'site-roots.mmd': `flowchart TB
  root["/content/tcs-corp"]
  root --> loc["13 locale sites<br/>us/en to /en ... kr/ko-kr to /ko-kr"]
  root --> lm["language-master/en to /language-master/en/<br/>Testing with dummy content"]
  root --> lms["language-masters/en to /language-masters/en/<br/>The language master: migrated content, real sheets"]
  root --> dbm["design-block-master/en to /design-block-master/en/<br/>Block library and curated design pages"]
  root --> sgt["site-global-templates<br/>author only"]
  lms -. later source of .-> loc`,
  'release-flow.mmd': `flowchart LR
  fb["feature branch"] --> pr["Pull request into main<br/>feature preview URL"]
  pr --> checks["CI: lint, AEM Code Sync, PageSpeed check"]
  checks --> review["Human review"]
  review --> merge["merge to main"]
  merge --> sync["Code Sync to main aem.page and aem.live"]
  merge -. rollback .-> revert["revert commit or PR"]`,
};
