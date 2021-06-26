const fs = require('fs');

const deleteFile = filepath => {
  try {
    fs.existsSync(filepath) && fs.unlinkSync(filepath);
    return {
      error: false,
      message: 'Deleted file:' + filepath
    };
  } catch (e) {
    return {
      error: true,
      message: e
    };
  }
};

const removeDirectory = folderpath => {
  try {
    fs.existsSync(folderpath) && fs.rmdirSync(folderpath);
    return {
      error: false,
      message: 'Removed folderpath:' + folderpath
    };
  } catch (e) {
    return {
      error: true,
      message: e
    };
  }
};

const removeDirectoryDeep = path => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(file => {
      const curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        removeDirectoryDeep(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

export {
  deleteFile,
  removeDirectory,
  removeDirectoryDeep
};
