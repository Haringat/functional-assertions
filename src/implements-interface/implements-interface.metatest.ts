import {createPredicate} from "../create-predicate";
import {ignore, pass} from "../internal/metatest-helpers";
import {implementsInterface} from "./implements-interface";

declare const x: unknown;

function supportsShallowTypes() {
    // tslint:disable-next-line:interface-over-type-literal
    type expected = { bar: string, baz: boolean, foo: number };

    const isString = createPredicate("string", (_it: unknown): _it is string => true);
    const isNumber = createPredicate("number", (_it: unknown): _it is number => true);
    const isBoolean = createPredicate("boolean", (_it: unknown): _it is boolean => true);

    const passes = implementsInterface({
        foo: isNumber,
        bar: isString,
        baz: isBoolean
    });

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }
}

function canBeNested() {
    // tslint:disable-next-line:interface-over-type-literal
    type expected = { bar: string, baz: { barFoo: boolean, fooBar: string }, foo: number };

    const isString = createPredicate("string", (_it: unknown): _it is string => true);
    const isNumber = createPredicate("number", (_it: unknown): _it is number => true);
    const isBoolean = createPredicate("boolean", (_it: unknown): _it is boolean => true);

    const passes = implementsInterface({
        foo: isNumber,
        bar: isString,
        baz: implementsInterface({
            fooBar: isString,
            barFoo: isBoolean
        })
    });

    if (passes(x)) {
        const result: pass<typeof x, expected> = true;
        ignore(result);
    }
}

ignore(supportsShallowTypes, canBeNested);
