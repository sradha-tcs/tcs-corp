/* eslint-disable no-console */
/* eslint-disable no-cond-assign */
/* eslint-disable import/prefer-default-export */

// group editable texts in single wrappers if applicable.
// this script should execute after script.js but before the the universal editor cors script
// and any block being loaded

/**
 * The filter with the Text component's rich text toolbar (models/_component-filters.json, named by
 * the Text definition's template in models/_text.json; test/models/text-rte-filter.test.mjs).
 * AEM writes a component's filter from its own `filter` property, which the template sets only
 * when the component is created: Text components authored before the toolbar was configured
 * have none, so Universal Editor would show its default toolbar for them.
 */
export const TEXT_RTE_FILTER = 'richtext';

/**
 * Gives the Text components without a filter the Text toolbar's filter. A Text component is a
 * rich text editable that is a component of its own (`data-aue-behavior="component"`, set when
 * its paragraphs are grouped below); block rich text fields aren't (their filter is the block's).
 * @param {Element|Document} container
 */
export function applyTextRteFilter(container = document) {
  container.querySelectorAll('[data-aue-type="richtext"][data-aue-behavior="component"]:not([data-aue-filter])')
    .forEach((text) => { text.dataset.aueFilter = TEXT_RTE_FILTER; });
}

export function decorateRichtext(container = document) {
  function deleteInstrumentation(element) {
    delete element.dataset.richtextResource;
    delete element.dataset.richtextProp;
    delete element.dataset.richtextFilter;
    delete element.dataset.richtextLabel;
  }

  let element;
  while (element = container.querySelector('[data-richtext-prop]:not(div)')) {
    const {
      richtextResource,
      richtextProp,
      richtextFilter,
      richtextLabel,
    } = element.dataset;
    deleteInstrumentation(element);
    const siblings = [];
    let sibling = element;
    while (sibling = sibling.nextElementSibling) {
      if (sibling.dataset.richtextResource === richtextResource
        && sibling.dataset.richtextProp === richtextProp) {
        deleteInstrumentation(sibling);
        siblings.push(sibling);
      } else break;
    }

    let orphanElements;
    if (richtextResource && richtextProp) {
      orphanElements = document.querySelectorAll(`[data-richtext-id="${richtextResource}"][data-richtext-prop="${richtextProp}"]`);
    } else {
      const editable = element.closest('[data-aue-resource]');
      if (editable) {
        orphanElements = editable.querySelectorAll(`:scope > :not([data-aue-resource]) [data-richtext-prop="${richtextProp}"]`);
      } else {
        console.warn(`Editable parent not found or richtext property ${richtextProp}`);
        return;
      }
    }

    if (orphanElements.length) {
      console.warn('Found orphan elements of a richtext, that were not consecutive siblings of '
        + 'the first paragraph', orphanElements);
      orphanElements.forEach((orphanElement) => deleteInstrumentation(orphanElement));
    } else {
      const group = document.createElement('div');
      if (richtextResource) {
        group.dataset.aueResource = richtextResource;
        group.dataset.aueBehavior = 'component';
      }
      if (richtextProp) group.dataset.aueProp = richtextProp;
      if (richtextLabel) group.dataset.aueLabel = richtextLabel;
      if (richtextFilter) group.dataset.aueFilter = richtextFilter;
      else if (richtextResource) group.dataset.aueFilter = TEXT_RTE_FILTER;
      group.dataset.aueType = 'richtext';
      element.replaceWith(group);
      group.append(element, ...siblings);
    }
  }
  applyTextRteFilter(container);
}
