import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Sample test', () => {
        assert.strictEqual(-1, [1, 2, 3].indexOf(5));
        assert.strictEqual(-1, [1, 2, 3].indexOf(0));
    });

    test('Extension should be activated', async () => {
        const packageJsonPath = path.join(__dirname, '../../../../package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        const extensionId = `${packageJson.publisher}.${packageJson.name}`;
        const extension = vscode.extensions.getExtension(extensionId);
        assert.ok(extension);
    });
});
