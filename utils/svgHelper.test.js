import {
  getAttributeListTestData,
  getSortedStyleAttributeTestData,
  formatTagsToOneLineTestData,
  formatTagsWithIndentsTestData
} from './testData/svgHelper-data';
import { testFunctionHelper } from 'testHelper';
import {
  getAttributeList,
  getSortedStyleAttribute,
  formatTagsToOneLine,
  formatTagsWithIndents
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