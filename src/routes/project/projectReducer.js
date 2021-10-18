import {
  LOAD_REMOTE_URL,
  DELETE_BRANCH,
  CREATE_BRANCH,
  SELECT_BRANCH,
  LOAD_BRANCHES,
  CREATE_STASH,
  SELECT_STASH,
  LOAD_VIEW_STASH,
  RESET_BRANCH,
  CLEAR_MESSAGE
} from './projectActions';

export const projectInitialState = {
  remoteUrl: '',
  branches: [],
  stashes: [],
  message: ''
};

const projectReducer = (state = projectInitialState, action) => {
  const projectCases = {
    [LOAD_REMOTE_URL]: () => {
      return {
        ...state,
        remoteUrl: action.data.replace('\n','')
      };
    },
    [DELETE_BRANCH]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [CREATE_BRANCH]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [SELECT_BRANCH]: () => {
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
    [CREATE_STASH]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [SELECT_STASH]: () => {
      return {
        ...state,
        message: action.message
      };
    },
    [LOAD_VIEW_STASH]: () => {
      return {
        ...state,
        stashes: action.data.split('\n')
      };
    },
    [RESET_BRANCH]: () => {
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

  return projectCases.hasOwnProperty(action.type) ? projectCases[action.type]() : state;
};

export default projectReducer;
