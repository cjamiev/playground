import fs from 'node:fs';

const UTF8_ENCODING = 'utf8';

const loadFile = (filepath, defaultValue) => {
  return fs.existsSync(filepath) ? fs.readFileSync(filepath, UTF8_ENCODING) : defaultValue;
};

const writeToFile = (filepath, content) => {
  try {
    fs.writeFileSync(filepath, content);
    return {
      error: false,
      message: 'Wrote to file:' + filepath
    };
  } catch (e) {
    return {
      error: true,
      message: e
    };
  }
};

const makeDirectory = folderpath => {
  try {
    !fs.existsSync(folderpath) && fs.mkdirSync(folderpath);
    return {
      error: false,
      message: 'Created directory:' + folderpath
    };
  } catch (e) {
    return {
      error: true,
      message: e
    };
  }
};

export { loadFile, writeToFile, makeDirectory };
