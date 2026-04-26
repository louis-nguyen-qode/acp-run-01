import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/_setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        '.next/**',
        '**/*.config.*',
        '**/.eslintrc*',
        '**/*.d.ts',
        '_reference/**',
        'scripts/**',
        'tests/_setup.ts',
        '**/index.ts',
        'app/**/layout.tsx',
        'app/**/page.tsx',
        'app/**/error.tsx',
        'app/**/loading.tsx',
        'app/**/not-found.tsx',
      ],
      thresholds: {
        perFile: true,
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': new URL('.', import.meta.url).pathname,
    },
  },
})
