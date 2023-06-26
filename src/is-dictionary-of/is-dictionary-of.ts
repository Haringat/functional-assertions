import {createPredicate, IPredicate, typeDescription} from "../create-predicate";
import {isNull} from "../is-null/is-null";
import {isObject} from "../is-object/is-object";

/**
 * returns a predicate which checks if all properties of an object satisfy a given predicate
 * @param predicate the predicate for all properties
 */
export function isDictionaryOf<T>(predicate: IPredicate<T>) {
    return createPredicate(`{[key: string]: ${predicate[typeDescription]}}`, (it): it is {[key: string]: T} => {
        return isObject(it) && !isNull(it) && Object.values(it).every(predicate);
    });
}
