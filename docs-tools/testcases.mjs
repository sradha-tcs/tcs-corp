// The test cases of a block, derived from its model (shared by the QA and BA packages so their IDs match).
import { COMMON_ADDITIONAL } from './gen-development.mjs';

export const EPICS = [
  ['E01', 'Site navigation and global chrome', 'Visitors find their way through the site on every device', ['header', 'tcs-header', 'footer', 'fragment', 'modal']],
  ['E02', 'Page heroes and page headers', 'Every page opens with a clear, on-brand introduction', ['hero', 'page-header']],
  ['E03', 'Editorial content presentation', 'Authors present stories, offerings and facts in the TCS design language', ['teaser', 'cards', 'columns-container', 'columns', 'column-break', 'quote', 'testimonial', 'separator', 'image-collage', 'accordion', 'tabs', 'tab', 'gen-carousel', 'table', 'anchor-list', 'button-block']],
  ['E04', 'Media', 'Video, embeds and interactive media play accessibly and fast', ['video', 'embed', 'interactive-dashboard']],
  ['E05', 'Listings and discovery', 'Visitors discover related pages, press releases and contacts', ['list', 'filter-list', 'table-list', 'media-contacts']],
  ['E06', 'Forms and lead capture', 'Visitors contact TCS through accessible forms', ['form-variations']],
  ['E07', 'Conversational experience', 'Visitors ask questions in the Conversation Canvas', ['conversation-canvas']],
  ['E08', 'Site structure and localization', 'One site serves 13 locales and three review roots', []],
  ['E09', 'Measurement, accessibility and performance', 'The site is measurable, WCAG 2.1 AA and fast', []],
  ['E10', 'Content migration and publishing', 'The tcs.com content is migrated, published and redirected', []],
];
export const CAPABILITY_FEATURES = {
  E08: [['F-E08-01', 'Locale sites by path', 'utils/site.js LOCALES, paths.json'], ['F-E08-02', 'Review roots with their own references and sheets', 'utils/site.js REVIEW_ROOTS'], ['F-E08-03', 'Inherited navigation, footer and 404 page', 'utils/inherited-metadata.js'], ['F-E08-04', 'Placeholders, taxonomy and data sheets', 'utils/placeholders.js, utils/taxonomy.js, utils/data.js']],
  E09: [['F-E09-01', 'Adobe Client Data Layer', 'decorators/data-layer-decorator.js'], ['F-E09-02', 'Accessibility baseline (WCAG 2.1 AA)', 'decorators/a11y-decorator.js and blocks'], ['F-E09-03', 'Three-phase loading and module preloading', 'scripts/scripts.js, scripts/module-graph.js'], ['F-E09-04', 'Content and background animation', 'decorators/motion-decorator.js, utils/motion.js']],
  E10: [['F-E10-01', 'Migration packages (8,432 pages)', 'delivery branch consolidated/'], ['F-E10-02', 'Redirects from the tcs.com URLs', 'consolidated/sheets/redirects.csv'], ['F-E10-03', 'Dynamic Media delivery of the assets', 'decorators/responsive-image-decorator.js, aem-sites.sh'], ['F-E10-04', 'Publishing and indexing', 'Admin API, helix-query.yaml']],
};
export const epicOf = (block) => (EPICS.find((e) => e[3].includes(block)) || EPICS[2])[0];
const pad = (n) => String(n).padStart(3, '0');

/** the test cases of a block: smoke, authoring, one per variation field, accessibility, responsive, negative */
export function blockTestCases(b) {
  const name = b.meta?.name || b.name;
  const T = b.name.toUpperCase();
  const cases = [];
  const add = (kind, objective, steps, expected, variation = '—', extra = {}) => cases.push({
    id: `TC-${T}-${pad(cases.length + 1)}`, kind, component: b.name, variation, objective, steps, expected, ...extra,
  });
  add('Functional (smoke)', `${name} renders on its block library page`, ['Open the block library page of the block on the live site', 'Wait for the page to load'], 'The page answers 200, every example renders, no console error, no failed request', '—', { automated: true });
  if (b.components.length) {
    add('Authoring', `An author adds the ${name} and fills in its required fields`, ['Open a test page in Universal Editor', `Add the ${name} from the component palette`, 'Fill in the fields of each tab', 'Preview'], 'The block appears with the authored content; no empty placeholder remains');
    b.components.forEach((c) => c.variations.filter((v) => !COMMON_ADDITIONAL.test(v.field || '')).forEach((v) => {
      add('Component variation', `${c.title}: each choice of "${v.label}" gives its presentation`, [`Select the ${c.title}`, `Set "${v.label}" to each of: ${v.options.map((o) => o.name).join(', ')}`, 'Preview after each change'], `The rendering matches the variation (class or attribute ${v.options.map((o) => o.value).filter(Boolean).slice(0, 6).join(', ')}${v.options.length > 6 ? ', ...' : ''})`, v.label);
    }));
    add('Boundary', `${name} with optional fields left empty`, ['Add the block and fill in only the required fields', 'Preview'], 'The block renders without empty wrappers or broken layout');
    add('Negative', `${name} with invalid content (very long text, missing image, broken link)`, ['Enter a 300-character title', 'Remove the image', 'Link to a missing page', 'Preview'], 'Text wraps, no broken image icon, the link is flagged in the link check');
  }
  add('Accessibility', `${name} meets WCAG 2.1 AA`, ['Navigate the block with the keyboard only', 'Check focus visibility, names of buttons and links, alt text, heading order', 'Run a screen reader on the block'], 'Every control is reachable and named; no heading level is skipped; images have alt text or are decorative', '—', { automatedPartial: true });
  add('Responsive', `${name} at 375, 768, 1024 and 1440 px`, ['Open the block library page at each width'], 'No horizontal overflow; layout follows the responsive rules of the README', '—', { automated: true });
  add('Error recovery', `${name} when a dependency fails (sheet, index, media)`, ['Block the placeholders or query index request in the browser', 'Reload'], 'The block shows its English fallback or empty state and the page keeps working');
  return cases;
}
