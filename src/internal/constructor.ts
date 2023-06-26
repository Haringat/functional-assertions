/**
 * @internal
 */
export interface Constructor<T> extends Function {
    prototype: T;
    // tslint:disable-next-line:no-any
    new (...args: Array<any>): T;
}
