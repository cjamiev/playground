const fs = require('fs');
const path = require('path');

const { flattenDeep } = require('./array-operations');

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
  readDirectoryDeep
};