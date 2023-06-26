import {createPredicate} from "../create-predicate";
import {ignore, pass} from "../internal/metatest-helpers";
import {and} from "./and";

declare const x: unknown;

function canBeNested() {
    type expected = { foo: number } & { bar: string } & { baz: boolean };

    const hasFoo = createPredicate(
        "{foo: number}",
        (_it: unknown): _it is {foo: number} => true
    );

    const hasBar = createPredicate(
        "{bar: number}",
        (_it: unknown): _it is {bar: string} => true
    );

    const hasBaz = createPredicate(
        "{baz: number}",
        (_it: unknown): _it is {baz: boolean} => true
    );

    const passes = and(and(hasFoo, hasBar), hasBaz);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }
}

function canBePassedMultipleValues() {
    type expected = { foo: number } & { bar: string } & { baz: boolean };

    const hasFoo = createPredicate(
        "{foo: number}",
        (_it: unknown): _it is {foo: number} => true
    );

    const hasBar = createPredicate(
        "{bar: number}",
        (_it: unknown): _it is {bar: string} => true
    );

    const hasBaz = createPredicate(
        "{baz: number}",
        (_it: unknown): _it is {baz: boolean} => true
    );

    const passes = and(hasFoo, hasBar, hasBaz);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }
}

ignore(canBeNested, canBePassedMultipleValues);
