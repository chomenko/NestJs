const commonRules = {
  'comma-dangle': ['error', {
    arrays: 'always-multiline',
    objects: 'always-multiline',
    imports: 'always-multiline',
    exports: 'always-multiline',
    functions: 'only-multiline',
  }],
  'linebreak-style': ['error', 'unix'],
  'max-len': ['warn', {
    code: 120,
    tabWidth: 2,
    ignoreUrls: true,
  }],
  'no-multi-spaces': ['warn', {
    ignoreEOLComments: true,
  }],
  'no-multiple-empty-lines': ['warn', {
    max: 2,
    maxEOF: 1,
    maxBOF: 1,
  }],
  'no-template-curly-in-string': 'off',
  'operator-linebreak': ['error', 'before'],
  'padded-blocks': ['warn', {
    switches: 'never',
  }],

  'quote-props': ['error', 'consistent-as-needed'],
  'spaced-comment': ['warn', 'always', {
    exceptions: ['-', '*', '/', '='],
  }],
  'node/no-path-concat': 'off',
}

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'standard',
  ],
  env: {
    node: true,
    jest: true,
  },

  ignorePatterns: [
    'dist/',
    'node_modules/',
    '.eslintrc.js',
  ],
  rules: commonRules,
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'src/tsconfig.json',
        sourceType: 'module',
      },
      settings: {
        'import/resolver': {
          typescript: {
            project: 'src/tsconfig.json',
          },
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'standard-with-typescript',
        'plugin:import/recommended',
      ],
      rules: {
        ...commonRules,
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'import/default': 'off',
        'import/newline-after-import': ['error', { count: 2 }],
        'import/no-duplicates': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-named-as-default': 'off',
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/class-literal-property-style': ['error', 'fields'],
        '@typescript-eslint/consistent-type-assertions': ['error', {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'allow',
        }],
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/explicit-member-accessibility': ['error', {
          accessibility: 'no-public',
          overrides: {
            parameterProperties: 'off',
          },
        }],
        '@typescript-eslint/indent': ['error', 4, {
          SwitchCase: 1,
          VariableDeclarator: 1,
          outerIIFEBody: 1,
          MemberExpression: 1,
          FunctionDeclaration: { parameters: 'off', body: 1 },
          FunctionExpression: { parameters: 'off', body: 1 },
          CallExpression: { arguments: 'off' },
          ArrayExpression: 1,
          ObjectExpression: 1,
          ImportDeclaration: 1,
          flatTernaryExpressions: true,
          ignoreComments: false,
          ignoredNodes: [
            'FunctionExpression > .params[decorators.length > 0]',
            'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
            'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
          ],
        }],
        '@typescript-eslint/lines-between-class-members': 'warn',
        '@typescript-eslint/member-delimiter-style': ['error', {
          multiline: { delimiter: 'comma', requireLast: true },
          singleline: { delimiter: 'comma', requireLast: false },
          overrides: {
            interface: {
              multiline: { delimiter: 'none' },
            },
          },
        }],
        '@typescript-eslint/member-ordering': 'warn',
        '@typescript-eslint/method-signature-style': 'warn',
        '@typescript-eslint/no-extra-semi': 'warn',
        '@typescript-eslint/no-invalid-void-type': 'off',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-redeclare': 'warn',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars-experimental': ['error', {
          ignoreArgsIfArgsAfterAreUsed: true,
        }],
        '@typescript-eslint/no-use-before-define': ['error', {
          functions: false,
          typedefs: false,
        }],
        '@typescript-eslint/prefer-enum-initializers': 'error',
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/prefer-includes': 'warn',
        '@typescript-eslint/prefer-reduce-type-parameter': 'off',
        '@typescript-eslint/prefer-regexp-exec': 'warn',
        '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        'new-cap': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/explicit-module-boundary-types': ['error', {
          allowArgumentsExplicitlyTypedAsAny: true,
          allowDirectConstAssertionInArrowFunctions: true,
          allowHigherOrderFunctions: false,
          allowTypedFunctionExpressions: true,
        }],
        '@typescript-eslint/no-extraneous-class': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-for-in-array': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/return-await': ['off', 'in-try-catch'],
      },
    },
  ],
}
