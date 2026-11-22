/**
 * Objects utils: plain-object helpers shared by the data layer, the XDM mapping and the structured
 * data (pure, no DOM).
 */

/** the object without empty values (undefined, null, '', empty arrays and objects) */
// eslint-disable-next-line import/prefer-default-export
export function compact(value) {
  if (Array.isArray(value)) {
    const list = value.map(compact).filter((v) => v !== undefined);
    return list.length ? list : undefined;
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value).map(([k, v]) => [k, compact(v)])
      .filter(([, v]) => v !== undefined);
    return entries.length ? Object.fromEntries(entries) : undefined;
  }
  return value === '' || value === null || value === undefined ? undefined : value;
}
