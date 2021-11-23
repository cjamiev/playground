const { loadFile, writeToFile } = require('../server/utils/file');
const { capitalizeFirstLetter, toCamelCaseFromDashCase } = require('../server/utils/stringHelper');

const ZERO = 0;
const ONE = 1;
const TWO = 2;

const getAttributeList = (line, attr) => {
  if(!line.includes(attr)) {
    return [];
  }

  const attributeList = line.replace(/\s*<\w+\s+/,'').split('" ').map(item => `${item.trim()}"`);
  const attrRegex = new RegExp(`^${attr}`);

  return attributeList.filter(item => attrRegex.test(item));
};

const styleFilterList = [
  'opacity:1',
  'opacity:0.99',
  'fill:#000000',
  'stroke:#000000',
  'overflow:visible',
  '-inkscape-font-specification',
  'stroke-dasharray:none',
  'stroke-linecap',
  'stroke-linejoin',
  'font-family:sans-serif',
  'font-style:normal',
  'font-weight:normal',
  'line-height',
  'font-stretch:normal',
  'font-variant-caps:normal',
  'font-variant-east-asian:normal',
  'font-variant-ligatures:normal',
  'font-variant-numeric:normal',
  'font-variant:normal'
];
const getSortedStyleAttribute = (styleLine) => {
  if(!styleLine || !styleLine.includes('style="')) {
    return '';
  }

  const sortedLine = styleLine
    .replace('style="','')
    .replace('"','')
    .split(';')
    .filter(prop => {
      if(!prop) {
        return false;
      }

      const shouldRemove = styleFilterList.map(item => {
        return prop.includes(item);
      });

      return !shouldRemove.some(item => Boolean(item));
    })
    .sort()
    .join(';');

  return sortedLine ? `style="${sortedLine}"` : '';
};

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

    return spaces + currentLine.trim();
  });

  return updatedLines.join('\n');
};

const removeList = ['xml', 'inkscape', 'sodipodi'];
const removeExtraneousInformation = (data) => {
  const lines = data
    .replace(/id="/gm,'data-testid="')
    .split('\n');

  const updatedLines = lines.map(currentLine => {
    const attributeList = removeList
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

const generateClassesFromStyles = (data) => {
  const lines = data.split('\n');

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
  return [{ cssClass: '.svg--primary-color {\n  fill: #000000;\n  stroke: #000000;\n}\n'}].concat(generatedClasses);
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

const sortAttributes = (data) => {
  const lines = data.split('\n');

  const updatedLines = lines.map((currentLine) => {
    const attributes = currentLine.split(' ');
    const id = attributes.find(item => item.includes('data-testid'));
    const className = attributes.find(item => item.includes('className'));
    const filteredLine = attributes.filter(item => !item.includes('data-testid') && !item.includes('className'));
    const sortedLine = [filteredLine[ZERO], id, className, ...filteredLine.splice(ONE)];

    return sortedLine.join(' ').replace(/[ ]+/g, ' ');
  });

  return updatedLines.join('\n');
};

const createReactComponents = (data) => {
  const lines = data.split('\n');

  const parsedSVGObjects = lines
    .map(currentLine => {
      if(currentLine.includes('data-testid="obj-')) {
        return `MARK${currentLine}`;
      } else {
        return currentLine;
      }
    })
    .join('\n')
    .split('MARK')
    .splice(ONE)
    .map(currentSegment => {
      const dashCaseName = getAttributeList(currentSegment, 'data-testid="obj-')[ZERO].replace('data-testid="obj-','').replace('"','');

      const name = `${capitalizeFirstLetter(toCamelCaseFromDashCase(dashCaseName))}SVG`;
      const svgObj = formatTagsWithIndents(currentSegment)
        .split('\n')
        .filter(item => Boolean(item))
        .map(line => `    ${line}`)
        .join('\n');
      const component = `import React from 'react';\n\nconst ${name} = () => {\n  return (\n${svgObj}\n  );\n};\n\nexport default ${name};`;

      return { name, component };
    })
    .sort((itemA, itemB) => {
      if(itemA.name > itemB.name) {
        return ONE;
      } else {
        return -ONE;
      }
    });

  const indexContent = parsedSVGObjects
    .map(entry => `export { default as ${entry.name} } from './${entry.name}';`)
    .join('\n') + '\nimport \'./svg.css\';';
  const importContent = parsedSVGObjects.map(entry => `  ${entry.name}`).join(',\n');
  const jsxContent = parsedSVGObjects.map(entry => `      <${entry.name} />`).join('\n');
  const svgHelperContent = `import React from 'react';\nimport {\n${importContent}\n} from './index';\n\nconst TestSvg = () => {\n  return (\n    <svg className="svg--primary-color" width="1920" height="1080" viewBox="0 0 507.99999 285.75002">\n${jsxContent}\n    </svg>\n  );\n};\n\nexport default TestSvg;`;

  return { indexjs: indexContent, svgObjects: parsedSVGObjects, testjs: svgHelperContent };
};

const svgFile = loadFile('./tmp/musicstaff-template.svg');
const stepOne = formatTagsToOneLine(svgFile);
const stepTwo = removeExtraneousInformation(stepOne);
const classes = generateClassesFromStyles(stepTwo);
const stepThree = replaceStylesWithClass(stepTwo, classes);
const stepFour = sortAttributes(stepThree);
const generatedContent = createReactComponents(stepFour);

const cssClasses = classes.map(item => item.cssClass).join('\n');
writeToFile('./src/routes/experiment/svg/svg.css', cssClasses);
generatedContent.svgObjects.forEach(entry => {
  writeToFile(`./src/routes/experiment/svg/${entry.name}.js`, entry.component);
});
writeToFile('./src/routes/experiment/svg/index.js', generatedContent.indexjs);
writeToFile('./src/routes/experiment/svg/TestSvg.js', generatedContent.testjs);