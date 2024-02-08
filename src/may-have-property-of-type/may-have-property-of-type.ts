import {createPredicate, IPredicate, typeDescription} from "../create-predicate";
import escapePropertyName from "../internal/escape-property-name";

/**
 * Check if a property exists on an object. In contrast to {@link hasProperty} the returned predicate evaluates to true if the property does
 * not exist on the object.
 * @returns a predicate that checks if the property has the correct type if it exists. Otherwise, it just returns true.
 * @param key - the name of the property to check
 * @param predicate - the predicate to check to property against
 * @typeparam TKey - the property type. Expected to be as narrow as possible
 * @typeparam T - The supposed type of the property
 */
export function mayHavePropertyOfType<TKey extends string, T>(
    key: TKey,
    predicate: IPredicate<T>
): IPredicate<{[property in TKey]: T | undefined}> {
    return createPredicate(
        `{"${escapePropertyName(key)}"?: ${predicate([typeDescription])}}`,
        (it: unknown): it is {[property in TKey]: T | undefined} => typeof it === "object" &&
            it !== null &&
            (
                !(key in it) ||
                predicate((it as {[property in TKey]: unknown})[key])
            )
    );
}
