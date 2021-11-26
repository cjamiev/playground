import api from 'api';
import { createAlert } from 'components/alert/alertActions';

const LOAD_SNIPPET = 'LOAD_SNIPPET';
const LOAD_SNIPPET_DIRECTORY = 'LOAD_SNIPPET_DIRECTORY';
const ONE_SECOND = 1000;

const loadSnippetDirectory = () => {
  return (dispatch) => {
    api
      .get('/project/?type=snippet&op=read')
      .then((response) => {
        dispatch({ type: LOAD_SNIPPET_DIRECTORY, data: response.data.data });
      })
      .catch((error) => {
        dispatch(createAlert({ content: `loadSnippetDirectory: ${error.message}`, status: 'error' }));
      });
  };
};

const loadSnippet = (name) => {
  return (dispatch) => {
    api
      .get(`/project/?type=snippet&op=read&name=${name}`)
      .then((response) => {
        dispatch({ type: LOAD_SNIPPET, data: response.data.data });
      })
      .catch((error) => {
        dispatch(createAlert({ content: `loadSnippet: ${error.message}`, status: 'error' }));
      });
  };
};

const createSnippet = (filename, content) => {
  return (dispatch) => {
    api
      .post(`/project/?type=snippet&op=write&name=${filename}`, JSON.stringify(content))
      .then((response) => {
        dispatch(createAlert({ content: `Created ${filename}`, timer: ONE_SECOND, status: 'success' }));
        dispatch(loadSnippetDirectory());
      })
      .catch((error) => {
        dispatch(createAlert({ content: `createSnippet: ${error.message}`, status: 'error' }));
      });
  };
};

export {
  LOAD_SNIPPET_DIRECTORY,
  loadSnippetDirectory,
  LOAD_SNIPPET,
  loadSnippet,
  createSnippet
};
