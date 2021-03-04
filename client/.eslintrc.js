module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['./src'],
      },
    },
  },
  ignorePatterns: [
    '**/serviceWorker.js',
    '**/*.spec.js',
  ],
  rules: {
    'max-len': [1, 160, 2, { ignoreUrls: true }],
    'arrow-parens': [2, 'as-needed'],
    'no-unused-vars': 1,
    'arrow-body-style': 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': 0,
    'react/destructuring-assignment': 0,
    'array-callback-return': 0,
    'consistent-return': 0
  },
};