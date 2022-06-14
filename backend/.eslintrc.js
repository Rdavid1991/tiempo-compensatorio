module.exports = {
    "env": {
        "es2021" : true,
        "node"   : true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser"        : "@typescript-eslint/parser",
    "parserOptions" : {
        "ecmaVersion" : "latest",
        "sourceType"  : "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/no-shadow" : ["error"],
        "indent"                       : ["error", 4, { "SwitchCase": 1 ,"offsetTernaryExpressions": true }],
        "key-spacing"                  : [
            "warn",
            {
                align: {
                    afterColon  : true,
                    beforeColon : true,
                    on          : "colon",
                },
            },
        ],
        "no-debugger"      : 0,
        "no-inline-styles" : 0,
        "no-shadow"        : "off",
        "no-undef"         : "off",
        "no-unused-vars"   : "warn",
        "quotes"           : ["warn", "double"],
        "semi"             : ["warn", "always"],
        "sort-keys"        : "warn",
    }
};
