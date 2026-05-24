module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  collectCoverageFrom: [
    '../index.html',
    '../_next/**/*'
  ],
  coverageDirectory: 'coverage',
  verbose: true
};