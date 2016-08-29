[![Build Status](https://travis-ci.org/mkwtys/thout.svg?branch=master)](https://travis-ci.org/mkwtys/thout)
[![codecov](https://codecov.io/gh/mkwtys/thout/branch/master/graph/badge.svg)](https://codecov.io/gh/mkwtys/thout)

# thout

## Installation

```sh
$ npm install thout
```

## Usage

```sh
$ thout test/**/*.js
```

```js
const assert = require('assert');
const test = require('thout');

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
```

## Example

```sh
$ thout example/
```

## License

MIT © [mkwtys](https://github.com/mkwtys)
