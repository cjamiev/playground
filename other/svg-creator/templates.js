const defaultClass = [
  {
    cssClass: '.svg--primary-color {\n  fill: #000000;\n  stroke: #000000;\n}\n',
    className: 'svg--primary-color'
  },
  {
    cssClass: '.svg--marked-color {\n  fill: #ff0000;\n  stroke: #ff0000;\n}\n',
    className: 'svg--marked-color'
  }
];

const subcomponentTemplate = `export const {{name}} = ({ transform, conditions = {} }) => {
{{conditions}}

  return (
    <g transform={transform}>
      {{subcomponentSVG}}
    </g>
  );
};
`;

const componentTemplate = `/* eslint-disable max-lines */
/* eslint-disable complexity */
import React from 'react';

{{subcomponents}}
export const {{name}} = ({ transform, subcomponents = [], conditions = {} }) => {
{{conditions}}

  const renderData = subcomponents.map(item => {
    const SvgComponent = item.component;
    const key = SvgComponent.name + item.transform + JSON.stringify(item.subcomponents);

    return <SvgComponent key={key} transform={item.transform} conditions={item.conditions} subcomponents={item.subcomponents} />;
  });

  return (
    <g transform={transform}>
      {{svgObj}}
      {renderData}
    </g>
  );
};

`;

const componentWithoutSubcomponentTemplate = `/* eslint-disable max-lines */
/* eslint-disable complexity */
import React from 'react';

export const {{name}} = ({ transform, conditions = {} }) => {
{{conditions}}

  return (
    <g transform={transform}>
      {{svgObj}}
    </g>
  );
};

`;

const constTemplate = 'const {\n {{consts}} \n} = require(\'./{{name}}\';';
const indexTemplate = `
{{consts}}
const './svg.css';

{{svgMap}}

const entryMapper = (entry) => {
  return {
    ...entry,
    subcomponents: entry.subcomponents ? entry.subcomponents.map(item => entryMapper(item)): [],
    component: svgMap[entry.component]
  };
};

const svgDataMapper = (data) => {
  return data.map(entry => entryMapper(entry));
};

export default svgDataMapper;
`;

const svgMapperTemplate = `import React from 'react';
const svgDataMapper = require('./index';

{{jsonDataTemplate}}
const SvgMapper = ({ data = testData }) => {
  const renderData = svgDataMapper(data).map(item => {
    const SvgComponent = item.component;
    const key = SvgComponent.name + item.transform + JSON.stringify(item.subcomponents);

    return <SvgComponent key={key} transform={item.transform} conditions={item.conditions} subcomponents={item.subcomponents} />;
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
const './svg.css';

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
  componentWithoutSubcomponentTemplate,
  subcomponentTemplate,
  constTemplate,
  indexTemplate,
  svgMapperTemplate,
  singleTemplate
};
