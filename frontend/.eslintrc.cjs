module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@conarti/feature-sliced/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "src/shared/api/*", "src/shared/ui/*"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "prettier"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ],
  },
};
