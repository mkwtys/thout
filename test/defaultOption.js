'use strict';
const defaultOption = require('../lib/defaultOption');
const test = require('tape');

test('defaultOption', (t) => {
  t.ok(defaultOption);
  t.end();
});
