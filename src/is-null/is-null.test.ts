import test from "ava";
import {isNull} from "./is-null";

test("is-null checks null", t => {
    t.plan(1);

    t.true(isNull(null));
});

test("is-null checks undefined", t => {
    t.plan(1);

    t.false(isNull(undefined));
});

test("is-null checks false", t => {
    t.plan(1);

    t.false(isNull(false));
});
