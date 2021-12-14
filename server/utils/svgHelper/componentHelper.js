const { capitalizeFirstLetter, toCamelCaseFromDashCase } = require('../stringHelper');
const { subcomponentTemplate, componentTemplate, importTemplate, indexTemplate, svgMapperTemplate, singleTemplate } = require('./templates');
const { getAttributeList } = require('./attributeHelper');

const ZERO = 0;
const ONE = 1;

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

const handleConditionMode = (line, counter) => {
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

const findSubcomponent = (section) => {
  let isAddingCondition = false;
  let count = 0;
  const subcomponents = [];
  const currentCondition = {
    name: '',
    value: []
  };

  const updatedSvgObj = section
    .split('\n')
    .map(currentLine => {
      if (!isAddingCondition && currentLine.includes('data-testid="subcomponent-')) {
        currentCondition.name && subcomponents.push({
          name: currentCondition.name,
          value: currentCondition.value.join('\n')
        });
        isAddingCondition = true;

        const dashCaseName = getAttributeList(currentLine, 'data-testid="subcomponent-')[ZERO]
          .replace('data-testid="subcomponent-','')
          .replace('"','');
        const name = capitalizeFirstLetter(toCamelCaseFromDashCase(dashCaseName));
        currentCondition.name = name;
        currentCondition.value = [currentLine];

        return '';
      } else if(isAddingCondition) {
        const { flag, counter } = handleConditionMode(currentLine, count);

        isAddingCondition = flag;
        count = counter;
        currentCondition.value.push(currentLine);

        return '';
      }

      return currentLine;
    })
    .filter(Boolean)
    .join('\n');

  currentCondition.name && subcomponents.push({
    name: currentCondition.name,
    value: currentCondition.value.join('\n')
  });

  return { subcomponents, updatedSvgObj};
};

const parseOutSubcomponents = (section) => {
  let subcomponents = [];

  let updatedSvgObj = section
    .split('\n')
    .map(currentLine => {
      if (currentLine.includes('data-testid="subcomponent-') && currentLine.includes('/>')) {
        const dashCaseName = getAttributeList(currentLine, 'data-testid="subcomponent-')[ZERO]
          .replace('data-testid="subcomponent-','')
          .replace('"','');
        const name = capitalizeFirstLetter(toCamelCaseFromDashCase(dashCaseName));
        subcomponents.push({
          name,
          value: currentLine
        });

        return `<${name}SVG DELETE />`;
      }

      return currentLine;
    })
    .filter(Boolean)
    .join('\n');

  while(updatedSvgObj.includes('data-testid="subcomponent-')) {
    const result = findSubcomponent(updatedSvgObj);
    subcomponents = subcomponents.concat(result.subcomponents);

    updatedSvgObj = result.updatedSvgObj;
  }

  // Error correction not sure what is the source of this problem
  updatedSvgObj = updatedSvgObj.split('\n').filter(item => !item.includes('DELETE')).join('\n');

  return { updatedSvgObj, subcomponents };
};

const createSingleComponent = (svgTagAttributes, data) => {
  const svgMapperContent = singleTemplate
    .replace('{{svgTagAttributes}}', svgTagAttributes)
    .replace('{{jsxContent}}', removeSpecifiedSvg(data));

  return { svgmapperjs: svgMapperContent };
};

const createReactComponents = (svgTagAttributes, data) => {
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

      const name = capitalizeFirstLetter(toCamelCaseFromDashCase(dashCaseName));
      const svgObj = currentSegment
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
      const { updatedSvgObj, subcomponents } = parseOutSubcomponents(entry.svgObj);

      return { ...entry, svgObj: updatedSvgObj, subcomponents };
    })
    .map(entry => {

      const jsonDataTemplate = entry.subcomponents ? entry.subcomponents
        .map(item => {
          return `{ component:'${item.name}', transform: 'translate(0,0)' }`;
        })
        .join(',') : '';
      const subcomponentList = entry.subcomponents ? entry.subcomponents.map(item => {
        return subcomponentTemplate
          .replace('{{name}}', item.name + 'SVG')
          .replace('{{subcomponentSVG}}', item.value);
      }).join('\n') : '';

      const component = componentTemplate
        .replace(/{{name}}/g, `${entry.name}SVG`)
        .replace('{{subcomponents}}', subcomponentList)
        .replace('{{svgObj}}', entry.svgObj);

      return { componentInfo: { name: entry.name, subcomponentNames: entry.subcomponents }, component, jsonDataTemplate };
    });

  const importContent = parsedSVGObjects
    .map(entry => {
      const subcomponentNames = entry.componentInfo.subcomponentNames.map(item => { return `  ${item.name}SVG`; }).join(',\n');
      const subcomponentsImport = subcomponentNames ? `,\n${subcomponentNames}`: '';

      return importTemplate
        .replace('{{imports}}', `${entry.componentInfo.name}SVG${subcomponentsImport}`)
        .replace('{{name}}', `${entry.componentInfo.name}SVG`);
    })
    .join('\n');
  const svgMapContent = parsedSVGObjects.map(entry => {
    const componentNameKeyMap = `'${entry.componentInfo.name}': ${entry.componentInfo.name}SVG`;
    const subcomponentNames = entry.componentInfo.subcomponentNames.map(item => {
      return `'${item.name}': ${item.name}SVG`;
    }).join(',\n');
    const subcomponentNamesKeyMap = subcomponentNames ? `,\n${subcomponentNames}`: '';

    return `${componentNameKeyMap}${subcomponentNamesKeyMap}\n`;
  });
  const indexContent = indexTemplate
    .replace('{{imports}}', importContent)
    .replace('{{svgMap}}', `const svgMap = {\n${svgMapContent}};`);

  const svgMapperContent = svgMapperTemplate
    .replace('{{svgTagAttributes}}', svgTagAttributes);

  return { indexjs: indexContent, svgObjects: parsedSVGObjects, svgmapperjs: svgMapperContent };
};

module.exports = {
  createSingleComponent,
  createReactComponents
};