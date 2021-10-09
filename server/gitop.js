const execSync = require('child_process').execSync;

const UTF8 = 'utf-8';
const DEFAULT_DIR = './';

const getRemoteUrl = (rootDir = DEFAULT_DIR) => {
  try {
    return execSync(`cd ${rootDir} && git config remote.origin.url`, { encoding: UTF8 });
  } catch(e) {
    return e.stderr;
  }
};

const reset = (rootDir = DEFAULT_DIR) => {
  try {
    return execSync(`cd ${rootDir} && git reset --hard`, { encoding: UTF8 });
  } catch(e) {
    return e.stderr;
  }
};

const deleteBranch = (rootDir = DEFAULT_DIR, branchname) => {
  try {
    if(branchname) {
      return execSync(`cd ${rootDir} && git branch -D ${branchname}`, { encoding: UTF8 });
    }
    return 'Missing branchname';
  } catch(e) {
    return e.stderr;
  }
};

const selectBranch = (rootDir = DEFAULT_DIR, branchname) => {
  try {
    if(branchname) {
      return execSync(`cd ${rootDir} && git checkout ${branchname}`, { encoding: UTF8 });
    }
    return 'Missing branchname';
  } catch(e) {
    return e.stderr;
  }
};

const viewBranches = (rootDir = DEFAULT_DIR) => {
  try {
    return execSync(`cd ${rootDir} && git branch`, { encoding: UTF8 });
  } catch(e) {
    return e.stderr;
  }
};

const stash = (rootDir = DEFAULT_DIR, stashname) => {
  if(stashname){
    return execSync(`cd ${rootDir} && git stash push -m ${stashname}`, { encoding: UTF8 });
  }
  return execSync(`cd ${rootDir} && git stash`, { encoding: UTF8 });
};

const selectStash = (rootDir = DEFAULT_DIR, stashname) => {
  try {
    if(stashname) {
      return execSync(`cd ${rootDir} && git stash apply ${stashname}`, { encoding: UTF8 });
    }
    return execSync(`cd ${rootDir} && git stash apply`, { encoding: UTF8 });
  } catch(e) {
    return e.stderr;
  }
};

const viewStash = (rootDir = DEFAULT_DIR) => {
  try {
    return execSync(`cd ${rootDir} && git stash list`, { encoding: UTF8 });
  } catch(e) {
    return e.stderr;
  }
};

module.exports = {
  getRemoteUrl,
  deleteBranch,
  selectBranch,
  viewBranches,
  stash,
  selectStash,
  viewStash,
  reset
};