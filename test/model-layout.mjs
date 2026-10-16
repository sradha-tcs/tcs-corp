// The cells AEM renders for an item model, for the cell tests of the blocks
import { readFileSync } from 'node:fs';

const SUFFIXES = ['MimeType', 'Alt', 'Text', 'Title', 'Type'];

/**
 * The cells of an item row in model order: one per field (a field ending in Alt / Text / Title /
 * Type / MimeType folds into its base field, classes are left out) and an empty one per dialog tab
 * (null).
 * @param {string} file the block's _{blockname}.json, relative to the repository root
 * @param {string} id the item model's id
 */
export default function modelLayout(file, id) {
  const { models } = JSON.parse(readFileSync(new URL(`../${file}`, import.meta.url)));
  const { fields } = models.find((m) => m.id === id);
  const names = fields.map((f) => f.name).filter(Boolean);
  return fields
    .filter((f) => f.component === 'tab' || (f.name && !/^classes/.test(f.name)
      && !SUFFIXES.some((s) => f.name.endsWith(s) && names.includes(f.name.slice(0, -s.length)))))
    .map((f) => (f.component === 'tab' ? null : f.name));
}
