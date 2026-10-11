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
    // the Table List settings and the form field / table items need one cell per value
    'xwalk/max-cells': ['error', {
      '*': 4,
      section: 6,
      'table-list': 10,
      'table-list-card': 6,
      'table-col-5': 5,
      'field-text': 6,
      'field-select': 6,
      'field-textarea': 6,
      'field-checkbox': 5,
      'contact-card': 5,
    }],
  },
};
