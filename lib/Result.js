'use strict';

class Result {
  constructor(runner) {
    this._runner = runner;
    this._tests = [];
    this._test = 0;
    this._pass = 0;
    this._fail = 0;
    this._error = 0;
    this._skip = 0;
    this._handleRunnerEnded = this._handleRunnerEnded.bind(this);
    this._handleTestStarted = this._handleTestStarted.bind(this);
    this.bind();
  }

  bind() {
    this._runner.on('runner:end', this._handleRunnerEnded);
    this._runner.on('test:start', this._handleTestStarted);
  }

  unbind() {
    this._runner.removeListener('runner:end', this._handleRunnerEnded);
    this._runner.removeListener('test:start', this._handleTestStarted);
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
