import {IPredicate, typeDescription} from "./create-predicate";

/**
 * Assert that it passes predicate. Throws an exception otherwise.
 * @param it - the value to check
 * @param predicate - the predicate describing the type to check it against
 * @param error - an optional error to throw instead of the default one
 */
export function assert<T>(it: unknown, predicate: IPredicate<T>, error?: Error): asserts it is T {
    if (!predicate(it)) {
        let stringifiedIt: string;
        try {
            stringifiedIt = JSON.stringify(it);
        } catch (e) {
            stringifiedIt = String(it);
        }
        throw error ?? new TypeError(`Expected ${stringifiedIt} to be ${predicate[typeDescription]}`);
    }
}
