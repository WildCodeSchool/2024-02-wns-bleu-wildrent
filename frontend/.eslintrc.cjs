module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "src/generated/graphql-types.ts"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/quotes": ["error", "double"],
    eqeqeq: ["error", "always"],
    indent: ["error", 2],
    "no-unused-vars": "warn",
    "no-console": "warn",
    "no-trailing-spaces": "error",
  },
};
