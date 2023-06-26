import {createPredicate} from "../create-predicate";

export const isArrayLike = createPredicate("ArrayLike<unknown>", (it: unknown): it is ArrayLike<unknown> =>
    typeof it === "object" && it !== null && "length" in it
);
