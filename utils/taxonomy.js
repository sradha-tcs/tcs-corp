/**
 * Taxonomy utils: tag labels from the published taxonomy (/taxonomy.json, see
 * https://www.aem.live/docs/authoring-taxonomy), loaded once per page. Tags missing from the
 * taxonomy fall back to a label derived from the tag ID.
 */
import { parseTag } from './tags.js';

const TAXONOMY_PATH = '/taxonomy.json';

let taxonomy;

/** the taxonomy as a map of tag ID to title; empty when it isn't published */
export function loadTaxonomy() {
  taxonomy = taxonomy || fetch(TAXONOMY_PATH)
    .then((response) => (response.ok ? response.json() : { data: [] }))
    .then(({ data = [] }) => new Map(data
      .filter((row) => row.tag)
      .map((row) => [row.tag.trim(), (row.title || '').trim()])))
    .catch(() => new Map());
  return taxonomy;
}

/**
 * Resolves tags to labels: taxonomy titles for tag IDs, authored titles as they are.
 * @param {string[]} values tag IDs (e.g. tcs:topics/cloud) or titles
 * @returns {Promise<{ id: string, label: string }[]>}
 */
export async function resolveTags(values) {
  if (!values?.length) return [];
  const titles = await loadTaxonomy();
  return values.map((value) => {
    const title = titles.get(value);
    if (title) return { id: value, label: title };
    // an ID (namespace:path) without a taxonomy entry, or an authored title
    return /[:/]/.test(value) ? parseTag(value) : { id: value, label: value };
  });
}
