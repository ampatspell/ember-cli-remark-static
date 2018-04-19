module.exports = function() {

  let visit = require('unist-util-visit');

  let simplify = () => ast => visit(ast, () => true, node => {
    delete node.position;
  });

  return simplify;
}();
