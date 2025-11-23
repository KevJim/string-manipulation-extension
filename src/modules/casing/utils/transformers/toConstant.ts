import { constantCase } from 'change-case';

export function toConstant(text: string): string {
    return constantCase(text);
}
