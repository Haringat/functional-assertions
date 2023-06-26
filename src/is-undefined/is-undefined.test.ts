import test from "ava";
import {isUndefined} from "./is-undefined";

test("is-undefined checks undefined", t => {
    t.plan(1);

    t.true(isUndefined(undefined));
});

test("is-undefined checks null", t => {
    t.plan(1);

    t.false(isUndefined(null));
});

test("is-undefined checks false", t => {
    t.plan(1);

    t.false(isUndefined(false));
});
