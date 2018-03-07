
module.exports = {
  testMatch: [
    '**/*.stories.js',
  ],
  setupFiles: [
    './jest.setup.js',
  ],
  automock: false,
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/.storybook/__mocks__/style-mock.js',
  },
};
