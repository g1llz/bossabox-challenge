module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    semi: 'off',
    'no-console': ['error',{ allow: ['info', 'error'] }],
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off'
  },
};
