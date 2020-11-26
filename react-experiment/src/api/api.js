import axios from 'axios';

const GET = 'get';
const POST = 'post';

export const api = {
  get: (url) => {
    return axios.get(url);
  },
  post: (url, payload) => {
    return axios.post(url, payload);
  }
};