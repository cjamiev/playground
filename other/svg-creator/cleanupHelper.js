const { getAttributeList } = require('./attributeHelper');

const ONE = 1;
const TWO = 2;
const attributeRemoveList = ['xml', 'inkscape', 'sodipodi'];

const formatTagsToOneLine = (data) => {
  const splitLinesByOpeningTag = data
    .replace(/(\r|\t|\n)/gm, '')
    .replace(/[ ]+/gm, ' ')
    .replace(/">/gm, '" >')
    .split('<');

  const updatedData = splitLinesByOpeningTag
    .slice(ONE)
    .map((item) => `<${item}`)
    .join('\n');

  return updatedData;
};

const removeExtraneousInformation = (data) => {
  const lines = data.replace(/id="/gm, 'data-testid="').split('\n');

  const svgTag = lines.find((line) => line.includes('<svg'));
  const width = getAttributeList(svgTag, 'width');
  const height = getAttributeList(svgTag, 'height');
  const viewBox = getAttributeList(svgTag, 'viewBox');
  const svgTagAttributes = width.concat(height).concat(viewBox).join(' ');

  const firstGroupIndex = lines.findIndex((line) => line.includes('<g'));
  const truncatedLines = lines.slice(firstGroupIndex + ONE, lines.length - TWO);

  const cleanSvgFile = truncatedLines
    .map((currentLine) => {
      const attributeList = attributeRemoveList
        .map((label) => {
          return getAttributeList(currentLine, label);
        })
        .reduce((list, acc) => [...list, ...acc]);

      let newLine = currentLine;
      attributeList.forEach((attr) => {
        newLine = newLine.replace(attr, '');
      });

      return newLine.replace(/[ ]+/g, ' ');
    })
    .filter((item) => Boolean(item) && item !== ' ')
    .join('\n');

  return { svgTagAttributes, cleanSvgFile };
};

module.exports = { formatTagsToOneLine, removeExtraneousInformation };
