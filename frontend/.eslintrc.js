module.exports = {
    "env": {
        "browser" : true,
        "es2021"  : true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    "parser"        : "@typescript-eslint/parser",
    "parserOptions" : {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion" : "latest",
        "sourceType"  : "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/no-shadow"       : ["error"],
        "@typescript-eslint/no-var-requires" : 0,
        "indent"                             : ["warn", 4, { "SwitchCase": 1 , "offsetTernaryExpressions": true}],
        "jsx-quotes"                         : ["warn", "prefer-double"],
        "key-spacing"                        : [
            "warn",
            {
                align: {
                    afterColon  : true,
                    beforeColon : true,
                    on          : "colon",
                },
            },
        ],
        "no-debugger"                 : 0,
        "no-inline-styles"            : 0,
        "no-shadow"                   : "off",
        "no-undef"                    : "off",
        "no-unused-vars"              : "warn",
        "quotes"                      : ["warn", "double"],
        "react-hooks/exhaustive-deps" : 0,
        "react/jsx-indent"            : ["error", 4],
        "react/jsx-indent-props"      : ["error", 4],
        "react/prop-types"            : 0,
        "semi"                        : ["warn", "always"],
        "sort-keys"                   : "warn",
    }
};
