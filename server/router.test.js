const fs = require('fs');
const child_process = require('child_process');
const { router } = require('./router');

const mockFiles = {
  fileOne: 'fileOne content',
  fileTwo: 'fileTwo content'
};

jest.mock('fs');
fs.existsSync = (filepath) => {
  return (filepath === './storage/io/file/fileOne' || filepath === './storage/io/file/fileTwo');
};
fs.readFileSync = (filepath, encoding) => {
  const filename = filepath.replace('./storage/io/file/','');
  return mockFiles.hasOwnProperty(filename) ? mockFiles[filename] : 'file not found';
};
fs.readdirSync = (dir) => {
  return Object.keys(mockFiles);
};
fs.promises = {
  readdir: (dir) => {
    return new Promise((resolve, reject) => { resolve(Object.keys(mockFiles));});
  },
  stat: (filepath) => {
    return new Promise((resolve, reject) => resolve(false));
  }
};
fs.writeFileSync = (filepath, content) => {
  return `wrote file ${filepath} with content ${content}`;
};
jest.mock('child_process');
child_process.exec = (command) => {
  return new Promise((resolve, reject) => { resolve(`running command ${command}`);});
};
child_process.execSync = (command) => {
  return `running command ${command}`;
};

describe('router', () => {
  it('file/?name=fileOne', async () => {
    const result = await router({ reqUrl: 'basepath/file', reqMethod: 'GET', queryParameters: { name: 'fileOne'}, payload: {}});

    expect(result).toEqual({ data: mockFiles.fileOne });
  });

  it('file', async () => {
    const result = await router({ reqUrl: 'basepath/file', reqMethod: 'GET', queryParameters: {}, payload: {}});

    expect(result).toEqual({ data: Object.keys(mockFiles) });
  });

  it('file', async () => {
    const result = await router({ reqUrl: 'basepath/file', reqMethod: 'POST', queryParameters: {}, payload: { filename: 'fileOne', content: 'fileOne Contents'}});

    expect(result).toEqual({ message: 'Wrote to file:./storage/io/file/fileOne', error: false });
  });
});