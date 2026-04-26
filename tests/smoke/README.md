# Smoke Tests

Smoke tests in this folder guard against runtime and bundler regressions that unit tests cannot catch — for example, a client component accidentally losing its `'use client'` boundary and causing a Server Component to pull in a browser-only barrel import. Each test imports the affected component directly, asserts it renders without throwing, and checks that key output is present. They run in the same Vitest + jsdom environment as other tests (no dev server required) but are kept separate from co-located component tests to make the regression intent explicit.
