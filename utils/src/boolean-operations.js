const { isNil } = require('./type-check');

const isNotEmpty = targetObject => {
  if (!targetObject || !Object.keys(targetObject).length) {
    return false;
  }

  const entries = Object.keys(targetObject);
  const atLeastOneNotNull = entries.some(key => !isNil(targetObject[key]));

  return atLeastOneNotNull;
};

const isEmpty = targetObject => !isNotEmpty(targetObject);

const xOr = (a, b) => (!a && b) || (a && !b);

module.exports = { isEmpty, xOr };
