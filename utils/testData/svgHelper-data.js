const tag = '<tagname one="val1 val2 val3" two-one="val1;val2;val3" two-two="val2;val3;val4" three-two="val1" four="one two three" />';
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
const formattedSvgData = `<g id="1"> 
<path id="2" style="one;two;three" d="m 0.1 0.1 z" /> 
<path style="four;five;six" d="m -0.2 -0.2 z" id="3" />
</g>`;
const formatTagsToOneLineTestData = [
  { testMessage: 'unformatted', args: [svgData], expectedResult: formattedSvgData },
  { testMessage: 'formatted', args: [formattedSvgData], expectedResult: formattedSvgData }
];

const indentedSvgData = `<g id="1">
  <path id="2" style="one;two;three" d="m 0.1 0.1 z" />
  <path style="four;five;six" d="m -0.2 -0.2 z" id="3" />
</g>`;
const formatTagsWithIndentsTestData = [
  { testMessage: 'formatted', args: [formattedSvgData], expectedResult: indentedSvgData },
  { testMessage: 'indented', args: [indentedSvgData], expectedResult: indentedSvgData }
];

export {
  getAttributeListTestData,
  getSortedStyleAttributeTestData,
  formatTagsToOneLineTestData,
  formatTagsWithIndentsTestData
};