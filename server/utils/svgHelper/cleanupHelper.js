const { getAttributeList } = require('./attributeHelper');

const ONE = 1;
const attributeRemoveList = ['xml', 'inkscape', 'sodipodi'];

const formatTagsToOneLine = (data) => {
  const splitLinesByOpeningTag = data
    .replace(/(\r|\t|\n)/gm, '')
    .replace(/[ ]+/gm, ' ')
    .replace(/">/gm,'" >')
    .split('<');

  const updatedData = splitLinesByOpeningTag
    .slice(ONE)
    .map(item => `<${item}`)
    .join('\n');

  return updatedData;
};

const removeExtraneousInformation = (data) => {
  const lines = data
    .replace(/id="/gm,'data-testid="')
    .split('\n');

  const updatedLines = lines.map(currentLine => {
    const attributeList = attributeRemoveList
      .map(label => {
        return getAttributeList(currentLine, label);
      })
      .reduce((list, acc) => ([...list, ...acc]));

    let newLine = currentLine;
    attributeList.forEach(attr => {
      newLine = newLine.replace(attr,'');
    });

    return newLine.replace(/[ ]+/g, ' ');
  });

  return updatedLines.filter(item => Boolean(item) && item !== ' ').join('\n');
};

module.exports = {
  formatTagsToOneLine,
  removeExtraneousInformation
};