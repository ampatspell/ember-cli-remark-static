module.exports = function() {

  let unified = require('unified');
  let markdown = require('remark-parse');
  let highlight = require('remark-highlight.js');
  let remark2rehype = require('remark-rehype');
  let raw = require('rehype-raw');
  let simplify = require('./simplify');
  let compiler = require('./compiler');

  let stack = unified()
    .use(markdown)
    .use(highlight)
    .use(remark2rehype, { allowDangerousHTML: true })
    .use(raw)
    .use(simplify)
    .use(compiler);

  return string => stack.process(string).then(file => file.contents);
}();
