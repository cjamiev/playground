const { runRegexOperation } = require('./server/regexop');
const { runTemplateOperation } = require('./server/templateop');

const ROOT_DIR = './';
const TRIM_DECIMALS = {
  fileRegex: 'Icon.js$',
  lineRegex: '[.][0-9]{2,}',
  modifiers: 'g',
  lineRange: {
    start: 0,
    end: 3
  },
  replace: ''
};

/*
 runRegexOperation(ROOT_DIR, TRIM_DECIMALS);
 const { data } = runTemplateOperation('read');
 runTemplateOperation('create', './tmp', data, 'template');
*/