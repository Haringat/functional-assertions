// @ts-check
import {mkdir, writeFile, readFile, rm} from "node:fs/promises";
import {dirname, join} from "node:path";
import {URL} from "node:url";

import gulp from "gulp";
import typescript from "typescript";
import gulpTypescript from "gulp-typescript";
import gulpTsLint from "gulp-tslint";
import tslib from "tslint";
import {execa} from "execa";
import {rollup} from "rollup";
import rollupPluginTypescript from "rollup-plugin-typescript2";
import rollupPluginIncludepaths from "rollup-plugin-includepaths";
import rollupPluginPureAnnotation from "rollup-plugin-pure-annotation";
import dts from "rollup-plugin-dts"

const gulpfileUrl = new URL(import.meta.url);
const projectDir = dirname(gulpfileUrl.pathname);

const [tsConfig, packageJson] = await (async () => {
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
    ]
})();

const sources = [
    "./src/**/*.ts",
    "!**/*.test.ts",
    "!**/*.metatest.ts",
    "!./src/internal/metatest-helpers.ts"
];

function camelCase(it) {
    return it.replace(/-[a-z]/g, (match) => match[1].toLocaleUpperCase());
}

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
        version: packageJson.version
    };
    const jsonString = JSON.stringify(json, null, 4);
    const content = Buffer.from(jsonString, "utf8");
    return writeFile("./dist/package.json", content);
}

export function createDist() {
    return mkdir("./dist");
}

export function metatest() {
    return gulp.src([
        "./src/**/*.metatest.ts"
    ])
        .pipe(gulpTypescript({
            ...tsConfig.compilerOptions,
            typescript,
            declarationDir: undefined,
            declarationMap: undefined,
            sourceRoot: undefined
        }));
}

export async function test() {
    const [command, ...args] = packageJson.scripts.test.split(" ");
    const ava = execa(command, args, {
        preferLocal: true
    });

    ava.stderr.pipe(process.stderr);
    ava.stdout.pipe(process.stdout);

    return ava;
}

export async function doc() {
    const [command, ...args] = packageJson.scripts.doc.split(" ");
    const typedoc = execa(command, args, {
        preferLocal: true
    });

    typedoc.stderr.pipe(process.stderr);
    typedoc.stdout.pipe(process.stdout);

    return typedoc;
}

export function copyReadMe() {
    return gulp.src("./README.md")
        .pipe(gulp.dest("./dist"));
}

export async function fesm2021() {
    const pkg = await rollup({
        input: "src/index.ts",
        plugins: [
            rollupPluginTypescript({
                tsconfig: "tsconfig.json",
                tsconfigOverride: {
                    compilerOptions: {
                        target: "ES2021",
                        module: "ESNext",
                        declaration: false,
                        declarationDir: undefined,
                        declarationMap: false
                    }
                },
                typescript
            }),
            rollupPluginIncludepaths({
                external: ["tslib"],
            }),
            rollupPluginPureAnnotation()
        ]
    });
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
