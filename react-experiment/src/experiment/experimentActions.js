import { api } from '../api/api';

const TEST_GET = 'TEST_GET';
const TEST_POST = 'TEST_POST';

const experimentGet = (data) => ({ type: TEST_GET, data });
const experimentPost = (data) => ({ type: TEST_POST, data });

const testGet = () => {
  return (dispatch) => {
    api
      .get('/api/test')
      .then((response) => {
        dispatch(experimentGet(response.data));
      })
      .catch((error) => {
        dispatch(experimentGet(error));
      });
  };
};

const testPost = (data) => {
  return (dispatch) => {
    api
      .post('/api/test', data)
      .then((response) => {
        dispatch(experimentPost(response.data));
      })
      .catch((error) => {
        dispatch(experimentPost(error));
      });
  };
};

export { TEST_GET, TEST_POST, testGet, testPost };
