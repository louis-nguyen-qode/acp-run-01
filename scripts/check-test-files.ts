#!/usr/bin/env tsx
/**
 * CI check: every new .ts/.tsx source file must have a sibling .test.ts(x).
 *
 * Reads git diff to find added files and checks for test siblings.
 * Exits non-zero if violations are found.
 *
 * Excluded paths: app/ pages (page.tsx, layout.tsx, etc.), _reference/, scripts/,
 *                 .context/, *.config.*, *.d.ts, tests/_setup.ts
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { extname, basename, dirname, join } from 'path'

const EXCLUDED_PATTERNS = [
  /^app\/.*\/(page|layout|loading|error|not-found)\.tsx?$/,
  /^app\/api\//,
  /^_reference\//,
  /^scripts\//,
  /^\.context\//,
  /\.config\.[tj]s$/,
  /\.d\.ts$/,
  /^tests\/_setup\.ts$/,
  /middleware\.ts$/,
  /auth\.config\.ts$/,
  /auth\.ts$/,
]

function isExcluded(filePath: string): boolean {
  return EXCLUDED_PATTERNS.some((re) => re.test(filePath))
}

function getAddedSourceFiles(): string[] {
  try {
    const output = execSync('git diff --name-only --diff-filter=A HEAD~1..HEAD 2>/dev/null || git diff --name-only --diff-filter=A --cached 2>/dev/null || echo ""', {
      encoding: 'utf8',
    }).trim()
    if (!output) return []
    return output
      .split('\n')
      .filter((f) => f)
      .filter((f) => ['.ts', '.tsx'].includes(extname(f)))
      .filter((f) => !isExcluded(f))
  } catch {
    return []
  }
}

function getTestSiblingPath(filePath: string): string {
  const ext = extname(filePath)
  const base = basename(filePath, ext)
  const dir = dirname(filePath)
  return join(dir, `${base}.test${ext}`)
}

const addedFiles = getAddedSourceFiles()
const violations: string[] = []

for (const file of addedFiles) {
  const testFile = getTestSiblingPath(file)
  if (!existsSync(testFile)) {
    violations.push(`  MISSING TEST: ${file} → expected ${testFile}`)
  }
}

if (violations.length > 0) {
  console.error('\n❌ check-test-files: missing test files for new source files:\n')
  violations.forEach((v) => console.error(v))
  console.error('\nEvery new .ts/.tsx file must have a sibling .test.ts(x).\n')
  process.exit(1)
}

console.log('✅ check-test-files: all new source files have test siblings')
