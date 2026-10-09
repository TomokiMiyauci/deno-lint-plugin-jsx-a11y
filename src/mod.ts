import { plugin as _plugin } from "./plugin.ts";

/**
 * JSX a11y rules for Deno Lint.
 * The plugin adapts rules from [eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y).
 * Rule behavior and compatibility depend on the underlying rules.
 *
 * ## Usage
 *
 * Configure `lint` section of your Deno configuration file.
 *
 * @example Enable all rules
 * ```json
 * {
 *   "lint": {
 *     "plugins": ["jsr:@deno-lint/plugin-jsx-a11y"]
 *   }
 * }
 * ```
 *
 * @example Enable specific rules
 * ```json
 * {
 *   "lint": {
 *     "plugins": ["jsr:@deno-lint/plugin-jsx-a11y"],
 *     "rules": {
 *       "include": ["jsx-accessibility/alt-text"]
 *     }
 *   }
 * }
 * ```
 *
 * @module
 */

/**
 * JSX a11y rules adapted for Deno Lint.
 */
const plugin: Deno.lint.Plugin = _plugin;

export default plugin;
