# Testing Implementation Plan

## Overview

This document outlines the plan to implement a comprehensive testing strategy for the extension. The project is already equipped with `vitest`, but lacks a proper configuration for testing VS Code extensions and has no existing tests.

This plan proposes a dual approach:

1.  **Unit Tests:** For pure TypeScript logic that does not depend on the VS Code API. These tests will be run with `vitest`.
2.  **Integration Tests:** For functionality that interacts with the VS Code API. These tests will use the official `@vscode/test-electron` package.

## Steps

### 1. Install Dependencies

The necessary `vitest` dependency is already in `package.json`. We need to add `@vscode/test-electron` for integration tests.

```bash
npm install @vscode/test-electron --save-dev
```

### 2. Configure Test Environment

#### a. Directory Structure

Create the following directory structure to organize the tests:

```
.
├── src/
│   └── test/
│       ├── runTest.ts
│       └── suite/
│           ├── extension.test.ts
│           └── index.ts
└── tests/
    └── casing.test.ts
```

*   `src/test/`: Will contain the integration test suite.
*   `tests/`: Will contain `vitest` unit tests.

#### b. `vitest.config.ts`

The existing `vitest.config.ts` is sufficient for running unit tests. No changes are needed initially.

#### c. `.vscodeignore`

Update `.vscodeignore` to exclude test files from the final extension package:

```
.vscodeignore
.vscode/**
.github/**
.gitignore
vsc-extension-quickstart.md
**/tsconfig.json
**/.eslintrc.json
**/*.map
**/*.ts
node_modules/
out/test/
src/
tests/
```

### 3. Create Integration Tests

These tests will run in a special instance of VS Code and are ideal for testing commands and editor interactions.

#### a. `src/test/runTest.ts`

This file is the entry point for the integration test runner.

```typescript
import * as path from 'path';
import { runTests } from '@vscode/test-electron';

async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, '../../');

    // The path to the extension test script
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, './suite/index');

    // Download VS Code, unzip it and run the integration test
    await runTests({ extensionDevelopmentPath, extensionTestsPath });
  } catch (err) {
    console.error('Failed to run tests');
    process.exit(1);
  }
}

main();
```

#### b. `src/test/suite/index.ts`

This file configures and runs the Mocha test suite.

```typescript
import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

export function run(): Promise<void> {
  // Create the mocha test
  const mocha = new Mocha({
    ui: 'tdd',
    color: true
  });

  const testsRoot = path.resolve(__dirname, '..');

  return new Promise((c, e) => {
    glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
      if (err) {
        return e(err);
      }

      // Add files to the test suite
      files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

      try {
        // Run the mocha test
        mocha.run(failures => {
          if (failures > 0) {
            e(new Error(`${failures} tests failed.`));
          } else {
            c();
          }
        });
      } catch (err) {
        console.error(err);
        e(err);
      }
    });
  });
}
```

#### c. `src/test/suite/extension.test.ts` (Sample)

A sample integration test.

```typescript
import * as assert from 'assert';
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});
```

### 4. Create Unit Tests

These tests are for pure functions and run in a Node.js environment using `vitest`.

#### `tests/casing.test.ts` (Sample)

A sample unit test for a casing utility.

```typescript
import { describe, it, expect } from 'vitest';
import { toCamel } from '../src/modules/casing/utils/transformers/toCamel';

describe('Casing transformers', () => {
  it('should transform to camelCase', () => {
    expect(toCamel('hello world')).toBe('helloWorld');
    expect(toCamel('foo-bar')).toBe('fooBar');
    expect(toCamel('baz_qux')).toBe('bazQux');
  });
});
```

### 5. Update `package.json`

Modify the `scripts` in `package.json` to run both types of tests.

**Original `package.json` scripts:**
```json
"scripts": {
    "test": "node ./out/test/runTests.js"
},
```

**Updated `package.json` scripts:**
```json
"scripts": {
    "test": "npm run compile && node ./out/test/runTest.js",
    "test:unit": "vitest run"
},
```

Note: The `pretest` script might also need adjustment depending on the final setup.

### 6. Update `.gitignore`

Add the test results directory to `.gitignore`.

```
.gitignore
...
test-run-results/
```
