module.exports = {
  root: true,
  env: {browser: true, es2020: true},
  global: {
    process: true, // 注意：仅用于配置文件中
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    // , 'vite.config.js'
  ],
  parserOptions: {ecmaVersion: 'latest', sourceType: 'module'},
  settings: {react: {version: '18.2'}},
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
  },
}
