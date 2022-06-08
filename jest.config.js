/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testMatch: ["<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"],
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+.tsx?$": "ts-jest",
  },
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.spec.ts",
    "!src/**/*.test.ts",
  ],
  coverageReporters: ["json", "lcov", "clover"],
  testPathIgnorePatterns: ["/dist/", "/node_modules/"],
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
  passWithNoTests: true,
};
