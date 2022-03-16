module.exports = {
    "env": {
        "browser": true,
        "es2021" : true,
        "node"   : true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 13,
        "sourceType" : "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": 0,
        "no-debugger"     : 0,
        "no-unused-vars"  : "warn",
        "jsx-quotes"      : ["warn", "prefer-double"],
        "semi"            : ["warn", "always"],
        "key-spacing"     : ["warn", { "align": "colon" }],
        "quotes"          : ["warn", "double"]
    }
};


