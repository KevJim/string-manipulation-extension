/**
 * Calculates the maximum width among all selected lines
 */
export function getMaxLineWidth(lines: string[]): number {
    return Math.max(...lines.map((line) => line.length), 0);
}
