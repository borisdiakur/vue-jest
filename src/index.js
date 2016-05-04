'use strict';

const babel = require('babel-core');

module.exports = {
  process(src, filename) {
    if (babel.util.canCompile(filename)) {
      let code = babel.transform(src, {
        filename,
        retainLines: true,
      }).code;

      console.log("after transform: ", code);

      return code;
    } else {
      return src;
    }
  },
};
