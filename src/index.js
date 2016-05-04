'use strict';

const babel = require('babel-core');

module.exports = {
  process(src, filename) {
    if (filename.match(/.vue$/)) {
      var code = "";
      var lines = src.split("\n");
      var state = "none";
      var template = "";
      for(var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var match = line.match(/^<\/?(template|style|script)([^>]*)>\s*$/);
        if (match) {
          if (match[0].indexOf("/") === 1) {
            state = "none";
          } else {
            state = match[1];
          }
          code += "// " + line + "\n";
        } else {
          if (state === "template") {
            template += line + "\n";
            code += "// " + line + "\n";
          } else if (state === "script" || state === "none") {
            code += line + "\n";
          } else {
            code += "// " + line + "\n";
          }
        }
      }
      var indexOfCloseScript = code.lastIndexOf("</script>");
      var insertIndex = code.lastIndexOf('}', indexOfCloseScript);
      code = code.substr(0, insertIndex - 1) + ', template: ' + JSON.stringify(template.trim()) + code.substr(insertIndex);

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
