const fs = require('fs');
const { resolve } = require('path');
const { readdir, stat } = require('fs').promises;

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
  updateFiles
};