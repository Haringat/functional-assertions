import {createPredicate} from "../create-predicate";

/**
 * checks if the argument is an array. It does *not* check if the array contains elements.
 */
export const isArray = createPredicate(
    `Array<unknown>`,
    (it: unknown): it is Array<unknown> => typeof it === "object" && it !== null && it instanceof Array
);
