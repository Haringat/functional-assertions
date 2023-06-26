import {createPredicate} from "../create-predicate";

export const isString = createPredicate("string", (it: unknown): it is string => typeof it === "string");
