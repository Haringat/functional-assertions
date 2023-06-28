import {createPredicate} from "../create-predicate";

export function isEnum<TKey extends string, TValue extends string | number>(enumName: string, e: Record<TKey, TValue>) {
    const stringKeys = Object.keys(e)
        .filter(key => !/^[0-9]+$/.test(key)) as Array<TKey>;
    return createPredicate(enumName, (it): it is TValue => {
        return stringKeys.map(key => e[key])
            .some(key => key === it);
    });
}
