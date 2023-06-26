import test from "ava";
import {assert} from "./assert";
import {IPredicate, typeDescription} from "./create-predicate";

test("assert fails with correct message if the value does not pass the predicate", t => {
    t.plan(1);

    function predicateFunction (_it: unknown): _it is never {
        return false;
    }
    const p = predicateFunction as IPredicate<never>;
    p[typeDescription] = "never";

    t.throws(
        () => {
            assert(undefined, p);
        },
        {
            message: `Expected undefined to be never`
        }
    );
});

test("assert passes if the value does pass the predicate", t => {
    t.plan(1);

    function predicateFunction (_it: unknown): _it is unknown {
        return true;
    }
    const p = predicateFunction as IPredicate<unknown>;
    p[typeDescription] = "unknown";

    t.notThrows(() => {
        assert(undefined, p);
    });
});
