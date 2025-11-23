import { detectCase } from 'src/modules/casing/detectCase';
import { transformToCase } from 'src/modules/casing/transformToCase';
import { CaseType, CaseTypes } from 'src/types/CaseType';

/**
 * Default cycle order for toggle functionality
 */
export const cycleOrder: CaseType[] = [
    CaseTypes.camelCase,
    CaseTypes.snake_case,
    CaseTypes['kebab-case'],
    CaseTypes.PascalCase,
    CaseTypes.CONSTANT_CASE,
];

/**
 * Toggles the case of the given text to the next case in the cycle
 * If current case is not detected or not in cycle, starts from the first case in cycle
 */
export function toggle(text: string): string {
    const detectedCase = detectCase(text);

    if (!detectedCase) {
        // If no case detected, default to first case in cycle
        return transformToCase(text, cycleOrder[0]);
    }

    const currentIndex = cycleOrder.indexOf(detectedCase);
    if (currentIndex === -1) {
        // If detected case is not in cycle, default to first case
        return transformToCase(text, cycleOrder[0]);
    }

    // Get next case in cycle (wrap around)
    const nextIndex = (currentIndex + 1) % cycleOrder.length;
    const nextCase = cycleOrder[nextIndex];

    return transformToCase(text, nextCase);
}
