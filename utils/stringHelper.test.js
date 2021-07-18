import {
  reverseStringTestData,
  toDashCaseFromCamelCaseData,
  toCamelCaseFromDashCaseData
} from './testData/stringHelper-data';
import { testFunctionHelper } from 'testHelper';
import {
  reverseString,
  toDashCaseFromCamelCase,
  toCamelCaseFromDashCase
} from './stringHelper';

describe(':reverseString', () => {
  reverseStringTestData.forEach(data => testFunctionHelper(data, reverseString));
});

describe(':toDashCaseFromCamelCase', () => {
  toDashCaseFromCamelCaseData.forEach(data => testFunctionHelper(data, toDashCaseFromCamelCase));
});

describe(':toCamelCaseFromDashCase', () => {
  toCamelCaseFromDashCaseData.forEach(data => testFunctionHelper(data, toCamelCaseFromDashCase));
});
