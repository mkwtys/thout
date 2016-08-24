'use strict';
const Test = require('../lib/Test');
const test = require('tape');

test('Test', (t) => {
  t.ok(Test);
  t.end();
});

test('Test#getTitle', (t) => {
  let test = new Test();
  t.ok(test.getTitle() === '');

  test = new Test('test');
  t.ok(test.getTitle() === 'test');

  t.end();
});

test('Test#getFilename', (t) => {
  let test = new Test();
  t.ok(test.getFilename() === '');

  test = new Test('test', undefined, 'test.js');
  t.ok(test.getFilename() === 'test.js');

  t.end();
});
