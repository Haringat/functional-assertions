import {createPredicate, IPredicate} from "../create-predicate";
import escapePropertyName from "../internal/escape-property-name";

/**
 * check if a property with the given name exists on the object. It does *not* check the type of the property value. It may be undefined.
 * So in the following would pass:
 * ```typescript
 * const unknownValue: unknown = {
 *     foo: undefined
 * };
 * const hasFoo = has-property("foo");
 * if (hasFoo(unknownValue)) {
 *     // this will be executed
 * }
 * ```
 * However, the folling will not:
 * ```
 * const unknownValue: unknown = {};
 * const hasFoo = has-property("foo");
 * if (hasFoo(unknownValue)) {
 *     // unreachable
 * }
 * ```
 * @typeparam TKey - The type of the property name. Expected to be narrowed.
 * @param key - the property name to check
 * @returns a predicate that will check for the existence of a property with the name of key in the value it receives
 */
export function hasProperty<TKey extends string>(key: TKey): IPredicate<{[property in TKey]: unknown}> {
    return createPredicate(
        `{["${escapePropertyName(key)}]"]: unknown}`,
        (it: unknown): it is {[property in TKey]: unknown} => typeof it === "object" && it !== null && key in it
    );
}
