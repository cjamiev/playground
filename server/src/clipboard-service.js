const fs = require('fs');
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

const CLIPBOARD_PATH = 'clipboard.json';

const loadClipboard = () => {
  return fs.readFileSync(CLIPBOARD_PATH, 'utf8') || {};
};

const createClipboard = (req, res) => {
  const clipboard = loadClipboard();

  createBackup(clipboard);

  fs.writeFile(CLIPBOARD_PATH, JSON.stringify(req.body), err => {
    if (err) {
      res.status(200).send({ message: `error in creating file: ${err}` });
    } else {
      res.status(200).send({ message: 'successfully created file' });
    }
  });
};

const getClipboard = (req, res) => {
  const clipboard = loadClipboard();

  res.status(200).send(clipboard);
};

const executeCommand = (req, res) => {
  const command = req.body.command;

  const result = execSync(command, { encoding: 'utf8' });

  res.status(200).send({ message: result });
};

const createBackup = (clipboard) => {
  const date = new Date();
  const timestamp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

  fs.writeFile(`backup\\clipboard-${timestamp}.json`, clipboard, err => { console.log(err); });
};

module.exports = {
  createClipboard,
  executeCommand,
  getClipboard
};