import {createPredicate} from "../create-predicate";

export const isNull = createPredicate("null", (it: unknown): it is null => it === null);
