import {createPredicate, IPredicate, typeDescription} from "../create-predicate";

type AndPredicateReturnType<T extends Array<unknown>> =
    T extends [IPredicate<infer U>] ?
        U :
        T extends [IPredicate<infer V>, ...infer X] ?
            V & AndPredicateReturnType<[...X]> :
            never;

/**
 * returns Predicate that will evalutate to true if and only if all of the parameters evaluate to true
 * @param predicates - the predicates to consider in the returned predicate
 * @typeparam TPredicates - The types of the predicates. Should be inferred by the parameters
 */
export function and<TPredicates extends Array<IPredicate<unknown>>>(
    ...predicates: TPredicates
): IPredicate<AndPredicateReturnType<TPredicates>> {
    let message: string;
    if (predicates.length === 0) {
        message = "never";
    } else {
        message = predicates.map(predicate => `(${predicate[typeDescription]})`).join(" & ");
    }
    return createPredicate(message, (it: unknown): it is AndPredicateReturnType<TPredicates> => {
        return predicates.every(predicate => predicate(it));
    });
}
