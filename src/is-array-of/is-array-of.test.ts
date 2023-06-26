import test from "ava";
import {createPredicate} from "../create-predicate";
import {isArrayOf} from "./is-array-of";

test("isArrayOf", t => {
    t.plan(1);

    const array = [0, 0, 0];

    const isZero = createPredicate("0", (it: unknown): it is 0 => it === 0);

    t.true(isArrayOf(isZero)(array));
});
