'use strict';
const chalk = require('chalk');

const main = {
  info: chalk.blue('ℹ'),
  success: chalk.green('✓'),
  warning: chalk.yellow('⚠'),
  error: chalk.red('✖'),
  pending: chalk.cyan('-')
};

const win = {
  info: chalk.blue('i'),
  success: chalk.green('√'),
  warning: chalk.yellow('‼'),
  error: chalk.red('×'),
  pending: chalk.cyan('-')
};

module.exports = process.platform === 'win32' ? win : main;
