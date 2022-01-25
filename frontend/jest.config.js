// https://jestjs.io/docs/configuration

// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
};

module.exports = config;

// Or async function
module.exports = async () => {
  return { verbose: true, setupFilesAfterEnv: ['<rootDir>/jest-setup.js'] };
};
