module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "no-console": "off",
        "import/extensions": "off",
        "import/no-extraneous-dependencies": "off",
        "import/no-unresolved": "off",
        "comma-dangle": [2, "never"],
        "class-methods-use-this": "off",
        "comma-dangle": [2, "never"],
        "no-continue": "off",
        "no-multiple-empty-lines": ["error", { "max": 1 }],
        "no-nested-ternary": "off",
        "semi": ["error", "never"],
        "import/prefer-default-export" : "off",
        "react/jsx-boolean-value": 0,
        "react/prop-types": 0,
        "react/no-array-index-key": 0,
        "react/no-unused-state": 0,
        "react/prefer-stateless-function": [0],
        "react/no-danger": "off",
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-a11y/no-noninteractive-element-interactions": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/onclick-has-role": 0,
        "jsx-a11y/label-has-for": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "camelcase": 0
    }
};