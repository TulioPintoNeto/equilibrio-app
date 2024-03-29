/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@/backend/(.*)$': '<rootDir>/src/backend/$1',
    '^@/core/(.*)$': '<rootDir>/src/core/$1',
    '^@/data/(.*)$': '<rootDir>/src/data/$1',
    '^@/frontend/(.*)$': '<rootDir>/src/frontend/$1',
    '^@/test/(.*)$': '<rootDir>/src/test/$1',
  },
  modulePaths: ['<rootDir>/src/'],
};
