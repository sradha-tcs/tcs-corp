import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

// authors shown as avatars before the rest collapse into a +N count
const MAX_GROUP_AVATARS = 3;

/**
 * Reads one author row: an optional picture cell, then name and role cells.
 * @param {Element} row The block row
 * @returns {{ row: Element, picture: Element|null, name: string, role: string }}
 */
function readAuthor(row) {
  const picture = row.querySelector('picture');
  const [name = '', role = ''] = [...row.children]
    .filter((cell) => !cell.querySelector('picture'))
    .map((cell) => cell.textContent.trim())
    .filter(Boolean);
  return {
    row, picture, name, role,
  };
}

/**
 * Builds an avatar from the author's photo, falling back to their initial.
 * @param {{ picture: Element|null, name: string }} author
 * @param {boolean} decorative True when the name is shown next to the avatar
 * @returns {Element}
 */
function buildAvatar({ picture, name }, decorative = false) {
  const avatar = document.createElement('span');
  avatar.className = 'avatar';
  const img = picture?.querySelector('img');
  if (img) {
    const optimized = createOptimizedPicture(img.src, decorative ? '' : name, false, [{ width: '80' }]);
    moveInstrumentation(img, optimized.querySelector('img'));
    avatar.append(optimized);
  } else {
    avatar.textContent = name.charAt(0);
  }

  if (decorative) {
    avatar.setAttribute('aria-hidden', 'true');
  } else {
    avatar.title = name;
    if (!img) {
      avatar.setAttribute('role', 'img');
      avatar.setAttribute('aria-label', name);
    }
  }
  return avatar;
}

/**
 * Builds a single author byline: avatar plus name and role.
 * @param {Object} author
 * @returns {Element}
 */
function buildAuthor(author) {
  const item = document.createElement('div');
  item.className = 'byline-author';
  moveInstrumentation(author.row, item);
  item.append(buildAvatar(author, true));

  const meta = document.createElement('div');
  meta.className = 'byline-meta';
  [['name', author.name], ['role', author.role]].forEach(([field, value]) => {
    if (!value) return;
    const p = document.createElement('p');
    p.className = `byline-${field}`;
    p.textContent = value;
    meta.append(p);
  });
  item.append(meta);
  return item;
}

/**
 * Builds an overlapping avatar group with a +N overflow count.
 * @param {Object[]} authors
 * @returns {Element}
 */
function buildGroup(authors) {
  const group = document.createElement('ul');
  group.className = 'avatar-group overlap';
  group.setAttribute('aria-label', `Authors: ${authors.map((a) => a.name).join(', ')}`);

  authors.slice(0, MAX_GROUP_AVATARS).forEach((author) => {
    const li = document.createElement('li');
    li.className = 'avatar-group-item';
    moveInstrumentation(author.row, li);
    li.append(buildAvatar(author));
    group.append(li);
  });

  const hidden = authors.slice(MAX_GROUP_AVATARS);
  if (hidden.length) {
    const overflow = document.createElement('li');
    overflow.className = 'avatar-overflow';
    overflow.textContent = `+${hidden.length}`;
    overflow.title = hidden.map((a) => a.name).join(', ');
    group.append(overflow);
  }
  return group;
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  // keep every row, even unnamed ones, so new authors stay selectable in the editor
  const authors = [...block.children].map(readAuthor);

  if (authors.length >= MAX_GROUP_AVATARS) {
    block.classList.add('byline-group');
    block.replaceChildren(buildGroup(authors));
  } else {
    block.replaceChildren(...authors.map(buildAuthor));
  }
}
