const { loadFile, writeToFile } = require('../server/utils/file');
const {
  formatTagsToOneLine,
  removeExtraneousInformation,
  generateClassesFromStyles,
  replaceStylesWithClass,
  sortAttributes,
  createSingleComponent,
  createReactComponents
} = require('../server/utils/svgHelper');

const parseSVGFile = () => {
  const svgFile = loadFile('./experiment/example.svg');
  const formattedSvgFile = formatTagsToOneLine(svgFile);
  const { svgTagAttributes, cleanSvgFile } = removeExtraneousInformation(formattedSvgFile);
  const classes = generateClassesFromStyles(cleanSvgFile);
  const svgWithClasses = replaceStylesWithClass(cleanSvgFile, classes);
  const data = sortAttributes(svgWithClasses);

  return { classes, svgTagAttributes, data };
};

const createComponent = ({ classes, svgTagAttributes, data }, isSingle = false) => {
  const generatedContent = isSingle ? createSingleComponent(svgTagAttributes, data) : createReactComponents(svgTagAttributes, data);

  const cssClasses = classes.map(item => item.cssClass).join('\n');
  writeToFile('./src/routes/experiment/svg/svg.css', cssClasses);
  if(!isSingle) {
    generatedContent.svgObjects.forEach(entry => {
      writeToFile(`./src/routes/experiment/svg/${entry.name}.js`, entry.component);
    });
    writeToFile('./src/routes/experiment/svg/index.js', generatedContent.indexjs);
  }
  writeToFile('./src/routes/experiment/svg/TestSvg.js', generatedContent.testjs);
};

const result = parseSVGFile();
createComponent(result, false);