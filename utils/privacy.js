/**
 * Privacy utils: data minimisation for values that leave the page (the Adobe Client Data Layer,
 * Analytics). Pure functions.
 */

/**
 * A search term without personal data: e-mail addresses and phone numbers are replaced, the
 * term is trimmed and cut at 100 characters.
 * @param {string} value
 * @returns {string} '' for an empty search
 */
export const redactSearchTerm = (value) => String(value || '').trim()
  .replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, '[email]')
  .replace(/\+?\d[\d\s().-]{5,}\d/g, '[number]')
  .slice(0, 100);

/**
 * The kind of a contact link (mailto: / tel:), whose address the data layer leaves out.
 * @param {string} href
 * @returns {'email'|'phone'|''} '' for other links
 */
export function contactLinkKind(href) {
  const scheme = String(href || '').trim().toLowerCase().split(':')[0];
  return { mailto: 'email', tel: 'phone' }[scheme] || '';
}
