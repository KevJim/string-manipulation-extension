import * as vscode from 'vscode';
import { processSelection } from 'src/lib/editorHelpers';
import { invertCase } from 'src/modules/casing/invertCase';
import { toggle } from 'src/modules/casing/toggler';
import { toCamel } from 'src/modules/casing/utils/transformers/toCamel';
import { toConstant } from 'src/modules/casing/utils/transformers/toConstant';
import { toDot } from 'src/modules/casing/utils/transformers/toDot';
import { toKebab } from 'src/modules/casing/utils/transformers/toKebab';
import { toLower } from 'src/modules/casing/utils/transformers/toLower';
import { toPascal } from 'src/modules/casing/utils/transformers/toPascal';
import { toSentence } from 'src/modules/casing/utils/transformers/toSentence';
import { toSnake } from 'src/modules/casing/utils/transformers/toSnake';
import { toTitle } from 'src/modules/casing/utils/transformers/toTitle';
import { toUpper } from 'src/modules/casing/utils/transformers/toUpper';

export function activate(context: vscode.ExtensionContext) {
    console.log('String Manipulation extension is now active');

    // Register casing commands
    const casingCommands = [
        { command: 'strmanip.toCamel', handler: toCamel },
        { command: 'strmanip.toSnake', handler: toSnake },
        { command: 'strmanip.toKebab', handler: toKebab },
        { command: 'strmanip.toPascal', handler: toPascal },
        { command: 'strmanip.toConstant', handler: toConstant },
        { command: 'strmanip.toDot', handler: toDot },
        { command: 'strmanip.toTitle', handler: toTitle },
        { command: 'strmanip.toSentence', handler: toSentence },
        { command: 'strmanip.toUpper', handler: toUpper },
        { command: 'strmanip.toLower', handler: toLower },
        { command: 'strmanip.invertCase', handler: invertCase },
        { command: 'strmanip.toggleCase', handler: toggle },
    ];

    casingCommands.forEach(({ command, handler }) => {
        const disposable = vscode.commands.registerCommand(command, async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                return;
            }

            await processSelection(editor, handler);
        });

        context.subscriptions.push(disposable);
    });
}

export function deactivate() {}
