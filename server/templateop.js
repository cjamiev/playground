const fs = require('fs');
const { readDirectory } = require('./file');

const UTF8 = 'utf-8';
const ZERO = 0;
const ONE = 1;

const capitalizeFirstLetter = (string) => {
  return string.charAt(ZERO).toUpperCase() + string.slice(ONE);
};

const readTemplateDirectory = () => {
  return readDirectory('./storage/io/templates');
};

const createFilesFromTemplates = (targetDir, filePaths) => {
  filePaths.forEach(filePath => {
    fs.readFile(filePath, UTF8, (err, data) => {
      const content = data
        .replace(/{{name}}/g, name)
        .replace(/{{Name}}/g, capitalizeFirstLetter(name))
        .replace(/{{NAME}}/g, name.toUpperCase());
      const filePathSplit = filePath.split('\\');
      const fileName = filePathSplit[filePathSplit.length - ONE]
        .replace(/{{name}}/g, name)
        .replace(/{{Name}}/g, capitalizeFirstLetter(name));

      const writeStream = fs.createWriteStream(`${targetDir}/${fileName}`, { flag: 'a'});

      writeStream.write(content);
    });
  });
};

const runTemplateOperation = (op, root, content) => {
  if(op === 'create') {
    const data = createFilesFromTemplates(root, content);

    return { data };
  } else if(op === 'read') {
    const data = readTemplateDirectory();

    return { data };
  } else {
    return { message: 'template operation not found' };
  }
};

module.exports = { runTemplateOperation };