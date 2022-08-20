// https://testing-library.com/docs/react-testing-library/setup
// https://github.com/vercel/next.js/tree/canary/examples/with-jest
// https://jestjs.io/docs/configuration
// https://github.com/vercel/next.js/blob/canary/examples/with-jest-babel/jest.config.js

const nextJest = require('next/jest');
// const path = require('path');

/** @type {import('@jest/types').Config.InitialOptions} */

// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
const createJestConfig = nextJest({ dir: './' });

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    // (.*)$: capture whatever comes after the exact match (the directory)
    // $1: map it to this value in the directory I specify
    // it translates to "anything that matches @/ should be sent to <rootDir>/src/<rest of the path>
    // $1 is used in the replacement string to insert the captured text

    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@/context/(.*)$': '<rootDir>/src/context/$1',
    '^@/graphql/(.*)$': '<rootDir>/src/graphql/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/models/(.*)$': '<rootDir>/src/models/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/public/(.*)$': '<rootDir>/public/$1',
    '^@/root/(.*)$': '<rootDir>/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1)'

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    // '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': `<rootDir>/__mocks__/fileMock.js`
  },

  // transform: { '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest' },
  //   '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]

  transformIgnorePatterns: ['/node_modules/'],

  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],

  // moduleDirectories: [path.resolve(__dirname), 'node_modules']
  // moduleDirectories: ['node_modules', './src/utils']

  testEnvironment: 'jest-environment-jsdom',

  verbose: true,

  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**'
  ]
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
