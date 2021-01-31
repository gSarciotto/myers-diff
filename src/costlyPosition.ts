import { Position } from "./utils";
import { MissingMaximumX } from "./errors";

export function nextCostlyPosition(args: {
    currentDiagonal: number;
    stepNumber: number;
    maximumXsInAdjacentDiagonalsAtStepBefore: Record<number, number>;
}): Position {
    const {
        currentDiagonal,
        stepNumber,
        maximumXsInAdjacentDiagonalsAtStepBefore
    } = args;
    const diagonalBelow = currentDiagonal - 1;
    const diagonalAbove = currentDiagonal + 1;
    let x: number;
    if (currentDiagonal === -stepNumber) {
        if (
            maximumXsInAdjacentDiagonalsAtStepBefore[diagonalAbove] ===
            undefined
        ) {
            throw new MissingMaximumX({
                diagonalsNotProvided: [diagonalAbove],
                stepNumber,
                currentDiagonal
            });
        }
        x = maximumXsInAdjacentDiagonalsAtStepBefore[diagonalAbove];
    } else {
        if (currentDiagonal !== stepNumber) {
            const missingDiagonals = [diagonalBelow, diagonalAbove].filter(
                (diagonal) =>
                    maximumXsInAdjacentDiagonalsAtStepBefore[diagonal] ===
                    undefined
            );
            if (missingDiagonals.length) {
                throw new MissingMaximumX({
                    diagonalsNotProvided: missingDiagonals,
                    stepNumber,
                    currentDiagonal
                });
            }
            if (
                maximumXsInAdjacentDiagonalsAtStepBefore[diagonalBelow] <
                maximumXsInAdjacentDiagonalsAtStepBefore[diagonalAbove]
            ) {
                x = maximumXsInAdjacentDiagonalsAtStepBefore[diagonalAbove];
            } else {
                x = maximumXsInAdjacentDiagonalsAtStepBefore[diagonalBelow] + 1;
            }
        } else {
            if (
                maximumXsInAdjacentDiagonalsAtStepBefore[diagonalBelow] ===
                undefined
            ) {
                throw new MissingMaximumX({
                    diagonalsNotProvided: [diagonalBelow],
                    stepNumber,
                    currentDiagonal
                });
            }
            x = maximumXsInAdjacentDiagonalsAtStepBefore[diagonalBelow] + 1;
        }
    }
    const y = x - currentDiagonal;
    return [x, y];
}
