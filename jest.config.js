module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ["/node_modules/"],

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true, // Set to `false` if you don't want Jest to collect coverage by default

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "jsx", "json", "node"],

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],

  // The test environment that will be used for testing
  testEnvironment: "jsdom", // This is important for testing React components in a browser-like environment

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)", // Look for any files inside a folder named __tests__
    "**/?(*.)+(spec|test).[tj]s?(x)", // Also look for any files ending in .spec.js, .test.js, .spec.jsx, or .test.jsx
  ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ["/node_modules/"],

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: "http://localhost",

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    "/node_modules/(?!(axios|another-module)/)", // This is just an example, modify it to include any specific packages that need to be transformed
  ],

  // Indicates a set of files for which coverage information should be collected
  collectCoverageFrom: [
    "src/**/*.{js,jsx}", // Collect coverage from all JavaScript and JSX files under src/
    "!src/index.js", // Exclude specific files from coverage if necessary
  ],

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest", // Transform all js and jsx files with babel-jest
  },

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Help Jest to handle non-JS files such as stylesheets
  },
};
