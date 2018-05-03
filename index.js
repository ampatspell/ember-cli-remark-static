'use strict';

let merge = require('broccoli-merge-trees');
let remarkTree = require('./lib');
let path = require('path');

module.exports = {
  name: 'ember-cli-remark-static',
  isDevelopingAddon() {
    return true;
  },
  included(app) {
    this._super.included(...arguments);
  },
  treeForPublic(tree) {
    let trees = [];
    if(tree) {
      trees.push(tree);
    }

    let options = this.app.options['ember-cli-remark-static'];
    let root = this.app.project.root;

    trees.push(remarkTree(root, options));

    return merge(trees);
  }
};
