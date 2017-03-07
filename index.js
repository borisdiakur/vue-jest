'use strict';

const babel = require('babel-core');

module.exports = {
  process(src, filename) {
    if (filename.match(/.vue$/)) {
      // Comment all lines
      var code = "// " + src.replace(/\n/g, '\n// ');

      // Regexp used to eliminate comments
      var re_comments = /\n\/\//g;

      // Extract template
      var template = "";
      var templateL = code.search(/<template[^>]*>/);
      if (templateL > 0) {
        var templateR = code.lastIndexOf('</template>');
        template = code.slice(code.indexOf('\n//', templateL), templateR);

        // Eliminate comments in template
        template = template.replace(re_comments, '\n');
      } else {
        // skip
      }

      // Extract script
      var script = "module.exports = { };"
      var scriptL = code.search(/<script[^>]*>/);
      if (scriptL > 0) {
        var scriptR = code.lastIndexOf('// </script>');
        script = code.slice(code.indexOf('\n//', scriptL), scriptR);

        // Eliminate comments in script
        script = script.replace(re_comments, '\n');
      } else {
        // skip
      }

      // Insert template into script
      if (template.length > 0) {
        var e = script.lastIndexOf('}');
        script = script.slice(0, e).replace(/,\s*$/g, '') + ', template: ' + JSON.stringify(template.trim()) + script.slice(e);
      } else {
        // skip
      }

      // Insert script back
      if (scriptL > 0) {
        var L = code.indexOf("\n", scriptL);
        var R = code.lastIndexOf('// </script>');
        code = code.slice(0, L + 1) + script + code.slice(R);
      } else {
        code = code + script;
      }

      // Pass to babel
      code = babel.transform(code, {
        filename,
        retainLines: true,
      }).code;

      return code;
    }
    else if (babel.util.canCompile(filename)) {
      return babel.transform(src, {
        filename,
        retainLines: true,
      }).code;
    } else {
      return src;
    }
  },
};
