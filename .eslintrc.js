module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['prettier'],
  env: {
    jest: true,
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    },
    requireConfigFile: false,
  },
  ignorePatterns: ['**/bundle.js', '.eslintrc.js'],
  plugins: ['react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'array-bracket-spacing': 'error',
    'array-callback-return': 'warn',
    'arrow-spacing': 'error',
    'block-scoped-var': 'warn',
    'comma-dangle': ['error', 'never'],
    'comma-style': ['error', 'last'],
    complexity: [
      'error',
      {
        max: 10
      }
    ],
    eqeqeq: 'error',
    indent: ['error', 2],
    'max-classes-per-file': ['warn', 1],
    'max-depth': [
      'error',
      {
        max: 2
      }
    ],
    'max-lines': [
      'warn',
      {
        max: 500
      }
    ],
    'max-params': 'warn',
    'no-bitwise': 'warn',
    'no-confusing-arrow': 'error',
    'no-const-assign': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-imports': 'error',
    'no-empty': 'warn',
    'no-empty-function': 'warn',
    'no-empty-pattern': 'warn',
    'no-eval': 'error',
    'no-extra-bind': 'warn',
    'no-extra-semi': 'error',
    'no-inline-comments': 'error',
    'no-invalid-regexp': 'warn',
    'no-magic-numbers': 'warn',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': 'error',
    'no-new-object': 'error',
    'no-param-reassign': 'error',
    'no-shadow': 'error',
    'no-tabs': 'error',
    'no-trailing-spaces': 'error',
    'no-unexpected-multiline': 'warn',
    'no-unreachable': 'warn',
    'no-var': 'error',
    'object-shorthand': ['error', 'always'],
    'one-var-declaration-per-line': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'warn',
    'quotes': ['error', 'single'],
    'react/require-render-return': [1],
    'react-hooks/rules-of-hooks':'warn',
    'react-hooks/exhaustive-deps':'warn',
    'semi': 'error',
    'semi-spacing': [
      'error',
      {
        before: false
      }
    ],
    'semi-style': ['error', 'last'],
    'space-before-function-paren': 'off'
  }
};
