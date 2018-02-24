
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
};
