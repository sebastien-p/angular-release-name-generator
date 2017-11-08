const get = require('https').get;
const stringify = require('querystring').stringify;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomLetter() {
  const min = 65; // a.
  const max = min + 26;
  return String.fromCharCode(getRandomNumber(min, max));
}

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function fetch(url) {
  return new Promise((resolve, reject) => get(url, response => {
    if (response.statusCode !== 200) { return reject(); }
    let data = '';
    response.setEncoding('utf8');
    response.on('data', chunk => data += chunk);
    response.on('end', () => resolve(JSON.parse(data)));
  }));
}

function fetchWordsDataStartingWith(letter) {
  // See http://www.datamuse.com/api/.
  return fetch('https://api.datamuse.com/words?' + stringify({
    sp: letter + '*',
    max: 1000,
    md: 'p'
  }));
}

function fetchRandomWordsOfType(type, fallback) {
  return fetchWordsDataStartingWith(getRandomLetter())
    .then(data => data.filter(({ tags = [] } = item) => tags.includes(type)))
    .then(data => data.length ? data : [{ word: fallback }])
    .then(data => data.map(item => item.word));
}

function fetchRandomWordOfType(type, fallback) {
  return fetchRandomWordsOfType(type, fallback)
    .then(words => words[getRandomNumber(0, words.length)]);
}

function fetchReleaseName() {
  return Promise.all([
    fetchRandomWordOfType('adj', 'angular'),
    fetchRandomWordOfType('n', 'next')
  ])
    .then(values => values.map(capitalize).join(' '));
}

fetchReleaseName()
  .then(name => {
    const version = getRandomNumber(6, 999);
    console.log('Release name: Angular ' + version + ' - ' + name);
  })
  .catch(() => console.error('Oops something went wrong, try again...'));
