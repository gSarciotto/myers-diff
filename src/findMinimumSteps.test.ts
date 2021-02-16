import { findMininumNumberOfSteps } from "./findMininumSteps";

test("minimum number of steps should be 0 whenever source and final are equal", () => {
    const source = "abcde";
    const final = "abcde";

    const result = findMininumNumberOfSteps(source, final);
    expect(result).toBe(0);
});

test("minimum number of steps should be the length of source whenever final is empty", () => {
    const source = "abcde";
    const final = "";

    const result = findMininumNumberOfSteps(source, final);
    expect(result).toBe(source.length);
});

test("minimum number of steps should be the length of final whenever source is empty", () => {
    const source = "";
    const final = "abcde";

    const result = findMininumNumberOfSteps(source, final);
    expect(result).toBe(final.length);
});

test("minimum number of steps should be 5 with the paper examples", () => {
    const source = "ABCABBA";
    const final = "CBABAC";

    const result = findMininumNumberOfSteps(source, final);
    expect(result).toBe(5);
});
