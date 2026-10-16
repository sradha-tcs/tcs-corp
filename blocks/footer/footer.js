import { moveInstrumentation } from '../../scripts/scripts.js';
import { announceNewTab, setLinkTarget } from '../../decorators/link-decorator.js';
import { uniqueId } from '../../utils/ids.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { getPages } from '../../utils/query-index.js';
import { getLocale, getParentPages } from '../../utils/site.js';
import { toSitePath } from '../../utils/urls.js';

/*
 * Footer (blocks/footer/_footer.json): the Heading Title, then the authored items: Footer
 * Hamburger, Footer Search Bar, Footer CTA Buttons, Footer Copyright and Footer Legal Links.
 * The hamburger opens a floating navigation of the locale's pages from the query index
 * (L1 / L2 pills, an L3 sub-menu, L3 suggestions with a back button), which floats at the
 * bottom of the window until the footer is reached (or docks in a hero / canvas search slot).
 */

/** the design's heading, shown on two lines */
const DEFAULT_HEADING = /^(Let['’]s build the) (future together)$/i;

const SVG_NS = 'http://www.w3.org/2000/svg';

/** an icon from static SVG markup (no authored content) */
function svgIcon(markup) {
  const template = document.createElement('template');
  template.innerHTML = markup.trim();
  return template.content.firstElementChild;
}

const chevronSvg = () => svgIcon(`
  <svg xmlns="${SVG_NS}" class="chevron-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>`);

const arrowLeftSvg = () => svgIcon(`
  <svg xmlns="${SVG_NS}" class="arrow-left-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>`);

const hamburgerSvg = () => svgIcon(`
  <svg xmlns="${SVG_NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>`);

const closeSvg = () => svgIcon(`
  <svg xmlns="${SVG_NS}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>`);

const micSvg = () => svgIcon(`
  <svg xmlns="${SVG_NS}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>`);

const submitSvg = () => svgIcon(`
  <svg xmlns="${SVG_NS}" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>`);

/** shows or hides an element */
const show = (el, visible = true) => {
  if (el) el.hidden = !visible;
};

/** an element with a class and text */
function element(tagName, className, text) {
  const el = document.createElement(tagName);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

/** the path the site serves for an authored link (the locale's published path, e.g. /de-de/x) */
const linkPath = (cell) => toSitePath(cell?.querySelector('a[href]')?.getAttribute('href') || '') || '#';

/**
 * The current page within its locale: its level (L1, L2 or L3) below the locale's Home page,
 * the path segments and the parent page to go back to.
 */
function getCurrentPageInfo() {
  const { root, aemRoot, contentRoot } = getLocale();
  const base = contentRoot ? `${contentRoot}${aemRoot}` : root;
  const path = window.location.pathname
    .replace(/(\.plain)?\.html$/, '')
    .replace(/\/(index)?$/, '');
  const below = path.toLowerCase().startsWith(base.toLowerCase()) ? path.slice(base.length) : path;
  const segments = below.split('/').filter(Boolean);

  const depth = segments.length;
  let level = 'L1';
  if (depth === 2) level = 'L2';
  if (depth >= 3) level = 'L3';

  // the nearest parent page (up to the locale's Home page)
  const parentPath = getParentPages()[0] || `${root}/`;

  return {
    level,
    depth,
    segments,
    parentPath,
    l1Key: segments[0] || '',
    l2Key: segments[1] || '',
    l3Key: segments[2] || '',
  };
}

const EXCLUDED_PAGES = [
  'footer',
  'header',
  'tcs-footer',
  'tcs-header',
  'blocks',
  'home',
  'home-page',
  'homepage',
  'demo',
  'nav',
  'iconlist',
  'qa',
  'test',
];

const isExcluded = (key) => EXCLUDED_PAGES.includes(key.toLowerCase().replace(/\s+/g, '-'));
const titleOf = (key) => key.replace(/-/g, ' ');

/**
 * The locale's pages from the query index (utils/query-index.js, loaded once) as an L1, L2,
 * L3 hierarchy; pages with hide-in-nav are left out.
 */
async function fetchHierarchicalNavData() {
  try {
    const { root } = getLocale();
    const pages = await getPages();
    const navTree = {};

    pages.forEach((page) => {
      if (/^(yes|true)$/i.test(page.row?.hideInNav || '')) return;
      const segments = page.path.slice(root.length).split('/').filter(Boolean);
      if (segments.length === 0) return;
      if (isExcluded(segments[segments.length - 1])) return;

      const [l1Key, l2Key, l3Key] = segments;
      if (isExcluded(l1Key)) return;

      if (!navTree[l1Key]) {
        navTree[l1Key] = {
          key: l1Key,
          title: page.title && segments.length === 1 ? page.title : titleOf(l1Key),
          path: `${root}/${l1Key}`,
          children: {},
        };
      } else if (segments.length === 1 && page.title) {
        navTree[l1Key].title = page.title;
      }

      if (segments.length >= 2) {
        if (isExcluded(l2Key)) return;
        const l1 = navTree[l1Key];
        if (!l1.children[l2Key]) {
          l1.children[l2Key] = {
            key: l2Key,
            title: page.title && segments.length === 2 ? page.title : titleOf(l2Key),
            path: `${root}/${l1Key}/${l2Key}`,
            children: [],
          };
        } else if (segments.length === 2 && page.title) {
          l1.children[l2Key].title = page.title;
        }

        if (segments.length >= 3) {
          if (isExcluded(l3Key)) return;
          l1.children[l2Key].children.push({
            key: l3Key,
            title: page.title || titleOf(l3Key),
            path: `${root}/${l1Key}/${l2Key}/${l3Key}`,
          });
        }
      }
    });

    return Object.values(navTree).map((l1) => ({
      ...l1,
      children: Object.values(l1.children),
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to load navigation index:', error);
    return [];
  }
}

/** the heading: the Heading Title; the design's default text on two lines */
function buildHeading(text) {
  const heading = element('h2', 'footer-heading');
  const [, first, second] = text.match(DEFAULT_HEADING) || [];
  if (first) heading.append(first, document.createElement('br'), second);
  else heading.textContent = text;
  return heading;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const t = await getPlaceholders();
  const newTabHint = t('opensInNewTab', '(opens in a new tab)');
  const blockRows = [...block.children];

  // Heading Title
  const mainTitleRow = blockRows.shift();
  const rawTitle = mainTitleRow?.textContent.trim();
  const titleText = rawTitle || t('footerHeading', 'Let’s build the future together');

  const footerContent = element('div', 'footer-content');
  const heading = buildHeading(titleText);
  if (mainTitleRow?.firstElementChild) moveInstrumentation(mainTitleRow.firstElementChild, heading);
  footerContent.append(heading);

  // Floating Control Bar Containers
  const floatingNav = element('nav', 'footer-floating-nav');
  floatingNav.setAttribute('aria-label', t('footerNavigation', 'Footer navigation'));

  const navAnchorNode = element('div', 'footer-nav-anchor');
  footerContent.append(navAnchorNode);

  const searchRow = element('div', 'footer-search-row');

  const navPillsRow = element('div', 'footer-nav-pills-row');
  navPillsRow.id = uniqueId('footer-nav-pills');
  show(navPillsRow, false);

  const subMenuPanel = element('div', 'footer-submenu-panel');
  show(subMenuPanel, false);

  const ctaRow = element('div', 'footer-cta-row');
  const bottomRow = element('div', 'footer-bottom-row');

  const legalNav = element('nav', 'footer-legal-nav');
  legalNav.setAttribute('aria-label', t('footerLinks', 'Footer links'));

  let hamburgerWrapperNode = null;
  let hamburgerBtnNode = null;
  let searchBoxWrapperNode = null;
  let isNavOpen = false;
  let navTreeData = null;

  let searchQueryVariable = '';

  // the items in authoring order: hamburger, search, CTAs, copyright, legal links
  let seenCopyright = false;

  /**
   * The model of an item row: in Universal Editor from data-aue-model; on the published page
   * (rows without it) from the content: the search variation, the copyright text, an icon, and
   * a link (a CTA before the copyright, a legal link after it)
   */
  const getModelType = (row, index) => {
    const explicitModel = row.dataset?.aueModel;
    if (explicitModel) return explicitModel;

    const text = row.textContent.trim().toLowerCase();
    const firstCell = row.firstElementChild?.textContent.trim().toLowerCase() || '';
    const link = row.querySelector('a[href]');
    const iconLink = link && /\.(svg|png|jpe?g|gif|webp)([?#]|$)/i.test(link.getAttribute('href'));

    if (
      ['both', 'text-only', 'voice-only'].includes(firstCell)
      || (!link && (text.includes('ask canvas') || text.includes('ask us')))
    ) {
      return 'footer-search';
    }
    if (
      !link && (text.includes('©')
      || text.includes('tata consultancy')
      || text.includes('all rights reserved'))
    ) {
      return 'footer-copyright';
    }
    if (row.querySelector('img') || iconLink) return 'footer-hamburger';
    if (link) {
      return seenCopyright || /privacy|terms|cookie|legal/.test(text)
        ? 'footer-legal-item' : 'footer-cta';
    }

    if (index === 0) return 'footer-hamburger';
    if (index === 1) return 'footer-search';
    if (index === 2) return 'footer-cta';
    if (index === 3) return 'footer-copyright';
    if (index === 4) return 'footer-legal-item';

    return 'footer-cta';
  };

  // Process Authored Rows
  blockRows.forEach((row, index) => {
    const model = getModelType(row, index);
    const cells = [...row.children];

    if (model === 'footer-hamburger' && !hamburgerWrapperNode) {
      const authoredImg = cells[0]?.querySelector('img');
      const authoredIconSrc = authoredImg ? authoredImg.src : cells[0]?.textContent.trim();
      const ariaLabel = cells[1]?.textContent.trim()
        || t('openNavigation', 'Open navigation menu');

      const isExternalOrPath = authoredIconSrc
        && (authoredImg || authoredIconSrc.startsWith('/') || authoredIconSrc.startsWith('http'));

      const button = element('button', 'footer-hamburger');
      button.type = 'button';
      button.setAttribute('aria-label', ariaLabel);
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', navPillsRow.id);

      const iconHamburger = element('span', 'icon-hamburger');
      if (isExternalOrPath) {
        const img = element('img', 'custom-hamburger-icon');
        img.src = authoredIconSrc;
        img.alt = '';
        iconHamburger.append(img);
      } else {
        iconHamburger.append(hamburgerSvg());
      }
      const iconClose = element('span', 'icon-close');
      iconClose.append(closeSvg());
      show(iconClose, false);
      button.append(iconHamburger, iconClose);

      row.className = 'footer-hamburger-wrapper';
      row.replaceChildren(button);
      hamburgerWrapperNode = row;
      hamburgerBtnNode = button;
    } else if (model === 'footer-search' && !searchBoxWrapperNode) {
      const variation = cells[0]?.textContent.trim().toLowerCase() || 'both';
      const placeholder = cells[1]?.textContent.trim()
        || t('searchPlaceholder', 'Ask us a question');

      row.className = `footer-search-box mode-${variation.replace(/[^a-z-]/g, '')}`;
      searchBoxWrapperNode = row;

      const formEl = element('form', 'footer-search-form');
      formEl.action = '#';
      formEl.setAttribute('role', 'search');

      let inputEl = null;
      if (variation !== 'voice-only') {
        inputEl = element('input', 'footer-search-input');
        inputEl.type = 'text';
        inputEl.placeholder = placeholder;
        inputEl.setAttribute('aria-label', placeholder);
        formEl.append(inputEl);
      }

      const actions = element('div', 'footer-search-actions');
      let micBtn = null;
      if (variation === 'both' || variation === 'voice-only') {
        micBtn = element('button', 'footer-mic');
        micBtn.type = 'button';
        micBtn.setAttribute('aria-label', t('searchByVoice', 'Search by voice'));
        micBtn.append(micSvg());
        actions.append(micBtn);
      }
      const submitBtn = element('button', 'footer-submit');
      submitBtn.type = 'submit';
      submitBtn.setAttribute('aria-label', t('submitSearch', 'Submit search'));
      submitBtn.append(submitSvg());
      actions.append(submitBtn);
      formEl.append(actions);

      row.replaceChildren(formEl);

      if (inputEl) {
        inputEl.addEventListener('input', (e) => {
          searchQueryVariable = e.target.value;
        });
      }

      formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        if (inputEl) searchQueryVariable = inputEl.value;
        // eslint-disable-next-line no-console
        console.log('Search Query Variable:', searchQueryVariable);
      });

      if (micBtn && inputEl) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
          const recognition = new SpeechRecognition();
          recognition.continuous = false;
          recognition.interimResults = false;

          micBtn.addEventListener('click', (e) => {
            e.preventDefault();
            micBtn.classList.add('listening');
            try {
              recognition.start();
            } catch (err) {
              micBtn.classList.remove('listening');
            }
          });

          const stopListening = () => micBtn.classList.remove('listening');

          recognition.onresult = (e) => {
            stopListening();
            const { transcript } = e.results[0][0];
            inputEl.value = transcript;
            searchQueryVariable = transcript;
          };

          recognition.onerror = stopListening;
          recognition.onend = stopListening;
        } else {
          show(micBtn, false);
        }
      }
    } else if (model === 'footer-cta') {
      const label = cells[0]?.textContent.trim() || t('clickHere', 'Click here');
      const target = cells[2]?.textContent.trim() || '_self';

      row.className = 'footer-cta-item';
      const ctaBtn = element('a', 'footer-cta-btn');
      ctaBtn.href = linkPath(cells[1]);
      const arrow = element('span', 'arrow', '→');
      arrow.setAttribute('aria-hidden', 'true');
      ctaBtn.append(element('span', '', label), arrow);
      setLinkTarget(ctaBtn, target === '_blank');
      if (target === '_blank') announceNewTab(ctaBtn, newTabHint);

      if (cells[0]) moveInstrumentation(cells[0], ctaBtn);
      row.replaceChildren(ctaBtn);
      ctaRow.append(row);
    } else if (model === 'footer-copyright') {
      seenCopyright = true;
      row.className = 'footer-copyright';
      if (cells[0]?.childNodes.length) row.replaceChildren(...cells[0].childNodes);
      else row.textContent = t('copyright', '©TATA Consultancy Services');
      bottomRow.prepend(row);
    } else if (model === 'footer-legal-item') {
      const label = cells[0]?.textContent.trim() || t('privacyAndTerms', 'Privacy & Terms');
      const target = cells[2]?.textContent.trim() || '_self';

      row.className = 'footer-legal-item-wrapper';
      const legalLink = element('a', 'footer-legal-link', label);
      legalLink.href = linkPath(cells[1]);
      setLinkTarget(legalLink, target === '_blank');
      if (target === '_blank') announceNewTab(legalLink, newTabHint);

      if (cells[0]) moveInstrumentation(cells[0], legalLink);
      row.replaceChildren(legalLink);
      legalNav.append(row);
    }
  });

  floatingNav.append(subMenuPanel);
  if (hamburgerWrapperNode) searchRow.append(hamburgerWrapperNode);
  if (searchBoxWrapperNode) searchRow.append(searchBoxWrapperNode);

  // without a hamburger or search bar there is no floating navigation (e.g. the empty footer
  // block aem.js adds to <footer>), so no empty landmark floats at the bottom of the window
  const hasFloatingNav = searchRow.children.length > 0;
  if (hasFloatingNav) {
    floatingNav.append(searchRow, navPillsRow);
    navAnchorNode.append(floatingNav);
  } else {
    navAnchorNode.remove();
  }

  if (ctaRow.children.length > 0) footerContent.append(ctaRow);
  if (legalNav.children.length > 0) bottomRow.append(legalNav);
  if (bottomRow.children.length > 0) footerContent.append(bottomRow);

  block.replaceChildren(footerContent);
  if (!hasFloatingNav) return;

  /**
   * Updates button states
   */
  const updateButtonStateAndPosition = (level) => {
    if (!hamburgerBtnNode || !hamburgerWrapperNode) return;

    const hamburgerIcon = hamburgerBtnNode.querySelector('.icon-hamburger');
    const closeIcon = hamburgerBtnNode.querySelector('.icon-close');

    if (level === 'L1') {
      show(hamburgerWrapperNode);
      searchRow.prepend(hamburgerWrapperNode);
      show(hamburgerIcon, false);
      show(closeIcon);
    } else if (level === 'L2') {
      show(hamburgerWrapperNode);
      navPillsRow.prepend(hamburgerWrapperNode);
      show(hamburgerIcon);
      show(closeIcon, false);
    } else if (level === 'L3') {
      show(hamburgerWrapperNode, false);
    }

    show(searchBoxWrapperNode);
  };

  /**
   * Submenu Panel Renderer (Displays L3 Options on L2 Hover/Selection)
   */
  const renderSubmenuCard = (items) => {
    if (!items || items.length === 0) {
      show(subMenuPanel, false);
      return;
    }

    const grid = element('div', 'footer-submenu-grid');
    items.forEach((item) => {
      const link = element('a', 'footer-submenu-item');
      link.href = item.path;
      const arrow = element('span', 'arrow', '→');
      arrow.setAttribute('aria-hidden', 'true');
      link.append(element('span', '', item.title), arrow);
      link.addEventListener('click', () => show(subMenuPanel, false));
      grid.append(link);
    });
    subMenuPanel.replaceChildren(grid);
    show(subMenuPanel);
  };

  /**
   * Requirement 2: L2 Navigation View
   */
  const renderL2SubNavigation = (l1Data) => {
    navPillsRow.replaceChildren();
    show(subMenuPanel, false);
    updateButtonStateAndPosition('L2');

    const l2Group = element('div', 'footer-l2-pills');

    l1Data.children.forEach((l2) => {
      const l2Pill = element('div', 'footer-nav-pill l2-pill');
      const hasL3 = l2.children && l2.children.length > 0;

      const pillLink = element('a', 'footer-pill-link', l2.title);
      pillLink.href = l2.path;
      l2Pill.append(pillLink);

      let chevronBtn = null;
      if (hasL3) {
        chevronBtn = element('button', 'footer-chevron');
        chevronBtn.type = 'button';
        chevronBtn.setAttribute('aria-label', t('expandSubpages', 'Expand subpages for {title}', { title: l2.title }));
        chevronBtn.setAttribute('aria-expanded', 'false');
        chevronBtn.append(chevronSvg());
        l2Pill.append(chevronBtn);
      }

      const setActive = (active) => {
        l2Group.querySelectorAll('.footer-nav-pill').forEach((p) => {
          p.classList.remove('active');
          p.querySelector('.footer-chevron')?.setAttribute('aria-expanded', 'false');
        });
        if (active) {
          l2Pill.classList.add('active');
          chevronBtn?.setAttribute('aria-expanded', 'true');
        }
      };

      const toggleSubmenu = (e) => {
        if (hasL3) {
          e?.preventDefault();
          const isActive = l2Pill.classList.contains('active');
          setActive(!isActive);
          if (isActive) show(subMenuPanel, false);
          else renderSubmenuCard(l2.children);
        }
      };

      l2Pill.addEventListener('mouseenter', () => {
        if (hasL3) {
          setActive(true);
          renderSubmenuCard(l2.children);
        }
      });

      l2Pill.addEventListener('click', (e) => {
        if (hasL3 && !e.target.closest('a')) {
          toggleSubmenu(e);
        }
      });

      if (chevronBtn) {
        chevronBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleSubmenu(e);
        });
      }

      l2Group.append(l2Pill);
    });

    navPillsRow.append(l2Group);
    show(navPillsRow);
  };

  /**
   * Requirement 1: L1 Navigation View
   */
  const renderL1ParentNavigation = async () => {
    navPillsRow.replaceChildren();
    show(subMenuPanel, false);
    updateButtonStateAndPosition('L1');

    if (!navTreeData) {
      navTreeData = await fetchHierarchicalNavData();
    }

    navTreeData.forEach((l1) => {
      const l1Pill = element('div', 'footer-nav-pill');
      const linkEl = element('a', 'footer-pill-link', l1.title);
      linkEl.href = l1.path;
      l1Pill.append(linkEl);
      navPillsRow.append(l1Pill);
    });

    show(navPillsRow);
  };

  /**
   * Requirement 3: L3 Page Behavior
   * - Places Back Arrow horizontally beside suggestion pills in the same row (fig-2)
   */
  const renderL3SuggestionsView = (suggestionsList = []) => {
    navPillsRow.replaceChildren();
    show(subMenuPanel, false);
    updateButtonStateAndPosition('L3');

    const l3Container = element('div', 'footer-l3-suggestions');

    const backBtn = element('button', 'footer-nav-back');
    backBtn.type = 'button';
    backBtn.setAttribute('aria-label', t('returnToParentPage', 'Return to parent page'));
    backBtn.append(arrowLeftSvg());

    backBtn.addEventListener('click', () => {
      const pageInfo = getCurrentPageInfo();
      if (pageInfo.parentPath) {
        window.location.href = pageInfo.parentPath;
      } else {
        window.history.back();
      }
    });

    l3Container.append(backBtn);

    const pillsGroup = element('div', 'footer-l3-pills');

    suggestionsList.forEach((suggestion) => {
      const sugText = typeof suggestion === 'string' ? suggestion : (suggestion.title || suggestion.key || '');
      if (!sugText) return;

      const sugPill = element('button', 'footer-nav-pill l3-suggestion-pill', sugText);
      sugPill.type = 'button';

      sugPill.addEventListener('click', () => {
        const searchInput = searchBoxWrapperNode?.querySelector('.footer-search-input');
        if (searchInput) {
          searchInput.value = sugText;
          searchQueryVariable = sugText;
          searchInput.focus();
        }
      });

      pillsGroup.append(sugPill);
    });

    l3Container.append(pillsGroup);
    navPillsRow.append(l3Container);
    show(navPillsRow);
  };

  /**
   * Auto-detect level and render corresponding navigation view based on URL path
   */
  const renderCurrentPageNavigation = async () => {
    if (!navTreeData) {
      navTreeData = await fetchHierarchicalNavData();
    }

    const { depth, l1Key, l2Key } = getCurrentPageInfo();

    if (depth >= 3) {
      const matchedL1 = navTreeData.find((l1) => l1.key === l1Key) || navTreeData[0];
      let suggestions = [];

      if (matchedL1) {
        const matchedL2 = matchedL1.children.find((l2) => l2.key === l2Key)
          || matchedL1.children[0];
        if (matchedL2 && matchedL2.children && matchedL2.children.length > 0) {
          suggestions = matchedL2.children;
        } else if (matchedL1.children && matchedL1.children.length > 0) {
          suggestions = matchedL1.children;
        }
      }

      renderL3SuggestionsView(suggestions);
    } else if (depth === 1 || depth === 2) {
      const matchedL1 = navTreeData.find((l1) => l1.key === l1Key) || navTreeData[0];
      if (matchedL1 && matchedL1.children && matchedL1.children.length > 0) {
        renderL2SubNavigation(matchedL1);
      } else {
        await renderL1ParentNavigation();
      }
    } else {
      await renderL1ParentNavigation();
    }
  };

  const closeAllNavigation = () => {
    isNavOpen = false;

    if (hamburgerWrapperNode) {
      searchRow.prepend(hamburgerWrapperNode);
    }
    show(searchBoxWrapperNode);

    if (hamburgerBtnNode) {
      hamburgerBtnNode.setAttribute('aria-expanded', 'false');
      show(hamburgerBtnNode.querySelector('.icon-hamburger'));
      show(hamburgerBtnNode.querySelector('.icon-close'), false);
    }

    show(navPillsRow, false);
    show(subMenuPanel, false);
  };

  if (hamburgerBtnNode) {
    hamburgerBtnNode.addEventListener('click', async () => {
      const { depth, parentPath } = getCurrentPageInfo();

      if (depth >= 1 && isNavOpen) {
        window.location.href = parentPath;
        return;
      }

      if (!isNavOpen) {
        isNavOpen = true;
        hamburgerBtnNode.setAttribute('aria-expanded', 'true');
        await renderCurrentPageNavigation();
      } else {
        closeAllNavigation();
      }
    });
  }

  const initAutoNav = async () => {
    const { depth } = getCurrentPageInfo();
    if (depth >= 1) {
      isNavOpen = true;
      if (hamburgerBtnNode) hamburgerBtnNode.setAttribute('aria-expanded', 'true');
      await renderCurrentPageNavigation();
    }
  };
  initAutoNav();

  floatingNav.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isNavOpen) {
      closeAllNavigation();
      hamburgerBtnNode?.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (!floatingNav.contains(e.target)) {
      show(subMenuPanel, false);
      navPillsRow
        .querySelectorAll('.footer-nav-pill')
        .forEach((p) => p.classList.remove('active'));
    }
  });

  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;

        const heroSlotEl = document.querySelector('.hero-banner-sticky');
        const canvasSlotEl = document.querySelector('.canvas-block-search-slot');

        const isSlotVisible = (el) => {
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return rect.top < windowHeight && rect.bottom > 80;
        };

        const isHeroDocked = isSlotVisible(heroSlotEl);
        const isCanvasDocked = !isHeroDocked && isSlotVisible(canvasSlotEl);

        const footerRect = block.getBoundingClientRect();
        const isAtFooter = footerRect.top < windowHeight - 140;

        if (isHeroDocked && heroSlotEl) {
          if (floatingNav.parentElement !== heroSlotEl) {
            heroSlotEl.append(floatingNav);
          }
          floatingNav.classList.remove('is-fixed');
          floatingNav.classList.add('is-docked-slot');
        } else if (isCanvasDocked && canvasSlotEl) {
          if (floatingNav.parentElement !== canvasSlotEl) {
            canvasSlotEl.append(floatingNav);
          }
          floatingNav.classList.remove('is-fixed');
          floatingNav.classList.add('is-docked-slot');
        } else if (isAtFooter) {
          if (floatingNav.parentElement !== navAnchorNode) {
            navAnchorNode.append(floatingNav);
          }
          floatingNav.classList.remove('is-fixed', 'is-docked-slot');
        } else {
          if (floatingNav.parentElement !== navAnchorNode) {
            navAnchorNode.append(floatingNav);
          }
          floatingNav.classList.add('is-fixed');
          floatingNav.classList.remove('is-docked-slot');
        }

        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}
