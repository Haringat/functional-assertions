import test from "ava";
import {and} from "../and/and";
import {createPredicate} from "../create-predicate";
import {not} from "./not";

test("not inverts predicate", t => {
    t.plan(3);

    const isNotNull = not(createPredicate("null", (it: unknown): it is null => it === null));

    t.true(isNotNull("foobar"));
    t.false(isNotNull(null));
    t.true(isNotNull(undefined));
});

test("not is composable", t => {
    t.plan(3);

    const isNotNullAndNotUndefined = and(
        not(createPredicate("null", (it: unknown): it is null => it === null)),
        not(createPredicate("undefined", (it: unknown): it is undefined => it === undefined))
    );

    t.true(isNotNullAndNotUndefined("foobar"));
    t.false(isNotNullAndNotUndefined(null));
    t.false(isNotNullAndNotUndefined(undefined));

});
