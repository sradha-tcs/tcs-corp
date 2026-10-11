import { loadFragment } from '../fragment/fragment.js';
import { buildSocialLinks } from '../../decorators/social-links-decorator.js';
import { getSocialLinks } from '../../utils/data.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { getInheritedMetadata } from '../../utils/inherited-metadata.js';
import { resolvePagePath } from '../../utils/site.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment: the Footer page property of the page or, inherited, of its nearest
  // parent page up to Home (or the metadata sheet's footer column), else the locale's
  // references/footer
  const footerPath = resolvePagePath(await getInheritedMetadata('footer'), 'references/footer');
  const [fragment, socialLinks, t] = await Promise.all([
    loadFragment(footerPath), getSocialLinks(), getPlaceholders(),
  ]);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment?.firstElementChild) footer.append(fragment.firstElementChild);

  // the locale's Social Links data sheet, in Sort Order
  const social = buildSocialLinks(
    socialLinks,
    'footer-social',
    (platform) => t('followUsOn', 'Follow us on {platform}', { platform }),
  );
  if (social) footer.append(social);

  block.append(footer);
}
