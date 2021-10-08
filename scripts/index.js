const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const exec = child_process.exec;
const spawn = child_process.spawn;
const {
  createFiles,
  updateFiles,
  updatePackageJSON
} = require('./fileop');
const {
  getRemoteUrl,
  deleteBranch,
  selectBranch,
  viewBranches,
  stash,
  selectStash,
  viewStash,
  reset
} = require('./gitop');

const START_INDEX = 0;
const END_INDEX = 5;
const TRIM_DECIMALS = {
  rootDir: './src/components/icons',
  fileRegex: /Icon.js$/,
  lineRegex: /[.][0-9]{2,}/g,
  lineMapper: matchedKey => matchedKey.substr(START_INDEX,END_INDEX)
};

