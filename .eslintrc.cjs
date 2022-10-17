module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    extends: ['eslint:recommended', 'prettier'],
    env: {
        es2021: true,
        node: true,
        mocha: true,
        browser: true,
    },
    ignorePatterns: ['app/dist'],
    rules: {
        'no-console': 'error',
    },
    globals: {
        localStorage: true,
        fetch: true,
    },
}
