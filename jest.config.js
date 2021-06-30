module.exports = {
  collectCoverageFrom: [
    'src/**/*.js',
    'utils/*.js',
    'server/*.js',
    '!src/index.js',
    '!src/store/index.js'
  ],
  moduleDirectories: ['src', 'testHelper', 'utils', 'node_modules'],
  moduleNameMapper: {
    'testHelper(.*)$': '<rootDir>/testHelper/$1'
  },
  testPathIgnorePatterns: ['testHelper/*'],
  testRegex: '(server|src|utils)/.*\\.test.(js)$',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/cssTransformer.js',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/config/fileTransformer.js'
  },
  setupFilesAfterEnv: ['<rootDir>/config/setupTests.js'],
  watchPathIgnorePatterns: ['tmp/*']
};
