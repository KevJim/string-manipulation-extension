import { camelCase } from 'change-case';

export function toCamel(text: string): string {
    return camelCase(text);
}
