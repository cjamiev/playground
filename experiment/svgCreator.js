const { loadFile, writeToFile } = require('../server/utils/file');
const {
  formatTagsToOneLine,
  removeExtraneousInformation,
  generateClassesFromStyles,
  replaceStylesWithClass,
  sortAttributes,
  createReactComponents
} = require('../server/utils/svgHelper');

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