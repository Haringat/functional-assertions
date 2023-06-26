import {createPredicate, IPredicate} from "../create-predicate";

const {
    stringify
} = JSON;

export function is<T>(pattern: T): IPredicate<T> {
    let typeDescription: string;
    if (pattern === undefined) {
        typeDescription = "undefined";
    } else {
        try {
            typeDescription = stringify(pattern);
        } catch (e) {
            typeDescription = String(pattern);
        }
    }
    return createPredicate(typeDescription, (it: unknown): it is T => it === pattern);
}
