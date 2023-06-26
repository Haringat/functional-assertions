import test from "ava";
import {isFunction} from "./is-function";

test("is-function checks lambda expressions", t => {
    t.plan(1);

    const lambda1 = () => undefined;

    t.true(isFunction(lambda1));
});

test("is-function checks functions", t => {
    t.plan(1);

    function f() {
    }

    t.true(isFunction(f));
});

test("is-function checks constructed functions", t => {
    t.plan(1);

    // language=JavaScript
    const f = new Function("return undefined;");

    t.true(isFunction(f));
});
