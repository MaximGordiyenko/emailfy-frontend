module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Transform all JS/JSX/TS/TSX
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@bundled-es-modules/statuses)/).+\\.js$', // Important!
    '^.+\\.module\\.(css|sass|scss)$', // Example for CSS modules
  ],
  moduleNameMapper: {
    '^msw$': './node_modules/msw/lib/index.js', // Still important for MSW
  },
};
