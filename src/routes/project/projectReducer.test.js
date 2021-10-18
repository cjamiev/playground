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
import projectReducer, { projectInitialState } from './projectReducer';

const remoteUrl = 'test-url';
const message = 'test-message';

describe('projectReducer', () => {
  it('default', () => {
    const result = projectReducer(undefined, {});

    expect(result).toEqual(projectInitialState);
  });

  it('LOAD_REMOTE_URL', () => {
    const action = {
      type: LOAD_REMOTE_URL,
      data: remoteUrl
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      remoteUrl
    });
  });

  it('DELETE_BRANCH', () => {
    const action = {
      type: DELETE_BRANCH,
      message
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      message
    });
  });

  it('CREATE_BRANCH', () => {
    const action = {
      type: CREATE_BRANCH,
      message
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      message
    });
  });

  it('SELECT_BRANCH', () => {
    const action = {
      type: SELECT_BRANCH,
      message
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      message
    });
  });

  it('LOAD_BRANCHES', () => {
    const action = {
      type: LOAD_BRANCHES,
      data: '* master\n   branch1\n'
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      branches: ['master', 'branch1']
    });
  });

  it('CREATE_STASH', () => {
    const action = {
      type: CREATE_STASH,
      message
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      message
    });
  });

  it('SELECT_STASH', () => {
    const action = {
      type: SELECT_STASH,
      message
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      message
    });
  });

  it('LOAD_VIEW_STASH', () => {
    const action = {
      type: LOAD_VIEW_STASH,
      data: 'stash1\nstash2'
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      stashes: ['stash1', 'stash2']
    });
  });

  it('RESET_BRANCH', () => {
    const action = {
      type: RESET_BRANCH,
      message
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      message
    });
  });

  it('CLEAR_MESSAGE', () => {
    const action = {
      type: CLEAR_MESSAGE
    };
    const result = projectReducer(projectInitialState, action);

    expect(result).toEqual({
      ...projectInitialState,
      message: ''
    });
  });
});
