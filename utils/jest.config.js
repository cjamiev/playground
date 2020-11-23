module.exports = {
  collectCoverageFrom: ['src/*.js'],
  moduleDirectories: ['src', '__tests__/testHelper', 'node_modules'],
  moduleNameMapper: {
    'testHelper(.*)$': '<rootDir>/__tests__/testHelper/$1'
  },
  testPathIgnorePatterns: ['__tests__/testHelper/*'],
  testRegex: '__tests__/.*\\.(js)$',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/config/setupTests.js'],
  watchPathIgnorePatterns: ['tmp/*']
};
