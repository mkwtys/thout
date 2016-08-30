'use strict';
const caller = require('caller');
const Reporter = require('./Reporter');
const Runner = require('./Runner');

class Thout {
  constructor(options) {
    const runner = options.runner || new Runner();
    new Reporter(runner);
    runner.run();

    function test(title, fn) {
      const fileName = caller();
      runner.addTest(title, fn, fileName);
    }

    test.skip = function skip(title) {
      const fileName = caller();
      runner.addTest(title, null, fileName);
    };

    test.setup = function setup(options) {
      runner.setup(options);
    };

    return test;
  }
}

module.exports = Thout;
