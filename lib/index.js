'use strict';

const caller = require('caller');
const path = require('path');
const Runner = require('./Runner');

const runner = new Runner();

function test(title, fn) {
  const filename = caller();
  runner.addTest(title, fn, filename);
}

const thout = test;
thout.runner = runner;

thout.skip = function skip(title, fn) {
  test(title);
}

thout.setOptions = function setOptions(options) {
  runner.setOptions(options);
}

thout.loadFiles = function loadFiles(files) {
  files.forEach((file) => {
    require(path.resolve(process.cwd(), file));
  });
}

runner.run();

module.exports = thout;
