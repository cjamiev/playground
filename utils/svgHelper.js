import {
  capitalizeFirstLetter,
  toCamelCaseFromDashCase
} from './stringHelper';

const ZERO = 0;
const ONE = 1;

const getAttributeList = (line, attr) => {
  if(!line.includes(attr)) {
    return [];
  }

  const attributeList = line
    .replace(/\s*<\w+\s+/,'')
    .split('" ')
    .map(item => `${item.trim()}"`);
  const attrRegex = new RegExp(`^${attr}`);

  return attributeList.filter(item => attrRegex.test(item));
};

const getSortedStyleAttribute = (styleLine) => {
  if(!styleLine.includes('style="')) {
    return '';
  }

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
    const styleLine = getAttributeList(currentLine, 'style')[ZERO];

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
    .join('\n') + '\nimport \'./music-staff-svg.css\';';
  const importContent = parsedSVGObjects.map(entry => `  ${entry.name}`).join(',\n');
  const jsxContent = parsedSVGObjects.map(entry => `      <${entry.name} />`).join('\n');
  const svgHelperContent = `import React from 'react';\nimport {\n${importContent}\n} from './svg/index';\n\nconst MusicStaffSVG = () => {\n  return (\n    <svg width="1920" height="1080" viewBox="0 0 507.99999 285.75002">\n${jsxContent}\n    </svg>\n  );\n};\n\nexport default MusicStaffSVG;`;

  return { indexjs: indexContent, svgObjects: parsedSVGObjects, mainjs: svgHelperContent };
};

export {
  getAttributeList,
  getSortedStyleAttribute,
  formatTagsToOneLine,
  formatTagsWithIndents,
  removeExtraneousInformation,
  generateClassesFromStyles,
  replaceStylesWithClass,
  createReactComponents
};
