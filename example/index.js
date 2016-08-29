const assert = require('assert');
const test = require('../');

test('pass', () => {
  assert(true);
});

test('fail', () => {
  assert(false);
});

test('promise resolve', () => {
  return Promise.resolve(true);
});

test('promise reject', () => {
  return Promise.reject(new Error('promise reject'));
});

test('async', (done) => {
  setTimeout(() => {
    done();
  }, 10);
});

test('timeout', (done) => {});

test('pending');

test.skip('skip', () => {
  assert(true);
});
