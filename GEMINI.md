# Project: String Manipulation for VS Code

## Directory Overview

This directory contains the specifications and development plan for a Visual Studio Code extension that provides string manipulation utilities. The goal is to replicate the core functionality of the popular JetBrains "String Manipulation" plugin.

The project is currently in the planning phase. The `specs` directory outlines the features, architecture, and implementation steps.

## Key Files

The project is defined by the following specification documents:

*   `specs/00_Overview.md`: Provides a high-level summary of the project, its scope (MVP), technical architecture, and development plan.
*   `specs/01_Setup.md`: Details the project initialization steps, including scaffolding with `yo code`, dependency installation (`change-case`), and linter/formatter setup.
*   `specs/02_Casing_Implementation.md`: Describes the implementation plan for case-switching functionality (e.g., camelCase, snake_case, PascalCase).
*   `specs/03_Alignment_Implementation.md`: Outlines the logic for text alignment features, such as aligning cursors vertically and formatting text into columns based on a separator.
*   `specs/04_UI_UX.md`: Defines the user interface and experience, including context menu integration and keybindings.

## Building and Running

The project has not been initialized yet. Based on the specifications, the following commands will be used once the project is set up.

**TODO:** Initialize the project and confirm these commands.

*   **Installation:**
    ```bash
    npm install
    ```
*   **Running the extension (in development):**
    *   Press `F5` in VS Code to open a new Extension Development Host window.
*   **Running tests:**
    ```bash
    npm test
    ```

## Development Conventions

*   **Language:** TypeScript
*   **Code Style:** Prettier and ESLint will be used for code formatting and linting.
*   **Architecture:** The extension will follow a modular controller-service pattern, separating VS Code API interactions from the core string manipulation logic.
*   **Dependencies:** The primary dependency for casing is the `change-case` library.
*   **Contribution:** All commands should be registered in `package.json` under the `String Manipulation` category with a `strmanip.` prefix.
