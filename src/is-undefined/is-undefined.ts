import {createPredicate} from "../create-predicate";

export const isUndefined = createPredicate("undefined", (it: unknown): it is undefined => it === undefined);
