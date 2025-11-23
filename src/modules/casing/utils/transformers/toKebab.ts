import { paramCase } from 'change-case';

export function toKebab(text: string): string {
    return paramCase(text);
}
