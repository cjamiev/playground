const api = {
  post: (url, payload) => {
    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      method: 'POST'
    })
      .then(resp => resp.json());
  },
  get: (url) => {
    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
      .then(resp => resp.json());
  }
};