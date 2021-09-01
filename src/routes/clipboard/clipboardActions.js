import api from 'api';

const LOAD_CLIPBOARD = 'LOAD_CLIPBOARD';
const ERROR_CLIPBOARD = 'ERROR_CLIPBOARD';

const ZERO = 0;

const loadClipboard = () => {
  return (dispatch) => {
    api
      .get('/db/?name=clipboard.json')
      .then((response) => {
        dispatch({ type: LOAD_CLIPBOARD, data: JSON.parse(response.data.data) });
      })
      .catch((error) => {
        dispatch({ type: ERROR_CLIPBOARD, error });
      });
  };
};

export {
  LOAD_CLIPBOARD,
  ERROR_CLIPBOARD,
  loadClipboard
};
