'use strict';
const sinon = require('sinon');
const Test = require('../lib/Test');
const test = require('tape');

test('Test#run', (t) => {
  const fn = sinon.spy();
  let test = new Test('test', fn);
  test.run();
  t.ok(fn.called);
  t.end();
});

test('Test#run - skip', (t) => {
  const fn = sinon.spy();
  let test = new Test('test');
  test.run();
  t.ok(test.isSkip());
  t.ok(fn.called === false);
  t.end();
});

test('Test#run - async', (t) => {
  const fn = sinon.spy();
  let test = new Test('test', (done) => { fn(); });
  test.run();
  t.ok(test.isAsync());
  t.ok(fn.called);
  t.end();
});

test('Test#timeout', (t) => {
  let test = new Test();
  test.timeout();
  t.ok(test.isTimeout() === true);
  t.end();
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

test('timeout', (t) => {
  let test = new Test();
  t.ok(test.isTimeout() === false);
  t.end();
});
