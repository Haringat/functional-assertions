import {ignore, pass} from "../internal/metatest-helpers";
import {is} from "./is";

declare const x: unknown;

function checksPrimitives() {

    type expected = "foo";

    const passes = is<"foo">("foo");

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }

}

ignore(checksPrimitives);
