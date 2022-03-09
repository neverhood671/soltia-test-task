module.exports = {
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "@typescript-eslint",
        "react-hooks",
        "risxss"
    ],
    "extends": [
        "airbnb",
        "airbnb-typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "rules": {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/prop-types": "off",
        "react/no-danger": "off",
        "risxss/catch-potential-xss-react": "error",
        "linebreak-style": ["error", process.platform === "win32" ? "windows" : "unix"]
    },
    "settings": {
        "react": {
            "pragma": "React",
            "version": "detect"
        }
    }
};