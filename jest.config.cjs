module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testResultsProcessor: './node_modules/jest-sonar-reporter/index.js',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  
  moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  transform: {
      "^.+\\.[t|j]sx?$": "babel-jest"
  },
};