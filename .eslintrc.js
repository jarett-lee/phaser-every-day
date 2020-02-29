module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
  ],
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript", // see https://github.com/benmosher/eslint-plugin-import#typescript
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      impliedStrict: true
    }
  },
  env: {
    browser: true,
    commonjs: true
  },
  settings: {
    "import/resolver": "webpack",
  },
  rules: {
    // Variables
    // https://eslint.org/docs/rules/#variables
    "no-shadow": "warn",

    // Best practices
    // https://eslint.org/docs/rules/#best-practices
    "no-multi-spaces": "warn",
    "no-param-reassign": "error",

    // Stylistic issues
    // https://eslint.org/docs/rules/#stylistic-issues
    "array-bracket-newline": "warn",
    "array-bracket-spacing": "warn",
    "array-element-newline": "warn",
    "block-spacing": "warn",
    "brace-style": "warn",
    "camelcase": "warn",
    // "capitalized-comments": "warn",
    "comma-dangle": ["warn", "always-multiline"],
    "comma-spacing": "warn",
    "comma-style": "warn",
    "computed-property-spacing": "warn",
    "consistent-this": "warn",
    "eol-last": "warn",
    "func-call-spacing": "warn",
    "func-name-matching": "warn",
    "func-names": "warn",
    "func-style": "warn",
    "function-call-argument-newline": ["warn", "consistent"],
    "function-paren-newline": ["warn", "multiline"],
    "id-blacklist": "warn",
    // "id-length": "warn",
    "id-match": "warn",
    "implicit-arrow-linebreak": "warn",
    "indent": ["warn", 4],
    "jsx-quotes": "warn",
    "key-spacing": "warn",
    "keyword-spacing": "warn",
    "line-comment-position": "warn",
    "linebreak-style": "warn",
    "lines-around-comment": "warn",
    "lines-between-class-members": ["warn", "always", {exceptAfterSingleLine: true}],
    "max-depth": "warn",
    "max-len": ["warn", {"code": 120}],
    "max-lines": "warn",
    "max-lines-per-function": "warn",
    "max-nested-callbacks": "warn",
    "max-params": "warn",
    // "max-statements": "warn",
    "max-statements-per-line": "warn",
    // "multiline-comment-style": "warn",
    "multiline-ternary": ["warn", "never"],
    "new-cap": "warn",
    "new-parens": "warn",
    "newline-per-chained-call": "warn",
    "no-array-constructor": "warn",
    "no-bitwise": "warn",
    "no-continue": "warn",
    "no-inline-comments": "warn",
    "no-lonely-if": "warn",
    "no-mixed-operators": "warn",
    // "no-mixed-spaces-and-tabs": "warn", // recommended
    "no-multi-assign": "warn",
    "no-multiple-empty-lines": ["warn", {"max": 1, "maxBOF": 0, "maxEOF": 0}],
    "no-negated-condition": "warn",
    "no-nested-ternary": "warn",
    "no-new-object": "warn",
    "no-plusplus": "warn",
    "no-restricted-syntax": "warn",
    "no-tabs": "warn",
    // "no-ternary": "warn",
    "no-trailing-spaces": "warn",
    "no-underscore-dangle": "warn",
    "no-unneeded-ternary": "warn",
    "no-whitespace-before-property": "warn",
    "nonblock-statement-body-position": "warn",
    "object-curly-newline": ["warn", {"multiline": true}],
    "object-curly-spacing": "warn",
    "object-property-newline": ["warn", {"allowAllPropertiesOnSameLine": true}],
    "one-var": ["warn", "never"],
    "one-var-declaration-per-line": "warn",
    "operator-assignment": "warn",
    "operator-linebreak": "warn",
    "padded-blocks": ["warn", "never", {"allowSingleLineBlocks": true}],
    "padding-line-between-statements": "warn",
    "prefer-exponentiation-operator": "warn",
    "prefer-object-spread": "warn",
    "quote-props": ["warn", "consistent-as-needed"],
    "quotes": "warn",
    "semi": "warn",
    "semi-spacing": "warn",
    "semi-style": "warn",
    // "sort-keys": "warn",
    "sort-vars": "warn",
    "space-before-blocks": "warn",
    "space-before-function-paren": ["warn", {"anonymous": "always", "named": "never", "asyncArrow": "always"}],
    "space-in-parens": "warn",
    "space-infix-ops": "warn",
    "space-unary-ops": "warn",
    "spaced-comment": "warn",
    "switch-colon-spacing": "warn",
    "template-tag-spacing": "warn",
    "unicode-bom": "warn",
    "wrap-regex": "warn",

    // EMCAScript 6
    "arrow-spacing": "warn",

    // ESLint @typescript-eslint supported rules
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/prefer-for-of": "error",

    // ESLint @typescript-eslint extension rules
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#extension-rules
    "@typescript-eslint/brace-style": "warn",
    "@typescript-eslint/comma-spacing": "warn",
    "@typescript-eslint/func-call-spacing": "warn",
    "@typescript-eslint/indent": "warn",
    "@typescript-eslint/no-dupe-class-members": "warn",
    // "@typescript-eslint/no-extra-parens": "warn",
    "@typescript-eslint/no-extra-semi": "warn",
    "@typescript-eslint/no-unused-expressions": "warn",
    "@typescript-eslint/no-useless-constructor": "warn",
    "@typescript-eslint/quotes": "warn",

    // eslint-plugin-import style guide
    // https://github.com/benmosher/eslint-plugin-import#style-guide
    "import/no-default-export": "error",
  },
};
