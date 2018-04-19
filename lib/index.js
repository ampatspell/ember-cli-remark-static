module.exports = function() {

  let Directories = require('./directories');
  let stew = require('broccoli-stew');

  let debug = true;

  return (root, options) => {
    let dirs = new Directories(root, options);
    let tree = dirs.toTree();
    if(options.debug) {
      tree = stew.debug(tree, {
        label: 'ember-cli-remark',
        dir: 'ember-cli-remark-debug'
      });
    }
    return tree;
  }
}();
