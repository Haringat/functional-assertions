import {createPredicate, IPredicate, typeDescription} from "../create-predicate";

export function isArrayLikeOf<T>(predicate: IPredicate<T>) {
    return createPredicate(`ArrayLike<${predicate[typeDescription]}>`, (it: unknown): it is ArrayLike<T> =>
        typeof it === "object" &&
        it !== null &&
        "length" in it &&
        Object.keys(it).every(key => key === "length" || !isNaN(Number(key)))
    );
}
