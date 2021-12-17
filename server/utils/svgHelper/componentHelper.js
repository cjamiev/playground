const { capitalizeFirstLetter, toCamelCaseFromDashCase } = require('../stringHelper');
const {
  subcomponentTemplate,
  componentTemplate,
  componentWithoutSubcomponentTemplate,
  importTemplate,
  indexTemplate,
  svgMapperTemplate,
  singleTemplate
} = require('./templates');
const { getAttributeList } = require('./attributeHelper');
const {
  trimSvgComponent,
  getSvgSubcomponents,
  addConditionsToSvgComponents
} = require('./parseComponentHelper');

const ZERO = 0;
const ONE = 1;

const createSingleComponent = (svgTagAttributes, data) => {
  const svgMapperContent = singleTemplate
    .replace('{{svgTagAttributes}}', svgTagAttributes)
    .replace('{{jsxContent}}', trimSvgComponent(data));

  return { svgmapperjs: svgMapperContent };
};

const getSvgComponents = (data) => {
  const lines = data.split('\n');

  const svgComponents = lines
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
      const component = currentSegment
        .split('\n')
        .filter(item => Boolean(item))
        .map(line => `      ${line}`)
        .join('\n');

      return { name, component };
    })
    .sort((itemA, itemB) => {
      if(itemA.name > itemB.name) {
        return ONE;
      } else {
        return -ONE;
      }
    });

  return svgComponents;
};

const getParsedComponents = (data) => {
  const filteredSvgComponents = data.map(entry => {
    const filteredSvgObject = trimSvgComponent(entry.component);

    return { ...entry, component: filteredSvgObject};
  });

  const componentsWithSubcomponents = filteredSvgComponents.map(entry => {
    const { updatedSvgObj, subcomponents } = getSvgSubcomponents(entry.component);

    return { ...entry, component: updatedSvgObj, subcomponents };
  });

  return componentsWithSubcomponents.map(entry => {
    const updatedComponent = addConditionsToSvgComponents(entry.component);
    const updatedSubcomponent = entry.subcomponents.map(item => {
      const updatedItem = addConditionsToSvgComponents(item.value);
      return {
        ...item,
        value: updatedItem.updatedSvgObj,
        conditions: updatedItem.conditions
      };
    });

    return { ...entry, component: updatedComponent.updatedSvgObj, conditions: updatedComponent.conditions, subcomponents: updatedSubcomponent };
  });
};

const getParsedData = (data) => {
  return data.map(entry => {
    const subcomponentTestData = entry.subcomponents ? entry.subcomponents
      .map(item => {
        return `{ component:'${item.name}', transform:'translate(0,0)', conditions:{${item.conditions ? item.conditions.map(cond => `${cond}:true`).join(','): '' }}}`;
      })
      .join(',') : '';

    const reactSubcomponents = entry.subcomponents ? entry.subcomponents.map(item => {
      return subcomponentTemplate
        .replace('{{name}}', item.name + 'SVG')
        .replace('{{subcomponentSVG}}', item.value)
        .replace('{{conditions}}', item.conditions.length > ZERO ? `const {${item.conditions.map(cond => ` ${cond}`).join(',')} } = conditions;` : '');
    }).join('\n') : '';

    const reactComponent = reactSubcomponents
      ? componentTemplate
        .replace(/{{name}}/g, `${entry.name}SVG`)
        .replace('{{subcomponents}}', reactSubcomponents)
        .replace('{{svgObj}}', entry.component)
        .replace('{{conditions}}', entry.conditions.length > ZERO ? `const {${entry.conditions.map(cond => ` ${cond}`).join(',')} } = conditions;` : '')
        .replace(/\n{3,}/g,'\n\n')
      : componentWithoutSubcomponentTemplate
        .replace(/{{name}}/g, `${entry.name}SVG`)
        .replace('{{svgObj}}', entry.component)
        .replace('{{conditions}}', entry.conditions.length > ZERO ? `const {${entry.conditions.map(cond => ` ${cond}`).join(',')} } = conditions;` : '')
        .replace(/\n{3,}/g,'\n\n');

    return { name: entry.name, subcomponentNames: entry.subcomponents.map(item => item.name), reactComponent, conditions: entry.conditions, subcomponentTestData };
  });
};

const getGeneratedContent = (svgTagAttributes, data) => {
  const importContent = data
    .map(entry => {
      const subcomponentReactNames = entry.subcomponentNames.map(name => { return `  ${name}SVG`; }).join(',\n');
      const subcomponentsImport = subcomponentReactNames ? `,\n${subcomponentReactNames}`: '';

      return importTemplate
        .replace('{{imports}}', `${entry.name}SVG${subcomponentsImport}`)
        .replace('{{name}}', `${entry.name}SVG`);
    })
    .join('\n');

  const svgMapContent = data.map(entry => {
    const componentNameKeyMap = `'${entry.name}': ${entry.name}SVG`;
    const subcomponentNamesKeyMap = entry.subcomponentNames.map(name => {
      return `'${name}': ${name}SVG`;
    }).join(',\n');

    return subcomponentNamesKeyMap ? `${componentNameKeyMap},\n${subcomponentNamesKeyMap}\n`: componentNameKeyMap;
  });

  const indexContent = indexTemplate
    .replace('{{imports}}', importContent)
    .replace('{{svgMap}}', `const svgMap = {\n${svgMapContent}};`);

  const svgMapperContent = svgMapperTemplate
    .replace('{{svgTagAttributes}}', svgTagAttributes);

  return { svgmapperjs: svgMapperContent, indexjs: indexContent, svgObjects: data };
};

const createReactComponents = (svgTagAttributes, data) => {
  const svgComponents = getSvgComponents(data);
  const parsedSvgComponents = getParsedComponents(svgComponents);
  const parsedData = getParsedData(parsedSvgComponents);

  return getGeneratedContent(svgTagAttributes, parsedData);
};

module.exports = {
  createSingleComponent,
  createReactComponents
};