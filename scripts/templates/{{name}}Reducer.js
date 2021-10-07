import { LOAD_{{NAME}} } from './{{name}}Actions';

export const {{name}}InitialState = {
  data: []
};

const {{name}}Reducer = (state = {{name}}InitialState, action) => {
  const {{name}}Cases = {
    [LOAD_{{NAME}}]: () => {
      return {
        ...state,
        data: action.data
      };
    }
  };

  return {{name}}Cases.hasOwnProperty(action.type) ? {{name}}Cases[action.type]() : state;
};

export default {{name}}Reducer;
