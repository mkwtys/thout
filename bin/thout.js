#! /usr/bin/env node
'use strict';
const defaultOption = require('../lib/defaultOption');
const fs = require('fs');
const globAll = require('glob-all');
const minimist = require('minimist');
const path = require('path');
const pkg = require('../package.json');
const thout = require('../lib/');

const existsSync = fs.existsSync || path.existsSync;

const argv = minimist(process.argv.slice(2), {
  string: [
    'require'
  ],
  boolean: [
    'help',
    'version'
  ],
  alias: {
    h: 'help',
    r: 'require',
    t: 'timeout',
    v: 'version'
  },
  default: {
    timeout: 2000,
    help: false,
    version: false
  }
});

function main() {
  const options = {};
  const files = argv._;
  let requires = [];

  if (files.length > 0) {
    options.files = files;
  }
  if (argv.t) {
    options.timeout = argv.t;
  }
  if (argv.r) {
    requires = argv.r;
    if (!Array.isArray(argv.r)) {
      requires = [argv.r];
    }
  }

  thout.setup(Object.assign({}, defaultOption, options));

  requires.forEach((mod) => {
    const isLocalFile = existsSync(mod) || existsSync(mod + '.js');
    const file = isLocalFile ? path.resolve(mod) : mod;
    require(file);
  });

  globAll.sync(files)
    .forEach((file) => {
      require(path.resolve(file));
    });
}

function showHelp() {
  console.log(`
${pkg.description}

Usage
  ${Object.keys(pkg.bin)[0]} [options]

Options
  -h, --help       Show help.
  -v, --version    Print version.
`);
}

function showVersion() {
  console.log(pkg.version);
}

if (argv.help) {
  showHelp();
}

if (argv.version) {
  showVersion();
}

main();
