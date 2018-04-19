module.exports = function() {

  let unified = require('unified');
  let markdown = require('remark-parse');
  let highlight = require('remark-highlight.js');
  let { highlighted, inline } = require('./escape');
  let compiler = require('./compiler');

  let stack = unified()
    .use(markdown)
    .use(highlight)
    .use(highlighted)
    .use(inline)
    .use(compiler);

  return string => stack.process(string).then(file => file.contents);
}();
