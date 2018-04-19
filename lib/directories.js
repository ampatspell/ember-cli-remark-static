module.exports = function() {

  let merge = require('broccoli-merge-trees');
  let Directory = require('./directory');

  const normalizeOptions = (options={}) => {
    options.paths = options.paths || {};
    return options;
  };

  class Directories {
    constructor(appRoot, options) {
      this.appRoot = appRoot;
      this.options = normalizeOptions(options);
    }

    createTrees() {
      let { appRoot, options: { debug, paths } } = this;
      return Object.keys(paths).map(name => new Directory(appRoot, paths[name], name, { debug }));
    }

    get trees() {
      let trees = this._trees;
      if(!trees) {
        trees = this.createTrees();
        this._trees = trees;
      }
      return trees;
    }

    toTree() {
      return merge(this.trees.map(tree => tree.toTree()));
    }

  }

  return Directories;
}();
