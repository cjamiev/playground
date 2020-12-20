import api from 'api';

const TEST_GET = 'TEST_GET';
const TEST_POST = 'TEST_POST';

const testApiGet = (data) => ({ type: TEST_GET, data });
const testApiPost = (data) => ({ type: TEST_POST, data });

const testGet = () => {
  return (dispatch) => {
    api
      .get('/api/test')
      .then((response) => {
        dispatch(testApiGet(response.data));
      })
      .catch((error) => {
        dispatch(testApiGet(error));
      });
  };
};

const testPost = (data) => {
  return (dispatch) => {
    api
      .post('/api/test', data)
      .then((response) => {
        dispatch(testApiPost(response.data));
      })
      .catch((error) => {
        dispatch(testApiPost(error));
      });
  };
};

export { TEST_GET, TEST_POST, testGet, testPost };
