'use strict';

var test = require('tape');
var sste = require('../');

test('interface', function (t) {
    t.plan(1);
    t.equal(typeof sste.loadTemplate, 'function');
});

test('interface loadTemplate()', function (t) {
    t.plan(6);
    var template_file = __dirname + '/test_template.txt';

    t.doesNotThrow(()=>{sste.loadTemplate(template_file)}, 'loadTemplate accepts a string');
    t.doesNotThrow(()=>{sste.loadTemplate({'template':template_file})}, 'loadTemplate also accepts an object (mandatory param: template)');
    t.doesNotThrow(()=>{sste.loadTemplate({'template':template_file, 'tag_start':'${', 'tag_end':'}'})}, 'loadTemplate also accepts an object');

    t.throws(()=>{sste.loadTemplate(123)}, 'loadTemplate does not accept numbers');
    t.throws(()=>{sste.loadTemplate()}, 'loadTemplate needs an argument');
    t.throws(()=>{sste.loadTemplate({})}, 'loadTemplate, invalid object argument format');
});

test('usage loadTemplate()', function (t) {
    t.plan(2);
    var template_file = __dirname + '/test_template.txt';
    var tx = sste.loadTemplate(template_file);

    t.equal(typeof tx, 'object', 'loadTemplate returns an object');
    t.equal(typeof tx.createFromTemplate, 'function', 'loadTemplate returns an object with the function createFromTemplate');
});

test('interface loadTemplate()', function (t) {
    t.plan(6);
    var template_file = __dirname + '/test_template.txt';
    var tx = sste.loadTemplate(template_file);

    t.throws(()=>{tx.createFromTemplate()}, 'createFromTemplate expects an object as argument');
    t.throws(()=>{tx.createFromTemplate(123)}, 'createFromTemplate expects an object as argument');
    t.throws(()=>{tx.createFromTemplate('abc')}, 'createFromTemplate expects an object as argument');
    t.throws(()=>{tx.createFromTemplate({})}, 'createFromTemplate expects an object as argument, and it must have the tags as properties');
    t.throws(()=>{tx.createFromTemplate({'name':'A', 'tag':'B'})}, /^Missing argument \'tag2\'$/,'testing missing argument exception string');
    t.doesNotThrow(()=>{tx.createFromTemplate({'name':'A', 'tag2':'B'})}, 'createFromTemplate expects an object as argument, and it must have the tags as properties');
});

test('usage', function (t) {
    t.plan(6);
    var t1 = sste.loadTemplate(__dirname + '/test_template.txt');
    var t2 = sste.loadTemplate(__dirname + '/test_template2.txt');
    var t3 = sste.loadTemplate({
        'template': __dirname + '/test_template3.txt',
        'tag_start': '#(',
        'tag_end': ')'
    });

    t.equal(t1.createFromTemplate({ 'name':'World', 'tag2':'Sunshine' }), 'Hello World !\nHello again World !!\nSunshine', 'first test');
    t.equal(t1.createFromTemplate({ 'name':'A', 'tag2':'bla 123' }), 'Hello A !\nHello again A !!\nbla 123', 'reuse template');
    t.equal(t2.createFromTemplate({ 'name':'new ?'}), 'And now new ?', 'second template');
    t.equal(t1.createFromTemplate({ 'name':'A', 'tag2':'bla 123' }), 'Hello A !\nHello again A !!\nbla 123', 'reuse t1 after t2');
    t.equal(t2.createFromTemplate({ 'name':(function x() {
        return 'for something different :D';
    }())}), 'And now for something different :D', 'second template reuse, with function as param');
    t.equal(t3.createFromTemplate({ 'tag':'TAG'}), 'Another TAG', 'template with different tag marks');
});
