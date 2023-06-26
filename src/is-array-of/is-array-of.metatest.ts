import {createPredicate} from "../create-predicate";
import {ignore, pass} from "../internal/metatest-helpers";
import {isArrayOf} from "./is-array-of";

declare const x: unknown;

function checksSingleType() {

    type expected = Array<"foo">;

    const passes = isArrayOf(createPredicate("foo", (it: unknown): it is "foo" => it === "foo"));

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

ignore(checksSingleType);
