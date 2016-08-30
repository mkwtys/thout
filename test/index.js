'use strict';
const thout = require('../lib/');
const test = require('tape');

test('thout', (t) => {
  t.ok(thout);
  t.ok(thout.setup);
  t.ok(thout.skip);
  t.end();
});
