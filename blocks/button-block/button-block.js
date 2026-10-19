import { decorateButton, setButtonAlignment } from '../../decorators/button-decorator.js';
import {
  BUTTON_ALIGNMENTS, BUTTON_TYPES, BUTTON_VIEWS, pick,
} from '../../utils/buttons.js';
import { isEditing } from '../../utils/environment.js';
import { linkOf } from '../../utils/links.js';
import { getPlaceholders } from '../../utils/placeholders.js';
import { readProperties, textOf } from '../../utils/properties.js';

/*
 * Button Block (blocks/button-block/_button-block.json, "Button" in Universal Editor): a call to
 * action with the button decorator's View, Type, Icon and Alignment. A block, because AEM delivers
 * every field of a block, while the built-in Button component delivers only its link and
 * Primary / Secondary (as bold / italic), not its View, Icon, Alignment or Tertiary.
 * Key-value rows: link (Text and Title collapsed into the link), buttonView, buttonVariant (Type),
 * buttonIcon, buttonAlignment; the Additional tab arrives as block classes.
 */

/** the authored options, with the model's defaults */
export function readButtonBlock(block) {
  const props = readProperties(block);
  const view = pick(textOf(props.buttonview), BUTTON_VIEWS, 'button');
  return {
    link: linkOf(props.link),
    view,
    type: pick(textOf(props.buttonvariant), BUTTON_TYPES, 'primary'),
    icon: view === 'icon' ? textOf(props.buttonicon) || 'arrow-right' : '',
    alignment: pick(textOf(props.buttonalignment), BUTTON_ALIGNMENTS, 'left'),
  };
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const {
    link, view, type, icon, alignment,
  } = readButtonBlock(block);

  if (!link) {
    block.replaceChildren();
    if (isEditing()) {
      const t = await getPlaceholders();
      const hint = document.createElement('p');
      hint.className = 'button-block-empty';
      hint.textContent = t('buttonBlockEmpty', 'Button: add a Link and a Text.');
      block.append(hint);
    }
    return;
  }

  const wrapper = document.createElement('p');
  wrapper.className = 'button-wrapper';
  setButtonAlignment(wrapper, alignment);
  link.removeAttribute('class');
  wrapper.append(link);
  decorateButton(link, { view, type, icon });
  block.replaceChildren(wrapper);
}
