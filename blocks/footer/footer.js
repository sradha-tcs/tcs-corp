import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import { buildSocialLinks } from '../../decorators/social-links-decorator.js';
import { getSocialLinks } from '../../utils/data.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { localePagePath } from '../../utils/site.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment: the Footer metadata, or the locale's references/footer
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : localePagePath('references/footer');
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
