/*
* The purpose of this script is to take svg created by an app and convert it into JSX. 
* Its not perfect but should take care of most of the work. 
*/
const { createSvgComponents } = require('./createHelper');

const FILE_PATH = './tmp/input.svg';
const OUTPUT_PATH = './tmp/svg/';

const svgPath = FILE_PATH;
const targetPath = OUTPUT_PATH;
createSvgComponents(svgPath, targetPath, false);
