import {createPredicate} from "../create-predicate";

export const isFunction = createPredicate("Function", (it: unknown): it is Function => typeof it === "function");
