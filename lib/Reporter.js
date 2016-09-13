'use strict';
const chalk = require('chalk');
const symbol = require('./symbol');

class Reporter {
  constructor(runner, logger) {
    this._runner = runner;
    this._logger = logger || console;
    this._tests = [];
    this._test = null;
    this._error = null;
    this._testCount = 0;
    this._passCount = 0;
    this._failCount = 0;
    this._errorCount = 0;
    this._skipCount = 0;

    this._runner.on('runner:start', () => {
      this.reportRunnerStart();
    });

    this._runner.on('runner:end', () => {
      this.reportRunnerEnd();
    });

    this._runner.on('test:start', (test) => {
      this._testCount++;
      this.reportTestStart(test);
      this._test = test;
    });

    this._runner.on('test:end', () => {
      this.reportTestEnd();
    });

    this._runner.on('test:pass', () => {
      this._passCount++;
      this.reportTestPass();
    });

    this._runner.on('test:fail', (e) => {
      this._failCount++;
      this._error = e;
      this.reportTestFail(e);
    });

    this._runner.on('test:skip', () => {
      this._skipCount++;
      this.reportTestSkip();
    });

    this._runner.on('test:error', (e) => {
      this._errorCount++;
      this.reportTestError(e);
    });

    this._runner.on('test:timeout', () => {
      this.reportTestTimeout();
    });
  }

  reportRunnerStart() {
    // noop
  }

  reportRunnerEnd() {
    // noop
  }

  reportTestStart() {
    // noop
  }

  reportTestEnd() {
    // noop
  }

  reportTestPass() {
    // noop
  }

  reportTestFail(e) {
    // noop
  }

  reportTestSkip() {
    // noop
  }

  reportTestError(e) {
    // noop
  }

  reportTestTimeout() {
    // noop
  }

  log(message) {
    if (message) {
      this._logger.log(message);
      return;
    }

    this._logger.log();
  }
}

module.exports = Reporter;
