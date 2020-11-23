import { loadJSONFromFile, updateFile } from '../utility';

const SESSION_STORAGE_PATH = 'sessionStorage.json';

const clearSessionStorage = () => {
  return updateFile(SESSION_STORAGE_PATH, {});
};

const loadSessionStorage = () => {
  return loadJSONFromFile(SESSION_STORAGE_PATH, {});
};

const updateSessionStorageEndpoints = (endpoint) => {
  const sessionStorage = loadSessionStorage();
  const sessionEndpoints = sessionStorage.endpoints || [];

  const updatedEndpoints = (!sessionEndpoints.length) ?
    [endpoint] :
    sessionEndpoints
      .filter(entry => entry.request.url !== endpoint.request.url)
      .concat([endpoint]);

  const updatedSessionStorage = {
    ...sessionStorage,
    endpoints: updatedEndpoints
  };

  return updateFile(SESSION_STORAGE_PATH, updatedSessionStorage);
};

export {
  clearSessionStorage,
  loadSessionStorage,
  updateSessionStorageEndpoints
};