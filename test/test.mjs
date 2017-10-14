import pxToEm from '../pxToEm.mjs';

function fail () {
  throw new Error('Assertion failed');
}

function assert (value) {
  if (value !== true) {
    fail();
  }
}

function assertThrown (func, assertion) {
  var uncatchable = {};
  var caught = uncatchable;
  try {
    func();
  } catch (thrown) {
    caught = thrown;
  } finally {
    if (caught !== uncatchable) {
      assertion(caught);
    } else {
      fail();
    }
  }
}

assertThrown(function () { pxToEm(); }, function (err) { assert(err instanceof TypeError); });
assertThrown(function () { pxToEm(undefined); }, function (err) { assert(err instanceof TypeError); });
assertThrown(function () { pxToEm(null); }, function (err) { assert(err instanceof TypeError); });
assertThrown(function () { pxToEm(NaN); }, function (err) { assert(err instanceof TypeError); });
assertThrown(function () { pxToEm(true); }, function (err) { assert(err instanceof TypeError); });
assertThrown(function () { pxToEm(''); }, function (err) { assert(err instanceof TypeError); });
assertThrown(function () { pxToEm({}); }, function (err) { assert(err instanceof TypeError); });
assertThrown(function () { pxToEm(function () {}); }, function (err) { assert(err instanceof TypeError); });

assertThrown(function () { pxToEm(16, NaN); }, function (err) { assert(err instanceof TypeError); });
assertThrown(function () { pxToEm(16, true); }, function (err) { assert(err instanceof TypeError); });
assertThrown(function () { pxToEm(16, 0); }, function (err) { assert(err instanceof TypeError); });
assertThrown(function () { pxToEm(16, ''); }, function (err) { assert(err instanceof TypeError); });
assertThrown(function () { pxToEm(16, {}); }, function (err) { assert(err instanceof TypeError); });
assertThrown(function () { pxToEm(16, {nodeType: 1}); }, function (err) { assert(err instanceof TypeError); });
assertThrown(function () { pxToEm(16, function () {}); }, function (err) { assert(err instanceof TypeError); });

assert(pxToEm(16) === 1);
assert(pxToEm(16, undefined) === 1);
assert(pxToEm(16, null) === 1);

assert(pxToEm(16, test1) === 1);
assert(pxToEm(24, test1) === 1.5);
assert(pxToEm(32, test1) === 2);

assert(pxToEm(16, test2) === .5);
assert(pxToEm(24, test2) === 0.75);
assert(pxToEm(32, test2) === 1);
