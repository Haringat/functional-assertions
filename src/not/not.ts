import {createPredicate, IPredicate, typeDescription} from "../create-predicate";

/**
 * Derived interface needed to support {@link not}.
 * @typeparam TXIt the Type that will be inverted
 * @internal
 */
export interface IExcludePredicate<TXIt> extends IPredicate<Exclude<unknown, TXIt>> {

    /**
     * actually evalutate the Predicate
     * @typeparam TIt - The value of the candidate. This must be at this place because the type will only be known at call time.
     * @param it - The candidate
     */
    <TIt> (it: TIt): it is Exclude<TIt, TXIt>;

}

/**
 * Returns an inverted version of predicate which will return true if and only if predicate returns false. Otherwise, it will return false.
 * @typeparam TXIt - The Type which the predicate checks for
 * @param predicate - The predicate to invert
 * @returns an inversion of predicate which will check for its candidate being of type !TXIt
 */
export function not<TXIt>(predicate: IPredicate<TXIt>): IExcludePredicate<TXIt> {
    return createPredicate(`!${predicate[typeDescription]}`, <TIt> (it: TIt): it is Exclude<TIt, TXIt> => !predicate(it));
}
