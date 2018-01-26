const exec = require('child_process').exec;

const getMajor = require('semver').major;
const fetchWords = require('datamuse').words;
const giphy = require('giphy-api')('dc6zaTOxFJmzC');
const { get, random, sample, startCase } = require('lodash');

function fetchWordsStartingWithLetter(letter) {
  return fetchWords({ sp: letter + '*', max: 1000, md: 'p' });
}

function fetchRandomWordsOfType(type) {
  return fetchWordsStartingWithLetter(sample('abcdefghijklmnopqrstuvwxyz'))
    .then(data => data.filter(({ tags = [] }) => tags.includes(type)))
    .then(data => data.map(item => item.word));
}

function fetchRandomWordOfType(type, fallback) {
  return fetchRandomWordsOfType(type).then(words => sample(words) || fallback);
}

function fetchNpmModuleMajor(moduleId, timeout = 1000) {
  return new Promise((resolve, reject) => exec(
    'npm info ' + moduleId + ' version',
    { timeout },
    (error, version) => error ? reject(error) : resolve(version)
  )).then(getMajor);
}

function fetchTopicRelatedGifUrl(topic, fallback = 'No gif found...') {
  return giphy.search({ q: topic, limit: 1 })
    .then(results => get(results, 'data[0].url', fallback))
    .catch(() => fallback);
}

function fetchReleaseName() {
  return Promise.all([
    fetchRandomWordOfType('adj', 'angular'),
    fetchRandomWordOfType('n', 'next')
  ]).then(values => values.map(startCase).join(' '));
}

function fetchNextMajor(fallback = random(1, 999)) {
  return fetchNpmModuleMajor('@angular/core')
    .then(major => major ? major + 1 : fallback)
    .catch(() => fallback);
}

function fetchRelatedData(name, version, gif = fetchTopicRelatedGifUrl(name)) {
  return Promise.all([name, version, gif]);
}

module.exports = function releaseNameGenerator(major = fetchNextMajor(), gif) {
  return fetchReleaseName()
    .then(name => fetchRelatedData(name, major, gif))
    .then(([name, version, gif]) => ({ name, version, gif }))
    .catch(() => { throw new Error('Something went wrong, try again...'); });
};
