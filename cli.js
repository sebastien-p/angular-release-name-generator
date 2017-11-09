#!/usr/bin/env node

require('./lib')(6)
  .then(({ version, name, gif }) => {
    console.log('Release name: Angular ' + version + ' - ' + name);
    console.log(gif);
  })
  .catch(error => console.error(error.message));
