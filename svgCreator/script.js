import { createSvgComponents } from './createHelper';

const FILE_PATH = './storage/input.svg';
const OUTPUT_PATH = './src/components/pages/Experiment/svg/';

const svgPath = FILE_PATH;
const targetPath = OUTPUT_PATH;
createSvgComponents(svgPath, targetPath, false);
