import test from "ava";
import {isNever} from "./is-never";

test("is never true",  t => {

    t.plan(2);

    t.false(isNever(undefined));
    t.false(isNever(null));

});
