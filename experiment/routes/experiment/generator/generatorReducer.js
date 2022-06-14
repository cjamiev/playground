import { LOAD_GENERATOR_RECORDS } from './generatorActions';

export const generatorInitialState = {
  records: []
};

const generatorReducer = (state = generatorInitialState, action) => {
  const generatorCases = {
    [LOAD_GENERATOR_RECORDS]: () => {
      return {
        ...state,
        records: action.data
      };
    }
  };

  return generatorCases.hasOwnProperty(action.type) ? generatorCases[action.type]() : state;
};

export default generatorReducer;
