const { loadFile, writeToFile } = require('./server/utils/file');

const removeExtraneousInformation = (data) => {
  return data
    .replace(/^<[?]xml.+>$/gm,'')
    .replace(/^[ ]+xml.+"+.+"$/gm,'')
    .replace(/^[ ]+version.+"+.+"$/gm,'')
    .replace(/^[ ]+inkscape.+"+.+"$/gm,'')
    .replace(/^[ ]+sodipodi.+"/gm,'')
    .replace(/id="/gm,'data-testid="');
};

const removeExtraTagsAndEmptyLines = (data) => {
  const lines = data.split('\n');
  const removeStartIndex = lines.findIndex(item => item.includes('<defs'));
  const removeEndIndex = lines.findIndex(item => item.includes('</metadata'));

  const updatedLines = lines.filter((item, index) => {
    if(item === '\n' || item === '\t' || item === '\r') {
      return false;
    }
    else if(index >= removeStartIndex && index <= removeEndIndex) {
      return false;
    }

    return true;
  });

  return updatedLines.join('\n');
};

const replaceStylesWithClass = (data) => {
  const generatedClasses = [];
  const lines = data.split('\n');

  const updatedLines = lines.map((item,index) => {
    if(item.includes('style')) {
      const segments = item.split('"');
      const matched = generatedClasses.find(entry => entry.id === segments[1]);
      const parsedStyle = segments[1]
        .split(';')
        .map(style => {
          return `\t${style};\n`;
        })
        .filter(style => !style.includes('-inkscape-font-specification'))
        .join('');
      const generatedStyle = matched ? matched.style : `.name-${index} {\n${parsedStyle}}\n`;
      const updatedLine = matched
        ? segments[0].replace('style=',`className="${matched.className}"${segments[2]}`)
        : segments[0].replace('style=',`className="name-${index}"${segments[2]}`);

      !matched && generatedClasses.push({ style: generatedStyle, id: segments[1], className: `name-${index}` });

      return updatedLine;
    }

    return item;
  });

  writeToFile('./tmp/svg.css', generatedClasses.map(item => item.style).join('\n'));

  return updatedLines.join('\n');
};

const fixEndingTag = (data) => {
  const lines = data.split('\n');

  const updatedLines = lines.map((item, index) => {
    if(lines[index + 1]?.trim() === '/>') {
      return item.replace('\r', ' />');
    }
    else if(lines[index].trim() === '/>') {
      return false;
    } else {
      return item;
    }
  }).filter(item => Boolean(item));

  return updatedLines.join('\n');
};

const svgFile = loadFile('./tmp/all.svg');
const stepOne = removeExtraneousInformation(svgFile);
const stepTwo = removeExtraTagsAndEmptyLines(stepOne);
const stepThree = replaceStylesWithClass(stepTwo);
const stepFour = fixEndingTag(stepThree);

writeToFile('./tmp/out.svg', stepFour);