const {
  formatTagsToOneLine,
  removeExtraneousInformation
} = require('./cleanupHelper');
const {
  generateClassesFromStyles,
  replaceStylesWithClass
} = require('./classHelper');
const { sortAttributes } = require('./attributeHelper');
const {
  createSingleComponent,
  createReactComponents
} = require('./createHelper');

module.exports = {
  formatTagsToOneLine,
  removeExtraneousInformation,
  generateClassesFromStyles,
  replaceStylesWithClass,
  sortAttributes,
  createSingleComponent,
  createReactComponents
};