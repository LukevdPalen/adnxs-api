const path = require('path');

const glob = require('glob');

// autoload .env
if (glob.sync('.env', { cwd: path.resolve(__dirname) }).length) {
  require('dotenv').load(); // eslint-disable-line
}

module.exports = {
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  moduleDirectories: [
    'node_modules',
  ],
  setupFilesAfterEnv: [
    './test/setup/node.js',
  ],
  testEnvironment: 'node',
  testMatch: [
    '**/test/unit/**/*.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
};
