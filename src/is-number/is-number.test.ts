import test from "ava";
import {isNumber} from "./is-number";

test("is-number checks numbers", t => {
    t.plan(2);

    t.true(isNumber(13));
    t.true(isNumber(0));

});

test("is-number checks bigints", t => {
    t.plan(2);

    t.false(isNumber(13n));
    t.false(isNumber(0n));

});

test("is-number checks null and undefined", t => {
    t.plan(2);

    t.false(isNumber(null));
    t.false(isNumber(undefined));
});
