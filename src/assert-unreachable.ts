/**
 * assertion function to mark a point that should never be reachable.
 * @param [error] an optional error to throw instead of the default message
 */
export function assertUnreachable(error?: Error): never {
    throw error ?? new Error("Unreachable code point reached.");
}
