/**
 * Aligns lines by separator into columns
 * @param lines Array of lines to align
 * @param separator Separator character to split by
 * @returns Array of aligned lines
 */
export function alignBySeparator(lines: string[], separator: string): string[] {
    // 1. Parse lines into tokens (trim whitespace from each cell)
    const rows = lines.map((line) => line.split(separator).map((t) => t.trim()));

    // 2. Find max width per column
    const colWidths: number[] = [];
    rows.forEach((row) => {
        row.forEach((cell, colIndex) => {
            const len = cell.length;
            if (!colWidths[colIndex] || len > colWidths[colIndex]) {
                colWidths[colIndex] = len;
            }
        });
    });

    // 3. Pad and Reconstruct
    return rows.map((row) => {
        return row
            .map((cell, colIndex) => {
                // Don't pad the very last column to avoid trailing whitespace
                if (colIndex === row.length - 1) {
                    return cell;
                }
                return cell.padEnd(colWidths[colIndex]);
            })
            .join(separator + ' '); // Add 1 space padding after separator for readability
    });
}
