# @public-cloud-group/functional-assertions

This library provides several predicates and assertion functions as well as utilities to compose predicates and create
your own ones.

## Why was this created?

There already exists a multitude of assertion libraries within the node ecosystem. However, most of them fall in (at
least) one of three pitfalls:
1. They are not (or hardly) extendable and instead try to cover everything you might want to assert (e.g. jasmine)
2. They are completely bare-bones and require lots of work just to be useful in the first place (e.g. Node.JS' "assert"
module)
3. They are not usable in every environment (e.g. AVA)

functional-assertions tries to provide assertions without falling in these pitfalls.

## How is that achieved?

Utilizing features of functional programming and typescripts predicate functions allows creating functions that
serve exactly one purpose and that are easily composable.

## How to use it?

To use a predicate you first have to instantiate it and then call it. In the field this looks roughly like this:

```typescript
import {assert, createPredicate, is, isUndefined, isNull, or} from "@public-cloud-group/functional-assertions";

// "is" is predicate factory. So we have to call it first to get a predicate back
const isFour = is(4 as const);

// when creating a predicate, you must first give a human-readable string-representation of the type and then the actual
// predicate function
const isFive = createPredicate("5", (it: unknown): it is 5 => it === 5);

// When composing make sure to pass the predicates as parameters and not accidentally call them. You may, however, call
// predicate factories to create the predicates in-place.
const isFourOrHelloWorldOrUndefinedOrNull = or(isFour, is("Hello, World!" as const), isUndefined, isNull);

// You can also pass a predicate into createPredicate (mostly useful for changing the human-readable type description
// which is used in error messages)
const isMyValue = createPredicate("my-value", isFourOrHelloWorldOrUndefinedOrNull);

// A value which we do not know anything about
let unknownValue: unknown;

// When used for type-checking
if (isMyValue(unknownValue)) {
    // here unknownValue is auto-narrowed to null|undefined|4|"Hello, World!"
}

// here unknownValue is unknown again

assert(unknownValue, isMyValue);

// here unknownValue is again auto-narrowed to null|undefined|4|"Hello, World!"

let unknownValue2: unknown = 4;

// The next line produces a runtime Error: expected 4 to be 5
assert(unknownValue2, isFive);

// unknownValue2 is auto-narrowed to 5

// The next line produces a compiler Error: 5 is not assignable to 4
assert(unknownValue2, isFour);
```

## When to use it?

This library is mostly (but not exclusively) designed for two use-cases:
1. When you have a value from an external system (like a parsed json file from the file system or a request/response
body of an HTTP request), you cannot trust it to have exactly the type you expect it to have. Here functional-assertions
can help you check the sanity and integrity of the data.
2. As an assertion library in tests or at runtime.

## What are .metatest.ts files?

Since one of the core features of this library is type checking and it changes typescripts control flow diagram it is
necessary to make sure that variables have the correct type when certain functions were called. Checking that is what
the metatest files were created for. While it does not make sense to run them they are only meant to be compiled because
when they do not compile, something is wrong with the meta-programming that causes the types to not work correctly.

The compilation results of these files will not be included in the distributed package.

## Open Tasks

- AVA compatibility
- ["magic assert"](https://github.com/avajs/ava#magic-assert)
