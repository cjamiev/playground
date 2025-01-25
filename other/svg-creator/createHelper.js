const { loadFile, writeToFile } = require('./io');
const { formatTagsToOneLine, removeExtraneousInformation } = require('./cleanupHelper');
const { generateClassesFromStyles, replaceStylesWithClass } = require('./classHelper');
const { sortAttributes } = require('./attributeHelper');
const { createSingleComponent, createReactComponents } = require('./componentHelper');

const parseSVGFile = (svgPath) => {
  const svgFile = loadFile(svgPath);
  const formattedSvgFile = formatTagsToOneLine(svgFile);
  const { svgTagAttributes, cleanSvgFile } = removeExtraneousInformation(formattedSvgFile);
  const classes = generateClassesFromStyles(cleanSvgFile);
  const svgWithClasses = replaceStylesWithClass(cleanSvgFile, classes);
  const data = sortAttributes(svgWithClasses);

  return { classes, svgTagAttributes, data };
};

const writeComponentsToFile = ({ classes, svgTagAttributes, data }, targetPath, isSingleComponent = false) => {
  const generatedContent = isSingleComponent
    ? createSingleComponent(svgTagAttributes, data)
    : createReactComponents(svgTagAttributes, data);

  const cssClasses = classes.map((item) => item.cssClass).join('\n');
  writeToFile(`${targetPath}svg.css`, cssClasses);
  if (!isSingleComponent) {
    generatedContent.svgObjects.forEach((entry) => {
      writeToFile(`${targetPath}${entry.name}SVG.js`, entry.reactComponent);
    });
    writeToFile(`${targetPath}index.js`, generatedContent.indexjs);
    const testData = generatedContent.svgObjects
      .map((entry) => {
        return `\n  { component:'${entry.name}', transform:'translate(0,0)', conditions:{${
          entry.conditions ? entry.conditions.map((cond) => `${cond}:true`).join(',') : ''
        }}, subcomponents:[${entry.subcomponentTestData}] }`;
      })
      .join(',');
    const jsonDataTemplate = `const testData = [${testData}\n];`;
    writeToFile(
      `${targetPath}SvgMapper.js`,
      generatedContent.svgmapperjs.replace('{{jsonDataTemplate}}', jsonDataTemplate)
    );
  } else {
    writeToFile(`${targetPath}SvgMapper.js`, generatedContent.svgmapperjs.replace('{{jsonDataTemplate}}', ''));
  }
};

const createSvgComponents = (svgPath, targetPath, isSingleComponent) => {
  const { classes, svgTagAttributes, data } = parseSVGFile(svgPath);
  writeComponentsToFile({ classes, svgTagAttributes, data }, targetPath, isSingleComponent);
};

module.exports = { createSvgComponents };
