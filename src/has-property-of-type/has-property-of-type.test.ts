import test from "ava";
import {createPredicate} from "../create-predicate";
import {hasPropertyOfType} from "./has-property-of-type";

test("hasPropertyOfType", t => {
    t.plan(6);

    const object = {
        foo: "fapokfwpa",
        bar: 13,
        baz: undefined,
        fooBar: null,
        "foo-bar": "fapoa"
    };

    t.true(hasPropertyOfType("foo", createPredicate("fapokfwpa", (it: unknown): it is "fapokfwpa" => it === "fapokfwpa"))(object));
    t.true(hasPropertyOfType("bar", createPredicate("13", (it: unknown): it is 13 => it === 13))(object));
    t.true(hasPropertyOfType("baz", createPredicate("undefined", (it: unknown): it is undefined => it === undefined))(object));
    t.true(hasPropertyOfType("fooBar", createPredicate("null", (it: unknown): it is null => it === null))(object));
    t.true(hasPropertyOfType("foo-bar", createPredicate("fapoa", (it: unknown): it is "fapoa" => it === "fapoa"))(object));
    t.false(hasPropertyOfType("bazFoo", createPredicate("undefined", (it: unknown): it is undefined => it === undefined))(object));
});
