/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",

  // Tell ts-jest to use CommonJS tsconfig
  transform: {
    "^.+\\.ts$": ["ts-jest", {
      tsconfig: "tsconfig.jest.json"
    }]
  },

  // Map .js imports to their .ts source files
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },

  // Ignore compiled files in dist folder
  testPathIgnorePatterns: ["/node_modules/", "/dist/"]
};
