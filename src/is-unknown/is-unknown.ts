import {createPredicate} from "../create-predicate";

/**
 * Does the same as {@link isAny} except that the type will be unknown instead of any.
 */
export const isUnknown = createPredicate<unknown>("unknown", (_it: unknown): _it is unknown => true);
