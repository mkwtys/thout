'use strict';
const caller = require('caller');
const path = require('path');
const Reporter = require('./Reporter');
const Runner = require('./Runner');

const runner = new Runner(new Reporter());
runner.run();

function test(title, fn) {
  const filename = caller();
  runner.addTest(title, fn, filename);
}

const thout = test;

thout.runner = runner;

thout.skip = function skip(title) {
  test(title);
};

thout.setOptions = function setOptions(options) {
  runner.setOptions(options);
};

thout.loadFiles = function loadFiles(files) {
  files.forEach((file) => {
    require(path.resolve(process.cwd(), file));
  });
};

module.exports = thout;
