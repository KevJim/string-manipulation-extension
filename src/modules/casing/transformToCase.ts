import { camelCase, constantCase, paramCase, pascalCase, snakeCase } from 'change-case';
import { CaseType, CaseTypes } from 'src/types/CaseType';

/**
 * Transforms text to the specified case type
 */
export function transformToCase(text: string, caseType: CaseType): string {
    switch (caseType) {
        case CaseTypes.camelCase:
            return camelCase(text);

        case CaseTypes.snake_case:
            return snakeCase(text);

        case CaseTypes['kebab-case']:
            return paramCase(text);

        case CaseTypes.PascalCase:
            return pascalCase(text);

        case CaseTypes.CONSTANT_CASE:
            return constantCase(text);

        default:
            return text;
    }
}
