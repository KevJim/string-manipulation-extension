# Project: String Manipulation for VS Code (MVP)

## Executive Summary

This project aims to port the core functionality of the JetBrains "String Manipulation" plugin to Visual Studio Code. The initial version (MVP) will focus on the two most critical features: Case Switching (Camel, Snake, Kebab, etc.) and Text Alignment (Vertical alignment, Columns).

## Scope of Work (MVP)

### Module A: Casing

- The extension must handle single and multi-cursor selections to perform the following transformations:

  **Standard Switches:**

  - To camelCase
  - To snake_case
  - To kebab-case
  - To PascalCase
  - To SCREAMING_SNAKE_CASE
  - To dot.case
  - To Title Case (Capitalized Words)
  - To Sentence case (First word capitalized)

  **Toggle Mechanism:**

  A "Toggle Case" command that cycles through styles (e.g., camel -> snake -> kebab -> camel).

  **Standard Format:**

  - To UPPER CASE
  - To lower case
  - Invert Case

### Module D: Alignment

- **Align Carets**: Align multiple cursors into a vertical line by inserting spaces.
- **Align by Separator**: Format selected lines into columns based on a delimiter (e.g., splitting CSV-like data into a readable table).
- **Justification**: Align text to Left / Center / Right.

## 3. Technical Architecture

### 3.1 Directory Structure

We will use a modular controller-service pattern to keep logic separate from VS Code specific APIs.

```
src/
├── extension.ts // Main entry point, registers commands
├── lib/
│ └── editorHelpers.ts // Utilities for reading/replacing selections
├── modules/
│ ├── casing/
│ │ ├── index.ts // Facade for casing commands
│ │ ├── transformers.ts // Pure string transformation logic
│ │ └── toggler.ts // Logic for determining next case in cycle
│ └── alignment/
│ ├── index.ts // Facade for alignment commands
│ └── aligner.ts // Logic for calculating padding/columns
└── test/ // Unit tests
```

### 3.2 Dependencies

- **change-case**: A robust npm package to handle most string casing logic (camel, snake, param/kebab, constant/screaming, dot, path, sentence, title).
- **wcwidth** (Optional): To handle East Asian width characters correctly during alignment, though standard .length may suffice for MVP.

## 4. Development Plan

### Phase 1: Project Initialization

- Generate project using yo code (TypeScript).
- Install dependencies: `npm install change-case`.
- Configure package.json categories and activation events.

### Phase 2: Module A - Casing Implementation

**Transformer Integration:**

- Map change-case functions to internal command handlers.
- Implement Invert Case (custom logic: iterate chars, if upper make lower, else upper).

**Toggle Logic:**

- Implement a `detectCase(text)` function.
- Define a default `cycleOrder` array: `['camelCase', 'snake_case', 'kebab-case', 'PascalCase', 'CONSTANT_CASE']`.
- Implement `toggle()`: Detect current -> Find index in cycle -> Apply next transformation.

**Command Registration:**

- Register `extension.toCamel`, `extension.toSnake`, `extension.toggleCase`, etc.

### Phase 3: Module D - Alignment Implementation

**Align to Carets (Vertical Alignment):**

**Logic:**

- Get all active cursor positions.
- Calculate the maximum column index among all cursors.
- Insert (max - current) spaces at each cursor position.

**Align by Separator (Table Format):**

**Logic:**

- Prompt user for separator (Input Box) or detect common ones (`:`, `,`, `=`).
- Split selected lines by separator.
- Calculate max width for each "column" across all lines.
- Rebuild strings padding each cell to match column width.

### Phase 4: UI & UX

- **Context Menu**: Add a "String Manipulation" submenu to the editor context menu.
  - Group 1: Casing
  - Group 2: Alignment
- **Keybindings**: Bind `Alt+M` (Windows/Linux) or `Cmd+Alt+M` (Mac) to show a Quick Pick menu containing all extension commands.

## 5. Technical Reference & Snippets

### 5.1 Casing Command Helper

This generic handler ensures we support multi-cursor editing easily.

```typescript
import * as vscode from "vscode";

export async function processSelection(
  editor: vscode.TextEditor,
  transform: (text: string) => string
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
```

### 5.2 Alignment Logic (Align By Separator)

Concept for the column alignment algorithm:

```typescript
export function alignBySeparator(lines: string[], separator: string): string[] {
  // 1. Parse lines into tokens
  const rows = lines.map((line) => line.split(separator).map((t) => t.trim()));

  // 2. Find max width per column
  const colWidths: number[] = [];
  rows.forEach((row) => {
    row.forEach((cell, colIndex) => {
      const len = cell.length;
      if (!colWidths[colIndex] || len > colWidths[colIndex]) {
        colWidths[colIndex] = len;
      }
    });
  });

  // 3. Pad and Reconstruct
  return rows.map((row) => {
    return row
      .map((cell, colIndex) => {
        // Don't pad the very last column to avoid trailing whitespace
        if (colIndex === row.length - 1) return cell;
        return cell.padEnd(colWidths[colIndex]);
      })
      .join(separator + " "); // Add 1 space padding for readability
  });
}
```

## 6. Package.json Contributions

The package.json will need extensive command definitions.

```json
"contributes": {
    "commands": [
        { "command": "strmanip.toCamel", "title": "To camelCase", "category": "String Manipulation" },
        { "command": "strmanip.toSnake", "title": "To snake_case", "category": "String Manipulation" },
        { "command": "strmanip.alignVertical", "title": "Align Carets Vertically", "category": "String Manipulation" },
        { "command": "strmanip.alignColumns", "title": "Align to Columns (Separator)", "category": "String Manipulation" }
    ],
    "menus": {
        "editor/context": [
            {
                "submenu": "strmanip.menu",
                "group": "modification"
            }
        ],
        "strmanip.menu": [
            { "command": "strmanip.toCamel" },
            { "command": "strmanip.toSnake" },
            { "command": "strmanip.alignVertical", "group": "alignment" }
        ]
    }
}
```
