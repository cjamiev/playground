import {
  LOAD_REMOTE_URL,
  LOAD_DELETE,
  LOAD_SELECT_BRANCH,
  LOAD_BRANCHES,
  LOAD_CREATE_STASH,
  LOAD_SELECT_STASH,
  LOAD_VIEW_STASH,
  LOAD_RESET,
  CLEAR_MESSAGE
} from './gitActions';
import gitReducer, { gitInitialState } from './gitReducer';

const remoteUrl = 'test-url';
const message = 'test-message';

describe('gitReducer', () => {
  it('default', () => {
    const result = gitReducer(undefined, {});

    expect(result).toEqual(gitInitialState);
  });

  it('LOAD_REMOTE_URL', () => {
    const action = {
      type: LOAD_REMOTE_URL,
      data: remoteUrl
    };
    const result = gitReducer(gitInitialState, action);

    expect(result).toEqual({
      ...gitInitialState,
      remoteUrl
    });
  });

  it('LOAD_DELETE', () => {
    const action = {
      type: LOAD_DELETE,
      message
    };
    const result = gitReducer(gitInitialState, action);

    expect(result).toEqual({
      ...gitInitialState,
      message
    });
  });

  it('LOAD_SELECT_BRANCH', () => {
    const action = {
      type: LOAD_SELECT_BRANCH,
      message
    };
    const result = gitReducer(gitInitialState, action);

    expect(result).toEqual({
      ...gitInitialState,
      message
    });
  });

  it('LOAD_BRANCHES', () => {
    const action = {
      type: LOAD_BRANCHES,
      data: '* master\n   branch1\n'
    };
    const result = gitReducer(gitInitialState, action);

    expect(result).toEqual({
      ...gitInitialState,
      branches: ['master', 'branch1']
    });
  });

  it('LOAD_CREATE_STASH', () => {
    const action = {
      type: LOAD_CREATE_STASH,
      message
    };
    const result = gitReducer(gitInitialState, action);

    expect(result).toEqual({
      ...gitInitialState,
      message
    });
  });

  it('LOAD_VIEW_STASH', () => {
    const action = {
      type: LOAD_VIEW_STASH,
      data: 'stash1\nstash2'
    };
    const result = gitReducer(gitInitialState, action);

    expect(result).toEqual({
      ...gitInitialState,
      stashes: ['stash1', 'stash2']
    });
  });

  it('LOAD_RESET', () => {
    const action = {
      type: LOAD_RESET,
      message
    };
    const result = gitReducer(gitInitialState, action);

    expect(result).toEqual({
      ...gitInitialState,
      message
    });
  });

  it('CLEAR_MESSAGE', () => {
    const action = {
      type: CLEAR_MESSAGE
    };
    const result = gitReducer(gitInitialState, action);

    expect(result).toEqual({
      ...gitInitialState,
      message: ''
    });
  });
});
