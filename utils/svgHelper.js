const ZERO = 0;
const ONE = 1;

const getTagAttribute = (line, attr) => {
  if(!line.includes(attr)) {
    return '';
  }

  const segment = line.split(attr)[ONE].split('"');
  const attrString = `${attr}${segment[ZERO]}"${segment[ONE]}"`;

  return attrString;
};

const getSortedStyleAttribute = (styleLine) => {
  const sortedLine = styleLine
    .replace('style="','')
    .replace('"','')
    .split(';')
    .filter(prop => prop && !prop.includes('-inkscape-font-specification'))
    .sort()
    .join(';');

  return `style="${sortedLine}"`;
};

const formatTagsToOneLine = (data) => {
  const splitLinesByOpeningTag = data
    .replace(/(\r|\t|\n)/gm, '')
    .replace(/[ ]+/gm, ' ')
    .split('<');

  const updatedData = splitLinesByOpeningTag
    .slice(ONE)
    .map(item => `<${item}`)
    .join('\n');

  return updatedData;
};

const formatTagsWithIndents = (data) => {
  const lines = data.split('\n');
  let indentCount = 0;

  const updatedLines = lines.map(currentLine => {
    if (currentLine.includes('</')) {
      indentCount--;
    }
    const spaces = Array.from({ length: indentCount }, i => '  ').join('');
    if (!currentLine.includes('</') && !currentLine.includes('/>')) {
      indentCount++;
    }

    return spaces + currentLine;
  });

  return updatedLines.join('\n');
};

const removeExtraneousInformation = (data) => {
  const lines = data
    .replace(/id="/gm,'data-testid="')
    .split('\n');

  const updatedLines = lines.map(currentLine => {
    const xmlAttr = getTagAttribute(currentLine, 'xml');
    const inkscapeAttr = getTagAttribute(currentLine, 'inkscape');
    const sodipodiAttr = getTagAttribute(currentLine, 'sodipodi');

    return currentLine
      .replace(`${xmlAttr} `,'')
      .replace(xmlAttr,'')
      .replace(`${inkscapeAttr} `,'')
      .replace(inkscapeAttr,'')
      .replace(`${sodipodiAttr} `,'')
      .replace(sodipodiAttr,'');
  });

  return updatedLines.join('\n');
};

const generateClassesFromStyles = (data) => {
  const lines = data.split('\n');

  const styleLines = lines
    .map(currentLine => {
      return getTagAttribute(currentLine, 'style=');
    })
    .filter(item => Boolean(item))
    .map(currentLine => getSortedStyleAttribute(currentLine));

  const uniqueStyleLines = styleLines.filter((i, position) => styleLines.indexOf(i) === position);

  const generatedClasses = uniqueStyleLines
    .map((styles,index) => {
      const formattedStyles = styles
        .replace('style="','')
        .replace('"','')
        .split(';')
        .map(prop => {
          return `\t${prop};\n`;
        })
        .join('');
      const cssClass = `.name-${index} {\n${formattedStyles}}\n`;

      return { cssClass, id: styles, className: `name-${index}` };
    });

  return generatedClasses;
};

const replaceStylesWithClass = (data, classes) => {
  const lines = data.split('\n');

  const updatedLines = lines.map((currentLine,index) => {
    const styleLine = getTagAttribute(currentLine, 'style=');

    if(!styleLine) {
      return currentLine;
    }

    const styleId = getSortedStyleAttribute(styleLine);
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

export {
  getTagAttribute,
  getSortedStyleAttribute,
  formatTagsToOneLine,
  formatTagsWithIndents,
  removeExtraneousInformation,
  generateClassesFromStyles,
  replaceStylesWithClass
};
