'use strict';
const defaultOption = require('../lib/defaultOption');
const Runner = require('../lib/Runner');
const Test = require('../lib/Test');
const test = require('tape');

test('Runner#addTest', (t) => {
  const runner = new Runner();
  runner.addTest('test', () => {});
  t.ok(runner._tests[0] instanceof Test);
  t.equal(runner._tests.length, 1);
  t.end();
});

test('Runner#setup', (t) => {
  const runner = new Runner();
  runner.setup({});
  t.deepEqual(runner._options, defaultOption);
  runner.setup({ test: 'test' });
  t.equal(runner._options.test, 'test');
  t.end();
});

test('Runner#run', (t) => {
  const runner = new Runner();
  runner.addTest('test', () => {});
  runner.on('runner:start', () => {
    t.ok(true);
  });
  runner.run();
  t.end();
});
