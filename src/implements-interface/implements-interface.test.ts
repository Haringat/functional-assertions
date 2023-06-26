import test from "ava";
import {createPredicate} from "../create-predicate";
import {implementsInterface, isOptional} from "./implements-interface";

test("implements-interface works on simple object types", t => {
    t.plan(1);

    const isTrue = createPredicate("true", (it: unknown): it is true => it === true);

    const isMyObject = implementsInterface<{foo: true}>({
        foo: isTrue
    });

    t.true(isMyObject({
        foo: true
    }));

});

test("implements-interface fails when properties are missing or have incorrect values", t => {
    t.plan(4);

    const isTrue = createPredicate("true", (it: unknown): it is true => it === true);

    const isMyObject = implementsInterface({
        foo: isTrue
    });

    t.false(isMyObject({
    }));
    t.false(isMyObject({
        bar: true
    }));
    t.false(isMyObject({
        foo: false
    }));
    t.true(isMyObject({
        foo: true
    }));
});

test("implements-interface works on empty object types", t => {
    t.plan(4);

    const isEmptyObject = implementsInterface({});

    t.true(isEmptyObject({}));
    t.true(isEmptyObject({
        foo: true
    }));
    t.false(isEmptyObject(null));
    t.false(isEmptyObject(undefined));

});

test("implements-interface does not fail on excess properties", t => {
    t.plan(1);

    const isTrue = createPredicate("true", (it: unknown): it is true => it === true);

    const isMyObject = implementsInterface({
        foo: isTrue
    });

    t.true(isMyObject({
        foo: true,
        bar: true
    }));
});

test("implements-interface accepts symbols as keys", t => {
    t.plan(2);

    const mySymbol = Symbol.for("foo");

    const isTrue = createPredicate("true", (it: unknown): it is true => it === true);

    const isMyObject = implementsInterface({
        [mySymbol]: isTrue
    });

    t.true(isMyObject({
        [mySymbol]: true
    }));
    t.false(isMyObject({
    }));

});

test("implements-interface works on optional properties", t => {
    t.plan(2);

    const isTrue = createPredicate("true", (it: unknown): it is true => it === true);
    const isFalse = createPredicate("false", (it: unknown): it is false => it === false);

    const isMyObject = implementsInterface({
        foo: isTrue,
        bar: isOptional(isFalse)
    });

    t.true(isMyObject({
        foo: true
    }));
    t.true(isMyObject({
        foo: true,
        bar: false
    }));
});
