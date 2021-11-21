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

export {
  getTagAttribute,
  formatTagsToOneLine,
  formatTagsWithIndents,
  removeExtraneousInformation
};
