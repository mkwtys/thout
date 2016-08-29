'use strict';
const EventEmitter = require('events');
const Reporter = require('../lib/Reporter');
const sinon = require('sinon');
const stripAnsi = require('strip-ansi');
const test = require('tape');

test('runner start', (t) => {
  const runner = new EventEmitter();
  const logger = { log: sinon.spy() };
  const reporter = new Reporter(runner, logger);
  runner.emit('runner:start', { getFileName: () => {} });
  t.ok(logger.log.called);
  t.end();
});

test('runner end', (t) => {
  const runner = new EventEmitter();
  const logger = { log: sinon.spy() };
  const reporter = new Reporter(runner, logger);
  reporter._passCount = 1;
  reporter._failCount = 1;
  reporter._skipCount = 1;
  runner.emit('runner:end');
  t.ok(logger.log.called);
  t.ok(stripAnsi(logger.log.args[1][0]) === '1 pass');
  t.ok(stripAnsi(logger.log.args[2][0]) === '1 fail');
  t.ok(stripAnsi(logger.log.args[3][0]) === '1 pending');
  t.end();
});

test('test start - 1st test', (t) => {
  const runner = new EventEmitter();
  const logger = { log: sinon.spy() };
  const reporter = new Reporter(runner, logger);
  runner.emit('test:start', { getFileName: () => { return 'fileName'; } });
  t.ok(logger.log.args[1][0] === 'fileName');
  t.ok(reporter._testCount === 1);
  t.end();
});

test('test start - 2nd test', (t) => {
  const runner = new EventEmitter();
  const logger = { log: sinon.spy() };
  const reporter = new Reporter(runner, logger);
  runner.emit('test:start', { getFileName: () => { return ''; } });
  runner.emit('test:start', { getFileName: () => { return 'fileName'; } });
  t.ok(logger.log.args[3][0] === 'fileName');
  t.ok(reporter._testCount === 2);
  t.end();
});

// test('test end', (t) => {
//   const runner = new EventEmitter();
//   const logger = { log: sinon.spy() };
//   const reporter = new Reporter(runner, logger);
//   runner.emit('test:end');
//   t.ok(logger.log.called);
//   t.end();
// });

test('pass', (t) => {
  const runner = new EventEmitter();
  const logger = { log: sinon.spy() };
  const reporter = new Reporter(runner, logger);
  runner.emit('test:start', { getFileName: () => { return ''; }, getTitle: () => { return 'title'; } });
  runner.emit('test:pass');
  t.ok(reporter._passCount === 1);
  t.ok(stripAnsi(logger.log.args[2][0]) === '✓ title');
  t.end();
});

test('fail', (t) => {
  const runner = new EventEmitter();
  const logger = { log: sinon.spy() };
  const reporter = new Reporter(runner, logger);
  runner.emit('test:start', { getFileName: () => { return ''; }, getTitle: () => { return 'title'; } });
  runner.emit('test:fail', new Error('fail'));
  t.ok(reporter._failCount === 1);
  t.ok(stripAnsi(logger.log.args[3][0]) === '✖ title');
  t.ok(stripAnsi(logger.log.args[4][0]) === 'fail');
  t.end();
});

test('skip', (t) => {
  const runner = new EventEmitter();
  const logger = { log: sinon.spy() };
  const reporter = new Reporter(runner, logger);
  runner.emit('test:start', { getFileName: () => { return ''; }, getTitle: () => { return 'title'; } });
  runner.emit('test:skip');
  t.ok(reporter._skipCount === 1);
  t.ok(stripAnsi(logger.log.args[2][0]) === '- title');
  t.end();
});

test('error', (t) => {
  const runner = new EventEmitter();
  const reporter = new Reporter(runner);
  runner.emit('test:error');
  t.ok(reporter._errorCount === 1);
  t.end();
});

test.skip('timeout', (t) => {
});
