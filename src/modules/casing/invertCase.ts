/**
 * Invert Case: Custom logic to invert the case of each character
 * If character is uppercase, make it lowercase; otherwise make it uppercase
 */
export function invertCase(text: string): string {
    return text
        .split('')
        .map((char) => {
            if (char === char.toUpperCase() && char !== char.toLowerCase()) {
                return char.toLowerCase();
            } else if (char === char.toLowerCase() && char !== char.toUpperCase()) {
                return char.toUpperCase();
            }
            // Non-alphabetic characters remain unchanged
            return char;
        })
        .join('');
}
