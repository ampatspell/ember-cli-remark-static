module.exports = function() {

  let Directories = require('./directories');
  let stew = require('broccoli-stew');

  return (root, options={}) => {
    let dirs = new Directories(root, options);
    let tree = dirs.toTree();
    if(options.debug) {
      tree = stew.debug(tree, {
        label: 'ember-cli-remark-static',
        dir: 'ember-cli-remark-static-debug'
      });
    }
    return tree;
  }
}();
