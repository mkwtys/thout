'use strict';
const chalk = require('chalk');
const Reporter = require('./Reporter');
const symbol = require('./symbol');

class DefaultReporter extends Reporter {
  reportRunnerStart() {
    this.log();
  }

  reportRunnerEnd() {
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

  reportTestStart(test) {
    if (!this._test || test.getFileName() !== this._test.getFileName()) {
      this.log();
      this.log(test.getFileName());
    }
  }

  reportTestPass() {
    this.log(`${chalk.green(symbol.success)} ${this._test.getTitle()}`);
  }

  reportTestFail(e) {
    this.log();
    this.log(chalk.red(`${symbol.error} ${this._test.getTitle()}`));
    this.log(e.message);
    this.log(e.stack);
    this.log();
  }

  reportTestSkip() {
    this.log(`${chalk.cyan(symbol.pending)} ${this._test.getTitle()}`);
  }

  reportTestError(e) {
    this.reportTestFail(e);
  }
}

module.exports = DefaultReporter;
