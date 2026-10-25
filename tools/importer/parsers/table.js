/* eslint-disable */
/* global WebImporter */

/**
 * Table (blocks/table, container block, template name "Table").
 *
 * Source: one <table> of the press release body: div.richText > div.table__scroller-rte > table
 * (current layout) or a table directly in the body (old layout), Word-style markup with
 * colspan / rowspan, spacer columns and &nbsp; padding.
 *
 * Target block table (rows as md2jcr reads a non key-value container block):
 * - one parent row: the Columns setting, field "filter" (table, table-2-columns ... table-9-columns);
 * - one Row item per table row: the first cell is the item's component id (table-row for one
 *   column, table-col-N otherwise) so md2jcr picks the Row model of that width, then one cell
 *   per column with the field hint column1text ... columnNtext.
 *
 * Flattening (blocks/table/README.md: no merged cells):
 * - a full-width row (one cell spanning every column) becomes its label in column 1 and empty cells;
 * - stacked header rows (a first row with rowspan > 1) merge into one header row, the labels of a
 *   column joined top-down ("Composition (%) Q2 FY26");
 * - any other spanned cell repeats its value in every cell it covered;
 * - columns empty in every row are dropped;
 * - cell content keeps its formatting (bold, italics, links, line breaks); empty anchors and
 *   &nbsp; padding go.
 */

const MAX_COLUMNS = 9;

/** header cells of the block tables the press release parsers and transformers build */
const BLOCK_NAMES = /^(Table|Page Header|Media Contacts|List|Teaser|Section Metadata|Metadata)( \(.*\))?$/;

const norm = (s) => (s || '').replace(/[\s ]+/g, ' ').trim();

/** the cell's text with line breaks as spaces */
function cellText(cell) {
  const clone = cell.cloneNode(true);
  clone.querySelectorAll('br').forEach((br) => br.replaceWith(' '));
  clone.querySelectorAll('p, div, li').forEach((el) => el.append(' '));
  return norm(clone.textContent);
}

const isEmptyCell = (cell) => !cell || (!cellText(cell) && !cell.querySelector('img, picture, video, iframe'));

/** every text of the cell is inside <strong> / <b> */
function isBold(cell) {
  const walker = cell.ownerDocument.createTreeWalker(cell, 4 /* SHOW_TEXT */);
  let found = false;
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (norm(node.textContent)) {
      if (!node.parentElement.closest('strong, b')) return false;
      found = true;
    }
  }
  return found;
}

/** trims whitespace / &nbsp; at the start and end of an element's text */
function trimEdges(el) {
  const walker = el.ownerDocument.createTreeWalker(el, 4 /* SHOW_TEXT */);
  const texts = [];
  while (walker.nextNode()) texts.push(walker.currentNode);
  for (const t of texts) {
    t.textContent = t.textContent.replace(/^[\s ]+/, '');
    if (t.textContent) break;
  }
  for (const t of texts.reverse()) {
    t.textContent = t.textContent.replace(/[\s ]+$/, '');
    if (t.textContent) break;
  }
}

/** a source cell's content, cleaned, as nodes for a block cell */
function cellContent(cell, document) {
  const wrapper = document.createElement('div');
  [...cell.childNodes].forEach((n) => wrapper.append(n.cloneNode(true)));
  // anchors without href (Word bookmarks) and their tracking classes
  wrapper.querySelectorAll('a').forEach((a) => {
    if (!a.getAttribute('href')) a.replaceWith(...a.childNodes);
    else a.removeAttribute('class');
  });
  wrapper.querySelectorAll('[style], [class], [width], [valign]').forEach((el) => {
    el.removeAttribute('style');
    el.removeAttribute('class');
    el.removeAttribute('width');
    el.removeAttribute('valign');
  });
  // emphasis and paragraphs left empty by the padding
  wrapper.querySelectorAll('strong, b, em, i, span').forEach((el) => {
    if (!norm(el.textContent) && !el.querySelector('img, br')) el.replaceWith(document.createTextNode(' '));
  });
  wrapper.querySelectorAll('p').forEach((p) => {
    if (!norm(p.textContent) && !p.querySelector('img')) p.remove();
  });
  // spans carry no meaning: unwrap them
  wrapper.querySelectorAll('span').forEach((el) => el.replaceWith(...el.childNodes));
  // a single paragraph: its inline content only
  const elements = [...wrapper.children];
  const texts = [...wrapper.childNodes].filter((n) => n.nodeType === 3 && norm(n.textContent));
  if (elements.length === 1 && elements[0].tagName === 'P' && !texts.length) {
    elements[0].replaceWith(...elements[0].childNodes);
  }
  wrapper.querySelectorAll('p').forEach(trimEdges);
  trimEdges(wrapper);
  return [...wrapper.childNodes];
}

/** the table as a grid of { cell, origin, rowSpan, colSpan } with spans expanded */
function toGrid(table) {
  const grid = [];
  const rows = [...table.rows].filter((tr) => tr.closest('table') === table);
  rows.forEach((tr, r) => {
    grid[r] = grid[r] || [];
    let c = 0;
    [...tr.cells].forEach((cell) => {
      while (grid[r][c]) c += 1;
      const rowSpan = Math.max(1, parseInt(cell.getAttribute('rowspan'), 10) || 1);
      const colSpan = Math.max(1, parseInt(cell.getAttribute('colspan'), 10) || 1);
      for (let dr = 0; dr < rowSpan && r + dr < rows.length; dr += 1) {
        grid[r + dr] = grid[r + dr] || [];
        for (let dc = 0; dc < colSpan; dc += 1) {
          grid[r + dr][c + dc] = {
            cell, origin: dr === 0 && dc === 0, firstRow: dr === 0, rowSpan, colSpan,
          };
        }
      }
      c += colSpan;
    });
  });
  const width = Math.max(0, ...grid.map((row) => row.length));
  return { grid, width };
}

export default function parse(element, { document }) {
  // already replaced (matched by both instance selectors), or a block table built by a parser
  if (!element.isConnected) return;
  const head = element.rows[0]?.cells;
  if (head && head.length === 1 && head[0].tagName === 'TH'
    && BLOCK_NAMES.test(norm(head[0].textContent))) return;
  // a table nested in another table's cell belongs to that table
  if (element.parentElement && element.parentElement.closest('table')) return;

  const { grid, width } = toGrid(element);
  if (!grid.length || !width) {
    element.remove();
    return;
  }

  // stacked header rows: the first row's largest rowspan
  const headerDepth = Math.min(
    grid.length,
    Math.max(1, ...[...element.rows[0].cells].map((c) => parseInt(c.getAttribute('rowspan'), 10) || 1)),
  );
  const merged = headerDepth > 1;

  // rows of { nodes, empty } per column
  const rows = [];
  if (merged) {
    const header = [];
    for (let c = 0; c < width; c += 1) {
      const labels = [];
      let bold = true;
      for (let r = 0; r < headerDepth; r += 1) {
        const slot = grid[r][c];
        if (slot && slot.firstRow && !isEmptyCell(slot.cell)) {
          const label = cellText(slot.cell);
          if (labels[labels.length - 1] !== label) labels.push(label);
          bold = bold && isBold(slot.cell);
        }
      }
      const label = labels.join(' ');
      let nodes = [];
      if (label) {
        if (bold) {
          const strong = document.createElement('strong');
          strong.textContent = label;
          nodes = [strong];
        } else {
          nodes = [document.createTextNode(label)];
        }
      }
      header.push({ nodes, empty: !label });
    }
    rows.push(header);
  }

  for (let r = merged ? headerDepth : 0; r < grid.length; r += 1) {
    const slots = grid[r];
    const fullWidth = slots[0] && slots[0].colSpan >= width && slots.every((s) => s && s.cell === slots[0].cell);
    const row = [];
    for (let c = 0; c < width; c += 1) {
      const slot = slots[c];
      if (!slot || isEmptyCell(slot.cell) || (fullWidth && c > 0)) {
        row.push({ nodes: [], empty: true });
      } else {
        row.push({ nodes: cellContent(slot.cell, document), empty: false });
      }
    }
    rows.push(row);
  }

  // drop the columns that are empty in every row (spacer columns)
  let keep = [];
  for (let c = 0; c < width; c += 1) {
    if (rows.some((row) => !row[c].empty)) keep.push(c);
  }
  if (!keep.length) {
    element.remove();
    return;
  }
  if (keep.length > MAX_COLUMNS) {
    console.warn(`table: ${keep.length} columns, the Table block takes ${MAX_COLUMNS}; the last columns are dropped`);
    keep = keep.slice(0, MAX_COLUMNS);
  }
  const columns = keep.length;
  const filter = columns === 1 ? 'table' : `table-${columns}-columns`;
  const itemModel = columns === 1 ? 'table-row' : `table-col-${columns}`;

  const cells = [];
  // parent row: the Columns setting
  const filterCell = document.createDocumentFragment();
  filterCell.append(document.createComment(' field:filter '), filter);
  cells.push([filterCell]);

  rows
    .filter((row) => keep.some((c) => !row[c].empty))
    .forEach((row) => {
      const item = [itemModel];
      keep.forEach((c, i) => {
        const { nodes, empty } = row[c];
        if (empty || !nodes.length) {
          item.push('');
        } else {
          const frag = document.createDocumentFragment();
          frag.append(document.createComment(` field:column${i + 1}text `), ...nodes);
          item.push(frag);
        }
      });
      cells.push(item);
    });

  const block = WebImporter.Blocks.createBlock(document, { name: 'table', cells });

  // the scroller wrapper holds only this table: replace it as a whole
  const scroller = element.parentElement;
  if (scroller && scroller.matches('div.table__scroller-rte')
    && scroller.querySelectorAll('table').length === 1
    && !norm(scroller.textContent.replace(element.textContent, ''))) {
    scroller.replaceWith(block);
  } else {
    element.replaceWith(block);
  }
}
