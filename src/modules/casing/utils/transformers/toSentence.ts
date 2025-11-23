import { sentenceCase } from 'change-case';

export function toSentence(text: string): string {
    return sentenceCase(text);
}
