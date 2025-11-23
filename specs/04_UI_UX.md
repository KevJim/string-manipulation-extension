# Phase 4: UI & UX

## Context Menu Integration

Add a "String Manipulation" submenu to the editor context menu with organized groupings.

### Structure

- **Group 1: Casing**

  - To camelCase
  - To snake_case
  - To kebab-case
  - To PascalCase
  - To SCREAMING_SNAKE_CASE
  - To dot.case
  - To Title Case
  - To Sentence case
  - To UPPER CASE
  - To lower case
  - Invert Case
  - Toggle Case

- **Group 2: Alignment**
  - Align Carets Vertically
  - Align to Columns (Separator)
  - Justify Left
  - Justify Center
  - Justify Right

### Implementation

- Configure `contributes.menus.editor/context` with submenu reference.
- Create submenu definition in `contributes.submenus`.
- Group related commands logically using the `group` property.

## Keybindings

Bind `Alt+M` (Windows/Linux) or `Cmd+Alt+M` (Mac) to show a Quick Pick menu containing all extension commands.

### Implementation Details

- Create a command that displays a Quick Pick (`vscode.window.showQuickPick`) with all available commands.
- Organize commands by category (Casing, Alignment) in the Quick Pick.
- Support keyboard navigation and filtering.
- Execute the selected command upon user choice.

### Keybinding Configuration

- Configure in `contributes.keybindings` section of package.json.
- Use `key` for Windows/Linux: `alt+m`
- Use `key` for Mac: `cmd+alt+m`
- Set appropriate `when` clause to enable only in editor context.

## Command Organization

### Package.json Structure

- All commands should be categorized under "String Manipulation" category.
- Use consistent naming convention: `strmanip.<commandName>`.
- Provide clear, descriptive titles for each command.

### Quick Pick Categories

When displaying commands in Quick Pick:

- Group by functionality (Casing vs Alignment).
- Use icons or separators to visually distinguish groups.
- Include keyboard shortcuts in descriptions where applicable.
