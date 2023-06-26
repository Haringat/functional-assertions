import test from "ava";
import {isInstanceOf} from "./is-instance-of";

test("isInstanceOf", t => {
    t.plan(4);

    const array: Array<unknown> = [];
    const object = {};
    class OwnClass {}
    const instanceOfOwnClass = new OwnClass();

    const isArray = isInstanceOf(Array);
    const isObject = isInstanceOf(Object);
    const isOwnClass = isInstanceOf(OwnClass);

    t.true(isArray(array));
    t.true(isObject(object));
    t.true(isOwnClass(instanceOfOwnClass));
    t.false(isOwnClass(object));
});
