import globals from "globals"
import pluginJs from "@eslint/js"


export default [
    {languageOptions: { globals: globals.node }},
    pluginJs.configs.recommended,

    {
        files: ["src/**/*.js"],
        rules: {
            // 'camelcase': 'error',              // Enforce camelCase naming
            // 'semi': ['error', 'always'],        // Disallow semicolons
            // 'indent': ['error', 4],            // Use 4 spaces for indentation
            'eqeqeq': 'off',                   // Disable strict equality checks
        },
    }
]