import api from 'api';

const LOAD_PASSWORD = 'LOAD_PASSWORD';
const ERROR_PASSWORD = 'ERROR_PASSWORD';
const LOAD_FOOD = 'LOAD_FOOD';
const ERROR_FOOD = 'ERROR_FOOD';
const LOAD_MAIN = 'LOAD_MAIN';
const ERROR_MAIN = 'ERROR_MAIN';

const loadPassword = () => {
  return (dispatch) => {
    api
      .get('/db/?name=password.json')
      .then((response) => {
        dispatch({ type: LOAD_PASSWORD, data: JSON.parse(response.data.data) });
      })
      .catch((error) => {
        dispatch({ type: ERROR_PASSWORD, error });
      });
  };
};

const loadFood = () => {
  return (dispatch) => {
    api
      .get('/db/?name=food.json')
      .then((response) => {
        dispatch({ type: LOAD_FOOD, data: JSON.parse(response.data.data) });
      })
      .catch((error) => {
        dispatch({ type: ERROR_FOOD, error });
      });
  };
};

const loadMain = () => {
  return (dispatch) => {
    api
      .get('/db/?name=main.json')
      .then((response) => {
        dispatch({ type: LOAD_MAIN, data: JSON.parse(response.data.data) });
      })
      .catch((error) => {
        dispatch({ type: ERROR_MAIN, error });
      });
  };
};

export {
  LOAD_PASSWORD,
  ERROR_PASSWORD,
  loadPassword,
  LOAD_FOOD,
  ERROR_FOOD,
  loadFood,
  LOAD_MAIN,
  ERROR_MAIN,
  loadMain
};
