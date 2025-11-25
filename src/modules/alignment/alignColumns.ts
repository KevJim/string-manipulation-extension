import * as vscode from 'vscode';
import { alignBySeparator } from 'src/modules/alignment/alignBySeparator';

/**
 * Aligns selected lines by separator into columns
 * Prompts user for separator or detects common ones
 */
export async function alignColumns(editor: vscode.TextEditor, separator?: string): Promise<void> {
    const selection = editor.selection;
    if (selection.isEmpty) {
        return;
    }

    const selectedText = editor.document.getText(selection);
    const lines = selectedText.split(/\r?\n/);

    // If separator not provided, prompt user or detect common ones
    let finalSeparator = separator;
    if (!finalSeparator) {
        // Try to detect common separators
        const commonSeparators = [':', ',', '=', '|', ';'];
        let detectedSeparator: string | undefined;

        for (const sep of commonSeparators) {
            if (lines.some((line) => line.includes(sep))) {
                detectedSeparator = sep;
                break;
            }
        }

        if (detectedSeparator) {
            // Ask user to confirm or provide custom separator
            const input = await vscode.window.showInputBox({
                prompt: 'Enter separator (or press Enter to use detected)',
                value: detectedSeparator,
                placeHolder: 'Separator character',
            });

            if (input === undefined) {
                // User cancelled
                return;
            }

            finalSeparator = input || detectedSeparator;
        } else {
            // No separator detected, ask user
            const input = await vscode.window.showInputBox({
                prompt: 'Enter separator character',
                placeHolder: 'e.g., : , = |',
            });

            if (!input) {
                // User cancelled or didn't provide separator
                return;
            }

            finalSeparator = input;
        }
    }

    // Align the lines
    const alignedLines = alignBySeparator(lines, finalSeparator);

    // Replace the selection with aligned text
    await editor.edit((editBuilder) => {
        editBuilder.replace(selection, alignedLines.join('\n'));
    });
}
