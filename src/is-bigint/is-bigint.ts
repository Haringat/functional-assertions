import {createPredicate} from "../create-predicate";

/**
 * checks if the argument is a bigint
 */
export const isBigint = createPredicate("bigint", (it: unknown): it is bigint => typeof it === "bigint");
