export class MissingMaximumX extends Error {
    readonly missingDiagonals: number[];
    readonly stepNumber: number;
    readonly currentDiagonal: number;

    constructor(args: {
        diagonalsNotProvided: number[];
        stepNumber: number;
        currentDiagonal: number;
    }) {
        const { diagonalsNotProvided, stepNumber, currentDiagonal } = args;
        const mappedMissingDiagonals: string = diagonalsNotProvided.join(", ");
        super(
            `Missing maximum x value at previous step. Current step: ${stepNumber} Current diagonal: ${currentDiagonal} Missing diagonals: ${mappedMissingDiagonals}`
        );

        this.missingDiagonals = diagonalsNotProvided;
        this.stepNumber = stepNumber;
        this.currentDiagonal = currentDiagonal;
    }
}
