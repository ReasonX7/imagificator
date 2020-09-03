module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    'index-html': '<rootDir>/dist/web/index.js'
  }
}
