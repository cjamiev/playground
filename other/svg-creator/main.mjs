/*
* The purpose of this script is to take svg created by an app and convert it into JSX. 
* Its not perfect but should take care of most of the work. 
*/
import { createSvgComponents } from './createHelper.mjs';
import { makeDirectory } from './io.mjs';

const FILE_PATH = './tmp/input.svg';
const OUTPUT_PATH = './tmp/svg/';

const svgPath = FILE_PATH;
const targetPath = OUTPUT_PATH;
makeDirectory(targetPath);
createSvgComponents(svgPath, targetPath, false);
