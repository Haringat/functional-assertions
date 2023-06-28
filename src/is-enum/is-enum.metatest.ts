import {fail, ignore, pass} from "../internal/metatest-helpers";
import {isEnum} from "./is-enum";

declare const x: unknown;

function supportsEnums() {

    enum MyEnum {
        KEY_1,
        KEY_2
    }

    type expected = MyEnum;

    const passes = isEnum("MyEnum", MyEnum);

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }
}

function prohibitsOtherEnums() {

    enum MyEnum {
        KEY_1,
        KEY_2
    }

    enum MyOtherEnum {
        OTHER_KEY_1,
        OTHER_KEY_2
    }

    type expected = MyOtherEnum;

    const passes = isEnum("MyEnum", MyEnum);

    if (passes(x)) {
        const result: fail<typeof x, expected> = true;
        ignore(result);
    }
}

ignore(supportsEnums, prohibitsOtherEnums);
