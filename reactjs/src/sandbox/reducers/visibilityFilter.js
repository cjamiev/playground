import { VisibilityFilters } from '../actions';

const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  const visibilityFilterCases = {
    'SET_VISIBILITY_FILTER': () => {
      return action.filter;
    },
    'DEFAULT': () => {
      return state;
    }
  };

  return (visibilityFilterCases[action.type] || visibilityFilterCases['DEFAULT'])();
};

export default visibilityFilter;