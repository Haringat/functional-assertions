import test from "ava";
import {createPredicate} from "../create-predicate";
import {isTuple} from "./is-tuple";

test("is-tuple works with 0 arguments", (t) => {
    t.plan(4);
    const isTuple0 = isTuple();

    t.true(isTuple0([]));
    t.false(isTuple0([1]));
    t.false(isTuple0([null]));
    t.false(isTuple0([undefined]));
});

test("is-tuple works with 1 argument", (t) => {
    t.plan(11);

    const isOne = createPredicate("1", (it: unknown): it is 1 => it === 1);

    const isTuple1 = isTuple(isOne);

    t.true(isTuple1([1]));
    t.false(isTuple1([]));
    t.false(isTuple1([1, 1]));
    t.false(isTuple1([1, null]));
    t.false(isTuple1([1, undefined]));
    t.false(isTuple1([2]));
    t.false(isTuple1([null]));
    t.false(isTuple1([undefined]));

    const isUndefined = createPredicate("undefined", (it: unknown): it is undefined => it === undefined);

    const isTuple1Undefined = isTuple(isUndefined);

    t.true(isTuple1Undefined([undefined]));
    t.false(isTuple1Undefined([]));
    t.false(isTuple1Undefined([null]));
});

test("is-tuple works with 2 arguments", (t) => {
    t.plan(13);

    const isOne = createPredicate("1", (it: unknown): it is 1 => it === 1);
    const isTwo = createPredicate("2", (it: unknown): it is 2 => it === 2);

    const isTuple2 = isTuple(isOne, isTwo);

    t.true(isTuple2([1, 2]));
    t.false(isTuple2([1]));
    t.false(isTuple2([1, null]));
    t.false(isTuple2([1, undefined]));
    t.false(isTuple2([undefined, 2]));
    t.false(isTuple2([null, 2]));
    t.false(isTuple2([1, 1]));
    t.false(isTuple2([1, 2, null]));
    t.false(isTuple2([1, 2, undefined]));
    t.false(isTuple2([1, 2, 2]));
    t.false(isTuple2([1, 2, 1]));
    t.false(isTuple2([1, 2, 3]));
    t.false(isTuple2([]));
});
