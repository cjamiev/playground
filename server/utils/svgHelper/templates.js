const defaultClass = [{
  cssClass: '.svg--primary-color {\n  fill: #000000;\n  stroke: #000000;\n}\n',
  className: 'svg--primary-color'
}, {
  cssClass: '.svg__mark {\n  fill: #ff0000;\n  stroke: #ff0000;\n}\n',
  className: 'svg__mark'
}];

const subcomponentTemplate = `export const {{name}} = ({ transform, subcomponents = [] }) => {
  if(!transform) {
    return null;
  }
  const renderData = subcomponents.map(item => {
    const SvgComponent = item.component;
    const key = SvgComponent.name + item.transform + JSON.stringify(item.subcomponents);

    return <SvgComponent key={key} transform={item.transform} subcomponents={item.subcomponents} />;
  });

  return (
    <g transform={transform}>
      {{subcomponentSVG}}
      {renderData}
    </g>
  );
};
`;

const componentTemplate = `/* eslint-disable max-lines */
/* eslint-disable complexity */
import React from 'react';

const ZERO = 0;

{{subcomponents}}
export const {{name}} = ({ transform, subcomponents = [] }) => {
  const renderData = subcomponents.map(item => {
    const SvgComponent = item.component;
    const key = SvgComponent.name + item.transform + JSON.stringify(item.subcomponents);

    return <SvgComponent key={key} transform={item.transform} subcomponents={item.subcomponents} />;
  });

  return (
    <g transform={transform}>
      {{svgObj}}
      {renderData}
    </g>
  );
};

`;

const exportTemplate = 'export {\n {{imports}} \n} from \'./{{name}}\';';

const svgMapperTemplate = `import React from 'react';
import {
{{importContent}}
} from './index';

{{jsonDataTemplate}}
const SvgMapper = ({ data = testData }) => {
  const renderData = data.map(item => {
    const SvgComponent = item.component;
    const key = SvgComponent.name + item.transform + JSON.stringify(item.subcomponents);

    return <SvgComponent key={key} transform={item.transform} subcomponents={item.subcomponents} />;
  });

  return (
    <svg className="svg--primary-color" {{svgTagAttributes}}>
      {renderData}
    </svg>
  );
};

export default SvgMapper;
`;

const singleTemplate = `/* eslint-disable max-lines */
/* eslint-disable complexity */
import React from 'react';
import './svg.css';

const SvgMapper = () => {
  return (
    <svg className="svg--primary-color" {{svgTagAttributes}}>
      {{jsxContent}}
    </svg>
  );
};

export default SvgMapper;
`;

module.exports = {
  defaultClass,
  componentTemplate,
  subcomponentTemplate,
  exportTemplate,
  svgMapperTemplate,
  singleTemplate
};