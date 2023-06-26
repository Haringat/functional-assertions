import {createPredicate} from "../create-predicate";

export const isNever = createPredicate("never", (_it: unknown): _it is never => false);
