import { LOAD_GENERATOR_RECORDS } from './generatorActions';

export const generatorInitialState = {
  generatorRecords: []
};

const generatorReducer = (state = generatorInitialState, action) => {
  const generatorCases = {
    [LOAD_GENERATOR_RECORDS]: () => {
      return {
        ...state,
        generatorRecords: action.data
      };
    }
  };

  return generatorCases.hasOwnProperty(action.type) ? generatorCases[action.type]() : state;
};

export default generatorReducer;
