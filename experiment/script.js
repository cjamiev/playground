const { createSvgComponents } = require('../server/utils/svgHelper');

const OUTPUT_PATH_DEFAULT = './src/routes/experiment/svg/';
const FILE_PATH_DEFAULT = './experiment/example.svg';
const svgPath = FILE_PATH_DEFAULT;
const targetPath = OUTPUT_PATH_DEFAULT;

createSvgComponents(svgPath, targetPath, false);