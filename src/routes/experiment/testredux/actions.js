const ADD_TEST = 'ADD_TEST';
const REMOVE_TEST = 'REMOVE_TEST';

const addTest = (data) => ({ type: ADD_TEST, data });

const removeTest = (data) => ({ type: REMOVE_TEST, data });

export { ADD_TEST, REMOVE_TEST, addTest, removeTest };
