#! /usr/bin/env node
'use strict';
const defaultOption = require('../lib/defaultOption');
const thout = require("../lib/");
const minimist = require("minimist");
const glob = require("glob-all");
const path = require('path');
const pkg = require("../package.json");
const argv = minimist(process.argv.slice(2), {
  boolean: [
    "help",
    "version"
  ],
  alias: {
    "h": "help",
    "v": "version"
  },
  default: {
    "help": false,
    "version": false
  }
});

function main() {
  const options = {};
  const files = argv._;
  if (files.length > 0) {
    options.files = files;
  }
  thout.setup(Object.assign({}, defaultOption, options));

  glob.sync(files)
    .forEach((file) => {
      require(path.resolve(process.cwd(), file));
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
