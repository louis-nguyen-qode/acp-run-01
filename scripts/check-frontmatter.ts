#!/usr/bin/env tsx
/**
 * CI check: all .context/*.md files must have valid frontmatter.
 *
 * Required fields: title, type, status, updated
 * Valid types: overview | decision | contract | primitive | convention
 * Valid statuses: active | deprecated | proposed
 * updated: YYYY-MM-DD format
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'

const CONTEXT_DIR = '.context'

const VALID_TYPES = new Set(['overview', 'decision', 'contract', 'primitive', 'convention'])
const VALID_STATUSES = new Set(['active', 'deprecated', 'proposed'])
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

type Violation = { file: string; message: string }

function walkDir(dir: string): string[] {
  const results: string[] = []
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      results.push(...walkDir(fullPath))
    } else if (extname(fullPath) === '.md') {
      results.push(fullPath)
    }
  }
  return results
}

function parseFrontmatter(content: string): Record<string, string> | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match || !match[1]) return null
  const fm: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '')
    fm[key] = value
  }
  return fm
}

const files = walkDir(CONTEXT_DIR)
const violations: Violation[] = []

for (const file of files) {
  const content = readFileSync(file, 'utf8')
  const fm = parseFrontmatter(content)

  if (!fm) {
    violations.push({ file, message: 'Missing frontmatter (must start with --- block)' })
    continue
  }

  if (!fm['title']) violations.push({ file, message: 'Missing required field: title' })
  if (!fm['type']) {
    violations.push({ file, message: 'Missing required field: type' })
  } else if (!VALID_TYPES.has(fm['type'])) {
    violations.push({ file, message: `Invalid type: "${fm['type']}" (must be: ${Array.from(VALID_TYPES).join(' | ')})` })
  }
  if (!fm['status']) {
    violations.push({ file, message: 'Missing required field: status' })
  } else if (!VALID_STATUSES.has(fm['status'])) {
    violations.push({ file, message: `Invalid status: "${fm['status']}" (must be: ${Array.from(VALID_STATUSES).join(' | ')})` })
  }
  if (!fm['updated']) {
    violations.push({ file, message: 'Missing required field: updated' })
  } else if (!DATE_RE.test(fm['updated'])) {
    violations.push({ file, message: `Invalid updated date format: "${fm['updated']}" (must be YYYY-MM-DD)` })
  }
}

if (violations.length > 0) {
  console.error('\n❌ check-frontmatter: invalid .context/ files:\n')
  for (const v of violations) {
    console.error(`  ${v.file}: ${v.message}`)
  }
  console.error('\nFix the frontmatter in each listed file.\n')
  process.exit(1)
}

console.log(`✅ check-frontmatter: all ${files.length} .context/ files have valid frontmatter`)
