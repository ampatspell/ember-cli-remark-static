module.exports = function() {

  let Directories = require('./directories');
  let stew = require('broccoli-stew');

  let debug = true;

  return (root, options) => {
    let dirs = new Directories(root, options);
    let tree = dirs.toTree();
    if(debug) {
      tree = stew.debug(tree);
    }
    return tree;
  }
}();
