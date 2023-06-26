import {ignore, pass} from "../internal/metatest-helpers";
import {isNever} from "./is-never";

declare const x: unknown;

function createsUnreachableCode() {
    type expected = never;

    const passes = isNever;

    if (passes(x)) {
        const result: typeof x extends expected ? true : false  = true;
        ignore(result);
    } else {
        const result: pass<typeof x, unknown> = true;
        ignore(result);
    }
}

ignore(createsUnreachableCode);
