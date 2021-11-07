const fs = require('fs');
const { loadFile, readDirectory } = require('./file');

const SNIPPET_DIR = './storage/io/snippets';
const UTF8 = 'utf-8';

const runSnippetOperation = (op, name) => {
  if(op === 'read') {
    const data = name
      ? loadFile(`${SNIPPET_DIR}/${name}`)
      : readDirectory(SNIPPET_DIR);

    return { data };
  } else {
    return { message: 'snippet operation not found' };
  }
};

module.exports = { runSnippetOperation };