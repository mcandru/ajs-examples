/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  // Use ts-jest preset for TypeScript support
  preset: "ts-jest/presets/default-esm",

  // Treat .ts files as ESM
  extensionsToTreatAsEsm: [".ts"],

  // Module name mapper to handle .js imports pointing to .ts files
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  // Transform TypeScript files with ts-jest
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
        isolatedModules: true,
      },
    ],
  },

  // Ignore compiled files in dist folder
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  // Test environment
  testEnvironment: "node",

  // Automatically clear mock calls before every test
  clearMocks: true,

  // Coverage settings
  coverageProvider: "v8",
};

export default config;
