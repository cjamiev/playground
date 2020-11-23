import { loadJSONFromFile, updateFile } from '../utility';

const LOGFILE_PATH = 'log.json';
const ONE = 1;

const loadLog = () => {
  return loadJSONFromFile(LOGFILE_PATH, []);
};

const logEntry = (url, payload) => {
  const date = new Date();
  const timestamp = `${date.getMonth() + ONE}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const currentLog = loadLog();
  const updatedLog = currentLog.concat([{ timestamp, url, payload }]);

  updateFile(LOGFILE_PATH, updatedLog);
};

const clearLog = () => {
  return updateFile(LOGFILE_PATH, []);
};

export {
  clearLog,
  loadLog,
  logEntry
};