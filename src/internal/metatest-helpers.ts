// requires a test to pass
export type pass<actual, expected> = actual extends expected ? true : false;
// requires a test to fail
export type fail<actual, expected> = actual extends expected ? false : true;
// passes any test
export type skip<_actual, _expected> = true;

// pretend to use values, so `noUnusedLocals` is happy
export function ignore(..._args: Array<unknown>) {
}
