import * as vscode from 'vscode';

/**
 * Processes multi-line selection for justification
 */
export async function processJustification(
    editor: vscode.TextEditor,
    justifyFn: (lines: string[]) => string[],
): Promise<void> {
    const selection = editor.selection;
    if (selection.isEmpty) {
        return;
    }

    const selectedText = editor.document.getText(selection);
    const lines = selectedText.split(/\r?\n/);
    const justifiedLines = justifyFn(lines);

    await editor.edit((editBuilder) => {
        editBuilder.replace(selection, justifiedLines.join('\n'));
    });
}
