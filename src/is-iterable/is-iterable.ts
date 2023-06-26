import {createPredicate} from "../create-predicate";

/**
 * Predicate that checks if its arguments is an iterable.
 */
export const isIterable = createPredicate("Iterable<unknown>", (it: unknown): it is Iterable<unknown> => {
    return typeof it === "object" && it !== null && Symbol.iterator in it;
});
