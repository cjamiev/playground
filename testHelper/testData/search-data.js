const searchLinesTestData = [
  { testMessage: 'no matches', args: [['one'], 'two'], expectedResult: [] },
  { testMessage: 'one match', args: [['one'], 'one'], expectedResult: [{ lineNumber: 1, count: 1, line: 'one' }] },
  { testMessage: 'double match same line', args: [['one {one}'], 'one'], expectedResult: [{ lineNumber: 1, count: 2, line: 'one {one}' }] },
  { testMessage: 'one line matched', args: [['one one', 'two'], 'one'], expectedResult: [{ lineNumber: 1, count: 2, line: 'one one' }] },
  { testMessage: 'two line matched', args: [['one one', 'two', 'one'], 'one'], expectedResult: [{ lineNumber: 1, count: 2, line: 'one one' }, { lineNumber: 3, count: 1, line: 'one' }] }
];

const searchFilesTestData = [
  { testMessage: 'no matches', args: [[{ name: 'fileone', content: 'one' }], 'two'], expectedResult: [] },
  {
    testMessage: 'one match one file',
    args: [[{ name: 'fileone', content: 'one' }], 'one'],
    expectedResult: [{ name: 'fileone', content: 'one', matchedLines: [{ lineNumber: 1, count: 1, line: 'one' }] }]
  },
  {
    testMessage: 'many matches one file',
    args: [[{ name: 'fileone', content: 'one two one\ntwo three\n1 one three\nnone two\n{ one }\n{ two }' }], 'one'],
    expectedResult: [
      {
        name: 'fileone',
        content: 'one two one\ntwo three\n1 one three\nnone two\n{ one }\n{ two }',
        matchedLines: [
          { lineNumber: 1, count: 2, line: 'one two one' },
          { lineNumber: 3, count: 1, line: '1 one three' },
          { lineNumber: 4, count: 1, line: 'none two' },
          { lineNumber: 5, count: 1, line: '{ one }' }
        ]
      }
    ]
  },
  {
    testMessage: 'one match two files',
    args: [
      [
        { name: 'fileone', content: 'one' },
        { name: 'filetwo', content: 'two' }
      ], 'one'],
    expectedResult: [{ name: 'fileone', content: 'one', matchedLines: [{ lineNumber: 1, count: 1, line: 'one' }] }]
  },
  {
    testMessage: 'two matches two files',
    args: [
      [
        { name: 'fileone', content: 'one' },
        { name: 'filetwo', content: 'one {one}' }
      ], 'one'],
    expectedResult: [
      { name: 'fileone', content: 'one', matchedLines: [{ lineNumber: 1, count: 1, line: 'one' }] },
      { name: 'filetwo', content: 'one {one}', matchedLines: [{ lineNumber: 1, count: 2, line: 'one {one}' }] }
    ]
  }
];

module.exports = {
  searchLinesTestData,
  searchFilesTestData
};