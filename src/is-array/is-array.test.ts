import test from "ava";
import {isArray} from "./is-array";

test("is-array checks Arrays", t => {
    t.plan(2);

    t.true(isArray([]));
    t.true(isArray([1, "faoj"]));
});

test("is-array checks Array-like objects", t => {
    t.plan(1);

    const arrayLike = {
        length: 3,
        0: "foo",
        1: "bar",
        2: "baz"
    };

    Object.defineProperties(
        Object.getPrototypeOf(arrayLike),
        Object.getOwnPropertyDescriptors(Array.prototype as Array<unknown>) as unknown as PropertyDescriptorMap
    );
    Object.getPrototypeOf(arrayLike).constructor = Object;

    t.false(isArray(arrayLike));
});
