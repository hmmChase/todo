module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testMatch: ['**/__tests__/**/*.test.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  snapshotSerializers: ['enzyme-to-json/serializer']
};
