const fs = require('fs');
const path = require('path');

const { drop } = require('./arrayHelper');
const { loadFile, readDirectoryDeep } = require('./read');

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

const copyFile = (file, targetPath, seperator = '/') => {
  const content = loadFile(file);

  const paths = targetPath.split(seperator);
  let curPath = '';

  paths.forEach(nextPath => {
    curPath = path.join(curPath, nextPath);
    if (!curPath.includes('.')) {
      makeDirectory(curPath);
    }
  });

  return writeToFile(targetPath, content);
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

const copyDir = (dir, targetPath) => {
  const root = drop(dir.split('/').reverse())
    .reverse()
    .join('/');
  const files = readDirectoryDeep(dir);

  files.forEach(file => {
    const location = path.join(targetPath, file.replace(`${root}\\`, ''));
    copyFile(file, location, '\\');
  });
};

export {
  copyFile,
  copyDir,
  makeDirectory,
  writeToFile
};
