// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults } = require('jest-config');
module.exports = {
    testMatch: ['**/__tests__/**/*.ts?(x)'],
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build', '<rootDir>/lib/'],
    modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/build/'],
    moduleNameMapper: {
        '@/components/(.*)': '<rootDir>/components/$1',
        '@/pages/(.*)': '<rootDir>/pages/$1',
        '@/lib/(.*)': '<rootDir>/lib/$1',
        '@/utils/(.*)': '<rootDir>/utils/$1',
        '@/styles/(.*)': '<rootDir>/styles/$1',
        '@/store/(.*)': '<rootDir>/store/$1',
        '@/types/(.*)': '<rootDir>/types/$1',
    },
};
