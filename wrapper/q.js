const child_process = require('child_process');
const exec = child_process.exec;

const UTF8 = 'utf-8';

const latestPackagVersionCommand = (pkg) => `npm show ${pkg} version`;
const allPackagVersionCommand = (pkg) => `npm view ${pkg} versions`;

const executeCommand = (command) => {
  return new Promise(((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(stdout.trim());
    });
  }));
};

const handleCommandResponse = async (pkgs, operation) => {
  const commands = operation === 'all' ? pkgs.map(name => latestPackagVersionCommand(name)): pkgs.map(name => allPackagVersionCommand(name));

  try {
    console.log(await Promise.all(commands.map(cmd => executeCommand(cmd))));
  } catch (e) {
    console.error(e.message);
  }
};

const main = () => {
  console.log('test1');
  handleCommandResponse(['react'], operation = '');
  console.log('test2');
};

main();