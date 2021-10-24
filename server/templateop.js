const fs = require('fs');
const { readDirectory } = require('./file');

const TEMPLATE_DIR = './storage/io/templates';
const UTF8 = 'utf-8';
const ZERO = 0;
const ONE = 1;

const capitalizeFirstLetter = (string) => {
  return string.charAt(ZERO).toUpperCase() + string.slice(ONE);
};

const readTemplateDirectory = () => {
  return readDirectory(TEMPLATE_DIR);
};

const createFilesFromTemplates = ({targetDir, filePaths, name}) => {
  filePaths.forEach(filePath => {
    fs.readFile(`${TEMPLATE_DIR}/${filePath}`, UTF8, (err, data) => {
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

const runTemplateOperation = (op, {targetDir, filePaths, name}) => {
  if(op === 'create') {
    createFilesFromTemplates({targetDir, name, filePaths});

    return { message: 'Creating templates' };
  } else if(op === 'read') {
    const data = readTemplateDirectory();

    return { data };
  } else {
    return { message: 'template operation not found' };
  }
};

module.exports = { runTemplateOperation };