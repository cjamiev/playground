const child_process = require('child_process');
const { promisify } = require('util');
const exec = promisify(child_process.exec);
const { loadJSONFromFile, writeToFile } = require('./file');

const UTF8 = 'utf-8';
const DEFAULT_DIR = './';

const getLatestDependencyVersions = async (packageJSON) => {
  const dependencies = Object.keys(packageJSON.dependencies);
  const devDependencies = Object.keys(packageJSON.devDependencies);

  const dependenciesLatestVersions = await Promise.all(
    dependencies.map(name => exec(`npm view ${name} version`, { encoding: UTF8 }))
  );
  const devDependenciesLatestVersions = await Promise.all(
    devDependencies.map(name => exec(`npm view ${name} version`, { encoding: UTF8 }))
  );

  const updatedDependencies = dependenciesLatestVersions
    .map((item, index) => {
      const name = dependencies[index];
      return { [name]: item.stdout.replace('\n','')};
    }).reduce((acc, item) => ({...acc,...item}));
  const updatedDevDependencies = devDependenciesLatestVersions
    .map((item, index) => {
      const name = devDependencies[index];
      return { [name]: item.stdout.replace('\n','')};
    }).reduce((acc, item) => ({...acc,...item}));

  return {
    dependencies: updatedDependencies,
    devDependencies: updatedDevDependencies
  };
};

const getPackageFile = (rootDir = DEFAULT_DIR) => {
  return loadJSONFromFile(`${rootDir}/package.json`, { error: 'file not found'});
};

const updatePackageFile = (rootDir = DEFAULT_DIR, packageJSON) => {
  return writeToFile(`${rootDir}/package.json`, packageJSON);
};

const runPackageOperation = (op, root, content) => {
  if(op === 'getversions') {
    const data = getLatestDependencyVersions(content);

    return { data };
  } else if(op === 'read') {
    const data = getPackageFile(root);

    return { data };
  } else if(op === 'update') {
    const message = updatePackageFile(root, content);

    return { message };
  } else {
    return { message: 'package operation not found' };
  }
};

module.exports = { runPackageOperation };