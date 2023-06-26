import {createPredicate, IPredicate, typeDescription} from "../create-predicate";
import objectEntries from "../internal/object-entries";

const optional: unique symbol = Symbol("optional");

export interface IOptionalPredicate<TIt> extends IPredicate<TIt> {
    [optional]?: true;
}

type IIsPropertyOptionalOnObject<T extends object, TKey extends keyof T> = undefined extends T[TKey] ? true : false;

type IPredicatesObject<T extends object> = {
    [key in keyof T]: IIsPropertyOptionalOnObject<T, key> extends true ?
        IOptionalPredicate<T[key]> :
        IPredicate<T[key]>;
};

/**
 * creates a new predicate that will check for existence of all property keys defined in `predicates` for the correct types.
 */
export function implementsInterface<
    T extends object
>(
    predicates: IPredicatesObject<T>
): IPredicate<T> {
    return createPredicate(
        `{${objectEntries(predicates).map(([key, value]) => {
            if (optional in value) {
                return `"${key.toString()}"?: ${value[typeDescription]}`;
            } else {
                return `"${key.toString()}": ${value[typeDescription]}`;
            }
        }).join(",")}}`,
        (it: unknown): it is T => typeof it === "object" &&
            it !== null &&
            objectEntries(predicates).every(([key, value]) => {
                const itCasted = it as {[TKey in typeof key]: T[typeof key]};
                if (optional in value) {
                    return !(key in it) || value(itCasted[key]);
                } else {
                    return key in it && value(itCasted[key]);
                }
            })
    );
}

export function isOptional<TPredicate extends IPredicate<TIt>, TIt>(predicate: TPredicate): IOptionalPredicate<TIt> {
    const result = createPredicate(
        predicate[typeDescription],
        predicate
    ) as IOptionalPredicate<TIt>;
    result[optional] = true;
    return result;
}
