import unified from 'unified';
import parse from 'remark-parse';
import breaks from 'remark-breaks';
import remarkrehype from 'remark-rehype';
import raw from 'rehype-raw';
import highlight from 'remark-highlight.js';

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
  .use(highlight)
  .use(remarkrehype, { allowDangerousHtml: true })
  .use(raw)
  .use(compiler);

export const toTree = async (string) => {
  if(!string || typeof string !== 'string') {
    return null;
  }
  let vfile = await pipe.process(string);
  return vfile.result;
}
