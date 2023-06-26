import test from "ava";
import {hasProperty} from "./has-property";

test("hasProperty", t => {
    t.plan(6);

    const object = {
        foo: "fapokfwpa",
        bar: 13,
        baz: undefined,
        fooBar: null,
        "foo-bar": "fapoa"
    };

    t.true(hasProperty("foo")(object));
    t.true(hasProperty("bar")(object));
    t.true(hasProperty("baz")(object));
    t.true(hasProperty("fooBar")(object));
    t.true(hasProperty("foo-bar")(object));
    t.false(hasProperty("bazFoo")(object));
});
