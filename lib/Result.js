'use strict';

class Result {
  constructor(runner) {
    this._runner = runner;
    this._tests = [];
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
    const result = {
      test: 0,
      pass: 0,
      fail: 0,
      skip: 0,
      error: 0
    };

    this._tests.forEach((test) => {
      ++result.test;

      if (test.isPass()) {
        ++result.pass;
      } else if (test.isFail()) {
        if (test.isError()) {
          ++result.error;
        }
        ++result.fail;
      } else if (test.isSkip()) {
        ++result.skip;
      }
    });

    return result;
  }
}

module.exports = Result;
