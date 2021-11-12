const fs = require('fs');
const { writeToFile, loadFile, readDirectory } = require('../utils/file');

const TEMPLATE_DIR = './storage/io/templates';
const UTF8 = 'utf-8';
const ZERO = 0;
const ONE = 1;

const lowerCaseFirstLetter = (string) => {
  return string.charAt(ZERO).toLowerCase() + string.slice(ONE);
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(ZERO).toUpperCase() + string.slice(ONE);
};

const createFilesFromTemplates = ({targetDir, filePaths, name}) => {
  filePaths.forEach(filePath => {
    fs.readFile(`${TEMPLATE_DIR}/${filePath}`, UTF8, (err, data) => {
      const content = data
        .replace(/{{name}}/g, lowerCaseFirstLetter(name))
        .replace(/{{Name}}/g, capitalizeFirstLetter(name))
        .replace(/{{NAME}}/g, name.toUpperCase());
      const filePathSplit = filePath.split('\\');
      const fileName = filePathSplit[filePathSplit.length - ONE]
        .replace(/{{name}}/g, lowerCaseFirstLetter(name))
        .replace(/{{Name}}/g, capitalizeFirstLetter(name));

      const writeStream = fs.createWriteStream(`${targetDir}/${fileName}`, { flag: 'a'});

      writeStream.write(content);
    });
  });
};

const runTemplateOperation = (op, {targetDir, content, name}) => {
  if(op === 'create') {
    createFilesFromTemplates({targetDir, name, filePaths: content});

    return { message: 'Creating templates' };
  } else if(op === 'read') {
    const data = name
      ? loadFile(`${TEMPLATE_DIR}/${name}`)
      : readDirectory(TEMPLATE_DIR);

    return { data };
  } else if (op === 'write') {
    const { message, error } = writeToFile(`${TEMPLATE_DIR}/${name}`, content);

    return { message, error };
  } else {
    return { message: 'template operation not found' };
  }
};

module.exports = { runTemplateOperation };