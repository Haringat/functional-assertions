import {createPredicate} from "../create-predicate";
import {ignore, pass} from "../internal/metatest-helpers";
import {or} from "./or";

declare const x: unknown;

function canBeNested() {
    type expected = { foo: number } | { bar: number } | { baz: number };

    const hasFoo = createPredicate(
        "{foo: number}",
        (_it: unknown): _it is {foo: number} => true
    );

    const hasBar = createPredicate(
        "{bar: number}",
        (_it: unknown): _it is {bar: number} => true
    );

    const hasBaz = createPredicate(
        "{baz: number}",
        (_it: unknown): _it is {baz: number} => true
    );

    const passes = or(or(hasFoo, hasBar), hasBaz);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }
}

function canBePassedMultipleValues() {
    type expected = { foo: number } | { bar: number } | { baz: number };

    const hasFoo = createPredicate(
        "{foo: number}",
        (_it: unknown): _it is {foo: number} => true
    );

    const hasBar = createPredicate(
        "{bar: number}",
        (_it: unknown): _it is {bar: number} => true
    );

    const hasBaz = createPredicate(
        "{baz: number}",
        (_it: unknown): _it is {baz: number} => true
    );

    const passes = or(hasFoo, hasBar, hasBaz);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }
}

ignore(canBeNested, canBePassedMultipleValues);
