import * as vscode from 'vscode';
import { processSelection } from 'src/lib/editorHelpers';
import { alignColumns } from 'src/modules/alignment/alignColumns';
import { alignVertical } from 'src/modules/alignment/alignVertical';
import { justifyCenter } from 'src/modules/alignment/utils/justifyCenter';
import { justifyLeft } from 'src/modules/alignment/utils/justifyLeft';
import { justifyRight } from 'src/modules/alignment/utils/justifyRight';
import { processJustification } from 'src/modules/alignment/utils/processJustification';
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

    // Register alignment commands
    const alignVerticalDisposable = vscode.commands.registerCommand(
        'strmanip.alignVertical',
        async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                return;
            }
            await alignVertical(editor);
        },
    );
    context.subscriptions.push(alignVerticalDisposable);

    const alignColumnsDisposable = vscode.commands.registerCommand(
        'strmanip.alignColumns',
        async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                return;
            }
            await alignColumns(editor);
        },
    );
    context.subscriptions.push(alignColumnsDisposable);

    const justifyLeftDisposable = vscode.commands.registerCommand(
        'strmanip.justifyLeft',
        async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                return;
            }
            await processJustification(editor, justifyLeft);
        },
    );
    context.subscriptions.push(justifyLeftDisposable);

    const justifyCenterDisposable = vscode.commands.registerCommand(
        'strmanip.justifyCenter',
        async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                return;
            }
            await processJustification(editor, justifyCenter);
        },
    );
    context.subscriptions.push(justifyCenterDisposable);

    const justifyRightDisposable = vscode.commands.registerCommand(
        'strmanip.justifyRight',
        async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                return;
            }
            await processJustification(editor, justifyRight);
        },
    );
    context.subscriptions.push(justifyRightDisposable);

    // Register Quick Pick menu command
    const showQuickPickDisposable = vscode.commands.registerCommand(
        'strmanip.showQuickPick',
        async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showWarningMessage(
                    'No active editor found. Please open a file first.',
                );
                return;
            }

            // Define Quick Pick items organized by category
            const quickPickItems: vscode.QuickPickItem[] = [
                // Casing category header
                {
                    label: '$(symbol-text) Casing',
                    kind: vscode.QuickPickItemKind.Separator,
                },
                {
                    label: 'To camelCase',
                    detail: 'strmanip.toCamel',
                },
                {
                    label: 'To snake_case',
                    detail: 'strmanip.toSnake',
                },
                {
                    label: 'To kebab-case',
                    detail: 'strmanip.toKebab',
                },
                {
                    label: 'To PascalCase',
                    detail: 'strmanip.toPascal',
                },
                {
                    label: 'To SCREAMING_SNAKE_CASE',
                    detail: 'strmanip.toConstant',
                },
                {
                    label: 'To dot.case',
                    detail: 'strmanip.toDot',
                },
                {
                    label: 'To Title Case',
                    detail: 'strmanip.toTitle',
                },
                {
                    label: 'To Sentence case',
                    detail: 'strmanip.toSentence',
                },
                {
                    label: 'To UPPER CASE',
                    detail: 'strmanip.toUpper',
                },
                {
                    label: 'To lower case',
                    detail: 'strmanip.toLower',
                },
                {
                    label: 'Invert Case',
                    detail: 'strmanip.invertCase',
                },
                {
                    label: 'Toggle Case',
                    detail: 'strmanip.toggleCase',
                },
                // Alignment category header
                {
                    label: '$(align-left) Alignment',
                    kind: vscode.QuickPickItemKind.Separator,
                },
                {
                    label: 'Align Carets Vertically',
                    detail: 'strmanip.alignVertical',
                },
                {
                    label: 'Align to Columns (Separator)',
                    detail: 'strmanip.alignColumns',
                },
                {
                    label: 'Justify Left',
                    detail: 'strmanip.justifyLeft',
                },
                {
                    label: 'Justify Center',
                    detail: 'strmanip.justifyCenter',
                },
                {
                    label: 'Justify Right',
                    detail: 'strmanip.justifyRight',
                },
            ];

            // Show Quick Pick and execute selected command
            const selected = await vscode.window.showQuickPick(quickPickItems, {
                placeHolder: 'Select a String Manipulation command',
                matchOnDetail: true,
            });

            if (selected && selected.detail) {
                // Execute the selected command
                await vscode.commands.executeCommand(selected.detail);
            }
        },
    );
    context.subscriptions.push(showQuickPickDisposable);
}

export function deactivate() {}
