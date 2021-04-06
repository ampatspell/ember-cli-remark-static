const unified = require('unified');
const parse = require('remark-parse');
const breaks = require('remark-breaks');
const remarkrehype = require('remark-rehype');
const raw = require('rehype-raw');

class Compiler {
  constructor(tree) {
    this.tree = tree;
  }
  compile() {
    return this.tree;
  }
}

function compiler() {
  this.Compiler = Compiler;
}

let pipe = unified()
  .use(parse)
  .use(breaks)
  .use(remarkrehype, { allowDangerousHtml: true })
  .use(raw)
  .use(compiler);

const toTree = async string => {
  if(!string || typeof string !== 'string') {
    return null;
  }
  let vfile = await pipe.process(string);
  let root = vfile.result;
  return root;
}

const headings = [ 'h1', 'h2', 'h3', 'h4', 'h5' ];

const toTOC = async (root, string) => {
  let nodes = root.children.filter(node => headings.includes(node.tagName));
  return nodes.map(node => {
    let first = node.children[0];
    let last = node.children[node.children.length - 1];
    let substr = string.substring(first.position.start.offset, last.position.end.offset);
    return {
      level: parseInt(node.tagName.substr(1)),
      content: substr
    };
  });
}

const toContent = async string => {
  let root = await toTree(string);
  if(!root) {
    return;
  }
  let toc = await toTOC(root, string);
  return {
    toc
  };
}

module.exports = {
  toContent
}
