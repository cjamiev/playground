const fs = require('fs');
const { resolve } = require('path');
const { readdir, stat } = require('fs').promises;
const child_process = require('child_process');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const UTF8 = 'utf-8';
const ZERO = 0;
const ONE = 1;
const TWO = 2;

const capitalizeFirstLetter = (string) => {
  return string.charAt(ZERO).toUpperCase() + string.slice(ONE);
};

const updatePackageJSON = (rootDir = './') => {
  fs.readFile(`${rootDir}/package.json`, UTF8, async (err, data) => {
    const packageJSON = JSON.parse(data);
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

    const updatedPackageJson = {
      ...packageJSON,
      dependencies: updatedDependencies,
      devDependencies: updatedDevDependencies
    };

    const writeStream = fs.createWriteStream(`${rootDir}/package.json`, { flag: 'w'});

    writeStream.write(JSON.stringify(updatedPackageJson, undefined, TWO));
  });
};

async function* getFiles(rootPath) {
  const fileNames = await readdir(rootPath);
  for (const fileName of fileNames) {
    const path = resolve(rootPath, fileName);
    if ((await stat(path)).isDirectory()) {
      yield* getFiles(path);
    } else {
      yield path;
    }
  }
}

const updateFiles = async ({rootDir, fileRegex, lineRegex, lineMapper }) => {
  for await (const filePath of getFiles(rootDir)) {
    const matchedFile = filePath.match(fileRegex);

    if(matchedFile) {
      fs.readFile(filePath, UTF8, (err, data) => {
        const update = data.replace(lineRegex, lineMapper);
        const writeStream = fs.createWriteStream(filePath, { flag: 'a'});

        writeStream.write(update);
      });
    }
  }
};

const createFiles = async (name) => {
  for await (const filePath of getFiles('./scripts/templates')) {
    fs.readFile(filePath, UTF8, (err, data) => {
      const content = data
        .replace(/{{name}}/g, name)
        .replace(/{{Name}}/g, capitalizeFirstLetter(name))
        .replace(/{{NAME}}/g, name.toUpperCase());
      const filePathSplit = filePath.split('\\');
      const fileName = filePathSplit[filePathSplit.length - ONE]
        .replace(/{{name}}/g, name)
        .replace(/{{Name}}/g, capitalizeFirstLetter(name));

      const writeStream = fs.createWriteStream(`./tmp/${fileName}`, { flag: 'a'});

      writeStream.write(content);
    });
  }
};

module.exports = {
  createFiles,
  updateFiles,
  updatePackageJSON
};