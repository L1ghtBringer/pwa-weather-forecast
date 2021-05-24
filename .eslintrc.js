module.exports = {
    extends: 'standard-with-typescript',
    parserOptions: {
      project: './tsconfig.json'
    },
    ignorePatterns: 'serviceWorkerRegistration.ts',
    rules: {
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-var-requires': 'off'
    }
}