import { execSync } from 'child_process';
import * as esbuild from 'esbuild';
import { resolve } from 'path';

const watch = process.argv.includes('--watch');

const baseConfig = {
    entryPoints: ['src/extension.ts'],
    bundle: true,
    outdir: 'out',
    external: ['vscode'], // Mark vscode as external, it's provided by the VS Code runtime
    format: 'cjs', // CommonJS format for Node.js environment
    platform: 'node', // Target Node.js environment
    sourcemap: true, // Generate sourcemaps for debugging
    plugins: [
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
    ], // Handle TypeScript path aliases
};

// Compile test files with tsc
function compileTests() {
    try {
        execSync('tsc -p tsconfig.test.json', { stdio: 'inherit' });
    } catch (error) {
        console.error('Test compilation failed');
        process.exit(1);
    }
}

if (watch) {
    // Compile tests first
    compileTests();
    esbuild
        .context(baseConfig)
        .then((context) => {
            context.watch();
            console.log('esbuild is watching for changes...');
        })
        .catch(() => process.exit(1));
} else {
    compileTests();
    esbuild.build(baseConfig).catch(() => process.exit(1));
}
