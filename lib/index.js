'use strict';
const caller = require('caller');
const Reporter = require('./Reporter');
const Runner = require('./Runner');

const runner = new Runner();
new Reporter(runner);

runner.run();

function test(title, fn) {
  const fileName = caller();
  runner.addTest(title, fn, fileName);
}

const thout = test;

thout.skip = function skip(title) {
  const fileName = caller();
  runner.addTest(title, null, fileName);
};

thout.setup = function setup(options) {
  runner.setup(options);
};

module.exports = thout;
