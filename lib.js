'use strict';

module.exports = {
   'getUniqueTags': function getUniqueTags(doc, tag_start, tag_end) {
      if (typeof doc !== 'string' || typeof tag_start !== 'string' || typeof tag_end !== 'string') {
         throw 'Invalid arguments';
      }

      // get tags from doc
      var tag_regex = this.buildTagRegex(tag_start, tag_end);
      var tags_in_doc = doc.match(tag_regex);

      // remove duplicates and tags start/end marks
      var unique_tags = Array.from(new Set(tags_in_doc)); // uniques
      var filtered_tags = unique_tags.map(function removeTagChars(item) {
         return item.substring(2, item.length-1);
      });

      return filtered_tags;
   },
   'buildTagRegex': function buildTagRegex(tag_start, tag_end, tag_text) {
      tag_text = tag_text || '\\w+';

      // regex special characters treatment
      var idx_tag_start, idx_tag_end;
      ['$', '^', '[', ']', '(', ')'].forEach(function each(char) {
         idx_tag_start = tag_start.indexOf(char);
         idx_tag_end = tag_end.indexOf(char);

         if (idx_tag_start !== -1) {
            tag_start = tag_start.slice(0, idx_tag_start) + '\\' + tag_start.slice(idx_tag_start);
         }
         if (idx_tag_end !== -1) {
            tag_end = tag_end.slice(0, idx_tag_end) + '\\' + tag_end.slice(idx_tag_end);
         }
      });

      return new RegExp(tag_start + tag_text + tag_end, 'g');
   }
};
