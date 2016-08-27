'use strict';
const Runner = require('../lib/Runner');
const Test = require('../lib/Test');
const test = require('tape');

test('Test', (t) => {
  t.ok(Test);
  t.end();
});

test.skip('Test#run', (t) => {
});

test.skip('Test#end', (t) => {
});

test.skip('Test#timeout', (t) => {
});

test('Test#getTitle', (t) => {
  let test = new Test();
  t.ok(test.getTitle() === '');

  test = new Test('test');
  t.ok(test.getTitle() === 'test');

  t.end();
});

test('Test#getFileName', (t) => {
  let test = new Test();
  t.ok(test.getFileName() === '');

  test = new Test('test', undefined, 'test.js');
  t.ok(test.getFileName() === 'test.js');

  t.end();
});

test('Test#isAsync', (t) => {
  let test = new Test();
  t.ok(test.isAsync() === false);

  test = new Test('test');
  t.ok(test.isAsync() === false);

  test = new Test('test', () => {});
  t.ok(test.isAsync() === false);

  test = new Test('test', (done) => {});
  t.ok(test.isAsync() === true);

  t.end();
});

test('Test#isSkip', (t) => {
  let test = new Test();
  t.ok(test.isSkip() === true);

  test = new Test('test', () => {});
  t.ok(test.isSkip() === false);

  t.end();
});

test('Test#isTimeout', (t) => {
  const runner = new Runner();

  let test = new Test();
  t.ok(test.isTimeout() === false);

  test.timeout();
  t.ok(test.isTimeout() === true);

  t.end();
});
