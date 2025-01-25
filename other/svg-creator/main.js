const { createSvgComponents } = require('./createHelper');

const FILE_PATH = './tmp/input.svg';
const OUTPUT_PATH = './tmp/svg/';

const svgPath = FILE_PATH;
const targetPath = OUTPUT_PATH;
createSvgComponents(svgPath, targetPath, false);
