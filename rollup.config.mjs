import terser from "@rollup/plugin-terser";

export default [
    {
        input: "src/bmodal.js",
        output: [
            {
                file: "dist/bmodal.min.js",
                format: "es"
            }
        ],
        plugins: [terser()]
    },
    {
        input: "src/bloading.js",
        output: [
            {
                file: "dist/bloading.min.js",
                format: "es"
            }
        ],
        plugins: [terser()]
    }
];