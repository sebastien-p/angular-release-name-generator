const _ = require('lodash');
const datamuse = require('datamuse');
const giphy = require('giphy-api')('dc6zaTOxFJmzC');

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

function getRandomLetter() {
  return alphabet[_.random(0, alphabet.length)];
}

function fetchWordsStartingWith(letter) {
  return datamuse.words({
    sp: letter + '*',
    max: 1000,
    md: 'p',
    topics: 'computer,food,drink'
  });
}

function fetchRelatedGif(releaseName) {
  return giphy
    .search({ q: releaseName, limit: 1 })
    .then(data => _.first(data.data));
}

function fetchRandomWordsOfType(type, fallback) {
  return fetchWordsStartingWith(getRandomLetter())
    .then(data => data.filter(({ tags = [] }) => tags.includes(type)))
    .then(data => data.map(item => item.word))
    .then(data => (data.length ? data : [fallback]));
}

function fetchRandomWordOfType(type, fallback) {
  return fetchRandomWordsOfType(type, fallback).then(
    words => words[_.random(0, words.length)]
  );
}

function fetchReleaseName() {
  return Promise.all([
    fetchRandomWordOfType('adj', 'angular'),
    fetchRandomWordOfType('n', 'next')
  ]).then(values => values.map(_.capitalize).join(' '));
}

fetchReleaseName()
  .then(name => Promise.all([name, fetchRelatedGif(name)]))
  .then(([name, gif]) => {
    const version = _.random(6, 999);
    console.log('Release name: Angular ' + version + ' - ' + name);
    console.log(gif.url);
  })
  .catch(() => console.error('Oops something went wrong, try again...'));
