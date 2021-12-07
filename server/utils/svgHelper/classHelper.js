const {
  getAttributeList,
  getSortedStyleAttribute
} = require('./attributeHelper');

const ZERO = 0;

const generateClassesFromStyles = (data) => {
  const lines = data.split('\n');
  const defaultClass = [{
    cssClass: '.svg--primary-color {\n  fill: #000000;\n  stroke: #000000;\n}\n',
    className: 'svg--primary-color'
  }, {
    cssClass: '.svg_mark {\n  fill: #ff0000;\n  stroke: #ff0000;\n}',
    className: 'svg_mark'
  }];

  const styleLines = lines
    .map(currentLine => {
      return getAttributeList(currentLine, 'style')[ZERO];
    })
    .map(currentLine => getSortedStyleAttribute(currentLine))
    .filter(item => Boolean(item));

  const uniqueStyleLines = styleLines.filter((i, position) => styleLines.indexOf(i) === position);

  const generatedClasses = uniqueStyleLines
    .map((styles,index) => {
      const formattedStyles = styles
        .replace('style="','')
        .replace('"','')
        .split(';')
        .map(prop => {
          return `  ${prop};\n`;
        })
        .join('');
      const cssClass = `.svg__${index} {\n${formattedStyles}}\n`;

      return { cssClass, id: styles, className: `svg__${index}` };
    });

  return defaultClass.concat(generatedClasses);
};

const replaceStylesWithClass = (data, classes) => {
  const lines = data.split('\n');

  const updatedLines = lines.map((currentLine,index) => {
    const styleLine = getAttributeList(currentLine, 'style')[ZERO];

    if(!styleLine) {
      return currentLine;
    }

    const styleId = getSortedStyleAttribute(styleLine);

    if(!styleId) {
      return currentLine
        .replace(styleLine,'')
        .replace(/[ ]+/g, ' ');
    }

    const matched = classes.find(item => item.id === styleId);

    if(!matched) {
      throw new Error(`Match not found for: ${styleLine}`);
    }

    const updatedLine = currentLine
      .replace(styleLine,`className="${matched.className}"`);

    return updatedLine;
  });

  return updatedLines.join('\n');
};

module.exports = {
  generateClassesFromStyles,
  replaceStylesWithClass
};