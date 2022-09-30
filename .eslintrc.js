module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/essential",
        "@vue/standard",
        "@vue/typescript/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        quotes: [2, "double", { avoidEscape: false }],
        semi: 0,
        "comma-dangle": 0,
        indent: "off",
        "no-tabs": 0,
        "vue/comment-directive": 0,
        "space-before-function-paren": [
            "error",
            {
                anonymous: "always",
                named: "never",
                asyncArrow: "always",
            },
        ],
    },
};
