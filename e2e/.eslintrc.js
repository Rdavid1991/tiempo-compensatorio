module.exports = {
    "env": {
        "es2021" : true,
        "node"   : true
    },
    "extends"       : "eslint:recommended",
    "parserOptions" : {
        "ecmaVersion" : "latest",
        "sourceType"  : "module"
    },
    "rules": {
        "indent"      : ["warn", 4],
        "key-spacing" : [
            "warn",
            {
                align: {
                    afterColon  : true,
                    beforeColon : true,
                    on          : "colon",
                },
            },
        ],
        "no-unused-vars": "warn"
    }
}
