
const createOption = (value = '', selected = false) =>
  ({ selected, value });

const createOptionsCollection = (values = [], selected = []) =>
  values.map((item, index) => createOption(item, selected[index]));

const createEventWithOptions = (values = [], selected = []) => {
  const options = createOptionsCollection(values, selected);

  return { target: { options } };
};

export {
  createEventWithOptions
};