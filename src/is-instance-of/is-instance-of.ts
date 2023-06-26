import {createPredicate, IPredicate} from "../create-predicate";
import type {Constructor} from "../internal/constructor";

export function isInstanceOf<T>(type: Constructor<T>): IPredicate<T> {
    return createPredicate(
        `${type.name}`,
        (it: unknown): it is T => typeof it === "object" && it !== null && it instanceof type
    );
}
