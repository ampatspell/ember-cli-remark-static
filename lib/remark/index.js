module.exports = function() {

  let unified = require('unified');
  let markdown = require('remark-parse');
  let highlight = require('remark-highlight.js');
  let remark2rehype = require('remark-rehype');
  let raw = require('rehype-raw');
  let simplify = require('./simplify');
  let compiler = require('./compiler');

  let matter = require('gray-matter');

  let stack = unified()
    .use(markdown)
    .use(highlight)
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(raw)
    .use(simplify)
    .use(compiler);

  return string => {
    let { content, data } = matter(string);
    return stack.process(content).then(file => {
      let result = file.result;
      result.frontmatter = data;
      return result;
    });
  };
}();
