import {createPredicate, IPredicate, typeDescription} from "../create-predicate";
import escapePropertyName from "../internal/escape-property-name";

/**
 * Same as {@link hasProperty} however, this *will* also check the type of the property value.
 * @typeparam TKey - The type of the property name. Expected to be narrowed.
 * @param key - The property name to check
 * @param predicate - the predicate which the property value has to pass
 * @returns a predicate which will check for the existence and type of a property key on the value that it receives
 */
export function hasPropertyOfType<TKey extends string, T>(
    key: TKey,
    predicate: IPredicate<T>
): IPredicate<{[property in TKey]: T}> {
    return createPredicate(
        `{"${escapePropertyName(key)}": ${predicate[typeDescription]}}`,
        (it: unknown): it is {[property in TKey]: T} => typeof it === "object" && it !== null &&
            key in it &&
            predicate((it as {[property in TKey]: unknown})[key])
    );
}
