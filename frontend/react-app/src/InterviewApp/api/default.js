const parser = new DOMParser();

const getData = async (url, isText) => {
  return await fetch(url).then((response) => {
    if (isText) {
      return response.text();
    } else {
      return response.json();
    }
  });
};

const getHTMLData = async (url) => {
  return await getData(url, true).then((html) => {
    const doc = parser?.parseFromString(html, "text/html");

    return doc?.querySelector("body")?.innerHTML;
  });
};

export { getData, getHTMLData };