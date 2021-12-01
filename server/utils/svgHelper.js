/* eslint-disable complexity */
const { capitalizeFirstLetter, toCamelCaseFromDashCase } = require('./stringHelper');

const ZERO = 0;
const ONE = 1;
const attributeRemoveList = ['xml', 'inkscape', 'sodipodi'];
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
const componentTemplate = `/* eslint-disable complexity */
import React from 'react';

const ZERO = 0;

const {{name}} = ({ translateX = ZERO, translateY = ZERO }) => {
  const translate = \`translate(\${translateX},\${translateY})\`;
{{conditions}}
  return (
    <g transform={translate}>
{{svgObj}}
    </g>
  );
};

export default {{name}};
`;
const exportTemplate = 'export { default as {{name}} } from \'./{{name}}\';';
const testTemplate = `import React from 'react';
import {
{{importContent}}
} from './index';

const TestSvg = () => {
  return (
    <svg className="svg--primary-color" width="1920" height="1080" viewBox="0 0 500 500">
{{jsxContent}}
    </svg>
  );
};

export default TestSvg;
`;
const singleTemplate = `import React from 'react';
import './svg.css';

const TestSvg = () => {
  return (
    <svg className="svg--primary-color" width="1920" height="1080" viewBox="0 0 500 500">
{{jsxContent}}
    </svg>
  );
};

export default TestSvg;
`;

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

const createSingleComponent = (data) => {
  const formattedData = formatTagsWithIndents(data).split('\n').map(item => `      ${item}`).join('\n');
  const testContent = singleTemplate.replace('{{jsxContent}}', formattedData);

  return { testjs: testContent };
};

const createReactComponents = (data) => {
  const lines = data.split('\n');
  let mode = 'search';
  let count = 0;

  const parsedSVGObjects = lines
    .map(currentLine => {
      if(currentLine.includes('data-testid="component-')) {
        return `MARK${currentLine}`;
      } else {
        return currentLine;
      }
    })
    .join('\n')
    .split('MARK')
    .splice(ONE)
    .map(currentSegment => {
      const dashCaseName = getAttributeList(currentSegment, 'data-testid="component-')[ZERO]
        .replace('data-testid="component-','')
        .replace('"','');

      const name = `${capitalizeFirstLetter(toCamelCaseFromDashCase(dashCaseName))}SVG`;
      const svgObj = formatTagsWithIndents(currentSegment)
        .replace('data-testid="component-','data-testid="')
        .split('\n')
        .filter(item => Boolean(item))
        .map(line => `      ${line}`)
        .join('\n');

      return { name, svgObj };
    })
    .sort((itemA, itemB) => {
      if(itemA.name > itemB.name) {
        return ONE;
      } else {
        return -ONE;
      }
    })
    .map(entry => {
      const filteredSvgObject = entry.svgObj
        .split('\n')
        .map(currentLine => {
          if (currentLine.includes('data-testid="remove-') && currentLine.includes('/>')) {
            return '';
          } else if (currentLine.includes('data-testid="remove-')) {
            mode = 'remove';

            return '';
          } else if(mode === 'remove' && count === ZERO && currentLine.includes('</')) {
            mode = 'search';
            return '';
          } else if(mode === 'remove' && currentLine.includes('</')) {
            count--;
            return '';
          } else if(mode === 'remove' && currentLine.includes('<') && currentLine.includes('/>')) {
            return '';
          } else if(mode === 'remove' && currentLine.includes('<') && currentLine.includes('>')) {
            count++;
            return '';
          }

          return currentLine;
        })
        .filter(Boolean)
        .join('\n');

      return { ...entry, svgObj: filteredSvgObject};
    })
    .map(entry => {
      const conditions = [];
      const updatedSvgObj = entry.svgObj
        .split('\n')
        .map(currentLine => {
          if (currentLine.includes('data-testid="condition-') && currentLine.includes('/>')) {
            const dashCaseName = getAttributeList(currentLine, 'data-testid="condition-')[ZERO]
              .replace('data-testid="condition-','')
              .replace('"','');
            const name = toCamelCaseFromDashCase(dashCaseName);
            conditions.push(`  const ${name} = true;`);

            return currentLine
              .replace('<', `{ ${name} && <`)
              .replace('/>', '/> }');
          } else if (currentLine.includes('data-testid="condition-')) {
            mode = 'condition';

            const dashCaseName = getAttributeList(currentLine, 'data-testid="condition-')[ZERO]
              .replace('data-testid="condition-','')
              .replace('"','');
            const name = toCamelCaseFromDashCase(dashCaseName);
            conditions.push(`  const ${name} = true;`);

            return currentLine.replace('<', `{ ${name} && <`);
          } else if(mode === 'condition' && count === ZERO && currentLine.includes('</')) {
            mode = 'search';
            return currentLine
              .replace('>', '> }');
          } else if(mode === 'condition' && currentLine.includes('</')) {
            count--;
            return currentLine;
          } else if(mode === 'condition' && currentLine.includes('<') && currentLine.includes('/>')) {
            return currentLine;
          } else if(mode === 'condition' && currentLine.includes('<') && currentLine.includes('>')) {
            count++;
            return currentLine;
          }

          return currentLine;
        })
        .join('\n');

      return { ...entry, svgObj: updatedSvgObj, conditions: conditions.join('\n') };
    })
    .map(entry => {

      const component = componentTemplate
        .replace(/{{name}}/g, entry.name)
        .replace('{{conditions}}', entry.conditions ? `\n${entry.conditions}\n` : '')
        .replace('{{svgObj}}', entry.svgObj);

      return { name: entry.name, component };
    });

  const indexContent = parsedSVGObjects
    .map(entry => exportTemplate.replace(/{{name}}/g, entry.name))
    .join('\n') + '\nimport \'./svg.css\';';

  const importContent = parsedSVGObjects.map(entry => `  ${entry.name}`).join(',\n');
  const jsxContent = parsedSVGObjects.map(entry => `      <${entry.name} />`).join('\n');
  const testContent = testTemplate
    .replace('{{importContent}}', importContent)
    .replace('{{jsxContent}}', jsxContent);

  return { indexjs: indexContent, svgObjects: parsedSVGObjects, testjs: testContent };
};

module.exports = {
  getAttributeList,
  getSortedStyleAttribute,
  formatTagsWithIndents,
  formatTagsToOneLine,
  removeExtraneousInformation,
  generateClassesFromStyles,
  replaceStylesWithClass,
  sortAttributes,
  createSingleComponent,
  createReactComponents
};