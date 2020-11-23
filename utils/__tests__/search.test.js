const { searchLinesTestData, searchFilesTestData } = require('testHelper/testData/search-data');
const { testFunctionHelper } = require('testHelper/helper');
const { searchLines, searchFiles } = require('search');

describe(':searchLines', () => {
  searchLinesTestData.forEach(data => testFunctionHelper(data, searchLines));
});

describe(':searchFiles', () => {
  searchFilesTestData.forEach(data => testFunctionHelper(data, searchFiles));
});
