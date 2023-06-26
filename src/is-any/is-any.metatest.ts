import {ignore, pass} from "../internal/metatest-helpers";
import {isAny} from "./is-any";

declare const x: unknown;

function checksAny() {

    // tslint:disable-next-line
    type expected = any;

    const passes = isAny;

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

ignore(checksAny);
