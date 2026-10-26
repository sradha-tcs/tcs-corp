/* eslint-disable no-console, import/no-unresolved -- Node tooling; docx is not a dependency */
/*
 * The Word version of docs/setup/BYOG-ENVIRONMENT-SETUP.md: headings, paragraphs, lists, tables,
 * code blocks and links, a cover page, a table of contents, headers and page numbers.
 *
 *   DOCX_LIB_DIR=<folder with node_modules/docx> node docs/setup/byog/build-docx.mjs
 *
 * The `docx` package (npm) isn't a dependency of the project: install it in any folder
 * (`npm install docx@9`) and point DOCX_LIB_DIR to it. Writes
 * docs/setup/BYOG-ENVIRONMENT-SETUP.docx. Mermaid diagrams are left out (the document has the
 * same flows as a table).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(`${process.env.DOCX_LIB_DIR || process.cwd()}/`);
const {
  AlignmentType, BorderStyle, Document, ExternalHyperlink, Footer, Header, HeadingLevel,
  LevelFormat,
  Packer, PageNumber, Paragraph, ShadingType, Table, TableCell, TableOfContents, TableRow, TextRun,
  WidthType,
} = require('docx');

const SOURCE = new URL('../BYOG-ENVIRONMENT-SETUP.md', import.meta.url);
const OUT = new URL('../BYOG-ENVIRONMENT-SETUP.docx', import.meta.url);
const BRAND = '1F3864';
const FONT = 'Calibri';
const MONO = 'Consolas';

/** inline markdown (bold, code, links) to runs */
function runs(text, base = {}) {
  const out = [];
  const re = /(\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)|(https?:\/\/[^\s|)]+))/g;
  let last = 0;
  let m = re.exec(text);
  while (m) {
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), ...base }));
    if (m[2]) out.push(new TextRun({ text: m[2], bold: true, ...base }));
    else if (m[3]) {
      out.push(new TextRun({
        text: m[3], font: MONO, size: (base.size || 21) - 2, ...base,
      }));
    } else {
      const label = m[4] || m[6];
      const link = m[5] || m[6];
      if (/^https?:/.test(link)) {
        out.push(new ExternalHyperlink({
          link,
          children: [new TextRun({
            text: label, style: 'Hyperlink', color: '0563C1', underline: {}, ...base,
          })],
        }));
      } else {
        // a link inside the repository: its label and path
        out.push(new TextRun({ text: `${label} (${link.replace(/^(\.\.\/)+/, '')})`, ...base }));
      }
    }
    last = m.index + m[0].length;
    m = re.exec(text);
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), ...base }));
  return out;
}

const border = { style: BorderStyle.SINGLE, size: 4, color: 'A6A6A6' };
const borders = {
  top: border, bottom: border, left: border, right: border,
};

function table(lines) {
  const rows = lines.filter((l) => !/^\|\s*-+/.test(l))
    .map((l) => l.replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map((c) => c.trim()));
  const cols = rows[0].length;
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: rows.map((cells, r) => new TableRow({
      tableHeader: r === 0,
      children: Array.from({ length: cols }, (_, i) => new TableCell({
        borders,
        shading: r === 0 ? { type: ShadingType.CLEAR, color: 'auto', fill: 'D9E2F3' } : undefined,
        margins: {
          top: 40, bottom: 40, left: 80, right: 80,
        },
        children: [new Paragraph({
          children: runs(cells[i] || '', { size: 17, bold: r === 0 || undefined }),
        })],
      })),
    })),
  });
}

function code(lines) {
  return lines.map((l, i) => new Paragraph({
    shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'F2F2F2' },
    spacing: { before: i === 0 ? 80 : 0, after: i === lines.length - 1 ? 120 : 0 },
    children: [new TextRun({ text: l || ' ', font: MONO, size: 16 })],
  }));
}

const md = readFileSync(SOURCE, 'utf8').split('\n');
const title = md[0].replace(/^#\s*/, '');
const body = [];
let i = 1;
while (i < md.length) {
  const line = md[i];
  if (/^```/.test(line)) {
    const lang = line.slice(3).trim();
    const block = [];
    i += 1;
    while (i < md.length && !/^```/.test(md[i])) { block.push(md[i]); i += 1; }
    i += 1;
    if (lang !== 'mermaid') body.push(...code(block));
  } else if (/^\s*```/.test(line)) {
    // an indented code block (inside a list)
    const block = [];
    i += 1;
    while (i < md.length && !/^\s*```/.test(md[i])) { block.push(md[i].replace(/^ {3}/, '')); i += 1; }
    i += 1;
    body.push(...code(block));
  } else if (/^#{2,4}\s/.test(line)) {
    const level = line.match(/^#+/)[0].length;
    const heading = {
      2: HeadingLevel.HEADING_1, 3: HeadingLevel.HEADING_2, 4: HeadingLevel.HEADING_3,
    }[level];
    body.push(new Paragraph({ heading, children: runs(line.replace(/^#+\s*/, '')) }));
    i += 1;
  } else if (/^\|/.test(line)) {
    const block = [];
    while (i < md.length && /^\|/.test(md[i])) { block.push(md[i]); i += 1; }
    body.push(table(block), new Paragraph({ children: [] }));
  } else if (/^\s*[-*]\s/.test(line)) {
    let text = line.replace(/^\s*[-*]\s/, '');
    i += 1;
    while (i < md.length && /^\s{2,}\S/.test(md[i]) && !/^\s*([-*]|\d+\.)\s/.test(md[i])) {
      text += ` ${md[i].trim()}`; i += 1;
    }
    body.push(new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: runs(text) }));
  } else if (/^\s*\d+\.\s/.test(line)) {
    let text = line.replace(/^\s*\d+\.\s/, '');
    i += 1;
    while (i < md.length && /^\s{3,}\S/.test(md[i]) && !/^\s*```/.test(md[i])) {
      text += ` ${md[i].trim()}`; i += 1;
    }
    body.push(new Paragraph({ numbering: { reference: 'steps', level: 0 }, children: runs(text) }));
  } else if (line.trim()) {
    let text = line.trim();
    i += 1;
    while (i < md.length && md[i].trim() && !/^(#|\||```|\s*[-*]\s|\s*\d+\.\s)/.test(md[i])) {
      text += ` ${md[i].trim()}`; i += 1;
    }
    body.push(new Paragraph({ spacing: { after: 120 }, children: runs(text) }));
  } else {
    i += 1;
  }
}

const cover = [
  new Paragraph({ spacing: { before: 2400 }, children: [] }),
  new Paragraph({ children: [new TextRun({ text: 'TCS Corporate — AEM Edge Delivery Services', size: 28, color: '595959' })] }),
  new Paragraph({
    spacing: { before: 200, after: 400 },
    children: [new TextRun({
      text: title, bold: true, size: 44, color: BRAND,
    })],
  }),
  new Paragraph({ children: [new TextRun({ text: 'Reference document: GitHub SaaS (github.com, GitHub Enterprise Cloud), GitHub Enterprise Server and other Git vendors through Cloud Manager (Bring Your Own Git), AEM as a Cloud Service, Configuration Service, Sidekick, Admin API validation', size: 24 })] }),
  new Paragraph({ spacing: { before: 600 }, children: [new TextRun({ text: 'Organisation: Ultimatix · Repository: tcs-corp · Site content: /content/tcs-corp · Edge Delivery site: ultimatix/tcs-corp', size: 22 })] }),
  new Paragraph({ children: [new TextRun({ text: 'Version 1.0 · 26 October 2026 · Rechecked against Adobe documentation (section 17)', size: 22, color: '595959' })] }),
  new Paragraph({
    children: [new TextRun({
      text: 'Source: docs/setup/BYOG-ENVIRONMENT-SETUP.md (generated by docs/setup/byog/build-docx.mjs). Ids, emails, hosts and secrets are placeholders; the values are kept outside the repository (byog.env).', size: 18, italics: true, color: '7F7F7F',
    })],
  }),
  new Paragraph({ pageBreakBefore: true, heading: HeadingLevel.HEADING_1, children: [new TextRun('Contents')] }),
  new TableOfContents('Contents', { hyperlink: true, headingStyleRange: '1-2' }),
  new Paragraph({
    children: [new TextRun({
      text: 'Update the table of contents in Word: right-click it → Update Field.', italics: true, size: 18, color: '7F7F7F',
    })],
  }),
  new Paragraph({ pageBreakBefore: true, children: [] }),
];

const doc = new Document({
  creator: 'TCS Corporate delivery team',
  title,
  description: 'BYOG environment setup reference',
  features: { updateFields: true },
  styles: {
    default: { document: { run: { font: FONT, size: 21 } } },
    paragraphStyles: [
      {
        id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 30, bold: true, color: BRAND }, paragraph: { spacing: { before: 360, after: 120 } },
      },
      {
        id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 25, bold: true, color: '2F5496' }, paragraph: { spacing: { before: 240, after: 100 } },
      },
      {
        id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 22, bold: true, color: '2F5496' }, paragraph: { spacing: { before: 200, after: 80 } },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 260 } } },
        }],
      },
      {
        reference: 'steps',
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 260 } } },
        }],
      },
    ],
  },
  sections: [{
    properties: {
      page: {
        margin: {
          top: 1080, bottom: 1080, left: 1000, right: 1000,
        },
      },
    },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'TCS Corporate · BYOG environment setup', size: 16, color: '7F7F7F' })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ['Page ', PageNumber.CURRENT, ' of ', PageNumber.TOTAL_PAGES], size: 16, color: '7F7F7F' })] })] }) },
    children: [...cover, ...body],
  }],
});

writeFileSync(OUT, await Packer.toBuffer(doc));
console.log(`${OUT.pathname}: ${body.length} elements`);
