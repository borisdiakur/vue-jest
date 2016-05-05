'use strict';

const babel = require('babel-core');

module.exports = {
  process(src, filename) {
    if (filename.match(/.vue$/)) {
      var code = "";
      var lines = src.split("\n");
      var state = "none";
      var template = "";
      var eol = src.indexOf("\r\n") > 0 ? "\r\n" : "\n";
      for(var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var match = line.match(/^<\/?(template|style|script)([^>]*)>\s*$/);
        if (match) {
          if (match[0].indexOf("/") === 1) {
            state = "none";
          } else {
            state = match[1];
          }
          code += eol;
        } else {
          if (state === "template") {
            template += line + "\n";
            code += eol;
          } else if (state === "script" || state === "none") {
            code += line + eol;
          } else {
            code += eol;
          }
        }
      }
      var insertIndex = code.lastIndexOf("}");
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
