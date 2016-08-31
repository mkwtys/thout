'use strict';
const Runner = require('../lib/Runner');
const sinon = require('sinon');
const test = require('tape');
const Thout = require('../lib/Thout');

test('test function', (t) => {
  const runner = {
    addTest: sinon.spy(),
    run: () => {},
    on: () => {}
  };
  const thout = new Thout({ runner: runner });
  t.ok(typeof thout === 'function');

  thout();
  t.ok(runner.addTest.called);

  t.end();
});

test('skip', (t) => {
  const runner = {
    addTest: sinon.spy(),
    run: () => {},
    on: () => {}
  };
  const thout = new Thout({ runner: runner });
  t.ok(typeof thout === 'function');

  thout.skip('skip');
  t.ok(runner.addTest.called);

  t.end();
});

test('setup', (t) => {
  const runner = {
    setup: sinon.spy(),
    run: () => {},
    on: () => {}
  };
  const thout = new Thout({ runner: runner });
  thout.setup({ test: 'test' });
  t.ok(runner.setup.args);
  t.ok(runner.setup.called);
  t.end();
});

test('reporter', (t) => {
  const reporter = sinon.spy();
  new Thout({ reporter: reporter });
  t.ok(reporter.args[0][0] instanceof Runner);
  t.ok(reporter.calledWithNew());
  t.end();
});
