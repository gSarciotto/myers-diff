import { nextCostlyPosition } from "./costlyPosition";
import { Position } from "./utils";

test("nextCostlyPosition should be a deletion from the diagonal above current diagonal whenever current diagonal === -stepNumber", () => {
    const stepNumber = 2;
    const currentDiagonal = -stepNumber;
    const diagonalAbove = currentDiagonal + 1;
    const maximumXsInAdjacentDiagonalsAtStepBefore: Record<number, number> = {
        "-1": 0
    };
    const moveOrigin: Position = [
        maximumXsInAdjacentDiagonalsAtStepBefore[diagonalAbove],
        maximumXsInAdjacentDiagonalsAtStepBefore[diagonalAbove] - diagonalAbove
    ];
    const oneBelowMoveOrigin: Position = [moveOrigin[0], moveOrigin[1] + 1];

    const calculatedPosition = nextCostlyPosition({
        stepNumber,
        currentDiagonal,
        maximumXsInAdjacentDiagonalsAtStepBefore
    });
    expect(calculatedPosition).toEqual(oneBelowMoveOrigin);
});

test("nextCostlyPosition should be a deletion from the diagonal above current diagonal whenever current diagonal != stepNumber and maxX[current diagonal - 1] < maxX[current diagonal + 1]", () => {
    const stepNumber = 3;
    const currentDiagonal = 1;
    const diagonalAbove = currentDiagonal + 1;
    const maximumXsInAdjacentDiagonalsAtStepBefore: Record<number, number> = {
        0: 2,
        2: 3
    };
    const moveOrigin: Position = [
        maximumXsInAdjacentDiagonalsAtStepBefore[diagonalAbove],
        maximumXsInAdjacentDiagonalsAtStepBefore[diagonalAbove] - diagonalAbove
    ];
    const oneBelowMoveOrigin: Position = [moveOrigin[0], moveOrigin[1] + 1];

    const calculatedPosition = nextCostlyPosition({
        stepNumber,
        currentDiagonal,
        maximumXsInAdjacentDiagonalsAtStepBefore
    });
    expect(calculatedPosition).toEqual(oneBelowMoveOrigin);
});

test("nextCostlyPosition should be an insertion from the diagonal below current diagonal whenever current diagonal === stepNumber", () => {
    const stepNumber = 3;
    const currentDiagonal = 3;
    const diagonalBelow = currentDiagonal - 1;
    const maximumXsInAdjacentDiagonalsAtStepBefore: Record<number, number> = {
        2: 3
    };
    const moveOrigin: Position = [
        maximumXsInAdjacentDiagonalsAtStepBefore[diagonalBelow],
        maximumXsInAdjacentDiagonalsAtStepBefore[diagonalBelow] - diagonalBelow
    ];
    const rightOfMoveOrigin: Position = [moveOrigin[0] + 1, moveOrigin[1]];

    const calculatedPosition = nextCostlyPosition({
        stepNumber,
        currentDiagonal,
        maximumXsInAdjacentDiagonalsAtStepBefore
    });
    expect(calculatedPosition).toEqual(rightOfMoveOrigin);
});

test("nextCostlyPosition should be an insertion from the diagonal below current diagonal whenever current diagonal != stepNumber and maxX[current diagonal - 1] >= maxX[current diagonal + 1]", () => {
    const stepNumber = 3;
    const currentDiagonal = -1;
    const diagonalBelow = currentDiagonal - 1;
    const maximumXsInAdjacentDiagonalsAtStepBefore: Record<number, number> = {
        "-2": 2,
        0: 2
    };
    const moveOrigin: Position = [
        maximumXsInAdjacentDiagonalsAtStepBefore[diagonalBelow],
        maximumXsInAdjacentDiagonalsAtStepBefore[diagonalBelow] - diagonalBelow
    ];
    const rightOfMoveOrigin: Position = [moveOrigin[0] + 1, moveOrigin[1]];

    const calculatedPosition = nextCostlyPosition({
        stepNumber,
        currentDiagonal,
        maximumXsInAdjacentDiagonalsAtStepBefore
    });
    expect(calculatedPosition).toEqual(rightOfMoveOrigin);
});

test("nextCostlyPosition may be a virtual position outside of the graph", () => {
    const stepNumber = 4;
    const currentDiagonal = -4;
    const diagonalAbove = currentDiagonal + 1;
    const maximumXsInAdjacentDiagonalsAtStepBefore: Record<number, number> = {
        "-3": 3
    };
    const moveOrigin: Position = [
        maximumXsInAdjacentDiagonalsAtStepBefore[diagonalAbove],
        maximumXsInAdjacentDiagonalsAtStepBefore[diagonalAbove] - diagonalAbove
    ];
    const oneBelowMoveOrigin: Position = [moveOrigin[0], moveOrigin[1] + 1];

    const calculatedPosition = nextCostlyPosition({
        stepNumber,
        currentDiagonal,
        maximumXsInAdjacentDiagonalsAtStepBefore
    });
    expect(calculatedPosition).toEqual(oneBelowMoveOrigin);
});

test("nextCostlyPosition should throw error MissingMaximumX whenever you dont pass the above diagonal maximum whenever diagonal === -stepNumber", () => {
    const stepNumber = 2;
    const currentDiagonal = -stepNumber;
    const maximumXsInAdjacentDiagonalsAtStepBefore: Record<number, number> = {};

    expect(() =>
        nextCostlyPosition({
            stepNumber,
            currentDiagonal,
            maximumXsInAdjacentDiagonalsAtStepBefore
        })
    ).toThrow(
        `Missing maximum x value at previous step. Current step: ${stepNumber} Current diagonal: ${currentDiagonal} Missing diagonals: ${
            currentDiagonal + 1
        }`
    );
});

test("nextCostlyPosition should throw error MissingMaximumX whenever you dont pass either the above or below diagonal maximuns whenever diagonal != stepNumber and diagonal != -stepNumber", () => {
    const stepNumber = 3;
    const currentDiagonal = 1;
    const maximumXsInAdjacentDiagonalsAtStepBefore: Record<number, number> = {};

    expect(() =>
        nextCostlyPosition({
            stepNumber,
            currentDiagonal,
            maximumXsInAdjacentDiagonalsAtStepBefore
        })
    ).toThrow(
        `Missing maximum x value at previous step. Current step: ${stepNumber} Current diagonal: ${currentDiagonal} Missing diagonals: ${
            currentDiagonal - 1
        }, ${currentDiagonal + 1}`
    );
});

test("nextCostlyPosition should throw error MissingMaximumX whenever you dont pass the below diagonal maximum whenever diagonal != -stepNumber and diagonal === stepNumber or maxX[current diagonal - 1] >= maxX[current diagonal + 1]", () => {
    const stepNumber = 3;
    const currentDiagonal = -1;
    const maximumXsInAdjacentDiagonalsAtStepBefore: Record<number, number> = {};

    expect(() =>
        nextCostlyPosition({
            stepNumber,
            currentDiagonal,
            maximumXsInAdjacentDiagonalsAtStepBefore
        })
    ).toThrow(
        `Missing maximum x value at previous step. Current step: ${stepNumber} Current diagonal: ${currentDiagonal} Missing diagonals: ${
            currentDiagonal - 1
        }`
    );
});

test("nextCostlyPosition should throw error MissingMaximumX whenever you dont pass the below diagonal maximum whenever diagonal === stepNumber", () => {
    const stepNumber = 3;
    const currentDiagonal = 3;
    const maximumXsInAdjacentDiagonalsAtStepBefore: Record<number, number> = {};

    expect(() =>
        nextCostlyPosition({
            stepNumber,
            currentDiagonal,
            maximumXsInAdjacentDiagonalsAtStepBefore
        })
    ).toThrow(
        `Missing maximum x value at previous step. Current step: ${stepNumber} Current diagonal: ${currentDiagonal} Missing diagonals: ${
            currentDiagonal - 1
        }`
    );
});
