const filterOutEmptyKeys = (obj) => {
  const definedProperties = Object
    .keys(obj)
    .filter(key => {
      if(!obj[key]) {
        return false;
      }

      return true;
    })
    .reduce((accumulator, key) => {
      return { [key]: obj[key], ...accumulator };
    }, {});

  return definedProperties;
};

export {
  filterOutEmptyKeys
};
