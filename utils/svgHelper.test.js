import {
  getAttributeListTestData,
  getSortedStyleAttributeTestData,
  formatTagsToOneLineTestData,
  formatTagsWithIndentsTestData,
  removeExtraneousInformationTestData,
  generateClassesFromStylesTestData,
  replaceStylesWithClassTestData
} from './testData/svgHelper-data';
import { testFunctionHelper } from 'testHelper';
import {
  getAttributeList,
  getSortedStyleAttribute,
  formatTagsToOneLine,
  formatTagsWithIndents,
  removeExtraneousInformation,
  generateClassesFromStyles,
  replaceStylesWithClass
} from './svgHelper';

describe(':getAttributeList', () => {
  getAttributeListTestData.forEach(data => testFunctionHelper(data, getAttributeList));
});

describe(':getSortedStyleAttribute', () => {
  getSortedStyleAttributeTestData.forEach(data => testFunctionHelper(data, getSortedStyleAttribute));
});

describe(':formatTagsToOneLine', () => {
  formatTagsToOneLineTestData.forEach(data => testFunctionHelper(data, formatTagsToOneLine));
});

describe(':formatTagsWithIndents', () => {
  formatTagsWithIndentsTestData.forEach(data => testFunctionHelper(data, formatTagsWithIndents));
});

describe(':removeExtraneousInformation', () => {
  removeExtraneousInformationTestData.forEach(data => testFunctionHelper(data, removeExtraneousInformation));
});

describe(':generateClassesFromStyles', () => {
  generateClassesFromStylesTestData.forEach(data => testFunctionHelper(data, generateClassesFromStyles));
});

describe(':replaceStylesWithClass', () => {
  replaceStylesWithClassTestData.forEach(data => testFunctionHelper(data, replaceStylesWithClass));
});