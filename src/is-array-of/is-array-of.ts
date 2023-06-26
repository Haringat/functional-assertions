import {createPredicate, IPredicate, typeDescription} from "../create-predicate";

/**
 * checks if all entries of an array pass the predicate parameter. This does *not* check whether or not the array contains any elements at
 * all.
 */
export function isArrayOf<T>(predicate: IPredicate<T>): IPredicate<Array<T>> {
    return createPredicate(
        `Array<${predicate[typeDescription]}`,
        (it: unknown): it is Array<T> => typeof it === "object" &&
            it !== null &&
            it instanceof Array &&
            it.every(predicate)
    );
}
