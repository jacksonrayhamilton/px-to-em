# px-to-em

Convert a px value to an em value.  That is, given a px value and an element,
determine the equivalent em.

## Usage

If you use ES modules, and if you use `package.json` then import `px-to-em`,
otherwise import `pxToEm.mjs`.  Alternatively, include `pxToEm.js` in scope.

Given this HTML:

```html
<p id="message" style="font-size: 16px;">Hello World!</p>
```

You can expect these outputs:

```js
pxToEm(16, message) === 1
pxToEm(32, message) === 2
```

## Development

Run `npm run develop` to continuously rebuild the project.

Start a web server in the `test` directory, visit `index.html` in a browser, and
check your console to see if the tests are passing.
