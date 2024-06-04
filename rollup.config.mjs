import terser from "@rollup/plugin-terser";

export default {
    input: "src/bmodal.js",
    output: [
        {
            file: "dist/bmodal.esm.js",
            format: "es"
        },
        {
            file: "dist/bmodal.cjs.js",
            format: "cjs"
        }
    ],
    plugins: [terser()]
};