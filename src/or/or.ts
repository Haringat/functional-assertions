import {createPredicate, IPredicate, typeDescription} from "../create-predicate";

type OrPredicateReturnType<T extends Array<unknown>> =
    T extends [IPredicate<infer U>] ?
        U :
        T extends [IPredicate<infer V>, ...infer X] ?
            V | OrPredicateReturnType<[...X]> :
            never;

/**
 * returns Predicate that will evalutate to true if at lease one of the parameters evaluate to true
 * @param predicates - the predicates to consider in the returned predicate
 * @typeparam TPredicates - The types of the predicates. Should be inferred by the parameters
 */
export function or<TPredicates extends Array<IPredicate<unknown>>>(
    ...predicates: TPredicates
): IPredicate<OrPredicateReturnType<TPredicates>> {
    let message: string;
    if (predicates.length === 0) {
        message = "never";
    } else {
        message = predicates.map(predicate => `(${predicate[typeDescription]})`).join(" | ");
    }
    return createPredicate(message, (it: unknown): it is OrPredicateReturnType<TPredicates> => {
        return predicates.some(predicate => predicate(it));
    });
}
