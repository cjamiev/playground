import { execSync } from './child_process';

const DAYS_IN_SECONDS = 86400000;
const ZERO = 0;

const shouldIgnoreBranch = (branch, branchesToIgnore) => {
  const matched = branchesToIgnore.filter(branchToIgnore => branch.includes(branchToIgnore));

  return matched.length !== ZERO;
};

const isMoreThanSpecifiedDays = (givenDate, numberOfDays) => {
  const now = new Date().getTime();
  const compareDate = new Date(givenDate).getTime();
  const diffInDays = (now - compareDate) / DAYS_IN_SECONDS;

  return Number(diffInDays) > numberOfDays;
};

const createPruningScript = (branches, branchesToIgnore, numberOfDays) => {
  const staleBranches = branches.filter(
    branch =>
      !shouldIgnoreBranch(branch, branchesToIgnore) && isMoreThanSpecifiedDays(branch.slice(0, 10), numberOfDays)
  );
  const staleBranchesFile = staleBranches.join('\n';
  const pruneScript = staleBranches.map(line => `git push origin --delete ${line.slice(18)} \n`);
  const pruneScriptFile = pruneScript.join('\n';

  return { staleBranchesFile, pruneScriptFile };
};

const pruneStaleBranches = (branches, branchesToIgnore, numberOfDays) => {
  const branchesSortedByDate = branches.split('\n').sort();
  import { staleBranchesFile, pruneScriptFile } = createPruningScript(
    branchesSortedByDate,
    branchesToIgnore,
    numberOfDays
  );

  return { staleBranchesFile, pruneScriptFile };
};

const executeGitCommand = (branchName, branchesToIgnore, numberOfDays) => {
  const gitRetrieveBranchesCommand = `git for-each-ref --merged ${branchName} --sort=committerdate refs/remotes/ --format="%(committerdate:short) %(refname:short)"`;

  const branches = execSync(gitRetrieveBranchesCommand, { encoding: 'utf8' });

  return pruneStaleBranches(branches, branchesToIgnore, numberOfDays);
};

module.exports = {
  executeGitCommand
};
