import { searchLinesTestData, searchFilesTestData } from './testData/search-data';
import { testFunctionHelper } from './testHelper';
import { searchLines, searchFiles } from '../utils/search';

describe(':searchLines', () => {
  searchLinesTestData.forEach((data) => testFunctionHelper(data, searchLines));
});

describe(':searchFiles', () => {
  searchFilesTestData.forEach((data) => testFunctionHelper(data, searchFiles));
});
