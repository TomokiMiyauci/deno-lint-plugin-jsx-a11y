import { plugin } from "./plugin.ts";
import { assertArrayIncludes, assertEquals } from "@std/assert";

type TestCase = [
  ruleName: string,
  source: string,
];

const testCases = [
  ["alt-text", `<img src="" />`],
  ["accessible-emoji", `<span>🐼</span>`],
  ["anchor-ambiguous-text", `<a href="about:blank">here</a>`],
  [
    "anchor-has-content",
    `<a href="about:blank"><TextWrapper aria-hidden /></a>`,
  ],
  ["anchor-is-valid", `<a href={undefined}>anchor</a>`],
  [
    "aria-activedescendant-has-tabindex",
    `<div aria-activedescendant={someID} />`,
  ],
  ["aria-props", `<div aria-unkonwn />`],
  ["aria-proptypes", `<div aria-hidden="yes" />`],
  ["aria-role", `<div role="not-a-valid-role" />`],
  ["aria-unsupported-elements", `<meta charset="UTF-8" aria-hidden="false" />`],
  [
    "autocomplete-valid",
    `<input aria-label="invalid" type="test" autocomplete="invalid" />`,
  ],
  // [
  //   "click-events-have-key-events",
  //   `<div onClick={() => {}} />`,
  // ], // Catch several violations
  [
    "control-has-associated-label",
    `<button type="button" class="icon-save" />`,
  ],
  ["heading-has-content", `<h1 />`],
  ["html-has-lang", `<html><body /></html>`],
  ["iframe-has-title", `<iframe src="about:blank" />`],
  ["img-redundant-alt", `<img alt="image of a cat" src="" />`],
  // [
  //   "interactive-supports-focus",
  //   `<div onClick={() => {}} role="button" />`,
  // ], // Catch several violations
  // [
  //   "label-has-associated-control",
  //   `<label>Username</label>`, // Catch several violations
  // ],
  // ["label-has-for", `<label>Username</label>`], // Catch several violations
  ["lang", `<html lang="foo" />`],
  [
    "media-has-caption",
    `<video aria-label="video"><source src="movie.mp4" /></video>`,
  ],
  // [
  //   "mouse-events-have-key-events",
  //   `<div onMouseOver={() => {}} />`,
  // ], // Catch several violations
  ["no-access-key", `<button accessKey="a">Action</button>`],
  [
    "no-aria-hidden-on-focusable",
    `<button aria-hidden="true">Action</button>`,
  ],
  ["no-autofocus", `<input aria-label="input" autoFocus />`],
  ["no-distracting-elements", `<marquee>Moving text</marquee>`],
  [
    "no-interactive-element-to-noninteractive-role",
    `<button role="application">Action</button>`,
  ],
  // [
  //   "no-noninteractive-element-interactions",
  //   `<li onClick={() => void 0} />`,
  // ], // Catch several violations
  [
    "no-noninteractive-element-to-interactive-role",
    `<main role="switch" aria-checked>Content</main>`,
  ],
  ["no-noninteractive-tabindex", `<div tabIndex={0}>Content</div>`],
  ["no-onchange", `<select aria-label="select" onChange={updateModel} />`],
  [
    "no-redundant-roles",
    `<button role="button">Action</button>`,
  ],
  // [
  //   "no-static-element-interactions",
  //   `<div onClick={() => {}} />`,
  // ], // Catch several violations
  [
    "prefer-tag-over-role",
    `<div role="button" tabIndex={0}>Action</div>`,
  ],
  [
    "role-has-required-aria-props",
    `<span role="switch" aria-labelledby="foo" tabindex="0"></span>`,
  ],
  [
    "role-supports-aria-props",
    `<div role="application" aria-checked="true" />`,
  ],
  ["scope", `<div scope="col">Value</div>`],
  ["tabindex-no-positive", `<button tabIndex={1}>Action</button>`],
] satisfies TestCase[];

Deno.test("rules", async (t) => {
  for (const [ruleName, source] of testCases) {
    await t.step(ruleName, () => {
      const diagnostic = Deno.lint.runPlugin(plugin, "test.jsx", source);

      if (diagnostic.length >= 2) {
        console.log(diagnostic);
      }

      assertRule(diagnostic, ruleName);
    });
  }
});

function assertRule(
  diagnostic: Deno.lint.Diagnostic[],
  ruleName: string,
): void {
  assertEquals(diagnostic.length, 1);

  assertEquals(diagnostic[0].id, `jsx-accessibility/${ruleName}`);
}

Deno.test("rule list", () => {
  const allRules = Object.keys(plugin.rules);

  assertArrayIncludes(allRules, [
    "accessible-emoji",
    "alt-text",
    "anchor-ambiguous-text",
    "anchor-has-content",
    "anchor-is-valid",
    "aria-activedescendant-has-tabindex",
    "aria-props",
    "aria-proptypes",
    "aria-role",
    "aria-unsupported-elements",
    "autocomplete-valid",
    "click-events-have-key-events",
    "control-has-associated-label",
    "heading-has-content",
    "html-has-lang",
    "iframe-has-title",
    "img-redundant-alt",
    "interactive-supports-focus",
    "label-has-associated-control",
    "label-has-for",
    "lang",
    "media-has-caption",
    "mouse-events-have-key-events",
    "no-access-key",
    "no-aria-hidden-on-focusable",
    "no-autofocus",
    "no-distracting-elements",
    "no-interactive-element-to-noninteractive-role",
    "no-noninteractive-element-interactions",
    "no-noninteractive-element-to-interactive-role",
    "no-noninteractive-tabindex",
    "no-onchange",
    "no-redundant-roles",
    "no-static-element-interactions",
    "prefer-tag-over-role",
    "role-has-required-aria-props",
    "role-supports-aria-props",
    "scope",
    "tabindex-no-positive",
  ]);
});
