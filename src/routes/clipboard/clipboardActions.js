import api from 'api';

const LOAD_PASSWORD = 'LOAD_PASSWORD';
const ERROR_PASSWORD = 'ERROR_PASSWORD';

const loadPassword = () => {
  return (dispatch) => {
    api
      .get('/read/?name=db%2Fpassword.json')
      .then((response) => {
        dispatch({ type: LOAD_PASSWORD, data: JSON.parse(response.data.data) });
      })
      .catch((error) => {
        dispatch({ type: ERROR_PASSWORD, error });
      });
  };
};

export { LOAD_PASSWORD, ERROR_PASSWORD, loadPassword };
