import {mkdir, readFile, rm, writeFile} from "node:fs/promises";
import {dirname, join} from "node:path";
import {URL} from "node:url";

import rollupPluginTypescript from "@rollup/plugin-typescript";
import {execa} from "execa";
import gulp from "gulp";
import gulpTsLint from "gulp-tslint";
import * as process from "process";
import {rollup, defineConfig} from "rollup";
import dts from "rollup-plugin-dts";
import rollupPluginIncludepaths from "rollup-plugin-includepaths";
import rollupPluginPureAnnotation from "rollup-plugin-pure-annotation";

import tslib from "tslint";
import typescript from "typescript";

const gulpfileUrl = new URL(import.meta.url);
const projectDir = dirname(gulpfileUrl.pathname);

const [_tsConfig, packageJson] = await (async () => {
    const [tsConfigContent, packageJsonContent] = await Promise.all([
        readFile(join(projectDir, "tsconfig.json")),
        readFile(join(projectDir, "./package.json"))
    ]);
    function parseJsonBuffer(it) {
        return JSON.parse(it.toString("utf-8"));
    }
    return [
        parseJsonBuffer(tsConfigContent),
        parseJsonBuffer(packageJsonContent)
    ];
})();

const sources = [
    "./src/**/*.ts",
    "!**/*.test.ts",
    "!**/*.metatest.ts",
    "!./src/internal/metatest-helpers.ts"
];

export async function declarations() {
    const pkg = await rollup({
        input: "src/index.ts",
        plugins: [
            dts()
        ]
    });
    return pkg.write({
        format: "es",
        file: `./dist/index.d.ts`,
        sourcemap: false
    });
}

export function clean() {
     return rm("./dist", {
         force: true,
         recursive: true
     });
}

export function lint() {
    const program = tslib.Linter.createProgram("./tsconfig.json");
    return gulp.src(sources)
        .pipe(gulpTsLint({
            program
        }))
        .pipe(gulpTsLint.report());
}

export function writePackageJson() {
    const json = {
        dependencies: packageJson.dependencies,
        main: "index.js",
        type: "module",
        name: packageJson.name,
        peerDependencies: packageJson.peerDependencies,
        sideEffects: !!packageJson.sideEffects,
        typings: `index.d.ts`,
        version: packageJson.version,
        license: packageJson.license
    };
    const jsonString = JSON.stringify(json, null, 4);
    const content = Buffer.from(jsonString, "utf8");
    return writeFile("./dist/package.json", content);
}

export function createDist() {
    return mkdir("./dist");
}

export function metatest() {
    return execa("tsc", ["-p", "tsconfig.metatest.json"], {
        preferLocal: true,
        stderr: process.stderr,
        stdout: process.stdout
    })
}

export async function test() {
    const [command, ...args] = packageJson.scripts.test.split(" ");
    return execa(command, args, {
        preferLocal: true,
        stderr: process.stderr,
        stdout: process.stdout
    });
}

export async function doc() {
    const [command, ...args] = packageJson.scripts.doc.split(" ");
    return execa(command, args, {
        preferLocal: true,
        stderr: process.stderr,
        stdout: process.stdout
    });
}

export function copyReadMe() {
    return gulp.src("./README.md")
        .pipe(gulp.dest("./dist"));
}

const rollupConfig = defineConfig({
    input: "src/index.ts",
    plugins: [
        rollupPluginTypescript({
            compilerOptions: {
                allowImportingTsExtensions: undefined,
                declaration: false,
                declarationDir: undefined,
                declarationMap: false,
                module: "ESNext",
                target: "ES2021"
            },
            tsconfig: "tsconfig.json",
            typescript
        }),
        rollupPluginIncludepaths({
            external: ["tslib"],
        }),
        rollupPluginPureAnnotation()
    ]
});

export async function fesm2021() {
    const pkg = await rollup(rollupConfig);
    await pkg.write({
        format: "esm",
        // file: `./dist/fesm2021/${name}.js`
        file: `./dist/index.js`
    });
}

export default gulp.series(
    clean,
    gulp.parallel(
        lint,
        test,
        metatest
    ),
    createDist,
    gulp.parallel(
        doc,
        copyReadMe,
        declarations,
        fesm2021,
        writePackageJson
    )
);
