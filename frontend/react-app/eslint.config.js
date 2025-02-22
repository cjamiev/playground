import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      "array-bracket-spacing": "error",
      "array-callback-return": "warn",
      "arrow-spacing": "error",
      "block-scoped-var": "warn",
      "comma-dangle": [
        "error",
        "never"
      ],
      "comma-style": [
        "error",
        "last"
      ],
      "complexity": [
        "error",
        {
          "max": 10
        }
      ],
      "eqeqeq": "error",
      "indent": [
        "error",
        2
      ],
      "max-classes-per-file": [
        "warn",
        1
      ],
      "max-depth": [
        "error",
        {
          "max": 2
        }
      ],
      "max-lines": [
        "warn",
        {
          "max": 500
        }
      ],
      "max-params": "warn",
      "no-bitwise": "warn",
      "no-confusing-arrow": "error",
      "no-const-assign": "error",
      "no-dupe-keys": "error",
      "no-duplicate-imports": "error",
      "no-empty": "warn",
      "no-empty-function": "warn",
      "no-empty-pattern": "warn",
      "no-eval": "error",
      "no-extra-bind": "warn",
      "no-extra-semi": "error",
      "no-inline-comments": "error",
      "no-invalid-regexp": "warn",
      "no-magic-numbers": "warn",
      "no-multi-spaces": "error",
      "no-multiple-empty-lines": "error",
      "no-new-object": "error",
      "no-param-reassign": "error",
      "no-shadow": "error",
      "no-tabs": "error",
      "no-trailing-spaces": "error",
      "no-unexpected-multiline": "warn",
      "no-unreachable": "warn",
      "no-var": "error",
      "object-shorthand": [
        "error",
        "always"
      ],
      "one-var-declaration-per-line": "error",
      "prefer-arrow-callback": "error",
      "prefer-const": "warn",
      "quotes": [
        "error",
        "single"
      ],
      "react/require-render-return": [
        1
      ],
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "semi": "error",
      "semi-spacing": [
        "error",
        {
          "before": false
        }
      ],
      "semi-style": [
        "error",
        "last"
      ],
      "space-before-function-paren": "off",
      "indent": [
        "error",
        2
      ],
    },
  },
]
