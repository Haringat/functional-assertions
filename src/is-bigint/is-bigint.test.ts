import test from "ava";
import {isBigint} from "./is-bigint";

test("is-bigint checks bigints", t => {
    t.plan(2);

    t.true(isBigint(13n));
    t.true(isBigint(0n));
});

test("is-bigint checks numbers", t => {
    t.plan(2);

    t.false(isBigint(13));
    t.false(isBigint(0));
});

test("is-bigint checks null and undefined", t => {
    t.plan(2);

    t.false(isBigint(null));
    t.false(isBigint(undefined));
});
