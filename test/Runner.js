'use strict';
const assert = require('assert');
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
  t.plan(1);

  const runner = new Runner();
  runner.on('runner:start', () => {
    t.pass('called');
  });
  runner.run();
  runner.run();

  t.end();
});

test('runner event', (t) => {
  t.plan(2);

  const runner = new Runner();
  runner.on('runner:start', () => {
    t.pass('called');
  });
  runner.on('runner:end', () => {
    t.pass('called');
  });
  runner.run();
});

test('test event', (t) => {
  t.plan(2);

  const runner = new Runner();
  runner.on('test:start', () => {
    t.pass('called');
  });
  runner.on('test:end', () => {
    t.pass('called');
  });
  runner.run();
  runner.addTest('test', () => {});
});

test('pass', (t) => {
  const runner = new Runner();
  runner.on('test:pass', () => {
    t.pass('called');
    t.end();
  });
  runner.run();
  runner.addTest('test', () => {});
});

test('fail', (t) => {
  const runner = new Runner();
  runner.on('test:fail', () => {
    t.pass('called');
    t.end();
  });
  runner.run();
  runner.addTest('test', () => { assert.fail(); });
});

test('skip', (t) => {
  const runner = new Runner();
  runner.on('test:skip', () => {
    t.pass('called');
    t.end();
  });
  runner.run();
  runner.addTest('test');
});

test('timeout', (t) => {
  const runner = new Runner();
  runner.on('test:error', () => {
    t.pass('called');
    t.end();
  });
  runner.run();
  runner.addTest('test', (done) => { });
});

test('async', (t) => {
  const runner = new Runner();
  runner.on('test:pass', () => {
    t.pass('called');
    t.end();
  });
  runner.run();
  runner.addTest('test', (done) => { done(); });
});

test('promise pass', (t) => {
  const runner = new Runner();
  runner.on('test:pass', () => {
    t.pass('called');
    t.end();
  });
  runner.run();
  runner.addTest('test', () => { return Promise.resolve(); });
});

test('promise fail', (t) => {
  const runner = new Runner();
  runner.on('test:fail', () => {
    t.pass('called');
    t.end();
  });
  runner.run();
  runner.addTest('test', () => { return Promise.reject(); });
});
