const thout = require('../lib/');
const test = require('tape');

test('thout', (t) => {
  t.ok(thout);
  t.ok(thout.setOptions);
  t.ok(thout.skip);
  t.ok(thout.loadFiles);
  t.end();
});
