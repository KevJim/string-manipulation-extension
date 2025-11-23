export const CaseTypes = {
    'camelCase': 'camelCase',
    'snake_case': 'snake_case',
    'kebab-case': 'kebab-case',
    'PascalCase': 'PascalCase',
    'CONSTANT_CASE': 'CONSTANT_CASE',
} as const;

export type CaseType = (typeof CaseTypes)[keyof typeof CaseTypes];
