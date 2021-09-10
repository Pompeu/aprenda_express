module.exports = {
  verbose: true,
  bail: true,
  preset: '@shelf/jest-mongodb',
  coverageReporters: ['json', 'html'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ]
}
