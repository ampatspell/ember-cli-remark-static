'use strict';

let merge = require('broccoli-merge-trees');
let remarkTree = require('./lib');
let path = require('path');

module.exports = {
  name: 'ember-cli-remark',
  isDevelopingAddon() {
    return true;
  },
  included(app) {
    this._super.included(...arguments);
    if(app.project.pkg['ember-addon'] && !app.project.pkg['ember-addon'].paths) {
      this.remarkRoot = path.resolve(app.project.root, path.join('tests', 'dummy'));
    } else {
      this.remarkRoot = app.project.root;
    }
  },
  treeForPublic(tree) {
    let trees = [];
    if(tree) {
      trees.push(tree);
    }

    let options = this.app.options['ember-cli-remark'];
    let root = this.remarkRoot;

    trees.push(remarkTree(root, options));

    return merge(trees);
  }
};
