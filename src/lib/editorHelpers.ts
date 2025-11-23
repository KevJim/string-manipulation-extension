import * as vscode from "vscode";

export async function processSelection(
  editor: vscode.TextEditor,
  transform: (text: string) => string,
) {
  await editor.edit((editBuilder) => {
    editor.selections.forEach((selection) => {
      const text = editor.document.getText(selection);
      // If no text selected, select the word under cursor (optional Smart Select)
      if (text.length === 0) {
        // Logic to expand selection to word range
      }

      const newText = transform(text);
      editBuilder.replace(selection, newText);
    });
  });
}
