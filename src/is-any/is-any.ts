import {createPredicate} from "../create-predicate";

/**
 * A predicate that will always return true and smartcast the value to any.
 */
// tslint:disable-next-line:no-any
export const isAny = createPredicate("any", (_it: unknown): _it is any => true);
