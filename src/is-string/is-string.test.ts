import test from "ava";
import {isString} from "./is-string";

test("is-string checks empty strings", t => {
    t.plan(1);

    t.true(isString(""));

});

test("is-string checks non-empty strings", t => {
    t.plan(1);

    t.true(isString("foo"));

});

test("is-string checks null and undefined", t => {
    t.plan(2);

    t.false(isString(null));
    t.false(isString(undefined));

});
