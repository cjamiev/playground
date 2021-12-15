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
  removeSpecifiedSvg,
  handleConditionMode,
  addConditionsToSpecifiedSvg,
  parseOutSubcomponents
} = require('./parseComponentHelper');

const ZERO = 0;
const ONE = 1;

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

      const component = subcomponentList
        ? componentTemplate
          .replace(/{{name}}/g, `${entry.name}SVG`)
          .replace('{{subcomponents}}', subcomponentList)
          .replace('{{svgObj}}', entry.svgObj)
        : componentWithoutSubcomponentTemplate
          .replace(/{{name}}/g, `${entry.name}SVG`)
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