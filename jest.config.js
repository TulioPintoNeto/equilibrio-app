/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@/backend/(.*)$': '<rootDir>/src/backend/$1',
    '^@/core/(.*)$': '<rootDir>/src/core/$1',
    '^@/data/(.*)$': '<rootDir>/src/data/$1',
    '^@/frontend/(.*)$': '<rootDir>/src/frontend/$1',
  },
  modulePaths: ['<rootDir>/src/'],
};
