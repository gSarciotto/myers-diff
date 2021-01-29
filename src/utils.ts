export type Position = [number, number];

export function moveDiagonally(position: Position): Position {
    return [position[0] + 1, position[1] + 1];
}
