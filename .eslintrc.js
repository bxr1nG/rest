module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "prettier"
    ],
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            extends: [
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking"
            ],
            parserOptions: {
                project: [
                    "./packages/client/tsconfig.json",
                    "./packages/server/tsconfig.json"
                ],
                tsconfigRootDir: __dirname
            }
        }
    ],
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            },
            typescript: {
                alwaysTryTypes: true,
                project: "packages/*/tsconfig.json"
            }
        }
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react", "@typescript-eslint", "import", "prettier"],
    rules: {
        "prettier/prettier": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/consistent-type-imports": "error",
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "no-console": ["error", { allow: ["info", "error"] }],
        "import/no-unresolved": "error",
        "import/order": [
            "error",
            {
                groups: [
                    "type",
                    "builtin",
                    "external",
                    "internal",
                    "parent",
                    "index",
                    "sibling",
                    "object"
                ],
                pathGroups: [
                    {
                        pattern: "~/types/**",
                        group: "parent",
                        position: "before"
                    },
                    {
                        pattern: "~/**",
                        group: "parent",
                        position: "before"
                    },
                    {
                        pattern: "./**",
                        group: "sibling",
                        position: "before"
                    }
                ],
                "newlines-between": "always",
                distinctGroup: false
            }
        ]
    }
};
