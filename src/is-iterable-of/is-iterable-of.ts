import {createPredicate, IPredicate, typeDescription} from "../create-predicate";

export function isIterableOf<T>(predicate: IPredicate<T>): IPredicate<Iterable<T>> {
    return createPredicate(`Iterable<${predicate[typeDescription]}>`, (it: unknown): it is Iterable<T> => {
        if (typeof it === "object" && it !== null && (Symbol.iterator in it || Symbol.iterator in Object.getPrototypeOf(it))) {
            for (const element of it as Iterable<unknown>) {
                if (!predicate(element)) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    });
}
