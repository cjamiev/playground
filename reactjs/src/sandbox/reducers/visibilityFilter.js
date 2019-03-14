import { VisibilityFilters } from '../actions';

const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  const visibilityFilterCases = {
    'SET_VISIBILITY_FILTER': () => {
      return action.filter;
    }
  };

  return visibilityFilterCases.hasOwnProperty(action.type) ? visibilityFilterCases[action.type]() : state;
};

export default visibilityFilter;