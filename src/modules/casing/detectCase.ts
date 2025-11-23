import { camelCase, constantCase, paramCase, pascalCase, snakeCase } from 'change-case';
import { CaseType, CaseTypes } from 'src/types/CaseType';

/**
 * Detects the case type of a given text string
 * Returns the detected case type or null if no match
 */
export function detectCase(text: string | undefined | null): CaseType | null {
    if (!text) return null;

    if (text.trim().length === 0) return null;

    // Normalize the text to check against expected patterns
    const normalizedCamel = camelCase(text);
    const normalizedSnake = snakeCase(text);
    const normalizedKebab = paramCase(text);
    const normalizedPascal = pascalCase(text);
    const normalizedConstant = constantCase(text);

    // Check CONSTANT_CASE: all uppercase with underscores
    if (text === normalizedConstant && text === text.toUpperCase()) {
        return CaseTypes.CONSTANT_CASE;
    }

    // Check PascalCase: starts with uppercase, matches pascalCase normalization
    if (text === normalizedPascal && /^[A-Z]/.test(text)) {
        return CaseTypes.PascalCase;
    }

    // Check camelCase: starts with lowercase, matches camelCase normalization
    if (text === normalizedCamel && /^[a-z]/.test(text)) {
        return CaseTypes.camelCase;
    }

    // Check snake_case: lowercase with underscores, matches snakeCase normalization
    if (text === normalizedSnake && text.includes('_')) {
        return CaseTypes.snake_case;
    }

    // Check kebab-case: lowercase with hyphens, matches kebabCase normalization
    if (text === normalizedKebab && text.includes('-')) {
        return CaseTypes['kebab-case'];
    }

    // If no match found, return null
    return null;
}
