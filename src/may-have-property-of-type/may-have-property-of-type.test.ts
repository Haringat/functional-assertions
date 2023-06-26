import test from "ava";
import {createPredicate} from "../create-predicate";
import {mayHavePropertyOfType} from "./may-have-property-of-type";

test("may-have-property-of-type passes if the property is not there at all", t => {
    t.plan(1);

    const objectWithoutFoo = {
    };

    t.true(mayHavePropertyOfType("foo", createPredicate("null", (it: unknown): it is null => it === null))(objectWithoutFoo));
});

test("may-have-property-of-type fails if the property is there but has wrong type", t => {
    t.plan(1);

    const objectWithWrongFoo = {
        foo: 3
    };

    t.false(mayHavePropertyOfType("foo", createPredicate("null", (it: unknown): it is null => it === null))(objectWithWrongFoo));
});

test("may-have-property-of-type checks if the property exists at all", t => {
    t.plan(1);

    const objectWithCorrectFoo = {
        foo: null
    };

    t.true(mayHavePropertyOfType("foo", createPredicate("null", (it: unknown): it is null => it === null))(objectWithCorrectFoo));
});
