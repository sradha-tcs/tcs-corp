module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'plugin:json/recommended',
    'plugin:xwalk/recommended',
  ],
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'import/extensions': ['error', { js: 'always' }], // require js file extensions in imports
    'linebreak-style': ['error', 'unix'], // enforce unix linebreaks
    'no-param-reassign': [2, { props: false }], // allow modifying properties of param
    // section properties render as section-metadata key/value rows, not block cells;
    // the Table List settings and the form field / table / card / Teaser Link items need one
    // cell per value
    'xwalk/max-cells': ['error', {
      '*': 4,
      section: 6,
      // container sections: their Additional tab is container* section fields (data attributes)
      tabs: 21,
      'gen-carousel': 18,
      'columns-container': 22,
      'table-list': 10,
      'table-list-card': 6,
      'list-item': 19,
      card: 16,
      'table-col-5': 5,
      'table-col-6': 6,
      'table-col-7': 7,
      'table-col-8': 8,
      'table-col-9': 9,
      'field-text': 8,
      'field-select': 8,
      'field-textarea': 8,
      'field-checkbox': 8,
      'contact-card': 8,
      'teaser-link': 5,
      'field-richtext': 6,
      'form-variations': 6,
      'field-combined': 7,
    }],
  },
  overrides: [
    {
      // unit tests (node --test): Node globals, ES module test files, long assertion lines
      files: ['test/**/*.mjs'],
      env: { node: true },
      rules: {
        'import/extensions': ['error', { js: 'always', mjs: 'always' }],
        'max-len': 'off',
        'object-curly-newline': 'off',
      },
    },
  ],
};
