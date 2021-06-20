import { searchLinesTestData, searchFilesTestData } from 'testHelper/testData/search-data';
import { testFunctionHelper } from 'testHelper/helper';
import { searchLines, searchFiles } from './search';

describe(':searchLines', () => {
  searchLinesTestData.forEach(data => testFunctionHelper(data, searchLines));
});

describe(':searchFiles', () => {
  searchFilesTestData.forEach(data => testFunctionHelper(data, searchFiles));
});
