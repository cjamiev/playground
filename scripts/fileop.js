const fs = require('fs');
const { resolve } = require('path');
const { readdir, stat } = require('fs').promises;
const child_process = require('child_process');
const execSync = child_process.execSync;

const UTF8 = 'utf-8';
const TWO = 2;

const updatePackageJSON = () => {
  fs.readFile('./package.json', UTF8, (err, data) => {
    const packageJSON = JSON.parse(data);
    const devDependencies = Object.keys(packageJSON.devDependencies);
    const dependencies = Object.keys(packageJSON.dependencies);

    const updatedDevDependencies = devDependencies
      .map(name => {
        const version = execSync(`npm view ${name} version`, { encoding: UTF8 });
        console.log(name, version);
        return { [name]: version };
      }).reduce((acc, item) => ({...acc,...item}));
    const updatedDependencies = dependencies
      .map(name => {
        const version = execSync(`npm view ${name} version`, { encoding: UTF8 });
        console.log(name, version);
        return { [name]: version };
      }).reduce((acc, item) => ({...acc,...item}));

    const updatedPackageJson = {
      ...packageJSON,
      dependencies: updatedDependencies,
      devDependencies: updatedDevDependencies
    };

    const writeStream = fs.createWriteStream('./package.json', { flag: 'w'});

    writeStream.write(JSON.stringify(updatedPackageJson).replace(/\\n/g,''));
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
  for await (const filePath of getFiles(rootDir, fileRegex)) {
    const matchedFile = filePath.match(fileRegex);

    if(matchedFile) {
      fs.readFile(filePath, 'utf8', (err, data) => {
        const update = data.replace(lineRegex, lineMapper);
        const writeStream = fs.createWriteStream(filePath, { flag: 'a'});

        writeStream.write(update);
      });
    }
  }
};

module.exports = {
  updateFiles,
  updatePackageJSON
};