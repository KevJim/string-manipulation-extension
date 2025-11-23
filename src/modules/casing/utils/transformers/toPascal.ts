import { pascalCase } from 'change-case';

export function toPascal(text: string): string {
    return pascalCase(text);
}
