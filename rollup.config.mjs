import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import dts from "rollup-plugin-dts"
import postcss from "rollup-plugin-postcss"
import terser from "@rollup/plugin-terser"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import postcssImport from "postcss-import"
import { readFileSync } from "fs"

const packageJson = JSON.parse(readFileSync('./package.json'))

export default [
    {
        input: "src/index.ts",
        external: [...Object.keys(packageJson.peerDependencies || {})],
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: true,
            }
        ],
        plugins: [
            peerDepsExternal(),
            nodeResolve({ preferBuiltins: true }),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json"}),
            postcss({
                extensions: ['.css'],
                extract: true,
                minimize: true,
                sourceMap: true,
                plugins: [
                    postcssImport()
                ]
            }),
            terser(),
        ],
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm"}],
        plugins: [dts()],
        external: [/\.css$/],
    }
]