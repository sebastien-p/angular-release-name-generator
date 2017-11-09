# Angular release name generator

Generate random release names for Angular.

## Usage

```bash
$ npm install --global angular-release-name-generator
$ nrng
```

## Result

```
Release name: Angular 14 - Accurate Manchet
https://giphy.com/gifs/accurate-ySg4bO4O02YyA
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

* Copy to clipboard
* Website
* Slack command
* ...

## License

MIT
