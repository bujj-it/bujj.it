module.exports = {
  roots: [
    '<rootDir>/spec',
  ],
  moduleFileExtensions: [
    'js',
  ],
  moduleDirectories: [
    'node_modules',
    '<rootDir>/app',
    '<rootDir>',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/spec/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/spec/__mocks__/styleMock.js',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  preset: 'jest-dynalite',
};
