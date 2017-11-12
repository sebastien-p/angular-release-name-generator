#!/usr/bin/env node

const angularReleaseNameGenerator = require('./lib');

angularReleaseNameGenerator()
  .then(({ version, name, gif }) => {
    console.log('Release name: Angular ' + version + ' - ' + name);
    console.log(gif);
  })
  .catch(error => console.error(error.message));
