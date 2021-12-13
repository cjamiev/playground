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

const EXPERIMENT_PATH = './src/routes/experiment/svg/';
const EXPERIMENT_SVG_PATH = './experiment/example.svg';
const basePath = EXPERIMENT_PATH;
const svgPath = EXPERIMENT_SVG_PATH;

const parseSVGFile = () => {
  const svgFile = loadFile(svgPath);
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
  writeToFile(`${basePath}svg.css`, cssClasses);
  if(!isSingle) {
    generatedContent.svgObjects.forEach(entry => {
      writeToFile(`${basePath}${entry.name}.js`, entry.component);
    });
    writeToFile(`${basePath}index.js`, generatedContent.indexjs);
  }
  const svgJsonDataTemplate = generatedContent.svgObjects
    .map(entry => {
      return `\n  { component: ${entry.name}, transform: 'translate(0,0)', subcomponents: {${entry.jsonDataTemplate}} }`;
    })
    .join(',');
  const jsonDataTemplate = `const data = [${svgJsonDataTemplate}\n];`;
  writeToFile(`${basePath}TestSvg.js`, generatedContent.testjs.replace('{{jsonDataTemplate}}', jsonDataTemplate));
};

const result = parseSVGFile();
createComponent(result, false);