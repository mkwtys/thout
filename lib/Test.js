'use strict';

class Test {
  constructor(title, fn, fileName) {
    this._title = title || '';
    this._fn = fn;
    this._fileName = fileName || '';
    this._isAsync = fn && fn.length > 0 || false;
    this._isSkip = !fn || false;
    this._isTimeout = false;
  }

  run(done) {
    if (this._isSkip) {
      return;
    }

    if (this._isAsync) {
      this._fn(done);
      return;
    }

    return this._fn();
  }

  timeout() {
    this._isTimeout = true;
  }

  getFileName() {
    return this._fileName;
  }

  getTitle() {
    return this._title;
  }

  isAsync() {
    return this._isAsync;
  }

  isSkip() {
    return this._isSkip;
  }

  isTimeout() {
    return this._isTimeout;
  }
}

module.exports = Test;
