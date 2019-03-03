const HEADERS = new Headers({
  'Content-Type': 'application/json',
  Accept: 'application/json'
});

export const swapArrayElementPositions = (oldArray, indexA, indexB) => {
  if (indexA < 0 || indexB < 0 || indexA >= oldArray.length || indexB >= oldArray.length) {
    return oldArray;
  }

  const newArray = oldArray.slice();
  const tempItem = oldArray[indexA];
  newArray[indexA] = oldArray[indexB];
  newArray[indexB] = tempItem;

  return newArray;
};

export const decrementElementIndex = (originalArray, index) => {
  return swapArrayElementPositions(originalArray, index, index - 1);
};

export const incrementElementIndex = (originalArray, index) => {
  return swapArrayElementPositions(originalArray, index, index + 1);
};

export const apiPost = (url, body) => {
  return fetch(url, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error:', error));
};

export const apiGet = url => {
  return fetch(url, {
    method: 'GET',
    headers: HEADERS
  })
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error:', error));
};

export const download = (filename, content) => {
	const element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(content));
  element.setAttribute('download', filename);
	element.style.display = 'none';	
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
};