const { exec, execSync } = require('child_process');
const fs = require('fs');

const gitDiffCommand = 'git diff --name-only';
const ROOT = 'B:/CJV/Documents/workspace/sandbox';
const COPY_DIR = 'B:/CJV/Documents/workspace/tmp';

const getListOfModifiedFiles = file => {
  const lines = file.split('\n');
  const removeDeletedFiles = lines.filter(line => !/^D/.test(line));
  const listOfModifiedFiles = removeDeletedFiles.map(line => line.replace(/^\w+\s+/, ''));

  return listOfModifiedFiles.join('\n');
};

const copyModifiedFiles = (projectDirectory, branchName) => {
  const cdIntoDirectory = `cd ${projectDirectory}`;
  const indexAllFilesCmd = 'git add -A';
  const unstageAllFilesCmd = 'git reset HEAD';
  const gitModifiedFilesCmd = `git diff --name-status ${branchName}`;
  const allCommands = `${cdIntoDirectory} && ${indexAllFilesCmd} && ${gitModifiedFilesCmd}`;

  const result = execSync(allCommands, { encoding: 'utf8' });
  const modifiedFiles = getListOfModifiedFiles(result);
  exec(`${cdIntoDirectory} && ${unstageAllFilesCmd}`);

  return modifiedFiles;
};

const stock = () => {
  const result = execSync(gitDiffCommand, { encoding: 'utf8' })
    .split('\n')
    .filter(item => item);

  result.forEach(item => {
    const file = item.split('/').pop();
    fs.copyFile(`${ROOT}/${item}`, `${COPY_DIR}/stock/${file}`, err => {
      if (err) throw err;
      console.log(`Successully moved:${ROOT}/${item} to ${COPY_DIR}/${file}`);
    });
  });

  fs.writeFile(`${COPY_DIR}/diff.json`, JSON.stringify(result), err => {
    if (err) {
      return console.log(err);
    }
  });
};

const unstock = () => {
  const result = JSON.parse(fs.readFileSync(`${COPY_DIR}/diff.json`, 'utf8'));

  result.forEach(item => {
    const file = item.split('/').pop();
    fs.copyFile(`${COPY_DIR}/stock/${file}`, `${ROOT}/${item}`, err => {
      if (err) throw err;
      console.log(`Successully moved:${COPY_DIR}/stock/${file} to ${ROOT}/${item}`);
    });
  });
};

module.exports = {
  stock,
  unstock,
  copyModifiedFiles
};
