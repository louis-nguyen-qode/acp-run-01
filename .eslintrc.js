/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jsx-a11y', 'import'],
  rules: {
    // TypeScript strictness
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // No default exports except Next.js conventions
    'import/no-default-export': 'error',

    // Import order
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/no-duplicates': 'error',

    // Disallow console.log
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
  },
  overrides: [
    {
      // Next.js App Router files require default exports
      files: [
        'app/**/page.tsx',
        'app/**/layout.tsx',
        'app/**/loading.tsx',
        'app/**/error.tsx',
        'app/**/not-found.tsx',
        'app/**/route.ts',
        'middleware.ts',
        'next.config.js',
        'vitest.config.ts',
        'playwright.config.ts',
        '_reference/**',
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    },
    {
      files: ['scripts/**/*.ts'],
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
}
