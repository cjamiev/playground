const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const api = {
  post: (url, payload) => {
    return fetch(url, {
      headers: HEADERS,
      body: JSON.stringify(payload),
      method: 'POST'
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

const copyToClipboard = text => {
  const copyText = document.createElement('textarea');
  copyText.value = text;
  document.body.appendChild(copyText);
  copyText.select();
  document.execCommand('copy');
  document.body.removeChild(copyText);
};

const parseObject = obj => {
  try {
    JSON.parse(obj);
  } catch (e) {
    return 'invalid';
  }
  return 'valid';
};