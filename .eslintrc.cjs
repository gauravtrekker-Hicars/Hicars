module.exports = {
  root: true,
  extends: ['next', 'next/core-web-vitals'],
  plugins: ['react-hooks', 'react-refresh'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react-refresh/only-export-components': 'off',
    '@next/next/no-img-element': 'off',
  },
  env: {
    browser: true,
    node: true,
  },
};
