'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.translate_sync = {
  setUp: function(done) {
    done();
  },
  simple: function(test) {
    test.expect(1);
    var actual = JSON.parse(grunt.file.read('tmp/simpleTarget'));
    var expected = JSON.parse(grunt.file.read('test/expected/simple'));
    test.deepEqual(Object.keys(actual).sort(), Object.keys(expected).sort(), 'should have the same keys (in any order).');
    test.done();
  },
  sorted: function(test) {
    test.expect(1);
    var actual = JSON.parse(grunt.file.read('tmp/sortedTarget'));
    var expected = JSON.parse(grunt.file.read('test/expected/sorted'));
    test.deepEqual(actual, expected, 'should have the same keys (in correct order).');
    test.done();
  },
  nested: function(test) {
    test.expect(1);
    var actual = JSON.parse(grunt.file.read('tmp/nestedTarget'));
    var expected = JSON.parse(grunt.file.read('test/expected/nested'));
    test.deepEqual(actual, expected, 'should have the same keys with namespaces.');
    test.done();
  },
  nestedSorted: function(test) {
    test.expect(1);
    var actual = JSON.parse(grunt.file.read('tmp/nestedSortedTarget'));
    var expected = JSON.parse(grunt.file.read('test/expected/nestedSorted'));
    test.deepEqual(actual, expected, 'should have the same keys (in correct order) with namespaces.');
    test.done();
  },
};
