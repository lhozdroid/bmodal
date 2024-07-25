import terser from "@rollup/plugin-terser";

export default [
    {
        input: "src/bmodal.bundle.js",
        output: [
            {
                file: "dist/bmodal.min.js",
                format: "es"
            }
        ],
        plugins: [terser()]
    },
    {
        input: "src/bloading.bundle.js",
        output: [
            {
                file: "dist/bloading.min.js",
                format: "es"
            }
        ],
        plugins: [terser()]
    }
];