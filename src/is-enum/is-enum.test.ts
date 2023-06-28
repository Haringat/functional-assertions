import test from "ava";
import {isEnum} from "./is-enum";

test("works with numeric enums", spec => {
    spec.plan(3);

    enum MyEnum {
        KEY_1,
        KEY_2
    }

    const isMyEnum = isEnum("MyEnum", MyEnum);

    spec.true(isMyEnum(MyEnum.KEY_1));
    spec.true(isMyEnum(MyEnum.KEY_2));
    spec.false(isMyEnum(3));
});

test("works with string enums", spec => {
    spec.plan(3);

    enum MyEnum {
        KEY_1 = "value1",
        KEY_2 = "value2"
    }

    const isMyEnum = isEnum("MyEnum", MyEnum);

    spec.true(isMyEnum(MyEnum.KEY_1));
    spec.true(isMyEnum(MyEnum.KEY_2));
    spec.false(isMyEnum("value3"));
});
