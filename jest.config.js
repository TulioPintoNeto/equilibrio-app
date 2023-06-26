/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@/data/(.*)$': '<rootDir>/src/data/$1',
    '^@/core/(.*)$': '<rootDir>/src/core/$1',
    '^@/backend/(.*)$': '<rootDir>/src/backend/$1',
  },
  modulePaths: ['<rootDir>/src/'],
};
