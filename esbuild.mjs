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

if (watch) {
    esbuild
        .context(baseConfig)
        .then((context) => {
            context.watch();
            console.log('esbuild is watching for changes...');
        })
        .catch(() => process.exit(1));
} else {
    esbuild.build(baseConfig).catch(() => process.exit(1));
}
