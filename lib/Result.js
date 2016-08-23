'use strict';
const thout = require('./');

class Result {
  constructor(runner = thout.runner) {
    this._runner = runner;
    this._tests = [];
    this._test = 0;
    this._pass = 0;
    this._fail = 0;
    this._error = 0;
    this._skip = 0;
    this._unsubscribers = [];
    this.bind();
  }

  bind() {
    this._unsubscribers = [
      this._runner.on('runner:end', this._handleRunnerEnded.bind(this)),
      this._runner.on('test:start', this._handleTestStarted.bind(this))
    ];
  }

  unbind() {
    this._unsubscribers.forEach((unsubscribe) => {
      unsubscribe();
    });
  }

  _handleRunnerEnded() {
    this.unbind();
  }

  _handleTestStarted(test) {
    this._tests.push(test);
  }

  getResult() {
    this._tests.forEach((test) => {
      this._test += 1;

      if (test.isPass()) {
        this._pass += 1;
      } else if (test.isFail()) {
        if (test.isError()) {
          this._error += 1;
        }
        this._fail += 1;
      } else if (test.isSkip()) {
        this._skip += 1;
      }
    });

    return {
      test: this._test,
      pass: this._pass,
      fail: this._fail,
      error: this._error,
      skip: this._skip,
    };
  }
}

module.exports = Result;
