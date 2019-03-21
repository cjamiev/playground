const initialState = [1];

const testReducer = (state = initialState, action) => {
  const testCases = {
    'ADD_TEST': () => {
      return [...state, action.data];
    },
    'REMOVE_TEST': () => {
      return state.filter(item => item !== action.data);
    },
    'DEFAULT': () => {
      return state;
    }
  };

  return (testCases[action.type] || testCases['DEFAULT'])();
};

export default testReducer;