module.exports = function() {

  let visit = require('unist-util-visit');

  let value = node => {
    if(!node.value) {
      return;
    }
    node.value = node.value.replace(/{{/g, '\\{{');
  }

  let children = node => {
    value(node);
    if(!node.children) {
      return;
    }
    node.children.forEach(child => children(child));
  };

  let highlighted = node => {
    value(node);
    if(!node.data) {
      return;
    }
    if(!node.data.hChildren) {
      return;
    }
    node.data.hChildren.forEach(child => children(child));
  }

  let inline = node => value(node);

  return {
    highlighted: () => ast => visit(ast, 'code', highlighted),
    inline: () => ast => visit(ast, 'inlineCode', inline)
  };
}();
