import {ignore, pass} from "../internal/metatest-helpers";
import {isArray} from "./is-array";

declare const x: unknown;

function checksArray() {

    type expected = Array<unknown>;

    const passes = isArray;

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

ignore(checksArray);
