import axios from 'axios';

export const addTest = data => ({
  type: 'ADD_TEST',
  data
});

export const removeTest = data => ({
  type: 'REMOVE_TEST',
  data
});

export const getData = (result) => {
  return {
    type: 'DATA',
    data: result
  };
};

export const testGet = () => {
  return (dispatch) => {
    return axios.get('http://localhost:8080/api').then((response) => {
      dispatch(getData(response));
    });
  };
};