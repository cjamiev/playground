const fs = require('fs');
const path = require('path');
const { isJSONString } = require('./type-check');
const { flattenDeep } = require('./array-operations');

const UTF8_ENCODING = 'utf8';

const doesFileExist = filepath => fs.existsSync(filepath);

const loadFile = (filepath, defaultValue) => {
  return fs.existsSync(filepath) ? fs.readFileSync(filepath, UTF8_ENCODING) : defaultValue;
};

const loadJSONFromFile = (filepath, defaultValue) => {
  const file = loadFile(filepath, defaultValue);

  if (isJSONString(file)) {
    return JSON.parse(file);
  }

  return defaultValue;
};

const readDirectory = dir => fs.readdirSync(dir);

const readDirectoryDeep = dir => {
  const files = fs.readdirSync(dir).reduce((accumulator, file) => {
    const list = fs.statSync(path.join(dir, file)).isDirectory()
      ? readDirectoryDeep(path.join(dir, file))
      : path.join(dir, file);
    return [...accumulator, list];
  }, []);

  return flattenDeep(files);
};

module.exports = {
  doesFileExist,
  loadFile,
  loadJSONFromFile,
  readDirectory,
  readDirectoryDeep
};
