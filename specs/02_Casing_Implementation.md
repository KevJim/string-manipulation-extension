# Phase 2: Module A - Casing Implementation

## Transformer Integration

- Map change-case functions to internal command handlers.
- Implement Invert Case (custom logic: iterate chars, if upper make lower, else upper).

## Toggle Logic

- Implement a `detectCase(text)` function.
- Define a default `cycleOrder` array: `['camelCase', 'snake_case', 'kebab-case', 'PascalCase', 'CONSTANT_CASE']`.
- Implement `toggle()`: Detect current -> Find index in cycle -> Apply next transformation.

## Command Registration

- Register `extension.toCamel`, `extension.toSnake`, `extension.toggleCase`, etc.
