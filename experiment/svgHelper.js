const { loadFile, writeToFile } = require('../server/utils/file');
const { capitalizeFirstLetter, toCamelCaseFromDashCase } = require('../server/utils/stringHelper');

const svgTemplate = loadFile('./tmp/{{name}}SVG.js');

const removeExtraneousInformation = (data) => {
  const updatedData = data
    .replace(/^<[?]xml.+>$/gm,'')
    .replace(/^[ ]+xml.+"+.+"$/gm,'')
    .replace(/^[ ]+version.+"+.+"$/gm,'')
    .replace(/^[ ]+inkscape.+"+.+"$/gm,'')
    .replace(/^[ ]+sodipodi.+"/gm,'')
    .replace(/id="/gm,'data-testid="');

  const lines = updatedData.split('\n');
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

const getTagsOnOneLine = (data) => {
  const lines = data.replace(/(\r|\n)/gm, '').replace(/[ ]+/gm, ' ').split('<');
  let currentSegment = [];
  const updatedData = [];

  lines.forEach(item => {
    if(item.includes('>')) {
      updatedData.push(`<${currentSegment.join('')}${item.trim().replace('\r', '')}`);
      currentSegment = [];
    } else {
      currentSegment.push(item.trim());
    }
  });

  return updatedData.join('\n');
};

const addTagIndents = (data) => {
  const lines = data.split('\n');
  let tabCount = 0;

  const updatedLines = lines.map(item => {
    if (item.includes('</')) {
      tabCount--;
    }
    const tabs = Array.from({ length: tabCount }, (v, i) => '\t').join('');
    if (
      item.includes('<')
      && item.includes('>')
      && !item.includes('</')
      && !item.includes('/>')
    ) {
      tabCount++;
    }

    return tabs + item;
  });

  return updatedLines.join('\n');
};

const createReactComponents = (data) => {
  const lines = data.split('\n');
  let currentSegment = [];
  let name = '';

  lines.forEach((item, index) => {
    if(item.includes('data-testid="obj-')) {
      if(name && currentSegment.length) {
        const componentName = capitalizeFirstLetter(toCamelCaseFromDashCase(name));
        const content = svgTemplate.replace('{{name}}', componentName).replace('{{data}}', currentSegment.join('\n'));
        writeToFile(`./tmp/svg/${componentName}SVG.js`, content);
      }

      name = item.match(/obj-.+"/)[0].split('"')[0].replace('obj-','');
      currentSegment = [item];
    } else if(index === lines.length - 1) { // Note this one will have extra tags at the end
      currentSegment.push(item);

      if(name && currentSegment.length) {
        const componentName = toCamelCaseFromDashCase(name);
        const content = svgTemplate.replace('{{name}}', componentName).replace('{{data}}', currentSegment.join('\n'));
        writeToFile(`./tmp/svg/${componentName}SVG.js`, content);
      }
    } else {
      currentSegment.push(item);
    }
  });
};

const svgFile = loadFile('./tmp/all.svg');
const stepOne = removeExtraneousInformation(svgFile);
const stepTwo = replaceStylesWithClass(stepOne);
const stepThree = getTagsOnOneLine(stepTwo);
const stepFour = addTagIndents(stepThree);
writeToFile('./tmp/out.svg', stepFour);
createReactComponents(stepFour);