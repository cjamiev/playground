import api from 'api';

const LOAD_CLIPBOARD = 'LOAD_CLIPBOARD';
const ERROR_CLIPBOARD = 'ERROR_CLIPBOARD';

const loadClipboard = () => {
  return (dispatch) => {
    api
      .get('/read/?name=db%2Fpassword.json')
      .then((response) => {
        dispatch({ type: LOAD_CLIPBOARD, data: JSON.parse(response.data.data) });
      })
      .catch((error) => {
        dispatch({ type: ERROR_CLIPBOARD, error });
      });
  };
};

export { LOAD_CLIPBOARD, ERROR_CLIPBOARD, loadClipboard };
