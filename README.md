# deno-lint-plugin-jsx-a11y

JSX accessibility rules for Deno Lint.

## Install

```bash
deno add jsr:@deno-lint/plugin-jsx-a11y
```

## Usage

Configure `lint` section of your Deno configuration file.

Enable all rules:

```json
{
  "lint": {
    "plugins": ["jsr:@deno-lint/plugin-jsx-a11y"]
  }
}
```

Enable specific rules:

```json
{
  "lint": {
    "plugins": ["jsr:@deno-lint/plugin-jsx-a11y"],
    "rules": {
      "include": ["jsx-accessibility/alt-text"]
    }
  }
}
```

## License

[MIT](LICENSE)
