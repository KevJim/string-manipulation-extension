import * as vscode from 'vscode';

export async function processSelection(
    editor: vscode.TextEditor,
    transform: (text: string) => string,
) {
    await editor.edit((editBuilder) => {
        editor.selections.forEach((selection) => {
            let text = editor.document.getText(selection);
            let range: vscode.Range = selection;

            // If no text selected, select the word under cursor
            if (text.length === 0) {
                const wordRange = editor.document.getWordRangeAtPosition(selection.active);
                if (wordRange) {
                    text = editor.document.getText(wordRange);
                    range = wordRange;
                } else {
                    // If no word found, skip this selection
                    return;
                }
            }

            const newText = transform(text);
            if (newText !== text) {
                editBuilder.replace(range, newText);
            }
        });
    });
}
