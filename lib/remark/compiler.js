module.exports = function() {

  let Compiler = function(tree) {
    this.tree = tree;
  }

  Compiler.prototype.compile = function() {
    let tree = this.tree;
    return tree;
  }

  return function() {
    this.Compiler = Compiler;
  }
}();
