const flattenDeep = (arr = []) =>
  (Array.isArray(arr) ? arr.reduce((a, b) => [...flattenDeep(a), ...flattenDeep(b)], []) : [arr]);

export {
  flattenDeep,
};
