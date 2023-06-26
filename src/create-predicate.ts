/**
 * A symbol for storing a string representation of the type in a predicate.
 * @internal
 */
export const typeDescription: unique symbol = Symbol("typeDescription");

/**
 * Interface for predicate functions
 */
export interface IPredicate<TType> {

    /**
     * evaluate the predicate against a candidate
     * @param it the candidate
     */
    (it: unknown): it is TType;

    /**
     * @internal
     */
    [typeDescription]: string;
}

/**
 * creates a predicate from the given predicate function and the type description
 * @param message a string representation of the type
 * @param predicate a function that returns true if the given argument matches and false otherwise
 */
export function createPredicate<TType>(
    message: string,
    predicate: (it: unknown) => it is TType
): IPredicate<TType> {
    const p = function(it: unknown): it is TType {
        return predicate(it);
    } as IPredicate<TType>;
    p[typeDescription] = message;
    return p;
}
