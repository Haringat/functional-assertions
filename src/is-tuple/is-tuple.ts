import {createPredicate, IPredicate, typeDescription} from "../create-predicate";

type isTupleReturnType<T extends Array<unknown>> =
    T extends [] ?
        [] :
        T extends [IPredicate<infer U>] ?
            [U] :
            T extends [...infer W, IPredicate<infer V>] ?
                [...isTupleReturnType<W>, V] :
                never;

export function isTuple<TPredicates extends Array<IPredicate<unknown>>>(
    ...predicates: TPredicates
): IPredicate<isTupleReturnType<TPredicates>> {
    return createPredicate(
        `[${predicates.map(it => it[typeDescription]).join(",")}]`,
        (it: unknown): it is isTupleReturnType<TPredicates> => typeof it === "object" &&
            it !== null &&
            it instanceof Array &&
            it.length === predicates.length &&
            predicates.every((predicate, i) => predicate(it[i]))
    );
}
