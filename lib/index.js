'use strict';
const caller = require('caller');
const Reporter = require('./Reporter');
const Runner = require('./Runner');

const runner = new Runner();
const reporter = new Reporter(runner);

runner.run();

function test(title, fn) {
  const fileName = caller();
  runner.addTest(title, fn, fileName);
}

const thout = test;

thout.runner = runner;

thout.skip = function skip(title) {
  test(title);
};

thout.setup = function setup(options) {
  runner.setup(options);
};

module.exports = thout;
