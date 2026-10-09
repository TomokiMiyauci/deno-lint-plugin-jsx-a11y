import { toDenoRules } from "@deno-lint/eslint-compat";
import eslintPlugin from "eslint-plugin-jsx-a11y";

export const plugin = {
  name: "jsx-accessibility",
  rules: toDenoRules(eslintPlugin.rules),
} satisfies Deno.lint.Plugin;
