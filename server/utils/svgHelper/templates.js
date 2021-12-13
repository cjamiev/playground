const defaultClass = [{
  cssClass: '.svg--primary-color {\n  fill: #000000;\n  stroke: #000000;\n}\n',
  className: 'svg--primary-color'
}, {
  cssClass: '.svg__mark {\n  fill: #ff0000;\n  stroke: #ff0000;\n}\n',
  className: 'svg__mark'
}];

const subcomponentTemplate = `const {{name}} = ({ transform, subcomponents = {} }) => {
  if(!transform) {
    return null;
  }

  return (
    <g transform={transform}>
      {{subcomponentSVG}}
    </g>
  );
};
`;

const componentTemplate = `/* eslint-disable complexity */
import React from 'react';

const ZERO = 0;

{{subcomponents}}
const {{name}} = ({ transform, subcomponents = {} }) => {
  return (
    <g transform={transform}>
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

{{jsonDataTemplate}}
const TestSvg = () => {
  const renderData = data.map(item => {
    const SvgComponent = item.component;
    const key = SvgComponent.name + item.transform + JSON.stringify(item.subcomponents);

    return <SvgComponent key={SvgComponent.name + item.transform} transform={item.transform} subcomponents={item.subcomponents} />;
  });

  return (
    <svg className="svg--primary-color" {{svgTagAttributes}}>
      {renderData}
    </svg>
  );
};

export default TestSvg;
`;

const singleTemplate = `import React from 'react';
import './svg.css';

const TestSvg = () => {
  return (
    <svg className="svg--primary-color" {{svgTagAttributes}}>
{{jsxContent}}
    </svg>
  );
};

export default TestSvg;
`;

module.exports = {
  defaultClass,
  componentTemplate,
  subcomponentTemplate,
  exportTemplate,
  testTemplate,
  singleTemplate
};