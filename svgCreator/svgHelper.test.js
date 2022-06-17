const {
  formatTagsToOneLine,
  removeExtraneousInformation
} = require('./cleanupHelper');
const {
  generateClassesFromStyles,
  replaceStylesWithClass
} = require('./classHelper');
const {
  getAttributeList,
  getSortedStyleAttribute,
  sortAttributes
} = require('./attributeHelper');
const {
  createSingleComponent,
  createReactComponents
} = require('./createHelper');
const { defaultClass } = require('./templates');

const tag = '<tagname one="val1 val2 val3" two-one="val1;val2;val3" two-two="val2;val3;val4" three-two="val1" four="one two three" />';
const svgData = `
<g
   id="1">
  <path
     id="2"
     style="one;two;three"
     d="m 0.1 0.1 z" />
  <path
     style="four;five;six"
     d="m -0.2 -0.2 z"
     id="3" />
</g>
`;
const formattedSvgData = `<g id="1" > 
<path id="2" style="one;two;three" d="m 0.1 0.1 z" /> 
<path style="four;five;six" d="m -0.2 -0.2 z" id="3" />
</g>`;
const indentedSvgData = `<g id="1" >
  <path id="2" style="one;two;three" d="m 0.1 0.1 z" />
  <path style="four;five;six" d="m -0.2 -0.2 z" id="3" />
</g>`;
const styledSvg = `<g>
  <path style="fill:#000000;stroke:#000000" id="1" />
  <path style="stroke:#000000;fill:#000000" id="2" />
  <path style="fill:#ffffff;stroke:#ffffff" id="3" />
</g>`;
const notStyledSvg = `<g>
  <path id="1" />
  <path id="2" />
  <path id="3" />
</g>`;
const generatedClasses = defaultClass.concat([
  {
    cssClass: '.svg__0 {\n  fill:#ffffff;\n  stroke:#ffffff;\n}\n',
    id: 'style="fill:#ffffff;stroke:#ffffff"',
    className: 'svg__0'
  }
]);
const svgWithClasses = `<g>
 <path id="1" />
 <path id="2" />
  <path className="svg__0" id="3" />
</g>`;

const getAttributeListTestData = [
  { testMessage: 'empty', args: ['','one'], expectedResult: [] },
  { testMessage: 'no match', args: [tag, 'five'], expectedResult: [] },
  { testMessage: 'one match', args: [tag, 'one'], expectedResult: ['one="val1 val2 val3"'] },
  { testMessage: 'two match', args: [tag, 'two'], expectedResult: ['two-one="val1;val2;val3"', 'two-two="val2;val3;val4"'] }
];
const getSortedStyleAttributeTestData = [
  { testMessage: 'empty', args: [''], expectedResult: '' },
  { testMessage: 'filtered', args: ['style="a;c;e;b;"'], expectedResult: 'style="a;b;c;e"' }
];
const formatTagsToOneLineTestData = [
  { testMessage: 'unformatted', args: [svgData], expectedResult: formattedSvgData },
  { testMessage: 'formatted', args: [formattedSvgData], expectedResult: formattedSvgData }
];
const extraneousSvg = '<path sodipodi:type="star" style="fill:#000000;stroke:#000000;stroke-width:0.656167;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none" id="path1778" sodipodi:sides="3" sodipodi:cx="93.453613" sodipodi:cy="52.431381" sodipodi:r1="0.43114451" sodipodi:r2="0.0043114452" sodipodi:arg1="0.98805683" sodipodi:arg2="2.0352544" inkscape:flatsided="true" inkscape:rounded="9.1940344e-17" inkscape:randomized="0" d="M 93.690878,52.791369 93.023223,52.456865 93.646739,52.04591 Z" inkscape:transform-center-x="-0.065956492" inkscape:transform-center-y="-0.0023239237" transform="matrix(0.30347626,0.37790863,-0.5664694,0.17728172,94.017915,7.9363959)" />';
const filteredSvg = '<path style="fill:#000000;stroke:#000000;stroke-width:0.656167;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none" data-testid="path1778" d="M 93.690878,52.791369 93.023223,52.456865 93.646739,52.04591 Z" transform="matrix(0.30347626,0.37790863,-0.5664694,0.17728172,94.017915,7.9363959)" />';
const removeExtraneousInformationTestData = [
  { testMessage: 'extranous', args: [extraneousSvg], expectedResult: filteredSvg }
];
const generateClassesFromStylesTestData = [
  { testMessage: 'styled', args: [styledSvg], expectedResult: generatedClasses },
  { testMessage: 'not styled', args: [notStyledSvg], expectedResult: defaultClass }
];
const replaceStylesWithClassTestData = [
  { testMessage: 'styled', args: [styledSvg, generatedClasses], expectedResult: svgWithClasses },
  { testMessage: 'not styled', args: [notStyledSvg, generatedClasses], expectedResult: notStyledSvg }
];

const testFunctionHelper = ({ testMessage = '', args, expectedResult }, functionToTest) => {
  const recievedResult = functionToTest(...args);

  it(testMessage, () => expect(recievedResult).toEqual(expectedResult));
};

describe(':getAttributeList', () => {
  getAttributeListTestData.forEach(data => testFunctionHelper(data, getAttributeList));
});

describe(':getSortedStyleAttribute', () => {
  getSortedStyleAttributeTestData.forEach(data => testFunctionHelper(data, getSortedStyleAttribute));
});

describe(':formatTagsToOneLine', () => {
  formatTagsToOneLineTestData.forEach(data => testFunctionHelper(data, formatTagsToOneLine));
});

// describe(':removeExtraneousInformation', () => {
//   removeExtraneousInformationTestData.forEach(data => testFunctionHelper(data, removeExtraneousInformation));
// });

describe(':generateClassesFromStyles', () => {
  generateClassesFromStylesTestData.forEach(data => testFunctionHelper(data, generateClassesFromStyles));
});

describe(':replaceStylesWithClass', () => {
  replaceStylesWithClassTestData.forEach(data => testFunctionHelper(data, replaceStylesWithClass));
});