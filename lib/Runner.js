'use strict';
const defaultOption = require('./defaultOption');
const EventEmitter = require('events');
const isPromise = require('is-promise');
const Test = require('./Test');

class Runner extends EventEmitter {
  constructor() {
    super();
    this._isRunning = false;
    this._isPass = false;
    this._options = Object.assign({}, defaultOption);
    this._tests = [];
  }

  setup(options) {
    this._options = Object.assign({}, this._options, options);
  }

  addTest(title, fn, filename) {
    const test = new Test(title, fn, filename, this);
    this._tests.push(test);
  }

  run() {
    if (this._isRunning) {
      return;
    }
    this._isRunning = true;
    this.emit('runner:start');
    process.nextTick(() => this._nextTest());
  }

  _nextTest() {
    if (this._tests.length === 0) {
      this.emit('runner:end');
      this._isRunning = false;
      return;
    }

    const test = this._tests.shift();
    let runTest;
    this._isPass = false;

    const done = () => {
      if (test.isAsync()) {
        clearTimeout(this._timer);
        if (test.isTimeout()) {
          this.emit('test:error', new Error(`Timeout of ${this._options.timeout}ms exceeded.`));
        } else {
          this.emit('test:pass');
        }
      } else if (this._isPass) {
        this.emit('test:pass');
      }

      this.emit('test:end');
      process.nextTick(() => this._nextTest());
    };

    if (test.isSkip()) {
      this.emit('test:start', test);
      this.emit('test:skip');
      done();
      return;
    }

    try {
      this.emit('test:start', test);

      if (test.isAsync()) {
        this._timer = setTimeout(() => {
          test.timeout();
          this.emit('test:timeout');
          done();
        }, this._options.timeout);
      }

      runTest = test.run(done);
      this._isPass = true;
    } catch(e) {
      this._isPass = false;
      this.emit('test:fail', e);
    } finally {
      if (isPromise(runTest)) {
        this._isPass = false;
        runTest.then(() => {
          this._isPass = true;
          done();
        })
          .catch((e) => {
            this.emit('test:fail', e);
            done();
          });
        return;
      }

      if (test.isAsync()) {
        return;
      }

      done();
    }
  }
}

module.exports = Runner;
