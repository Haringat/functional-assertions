import {createPredicate} from "../create-predicate";

export const isObject = createPredicate("object", (it: unknown): it is object => typeof it === "object");
