'use strict';
const chalk = require('chalk');
const symbol = require('./symbol');

class Reporter {
  constructor(runner, logger) {
    this._runner = runner;
    this._logger = logger || console;
    this._tests = [];
    this._test = null;
    this._testCount = 0;
    this._passCount = 0;
    this._failCount = 0;
    this._errorCount = 0;
    this._skipCount = 0;
    this._runner.on('runner:start', this._handleRunnerStart.bind(this));
    this._runner.on('runner:end', this._handleRunnerEnd.bind(this));
    this._runner.on('test:start', this._handleTestStart.bind(this));
    // this._runner.on('test:end', this._handleTestEnd.bind(this));
    this._runner.on('test:pass', this._handleTestPass.bind(this));
    this._runner.on('test:fail', this._handleTestFail.bind(this));
    this._runner.on('test:skip', this._handleTestSkip.bind(this));
    this._runner.on('test:error', this._handleTestError.bind(this));
    this._runner.on('test:timeout', this._handleTestTimeout.bind(this));
  }

  _handleRunnerStart() {
    this.log();
  }

  _handleRunnerEnd() {
    this.log();

    if (this._passCount > 0) {
      this.log(chalk.green(`${this._passCount} pass`));
    }
    if (this._failCount > 0) {
      this.log(chalk.red(`${this._failCount} fail`));
    }
    if (this._skipCount > 0) {
      this.log(chalk.cyan(`${this._skipCount} pending`));
    }
  }

  _handleTestStart(test) {
    this._testCount++;
    if (!this._test || test.getFileName() !== this._test.getFileName()) {
      this.log();
      this.log(test.getFileName());
    }
    this._test = test;
  }

  // _handleTestEnd() {}

  _handleTestPass() {
    this._passCount++;
    this.log(`${chalk.green(symbol.success)} ${this._test.getTitle()}`);
  }

  _handleTestFail(e) {
    this._failCount++;
    this.log();
    this.log(chalk.red(`${symbol.error} ${this._test.getTitle()}`));
    this.log(e.message);
    this.log(e.stack);
    this.log();
  }

  _handleTestSkip() {
    this._skipCount++;
    this.log(`${chalk.cyan(symbol.pending)} ${this._test.getTitle()}`);
  }

  _handleTestError(e) {
    this._errorCount++;
  }

  _handleTestTimeout() {
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
