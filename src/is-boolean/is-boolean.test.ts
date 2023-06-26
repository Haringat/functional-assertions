import test from "ava";
import {isBoolean} from "./is-boolean";

test("is-boolean checks booleans", t => {
    t.plan(2);

    t.true(isBoolean(true));
    t.true(isBoolean(false));
});

test("is-boolean checks null and undefined", t => {
    t.plan(2);

    t.false(isBoolean(null));
    t.false(isBoolean(undefined));
});
