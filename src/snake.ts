import { moveDiagonally, Position } from "./utils";

export function getSnakeEnd(args: {
    sourceString: string;
    finalString: string;
    startingPosition: Position;
}): Position {
    const { sourceString, finalString, startingPosition } = args;
    const rightBorder = sourceString.length;
    const bottomBorder = finalString.length;
    let position: Position = startingPosition;
    while (
        position[0] < rightBorder &&
        position[1] < bottomBorder &&
        sourceString[position[0]] === finalString[position[1]] // we can use the position values since we are looking one index ahead, therefore offsetting the -1 we would have to do in the indexes
    ) {
        position = moveDiagonally(position);
    }
    return position;
}
