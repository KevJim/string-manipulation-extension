import { dotCase } from 'change-case';

export function toDot(text: string): string {
    return dotCase(text);
}
