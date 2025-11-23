# Phase 3: Module D - Alignment Implementation

## Align to Carets (Vertical Alignment)

### Logic

- Get all active cursor positions.
- Calculate the maximum column index among all cursors.
- Insert (max - current) spaces at each cursor position.

### Implementation Notes

- Support multi-cursor selections.
- Handle edge cases where cursors are at different line positions.
- Ensure non-destructive alignment (preserve existing text).

## Align by Separator (Table Format)

### Logic

- Prompt user for separator (Input Box) or detect common ones (`:`, `,`, `=`).
- Split selected lines by separator.
- Calculate max width for each "column" across all lines.
- Rebuild strings padding each cell to match column width.
- Add 1 space padding after separator for readability.
- Don't pad the very last column to avoid trailing whitespace.

### Implementation Details

- Trim whitespace from each cell before processing.
- Handle rows with different numbers of columns gracefully.
- Preserve empty cells if they exist in the original data.

## Justification

- **Left Justify**: Align text to the left (default behavior).
- **Center Justify**: Center text within available space.
- **Right Justify**: Align text to the right.

### Implementation Notes

- Calculate available width based on longest line or user-selected width.
- Apply justification to all selected lines.
- Support multi-line selections.

## Command Registration

- Register `strmanip.alignVertical` for vertical caret alignment.
- Register `strmanip.alignColumns` for separator-based column alignment.
- Register `strmanip.justifyLeft`, `strmanip.justifyCenter`, `strmanip.justifyRight` for text justification.
