'use strict';
const caller = require('caller');
const Reporter = require('./DefaultReporter');
const Runner = require('./Runner');

class Thout {
  constructor(options) {
    let runner = null;
    if (options && options.runner) {
      runner = options.runner;
    } else {
      runner = new Runner();
    }
    if (options && options.reporter) {
      new options.reporter(runner);
    } else {
      new Reporter(runner);
    }
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
