const fs = require('fs');
const { resolve } = require('path');
const { readdir, stat } = fs.promises;
const { isNumber } = require('../utils/util');

const UTF8 = 'utf-8';

async function* getFiles(rootPath) {
  const fileNames = await readdir(rootPath);
  for (const fileName of fileNames) {
    const path = resolve(rootPath, fileName);
    if ((await stat(path)).isDirectory()) {
      yield* getFiles(path);
    } else {
      yield path;
    }
  }
}

const updateFiles = async ({ rootDir, fileRegex, lineRegex, lineReplacer }) => {
  for await (const filePath of getFiles(rootDir)) {
    const matchedFile = filePath.match(fileRegex);

    if(matchedFile) {
      fs.readFile(filePath, UTF8, (err, data) => {
        const update = data.replace(lineRegex, lineReplacer);
        const writeStream = fs.createWriteStream(filePath, { flag: 'a'});

        writeStream.write(update);
      });
    }
  }
};

const runRegexOperation = (root, content) => {
  const { fileRegex, lineRegex, modifiers, lineRange, replace = '' } = content;
  const { start, end } = lineRange;
  const lineReplacer = isNumber(start) && isNumber(end)
    ? matchedKey => matchedKey.substr(start,end) + replace
    : replace;

  try {
    updateFiles({
      rootDir: root,
      fileRegex: new RegExp(fileRegex),
      lineRegex: new RegExp(lineRegex, modifiers),
      lineReplacer
    });

    return { message: 'Regex Operation Executing' };
  } catch (e) {
    return { message: e.stderr };
  }

};

module.exports = { runRegexOperation };
