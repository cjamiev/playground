import {
  LOAD_REMOTE_URL,
  LOAD_DELETE,
  LOAD_SELECT_BRANCH,
  LOAD_BRANCHES,
  LOAD_STASH,
  LOAD_SELECT_STASH,
  LOAD_VIEW_STASH,
  LOAD_RESET,
  CLEAR_MESSAGE
} from './gitActions';

export const gitInitialState = {
  remoteUrl: '',
  branches: [],
  stashes: [],
  message: ''
};

const gitReducer = (state = gitInitialState, action) => {
  const gitCases = {
    [LOAD_REMOTE_URL]: () => {
      return {
        ...state,
        remoteUrl: action.data.replace('\n','')
      };
    },
    [LOAD_DELETE]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [LOAD_SELECT_BRANCH]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [LOAD_BRANCHES]: () => {
      return {
        ...state,
        branches: action.data
          .split('\n')
          .filter(item => Boolean(item))
          .map(item => item.replace(/[*]?[ ]*/g, ''))
      };
    },
    [LOAD_STASH]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [LOAD_SELECT_STASH]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [LOAD_VIEW_STASH]: () => {
      return {
        ...state,
        stashes: action.data .split('\n')
      };
    },
    [LOAD_RESET]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [CLEAR_MESSAGE]: () => {
      return {
        ...state,
        message: ''
      };
    }
  };

  return gitCases.hasOwnProperty(action.type) ? gitCases[action.type]() : state;
};

export default gitReducer;
