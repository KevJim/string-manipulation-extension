import { capitalCase } from 'change-case';

export function toTitle(text: string): string {
    return capitalCase(text);
}
