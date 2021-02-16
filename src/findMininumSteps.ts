import { nextCostlyPosition } from "./costlyPosition";
import { getSnakeEnd } from "./snake";

export function findMininumNumberOfSteps(
    sourceString: string,
    finalString: string
): number {
    const sourceLength = sourceString.length;
    const finalLength = finalString.length;
    const MAX = sourceLength + finalLength;
    const maximumXInDiagonals: Record<number, number> = {
        1: 0
    };
    for (let stepNumber = 0; stepNumber <= MAX; stepNumber++) {
        for (
            let currentDiagonal = -stepNumber;
            currentDiagonal <= stepNumber;
            currentDiagonal += 2
        ) {
            const nextPosition = nextCostlyPosition({
                currentDiagonal,
                stepNumber,
                maximumXsInAdjacentDiagonalsAtStepBefore: maximumXInDiagonals
            });
            const [x, y] = getSnakeEnd({
                sourceString,
                finalString,
                startingPosition: nextPosition
            });
            maximumXInDiagonals[currentDiagonal] = x;
            if (x >= sourceLength && y >= finalLength) {
                return stepNumber;
            }
        }
    }
    throw new Error("Unable to find minimum length");
}
