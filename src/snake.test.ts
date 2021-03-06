import { getSnakeEnd } from "./snake";
import type { Position } from "./utils";

// TODO? non BMP unicode

test("getSnakeEnd should return the end position when source string and final string are equal", () => {
    const sourceString = "abc";
    const finalString = "abc";
    const origin: Position = [0, 0];
    const expectedPosition: Position = [3, 3];

    const calculatedPosition: Position = getSnakeEnd({
        sourceString,
        finalString,
        startingPosition: origin
    });
    expect(calculatedPosition).toEqual(expectedPosition);
});

test("getSnakeEnd should be able to move diagonally more than once whenever starting from the origin and there is more than one sequential match", () => {
    const sourceString = "aabc";
    const finalString = "aadc";
    const origin: Position = [0, 0];
    const twoDiagonalsFromOrigin: Position = [2, 2];

    const calculatedPosition = getSnakeEnd({
        sourceString,
        finalString,
        startingPosition: origin
    });
    expect(calculatedPosition).toEqual(twoDiagonalsFromOrigin);
});

test("getSnakeEnd should return the origin when starting from origin and no match is possible", () => {
    const sourceString = "ABCABBA";
    const finalString = "CBABAC";
    const origin: Position = [0, 0];

    const snakeEnd = getSnakeEnd({
        sourceString,
        finalString,
        startingPosition: origin
    });
    expect(snakeEnd).toEqual(origin);
});

test("getSnakeEnd should stop whenever it hits the right border of the edit graph", () => {
    const sourceString = "ABCABBA";
    const finalString = "CBABAC";
    const rightBorder = sourceString.length;
    const oneBeforeRightBorder = rightBorder - 1;
    const yPositionBeforeAnAInFinal = 2;
    const startingPosition: Position = [
        oneBeforeRightBorder,
        yPositionBeforeAnAInFinal
    ];
    const expectedPosition: Position = [
        rightBorder,
        yPositionBeforeAnAInFinal + 1
    ];

    const calculatedPosition: Position = getSnakeEnd({
        sourceString,
        finalString,
        startingPosition
    });
    expect(calculatedPosition).toEqual(expectedPosition);
});

test("getSnakeEnd should stop whenever it hits the bottom border of the edit graph", () => {
    const sourceString = "ABCABBA";
    const finalString = "CBABAC";
    const bottomBorder = finalString.length;
    const oneBeforeBottomBorder = bottomBorder - 1;
    const xPositionBeforeACInSource = 2;
    const startingPosition: Position = [
        xPositionBeforeACInSource,
        oneBeforeBottomBorder
    ];
    const expectedPosition: Position = [
        xPositionBeforeACInSource + 1,
        bottomBorder
    ];

    const calculatedPosition: Position = getSnakeEnd({
        sourceString,
        finalString,
        startingPosition
    });
    expect(calculatedPosition).toEqual(expectedPosition);
});

test("getSnakeEnd should return the startingPosition whenever the characters after the startingPosition aren't equal", () => {
    const sourceString = "ABCABBA";
    const finalString = "CBABAC";
    const startingPosition: Position = [3, 1];

    const snakeEnd: Position = getSnakeEnd({
        sourceString,
        finalString,
        startingPosition
    });
    expect(snakeEnd).toEqual(startingPosition);
});

test("getSnakeEnd should be able to move diagonally just once whenever there is just one sequential match", () => {
    const sourceString = "ABCABBA";
    const finalString = "CBABAC";
    const startingPosition: Position = [4, 1];
    const oneDiagonalFromStartingPosition: Position = [
        startingPosition[0] + 1,
        startingPosition[1] + 1
    ];

    const snakeEnd: Position = getSnakeEnd({
        sourceString,
        finalString,
        startingPosition
    });
    expect(snakeEnd).toEqual(oneDiagonalFromStartingPosition);
});

test("getSnakeEnd should be able to move diagonally more than once whenever there is more than one sequential match", () => {
    const sourceString = "ABCABBA";
    const finalString = "CBABAC";
    const startingPosition: Position = [3, 2];
    const twoDiagonalsFromStartingPosition: Position = [
        startingPosition[0] + 2,
        startingPosition[1] + 2
    ];

    const snakeEnd = getSnakeEnd({
        sourceString,
        finalString,
        startingPosition
    });
    expect(snakeEnd).toEqual(twoDiagonalsFromStartingPosition);
});

test("getSnakeEnd should be able to match BMP unicode characters", () => {
    const sourceString = "ABCA\u03A9BA";
    const finalString = "C\u03A9ABAC";
    const startingPosition: Position = [4, 1];
    const oneDiagonalFromStartingPosition: Position = [
        startingPosition[0] + 1,
        startingPosition[1] + 1
    ];

    const snakeEnd = getSnakeEnd({
        sourceString,
        finalString,
        startingPosition
    });
    expect(snakeEnd).toEqual(oneDiagonalFromStartingPosition);
});
