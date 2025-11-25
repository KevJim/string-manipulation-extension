import { getMaxLineWidth } from 'src/modules/alignment/utils/getMaxLineWidth';

/**
 * Right justifies text within available space
 */
export function justifyRight(lines: string[]): string[] {
    const maxWidth = getMaxLineWidth(lines);
    return lines.map((line) => {
        const padding = maxWidth - line.length;
        return ' '.repeat(padding) + line;
    });
}
