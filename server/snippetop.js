const fs = require('fs');
const { writeToFile, loadFile, readDirectory } = require('./file');

const SNIPPET_DIR = './storage/io/snippets';
const UTF8 = 'utf-8';

const runSnippetOperation = (op, filename, content) => {
  if(op === 'read') {
    const data = filename
      ? loadFile(`${SNIPPET_DIR}/${filename}`)
      : readDirectory(SNIPPET_DIR);

    return { data };
  } else if (op === 'write') {
    const { message, error } = writeToFile(`${SNIPPET_DIR}/${filename}`, content);

    return { message, error };
  } else {
    return { message: 'snippet operation not found' };
  }
};

module.exports = { runSnippetOperation };