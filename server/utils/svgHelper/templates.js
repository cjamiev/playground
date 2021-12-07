const defaultClass = [{
  cssClass: '.svg--primary-color {\n  fill: #000000;\n  stroke: #000000;\n}\n',
  className: 'svg--primary-color'
}, {
  cssClass: '.svg__mark {\n  fill: #ff0000;\n  stroke: #ff0000;\n}\n',
  className: 'svg__mark'
}];

const componentTemplate = `/* eslint-disable complexity */
import React from 'react';

const ZERO = 0;

const {{name}} = ({ translateX = ZERO, translateY = ZERO }) => {
  const translate = \`translate(\${translateX},\${translateY})\`;
{{conditions}}
  return (
    <g transform={translate}>
{{svgObj}}
    </g>
  );
};

export default {{name}};
`;

const exportTemplate = 'export { default as {{name}} } from \'./{{name}}\';';

const testTemplate = `import React from 'react';
import {
{{importContent}}
} from './index';

const TestSvg = () => {
  return (
    <svg className="svg--primary-color" width="1920" height="1080" viewBox="0 0 500 500">
{{jsxContent}}
    </svg>
  );
};

export default TestSvg;
`;

const singleTemplate = `import React from 'react';
import './svg.css';

const TestSvg = () => {
  return (
    <svg className="svg--primary-color" width="1920" height="1080" viewBox="0 0 500 500">
{{jsxContent}}
    </svg>
  );
};

export default TestSvg;
`;

module.exports = {
  defaultClass,
  componentTemplate,
  exportTemplate,
  testTemplate,
  singleTemplate
};