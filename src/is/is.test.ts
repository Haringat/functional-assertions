import test from "ava";
import {is} from "./is";

test("is checks same object", t => {
    t.plan(1);

    const o = {
    };

    const isO = is(o);

    t.true(isO(o));
});

test("is does not check deep equality", t => {
    t.plan(1);

    const o1 = {
    };

    const isO1 = is(o1);

    const o2 = {
    };

    t.false(isO1(o2));
});
