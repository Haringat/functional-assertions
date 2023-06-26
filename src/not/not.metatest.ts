import type {IPredicate} from "../create-predicate";
import {ignore, pass, skip} from "../internal/metatest-helpers";
import {not} from "./not";

declare const x: "foo" | "bar";

declare const predicate: IPredicate<"foo">;

function checksStringExclusion() {

    type expected = "bar";

    const passes = not(predicate);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

declare const x2: "foo";

function checksAllStringsExcluded() {

    type expected = never;

    const passes = not(predicate);

    if (passes(x2)) {
        // TODO: find out why pass and fail both evaluate to never here
        const result: skip<typeof x2, expected> = true;
        ignore(result);
    }

}

declare function and<T1, T2>(predicate1: IPredicate<T1>, predicate2: IPredicate<T2>): IPredicate<T1 & T2>;
declare const isNull: IPredicate<null>;
declare const isUndefined: IPredicate<undefined>;

declare const x3: "foo" | null | undefined;

function isComposable() {

    type expected = "foo";

    const passes = and(not(isNull), not(isUndefined));

    if (passes(x3)) {
        const result: pass<typeof x3, expected> = true;
        ignore(result);
    }

}

ignore(checksStringExclusion, checksAllStringsExcluded, isComposable);
