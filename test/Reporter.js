'use strict';
const EventEmitter = require('events');
const Reporter = require('../lib/Reporter');
const sinon = require('sinon');
const stripAnsi = require('strip-ansi');
const test = require('tape');

test('Reporter', (t) => {
  t.ok(Reporter);
  t.end();
});

test('runner start', (t) => {
  const runner = new EventEmitter();
  const logger = { log: sinon.spy() };
  const reporter = new Reporter(runner, logger);
  runner.emit('runner:start');
  t.ok(reporter._indent === 1);
  t.end();
});

test('runner end', (t) => {
  const runner = new EventEmitter();
  const logger = { log: sinon.spy() };
  const reporter = new Reporter(runner, logger);
  runner.emit('runner:end');
  t.ok(reporter._indent === 1);
  t.end();
});

test('test start', (t) => {
  const runner = new EventEmitter();
  const logger = { log: sinon.spy() };
  const reporter = new Reporter(runner, logger);
  runner.emit('test:start', { getFileName: () => { return 'fileName' } });
  t.ok(reporter._testCount === 1);
  t.ok(reporter._indent === 1);
  console.log(logger.log.args[0][0]);
  t.ok(logger.log.args[0][0] === '  fileName');
  t.end();
});

test('test end', (t) => {
  const runner = new EventEmitter();
  const logger = { log: sinon.spy() };
  const reporter = new Reporter(runner, logger);
  runner.emit('test:end');
  t.ok(reporter._indent === -1);
  t.end();
});

test('pass', (t) => {
  const runner = new EventEmitter();
  const logger = { log: sinon.spy() };
  const reporter = new Reporter(runner, logger);
  runner.emit('test:start', { getFileName: () => { return '' }, getTitle: () => { return 'title' } });
  runner.emit('test:pass');
  t.ok(reporter._passCount === 1);
  t.ok(stripAnsi(logger.log.args[1][0]) === '  ✓ title');
  t.end();
});

test('fail', (t) => {
  const runner = new EventEmitter();
  const logger = { log: sinon.spy() };
  const reporter = new Reporter(runner, logger);
  runner.emit('test:start', { getFileName: () => { return '' }, getTitle: () => { return 'title' } });
  runner.emit('test:fail');
  t.ok(reporter._failCount === 1);
  t.ok(stripAnsi(logger.log.args[1][0]) === '  ✖ title');
  t.end();
});

test('skip', (t) => {
  const runner = new EventEmitter();
  const logger = { log: sinon.spy() };
  const reporter = new Reporter(runner, logger);
  runner.emit('test:start', { getFileName: () => { return '' }, getTitle: () => { return 'title' } });
  runner.emit('test:skip');
  t.ok(reporter._skipCount === 1);
  t.ok(stripAnsi(logger.log.args[1][0]) === '  - title');
  t.end();
});

test('error', (t) => {
  const runner = new EventEmitter();
  const reporter = new Reporter(runner);
  runner.emit('test:error');
  t.ok(reporter._errorCount === 1);
  t.end();
});
