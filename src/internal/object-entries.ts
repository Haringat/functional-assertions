export default function objectEntries<T extends object>(o: T): Array<[keyof T, T[keyof T]]> {
    return [...Object.getOwnPropertyNames(o), ...Object.getOwnPropertySymbols(o)].map(it => [it as keyof T, o[it as keyof T]]);
}
