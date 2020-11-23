import { updateSessionStorageEndpoints } from './sessionStorage';
import {
  deleteFile,
  doesFileExist,
  loadJSONFromFile,
  updateFile,
  makeDirectory
} from '../utility';

const MOCK_RESPONSE_PATH = 'src/mockResponses';
const MOCK_REQUESTS_PATH = 'mockRequests.json';
const FILE_ALREADY_EXISTS_MESSAGE = 'A file with this path and name already exists, use a different name or delete the original first';
const ENTRY_ALREADY_EXISTS_MESSAGE = 'An entry with this method and url already exists. Please delete the original first';

const getMockDataFolderPath = foldername => `${MOCK_RESPONSE_PATH}/${foldername}`;
const getMockDataFilePath = (filename, foldername) => {
  return foldername ? `${MOCK_RESPONSE_PATH}/${foldername}/${filename}.json` : `${MOCK_RESPONSE_PATH}/${filename}.json`;
};

const createMockFile = (content, filename, foldername) => {
  const folderpath = getMockDataFolderPath(foldername);
  foldername && makeDirectory(folderpath);

  const mockfilepath = getMockDataFilePath(filename, foldername);

  if (doesFileExist(mockfilepath)) {
    return FILE_ALREADY_EXISTS_MESSAGE;
  }

  const errorMessageOne = updateMockRequests({ ...content.request, responsePath: mockfilepath });
  if (errorMessageOne) {
    return errorMessageOne;
  }
  const errorMessageTwo = updateFile(mockfilepath, content.response);
  updateSessionStorageEndpoints(content);

  return errorMessageTwo;
};

const loadMockRequests = () => {
  return loadJSONFromFile(MOCK_REQUESTS_PATH, []);
};

const removeMockRequestsEntry = (request) => {
  const mockRequests = loadMockRequests();

  const updatedMockRequests = (!mockRequests.length) ?
    [] :
    mockRequests
      .filter(entry => !(entry.url === request.url && entry.method === request.method));

  deleteFile(request.responsePath);

  return updateFile(MOCK_REQUESTS_PATH, updatedMockRequests);
};


const updateMockRequests = (request) => {
  const mockRequests = loadMockRequests();

  const matched = mockRequests.find(entry => entry.url === request.url && entry.method === request.method);

  if (matched) {
    return ENTRY_ALREADY_EXISTS_MESSAGE;
  }

  const updatedMockRequests = mockRequests.concat([request]);

  return updateFile(MOCK_REQUESTS_PATH, updatedMockRequests);
};

export {
  createMockFile,
  loadMockRequests,
  removeMockRequestsEntry
};