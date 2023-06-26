import test from "ava";
import {isArrayLike} from "./is-array-like";

test("works with array-like plain objects of length 0", t => {
    t.plan(1);

    t.true(isArrayLike({length: 0}));
});

test("works with array-like plain objects of higher length", t => {
    t.plan(1);

    t.true(isArrayLike({length: 1, 1: true}));
});

test("works with plain objects with excess properties", t => {
    t.plan(1);

    t.true(isArrayLike({length: 0, foo: "bar"}));
});

test("works with plain objects with missing array entries", t => {
    t.plan(1);

    t.true(isArrayLike({length: 4}));
});

test("works with array instances", t => {
    t.plan(1);

    t.true(isArrayLike([1, 2, 3]));
});
