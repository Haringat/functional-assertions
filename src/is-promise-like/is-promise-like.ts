import {createPredicate} from "../create-predicate";

export const isPromiseLike = createPredicate(
    "PromiseLike<unknown>",
    (it: unknown): it is PromiseLike<unknown> => typeof it === "object" &&
        it !== null &&
        (
            "then" in it && typeof it["then" as keyof typeof it] === "function" ||
            "then" in Object.getPrototypeOf(it) && typeof Object.getPrototypeOf(it)["then"] === "function"
        )
);
