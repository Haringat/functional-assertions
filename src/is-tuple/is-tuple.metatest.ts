import {createPredicate} from "../create-predicate";
import {ignore, pass} from "../internal/metatest-helpers";
import {isTuple} from "./is-tuple";

declare const x: unknown;

function worksWithArity0() {
    type expected = [];

    const passes = isTuple();

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

function worksWithArity1() {
    type expected = [1];

    const is1 = createPredicate("1", (it: unknown): it is 1 => it === 1);

    const passes = isTuple(is1);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

function worksWithArity2() {
    type expected = [1, 2];

    const is1 = createPredicate("1", (it: unknown): it is 1 => it === 1);
    const is2 = createPredicate("2", (it: unknown): it is 2 => it === 2);

    const passes = isTuple(is1, is2);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

function worksWithArity3() {
    type expected = [1, 2, 3];

    const is1 = createPredicate("1", (it: unknown): it is 1 => it === 1);
    const is2 = createPredicate("2", (it: unknown): it is 2 => it === 2);
    const is3 = createPredicate("3", (it: unknown): it is 3 => it === 3);

    const passes = isTuple(is1, is2, is3);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

function worksWithArity4() {
    type expected = [1, 2, 3, 4];

    const is1 = createPredicate("1", (it: unknown): it is 1 => it === 1);
    const is2 = createPredicate("2", (it: unknown): it is 2 => it === 2);
    const is3 = createPredicate("3", (it: unknown): it is 3 => it === 3);
    const is4 = createPredicate("4", (it: unknown): it is 4 => it === 4);

    const passes = isTuple(is1, is2, is3, is4);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

function worksWithArity5() {
    type expected = [1, 2, 3, 4, 5];

    const is1 = createPredicate("1", (it: unknown): it is 1 => it === 1);
    const is2 = createPredicate("2", (it: unknown): it is 2 => it === 2);
    const is3 = createPredicate("3", (it: unknown): it is 3 => it === 3);
    const is4 = createPredicate("4", (it: unknown): it is 4 => it === 4);
    const is5 = createPredicate("5", (it: unknown): it is 5 => it === 5);

    const passes = isTuple(is1, is2, is3, is4, is5);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

function worksWithArity6() {
    type expected = [1, 2, 3, 4, 5, 6];

    const is1 = createPredicate("1", (it: unknown): it is 1 => it === 1);
    const is2 = createPredicate("2", (it: unknown): it is 2 => it === 2);
    const is3 = createPredicate("3", (it: unknown): it is 3 => it === 3);
    const is4 = createPredicate("4", (it: unknown): it is 4 => it === 4);
    const is5 = createPredicate("5", (it: unknown): it is 5 => it === 5);
    const is6 = createPredicate("6", (it: unknown): it is 6 => it === 6);

    const passes = isTuple(is1, is2, is3, is4, is5, is6);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

function worksWithArity7() {
    type expected = [1, 2, 3, 4, 5, 6, 7];

    const is1 = createPredicate("1", (it: unknown): it is 1 => it === 1);
    const is2 = createPredicate("2", (it: unknown): it is 2 => it === 2);
    const is3 = createPredicate("3", (it: unknown): it is 3 => it === 3);
    const is4 = createPredicate("4", (it: unknown): it is 4 => it === 4);
    const is5 = createPredicate("5", (it: unknown): it is 5 => it === 5);
    const is6 = createPredicate("6", (it: unknown): it is 6 => it === 6);
    const is7 = createPredicate("7", (it: unknown): it is 7 => it === 7);

    const passes = isTuple(is1, is2, is3, is4, is5, is6, is7);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

function worksWithArity8() {
    type expected = [1, 2, 3, 4, 5, 6, 7, 8];

    const is1 = createPredicate("1", (it: unknown): it is 1 => it === 1);
    const is2 = createPredicate("2", (it: unknown): it is 2 => it === 2);
    const is3 = createPredicate("3", (it: unknown): it is 3 => it === 3);
    const is4 = createPredicate("4", (it: unknown): it is 4 => it === 4);
    const is5 = createPredicate("5", (it: unknown): it is 5 => it === 5);
    const is6 = createPredicate("6", (it: unknown): it is 6 => it === 6);
    const is7 = createPredicate("7", (it: unknown): it is 7 => it === 7);
    const is8 = createPredicate("8", (it: unknown): it is 8 => it === 8);

    const passes = isTuple(is1, is2, is3, is4, is5, is6, is7, is8);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

function worksWithArity9() {
    type expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const is1 = createPredicate("1", (it: unknown): it is 1 => it === 1);
    const is2 = createPredicate("2", (it: unknown): it is 2 => it === 2);
    const is3 = createPredicate("3", (it: unknown): it is 3 => it === 3);
    const is4 = createPredicate("4", (it: unknown): it is 4 => it === 4);
    const is5 = createPredicate("5", (it: unknown): it is 5 => it === 5);
    const is6 = createPredicate("6", (it: unknown): it is 6 => it === 6);
    const is7 = createPredicate("7", (it: unknown): it is 7 => it === 7);
    const is8 = createPredicate("8", (it: unknown): it is 8 => it === 8);
    const is9 = createPredicate("9", (it: unknown): it is 9 => it === 9);

    const passes = isTuple(is1, is2, is3, is4, is5, is6, is7, is8, is9);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

function worksWithArity10() {
    type expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const is1 = createPredicate("1", (it: unknown): it is 1 => it === 1);
    const is2 = createPredicate("2", (it: unknown): it is 2 => it === 2);
    const is3 = createPredicate("3", (it: unknown): it is 3 => it === 3);
    const is4 = createPredicate("4", (it: unknown): it is 4 => it === 4);
    const is5 = createPredicate("5", (it: unknown): it is 5 => it === 5);
    const is6 = createPredicate("6", (it: unknown): it is 6 => it === 6);
    const is7 = createPredicate("7", (it: unknown): it is 7 => it === 7);
    const is8 = createPredicate("8", (it: unknown): it is 8 => it === 8);
    const is9 = createPredicate("9", (it: unknown): it is 9 => it === 9);
    const is10 = createPredicate("10", (it: unknown): it is 10 => it === 10);

    const passes = isTuple(is1, is2, is3, is4, is5, is6, is7, is8, is9, is10);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

function worksWithArity11() {
    type expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    const is1 = createPredicate("1", (it: unknown): it is 1 => it === 1);
    const is2 = createPredicate("2", (it: unknown): it is 2 => it === 2);
    const is3 = createPredicate("3", (it: unknown): it is 3 => it === 3);
    const is4 = createPredicate("4", (it: unknown): it is 4 => it === 4);
    const is5 = createPredicate("5", (it: unknown): it is 5 => it === 5);
    const is6 = createPredicate("6", (it: unknown): it is 6 => it === 6);
    const is7 = createPredicate("7", (it: unknown): it is 7 => it === 7);
    const is8 = createPredicate("8", (it: unknown): it is 8 => it === 8);
    const is9 = createPredicate("9", (it: unknown): it is 9 => it === 9);
    const is10 = createPredicate("10", (it: unknown): it is 10 => it === 10);
    const is11 = createPredicate("11", (it: unknown): it is 11 => it === 11);

    const passes = isTuple(is1, is2, is3, is4, is5, is6, is7, is8, is9, is10, is11);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

function worksWithArity12() {
    type expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const is1 = createPredicate("1", (it: unknown): it is 1 => it === 1);
    const is2 = createPredicate("2", (it: unknown): it is 2 => it === 2);
    const is3 = createPredicate("3", (it: unknown): it is 3 => it === 3);
    const is4 = createPredicate("4", (it: unknown): it is 4 => it === 4);
    const is5 = createPredicate("5", (it: unknown): it is 5 => it === 5);
    const is6 = createPredicate("6", (it: unknown): it is 6 => it === 6);
    const is7 = createPredicate("7", (it: unknown): it is 7 => it === 7);
    const is8 = createPredicate("8", (it: unknown): it is 8 => it === 8);
    const is9 = createPredicate("9", (it: unknown): it is 9 => it === 9);
    const is10 = createPredicate("10", (it: unknown): it is 10 => it === 10);
    const is11 = createPredicate("11", (it: unknown): it is 11 => it === 11);
    const is12 = createPredicate("12", (it: unknown): it is 12 => it === 12);

    const passes = isTuple(is1, is2, is3, is4, is5, is6, is7, is8, is9, is10, is11, is12);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

function worksWithArity13() {
    type expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    const is1 = createPredicate("1", (it: unknown): it is 1 => it === 1);
    const is2 = createPredicate("2", (it: unknown): it is 2 => it === 2);
    const is3 = createPredicate("3", (it: unknown): it is 3 => it === 3);
    const is4 = createPredicate("4", (it: unknown): it is 4 => it === 4);
    const is5 = createPredicate("5", (it: unknown): it is 5 => it === 5);
    const is6 = createPredicate("6", (it: unknown): it is 6 => it === 6);
    const is7 = createPredicate("7", (it: unknown): it is 7 => it === 7);
    const is8 = createPredicate("8", (it: unknown): it is 8 => it === 8);
    const is9 = createPredicate("9", (it: unknown): it is 9 => it === 9);
    const is10 = createPredicate("10", (it: unknown): it is 10 => it === 10);
    const is11 = createPredicate("11", (it: unknown): it is 11 => it === 11);
    const is12 = createPredicate("12", (it: unknown): it is 12 => it === 12);
    const is13 = createPredicate("13", (it: unknown): it is 13 => it === 13);

    const passes = isTuple(is1, is2, is3, is4, is5, is6, is7, is8, is9, is10, is11, is12, is13);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

function worksWithArity14() {
    type expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    const is1 = createPredicate("1", (it: unknown): it is 1 => it === 1);
    const is2 = createPredicate("2", (it: unknown): it is 2 => it === 2);
    const is3 = createPredicate("3", (it: unknown): it is 3 => it === 3);
    const is4 = createPredicate("4", (it: unknown): it is 4 => it === 4);
    const is5 = createPredicate("5", (it: unknown): it is 5 => it === 5);
    const is6 = createPredicate("6", (it: unknown): it is 6 => it === 6);
    const is7 = createPredicate("7", (it: unknown): it is 7 => it === 7);
    const is8 = createPredicate("8", (it: unknown): it is 8 => it === 8);
    const is9 = createPredicate("9", (it: unknown): it is 9 => it === 9);
    const is10 = createPredicate("10", (it: unknown): it is 10 => it === 10);
    const is11 = createPredicate("11", (it: unknown): it is 11 => it === 11);
    const is12 = createPredicate("12", (it: unknown): it is 12 => it === 12);
    const is13 = createPredicate("13", (it: unknown): it is 13 => it === 13);
    const is14 = createPredicate("14", (it: unknown): it is 14 => it === 14);

    const passes = isTuple(is1, is2, is3, is4, is5, is6, is7, is8, is9, is10, is11, is12, is13, is14);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

function worksWithArity15() {
    type expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    const is1 = createPredicate("1", (it: unknown): it is 1 => it === 1);
    const is2 = createPredicate("2", (it: unknown): it is 2 => it === 2);
    const is3 = createPredicate("3", (it: unknown): it is 3 => it === 3);
    const is4 = createPredicate("4", (it: unknown): it is 4 => it === 4);
    const is5 = createPredicate("5", (it: unknown): it is 5 => it === 5);
    const is6 = createPredicate("6", (it: unknown): it is 6 => it === 6);
    const is7 = createPredicate("7", (it: unknown): it is 7 => it === 7);
    const is8 = createPredicate("8", (it: unknown): it is 8 => it === 8);
    const is9 = createPredicate("9", (it: unknown): it is 9 => it === 9);
    const is10 = createPredicate("10", (it: unknown): it is 10 => it === 10);
    const is11 = createPredicate("11", (it: unknown): it is 11 => it === 11);
    const is12 = createPredicate("12", (it: unknown): it is 12 => it === 12);
    const is13 = createPredicate("13", (it: unknown): it is 13 => it === 13);
    const is14 = createPredicate("14", (it: unknown): it is 14 => it === 14);
    const is15 = createPredicate("15", (it: unknown): it is 15 => it === 15);

    const passes = isTuple(is1, is2, is3, is4, is5, is6, is7, is8, is9, is10, is11, is12, is13, is14, is15);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

function worksWithArity16() {
    type expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    const is1 = createPredicate("1", (it: unknown): it is 1 => it === 1);
    const is2 = createPredicate("2", (it: unknown): it is 2 => it === 2);
    const is3 = createPredicate("3", (it: unknown): it is 3 => it === 3);
    const is4 = createPredicate("4", (it: unknown): it is 4 => it === 4);
    const is5 = createPredicate("5", (it: unknown): it is 5 => it === 5);
    const is6 = createPredicate("6", (it: unknown): it is 6 => it === 6);
    const is7 = createPredicate("7", (it: unknown): it is 7 => it === 7);
    const is8 = createPredicate("8", (it: unknown): it is 8 => it === 8);
    const is9 = createPredicate("9", (it: unknown): it is 9 => it === 9);
    const is10 = createPredicate("10", (it: unknown): it is 10 => it === 10);
    const is11 = createPredicate("11", (it: unknown): it is 11 => it === 11);
    const is12 = createPredicate("12", (it: unknown): it is 12 => it === 12);
    const is13 = createPredicate("13", (it: unknown): it is 13 => it === 13);
    const is14 = createPredicate("14", (it: unknown): it is 14 => it === 14);
    const is15 = createPredicate("15", (it: unknown): it is 15 => it === 15);
    const is16 = createPredicate("16", (it: unknown): it is 16 => it === 16);

    const passes = isTuple(is1, is2, is3, is4, is5, is6, is7, is8, is9, is10, is11, is12, is13, is14, is15, is16);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

ignore(
    worksWithArity0,
    worksWithArity1,
    worksWithArity2,
    worksWithArity3,
    worksWithArity4,
    worksWithArity5,
    worksWithArity6,
    worksWithArity7,
    worksWithArity8,
    worksWithArity9,
    worksWithArity10,
    worksWithArity11,
    worksWithArity12,
    worksWithArity13,
    worksWithArity14,
    worksWithArity15,
    worksWithArity16
);
