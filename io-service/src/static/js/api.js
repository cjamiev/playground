const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const api = {
  post: (url, payload) => {
    return fetch('http://localhost:1002/' + url, {
      headers: HEADERS,
      body: JSON.stringify(payload),
      method: 'POST',
      crossDomain: true
    })
      .then(resp => resp.json())
      .catch(error => console.log('error:', error));
  },
  get: (url) => {
    return fetch(url, {
      headers: HEADERS,
      method: 'GET'
    })
      .then(resp => resp.json())
      .catch(error => console.log('error:', error));
  }
};