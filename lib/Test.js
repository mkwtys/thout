'use strict';

class Test {
  constructor(title, fn, filename, runner) {
    this._title = title;
    this._fn = fn;
    this._filename = filename;
    this._runner = runner;
    this._isAsync = fn && fn.length > 0;
    this._isEnd = false;
    this._isPass = false;
    this._isFail = false;
    this._isSkip = !fn || false;
    this._isTimeout = false;
    this._isError = false;
    this._unsubscribers = [];
  }

  bind() {
    this._unsubscribers = [
      this._runner.on('test:end', this._handleEnd.bind(this)),
      this._runner.on('test:pass', this._handlePass.bind(this)),
      this._runner.on('test:fail', this._handleFail.bind(this)),
      this._runner.on('test:skip', this._handleSkip.bind(this)),
      this._runner.on('test:error', this._handleError.bind(this))
    ];
  }

  unbind() {
    this._unsubscribers.forEach((unsubscribe) => {
      unsubscribe();
    });
  }

  _handleEnd() {
    this.end();
  }

  _handlePass() {
    this._isPass = true;
    this.end();
  }

  _handleFail(e) {
    this._isFail = true;
    this._error = e;
    this.end();
  }

  _handleSkip() {
    this._isSkip = true;
    this.end();
  }

  _handleError(e) {
    this._isError = true;
    this._error = e;
    this._handleFail();
  }

  run(done) {
    if (this._isAsync) {
      this._fn(done);
      return;
    }

    return this._fn();
  }

  end() {
    this._isEnd = true;
    this.unbind();
  }

  timeout() {
    this._isTimeout = true;
  }

  getFilename() {
    return this._filename;
  }

  getTitle() {
    return this._title;
  }

  isAsync() {
    return this._isAsync;
  }

  isPass() {
    return this._isPass;
  }

  isFail() {
    return this._isFail;
  }

  isSkip() {
    return this._isSkip;
  }

  isTimeout() {
    return this._isTimeout;
  }

  isError() {
    return this._isError;
  }
}

module.exports = Test;
