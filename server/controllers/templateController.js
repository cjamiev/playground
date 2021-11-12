const { writeToFile, loadFile, readDirectory } = require('../utils/file');
const { lowerCaseFirstLetter, capitalizeFirstLetter } = require('../utils/stringHelper');

const TEMPLATE_DIR = './storage/io/templates';
const UTF8 = 'utf-8';
const ONE = 1;

const createFilesFromTemplates = ({targetDir, filePaths, name}) => {
  filePaths.forEach(filePath => {
    const templateData = loadFile(`${TEMPLATE_DIR}/${filePath}`);
    const content = templateData
      .replace(/{{name}}/g, lowerCaseFirstLetter(name))
      .replace(/{{Name}}/g, capitalizeFirstLetter(name))
      .replace(/{{NAME}}/g, name.toUpperCase());
    const filePathSplit = filePath.split('\\');
    const fileName = filePathSplit[filePathSplit.length - ONE]
      .replace(/{{name}}/g, lowerCaseFirstLetter(name))
      .replace(/{{Name}}/g, capitalizeFirstLetter(name));

    writeToFile(`${targetDir}/${fileName}`, content);
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