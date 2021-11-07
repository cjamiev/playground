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
        dispatch(createAlert({ content: error.message, status: 'error' }));
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
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

export {
  LOAD_SNIPPET_DIRECTORY,
  loadSnippetDirectory,
  LOAD_SNIPPET,
  loadSnippet
};
