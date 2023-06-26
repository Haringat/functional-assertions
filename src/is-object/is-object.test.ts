import test from "ava";
import {isObject} from "./is-object";

test("is-object checks plain objects", t => {
    t.plan(2);

    t.true(isObject({}));
    t.true(isObject({
                        foo: "bar"
                    }));
});

test("is-object checks null", t => {
    t.plan(1);

    t.true(isObject(null));
});

test("is-object checks undefined", t => {
    t.plan(1);

    t.false(isObject(undefined));
});
