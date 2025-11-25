import * as vscode from 'vscode';

/**
 * Aligns all active cursor positions vertically by inserting spaces
 * Calculates the maximum column index and inserts spaces to align all cursors
 */
export async function alignVertical(editor: vscode.TextEditor): Promise<void> {
    const selections = editor.selections;
    if (selections.length < 2) {
        // Need at least 2 cursors to align
        return;
    }

    // Calculate maximum column index among all cursors
    let maxColumn = 0;
    const positions: Array<{ line: number; column: number }> = [];

    selections.forEach((selection) => {
        const position = selection.active;
        const column = position.character;
        positions.push({ line: position.line, column });
        if (column > maxColumn) {
            maxColumn = column;
        }
    });

    // Insert spaces to align all cursors
    // Process in reverse order (bottom to top, right to left) to avoid position shifts
    await editor.edit((editBuilder) => {
        positions
            .sort((a, b) => {
                // Sort by line (descending), then by column (descending)
                if (b.line !== a.line) {
                    return b.line - a.line;
                }
                return b.column - a.column;
            })
            .forEach(({ line, column }) => {
                const spacesToInsert = maxColumn - column;
                if (spacesToInsert > 0) {
                    const position = new vscode.Position(line, column);
                    editBuilder.insert(position, ' '.repeat(spacesToInsert));
                }
            });
    });
}
