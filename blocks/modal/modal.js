/*
 * Modal (Block Collection): shows a fragment in a dialog.
 * https://www.aem.live/developer/block-collection/modal
 * Links to a /modals/ path open as a modal (scripts.js); other blocks can use createModal()
 * and openModal(). An authored Modal block renders its link as a button that opens the modal:
 * a <button>, not a link, so it opens the dialog in Universal Editor's preview too (the editor
 * navigates to the target of clicked links).
 * Adapted: close button and opener use the shared button decorator.
 */
import { loadFragment } from '../fragment/fragment.js';
import {
  buildBlock, decorateBlock, loadBlock, loadCSS,
} from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { decorateButton } from '../../decorators/button-decorator.js';
import { createIconButton } from '../../decorators/icon-button-decorator.js';
import { getPlaceholders } from '../../utils/placeholders.js';

export async function createModal(contentNodes) {
  const t = await getPlaceholders();
  await loadCSS(`${window.hlx.codeBasePath}/blocks/modal/modal.css`);
  const dialog = document.createElement('dialog');
  const dialogContent = document.createElement('div');
  dialogContent.classList.add('modal-content');
  dialogContent.append(...contentNodes);
  dialog.append(dialogContent);

  const closeButton = createIconButton({
    label: t('close', 'Close'),
    icon: 'close',
    type: 'tertiary',
    className: 'close-button',
    onClick: () => dialog.close(),
  });
  dialog.prepend(closeButton);

  const block = buildBlock('modal', '');
  document.querySelector('main').append(block);
  decorateBlock(block);
  await loadBlock(block);

  // close on click outside the dialog
  dialog.addEventListener('click', (e) => {
    const {
      left, right, top, bottom,
    } = dialog.getBoundingClientRect();
    const { clientX, clientY } = e;
    if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
      dialog.close();
    }
  });

  let opener = null;
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    block.remove();
    opener?.focus();
  });

  block.innerHTML = '';
  block.append(dialog);

  return {
    block,
    showModal: () => {
      opener = document.activeElement;
      dialog.showModal();
      // reset scroll position
      setTimeout(() => { dialogContent.scrollTop = 0; }, 0);
      document.body.classList.add('modal-open');
    },
  };
}

export async function openModal(fragmentUrl) {
  const path = fragmentUrl.startsWith('http')
    ? new URL(fragmentUrl, window.location).pathname
    : fragmentUrl;

  const fragment = await loadFragment(path);
  if (!fragment) return;
  const { showModal } = await createModal(fragment.childNodes);
  showModal();
}

/**
 * Authored Modal block: its link (to a fragment page) becomes a button opening the page's
 * content in the modal.
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const link = block.querySelector('a[href]');
  if (!link) return;
  const t = await getPlaceholders();
  const href = link.getAttribute('href');
  const text = link.textContent.trim();
  const button = document.createElement('button');
  button.type = 'button';
  // a link without its own text shows its URL
  button.textContent = text && text !== href ? text : t('open', 'Open');
  if (link.title && link.title !== text && link.title !== href) button.title = link.title;
  button.setAttribute('aria-haspopup', 'dialog');
  moveInstrumentation(link, button);
  decorateButton(button, { view: 'button', type: 'primary' });
  button.addEventListener('click', () => openModal(href));
  block.replaceChildren(button);
}
