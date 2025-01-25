const ZERO = 0;
const ONE = 1;

const searchLines = (lines, searchtxt) => {
  const matchedLines = lines
    .map((line, index) => {
      const matched = line.includes(searchtxt);

      if (matched) {
        const count = line.split(searchtxt).length - ONE;

        return { lineNumber: index + ONE, count, line };
      } else {
        return null;
      }
    })
    .filter(line => line);

  return matchedLines;
};

const searchFiles = (files, searchtxt) => {
  const regexTestOnAllFiles = files.map(file => {
    const lines = file.content.split('\n');
    const matchedLines = searchLines(lines, searchtxt);
    return {
      ...file,
      matchedLines
    };
  });
  const nonEmptyLineMatchesForAllFiles = regexTestOnAllFiles.filter(item => item.matchedLines.length !== ZERO);

  return nonEmptyLineMatchesForAllFiles;
};

export {
  searchLines,
  searchFiles
};
