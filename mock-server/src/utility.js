import fs from 'fs';

const UTF8_ENCODING = 'utf8';

export const isNumber = value => typeof value === 'number';
export const isBoolean = value => typeof value === 'boolean';
export const isString = value => typeof value === 'string';
export const isObject = value => typeof value === 'object';

export const updateFile = (path, content) => {
  try {
    fs.writeFileSync(path, JSON.stringify(content));
    return '';
  } catch (e) {
    return e;
  }
};

export const deleteFile = (path) => {
  try {
    fs.unlinkSync(path);
    return 'successfully deleted file';
  } catch (err) {
    return err;
  }
};

export const loadJSONFromFile = (path, defaultValue) => {
  return fs.existsSync(path) ? JSON.parse(fs.readFileSync(path, UTF8_ENCODING)) : defaultValue;
};

export const makeDirectory = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

export const doesFileExist = (path) => fs.existsSync(path);