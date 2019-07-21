const fs = require('fs');
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

const CLIPMARK_PATH = 'clipmark.json';

const loadClipmark = () => {
  return fs.readFileSync(CLIPMARK_PATH, 'utf8') || {};
};

const createClipmark = (req, res) => {
  const clipmark = loadClipmark();

  createBackup(clipmark);

  fs.writeFile(CLIPMARK_PATH, JSON.stringify(req.body), err => {
    if (err) {
      res.status(200).send({ message: `error in creating file: ${err}` });
    } else {
      res.status(200).send({ message: 'successfully created file' });
    }
  });
};

const updateClipmark = (req, res) => {
  const clipmark = loadClipmark();

  createBackup(clipmark);

  fs.writeFile(CLIPMARK_PATH, JSON.stringify(req.body), err => {
    if (err) {
      res.status(200).send({ message: `error in creating file: ${err}` });
    } else {
      res.status(200).send({ message: 'successfully created file' });
    }
  });
};

const updateLocalStorageEndpoints = (endpoint) => {
  const clipmark = loadClipmark();
  const localStorage = loadLocalStorage();
  const localEndpoints = localStorage.endpoints || [];

  const updatedEndpoints = (!localEndpoints.length) ?
    [endpoint] :
    localEndpoints
      .filter(entry => entry.request.url !== endpoint.request.url)
      .concat([endpoint]);

  const updatedLocalStorage = {
    ...localStorage,
    endpoints: updatedEndpoints
  };

  updateSessionStorageEndpoints(endpoint);
  return updateFile(LOCAL_STORAGE_PATH, updatedLocalStorage);
};

const getClipmark = (req, res) => {
  const clipmark = loadClipmark();

  res.status(200).send(clipmark);
};

const executeCommand = (req, res) => {
  const command = req.body.command;

  const result = execSync(command, { encoding: 'utf8' });

  res.status(200).send({ message: result });
};

const createBackup = (clipmark) => {
  const date = new Date();
  const timestamp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

  fs.writeFile(`backup\\clipmark-${timestamp}.json`, clipmark, err => { console.log(err); });
};

module.exports = {
  createClipmark,
  executeCommand,
  getClipmark
};