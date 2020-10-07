// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults } = require('jest-config');
module.exports = {
    testMatch: ['**/__tests__/**/*.ts?(x)'],
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build', '<rootDir>/lib/'],
    modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/build/'],
};
