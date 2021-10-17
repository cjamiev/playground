import {
  reverseStringTestData,
  toDashCaseFromCamelCaseTestData,
  toCamelCaseFromDashCaseTestData,
  getEllipsisForLongTextTestData
} from './testData/stringHelper-data';
import { testFunctionHelper } from 'testHelper';
import {
  reverseString,
  toDashCaseFromCamelCase,
  toCamelCaseFromDashCase,
  getEllipsisForLongText
} from './stringHelper';

describe(':reverseString', () => {
  reverseStringTestData.forEach(data => testFunctionHelper(data, reverseString));
});

describe(':toDashCaseFromCamelCase', () => {
  toDashCaseFromCamelCaseTestData.forEach(data => testFunctionHelper(data, toDashCaseFromCamelCase));
});

describe(':toCamelCaseFromDashCase', () => {
  toCamelCaseFromDashCaseTestData.forEach(data => testFunctionHelper(data, toCamelCaseFromDashCase));
});

describe(':getEllipsisForLongText', () => {
  getEllipsisForLongTextTestData.forEach(data => testFunctionHelper(data, getEllipsisForLongText));
});
