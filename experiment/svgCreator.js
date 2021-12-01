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
  const stepOne = formatTagsToOneLine(svgFile);
  const stepTwo = removeExtraneousInformation(stepOne);
  const classes = generateClassesFromStyles(stepTwo);
  const stepThree = replaceStylesWithClass(stepTwo, classes);
  const stepFour = sortAttributes(stepThree);

  return { classes, data: stepFour };
};

const createComponent = ({ classes, data }, isSingle = false) => {
  const generatedContent = isSingle ? createSingleComponent(data) : createReactComponents(data);

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