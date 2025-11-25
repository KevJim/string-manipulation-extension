import { getMaxLineWidth } from 'src/modules/alignment/utils/getMaxLineWidth';

/**
 * Center justifies text within available space
 */
export function justifyCenter(lines: string[]): string[] {
    const maxWidth = getMaxLineWidth(lines);
    return lines.map((line) => {
        const padding = maxWidth - line.length;
        const leftPadding = Math.floor(padding / 2);
        const rightPadding = padding - leftPadding;
        return ' '.repeat(leftPadding) + line + ' '.repeat(rightPadding);
    });
}
