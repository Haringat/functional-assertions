import test from "ava";
import {createPredicate, typeDescription} from "./create-predicate";

test("createPredicate returns a new function", t => {
    t.plan(1);

    const f = (it: unknown): it is 3 => it === 3;

    const is3 = createPredicate("3", f);

    t.not(f, is3);
});

test("createPredicates returned function is a wrapper around the input predicate", t => {
    t.plan(1);

    const f = (it: unknown): it is 3 => {
        t.pass();
        return it === 3;
    };

    const is3 = createPredicate("3", f);

    is3(3);
});

test("createPredicate adds type description", t => {
    t.plan(2);

    const f = (it: unknown): it is 3 => it === 3;

    const is3 = createPredicate("3", f);

    t.true(is3.hasOwnProperty(typeDescription));
    t.is(is3[typeDescription], "3");
});
