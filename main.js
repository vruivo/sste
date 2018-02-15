'use strict';

var fs = require('fs');
var lib = require(__dirname+'/lib.js');

module.exports = (function sste() {
    function loadTemplate(arg) {
        if (typeof arg !== 'string' && typeof arg !== 'object') {
            throw 'Invalid argument';
        }

        // initialize variables
        var template = arg;
        var tag_start = '${';
        var tag_end = '}';

        // if object check the fields
        if (typeof arg === 'object') {
            template = arg.template || template;
            tag_start = arg.tag_start || tag_start;
            tag_end = arg.tag_end || tag_end;
        }
        
        // check that all variables have the correct type
        if (typeof template !== 'string' || typeof tag_start !== 'string' || typeof tag_end !== 'string') {
            throw 'Invalid arguments';
        }

        // load the template
        var template = fs.readFileSync(template, 'utf8');

        //get tags from the template
        var tags_in_doc = lib.getUniqueTags(template, tag_start, tag_end);


        function createFromTemplate(obj_values) {
            if (typeof obj_values !== 'object') {
                throw 'Invalid argument';
            }

            var obj_val_keys = Object.keys(obj_values);

            // check that all tags are accounted for
            tags_in_doc.forEach(function checkTags(tag) {
                if (obj_val_keys.indexOf(tag) === -1) {
                    throw 'Missing argument \'' + tag +'\'';
                }
            });

            // create the final doc
            var prop, tagregex, doc = template;
            for (prop in obj_values) {
                tagregex = lib.buildTagRegex(tag_start, tag_end, prop);
                doc = doc.replace(tagregex, obj_values[prop]);
            }

            return doc;
        }

        return {createFromTemplate};
    }

    return {loadTemplate}
})()