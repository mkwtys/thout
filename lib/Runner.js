'use strict';
const chalk = require('chalk');
const defaultOption = require('./defaultOption');
const EventEmitter = require('events');
const isPromise = require('is-promise');
const Result = require('./Result');
const symbol = require('./symbol');
const Test = require('./Test');

class Runner {
  constructor() {
    this._emitter = new EventEmitter(this);
    this._isRunning = false;
    this._isPass = false;
    this._options = Object.assign({}, defaultOption);
    this._result = new Result(this);
    this._tests = [];
    this._pendingTests = [];
  }

  on(eventName, listener) {
    this._emitter.on(eventName, listener);
    return () => {
      this._emitter.removeListener(eventName, listener);
    };
  }

  emit(eventName, payload) {
    this._emitter.emit(eventName, payload);
  }

  addTest(title, fn, filename) {
    const test = new Test(title, fn, filename, this);
    this._tests.push(test);
    this._pendingTests.push(test);
  }

  setOptions(options) {
    this._options = Object.assign({}, defaultOption, options);
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
    if (this._pendingTests.length === 0) {
      this.emit('runner:end');
      this._isRunning = false;
      const result = this._result.getResult();
      if (result.pass > 0) {
        console.log(chalk.green(`${result.pass} passed`));
      }
      if (result.fail > 0) {
        console.log(chalk.red(`${result.fail} failed`));
      }
      if (result.skip > 0) {
        console.log(chalk.cyan(`${result.skip} pending`));
      }
      return;
    }

    const test = this._pendingTests.shift();
    test.bind();
    console.log(test.getFilename());
    const startTime = Date.now();
    let runTest;
    this._isPass = false;

    if (test.isSkip()) {
      this.emit('test:skip');
    }

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
      } else {
        this.emit('test:fail');
      }

      this.emit('test:end');
      if (test.isPass()) {
        console.log(`${chalk.green(symbol.success)} ${test.getTitle()}`);
      } else if (test.isFail()) {
        console.log(`${chalk.red(symbol.error)} ${test.getTitle()}`);
      } else if (test.isSkip()) {
        console.log(`${chalk.cyan(symbol.pending)} ${test.getTitle()}`);
      }

      process.nextTick(() => this._nextTest());
    };

    try {
      this.emit('test:start', test);

      if (test.isAsync()) {
        this._timer = setTimeout(() => {
          test.timeout();
          done();
        }, this._options.timeout);
      }

      runTest = test.run(done);
      this._isPass = true;
    } catch(e) {
      this._isPass = false;
      this.emit('test:fail', e);
      this.emit('test:end');
    } finally {
      if (isPromise(runTest)) {
        this._isPass = false;
        runTest.then(() => {
          this.emit('test:pass');
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
