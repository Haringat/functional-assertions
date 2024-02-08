import {fileURLToPath, pathToFileURL, URL} from "node:url";
import {readFile} from "node:fs/promises";
import {existsSync, realpathSync} from "node:fs";

import swc from "@swc/core";

const currentPathUrl = new URL(".", import.meta.url);

/**
 * @type {import("./tsconfig.json")}
 */
const tsConfig = JSON.parse(await readFile(process.env["TSCONFIG_JSON"] ?? "./tsconfig.json", {encoding: "utf-8"}));

const sourceRoot = new URL(tsConfig.compilerOptions.sourceRoot, pathToFileURL(realpathSync(process.env["TSCONFIG_JSON"] ?? "./tsconfig.json"))).toString();

const paths = Object.entries(tsConfig.compilerOptions.paths ?? {})
    .map(([key, value]) =>
        /**
         * @type {[RegExp, string]}
         */
        [new RegExp("^" + key.replace("$", "\\$").replace("^", "\\^").replace(".", "\\.").replace("*", "")), value.map(entry => entry.replace(/\*/g, ""))]
    );

const typescriptEndings = [".ts", ".mts", ".cts"];

function tryResolve(specifier, context, resolve) {
    try {
        return resolve(specifier, context);
    } catch (e) {
        return false;
    }
}

/**
 * @param {string} specifier
 * @param {import("node:module").ResolveHookContext} context
 * @param {(specifier: string, context: import("node:module").ResolveHookContext) => (import("node:module").ResolveFnOutput | Promise<import("node:module").ResolveFnOutput>)} nextResolve
 * @return {Promise<import("node:module").ResolveFnOutput>}
 */
export async function resolve(specifier, context, nextResolve) {
    // tsconfig paths resolver
    const realSpecifier = paths.reduce((specifier, [key, value]) => specifier.replace(key, () => value[0]), specifier);
    const possibleSpecifier = realSpecifier === specifier ? specifier : new URL(realSpecifier, currentPathUrl).pathname;
    let finalSpecifier;
    // in typescript, you have to import without extensions, so we add the extension to every relative identifier that
    // does not have a javascript extension
    if (possibleSpecifier.startsWith(".") && !possibleSpecifier.endsWith("js") && !existsSync(possibleSpecifier)) {
        finalSpecifier = possibleSpecifier + ".ts";
    }
    return nextResolve(finalSpecifier ?? possibleSpecifier, context);
}

/**
 * @param {string} url
 * @param {import("node:module").LoadHookContext} context
 * @param {(specifier: string, context: import("node:module").LoadHookContext) => (import("node:module").LoadFnOutput | Promise<import("node:module").LoadFnOutput>)} nextLoad
 * @Return {Promise<import("node:module").LoadFnOutput>}
 */
export async function load(url, context, nextLoad) {
    if (typescriptEndings.some(ending => url.endsWith(ending))) {
        const filePath = fileURLToPath(url);
        const content = await readFile(filePath, {encoding: "utf-8"});
        const transpiled = await swc.transform(content, {
            module: {
                type: "nodenext", // url.endsWith(".mts") ? "nodenext" : "commonjs",
                importInterop: "node",
                strict: true
            },
            jsc: {
                parser: {
                    syntax: "typescript"
                },
                target: "es2019",
                loose: true
            }
        });
        return {
            format: "module", // url.endsWith(".mts") ? "module" : "commonjs",
            source: transpiled.code,
            shortCircuit: true
        }
    }
    return nextLoad(url, context);
}
