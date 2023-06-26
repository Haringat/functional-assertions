import {createPredicate} from "../create-predicate";

/**
 * checks if the argument is of type boolean
 */
export const isBoolean = createPredicate("boolean", (it: unknown): it is boolean => typeof it === "boolean");
