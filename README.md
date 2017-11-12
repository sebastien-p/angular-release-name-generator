# Angular release name generator

Generate random release names for Angular.

## Usage

```bash
$ npm install --global angular-release-name-generator
$ arng
```

## Result

```
----------
Angular 14 - Accurate Manchet
https://giphy.com/gifs/accurate-ySg4bO4O02YyA
----------
Copied to clipboard
```

## Lib

```js
require('angular-release-name-generator')()
  .then(({ version, name, gif }) => console.log(version, name, gif))
  .catch(error => console.error(error));
```

## Why

For the lol. Enjoy!

## Todo

* Slack command
* Website
* ...

## License

MIT
