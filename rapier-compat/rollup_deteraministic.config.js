import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import path from "path";
import copy from "rollup-plugin-copy";
import filesize from "rollup-plugin-filesize";
import customReplacePlugin from "./rollup_plugin_adapter_cocos";

const config = (dim, features_postfix) => ({
    input: `builds/${features_postfix}/gen${dim}/rapier.ts`,
    output: [
        {
            file: `builds/${features_postfix}/pkg/rapier.mjs`,
            format: "es",
            sourcemap: true,
            exports: "named",
        },
        {
            file: `builds/${features_postfix}/pkg/rapier.cjs`,
            format: "cjs",
            sourcemap: true,
            exports: "named",
        },
    ],
    plugins: [
        customReplacePlugin(),
        copy({
            targets: [
                {
                    src: `builds/${features_postfix}/wasm-build/package.json`,
                    dest: `builds/${features_postfix}/pkg/`,
                    transform(content) {
                        let config = JSON.parse(content.toString());
                        config.name = `@dimforge/rapier${features_postfix}-compat`;
                        config.description +=
                            " Compatibility package with inlined webassembly as base64.";
                        config.types = "rapier.d.ts";
                        config.main = "rapier.cjs";
                        config.module = "rapier.mjs";
                        config.exports = {
                            ".": {
                                types: "./rapier.d.ts",
                                require: "./rapier.cjs",
                                import: "./rapier.mjs",
                            },
                        };
                        // delete config.module;
                        config.files = ["*"];
                        return JSON.stringify(config, undefined, 2);
                    },
                },
                {
                    src: `../rapier${features_postfix}/LICENSE`,
                    dest: `builds/${features_postfix}/pkg`,
                },
                {
                    src: `../rapier${features_postfix}/README.md`,
                    dest: `builds/${features_postfix}/pkg`,
                },
            ],
        }),
        // base64({include: "**/*.wasm"}),
        terser(),
        nodeResolve(),
        commonjs(),
        typescript({
            tsconfig: path.resolve(
                __dirname,
                `builds/${features_postfix}/tsconfig.pkg.json`,
            ),
            sourceMap: true,
            inlineSources: true,
        }),
        filesize(),
    ],
});

export default [
    config("2d", "2d-deterministic")
];
