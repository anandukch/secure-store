// module.exports = {
//     root: true,
//     env: { browser: true, es2020: true },
//     extends: [
//         "airbnb",
//         "airbnb-typescript",
//         "airbnb/hooks",
//         "eslint:recommended",
//         "plugin:@typescript-eslint/recommended",
//         "plugin:react-hooks/recommended",
//         "plugin:prettier/recommended"
//     ],
//     ignorePatterns: ["dist", ".eslintrc.cjs"],
//     parser: "@typescript-eslint/parser",
//     plugins: ["react-refresh"],
//     "parserOptions": {
//       "ecmaVersion": "latest",
//       "sourceType": "module",
//       "project": "./tsconfig.json"
//   },
//     rules: {
//         // "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
//         // "@typescript-eslint/no-unused-vars": ["warn"],
//     }
// };

module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh"],
    rules: {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        "@typescript-eslint/no-unused-vars": ["warn"],
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-empty-function": "off",
        "@typescript-eslint/no-empty-function": "error",
    },
};
