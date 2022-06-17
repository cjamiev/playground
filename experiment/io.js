import fs from 'fs';
import path from 'path';

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

export { loadFile, writeToFile };
