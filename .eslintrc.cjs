module.exports = {
  root: true,
  extends: ['next', 'next/core-web-vitals'],
  plugins: ['react-hooks'],
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
    '@next/next/no-img-element': 'off',
  },
  env: {
    browser: true,
    node: true,
  },
};
