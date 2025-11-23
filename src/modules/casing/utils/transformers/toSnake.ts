import { snakeCase } from 'change-case';

export function toSnake(text: string): string {
    return snakeCase(text);
}
