module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      }
    }
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'node',
    'promise'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'src/**',
            group: 'internal',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    'import/newline-after-import': 'error',
    'import/no-default-export': 'error',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-template-curly-in-string': 'off',
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        version: 'latest',
        ignores: ['modules']
      }
    ],
    'prefer-const': 'error',
    'prefer-destructuring': [
      'warn',
      {
        array: false,
        object: true
      },
      {
        enforceForRenamedProperties: false
      }
    ],
    'object-shorthand': 'error',
    'no-var': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true
      }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false,
          object: false
        },
        extendDefaults: true
      }
    ]
  },
  overrides: [
    {
      files: ['**/Logger.ts'],
      rules: {
        'no-console': 'off'
      }
    },
    {
      files: ['*.ts', '*.spec.ts'],
      rules: {
        'no-useless-constructor': 'off'
      }
    }
  ]
}
