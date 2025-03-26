export default {
  root: true,
  extends: ["google"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  env: {
    node: true,
    es2021: true,
  },
  rules: {
    "require-jsdoc": "off",
    quotes: ["error", "single"],
    indent: ["error", 2],
  },
};
