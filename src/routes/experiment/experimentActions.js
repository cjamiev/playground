import api from 'api';

const EXPERIMENT_GET = 'EXPERIMENT_GET';
const EXPERIMENT_POST = 'EXPERIMENT_POST';


const experimentGet = () => {
  return (dispatch) => {
    api
      .get('/api/test')
      .then((response) => {
        dispatch({ type: EXPERIMENT_GET, data });
      })
      .catch((error) => {
        dispatch({ type: EXPERIMENT_GET, data: error });
      });
  };
};

const experimentPost = (data) => {
  return (dispatch) => {
    api
      .post('/api/test', data)
      .then((response) => {
        dispatch({ type: EXPERIMENT_POST, data });
      })
      .catch((error) => {
        dispatch({ type: EXPERIMENT_POST, data: error });
      });
  };
};

export { EXPERIMENT_GET, EXPERIMENT_POST, experimentGet, experimentPost };
