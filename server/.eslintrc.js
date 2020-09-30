module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'global-require': 0,
    'consistent-return': 0,
    'max-len': 0,
    'valid-typeof': 0,
  },
};
