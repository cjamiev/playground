import axios from 'axios';

const api = {
  get: (url: string) => {
    return axios.get(url);
  },
  post: (url: string, payload: unknown) => {
    return axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  put: (url: string, payload: unknown) => {
    return axios.put(url, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export default api;
