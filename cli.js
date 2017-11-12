#!/usr/bin/env node

const chalk = require('chalk');
const writeToClipboard = require('clipboardy').write;

const releaseNameGenerator = require('./lib');

function multiline(...lines) { return lines.join('\r\n'); }

function log(lines, type = 'log') {
  console[type](multiline(...[chalk.dim('----------')].concat(lines)));
}

function successLog(message) {
  log(chalk.green(message), 'info');
}

function errorLog(message) {
  log(chalk.red(message), 'error');
}

function logResult({ version, name, gif }) {
  const release = 'Angular ' + version + ' - ' + name;
  log([chalk.white.bgRed.bold(release), chalk.blue.underline(gif)]);
  return multiline(release, gif);
}

releaseNameGenerator()
  .then(logResult)
  .then(writeToClipboard)
  .then(() => successLog('Copied to clipboard'))
  .catch(error => errorLog(error.message));
