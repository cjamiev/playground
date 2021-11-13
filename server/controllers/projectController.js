
const { runGitOperation } = require('./gitController');
const { runPackageOperation } = require('./packageController');
const { runTemplateOperation } = require('./templateController');
const { runRegexOperation } = require('./regexController');
const { runSnippetOperation } = require('./snippetController');

const projectController = async ({ type, op, root, name, content }, payload) => {
  const data = payload ? payload : content;

  if(type === 'git') {
    return runGitOperation(op, root, name);
  } else if(type === 'package') {
    return await runPackageOperation(op, root, data);
  } else if(type === 'template') {
    return runTemplateOperation(op, {targetDir:root, name, content:data});
  } else if(type === 'regex') {
    return runRegexOperation(root, data);
  } else if(type === 'snippet') {
    return runSnippetOperation(op, name, data);
  } else {
    return { error: { message: 'project type not found'} };
  }
};

module.exports = {
  projectController
};