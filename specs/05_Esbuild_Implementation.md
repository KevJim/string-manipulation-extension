# ESBuild Implementation Plan

## Overview

This document outlines the plan to migrate the extension's build process from `tsc` to `esbuild` for faster compilation and bundling.

## Goals

-   Significantly reduce build times.
-   Bundle all extension code and dependencies into a single output file.
-   Maintain compatibility with the VS Code extension environment.
-   Support TypeScript path aliases.
-   Generate source maps for debugging.

## Steps

### 1. Install Dependencies

Install `esbuild` as development dependencies.

```bash
npm install esbuild --save-dev
```

### 2. Create ESBuild Script

Create a new file, `esbuild.mjs`, in the project root with the following content. This script will define the `esbuild` configuration.

```javascript
import * as esbuild from 'esbuild';

const watch = process.argv.includes('--watch');

const baseConfig = {
    entryPoints: ['src/extension.ts'],
    bundle: true,
    outdir: 'out',
    external: ['vscode'], // Mark vscode as external, it's provided by the VS Code runtime
    format: 'cjs', // CommonJS format for Node.js environment
    platform: 'node', // Target Node.js environment
    sourcemap: true, // Generate sourcemaps for debugging
    plugins: [plugins: [
        {
            name: 'path-mapping',
            setup(build) {
                build.onResolve({ filter: /^src\// }, (args) => {
                    const relativePath = args.path.replace(/^src\//, './src/');
                    const resolvedPath = resolve(relativePath + '.ts');
                    return {
                        path: resolvedPath,
                        external: false,
                    };
                });
            },
        },
    ],], // Handle TypeScript path aliases
};

if (watch) {
    esbuild.context(baseConfig).then(context => {
        context.watch();
        console.log('esbuild is watching for changes...');
    }).catch(() => process.exit(1));
} else {
    esbuild.build(baseConfig).catch(() => process.exit(1));
}
```

### 3. Update `package.json` Scripts

Modify the `scripts` section in `package.json` to use the new `esbuild.mjs` script.

**Original `package.json` scripts:**

```json
"scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./",
    "pretest": "npm run compile && npm run lint",
    "lint": "eslint src --ext ts",
    "test": "node ./out/test/runTests.js"
},
```

**Updated `package.json` scripts:**

```json
"scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "node esbuild.mjs",
    "watch": "node esbuild.mjs --watch",
    "pretest": "npm run compile && npm run lint",
    "lint": "eslint src --ext ts",
    "test": "node ./out/test/runTests.js"
},
```

### 4. Remove `out` from `.gitignore`

Ensure that the `out` directory is not ignored by Git, as `esbuild` will generate the bundled output there. If `out/` is present in `.gitignore`, remove it.

### 5. Test the Build

Run `npm run compile` and `npm run watch` to verify that `esbuild` is building the project correctly. Open the extension in VS Code to ensure all functionality is still working as expected.

## Rollback Plan

In case of issues, revert the changes to `package.json`, remove `esbuild.mjs`, and uninstall the `esbuild` and `esbuild-tsconfig-paths` dependencies.

```bash
npm uninstall esbuild --save-dev
```
