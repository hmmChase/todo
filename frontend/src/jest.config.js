// https://testing-library.com/docs/react-testing-library/setup
// https://github.com/vercel/next.js/tree/canary/examples/with-jest
// https://jestjs.io/docs/configuration

// // Sync object
// /** @type {import('@jest/types').Config.InitialOptions} */
// const config = {
//   verbose: true,
//   setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
// };

// module.exports = config;

// // Or async function
// module.exports = async () => {
//   return { verbose: true, setupFilesAfterEnv: ['<rootDir>/jest-setup.js'] };
// };

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  verbose: true,

  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  moduleDirectories: ['node_modules'],

  transform: { '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest' },

  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/components/(.*)$': '<rootDir>/components/$1',

    '^@/pages/(.*)$': '<rootDir>/pages/$1'
  },
  testEnvironment: 'jest-environment-jsdom'
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
