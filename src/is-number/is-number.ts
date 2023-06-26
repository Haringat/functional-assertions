import {createPredicate} from "../create-predicate";

export const isNumber = createPredicate("number", (it: unknown): it is number => typeof it === "number");
