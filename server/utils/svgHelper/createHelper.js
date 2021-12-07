/* eslint-disable complexity */
const { capitalizeFirstLetter, toCamelCaseFromDashCase } = require('../stringHelper');
const { componentTemplate, exportTemplate, testTemplate, singleTemplate } = require('./templates');
const { getAttributeList } = require('./attributeHelper');

const ZERO = 0;
const ONE = 1;

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

const handleRemoveMode = (line, counter) => {
  if(counter === ZERO && line.includes('</')) {
    return { flag: false, counter: 0 };
  } else if(line.includes('</')) {
    return { flag: true, counter: counter - ONE };
  } else if(line.includes('<') && line.includes('/>')) {
    return { flag: true, counter };
  } else if(line.includes('<') && line.includes('>')) {
    return { flag: true, counter: counter + ONE };
  }
};

const removeSpecifiedSvg = (section) => {
  let isRemoving = false;
  let count = 0;

  return section
    .split('\n')
    .filter(currentLine => !(currentLine.includes('data-testid="remove-') && currentLine.includes('/>')))
    .map(currentLine => {
      if(isRemoving) {
        const { flag, counter } = handleRemoveMode(currentLine, count);

        isRemoving = flag;
        count = counter;

        return '';
      } else if (!isRemoving && currentLine.includes('data-testid="remove-')) {
        isRemoving = true;

        return '';
      }

      return currentLine;
    })
    .filter(Boolean)
    .join('\n');
};

const addConditionsToSpecifiedSvg = (section) => {
  let mode = 'search';
  let count = 0;
  const conditions = [];

  const updatedSvgObj = section
    .split('\n')
    .map(currentLine => {
      if (currentLine.includes('data-testid="condition-') && currentLine.includes('/>')) {
        const dashCaseName = getAttributeList(currentLine, 'data-testid="condition-')[ZERO]
          .replace('data-testid="condition-','')
          .replace('"','');
        const name = toCamelCaseFromDashCase(dashCaseName);
        conditions.push(name);

        return currentLine
          .replace('data-testid="condition-','data-testid="')
          .replace('<', `{ ${name} && <`)
          .replace('/>', '/> }');
      } else if (currentLine.includes('data-testid="condition-') && mode !== 'condition') {
        mode = 'condition';

        const dashCaseName = getAttributeList(currentLine, 'data-testid="condition-')[ZERO]
          .replace('data-testid="condition-','')
          .replace('"','');
        const name = toCamelCaseFromDashCase(dashCaseName);
        conditions.push(name);

        return currentLine
          .replace('data-testid="condition-','data-testid="')
          .replace('<', `{ ${name} && <`);
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

  return { updatedSvgObj, conditions };
};

const createSingleComponent = (data) => {
  const formattedData = formatTagsWithIndents(data).split('\n').map(item => `      ${item}`).join('\n');
  const testContent = singleTemplate.replace('{{jsxContent}}', formattedData);

  return { testjs: testContent };
};

const createReactComponents = (data) => {
  const lines = data.split('\n');

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
      const filteredSvgObject = removeSpecifiedSvg(entry.svgObj);

      return { ...entry, svgObj: filteredSvgObject};
    })
    .map(entry => {
      const { updatedSvgObj, conditions } = addConditionsToSpecifiedSvg(entry.svgObj);

      return { ...entry, svgObj: updatedSvgObj, conditions };
    })
    .map(entry => {

      const conditionVariables = entry.conditions ? entry.conditions.map(name => `  const ${name} = true;`).join('\n') : '';
      const conditionList = entry.conditions ? entry.conditions.join(', ') : '';

      const component = componentTemplate
        .replace(/{{name}}/g, entry.name)
        .replace('{{conditions}}', conditionVariables ? `\n  \/\/${conditionList}\n${conditionVariables}\n` : '')
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
  formatTagsWithIndents,
  createSingleComponent,
  createReactComponents
};