'use strict';

var test = require('tape');
var lib = require('../lib.js');

test('interface', function (t) {
    t.plan(1);
    t.equal(typeof lib.getUniqueTags, 'function');
});

test('interface getUniqueTags()', function (t) {
    t.plan(4);

    t.doesNotThrow(()=>{lib.getUniqueTags('string', 'string', 'string')}, 'getUniqueTags expects 3 string arguments');
    t.throws(()=>{lib.getUniqueTags(1, 'string', 'string')}, 'getUniqueTags expects 3 string arguments');
    t.throws(()=>{lib.getUniqueTags('string', 2, 'string')}, 'getUniqueTags expects 3 string arguments');
    t.throws(()=>{lib.getUniqueTags('string', 'string')}, 'getUniqueTags expects 3 string arguments');
});

test('usage getUniqueTags()', function (t) {
    t.plan(3);
    var template_file = __dirname + '/test_template.txt';

    t.deepEqual(lib.getUniqueTags('Hello ${name} !', '${', '}'), ['name'], 'one tag');
    t.deepEqual(lib.getUniqueTags('Hello ${name}${name}${name}!', '${', '}'), ['name'], 'three repeated tags');
    t.deepEqual(lib.getUniqueTags('Hello ${name}${tag}${name}!', '${', '}'), ['name', 'tag'], 'three tags (2+1)');
});