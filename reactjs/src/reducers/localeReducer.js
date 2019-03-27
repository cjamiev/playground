import { CHANGE_LOCALE } from '../actions/localeActions';
import { DEFAULT_LOCALE } from '../i18n';

export const initialState = {
  locale: DEFAULT_LOCALE
};

function localeProviderReducer(state = initialState, action) {
  const localeCases = {
    [CHANGE_LOCALE]: () => {
      return { ...state, locale: action.locale };
    },
    ['DEFAULT']: () => {
      return state;
    }
  };

  return (localeCases[action.type] || localeCases['DEFAULT'])();
}

export default localeProviderReducer;
